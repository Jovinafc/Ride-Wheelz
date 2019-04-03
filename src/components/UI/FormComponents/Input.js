import React from "react";
import PropTypes from 'prop-types';



const Input = props => {
  //console.log(props.value);
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <input
        className="form-control"
        id={props.name}
        name={props.name}
        type={props.inputtype}
        value={props.value}
        onChange={props.inputchanged}
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  );
};

Input.propTypes = {
  inputchange: PropTypes.func,

}

export default Input;
