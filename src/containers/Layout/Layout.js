import React, { Component}  from 'react';
//import NavigationItems from '../../components/NavigationItems/NavigationItems';
//import UserData from '../Forms/UserData/UserData';
//import Feedback from '../Forms/Feedback/Feedback';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css'
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import { connect } from 'react-redux';  
import TopToolbar from '../../components/TopToolbar/TopToolbar';
import { NavLink } from 'react-router-dom';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        prevScrollpos: window.pageYOffset

    }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
            
         } );
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }

      componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      }

    // handleScroll = () => {
    //     let currentScrollPos = window.pageYOffset;
    
    //     if (this.state.prevScrollpos > currentScrollPos) {
    //       document.getElementById("topnav").style.top = "65px";
    //     } else {
    //       document.getElementById("topnav").style.top = "-50px";
    //     }
    //     this.setState({ prevScrollpos: currentScrollPos });
    //   };

    render () {
        let abc = (
            <Aux>
             {/* <Headroom style={{
  webkitTransition: 'all .5s ease-in-out',
  mozTransition: 'all .5s ease-in-out',
  oTransition: 'all .5s ease-in-out',
  transition: 'all .5s ease-in-out'
}}>    */}
            {/* <LoadingOverlay active={this.props.isActive} spinner text="Loading"> */}
            <TopToolbar 
              isAuth = {this.props.isAuthenticated}
            />
           
           {/* </Headroom > */}
           <SideDrawer 
           isAuth = {this.props.isAuthenticated}
           open={this.state.showSideDrawer } 
           closed={this.sideDrawerClosedHandler} />
            
           <main   className={classes.Content}>
           <div id="topnav">
           <Toolbar 
           isAuth = {this.props.isAuthenticated}
           drawerToggleClicked={this.sideDrawerToggleHandler}
           />
           </div>
                   {this.props.children}
           </main>
    
           {/* <div style={{textAlign: 'center', paddingTop: '25px', height: '200px', backgroundColor: '#747474'}}> */}
           <div className={classes.footerdown} >

               {/* <h2>Footer Section </h2> */}
               
               <div className={classes.footerCont}>
                    <div className={classes.footer1}>
                        <ul className={classes.ul}>
                        <h5 >Quick Links</h5>

                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/profile">My Profile</NavLink></li>
                            <li><NavLink to="/accessories">Accessories</NavLink></li>
                            <li><NavLink to="/cart">Cart</NavLink></li>
                        </ul>
                    </div>

                    <div className={classes.footer2}>
                        <ul className={classes.ul}>
                        <h5>Services</h5>

                            <li><NavLink to="/display">Buy Vehicle</NavLink></li>
                            <li><NavLink to="/sell/sell">Sell Vehicle</NavLink></li>
                            <li><NavLink to="/display">Rent Vehicle</NavLink></li>
                            <li><NavLink to="/sell/lend">Lend Vehicle</NavLink></li>
                        </ul>
                    </div>
                      
                    <div className={classes.footer3}>
                      <ul className={classes.ul}>
                      <h5>About</h5>

                        <li><NavLink to="/help">Help</NavLink></li>
                        <li><NavLink to="/contactus">Contact Us</NavLink></li>
                        <li><NavLink to="/aboutus">About Us</NavLink></li>
                      </ul>
                    </div>
                    <div className={classes.footer4}>
                      <ul className={classes.ul}> 
                      <h5>Social</h5>

                        <li><a href="https://www.facebook.com/RideWheelz-283553915895193/?modal=admin_todo_tour">Facebook</a></li>
                        <li><a href="https://twitter.com/">Twitter</a></li>
                        <li><a href="https://www.instagram.com/ridewheelz65/?hl=en">Instagram</a></li>
                      </ul>
                    </div>
               </div>
               <div className={classes.footerBottom}>
                  <h6>CopyRight &copy; 2019 | All Rights Reserved</h6>  
               </div>
               
           </div>
           </Aux>         
        )


        return (
            <Aux>
                {abc}
            </Aux>
    );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        isActive: state.cart.isActive
    };
}

export default connect(mapStateToProps)(Layout);

