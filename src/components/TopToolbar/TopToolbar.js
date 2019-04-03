import React, { Component } from 'react';
import classes from './TopToolbar.module.css'
import Signing from '../Signing/Signing';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
// import SloganDesign from './Slogan Design.png';
// import LogoRW from './LogoRW.png';
import Slogan from './Slogan design 1.png';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RW from './RW.png';

// const style = {
    // height: '95%',
    // width: '5%',
    // marginRight: '2%',
    // textAlign: 'center',
    // maxWidth: '100%',

// }

class TopToolbar extends Component {

    

    state = {
        zero: 0,
        ppimage: this.props.image,
        number: 3, 
        no_of_items: 0
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.image !== prevProps.image){
            this.setState({
                ppimage: this.props.image   
            })
            this.props.photoFinish();
        }
        if(this.props.counter !== prevProps.counter){
            this.setState({
                no_of_items: this.props.counter
            })
        }
    }

    render () {
        // console.log(this.props.item_number);
        let a = this.props.first_name.charAt(0);

        let sign = <Signing />
        if(this.props.isAuthenticated){
            sign = <div className={classes.afterlogin}>
            {this.props.image 
            ? <NavLink to="/Profile"><img className={classes.pp} src={this.state.ppimage} alt="pp"/> </NavLink>
            : <NavLink style={{textDecoration: 'none'}} to="/Profile"><h2 style={{textAlign: "center",color: "white",  marginTop: "10%"}}>{a}</h2></NavLink> }
            <div className={classes.dropdowncontent}>
                
                <NavLink to="/Profile">My Profile</NavLink>
                <NavLink to="/myvehicles">My Vehicles</NavLink>
                <NavLink to="/history">Vehicle History</NavLink>
                <NavLink to="/help">Help</NavLink>
                <NavLink to="/logout">Logout</NavLink>
            </div>
            </div>  
        }


        return (
            
            <div className={classes.nav}>
            <div className={classes.Logo}>
            {/* <img src={lg} alt="img" style={{width: '150px', height:'60px'}}/> */}
            <img src={RW} alt="img" className={classes.innerlogo}/>

            </div>
            <div className={classes.Name}>
                {/* <h4>Ride Wheelz</h4> */}
                <img src={Slogan} alt="homepage" className={classes.webname} />
            </div>
            <div className={classes.cartCont}>
            </div> 

            {
                this.props.isAuthenticated 
                ?    <div className={classes.third}>
                <div className={classes.cartCont} >
                    <div>
                    <NavLink style={{textDecoration: 'none'}} to="/cart">
                    {/* {this.props.isAuthenticated 
                    ? <h6 className={classes.items}>{this.props.item_number}</h6>
                    : <h6 className={classes.items}>0</h6>
                } */}
                    
                    {/* <img src={shoppingCart} alt="Cart" className={classes.cart}/> */}
                    {/* <i style={{color: 'red', fontSize: '2.0rem'}} className="fas fa-shopping-cart"></i> */}
                    <IconButton aria-label="Cart">
                    {this.props.isAuthenticated
                    ?  <Badge badgeContent={this.props.item_number} color="primary" >
                            <i style={{color: 'red', fontSize: '1.7rem'}} className="fas fa-shopping-cart"></i>
                        </Badge>
                
                    
                    : <Badge  badgeContent={this.state.zero} color="primary" >
                            <i style={{color: 'red', fontSize: '1.7rem'}} className="fas fa-shopping-cart"></i>
                    </Badge>
                    }
                    </IconButton>
                    </NavLink>
                    </div>
    
                    <div className={classes.dropdowndiv}>
                        {this.props.cart_items === undefined 
                        ? <div>Your Cart is Empty 
                        <br />
                        Keep Shopping
                        </div>
                        : <div>
                                {this.props.cart_items.slice(0,3).map(dis => {
                                    return (
                                        <div className={classes.cartHoverDiv} key={dis.accessory_id}>
                                          <div className={classes.imageCont}>
                                              <img alt="im" className={classes.cartimage} src={dis.accessory_image}/>  
                                          </div>
                                          
                                          <div className={classes.cartDetails}>
                                          {dis.accessory_name}
                                          <p style={{fontSize: '0.7em'}}>Price: {dis.accessory_price}</p>
                                          </div>
                                        </div>
                                    )
                                })}  
                                <div style={{backgroundColor: '#747474', marginBottom: '5px'}} >
                                    {this.props.item_number > 3
                                    ? <button style={{backgroundColor: 'red', color: 'black'}}><NavLink to="/cart">{(this.props.item_number - 3 )} more</NavLink></button>
                                    : <div style={{backgroundColor: '#AF0707', color: 'black'}}><NavLink to="/cart" style={{color: 'white'}}>Go To Cart</NavLink></div> }
                                </div>
                          </div>
                        
                        } 
                        
                    </div>
                </div>
    
                {this.props.isAuthenticated 
                ? 
                <div className={classes.signlogin}>
                    {sign}
                </div> 
                : <div className={classes.sign}> {sign} </div>}
            </div>

                :    <div className={classes.fourth}>
            <div className={classes.cartContNl} >
                <div>
                <NavLink style={{textDecoration: 'none'}} to="/cart">
                {/* {this.props.isAuthenticated 
                ? <h6 className={classes.items}>{this.props.item_number}</h6>
                : <h6 className={classes.items}>0</h6>
            } */}
                
                {/* <img src={shoppingCart} alt="Cart" className={classes.cart}/> */}
                {/* <i style={{color: 'red', fontSize: '2.0rem'}} className="fas fa-shopping-cart"></i> */}
                <IconButton aria-label="Cart">
                {this.props.isAuthenticated
                ?  <Badge badgeContent={this.props.item_number} color="primary" >
                        <i style={{color: 'red', fontSize: '1.7rem'}} className="fas fa-shopping-cart"></i>
                    </Badge>
            
                
                : <Badge  badgeContent={this.state.zero} color="primary" >
                        <i style={{color: 'red', fontSize: '1.7rem'}} className="fas fa-shopping-cart"></i>
                </Badge>
                }
                </IconButton>
                </NavLink>
                </div>

                <div className={classes.dropdowndiv}>
                    {this.props.cart_items === undefined 
                    ? <div>Your Cart is Empty 
                    <br />
                    Keep Shopping
                    </div>
                    : <div>
                            {this.props.cart_items.slice(0,3).map(dis => {
                                return (
                                    <div className={classes.cartHoverDiv} key={dis.accessory_id}>
                                      <div className={classes.imageCont}>
                                          <img alt="im" className={classes.cartimage} src={dis.accessory_image}/>  
                                      </div>
                                      
                                      <div className={classes.cartDetails}>
                                      {dis.accessory_name}
                                      <p style={{fontSize: '0.7em'}}>Price: {dis.accessory_price}</p>
                                      </div>
                                    </div>
                                )
                            })}  
                            <div style={{backgroundColor: '#747474', marginBottom: '5px'}} >
                                {this.props.item_number > 3
                                ? <button style={{backgroundColor: 'red', color: 'black'}}><NavLink to="/cart">{(this.props.item_number - 3 )} more</NavLink></button>
                                : <div style={{backgroundColor: '#AF0707', color: 'black'}}><NavLink to="/cart" style={{color: 'white'}}>Go To Cart</NavLink></div> }
                            </div>
                      </div>
                    
                    } 
                    
                </div>
            </div>

            {this.props.isAuthenticated 
            ? 
            <div className={classes.signlogin}>
                {sign}
            </div> 
            : <div className={classes.sign}> {sign} </div>}
        </div>
            }
         

        </div>
        
        );
    }

}



const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        first_name: state.auth.first_name,
        image: state.auth.image,
        item_number: state.cart.item_number,
        cart_items: state.cart.cart

    };
};

const mapDispatchToProps = dispatch => {
    return {
        photoFinish: () => dispatch(actions.photoFinish())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);