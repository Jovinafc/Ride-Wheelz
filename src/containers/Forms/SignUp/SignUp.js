import React,{ Component} from 'react';
import classes from './SignUp.module.css';
// import {DatePicker} from 'shineout';
// import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import axios from '../../../axios';
// import {DateInput} from '@opuscapita/react-dates';
// import DatePicker from "react-bootstrap-date-picker";
// import * as mom from 'react-moment';
import ModernDatePicker from 'react-modern-datepicker'
import './react-datetime.css';
import Aux from '../../../hoc/Auxilary';
import Input from '../../../components/UI/InputTag/Input';
import Alert from 'react-s-alert';
// import Datetime from 'react-datetime';
import * as moments from 'moment';



// let style = {
//     backgroundImage: `url(${pic})`,
//     backgroundRepeat: 'no-repeat',
//     width: '100%',
//     backgroundSize: 'auto',
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     // filter: 'blur(8px)'

// }

class SignUp extends Component {
    state = {
        first_name: '',
        last_name: '',
        phone_number: '',
        DOB: '',
        email: '',
        old_password: '',
        firstNameError: '',
        lastNameError: '',
        phone_numberError: '',
        DOBError: '',
        emailError:'',
        old_passwordError: '' 

    }

    componentDidMount= () => {
        window.scrollTo(0, 0)

    }

    fnameHandler = (e) => {
        let touched = null;
        touched = true;
        this.setState({first_name: e.target.value.trim()});
        // if(e.target.value.length <= 5){
        //     this.setState({
        //         firstNameError: 'Quite SHort'
        //     })
        // }
        // if(e.target.value.length > 5){
        //     this.setState({
        //         firstNameError: ''
        //     })
        // }


        if(touched === true){
            if(e.target.value.length === 0) {
                this.setState({
                    firstNameError: 'Please Enter Name'
                })
            }

            if(e.target.value !== ''){
                this.setState({
                    firstNameError: ''
                })
            }

        }
        
    }

    lnameHandler = (e) => {
        let touched = null;
        touched = true;
        // this.props.last_name= e.target.value
        this.setState({last_name: e.target.value.trim()});
        if(touched === true){
            if(e.target.value.length === 0) {
                this.setState({
                    lastNameError: 'Please Enter Last Name'
                })
            }

            if(e.target.value !== ''){
                this.setState({
                    lastNameError: ''
                })
            }

            

        }
        // let v = false;

            //         let lname = /^[A-Za-z]+$/;
            // if((this.state.last_name.match(lname))){
            //     v = true;
            // }
            
            // if(v === false) {
            //     this.setState({
            //         ...this.state,
            //         lastNamerror: 'Please Enter Only Characters'
            //     })
            // }


    }
    
dateHandler = (moment) => {
    // console.log(moment);
    let s = moments(moment).format('YYYY-MM-DD');
    // console.log(s);
    let curr = moments().format('YYYY-MM-DD');

    let difference = moments(curr).diff(s, 'days');
    // console.log(difference);
    
    if(difference > 6570){
        this.setState({
            DOB: s,
            DOBError: ''
        })
    }
    else{
        this.setState({
            DOBError: "You should be above 18 years old!"
        })
    }
    // console.log(curr);
    // if(s > )
    this.setState({
        DOB: s
    })

}

    phoneHandler = (e) => {
        let touched = null;
        let v = false;
        touched = true;
        // this.props.phone_number= e.target.value
        this.setState({phone_number: e.target.value});

        let phoneno = /^\d{10}$/;
        if((e.target.value.match(phoneno))){
            v = true;
        }
        
        if(v === false) {
            this.setState({
                phone_numberError: 'Please Enter Valid Number(10 digits)'
            })
        }
        // if(e.target.value === 9) {
        //     this.setState({
        //         phone_numberError: 'Enter Correct Number'
        //     })
        // }
        if(touched === true){
            if(e.target.value.length === '') {
                this.setState({
                    phone_numberError: 'Please Enter Phone Number'
                })
            }

            if(e.target.value !== ''){
                this.setState({
                    phone_numberError: ''
                })
            }
        }

    }
    
