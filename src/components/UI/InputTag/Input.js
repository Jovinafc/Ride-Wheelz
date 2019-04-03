import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    return (
        <div>
            <input 
            className={classes.inputdiv}
            value={props.value}
            type={props.type}
            onChange={props.changed}
            placeholder={props.placeholder}
            />
        </div>
    )
}

export default Input;
