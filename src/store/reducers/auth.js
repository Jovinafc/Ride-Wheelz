import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    first_name: '',
    last_name: '',
    phone_number: '',
    dob: '',
    email: '',
    password: '',
    image: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    bank_account_no: '',
    photoadd: false,
    itemnum: 2
};

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const authSuccess = (state, action) =>{
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFail = (state, action) =>{
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {token:null, userId: null});
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path});
};

const photoStart = (state,action) => {
    return updateObject(state, {photoadd: true})  
};

const photoFinish = (state, action) => {
    return updateObject(state, {photoadd: false})
};


const saveUserData = (state,action) => {
    return updateObject(state, 
        {
            first_name: action.first_name,
            last_name: action.last_name,
            phone_number: action.phone_number,
            dob: action.dob,
            email: action.email,
            image: action.image,
            address: action.address,
            state: action.state,
            city: action.city,
            pincode: action.pincode,
            bank_account_no: action.bank_account_no
    })
};

export const deleteUserData = (state, action) => {
    return updateObject(state, {
        first_name: '',
        last_name: null,
        phone_number: null,
        dob: null,
        email: null,
        image: null,
        address: null,
        state: null,
        city: null,
        pincode: null,
        bank_account_no: null
    })
}

export const delete_local_storage = (state,action) => {
    return updateObject(state,{...initialState})
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case actionTypes.SAVE_USER_DATA: return saveUserData(state,action);
        case actionTypes.DELETE_USER_DATA: return deleteUserData(state,action);
        case actionTypes.PHOTO_START: return photoStart(state,action);
        case actionTypes.PHOTO_FINISH: return photoFinish(state,action);
        case actionTypes.DELETE_LOCAL_STORAGE: return delete_local_storage(state, action);
        default: return state;        
    }
};

export default reducer; 