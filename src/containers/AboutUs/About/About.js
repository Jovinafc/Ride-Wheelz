import React,{Component} from 'react';
import classes from './About.module.css';

class About extends Component  {
    render () {
        return (
            <div className={classes.Container}>
                <h2 style={{textAlign: 'center'}}>About Us</h2>
                <div className={classes.content}>
                    <p className={classes.con}>                
                    Ride Wheelz is a website where a user can sell or lend his vehicle which can then be made available to other users who can then buy or rent a vehicle respectively.
Along with this users can also buy vehicle accessories. Users have an option to add accessories in his Cart which can then later be purchased from his cart. RideWheelz follows its own payment gateway. Users can also rate and give a feedback about any vehicle which they have rented from our website which can then be viewed by other users. Users can rate a feedback has helpful and not helpful. Most of the other websites offer 4-Wheelers for rents but here at Ride Wheelz we offer users the opportunity to rent 2-Wheelers as well. The website is develped using ReactJs has a frontend and Node.js has a backend. 
     
                      </p>
                    <div>
                        <p><strong>Developers :</strong> Jovin Dsouza and Lionel Dsouza</p>
                    </div>
                </div>
            </div>
        )
    }
}



export default About;