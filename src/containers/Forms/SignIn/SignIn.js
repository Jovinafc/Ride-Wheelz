import React, { Component} from 'react';
import Input from '../../../components/UI/Input/Input'
import classes from './SignIn.module.css';
import {updateObject, checkValidity} from '../../../../src/shared/utility';
import Button from '../../../components/UI/FormComponents/Button';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import Spinner from '../../../components/UI/Spinner/Spinner';

class SignIn extends Component {
    state = {
        signInForm: {
            email: {
                elementType: 'input',
                label: 'Email*',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                label: 'Password*',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                value: '',
                validation: {
                    required: true,
                    isPassword: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false

    }

    componentDidMount() {
        if(this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.signInForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.signInForm[inputIdentifier].validation),
            touched: true
        });

        const updatedUserForm = updateObject(this.state.signInForm, {
            [inputIdentifier]: updatedFormElement
        });

        updatedUserForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedUserForm){
            formIsValid = updatedUserForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({signInForm: updatedUserForm, formIsValid: formIsValid});
     }

   handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.signInForm.email.value, this.state.signInForm.password.value);
   }
//    const user = {};

// for(let formElementIdentifier in this.state.signInForm){
//     user[formElementIdentifier] = this.state.signInForm[formElementIdentifier].value
    
// }
// console.log(user);

// axios.post('https://jsonplaceholder.typicode.com/users', user)
// .then((post)=>{
//     alert('Data Sent');
//     console.log('Res',post);
// }).catch(e => {
//     console.log(e);
//     alert('Some Error...');
// })
// }




    render() {
        const formElementsArray = [];
        for(let key in this.state.signInForm){
            formElementsArray.push({
                id: key,
                config: this.state.signInForm[key]
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
                    invalid= {!formElement.config.valid}
                    valueType = {formElement.id}
                    shouldValidate={formElement.config.validation}
                    touched = {formElement.config.touched}
                    label={formElement.config.label}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button
                        disabled={!this.state.formIsValid}
                        action={this.handleFormSubmit}
                        type={"btn btn-primary"}
                        title={"Sign In"}
                        style={buttonStyle}
                        />
                <NavLink to="/SignUp">    
                    <Button
                        action={this.handleToSignUp}
                        type={"btn btn-info"}
                        title={"Create a New Account"}
                        style={buttonStyle}
                        />
                    </NavLink>
            </form>
        );

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirect}/>
        }
    
        return (
            <div className={classes.SignIn}> 
                {authRedirect}
                <div className={classes.margin}>

                <h2 style={{padding:'10px', textAlign:'center'}}>Sign In</h2>
                {errorMessage}
    
                {form}
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password) => dispatch(actions.auth(email,password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

const buttonStyle = {
    margin: "10px 10px 10px 10px",

}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);