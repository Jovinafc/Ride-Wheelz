// import React, {Component} from 'react';
// import classes from './Toolbar.module.css';
// import NavigationItems from '../NavigationItems/NavigationItems';
// import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
// import {StyleRoot } from 'radium';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
// import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import * as actions from '../../store/actions/auth';


// const style = {
//     '@media (min-width: 500px)': {
//        display: 'none',
//        border: '1px solid black',
//        height: '55px',
//        padding: '-5%'
//     }
    
//  }

// class Toolbar extends Component {

//     state = {
//         zero: 0
//     }
//     render () {
        
//      return (
//         <StyleRoot >

//         <div className={classes.Toolbar}>
//             <DrawerToggle clicked={this.props.drawerToggleClicked} />
            
//             <nav className={classes.DesktopOnly}>
//                 <NavigationItems isAuthenticated={this.props.isAuth} />
//             </nav>
    
//             <div style={style} >
//                 <div className={classes.phoneDiv}>
//                     <div className={classes.cart}>  
//                     <NavLink to="/cart"> 
//                     <IconButton aria-label="Cart">
//                     {this.props.isAuthenticated
//                     ?  <Badge badgeContent={this.props.item_number} color="primary"  >
//                             <i style={{color: 'black', fontSize: '1.3rem'}} className="fas fa-shopping-cart"></i>
//                         </Badge>
                
                    
//                     : <Badge  badgeContent={this.state.zero} color="primary" >
//                             <i style={{color: 'black', fontSize: '1.3rem'}} className="fas fa-shopping-cart"></i>
//                     </Badge>
//                     }
//                     </IconButton>
//                     </NavLink>
//                     </div>
                    
//                     <div className={classes.imageCont}>
//                         <img  className={classes.image} src={this.props.image} alt="Image"/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </StyleRoot >
    
//      )

//                 }
// };

// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.auth.token !== null,
//         first_name: state.auth.first_name,
//         image: state.auth.image,
//         item_number: state.cart.item_number,
//         cart_items: state.cart.cart

//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         photoFinish: () => dispatch(actions.photoFinish())
//     };
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);


import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import {StyleRoot } from 'radium';
 import PhoneToolBar from './PhoneToolBar/PhoneToolBar';



const toolbar = (props) => {
    // const style = {
    //     '@media (min-width: 500px)': {
    //        display: 'none',
    //        border: '1px solid black',
    //        height: '55px',
    //        padding: '-5%'
    //     }
        
    //  }

     return (
        <StyleRoot >

    <div className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
        <div className={classes.phone}>
        <PhoneToolBar />
        </div>

        {/* <div style={style} >
            <div className={classes.phoneDiv}>
            <div className={classes.cart}>  
                    <NavLink to="/cart"> 
                    <IconButton aria-label="Cart">
                    {this.props.isAuthenticated
                    ?  <Badge badgeContent={this.props.item_number} color="primary"  >
                            <i style={{color: 'black', fontSize: '1.3rem'}} className="fas fa-shopping-cart"></i>
                        </Badge>
             
                 
                    : <Badge  badgeContent={this.state.zero} color="primary" >
                            <i style={{color: 'black', fontSize: '1.3rem'}} className="fas fa-shopping-cart"></i>
                    </Badge>
                    }
                    </IconButton>
                    </NavLink>
                    </div>
                 
                    <div className={classes.imageCont}>
                        <img  className={classes.image} src={this.props.image} alt="Image"/>
                    </div>
            </div>
        </div> */}
    </div>
    </StyleRoot >

     )
};

// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.auth.token !== null,
//         first_name: state.auth.first_name,
//         image: state.auth.image,
//         item_number: state.cart.item_number,
//         cart_items: state.cart.cart

//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         photoFinish: () => dispatch(actions.photoFinish())
//     };
// }


export default toolbar;


