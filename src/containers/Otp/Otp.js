import React,{Component} from 'react';
import classes from './Otp.module.css';
import axios from 'axios';
import { connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/cart';
import Alert from 'react-s-alert';

class Otp extends Component {

    state = {
        otp: '',
        success: false
    }

    otpcodeHandler = (e) => {
        this.setState({
            otp: e.target.value
        })
    }

    otpsender = (e) => {
        e.preventDefault();
        axios.post('/confirm-payment', {email: this.props.email, token: this.state.otp})
        .then(response => {
          Alert.success('Payment Successful', {
            position: 'top',
            effect: 'bouncyflip',
            timeout: 3000,
            html: false
        });
      
          
          if(this.props.payment_type === 'Sell'){
            let vehicles = {
                client_id: localStorage.getItem('userId'),
                user_id: localStorage.getItem('userId'),
                vehicle_id: this.props.vehicle_id,
                owner_bank_account: this.props.owner_bank_account,
                client_bank_account: this.props.client_bank_account,
                amount: this.props.price
            } 
            axios.post('/buy-now', {vehicles: vehicles})
            .then(response => {
                this.setState({success: true})

            })

          }
          else if(this.props.payment_type === 'Rent'){
            // console.log(this.props.enddatetime);
            //   console.log(this.props.vehicle_id+ " "+localStorage.getItem('userId')+ " "+(this.props.price_per_day*this.props.days))
                axios.post('/rent-now', {
                    user_client_id: localStorage.getItem('userId'), 
                         vehicle_id: this.props.vehicle_id,
                         start_date: this.props.startdatetime,
                         end_date: this.props.enddatetime,
                         owner_bank_account: this.props.owner_bank_account,
                         client_bank_account: this.props.client_bank_account,
                         amount: this.props.price_per_day * this.props.days,
                         deposit: 5000
            })
            .then(response =>{
                this.setState({success: true})

            })
          }
          else if(this.props.payment_type === 'Single Item') {
                // console.log(this.props.accessory_id+ ''+this.props.quantity+ ''+ this.props.single_item.accessory_price+ '' +this.props.quantity);
                
              axios.post('/direct-buy', {
                  user_id: localStorage.getItem('userId'),
                  bank_account_no: this.props.client_bank_account,
                  accessory_id: this.props.accessory_id,
                  quantity: this.props.quantity,
                  amount: this.props.single_item.accessory_price * this.props.quantity 
            }).then(response => {
              this.setState({success: true})

            })
          }
          else {
              axios.post('/checkout', {user_id: localStorage.getItem('userId')})
              .then(response => {
                  this.setState({success: true})
                  this.props.cartItems(localStorage.getItem('userId'));
              })
          }
          

        })
        .catch(err => {
          Alert.warning('Incorrect OTP', {
            position: 'top',
            effect: 'bouncyflip',
            timeout: 3000,
            html: false
        });
      
        })
      }

      

    render () {

        let success = null;
        if(this.state.success){
        success = (
            <Redirect to="/Success" />
        )
        }

        return (
            <div className={classes.Container}>
                {success}
                <div className={classes.Box}>
                <form>

                            {/* <div className="form-group">
                    <label htmlFor="otp" className="col-sm-8 control-label">Enter OTP<p>(Sent on your registered Email)</p></label>
                    <div className="col-sm-4">
                    <input type="number" className="form-control" id="otp" onChange={this.otpcodeHandler} value={this.state.otp}/>        
                    </div>    
                            </div>
                             */}

                            <div className="form-group">
                            <label htmlFor="otp" className="col-sm-8 control-label">Enter OTP<p>(Sent on your registered Email)</p></label>
                             <div className={classes.Label}>   
                             <div className="col-sm-10" style={{textAlign: "center"}}>
                             <input type="number" id="otp" className="form-control" onChange={this.otpcodeHandler} value={this.state.otp}/>
                            </div>
                            </div>
                            </div>

                             <br />
                             <div className={classes.submit }>
                               <button onClick={this.otpsender} className="btn btn-success">Submit</button>       
                             </div>
                    </form>
    
                </div> 
                    
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
      email: state.auth.email,
      payment_type: state.vehicle.type_payment,
      startdatetime: state.vehicle.startDate,
      enddatetime: state.vehicle.endDate,
      owner_id: state.vehicle.vehicles[0].user_id,
      owner_bank_account: state.vehicle.vehicles[1].bank_account_no,
      client_bank_account: state.auth.bank_account_no,
      price: state.vehicle.vehicles[0].price,
      price_per_day: state.vehicle.vehicles[0].price_per_day,
      vehicle_id: state.vehicle.vehicle_id,
      accessory_id: state.cart.single_item.accessory_id,
      quantity: state.cart.quantity,
      single_item: state.cart.single_item,
      days: state.vehicle.days
    }
  }

const mapDispatchToProps = dispatch => {
  return {
    cartItems: (user_id) => dispatch(actions.cartItems(user_id)) 
  }
}  

export default connect(mapStateToProps, mapDispatchToProps)(Otp);