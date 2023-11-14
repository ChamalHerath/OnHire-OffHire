/*
    PROPS
    --------------
    
      
 */

import React, { Component } from 'react';

export default class TimePickerOptions extends Component {

    createValues = () => {
        let arr = []
        for (let i = 0; i <= this.props.max; i += this.props.step) {
            arr.push(
                <div
                    key={i}
                    onClick={() => this.props.onChange(i)}
                    className={`${i === this.props.value ? "bg-primary text-black" : "bg-gray-400 text-black"} clickable
                    p-3
                    `}
                >
                    <span>{i}</span>
                </div >
            )
        }

        return arr
    }



    render() {
        return (
            <article
                className='h-[200px] overflow-auto m-1'
            >
                {this.createValues()}
            </article>
        );
    }
}
