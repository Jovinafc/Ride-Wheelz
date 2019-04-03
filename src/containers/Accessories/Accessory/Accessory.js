import React, { Component } from 'react';
import classes from './Accessory.module.css';
import {NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/cart';


class Accessory extends Component {

    render () {
        return (
            <div className={classes.CardContainer}>
                <div className={classes.Card}>
                    <div className={classes.ImageContainer}>
                        <img className={classes.Image}src={this.props.image} alt="Im"/>
                    </div>

                    <div className={classes.content}>
                         <div className={classes.Name}>
                             <h3 className={classes.na} onClick={() => this.props.onCardClick(this.props.id)}><NavLink to={'/productdetail/:'+this.props.id}>{this.props.name}</NavLink></h3>
                         </div>

                         <div className={classes.Price}>
                             <h5>&#x20B9; {this.props.price}</h5>
                         </div>

                         <div className={classes.add}>
                              {this.props.isAuthenticated
                                ? <button onClick={() => this.props.addToCart(this.props.user_id, this.props.id, this.props.qty)} style={{color: 'white', maxWidth:'100%', fontWeight: 'bold', backgroundColor: '#272727'}} className="btn btn-danger">Add to Cart</button>
                                : <button style={{color: 'white', maxWidth:'100%', fontWeight: 'bold', backgroundColor: '#272727'}} className="btn btn-danger">Add to Cart</button>   
                                }  
                             
                         </div>
                         <div style={{float:'right'}}>
                            {this.props.average_rating.length > 0
                            ? <div style={{backgroundColor: 'green', textAlign: 'center', width:'35px', color: 'white'}}>{this.props.average_rating[0].avg_rating.toString().substring(0,3)}&#9734;</div>
                            : null}
                        </div>

                    </div>
                    

                </div>
            </div>



        );
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.userId,
        cartItems: state.cart.cart,
        inCart: state.cart.added_cart,
        isAuthenticated: state.auth.token !== null,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (user_id, accessory_id, quantity) => dispatch(actions.addToCart(user_id, accessory_id, quantity)),
        onCardClick: (product_id) => dispatch(actions.onProductClick(product_id))   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accessory);
