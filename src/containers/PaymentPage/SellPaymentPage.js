import React, { Component } from 'react';
import classes from './SellPaymentPage.module.css';
import axios from 'axios';
import Card from './Card';
import * as actions from '../../store/actions/vehicle_click';
import { Form, Field } from 'react-final-form'
import Styles from './Styles';
import { Redirect } from 'react-router-dom';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
  } from './cardUtils'
import { connect} from 'react-redux';
import { css } from '@emotion/core';
import {ClipLoader} from 'react-spinners';
import  * as moments from 'moment';
import Alert from 'react-s-alert';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: yellow;
`;

class SellPaymentPage extends Component {
    state = {
        vehicles: {},
        Invalid: true,
        number: '',
        name: '',
        cvc: '',
        expiry: '',
        focused: '',
        otp: '',
        otpdisplay: false,
        spin: false,
        loading: '',
        days: ''
    }

    date_diff_indays = function(date1, date2) {
      let dt1 = new Date(date1);
      let dt2 = new Date(date2);
      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
   }
    componentDidMount() {
        window.scrollTo(0,0);


        const {match: {params}} = this.props
        let a = params.vehicle_id;
        a = a.substring(1);

        axios.post(`/fetch-specific-vehicle`, {user_id: localStorage.getItem('userId'), vehicle_id: a})
        .then(response => {
          if(response===null)
          {
              
          }
          else
          {
           this.setState({vehicles: response.data[0]});
           if(response.data[0].price === null){
                this.props.type_payment('Rent');
           }
           else{  
                this.props.type_payment('Sell');
           }
          }
        })
        .catch(err => {
            this.setState({Invalid: true})
        });   

        let sd = this.props.start;
        let ed = this.props.end;
        

       let sdd = moments(sd).format('MM/DD/YYYY');
       let edd = moments(ed).format('MM/DD/YYYY');
       let diff = this.date_diff_indays(sdd,edd);
       

        if(diff === 0){
            this.setState({
                days: 1
            })
            this.props.price_on_days(1);
        }
        else {
        this.setState({
            days: diff
        })
        this.props.price_on_days(diff);

     }       


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
        alert("Success");
      })
      .catch(err => {
      })
    }

    render () {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

     const onSubmit = async values => {

       this.setState({loading: true})
        await sleep(300)

        let expiry = values.expiry;
        if(expiry.length > 5){
          expiry = expiry.substring(0,5);
        }

        let cardNum = values.number;
        if(cardNum.length > 19){
          cardNum = cardNum.substring(0,19);
        }
        else{
        }
        


        
        const cardDetails = {
          name: values.name,
          card_no: cardNum,
          cvv: values.cvc,
          expiry_date: expiry,
          amount: this.state.vehicles.price || this.state.vehicles.price_per_day
        }
        axios.post('/pay-now', {card_details: cardDetails})
        .then(response => {
          if(response.data === 'VALID'){
            axios.post('/request-otp', {email: this.props.email})
            .then(res=> {
                this.setState({
                  loading: false,
                  otpdisplay: true
                })
            })
          }
          else{
            Alert.warning('Invalid Card Details', {
              position: 'top',
              effect: 'bouncyflip',
              timeout: 3000,
              html: false
          });
         
          }

        })
        .catch(err => {
          Alert.warning('Invalid Card Details', {
            position: 'top',
            effect: 'bouncyflip',
            timeout: 3000,
            html: false
        });
          this.setState({loading: false})
        })
        
      }

      
      let otp = null 
      if(this.state.otpdisplay){
        otp = <Redirect to="/otp" />
      }

        return (
            <div className={classes.Container}>
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
              </div>
              <div>
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
                Pay &#x20B9; {this.state.vehicles.price !== null
                ? this.state.vehicles.price
                : this.state.vehicles.price_per_day*this.state.days + 5000}
              </button>
              <div>
              <ClipLoader
                  css={override}
                  sizeUnit={"px"}
                  size={20}
                  color={'#123abc'}
                  loading={this.state.loading}
               />
              </div>
              
            </div>
            </form>
        )
      }}
    />
  </Styles>

                </div>
                {otp}
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    start: state.vehicle.startDate,
    end: state.vehicle.endDate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    type_payment: (payment_type) => dispatch(actions.type_of_payment(payment_type)),
    price_on_days: (days) => dispatch(actions.price_on_days(days))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellPaymentPage);