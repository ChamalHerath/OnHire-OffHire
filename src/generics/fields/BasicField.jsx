/*
    Basic Fields
    -------------
    Harrison F    June 2020


    PROPS
    --------------
    name
    label
    type - {select, checkbox, file,buttons, HH:mm, mm:ss}
    value
    className
    errMsg
      
 */

import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import React from 'react';
import SelectField from './SelectField';
import FileInput from './FileInput'
import { Input } from '@material-tailwind/react';
import ButtonField from './ButtonFields';
import JustTimePicker from './JustTimePicker';

export default function BasicField(props) {

    switch (props.type) {
        case "select":
            return <SelectField {...props} />
        case "checkbox":
            return <FormControlLabel
                sx={{ alignItems: "end" }}
                label={<Typography style={{ marginBottom: 10 }}>{props.label}</Typography>}
                control={
                    <Checkbox
                        checked={props.value === 1}
                        {...props}
                        onChange={null}
                        onClick={props.onCheck}
                    />
                }
            />
        case "file":
            return <FileInput {...props} />
        case "buttons":
            return <ButtonField {...props} />
        case "HH:mm":
        case "mm:ss":
            return <JustTimePicker {...props} />
        default:
            break
    }

    let inputProps = { ...props }
    delete inputProps.errMsg
    inputProps.className = inputProps.className + ` ${!props.disabled ? 'peer-placeholder-shown:text-white text-white' : 'peer-placeholder-shown:text-black text-black'}`

    return (
        <article>
            {props.disabled &&
                <p className='text-xs text-white'>{props.label}</p>
            }
            <Input
                {...inputProps}
                color="yellow"
                error={props.errMsg ? props.errMsg.includes(props.label) : false}
                variant={props.variant ?? "outlined"}
                labelProps={inputProps}
                containerProps={inputProps}
            />
        </article>
    );
}

