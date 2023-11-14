/*
    Name
    -------------
    Harrison F    June 2020


    

    PROPS
    --------------
    url - data from custom API
    dataKey - name of the object the data is wrapped in
    valueKey - name of the field used for values
    labelKey - name of the field used for labels
    sortKey - if want to custom sort by lookup field, this is the name of the field
    sortNumerical - numerical sort. If not set to true defaults to alphabetical sort

        OR
    tableID - data from lookup table
        OR
    options - Hardcoded options


      
 */

import { Option, Select } from '@material-tailwind/react';
import { useFirstRender } from '@mui/x-data-grid';
import React from 'react';
import { useState } from 'react';
import { apiGetCall } from '../APIFunctions';


export default function SelectField(props) {
    const [options, setOptions] = useState([])

    useFirstRender(() => {
        if (props.options) {
            setOptions(props.options)
        }

        if (props.tableID) {
            GEToptions()
        } else if (props.url) {
            GETdata()
        }
    })


    function GEToptions() {
        const url = `Enquiry/lookup/?tableID=${props.tableID}`
        const callback = data => {
            let newOptions = []
            data = data.lookupList

            //Get the values and labels of each column
            for (let row of data) {
                newOptions.push({
                    value: row.code,
                    label: row.description,
                })
            }


            setOptions(newOptions)
        }
        const error = e => {
            console.error(e)
        }
        apiGetCall(url, callback, error)
    }

    function GETdata() {
        const callback = d => {
            if (props.dataKey) {
                d = d[props.dataKey]
            }


            //If needs sorting
            if (props.sortKey) {
                d = d.sort((a, b) => {
                    a = a[props.sortKey]
                    b = b[props.sortKey]

                    if (props.sortNumerical) {
                        return a - b
                    } else {
                        return a < b
                    }
                })
            }

            let newOptions = []

            for (let row of d) {
                newOptions.push({
                    value: row[props.valueKey],
                    label: row[props.labelKey]
                })
            }

            setOptions(newOptions)
        }
        const error = e => {
            console.error(e)
        }
        apiGetCall(props.url, callback, error)
    }

    const inputProps = { ...props }
    inputProps.className += " text-white"
    delete inputProps.dataKey
    delete inputProps.valueKey
    delete inputProps.labelKey


    return (
        <Select
            {...inputProps}
            onClick={null}
            onChange={null}
            color="yellow"
            labelProps={inputProps}
        >
            {options.map((opt, i) => (
                <Option
                    key={i}
                    value={opt.value}
                    onClick={() => props.onChange({ target: { name: props.name, value: opt.value } })}
                >
                    {opt.label}
                </Option>
            ))
            }
        </Select>
    );
}
