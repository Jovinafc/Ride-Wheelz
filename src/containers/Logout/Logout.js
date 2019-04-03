import React,{Component } from 'react';
import {Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
// import { setToZero } from '../../store/reducers/cart';
import * as actionp from '../../store/actions/cart';



class Logout extends Component {
    componentDidMount(){
        this.props.removeCartItems();
        localStorage.removeItem('state');
        this.props.onLogout();
        // this.props.setToZero();
        
    }
    render() {
        return <Redirect to="/"/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        setToZero: () => dispatch(actionp.number_of_items_on_logout()),
        removeCartItems: () => dispatch(actionp.removeCartItems())
    };
};

export default connect(null, mapDispatchToProps)(Logout);
