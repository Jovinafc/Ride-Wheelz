import React,{ Component} from 'react';
import classes from './Cart.module.css';
import { connect } from 'react-redux'
import CartItem from './CartItem/CartItem';
import * as actions from '../../store/actions/cart';
import LoadingOverlay from 'react-loading-overlay';
import { NavLink } from 'react-router-dom';


class Cart extends Component {
    
    state = {
        cart : this.props.cart_items,
        newcart: [],
        noofItems: this.props.count,
        totalPrice: this.props.total
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.cart_items !== prevProps.cart_items){
            this.setState({
                cart: this.props.cart_items
            }, () => {
                this.props.stopLoading();
            })
        }

        if(this.props.count !== prevProps.count){
            this.setState({
                noofItems: this.props.count
            }, () => {
                this.props.stopLoading();
            })
        }

        if(this.props.total !== prevProps.total){
            this.setState({
                totalPrice: this.props.total
            }, () => {
                this.props.stopLoading();
            })
        }       
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        this.props.cartAmountQuantity();
    }

    render () {
        let displayCartItems = null;
        if(this.props.cart_items !== undefined ){
             displayCartItems = this.state.cart
        .map(dis => {
            return (    
                <CartItem  
                key={dis.accessory_id}
                name={dis.accessory_name}
                id={dis.accessory_id}
                price={dis.accessory_price}
                image={dis.accessory_image}
                details={dis.accessory_details}
                qty={dis.cart_storages[0].quantity}
                type={dis.accessory_type}
                use={dis.accessory_use}
                />                           
            )
        })


        }
        else {
            displayCartItems = <div className={classes.empty}>
                                  <h3>Your Cart is Empty</h3>
                              </div>
        }
        
        return (
            <LoadingOverlay active={this.props.isActive} spinner text="Loading">
            <div className={classes.Container}>
                   
                {this.props.cart_items !== undefined
                ? <div className={classes.secondCont}>
                <div className={classes.cartitems}>
                {!this.props.isAuthenticated 
                    ? <div style={{ fontSize: '2em'}}>Kindly <NavLink to="/login">Login</NavLink> To Add Products to your Cart</div>
                    : null}
                <div className={classes.topHeader}>
                    {this.props.isAuthenticated
                    ? <h5>My Cart</h5>
                    : null}
                    
                    
                </div>
                {displayCartItems}
                </div>    

                        
                {this.props.item_number > 0
                ? <div className={classes.checkoutDiv}>
                 <div>
                     <h3>Grand Total</h3>
                 </div> 

                 <div style={{marginTop: '20px'}}>
                     <p><strong>No of Items:</strong> {this.state.noofItems}</p>
                </div>
                <div><p><strong>Grand Total:</strong> &#x20B9;{this.state.totalPrice}</p></div>
                <div>
                    <NavLink to="/cart/cartpayment"><button className="btn btn-success">Checkout</button></NavLink>
                </div>
                </div>
                :<div> </div>}
                
                </div>    
        
                : <div className={classes.emptyCart}> 
                <h4 style={{fontFamily: 'roboto'}}>Your Cart is Empty</h4> 
                <NavLink to="/accessories">Go To Accessories Store</NavLink>
                </div>
                }

                </div>
        </LoadingOverlay>     
        )
    }
}

const mapStateToProps = state => {
    return {
        cart_items: state.cart.cart,
        item_number: state.cart.item_number,
        count: state.cart.count,
        total: state.cart.total,
        isActive: state.cart.isActive,
        isAuthenticated: state.auth.token !== null,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCartItems: (user_id) => dispatch(actions.cartItems(user_id)),
        cartAmountQuantity: () => dispatch(actions.cartAmountQunatity()),
        stopLoading: () => dispatch(actions.stopLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);