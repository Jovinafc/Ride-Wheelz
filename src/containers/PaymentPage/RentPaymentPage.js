import React, { Component } from 'react';
import classes from './RentPaymentPage.module.css';
import axios from '../../axios';
import {DatePicker} from 'shineout';
import { object } from 'prop-types';
import Card from './Card';
import { connect} from 'react-redux';
import { Form, Field } from 'react-final-form'
import Styles from './Styles';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
  } from './cardUtils'


class RentPaymentPage extends Component {
    state = {
        vehicles: {},
        Invalid: false,
        newdate: '',
        cardNumber: '',
        cardName: '',
        cvc: '',
        expiry: '',
        otp: '',
        otpdisplay: false

    }
    componentDidMount() {
        window.scrollTo(0,0);
        const {match: {params}} = this.props
        let a = params.vehicle_id;
        a = a.substring(1);
     
        axios.post(`/fetch-specific-vehicle/${a}`, {user_id: localStorage.getItem('userId')})
        .then(response => {
          if(response===null)
          {

          }
          else
          {
           this.setState({vehicles: response.data});
          }
        })
        .catch(err => {
            this.setState({Invalid: true})
        });   
    }

    
    newDateHandler = (e) => {
        this.setState({newdate: object})
    }

    cardnumHandler = (e) => {
        this.setState({cardNumber: e.target.value});
     
    }

    setOtp = (e) => {
        e.preventDefault();
        this.setState({
            otp: e.target.value
        })
      }
  
      otpsender = (e) => {
        e.preventDefault();
  
        axios.post('/confirm-payment', {email: this.props.email, token: this.state.otp})
        .then(response => {
          axios.post('/rent-now', {user_client_id: this.props.user_id, 
            vehicle_id: this.state.vehicles.vehicle_id,
            start_date: this.state.startdatetime,
            end_date: this.state.enddatetime})
            .then(response => {
            
            alert("Rented")
            this.setState({
                startdatetime : '',
                enddatetime: ''
            })
            })
          alert("Success");
        })
        .catch(err => {
        })
      }
  

    render () {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


     const onSubmit = async values => {
        await sleep(300)

        let expiry = values.expiry;
        if(expiry.length > 5){
          expiry = expiry.substring(0,5);
        }

        let cardNum = values.number;
        if(cardNum.length > 17){
          cardNum = cardNum.substring(0,17);
        }
        else{
        }
        
       
        const cardDetails = {
            name: values.name,
            card_no: cardNum,
            cvv: values.cvc,
            expiry_date: expiry,
            amount: this.state.vehicles.price_per_day
          }
          axios.post('/pay-now', {card_details: cardDetails})
          .then(response => {
            if(response.data === 'VALID'){
              axios.post('/request-otp', {email: this.props.email})
              this.setState({
                otpdisplay: true
              })
            }
  
          })
          .catch(err => {
          })
          
        
      }

        let dc = <div className={classes.DateContainer}>
        <form className="form-horizontal">
        <div className="form-group" >
            <label className="control-label col-sm-2" htmlFor="start">Start Date:</label> 
            <DatePicker id="start" placeholder="Start Date" format="yyyy-M-d HH:mm" type="datetime" value={this.state.startdatetime} onChange={this.startDateHandler}/>
            </div>
            <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="end">End Date:</label>
            <DatePicker id="end" placeholder="End Date" format="yyyy-M-d HH:mm" type="datetime" value={this.state.enddatetime} onChange={this.endDateHandler}/>
            </div>                    
            <br /> <br /> 

            <button onClick={this.proceedHandler} className="btn btn-danger">Proceed To Payment</button>
        </form>
            
        </div>

    let otp = null
    if(this.state.otpdisplay){
      otp = <div>
              OTP <input onChange={this.setOtp} value={this.state.otp} type="number" />
              <br />
              <button onClick={this.otpsender}>Confirm</button>
          </div>

    }


        return (
            <div className={classes.Container}>
                <h3> Payment Page </h3>
                <div>
                    {this.state.Invalid === true
                    ? <h4> Error 404 </h4>
                    : 
                    <div>

                        

  <Styles>
    <Form
      onSubmit={onSubmit}
      render={
        ({
        handleSubmit,
        reset,
        submitting,
        pristine,
        values,
        active,
        disable = true
      }) => {
         disable = values.number > 0 && values.name > 0 && values.expiry > 0 && values.cvc > 0;
        return (
          <form onSubmit={handleSubmit}>
             <Card
               number={values.number || ''}
               name={values.name || ''}
               expiry={values.expiry || ''}
               cvc={values.cvc || ''}
               focused={active}
            />
            <div>
              <Field
                name="number"
                component="input"
                type="text"
                value={this.state.number}
                pattern="[\d| ]{16,22}"
                placeholder="Card Number"
                format={formatCreditCardNumber}
              />
            </div>
            <div>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <Field
                name="expiry"
                component="input"
                type="text"
                pattern="\d\d/\d\d"
                placeholder="Valid Thru"
                format={formatExpirationDate}
              />
              <Field
                name="cvc"
                component="input"
                type="password"
                pattern="\d{3,4}"
                placeholder="CVC"
                format={formatCVC}
              />
            </div>
            <div className="buttons">
              <button type="submit" disabled={disable}>
                Rent {this.state.vehicles.price_per_day}
              </button>
            </div>
            </form>
        )
      }}
    />
  </Styles>


                    </div>
                    
                    }
                    
                        
                </div>
                    {otp}
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      email: state.auth.email,
      user_id: state.auth.user_id
    }
  }
  

export default connect(mapStateToProps, null)(RentPaymentPage);