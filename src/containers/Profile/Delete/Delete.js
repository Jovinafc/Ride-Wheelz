import React,{Component} from 'react';
import classes from './Delete.module.css';
import ProfNav from '../ProfNav/ProfNav';
import Modal from '../../../components/UI/Modal/Modal';
import Aux from '../../../hoc/Auxilary';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { connect} from 'react-redux';
import * as actions from '../../../store/actions/auth';
import {Redirect} from 'react-router-dom';

class Delete extends Component {

        state = {
            show: false,
            email: '',
            password: '',
            user_id: this.props.user_id,
            emailError: '',
            passwordError: ''
        }  

    deletaHandler = (e) => {
        e.preventDefault();
        this.setState({show: true})

    }


    
    cancel = () => {
        this.setState({show: false})
    }

    emailHandler = (e) => {
        this.setState({email: e.target.value});
    }

    passwordHandler = (e) => {
        this.setState({password: e.target.value});
    }

    validate = () => {
        let isError = false;
        let errors = {};

        if(this.state.email === '') {
            isError = true;
            this.setState({
                ...this.state,
                emailError: "Please Enter Email ID"
            })
            errors.emailError = "Please Enter Email ID"
        }

        let e = false;
        let pattern = /\S+@\S+\.\S+/;
        if(this.state.email.match(pattern)){
            e = true;
            this.setState({
                ...this.state,
                emailError: ''
            })
            errors.emailError = ""
       }

        if(e === false) {
            isError = true;
            this.setState({
             ...this.state,
            emailError: 'Please Enter Correct ID'

            })
            errors.emailError = "Enter Valid Email Address"
        }

// Password Validation        

        if(this.state.password === '') {
            isError = true;
            this.setState({
                ...this.state,
                passwordError: "Please Enter Password"
            })
            errors.passwordError = "Please Enter Password"
        }

        let p = false;
        // let pattern1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let pattern1 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(this.state.password.match(pattern1)){
            p = true;
            this.setState({
                ...this.state,
                passwordError: ''
            })
            errors.passwordError = ""
       }

        if(p === false) {
            isError = true;
            this.setState({
             ...this.state,
            passwordError: 'Please Valid Password'

            })
            errors.passwordError = "Enter Valid Password"
        }



        if(isError){
            
        this.setState({
            ...this.state,
            ...errors
        })  
        }

        return isError;


    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log('inside submit')
        const error = this.validate();
        if(!error){
            console.log('inside submit with no errors');
    
        axios.post('/delete-account', {email: this.state.email, password: this.state.password, user_id: this.state.user_id})
        .then(res =>{
            this.props.onLogout();
            
        })
        .catch(err => {
            // console.log(err);
            // console.log(err.response.data);
            this.setState({
                passwordError: err.response.data
            })

        });

        }
    }


    render () {

        let dis = true;
        if(this.state.email !== ''  && this.state.password !== ''){
            dis = false;
        }

        let mod = null;
         mod = <div>
                    <form className={classes.form}>

            <div className="form-group">
            <h3 style={{textAlign: 'center'}}> Delete Account </h3>
            <hr style={{border: '1px solid black'}}/>

            <br/><br/>
            <TextField                         
            error = {this.props.emailError}
            label="Email" id="email" placeholder="Email" type="text" onChange={this.emailHandler}/>
            <br />
            <span style={{color: 'red'}}>{this.state.emailError}</span>
            </div>

            <br />

            <div className="form-group">

            <TextField  
            label="Password" 
            error = {this.props.error}
            id="pass" placeholder="Password" type="password" onChange={this.passwordHandler}/>

            <br />
            <span style={{color: 'red'}}>{this.state.passwordError}</span>

            </div>
            <button disabled={dis} className="btn btn-primary" onClick={this.submitHandler}> Delete</button>
    </form>
                </div>

            let authRedirect = null;
            if(!this.props.isAuthenticated){
                authRedirect = <Redirect to={this.props.authRedirectPath}/>
            }


        return (
            <Aux>

            {authRedirect}

            <div className={classes.Container}>

            <Modal show={this.state.show} modalClosed={this.cancel}>
                {mod}
            </Modal>
           <div className={classes.Menu}>
                <ProfNav />
            </div>

            <div className={classes.Main}>
                <div>
                <h2 style={{textAlign: 'center'}}>Delete Your Account</h2>
                <hr style={{border: '1px solid black'}}/>

                
                <p style={{marginTop: '30px'}}>Are You Sure you want to Delete your account?<b>     All your data will be deleted permanently</b></p>

                  
                <div style={{textAlign: 'center'}}>
                <button className="btn btn-danger"  onClick={this.deletaHandler} >Delete</button>

                </div>
                </div>
            </div>

        </div>
            

        
        </Aux>    
            
        );
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath

    };
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};





export default connect(mapStateToProps,mapDispatchToProps)(Delete);