/*
    Name
    -------------
    Harrison F    June 2020


    

    PROPS
    --------------
    title
    obj - full object
    fields
    splits
    primaryKey - Used for giving an error message on the duplicated field
    PUTurl
    onSubmit
      
 */

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Button, Dialog, DialogContent, Stepper, Step, IconButton, StepLabel } from '@mui/material';
import { useFirstRender } from '@mui/x-data-grid';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ColourContext } from '../Home';
import { apiPostCall } from './APIFunctions';
import BasicField from './fields/BasicField';
import DetailTitle from './fields/detailTitle';
import { findMyError, isEmpty } from './GeneralFunctions';
import Lunchbox from './Lunchbox';


export default function EditDetails(props) {
    const colours = useContext(ColourContext)

    const [open, setOpen] = useState(false)
    const [fields, setFields] = useState([])
    const [obj, setObj] = useState(props.obj)
    const [activeStep, setActiveStep] = useState(0)
    const [errMsgs, setErrMsgs] = useState([])
    const [errorSteps, setErrorSteps] = useState([])
    const [snack, setSnack] = useState(null)


    //Startup
    useFirstRender(() => {
        if (props.splits) {
            setColumns()
        } else {
            setFields([props.fields])
        }
        setObj(props.obj)
    })

    //Changes to obj
    useEffect(() => {
        setObj(props.obj)
    }, [props.obj])


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

    function handleSubmit() {
        let errorSteps = []
        let errMsgs = []

        for (let [i, step] of fields.entries()) {
            for (let field of step) {
                if (field.required && isEmpty(obj[field.name])) {
                    errorSteps.push(i)
                    errMsgs.push(`${field.label} can't be empty`)
                }
            }
        }
        if (errMsgs.length > 0) {
            setErrorSteps(errorSteps)
            setActiveStep(errorSteps.sort()[0])
            setErrMsgs(errMsgs)
            return
        }
        PUTsubmit()
    }

    function changeObj(fieldName, value) {
        let newObj = { ...obj }
        newObj[fieldName] = value
        setObj(newObj)
    }

    function setColumns() {
        //Split each set of fields into each column based on the split index
        const { fields } = props
        let arrFields = []
        let lastId = 0
        for (let i of props.splits) {
            arrFields.push(fields.slice(lastId, i))
            lastId = i
        }
        arrFields.push(fields.slice(lastId, fields.length))

        setFields(arrFields)
    }

    function setDefault() {
        setOpen(true)
        setObj({ ...props.obj })
        setActiveStep(0)
        setErrMsgs([])
        setErrorSteps([])
    }

    function PUTsubmit() {
        const url = props.PUTurl
        const callback = d => {
            setOpen(false)
            setSnack({
                severity: "success"
            })

            if (props.onSubmit) {
                props.onSubmit()
            }
        }
        const error = e => {
            console.error(e)
            setSnack({
                severity: "error",
                label: e
            })

            //Duplicate issue
            if (e === "Duplicate found") {
                for (let [i, step] of fields.entries()) {
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
        apiPostCall(url, "PUT", JSON.stringify(obj), callback, error)
    }

    return (
        <>
            {/* Open Button / Trigger Component */}
            {{
                ...props.children,
                ...{
                    props: {
                        ...props.children.props,
                        ...{ onClick: () => setDefault() }
                    }
                }
            }}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <DetailTitle>Edit {props.title}</DetailTitle>

                    {/* Steps */}
                    {props.splits &&
                        <Stepper activeStep={activeStep} className='my-2'>
                            {fields.map((i) => (
                                <Step key={i}>
                                    <StepLabel
                                        error={errorSteps.includes(i)}
                                    />
                                </Step>
                            ))}
                        </Stepper>
                    }

                    {/* Fields */}
                    {fields.map((col, i) => (
                        <div key={i}>
                            {i === activeStep && col.map((field, j) => (
                                <BasicField
                                    {...field}
                                    key={j}
                                    error={findMyError(field.label, errMsgs)}
                                    value={obj[field.name]}
                                    onSelect={handleSelect}
                                    onCheck={() => handleCheck(field.name)}
                                    onChange={handleChange}
                                />
                            ))}
                        </div>
                    ))}

                    {/* Stepper Navigation */}
                    {props.splits &&
                        <section className='justify-between'>
                            {/* Back */}
                            <IconButton
                                onClick={() => handleStepper(activeStep - 1)}
                                disabled={activeStep === 0}
                            >
                                <ChevronLeft />
                            </IconButton>

                            {/* Forward */}
                            <IconButton
                                onClick={() => handleStepper(activeStep + 1)}
                                disabled={activeStep === fields.length - 1}
                            >
                                <ChevronRight />
                            </IconButton>
                        </section>
                    }

                    {/* Save and close */}
                    <section className='justify-between'>
                        <Button
                            className="text-grey-400"
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </Button>

                        <Button
                            className={colours.action}
                            variant="outlined"
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </section>
                </DialogContent>
            </Dialog>

            {/* Snacks */}
            <Lunchbox snack={snack} />
        </>
    );
}
