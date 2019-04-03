import React from 'react';
import classes from './SideDrawer.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Auxilary';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../components/TopToolbar/logo.png';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}> 
            <div>
                <img src={Logo} style={{width: '150px', height:'60px'}} alt="Logo" />
            </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/> 
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;
