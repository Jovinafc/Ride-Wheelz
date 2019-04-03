import React, { Component } from 'react';
import classes from './Contact.module.css';

class Contact extends Component {
    render () {
        return (
            <div className={classes.Container}  >
                   <h2 style={{textAlign: 'center'}}>Contact Us</h2>

                <div className={classes.second}>

                    <div className={classes.email}>
                        <p style={{textDecoration: 'underline'}}><strong>For any queries feel free to contact us at any of the following email addresses</strong></p>

                        <strong><p style={{color: 'red'}}>ridewheelz@mailinator.com</p></strong>
                        <strong><p style={{color: 'red'}}>dsouza.jovin65@gmail.com</p></strong>
                        <strong><p style={{color: 'red'}}>lioneldsouza51@gmail.com</p></strong>

                    </div>

                    <div className={classes.phone}>
                         <p style={{textDecoration: 'underline'}}><strong>You can also contact us on any of the following phone numbers</strong></p>  
                        <strong><p style={{color: 'red'}}>+02265887340</p></strong>
                        <strong><p style={{color: 'red'}}>+91 7666218729</p></strong>

                    </div>
                </div>
            </div>
        )
    }
}

export default Contact;