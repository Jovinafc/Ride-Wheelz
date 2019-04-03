import React, {Component} from 'react';
import classes from './VehicleHistory.module.css';
import VehicleHistoryCard from '../../components/UI/VehicleHistory/VehicleHistoryCard'; 
import { connect } from 'react-redux';
import * as actions from '../../store/actions/vehicle_click';
import * as actionp from '../../store/actions/cart';


class VehicleHistory extends Component {

    state = {
        vehicles : this.props.vehicleHist,
        vehicleComment: this.props.vehicleCom,
        vehicleRate: this.props.vehicleRate
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.vehicleHist !== prevProps.vehicleHist){
            this.setState({
                vehicles: this.props.vehicleHist
            }, () => {
                this.props.stopLoading();
            })
        }

        if(this.props.vehicleRate !== prevProps.vehicleRate){
            this.setState({
                vehicleRate: this.props.vehicleRate
            }, () => {
                this.props.stopLoading();
            })
        }

        if(this.props.vehicleCom !== prevProps.vehicleCom){
            this.setState({
                vehicleComment: this.props.vehicleCom
            }, () => {
                this.props.stopLoading();
            })
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

              this.props.fetchVehicleHistory();
    }

    render () {

        let display ;

        if(this.state.vehicles.length === 0){
            display = <h4>Nothing to Show</h4>
        }
        display = this.state.vehicles.map(dis => (
            <VehicleHistoryCard 
            // ratingDetails={this.state.vehicleRate}
            // commentDetails={this.state.vehicleComment}
            key={dis.id}
            details={dis}
           
            />
        ));
        
        return (
            <div className={classes.Container}>
                <h6 style={{textAlign: 'center', fontFamily: 'roboto', fontSize: '2em'}}>Vehicle History</h6>
                {
                    this.state.vehicles.length === 0
                    ? <div style={{marginBottom: '500px', textAlign: 'center'}}>No Vehicles have been bought or rented</div>
                    : null
                }
                {display}
            </div>

        );  
    }
}

const mapStateToProps = state => {
    return {
        vehicleHist: state.vehicle.vehicleHist,
        vehicleCom: state.vehicle.vehicleComment,
        vehicleRate: state.vehicle.vehicleRate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchVehicleHistory : () => dispatch(actions.fetchVehiclesHistory()),
        stopLoading: () => dispatch(actionp.stopLoading())

    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleHistory);