import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './containers/Forms/Login/Login'; 
import SellVehicle from './containers/SellVehicle/SellVehicle'; 
import Aux from './hoc/Auxilary';
import Logout from './containers/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/auth';
import * as actionss from './store/actions/cart';
import Homepage from './containers/HomePage/HomePage';
import Profile from './containers/Profile/Profile';
import MyVehicle from './containers/MyVehicle/MyVehicle';
import AccountInfo from './containers/Profile/AccountInfo/AccountInfo';
import Photo from './containers/Profile/Photo/Photo';
import Delete from './containers/Profile/Delete/Delete';
import VehicleHistory from './containers/VehicleHistory/VehicleHistory';
import VehicleDetail from './containers/VehicleDetail/VehicleDetail';
import Lend from './containers/SellVehicle/Lend/Lend';
import SignUp from './containers/Forms/SignUp/SignUp';
import SellPaymentPage from './containers/PaymentPage/SellPaymentPage';
import Accessories from './containers/Accessories/Accessories';
import Cart from './containers/Cart/Cart';
import Otp from './containers/Otp/Otp';
import Success from './containers/Success/Success';
import ProductDetail from './containers/ProductDetail/ProductDetail';
import ProductPayment from './containers/PaymentPage/ProductPayment';
import CartPaymentPage from './containers/PaymentPage/CartPaymentPage';
import { ToastContainer} from 'react-toastify';
import asyncComponent from './hoc/asyncComponent/asynComponent';
import Help from './containers/AboutUs/Help/Help';
import Alert from 'react-s-alert';
import About from './containers/AboutUs/About/About';
import Contact from './containers/AboutUs/Contact/Contact';
import Forget from './containers/Forms/Forget/Forget';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';


const asyncCards = asyncComponent(() => {
  return import('./containers/Cards/Cards');
});

class App extends Component {
  
  componentDidMount = () => {

    
    this.props.onTryAutoSignUp();

    if(localStorage.getItem('token')){
      const expiry = localStorage.getItem('expirationDate');
    let d1 = new Date(expiry);
    let d2 = new Date();
    
    
    let d3 = d1.getTime();
    let d4 = d2.getTime();
    let d5 = d3-d4;
    //305000
    if(d5<3405000)
    {
        this.props.getTokens(localStorage.getItem('email'), localStorage.getItem('userId'))
        // setTimeout(this.props.getTokens(localStorage.getItem('email'), localStorage.getItem('token')), 0)
        // this.props.getTokens(this.props.email, this.props.user_id);
    }

  //   console.log(d3);
  //   console.log(d4);
  //   console.log(d5);    
  // console.log(d2.getHours());



    }

    if(this.props.isAuthenticated){
        this.props.cartItems(localStorage.getItem('userId'));  
    }
    
  }

  render() {

    let layout1 = (
        <Switch >
            <Layout>
                <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/Signup" exact component={SignUp}/>
                <Route path="/display" exact component={asyncCards} />
                <Route path="/login" exact component={Login} />
                <Route path="/sell/sell" exact component={SellVehicle} />
                <Route path="/vehicledetail/:vehicle_id"  component={VehicleDetail} />
                <Route path="/productdetail/:product_id" component={ProductDetail} />
                <Route path="/reset/:token" component={Forget} />
                <Route path="/delete" exact component={Delete} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/help" exact component={Help} />
                <Route path="/accessories" component={Accessories} />
                <Route path="/contactus" exact component={Contact} />
            <Route path="/aboutus" exact component={About} />  
            
                </Switch>
            </Layout>
        </Switch>
    )

    
    if(this.props.isAuthenticated) {
      
      layout1 = (
          <Switch>
              <Layout>
              <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/display" exact component={asyncCards} />
            <Route path="/login" exact component={Login} />
            <Route path="/sell/sell" exact component={SellVehicle} />
            <Route path="/logout" exact component={Logout}/>
            <Route path="/profile" exact component={Profile} />
            <Route path="/myvehicles" exact component={MyVehicle} />
            <Route path="/account" exact component={AccountInfo} />
            <Route path="/payment/:vehicle_id" exact component={SellPaymentPage} />
            <Route path="/photo" exact component={Photo} />
            <Route path="/delete" exact component={Delete} />
            <Route path="/history" exact component={VehicleHistory} />
            <Route path="/vehicledetail/:vehicle_id"  component={VehicleDetail} />
            <Route path="/productdetail/:product_id" component={ProductDetail} />
            <Route path="/accessories" component={Accessories} />
            <Route path="/sell/lend" component={Lend} />
            <Route path="/otp" exact component={Otp}/>
            <Route path="/help" exact component={Help} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/productpayment/:product_id" exact component={ProductPayment} />
            <Route path="/cart/cartpayment" exact component={CartPaymentPage}/>
            <Route path="/success" exact component={Success} />
            <Route path="/contactus" exact component={Contact} />
            <Route path="/aboutus" exact component={About} />  
             </Switch> 
              </Layout> 
          </Switch>  
      )
    }
  
    return (

      <Aux>
        {layout1}                  
        <Alert stack={{limit: 3}} />
        
      <ToastContainer />
      </Aux>


    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    user_id: state.auth.userId,
    upload: state.auth.photoadd,
    email: state.auth.email
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
    getUserData: (user_id) => dispatch(actions.userData(user_id)),
    getTokens: (email,user_id) => dispatch(actions.authRefresh(email,user_id)),
    cartItems: (user_id) => dispatch(actionss.cartItems(user_id))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
