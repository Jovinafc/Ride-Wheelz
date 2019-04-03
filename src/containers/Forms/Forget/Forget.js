import React, {Component} from 'react';
import classes from './Forget.module.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


class Forget extends Component {

    state = {
        password : '',
        confirmpassword: '',
        successDisplay: false,
        email:"",
        passwordError: '',
        confirmpasswordError: '',
        updated: ''
    }

    componentDidMount = () => {
        const {match: {params}} = this.props;
        let a = params.token;

        axios.get(`/verify/${a}`)
        .then(res => {
            if(res.data.success ===true)
            {
                this.setState({
                    successDisplay:true,
                    email: res.data.email})
        
            }

        })

    }

    passwordHandler = (e) => {
        e.preventDefault();
        this.setState({
            password: e.target.value
        })
    }

    
    confirmpasswordHandler = (e) => {
        e.preventDefault();
        this.setState({
            confirmpassword: e.target.value
        })
    }

    
    validate = () => {
        let isError = false;

        //Password
        if(this.state.password === '') {
            isError = true;
            this.setState({
                passwordError: "Please Enter Password"
            })
        }

        let p = false;
        let pattern1 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(this.state.password.match(pattern1)){
            p = true;
            this.setState({
                passwordError: ''
            })
       }

    //    console.log(this.state.passwordError);


        if(p === false) {
            // console.log('first');
            isError = true;
            this.setState({
                passwordError: 'Please Enter Valid Password'
            })
        }

        // console.log(this.state.passwordError);



        //Confirm Password
        if(this.state.confirmpassword === '') {
            isError = true;
            this.setState({
                confirmpasswordError: "Please Enter Password"
            })
        }

        let q = false;
        let pattern2 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(this.state.confirmpassword.match(pattern2)){
            q = true;
            this.setState({
                confirmpasswordError: ''
            })
       }

        if(q === false) {
            // console.log('second');

            isError = true;
            this.setState({
             confirmpasswordError: 'Please Enter Valid Password'
            })
        }

        return isError;
    }

    submitHandler= (e) => {
        e.preventDefault();

        const error = this.validate();

        if(!error) {

            if(this.state.password !== this.state.confirmpassword){
                this.setState({
                    confirmpasswordError: 'Password does not match'
                })
            }
            else {
                axios.post('/reset-password', {
                    email: this.state.email,
                    password: this.state.confirmpassword
                })
                .then(res => {
                    if(res.data === 'Password Updated'){
                        this.setState({
                            updated: 'Password Updated Successfully',
                            password: '',
                            confirmpassword: ''
                        })
                    }
                })
            }
            
            }
            
            
    }



    render () {
        let dis = true;

        if(this.state.password !== '' && this.state.confirmpassword !== ''){
            dis = false;
        }
        return (
            <div className={classes.MainCont}>
                <div className={classes.cont}>
                {this.state.updated !== ''
                    ? <p style={{color: 'red'}}>{this.state.updated} go back to <NavLink to="/login">Login</NavLink> </p>
                    : null
                }

                    {this.state.successDisplay 
                    ? <div className={classes.smallcont}>
                    <p>Enter New Password<span style={{color: 'red'}}>*</span></p>
                    <input type="password" value={this.state.password} onChange={this.passwordHandler}/>
                    <br />
                    <span style={{color: 'red'}}>{this.state.passwordError}</span>
                    
                    <p>Confirm Password<span style={{color: 'red'}}>*</span></p>
                    <input type="password" value={this.state.confirmpassword} onChange={this.confirmpasswordHandler}/>
                    <br />
                    <span style={{color: 'red'}}>{this.state.confirmpasswordError}</span>    
                    < br/>


                    <button disabled={dis} className="btn btn-success" onClick={this.submitHandler}>Submit</button>
                    </div>
                    : <p>Invalid Token</p>
                    }
                  
                </div>
            </div>
        )
    }
}

export default Forget;