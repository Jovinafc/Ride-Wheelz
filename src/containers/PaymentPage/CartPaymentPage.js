import React, { Component } from 'react';
import classes from './ProductPayment.module.css';
import axios from 'axios';
import Card from './Card';
import * as actions from '../../store/actions/vehicle_click';
import * as actionp from '../../store/actions/cart';
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
import Alert from 'react-s-alert';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: yellow;
`;

class ProductPayment extends Component {

    state = {
        product : {},
        Invalid: true,
        number: '',
        name: '',
        cvc: '',
        expiry: '',
        focused: '',
        otp: '',
        otpdisplay: false,
        spin: false,
        loading:false
    }
  
    render() {
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
          amount: (this.props.total)
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
          else {
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
            Pay &#x20B9;{this.props.total} 
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
  
        )
    }
}

const mapStateToProps = state => {
    return {
      email: state.auth.email,
      product_id: state.cart.product_id,
      quantity: state.cart.quantity,
      total: state.cart.total
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      type_payment: (payment_type) => dispatch(actions.type_of_payment(payment_type)),
      singleItemDetails: (accessory) => dispatch(actionp.singleItemDetails(accessory))
    }
  }
  

export default connect(mapStateToProps,mapDispatchToProps)(ProductPayment);