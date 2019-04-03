import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import classes from './Login.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from '../../../axios';



class Login extends Component {
    state = {
        modalShowDoc: false,
        modalemail: '',
        email: '',
        password: '',
        errorM: '',
        modemailError: '',
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

    
    submitHandlerDoc = (e) => {
        this.setState({
            modalShowDoc: false,
            modalemail: '',
            modemailError: ''
        })
    }

    openmodal = (e) => {
        e.preventDefault();
        this.setState({
            modalShowDoc: true
        })
    }

    modemailHandler = (e) => {
        e.preventDefault();

        this.setState({
            modalemail: e.target.value
        })
    }

    validatemod = () => {
        let isError = false;

        if(this.state.modalemail === '') {
            isError = true; 
        }

        let e = false;
        let pattern = /\S+@\S+\.\S+/;
        // let pattern = "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"; 
        if(this.state.modalemail.match(pattern)){
            e = true;
            this.setState({
                ...this.state,
                modemailError: ''
            })
       }

        if(e === false) {
            isError = true;
            this.setState({
             ...this.state,
            modemailError: 'Please Enter Valid Email'

            })
        }


        return isError;
    }



    submitHandlerModal = (e) => {

        e.preventDefault();

        const error = this.validatemod();
        if(!error){
            axios.get(`/reset/${this.state.modalemail}`)
        .then(res => {
            if(res.data === 'User not found'){
                
            this.setState({
                modemailError: res.data
            })

            }
            else {
                this.setState({
                    modemailError: 'Check your email',
                    modalemail: '',
                    
                })
            }
            
        })
        .catch(err => {
            
        })
        }

        
        // this.setState({

        // })
    }

     modalCloseDoc = () => this.setState({ modalShowDoc: false, modalemail: '', modemailError: '' });

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
                <Modal
        show={this.state.modalShowDoc}
        onHide={this.modalCloseDoc}
        size="sg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
                 <div className={classes.modalHeader}>
                     Forgot Password?
                </div>      
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div className={classes.modbody}>
                <p>Enter Your Email Id</p>
                <input type="text"  value={this.state.modalemail} onChange={this.modemailHandler}/>
                <br />
                <span style={{color: 'red'}}>{this.state.modemailError}</span>
                </div>
        </Modal.Body>
        <Modal.Footer>
         <Button onClick={this.submitHandlerDoc}>Close</Button>  
          <Button onClick={this.submitHandlerModal}>Submit</Button>
        </Modal.Footer>
      </Modal>    
            

                < br />
                <br />
                <button 
                style={{textDecoration: 'none', backgroundColor: 'white', border: 'none'}} 
                onClick={this.openmodal}>Forgot Password?</button>
                <br />
                <br />

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