    dobHandler = (e) => {

        let s = moments(e).format('YYYY-MM-DD');
    // console.log(s);
    let curr = moments().format('YYYY-MM-DD');

    let difference = moments(curr).diff(s, 'days');
    // console.log(difference);

    if(difference > 6570){
        this.setState({
            DOB: s,
            DOBError: ''
        })
    }
    else{
        this.setState({
            DOBError: "You should be 18 years old!"
        })
    }
    // console.log(curr);
    // if(s > )
    this.setState({
        DOB: s
    })

    
        // this.setState({DOB: e})

        // if(touched === true){
        //     if(e === 0) {
        //         this.setState({
        //             DOBError: 'Please Enter DOB'
        //         })
        //     }

        //     if(e !== ''){
        //         this.setState({
        //             DOBError: ''
        //         })
        //     }
        // }
    }

    emailHandler = (e) => {
        let touched = null;
        touched = true;
        this.setState({
            email: e.target.value
        })

        if(touched === true){
            if(e.target.value.length === 0) {
                this.setState({
                    emailError: 'Please Enter Email ID'
                })
            }

            if(e.target.value !== ''){
                this.setState({
                    emailError: ''
                })
            }
        }
    }

    oldPasswordHandler = (e) => {
        let touched = null;
        touched = true;
        this.setState({
            old_password: e.target.value
        })

        if(touched === true){
            if(e.target.value.length === 0) {
                this.setState({
                    old_passwordError: 'Please Enter Password'
                })
            }

            if(e.target.value !== ''){
                this.setState({
                    old_passwordError: ''
                })
            }
        }
    }

    // helper = (element, errorname, errorMessage) => {
    //     if(element === ''){
    //     isError = true;

    //     this.setState({
    //         ...this.state,
    //         errorname: errorMessage
    //     })
    //     }
    // }

    validate = () =>  {
        let isError = false;
        let errors = {};

//First Name
        if(this.state.first_name === '') {
            isError = true;
            this.setState({
                ...this.state,
                firstNameError: "Enter Name"
            })
            errors.firstNameError = "Enter First Name"
        }

        let g = false;
        let fname = /^[A-Za-z]+$/;
        if((this.state.first_name.match(fname))){
            g = true;
        }
        
        if(g === false) {
            isError = true;
            this.setState({
                ...this.state,
                firstNameError: 'Enter Only Characters'
            })
            errors.firstNameError = 'Enter Only Characters'
        }
        else{
            this.setState({
                ...this.state,
                firstNameError: ''
            })
            errors.firstNameError = ''
            
        }



// Last Name   
        if(this.state.last_name === '') {
            isError = true;
            this.setState({
                ...this.state,
                lastNameError: "Enter Last Name"
            })
            errors.lastNameError = "Enter Last Name"
        }

        
        let k = false;
        let lname = /^[A-Za-z]+$/;
        if((this.state.last_name.match(lname))){
            k = true;
        }
        
        if(k === false) {
            isError = true;
            this.setState({
                ...this.state,
                lastNamerror: ' Enter Only Characters'
            })
            errors.lastNameError = 'Enter Only Characters'
        }
        else {
            this.setState({
                ...this.state,
                lastNamerror: ' Enter Only Characters'
            })
            errors.lastNameError = 'Enter Only Characters'
        }

//Phone Number
        if(this.state.phone_number === '') {
            isError = true;
            this.setState({
                ...this.state,
                phone_numberError: "Please Enter Phone Number"
            })
            errors.phone_numberError = "Please Enter Phone Number"

        }

        let v = false;
        let phoneno = /^\d{10}$/;
        if((this.state.phone_number.match(phoneno))){
            v = true;
        }
        
        if(v === false) {
            isError = true;
            this.setState({
                ...this.state,
                phone_numberError: 'Please Enter Valid Number(10 digits)'
            })
            errors.phone_numberError = 'Enter Valid Number'
        }
        else{
            this.setState({
                ...this.state,
                phone_numberError: ''
            })
            errors.phone_numberError = ''
        }

//DOB

        if(this.state.DOB === '') {
            isError = true;
            this.setState({
                ...this.state,
                DOBError: "Please Enter Correct DOB"
            })
            errors.DOBError = "Please Enter Correct DOB"
        }

        let s = moments(this.state.DOB).format('YYYY-MM-DD');

        let curr = moments().format('YYYY-MM-DD');

        let difference = moments(curr).diff(s, 'days');
        // console.log(difference);

         
            if(difference > 6570){
                this.setState({
                    DOB: s,
                    DOBError: ''
                })
            }
            else{
                isError = true;
                this.setState({
                    DOBError: "You should be above 18 years old!"
                })
            }
   
//Email Validation

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
        // let pattern = "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"; 
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
            emailError: 'Please Enter Valid Email Address'

            })
            errors.emailError = "Enter Valid Email Address"
        }

