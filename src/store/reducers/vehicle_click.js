import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
// import { fetch_selected_vehicle } from '../actions/vehicle_click';


const initialState = {
    vehicle_id: null,
    vehicles: [],
    myVehicles: [],
    loading: false,
    startDate: '',
    endDate: '',
    type_payment: '',
    owner_bank_account_no: '',
    days: '',
    vehicleHist: [],
    vehicleRate: [],
    vehicleComment: []
};

const FetchVehiclesStart = (state,action) => {
    return updateObject(state, {loading: true});
}

const FetchAllVehiclesSuccess = (state, action) => {
    return updateObject(state, {vehicles: action.vehicles, loading: false})
}

const FetchSelectedVehicle = (state,action) => {
    return updateObject(state, {vehicles: action.vehicles})
}

const FetchAllVehiclesFail = (state, action) => {
    return updateObject(state, {loading:false})
}

const CardClick = (state, action) => {
    return updateObject(state, {vehicle_id: action.vehicle_id})
};



const Clear = (state,action) => {
    return updateObject(state, {vehicles: []})
};

const OnVehicleID = (state,action) => {
    return updateObject(state, {vehicle_id: action.vehicle_id});
}

const startDate = (state,action) => {
    return updateObject(state,{startDate: action.startDate})
}

const endDate = (state,action) => {
    return updateObject(state,{endDate: action.endDate})
}

const priceonDays = (state, action) => {
    return updateObject(state, {days: action.days})
}

const typeOfPayment = (state,action) => {
    return updateObject(state,{type_payment: action.type_payment})
}

const save_owner_bank_account_no = (state,action) => {
    return updateObject(state,{owner_bank_account_no: action.owner_bank_account_no})
}

const my_vehicles = (state,action) => {
    return updateObject(state, {myVehicles: action.myVehicles})
}

const vehicle_hist = (state,action) => {
    return updateObject(state, {vehicleHist: action.vehicleHist, vehicleComment: action.vehicleComment, vehicleRate: action.vehicleRate})
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.CARD_CLICK: return CardClick(state,action);
        case actionTypes.CLEAR: return Clear(state,action);
        case actionTypes.FETCH_ALL_VEHICLES_SUCCESS: return FetchAllVehiclesSuccess(state,action);
        case actionTypes.FETCH_ALL_VEHICLES_START: return FetchVehiclesStart(state,action);
        case actionTypes.FETCH_ALL_VEHICLES_FAIL: return FetchAllVehiclesFail(state,action);
        case actionTypes.ON_VEHICLE_ID: return OnVehicleID(state,action);
        case actionTypes.START_DATE: return startDate(state,action);
        case actionTypes.END_DATE: return endDate(state,action);
        case actionTypes.TYPE_OF_PAYMENT: return typeOfPayment(state,action);
        case actionTypes.FETCH_SELECTED_VEHICLES: return(FetchSelectedVehicle(state,action));
        case actionTypes.SAVE_OWNER_BANK_ACCOUNT_NO: return(save_owner_bank_account_no(state,action));
        case actionTypes.NO_OF_DAYS: return (priceonDays(state, action));
        case actionTypes.MY_VEHICLES: return (my_vehicles(state,action));
        case actionTypes.VEHICLE_HISTORY: return (vehicle_hist(state,action));
        default: return state;
    }
};

export default reducer;




