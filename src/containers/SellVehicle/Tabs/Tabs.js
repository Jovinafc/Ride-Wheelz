import React from 'react';
import classes from './Tabs.module.css';
import { NavLink } from 'react-router-dom';

const Tabs = (props) => {
    return (
        <div className={classes.TabContainer}> 
                <div className={classes.lefttab}><NavLink activeClassName={classes.active} to="/sell/sell">Sell your Vehicle</NavLink></div>
                <div className={classes.lefttab}><NavLink activeClassName={classes.active} to="/sell/lend">Lend your Vehicle</NavLink></div>
        </div>
    );
        
};

export default Tabs;
