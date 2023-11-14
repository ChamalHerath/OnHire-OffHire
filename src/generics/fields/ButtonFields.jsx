/*
    PROPS
    --------------
    name
    showLabel - whether the label of each option is shown
    options - [
        {
            value - value when selected
            label
            colour - {
                main - needed to match material/tailwind
                bg - background
                border
            }
            icon
        }
    ]
 */

import { IconButton } from '@material-tailwind/react';
import { Tooltip } from '@mui/material';
import React from 'react';

export default function ButtonField(props) {

    return (
        <section className='justify-around gap-2'>
            {props.options.map((option, i) => (
                <Tooltip
                    key={i}
                    title={option.label}
                >
                    <article className='items-center'>

                        <IconButton
                            size={props.size ?? "lg"}
                            color={option.color.main}

                            //Change style if this is selected
                            className={`${option.value === props.value ? option.color.bg + " text-white" : `bg-transparent border-2 text-black ${option.color.border}`}`}

                            /* 
                            return
                            target: {name,value}
                            */
                            onClick={() => props.onChange({ target: { name: props.name, value: option.value } })}
                        >
                            {option.icon}
                        </IconButton>
                        {props.showLabel &&
                            <span className='text-xs'>{option.label}</span>
                        }
                    </article>
                </Tooltip>
            ))}
        </section>
    );
}
