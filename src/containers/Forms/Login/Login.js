import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import classes from './Login.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errorM: '',
        valid: true,
        emailError:false,
        passwordError: false,
        emailErrors : this.props.error === "User Does Not Exist",
        passwordErrors : this.props.error === "Invalid Password"
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.props.authFail();   
        if(this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    emailHandler = (e) => {   
        this.setState({
            email: e.target.value
        })
    }

    passwordHandler = (e) => {    
        this.setState({
            password: e.target.value
        })
    }

    checkAll = (email,password) => {
        if(this.state.email !== '' && this.state.password !== ''){
            this.setState({
                valid: false
            });
        }
    }

    validate = () => {
        let isError = false;

        if(this.state.email === '') {
            isError = true; 
        }

        if(this.state.password === ''){
            isError = true;
        }

        if(this.state.password !== '' && this.state.email !== ''){
            this.setState({
                valid: false
            })
        }
        return isError;
    }

    submitHandler = (event) => {
        const error = this.validate();
        if(!error){
            event.preventDefault();
            this.props.onAuth(this.state.email, this.state.password);  
        }
    }

    render () {
        const {email, password} = this.state;

        const enabled = email.length > 0 && password.length > 0;
       
        let form = (
            <div>
                <div className="form-group">
                <br/><br/>
                    <TextField 
                        placeholder="Email" 
                        type="text" 
                        style={{width: '60%'}}
                        value={this.state.email}
                        error= {this.props.error === "User Does Not Exist"}
                        helperText={this.props.error === "User Does Not Exist" ? 'Email Id does not exist' : ' '}
                        onChange={this.emailHandler}/>
                </div> <br />
                 <div className="form-group">
                    <TextField  
                        value={this.state.password}
                        placeholder="Password" 
                        type="password"
                        style={{width: '60%'}}
                        error = {this.props.error === "Invalid Password"}
                        helperText={this.props.error === "Invalid Password" ? 'Invalid Password' : ''} 
                        onChange={this.passwordHandler}/>
                         <br />
                 </div>
                <button disabled={!enabled} className="btn btn-primary" > Login</button>
                        <p>Not Registered?  <NavLink to="/SignUp">Sign Up Here</NavLink></p>
            </div>
    );

        if(this.props.loading){
            form = <Spinner />
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return (
                <div className={classes.loginCont}>

                    <div className={classes.bet}> </div>   

                    <div className={classes.cont}>
                        <div className={classes.top}>
                            <h3 style={{textAlign: 'center'}}> Login </h3>
                        </div>
                            <form className={classes.form} onSubmit={this.submitHandler} >
                                {form}
                            </form>
                            {authRedirect}    
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
        authRedirectPath: state.auth.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password) => dispatch(actions.auth(email,password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath( '/' )),
        authFail: () => dispatch(actions.authFail(null))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);