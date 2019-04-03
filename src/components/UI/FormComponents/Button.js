import React, { Fragment} from "react";
import { MDBBtn } from "mdbreact";


const Button = props => {
 // console.log(props.style);
  return (
    
    <Fragment>
    <MDBBtn
      color="primary"
      rounded
      style={props.style}
      disabled={props.disabled}
      className={
        props.type
      }
      
      onClick={props.action}
    >
      {props.title}
    </MDBBtn>
    </Fragment>
  );
};

export default Button;
