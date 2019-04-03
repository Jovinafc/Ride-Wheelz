import React, { Component } from 'react';
import classes from './ProfNav.module.css';
import { NavLink} from 'react-router-dom';


class ProfNav extends Component {
    render () {
        return (
            <div>
                <ul className={classes.ul}>
                              <li className={classes.li}><NavLink activeClassName={classes.active} to="/profile">Profile</NavLink></li>
                              <li className={classes.li}><NavLink activeClassName={classes.active} to="/photo">Photo</NavLink></li>
                              <li className={classes.li}><NavLink activeClassName={classes.active} to="/account">Account Info</NavLink></li>
                              <li className={classes.li}><NavLink activeClassName={classes.active} to="/delete">Delete Account</NavLink></li>
                </ul>
        </div>
        );
    }
}

export default ProfNav;