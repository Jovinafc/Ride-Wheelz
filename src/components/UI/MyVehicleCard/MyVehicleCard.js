import React, { Component } from 'react';
import classes from './MyVehicleCard.module.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/vehicle_click';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as actionp from '../../../store/actions/cart';

class MyVehicleCard extends Component {

    removeVehicle = () => {
        this.props.startLoading();
        axios.post('/remove-vehicle', {user_id: localStorage.getItem('userId'), vehicle_id: this.props.details.vehicle_id})
        .then(res => {
            this.props.my_vehicle_store();
            this.props.stopLoading();

        })
        .catch(err => {
            this.props.stopLoading();
        })
    }

    modalsubmit = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                // <div className='custom-ui'>
                                <div className={classes.mod}>

                  <h1>Are you sure?</h1>
                  <p><strong>You want to remove this vehicle</strong></p>
                  
                  <button
                    className={classes.pass}
                    onClick={() => {
                    //   this.handleClickDelete();
                      this.removeVehicle();      
                      onClose();
                    }}
                  >
                    Yes, Remove it!
                  </button>

                  <button className={classes.reject}onClick={onClose}>No</button>

                </div>
              );
            }
          });

    }


    render () {

    
        
        return (
            
        <div className={classes.Container}>
            
        <div className={classes.div1}>

             <div className={classes.ImageCon}> <img className={classes.Image} alt="my" src={this.props.details.image}/> </div>
        
        </div>
       
        <div className={classes.rightDiv}>
             <div className={classes.topRightDiv}>
                <div className={classes.head}><h5><strong>{this.props.details.brand} {this.props.details.model}</strong></h5></div>
                <div><p><strong>Status:</strong> <span className={classes.val}>{this.props.details.status}</span></p></div>
            </div>
            <div className={classes.details}>
               <div><p><strong>Posted On:</strong> <span className={classes.val}>{this.props.details.createdAt.substring(0,10)}</span></p></div>
               <div><p><strong>Vehicle Number:</strong> <span className={classes.val}>{this.props.details.number_plate}</span></p></div>
               <div><p><strong>Fuel Type:</strong> <span className={classes.val}>{this.props.details.fuel_type}</span></p></div>
               <div><p><strong>Registration State:</strong> <span className={classes.val}>{this.props.details.registration_state}</span></p></div>
               <div><p><strong>Vehicle Type:</strong> <span className={classes.val}>{this.props.details.vehicle_type}</span></p></div>
               {
                   this.props.details.price 
                   ? <div><p><strong>Price:</strong> <span className={classes.val}>&#x20B9;{this.props.details.price.toLocaleString('en-IN')}</span></p></div>
                   : <div><p><strong>Price Per Day:</strong> <span className={classes.val}>&#x20B9;{this.props.details.price_per_day.toLocaleString('en-IN')}</span></p></div>
               }

         </div>
         <div className={classes.downRightDiv}>
              {this.props.details.status !== 'SOLD' && this.props.details.status !== 'RENTED' 
              ? <div><button onClick={this.modalsubmit} className="btn btn-danger">Remove Vehicle</button></div>
              : <div>
                    {this.props.details.status === 'RENTED'
                    ? <div><p><strong>Your Vehicle is currently rented to {this.props.details.client['name']}</strong></p> </div>
                    : <div><p><strong>Your Vehicle was sold to {this.props.details.client['name']}</strong></p> </div>}    
                </div>    
            } 
         </div>

        </div>
    </div>
        )
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        my_vehicle_store: () =>dispatch(actions.my_vehicles_store()), 
        startLoading: () => dispatch(actionp.startLoading()),
        stopLoading: () => dispatch(actionp.stopLoading())

    }
}


export default connect(null, mapDispatchToProps)(MyVehicleCard);