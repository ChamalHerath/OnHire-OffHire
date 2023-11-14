/*
    PROPS
    --------------
    open
    steps
    fields
    defaultObj
    primaryKey - name of the field that contains the primaryKey. Used for duplication errors
    POSTurl
    onClose

      
 */

import { Button, Dialog, DialogContent, Step, StepLabel, Stepper } from '@mui/material';
import { useFirstRender } from '@mui/x-data-grid';
import React, { Component } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ColourContext } from '../Home';
import { apiPostCall } from './APIFunctions';
import BasicField from './fields/BasicField';
import { findMyError, isEmpty } from './GeneralFunctions';
import Lunchbox from './Lunchbox';


export default function Creation(props) {
    const colours = useContext(ColourContext)

    const [activeStep, setActiveStep] = useState(0)
    const [errorSteps, setErrorSteps] = useState([])
    const [obj, setObj] = useState({})
    const [errMsgs, setErrMsgs] = useState([])
    const [attempted, setAttempted] = useState(false)
    const [snack, setSnack] = useState(null)

    //Startup
    useFirstRender(() => {
        setDefault()
    })

    //On open change
    useEffect(() => {
        if (props.open) {
            setDefault()
        }
    }, [props.open])

    function handleStepper(step) {
        setActiveStep(step)
    }

    function handleChange(ev) {
        changeObj(ev.target.name, ev.target.value)
    }

    function handleCheck(fieldName) {
        changeObj(
            fieldName,
            obj[fieldName] === 0 ? 1 : 0
        )
    }

    function handleSelect(opt, field) {
        changeObj(field, opt)
    }

    function changeObj(fieldName, value) {
        let newObj = { ...obj }
        newObj[fieldName] = value
        setObj(newObj)
    }

    function handleSubmit() {
        let errorSteps = []
        let errMsgs = []
        let formattedObj = { ...obj }
        setAttempted(true)

        for (let [i, step] of props.fields.entries()) {
            for (let field of step) {
                if (field.required && isEmpty(obj[field.name])) {
                    errorSteps.push(i)
                    errMsgs.push(`${field.label} can't be empty`)
                }

                //If field is saved differently from input
                if (field.saveType) {
                    switch (field.saveType) {
                        case "string":
                            formattedObj[field.name] = `${formattedObj[field.name]}`
                            break
                        default:
                            break
                    }
                }
            }
        }
        if (errMsgs.length > 0) {
            setErrorSteps(errorSteps)
            setActiveStep(errorSteps.sort()[0])
            setErrMsgs(errMsgs)
            return
        }


        POSTobj(obj)
    }

    function handleClose(obj) {
        setObj({ ...props.defaultObj })
        props.onClose(obj)
    }

    function setDefault() {
        setObj({ ...props.defaultObj })
        setErrorSteps([])
        setActiveStep(0)
        setErrMsgs([])
        setAttempted(false)
        setSnack(null)
    }

    function POSTobj(body) {
        const url = props.POSTurl
        const callback = d => {
            setSnack({ severity: "success" })
            handleClose(d)
        }

        const error = e => {
            setSnack({ severity: "error", label: e })

            //Duplicate issue
            if (e === "Duplicate found") {
                for (let [i, step] of props.fields.entries()) {
                    for (let field of step) {
                        if (field.name === props.primaryKey) {
                            setActiveStep(i)
                            setErrorSteps([i])
                            setErrMsgs([`This ${field.label} already exists`])
                        }
                    }
                }
            }
        }

        apiPostCall(url, "POST", JSON.stringify(body), callback, error)
    }


    return (
        <Dialog
            open={props.open}
            fullWidth={true}
            maxWidth={"sm"}
            onClose={() => handleClose(null)}
        >
            <DialogContent className='pape p-5'>
                {/* Steps */}
                <Stepper alternativeLabel activeStep={activeStep} className='mb-5'>
                    {props.steps && props.steps.map((step, i) => (
                        <Step
                            key={i}
                            className="cursor-pointer"
                            onClick={() => handleStepper(i)}
                        >
                            <StepLabel
                                error={errorSteps.includes(i)}
                            >
                                {step}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Fields */}
                {props.fields.map((step, i) => (
                    <article key={i}>
                        {i === activeStep && step.map((field, j) => (
                            <BasicField
                                {...field}
                                key={j}
                                autoFocus={i === 0}
                                error={findMyError(field.label, errMsgs)}
                                value={obj[field.name]}
                                onChange={handleChange}
                                onSelect={handleSelect}
                                onCheck={handleCheck}
                            />
                        ))}
                    </article>
                ))}

                {/* Step Navigation */}
                <section className='justify-between'>
                    <section>
                        {/* Close */}
                        <Button
                            className='btnGreyOut'
                            variant='outlined'
                            onClick={() => handleClose(null)}
                        >
                            Close
                        </Button>

                        {/* Back */}
                        {props.steps &&
                            <Button
                                className='text-grey-300'
                                disabled={activeStep === 0}
                                onClick={() => handleStepper(activeStep - 1)}
                            >
                                Back
                            </Button>
                        }
                    </section>

                    <section>
                        {/* Next */}
                        {props.steps &&
                            <Button
                                onClick={() => handleStepper(activeStep + 1)}
                                className={colours.colour}
                                disabled={activeStep === props.steps.length - 1}
                            >
                                Next
                            </Button>
                        }

                        {/* Create */}
                        {(!props.steps || activeStep === props.steps.length - 1 || attempted) &&
                            <Button
                                variant='outlined'
                                className={colours.redirect}
                                onClick={handleSubmit}
                            >
                                Create
                            </Button>
                        }
                    </section>
                </section>

            </DialogContent>

            <Lunchbox
                snack={snack}
            />
        </Dialog >
    );

}
