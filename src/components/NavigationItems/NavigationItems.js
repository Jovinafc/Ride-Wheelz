import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';
import {StyleRoot } from 'radium';


const navigationItems = (props) =>  {
            const style = {
               '@media (min-width: 500px)': {
                  display: 'none'
               }
            }
  
    //    let login = null;
         
      //  login = <Login />
            return (
            <StyleRoot >

            <ul className={classes.NavigationItems}>
            <NavigationItem  exact link="/">Home </NavigationItem>
            {/* <NavigationItem  link="/signin"> Sign In </NavigationItem>
             */}

             <span style={style} className={classes.span}>
             {props.isAuthenticated
               ? <NavigationItem  link="/profile">My Profile</NavigationItem>
               : null}
             </span>

            <NavigationItem link="/display" >Buy/Rent Vehicle 
                </NavigationItem>

                
            {/*     
            <NavigationItem link="/sell">Sell/Lend Vehicle</NavigationItem> 
             <NavigationItem  link="/logout">Logout</NavigationItem> 
            */}
                
                <span style={style} className={classes.span1}>
               {!props.isAuthenticated 
                ? <NavigationItem link="/login">Sign In</NavigationItem>
                : null }
                </span>


             {props.isAuthenticated 
                ? <NavigationItem link="/sell/sell"  >Sell/Lend Vehicle</NavigationItem> 
                : null}

               <NavigationItem link="/accessories" >Accessories 
                </NavigationItem>

                
               {/* <NavigationItem link="/aboutus" >About Us 
                </NavigationItem>
                */}

              
             <span style={style} className={classes.spanmyvehicles}>
             {props.isAuthenticated 
                ? <NavigationItem link="/myvehicles">My Vehicles</NavigationItem> 
                : null}
             
             
             </span>    

             
             <span style={style} className={classes.spanhistory}>
             {props.isAuthenticated 
                ? <NavigationItem link="/history">Vehicle History</NavigationItem> 
                : null}
             
             
             </span> 

             <NavigationItem link="/aboutus" >About Us 
                </NavigationItem>
               
               

             <span style={style} className={classes.span1}>
             {props.isAuthenticated 
                ? <NavigationItem link="/logout">Logout</NavigationItem> 
                : null}
             
             
             </span>   
             
                  

        </ul>   
        </StyleRoot>

            )

   };
                
      //  <Modal show={this.state.show} modalClosed={this.cancelHandler}>
      //      {login}
      //  </Modal>
        
        
        
    

export default navigationItems;