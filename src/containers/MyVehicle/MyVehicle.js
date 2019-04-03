import React, { Component} from 'react';
import classes from './MyVehicle.module.css';
import { connect } from 'react-redux';
import MyVehicleCard from '../../components/UI/MyVehicleCard/MyVehicleCard';
import { NavLink} from 'react-router-dom';
import * as actions from '../../store/actions/vehicle_click';
import * as actionp from '../../store/actions/cart';


class MyVehicle extends Component {
 
    state = {
        myvehicle: this.props.myvehicles
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.myvehicles !== prevProps.myvehicles){
            this.setState({
                myvehicle: this.props.myvehicles
            }, () => {
                this.props.stopLoading();
            })
        }
    }


    componentDidMount = () => {
        window.scrollTo(0, 0);

        this.props.my_vehicle_store();
        
    }
    render () {
        let display; 
        if(this.state.myvehicle.length === 0) {
            display =  <h4 style={{textAlign: 'center'}}>Nothing to Show! You haven't added any vehicles to add a Vehicle go to <NavLink style={{textDecoration: 'none'}} to="/sell/sell">Sell</NavLink> or <NavLink style={{textDecoration: 'none'}} to="/sell/lend">Lend</NavLink> Vehicle Page </h4>
        }else{
                
         display = this.state.myvehicle.map(dis => (
            <MyVehicleCard key={dis.id} details={dis}/>
        ));
        }
       

        

        return (
            <div className={classes.Container}>
               <h2 style={{textAlign: 'center', marginBottom: "4%"}}>My Vehicle Details</h2>                 
               {display}                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.userId,
        myvehicles: state.vehicle.myVehicles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        my_vehicle_store: () =>dispatch(actions.my_vehicles_store()),
        stopLoading: () => dispatch(actionp.stopLoading())
 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyVehicle);