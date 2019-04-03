import React,{Component} from 'react';
import classes from './Card.module.css'
import {NavLink} from 'react-router-dom';
import { connect} from 'react-redux';
import * as actions from '../../../store/actions/vehicle_click';

class card extends Component {


    
    render () {

        let pd = <p className={classes.pd}>per day</p>
        
        let sell = <div className={classes.sell}>Sale</div>

        let rent = <div className={classes.rent}>Rent</div>
        return (
            
        
            <div className={classes.CardContainer}>
               

<div className={classes.Card}>
                    <div className={classes.ImageContainer}>
                        <img className={classes.Image}src={this.props.image} alt="Im"/>
                    </div>
                    <div  className={classes.content}>
                        <h5 onClick={() => this.props.onCardClick(this.props.vehicle_id)}><NavLink to={'/vehicledetail/:'+this.props.vehicle_id}><strong>{this.props.name}</strong> {this.props.model}</NavLink></h5>
                        <div className={classes.price}>
                            <div className={classes.prices}>
                             <h6 >&#x20B9; {this.props.price === null ? this.props.price_per_day.toLocaleString('en-IN') : this.props.price.toLocaleString('en-IN')} 
                                  <span className={classes.divider}></span>  
                            </h6>
                            {this.props.price_per_day !== null ? pd : null}

                            </div>
                            {this.props.price === null ? rent : sell }

                         
                        </div>
                        <div>
                            Year: {this.props.year}
                        </div>
                        
                        <div style={{float:'right'}}>
                            {this.props.rate !== null
                            ? <div style={{backgroundColor: 'green', textAlign: 'center', width:'30px', color: 'white'}}>{this.props.rate}&#9734;</div>
                            : null}
                        </div>

                        {/* <div style={{float:'right'}}>
                            {this.props.rate.length > 0
                            ? <div style={{backgroundColor: 'green', textAlign: 'center', width:'30px', color: 'white'}}>{this.props.rate[0].avg_rating}&#9734;</div>
                            : null}
                        </div> */}

                    </div>
                </div>

            </div>
        );
    }
}

const mapDispactchToProps = dispatch => {
    return {
        onCardClick: (id) => dispatch(actions.onCard(id))
    }
}

export default connect(null,mapDispactchToProps)(card);    
