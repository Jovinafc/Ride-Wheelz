import React, {Component} from 'react';
import classes from './Signing.module.css';
import { NavLink} from 'react-router-dom';
// import Login from '../../containers/Forms/Login/Login';
import Aux from '../../hoc/Auxilary';

class Signing extends Component {

    state = {
        show: false
    }

    logHandler = () => {
        this.setState({show: true});
    }

    cancel = () => {
        this.setState({show: false});
    }
    render () {

        // let log = <Login />
        return (
            <Aux>
               <div> 
                {/* <Modal show={this.state.show} modalClosed={this.cancel}>
                    {log}
                </Modal> */}

                    <div className={classes.container}>    
                        {/* <button onClick={this.logHandler} className="btn btn-primary btn-xs">
                                Log In
                        </button>   */}
                        <NavLink to="/login"><button style={{fontSize: '1.0em'}} className="btn btn-primary" >Login</button></NavLink>
                        <div style={{width: "10px"}}></div>
                        <NavLink to="/Signup" exact> <button style={{fontSize: '1.0em'}}  className="btn btn-success">Sign Up</button></NavLink>
                </div>
        

            </div>
            </Aux>
        )
    }

}


export default Signing;