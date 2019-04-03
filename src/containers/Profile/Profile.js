import React, {Component} from 'react'
import classes from './Profile.module.css';
import Aux from '../../hoc/Auxilary';
import ProfInfo from './ProfInfo/ProfInfo';
import ProfNav from './ProfNav/ProfNav';


class Profile extends Component {
    state= {
        profile: true,
        photo: false,
        account: false,
        close : false,
    }

    profileHandler = () => {
        this.setState({profile: true,photo: false, account: false, close: false})
    }

    photoHandler = () => {
        this.setState({photo: true, profile: false, account: false, close: false})
    }

    accountHandler = () => {
        this.setState({account: true, photo: false, profile: false, close: false})
    }

    close = () => {
        this.setState({close: true, account: false, profile: false, photo: false})
    }

    render () {
        let main= <ProfInfo />

        return (
            <Aux>
                <div className={classes.Container}>

                    <div className={classes.Menu}>  

                        <ProfNav />
                    </div>  

                    <div className={classes.Main}>
                        {main}
                    </div>
                </div>        
            </Aux> 
       )
    }
} 

export default Profile;