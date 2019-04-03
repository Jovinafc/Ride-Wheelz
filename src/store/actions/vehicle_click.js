import * as actionTypes from './actionTypes';
import axios from 'axios';

export const FetchAllVehiclesStart = () => {
    return {
        type: actionTypes.FETCH_ALL_VEHICLES_START
    }
}

export const FetchAllVehiclesSuccess = (vehicles) => {
    return {
        type: actionTypes.FETCH_ALL_VEHICLES_SUCCESS,
        vehicles: vehicles
    }
}

export const FetchAllVehiclesFail = (error) => {
    return {
        type: actionTypes.FETCH_ALL_VEHICLES_FAIL,
        error: error
    }
}

export const fetchVehicles = (user_id) => {
    return dispatch=> {
        dispatch(FetchAllVehiclesStart);
        axios.post('/fetch-vehicles-except-current-user', {user_id: user_id}).then(result => {
            const fetchedValues = [];
            for(let key in result.data){
                fetchedValues.push({
                    ...result.data[key],
                    id: key
                });
            }
            dispatch(FetchAllVehiclesSuccess(fetchedValues))
        })
        .catch(err => {
            dispatch(FetchAllVehiclesFail(err));
        })
};
};


export const onCardClick = (vehicle_id) => {
    localStorage.removeItem('vehicle_id');
    localStorage.setItem('vehicle_id', vehicle_id);
    return {
        type: actionTypes.CARD_CLICK,
        vehicle_id: vehicle_id
        
    };
    
}

export const onCard = (vehicle_id) => {
    return dispatch=> {
        dispatch(onCardClick(vehicle_id));
    }
}

export const onVehicleID = (vehicle_id) => {
    return {
        type: actionTypes.ON_VEHICLE_ID,
        vehicle_id: vehicle_id
    }
}


export const checkVehicleID = () => {
    return dispatch => {
        const vehicle_id = localStorage.getItem('vehicle_id');
        dispatch(onVehicleID(vehicle_id));
    }
}

export const startDate = (startDate) => {
    return {
        type: actionTypes.START_DATE,
        startDate: startDate
    }
}

export const endDate = (endDate) => {
    return {
        type: actionTypes.END_DATE,
        endDate: endDate
    }
}

export const type_of_payment = (payment_type) => {
    return {
        type: actionTypes.TYPE_OF_PAYMENT,
        type_payment: payment_type
    }
}

export const fetch_selected_vehicle = (vehicles) => {
    return {
        type: actionTypes.FETCH_SELECTED_VEHICLES,
        vehicles: vehicles
    }
}

export const save_owner_bank_account_no = (bank_account_no) => {
    return {
        type: actionTypes.SAVE_OWNER_BANK_ACCOUNT_NO,
        bank_account_no: bank_account_no
    }
}

export const no_of_days = (start, end) => {
    return dispatch => {
        // console.log(start);
        // console.log(end);
   }
}

export const price_on_days = (days) => {
    return {
        type: actionTypes.NO_OF_DAYS,
        days: days
    }
}

export const my_vehicles = (myVehicles) => {
    return {
        type: actionTypes.MY_VEHICLES,
        myVehicles: myVehicles
    }
}

export const my_vehicles_store = () => {
    return dispatch => {
        axios.post('/fetch-specific-user-vehicles', {user_id: localStorage.getItem('userId')})
    .then(res => {
        // console.log(res.data);
        const vehicles = [];
        for(let key in res.data){
            vehicles.push({
                ...res.data[key],
                id: key
            });
        }
        dispatch(my_vehicles(vehicles))
    })
    }
}

export const vehicle_history = (vehicle_hist, vehicle_comment, vehicle_rate) => {
    return {
        type: actionTypes.VEHICLE_HISTORY,
        vehicleHist: vehicle_hist,
        vehicleComment: vehicle_comment,
        vehicleRate: vehicle_rate
    }
}

export const fetchVehiclesHistory = () => {
    return dispatch => {
        
    axios.post('/vehicle-history', {user_id: localStorage.getItem('userId')})
    .then(response => {
        // console.log(response.data.details);
        // console.log(response.data);
        // this.setState({
        //     vehicles: response.data
        // })
        const vehicleHist = [];
        for(let key in response.data.details){
            vehicleHist.push({
                ...response.data.details[key],
                id: key
            });
        }
        let vehicleRate = [];
        for(let key in response.data.ratingDetails){
            vehicleRate.push({
                ...response.data.ratingDetails[key],
                id: key
            });
        }

        let vehicleCom = [];
        for(let key in response.data.commentDetails){
            vehicleCom.push({
                ...response.data.commentDetails[key],
                id: key
            });
        }

        dispatch(vehicle_history(vehicleHist, vehicleCom, vehicleRate));

       
    })
    .catch(err => {
        // console.log(err);
    })
    }
}