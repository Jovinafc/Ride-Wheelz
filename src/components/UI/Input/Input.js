import React from 'react';
import classes from './Input.module.css';
//import validators from '../../../shared/validator';
// import { DatePicker} from 'shineout';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch(props.elementType){
        case ('input'):
            inputElement = <input 
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea 
            className="form-control"
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>
            break;
        case('date'):
            inputElement = <input
            placeholder="Select DOB"
            onChange={props.changed}
            />
            break;
        case ('select'):
            inputElement = (<select>

            </select>);
            break;
        default:
            inputElement = <input
            className={inputClasses.join(' ')}
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed} />
    }  

    let validationError = null;
    if(props.invalid && props.touched){
        if(props.valueType=== 'email'){
          validationError = <p className={classes.ValidationError}>Please Enter a Valid Email</p>
        }
        else{
        validationError = <p className={classes.ValidationError}>Please Enter a Valid Password</p>
        }
    }
 
    return (
        <div className={classes.Input}>
            <label className="form-label" style={{fontFamily:'Helvetica', fontStyle: ''}}>{props.label}</label> <br />
            {inputElement} 
            {validationError}
            
        </div>
    );
};


export default input;