/*
    Name
    -------------
    Harrison F    June 2020


    

    PROPS
    --------------
      
 */

import { ClickAwayListener, Paper } from '@mui/material';
import React, { Component } from 'react';
import { isEmpty } from '../GeneralFunctions';
import BasicField from './BasicField';
import TimePickerOptions from './TimePickerOptions';

const styles = {
};

export default class JustTimePicker extends Component {


    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: [0, 0, 0],//[HH,mm,ss]
            firstMount: true,
        }

    }

    //Toggle open
    handleOpen = ev => {
        if (this.state.open) {
            this.handleClose()
        } else {
            this.setState({
                open: true,
            })
        }
    }

    //Only close if opened
    handleClose = () => {
        const { value } = this.state

        this.setState({
            open: false
        })

        let returnBody = {
            target: {
                name: this.props.name,
                type: this.props.type,
                value: `${value[0].toString().padStart(2, '0')}:${value[1].toString().padStart(2, '0')}:${value[2].toString().padStart(2, '0')}`
            }
        }

        this.props.onChange(returnBody)
    }

    handleChange = (type, newVal) => {
        let { value } = this.state

        if (type === "HH") {
            value[0] = newVal
        } else if (type === "mm") {
            value[1] = newVal
        } else if (type === "ss") {
            value[2] = newVal
        }

        this.setState({
            value: value
        })

    }

    componentDidUpdate() {
        if (this.state.firstMount) {
            this.setState({
                firstMount: false
            })
        }
    }

    componentDidMount() {

        //Set default values
        let value = [0, 0, 0]
        if (!isEmpty(this.props.value)) {
            const valueStr = this.props.value.split(':')

            value[0] = Number(valueStr[0])
            value[1] = Number(valueStr[1])
            value[2] = Number(valueStr[2])
        }
        this.setState({
            value: value,
        })

    }




    render() {
        const { value } = this.state
        const valueStr = () => {
            if (this.props.type === "mm:ss") {
                return value[1].toString().padStart(2, '0')
            } else if (this.props.type === "HH:mm") {
                return `${value[0].toString().padStart(2, '0')}:${value[1].toString().padStart(2, '0')}`
            }
        }


        return (
            <div>

                <BasicField
                    {...this.props}
                    value={valueStr()}
                    onClick={this.handleOpen}
                    type="text"
                />

                {(this.state.open || this.state.firstMount) &&
                    <ClickAwayListener onClickAway={this.handleClose}>
                        <article
                            id={`${this.props.name}PickerPaper`}
                            className='paper bg-gray-400'
                            style={{
                                position: "absolute",
                                zIndex: 10,
                                marginTop: -47,
                                padding: 5
                            }}
                            onBlur={this.handleOpen}
                        >
                            <section className='around noflex'>
                                {/*Hours*/}
                                {this.props.type.includes("HH") &&
                                    <TimePickerOptions
                                        value={value[0]}
                                        max={12}
                                        step={1}
                                        onChange={val => this.handleChange("HH", val)}
                                    />
                                }

                                {/*Minutes*/}
                                {this.props.type.includes("mm") &&
                                    <TimePickerOptions
                                        value={value[1]}
                                        max={59}
                                        step={5}
                                        onChange={val => this.handleChange("mm", val)}
                                    />
                                }

                            </section>
                        </article>
                    </ClickAwayListener>
                }
            </div>
        );
    }
}
