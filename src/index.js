import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/cart'; 
import vehicleReducer from './store/reducers/vehicle_click';
import axios from 'axios';
// import { transitions, positions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-oldschool-dark'


axios.defaults.baseURL = 'http://localhost:3001/api' || 'http:// 192.168.0.104:3001/api' ;
// axios.defaults.baseURL = 'http://localhost:3001';
// axios.defaults.baseURL = 'http://192.168.43.247:3001/api'


axios.defaults.headers.common['x-auth'] = localStorage.getItem('token');

axios.interceptors.request.use(request => {
    request.headers.authorization = localStorage.getItem('token');
    // console.log(request);
    return request;
}, error => {
    // console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // console.log(response);
    return response;
}, error => {
    // console.log(error);
    return Promise.reject(error);
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    vehicle: vehicleReducer,
    cart: cartReducer
})

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }
    catch(e) {
        // console.log(e);
    }
}

function loadFromStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) return undefined
        return JSON.parse(serializedState);
    }
    catch (e) {
        return undefined
    }
} 

const persistedState = loadFromStorage()

const store = createStore(rootReducer, persistedState, composeEnhancers(
    applyMiddleware(thunk)
));

store.subscribe(() => saveToLocalStorage(store.getState()))

// const options = {
//     position: positions.BOTTOM_CENTER,
//     timeout: 5000,
//     offset: '30px',
//     transition: transitions.SCALE
//   }

const app = (
    <Provider store={store}>
        <BrowserRouter> 
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'), document.querySelector('[data-mount]'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
