import React, { Component} from 'react';
import Input from '../../../components/UI/Input/Input'
import classes from './SignUpForm.module.css';
import {updateObject} from '../../../../src/shared/utility';
import axios from 'axios';
import Button from '../../../components/UI/FormComponents/Button';
//import { NavLink } from 'react-router-dom';

class SignUp extends Component {
    state = {
        signUpForm: {
            first_name: {
                elementType: 'input',
                label: 'First Name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your First Name'
                },
                value: ''
            },
            last_name: {
                elementType: 'input',
                label: 'Last Name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Last Name'
                },
                value: ''
            },
            phone_number: {
                elementType: 'input',
                label: 'Phone Number',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Enter Your Number'
                },
                value: ''
            },
            DOB: {
                elementType: 'date',
                label: 'DOB',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Enter your DOB'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                label: 'Email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Email'
                },
                value: ''
            },
            password: {
                elementType: 'input',
                label: 'Enter your password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Your Password'
                },
                value: ''
            }
   //         confirmpassword: {
   //             elementType: 'input',
   //             label: 'Confirm Password',
   //             elementConfig: {
   //                 type: 'password',
   //                 placeholder: 'Enter your password again'
   //             },
   //             value: ''
   //         }
        }
}

inputChangedHandler = (event, inputIdentifier) => {
    let updatedFormElement;
    
    if(inputIdentifier === 'DOB'){
        updatedFormElement = updateObject(this.state.signUpForm[inputIdentifier], {
            value: event
        })
    }
    else{
     updatedFormElement = updateObject(this.state.signUpForm[inputIdentifier], {
        value: event.target.value
    });
    }

    const updatedUserForm = updateObject(this.state.signUpForm, {
        [inputIdentifier]: updatedFormElement
    });

    updatedUserForm[inputIdentifier] = updatedFormElement;

    this.setState({signUpForm: updatedUserForm});
}

handleFormSubmit = (event) => {
    event.preventDefault();
   const users = {};

for(let formElementIdentifier in this.state.signUpForm){
    users[formElementIdentifier] = this.state.signUpForm[formElementIdentifier].value
    
}
console.log(users);

axios.post('/sign-up', {users: users})
.then((post)=>{
    alert('Data Sent');
    console.log('Res',post);
}).catch(e => {
    console.log(e);
    alert('Some Error...');
})
}

handleClearForm = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
        ...prevState,
        signUpForm: {
            ...prevState.signUpForm,
            fname: {
                ...prevState.signUpForm.fname,
                value: ''
            },
            lname: {
                ...prevState.signUpForm.lname,
                value: ''
            },
            number: {
                ...prevState.signUpForm.number,
                value: ''
            },
            dob: {
                ...prevState.signUpForm.dob,
                value: ''
            },
            email: {
                ...prevState.signUpForm.email,
                value: ''
            },
            password: {
                ...prevState.signUpForm.password,
                value: ''
            },
            confirmpassword: {
                ...prevState.signUpForm.confirmpassword,
                value: ''
            }

        }

    }))
    
  }




    render () {
        const formElementsArray = [];
        for(let key in this.state.signUpForm){
            formElementsArray.push({
                id: key,
                config: this.state.signUpForm[key]
            });
        }
        let form = (
            <form  >
                {formElementsArray.map(formElement => (
                    
                    <Input 
                    key={formElement.id}
                    elementType= {formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    valueType = {formElement.id}
                    label={formElement.config.label}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))} 

                <Button
                        action={this.handleFormSubmit}
                        type={"btn btn-primary"}
                        title={"Sign Up"}
                        style={buttonStyle}
                        />
                <Button
                    action={this.handleClearForm}
                    type={"btn btn-secondary"}
                    title={"Clear"}
                    style={buttonStyle}
                    />

            </form>
        );
          
        return (
            <div className={classes.SignUpForm}>
                <h2 style={{padding:'10px', textAlign:'center'}}>Sign Up</h2>    
                {form}
           </div>
        )
    }
}
const buttonStyle = {
    margin: "10px 10px 10px 10px",

}


export default SignUp;