// Password Validation        

        if(this.state.old_password === '') {
            isError = true;
            this.setState({
                ...this.state,
                old_passwordError: "Please Enter Password"
            })
            errors.old_passwordError = "Please Enter Password"
        }

        let p = false;
        // let pattern1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let pattern1 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(this.state.old_password.match(pattern1)){
            p = true;
            this.setState({
                ...this.state,
                old_passwordError: ''
            })
            errors.old_passwordError = ""
       }

        if(p === false) {
            isError = true;
            this.setState({
             ...this.state,
            old_passwordError: 'Please Enter Valid Password'

            })
            errors.old_passwordError = "Should Contain atleast one capital letter,one small letter and a digit"
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

      const error = this.validate();
      if(!error){
      e.preventDefault();
      const user = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone_number: this.state.phone_number,
        DOB: this.state.DOB,
        email: this.state.email,
        password: this.state.old_password
      }
      
      axios.post('/sign-up', {users: user})
      .then(res => {
        //   console.log(res);
          Alert.info('Sign Up Complete', {
            position: 'top',
            effect: 'bouncyflip',
            timeout: 3000,
            html: false
        });
          this.setState({
              first_name: '',
              last_name: '',
              phone_number: '',
              DOB: '',
              email: '',
              old_password: ''
          })
      })
      .catch(err => {
        //   console.log(err);
          Alert.warning('Server Under Maintenance, Please try again later', {
            position: 'top',
            effect: 'bouncyflip',
            timeout: 3000,
            html: false
        });
        this.setState({
            first_name: '',
            last_name: '',
            phone_number: '',
            DOB: '',
            email: '',
            old_password: ''
        })
      });
      

    }
    else {
        // console.log("data not sufficient")
    }

}


    render () {
        let disable = true;
        if(this.state.first_name !== '' && 
            this.state.last_name !== '' &&
            this.state.phone_number !== '' &&
            this.state.DOB !== '' &&
            this.state.email !== '' &&
            this.state.old_password !== ''){
                disable = false;
            }

        // console.log(this.state);
        return (
            <Aux>
            <div className={classes.Container}>
            <div style={{height: '20px'}}></div>
            <div className={classes.formCont}>
            <h4 style={{textAlign: 'center', marginBottom: '2%'}}> Sign Up </h4>
                <div className={classes.topForm}>
                <Form  className="form-horizontal">
                 
                 {/* className={cx(globalStyles.label, globalStyles['col-sm-2 control-label'], classes.Inp)} */}
 
                         {/* <div className="form-group">
                     <label htmlFor="fname"  className="col-sm-4 control-label">First Name<span style={{color: 'red'}}>*</span></label>
                     <div className="col-sm-6">
                     <input type="text" className="form-control" id="fname" onChange={this.fnameHandler} value={this.state.first_name}/>
                     <span style={{color: 'red'}}>{this.state.firstNameError}</span>   
                     </div>
                         </div> */}

                        <div >
                     <label htmlFor="fname" >First Name<span style={{color: 'red'}}>*</span></label>
                     
                     <Input type="text" id="fname" changed={this.fnameHandler}  value={this.state.first_name}/>
                     <span style={{color: 'red'}}>{this.state.firstNameError}</span>   
                     
                         </div>
                     
{/*  
                         <div className="form-group">
                     <label htmlFor="lname" className="col-sm-4 control-label">Last Name<span style={{color: 'red'}}>*</span></label>
                     <div className="col-sm-6">
                     <input type="text" className="form-control" id="lname" onChange={this.lnameHandler} value={this.state.last_name}/>
                     <span style={{color: 'red'}}>{this.state.lastNameError}</span>   

                     </div>
                         </div> */}

                         
                        <div >
                     <label htmlFor="lname" >Last Name<span style={{color: 'red'}}>*</span></label>
                     <Input type="text" id="lname" changed={this.lnameHandler} value={this.state.last_name}/>
                     <span style={{color: 'red'}}>{this.state.lastNameError}</span>   

                         </div>
 
                         {/* <div className="form-group">
                     <label htmlFor="phone" className="col-sm-4 control-label">Phone Number<span style={{color: 'red'}}>*</span></label>
                     <div className="col-sm-6">
                     <input type="number" className="form-control" id="phone" onChange={this.phoneHandler} value={this.state.phone_number}/>        
                     <span style={{color: 'red'}}>{this.state.phone_numberError}</span>   

                     </div>    
                         </div>
  */}

                        <div >
                     <label htmlFor="phone" >Phone Number<span style={{color: 'red'}}>*</span></label>
                     
                     <Input type="number" id="phone" changed={this.phoneHandler} value={this.state.phone_number}/>        
                     <span style={{color: 'red'}}>{this.state.phone_numberError}</span>   

                         
                         </div>
 


                         <div>
                     <label htmlFor="dob" >Date of Birth<span style={{color: 'red'}}>*</span></label>
                   
                     <div className={classes.moddivCont}>
                    {/* <DatePicker id="dob" onChange={this.dobHandler} value={this.state.DOB} /> */}
                    <ModernDatePicker 
                    id="dob"
                    format={'YYYY-MM-DD'} 
                    date = {this.state.DOB}
                    onChange={(date) => this.dobHandler(date)} 
                    showBorder
                    className={classes.modernDiv} 
            
                    />
                    {/* <Datetime 
                    timeFormat={false}
                    id="dob"
                    style={{backgroundColor: '#141313'}}
                    dateFormat="YYYY-MM-DD"
                    onChange={this.dateHandler}
                    className={classes.modernDiv}
                    />
                     */}
                    {/* <DatePicker id="dob" style={{height: '100px'}} onChange={this.dobHandler} value={this.state.DOB} />  */}

                    </div>

                     <span style={{color: 'red'}}>{this.state.DOBError}</span>   

                    

                         </div>


                         <div >
                     <label htmlFor="emails"> Email<span style={{color: 'red'}}>*</span></label>
                     <Input type="text" id="emails" changed={this.emailHandler} value={this.state.email}/>
                     <span style={{color: 'red'}}>{this.state.emailError}</span>   

                         </div>
                     
                
 
                         <div>
                     <label htmlFor="old_password">Current Password<span style={{color: 'red'}}>*</span></label>
                     <Input type="password" className="form-control" id="old_password" changed={this.oldPasswordHandler} value={this.state.old_password}/>
                     <span style={{color: 'red', fontSize: '0.7em'}}>{this.state.old_passwordError}</span>   


                         </div>
 


 

                         
                  </Form>

                    

                  </div>

                  <div className={classes.register}>
                         <button className={classes.save} disabled={disable} type="button" onClick={this.submitHandler} >Register</button>
                         </div>

            </div>

            
            <br />
            </div>
            </Aux>
        )
    }
}

export default SignUp;



