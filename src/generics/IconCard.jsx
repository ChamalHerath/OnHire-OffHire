/*
    IconCard
    -------------
    Harrison F    May 2022


    PROPS
    --------------
    label    
    icon
    colour
    backgroundColour
    disabled
    onClick
      
 */

import React from 'react';


export default function IconCard(props) {

    return (
        <article
            className={`${props.colours.card} 
            rounded-xl  shadow-lg
            align-middle justify-center items-center 
            gap-2 p-2  
            cursor-pointer 
            duration-100`}
            onClick={() => {
                if (!props.disabled) {
                    props.onClick();
                }
            }}
        >
            {{
                ...props.icon,
                ...{
                    props: {
                        className: props.colours.children ?? "",
                        style: {
                            fontSize: 70
                        }

                    }

                }
            }}
            <h1
                className={`text-2xl text-center font-bold ${props.colours.children}`}
            >
                {props.label}
            </h1>
        </article>
    );
}
