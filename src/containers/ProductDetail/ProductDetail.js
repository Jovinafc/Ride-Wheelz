import React, {Component} from 'react';
import classes from './ProductDetail.module.css';
import axios from 'axios';
import { NavLink, Redirect} from 'react-router-dom'
import * as actions from '../../store/actions/vehicle_click';
import { connect} from 'react-redux';
import * as actionp from '../../store/actions/cart';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactStars from 'react-stars'
import ReviewDiv from './ReviewDiv';
import Alert from 'react-s-alert';


class ProductDetail extends Component {

    state = {
        product: [],
        counter: 1,
        price: this.props.price,
        buyButton: true,
        modalShow:false,
        direct: false,
        review: '',
        rate: 0,
        rateToggle: false,
        reviewsArray: [],
        revArray: [],
        ratedisable:false,
        disabled: false
    }

    getReviews = () => {
        axios.get(`/get-accessory?accessory_id=${localStorage.getItem('product_id')}&user_id=${localStorage.getItem('userId')}`)
        .then(res => {
            if(res.data !== 'No Reviews'){
                const hist = [];

                for(let key in res.data){
                    hist.push({
                        ...res.data[key],
                        idd: key
                    });
                }
                this.setState({
                    revArray: hist
                })
            }
        })

    }

    componentDidMount () {
        window.scrollTo(0,0);
        const {match: {params}} = this.props;
        let a = params.product_id
        a = a.substring(1);
        this.props.type_payment('Single Item')

        axios.post('/fetch-specific-accessory', {accessory_id: a})
        .then(response => {
            this.setState({
                product: response.data
            })

        })

        this.getReviews();

        
        axios.post('/fetch-specific-accessory-rating-and-review', {accessory_id: a})
        .then(response => {
            if(response.data.length > 0 ){
            
            const hist = [];
            for(let key in response.data){
                hist.push({
                    ...response.data[key],
                    iddd: key
                });
            }
            this.setState({
                reviewsArray: hist
               })
            
            }
        })
        
        axios.post('/fetch-specific-accessory-rating-and-review-based-on-user-accessory', {user_id: localStorage.getItem('userId'), accessory_id: localStorage.getItem('product_id')})
        .then(res => {
            if(res.data.length > 0){
                
                if(res.data[0].review !== null||''){
                    this.setState({
                        review: res.data[0].review,
                    })
                }

                if(res.data[0].rating !== null|| ''){
                    this.setState({
                        rate: res.data[0].rating
                    }, () => {
                        this.setState({
                            ratedisable: true
                        })
                    })
                }

                if(res.data[0].review !== null||''){
                    this.setState({
                        disabled: true
                    })
                }
            }
        })

    }

    inputChangeHandler = (e) => {
        this.setState({
            review: e.target.value
        })
    }


    increaseCounter = (e) => {
        this.setState({
            buyButton: true,
            counter : this.state.counter + 1,
            price: this.props.price  * (this.state.counter+1)  
        })
    }

    decreaseCounter = (e) => {
        if(this.state.counter !== 1){
            this.setState({
                buyButton: true,
                counter : this.state.counter - 1,
                price: this.props.price * (this.state.counter-1)
            })
        }        

    }

    updateQuantity = () => {
        axios.post('/direct-buy-check', {user_id: localStorage.getItem('userId'), accessory_id: this.state.product.accessory_id, quantity: this.state.counter} )
        .then(response => {
            // alert(response.data);
            
            // if(response.data === 'Insuffiecient')
            if(response.data === 'Insufficient Stock'){
                Alert.warning('Out of Stock', {
                    position: 'top',
                    effect: 'bouncyflip',
                    timeout: 3000,
                    html: false
                });    
                this.setState({
                    buyButton: false
                })
            }
            else {
                this.setState({
                    buyButton: true
                })
            }
        });
    }

    buyProduct = () => {
        axios.post('/direct-buy-check', {user_id: localStorage.getItem('userId'), accessory_id: this.state.product.accessory_id, quantity: this.state.counter})
        .then(response => {
            if(response.data === 'Insufficient Stock'){
                Alert.warning('Out of Stock', {
                    position: 'top',
                    effect: 'bouncyflip',
                    timeout: 3000,
                    html: false
                });    
                this.setState({
                    buyButton: false,
                    direct: false
                })
            }
            else {
                this.props.quantityNum(this.state.counter)
                this.setState({
                    buyButton: true,
                    direct:true
                })
            }
        })
    }


    ratingChanged = (newRating) => {
        this.setState({
            rate: newRating
        }, () => {
            axios.post('/accessory-rating', {
                user_id: localStorage.getItem('userId'),
                accessory_id: this.state.product.accessory_id,
                rating: newRating
            })
            .then(res => {
            })
            .catch(err => {
            })
        })
    }

    showRate = () => {
        if(this.state.rateToggle){
            this.setState({
                rateToggle: false
            })
        }
        else {
            this.setState({
                rateToggle: true
            })
        }
        
        
    }
    submitHandler = (e) => {
        axios.post('/accessory-review', {
            user_id: localStorage.getItem('userId'),
            accessory_id: this.state.product.accessory_id,
            review: this.state.review
        })
        .then(res => {
            this.setState({
                modalShow: false
                
            })
            this.getReviews();
        })
    }


    render () {
        let rateDiv = <div>

                        
                          <ReactStars
                           count={5}
                           onChange={this.ratingChanged}
                           size={24}
                           value={this.state.rate}
                           half={false}
                           edit={!this.state.ratedisable} 

                           color2={'#ffd700'} /> 
                         </div>

        let reviewlist;
    
        if(this.state.revArray.length > 0){
            reviewlist = this.state.revArray.map(dis => {
                return (
                <ReviewDiv 
                key={dis.idd}
                details = {dis}
                />
                )
    
            })
    
        }
        else {
             reviewlist = <div>No Reviews To Show For </div>;

        }
        

        let modalClose = () => this.setState({ modalShow: false });

        let directProd = null;
        if(this.state.direct){  
            directProd = <Redirect to={'/productpayment/:'+this.state.product.accessory_id} />
        }

        return (
            <div className={classes.Container}>
                    {directProd}

                <div className={classes.mainDiv}>
                    <div className={classes.leftDiv}>

                        <div className={classes.imageCont}>
                            <img alt="accessory" className={classes.image} src={this.state.product.accessory_image}/>
                        </div>

                        <div className={classes.details}>
                            <h5><strong>Details</strong></h5>
                            <hr style={{border: '0.5px solid black'}}/>
                            <div className={classes.innerDetails}>
                                <div><p><strong>Description:</strong> <span className={classes.valueDet}>{this.state.product.accessory_details}</span></p></div>
                                {/* <div><p>Used For:{this.state.product}</p></div> */}
                                <div><p><strong>Used For:</strong> <span className={classes.valueDet}>{this.state.product.accessory_use}</span></p> </div>
                                <div><p><strong>Product Type:</strong> <span className={classes.valueDet}>{this.state.product.accessory_type}</span></p> </div>

                            </div>
                        </div>
                    </div>

                    <div className={classes.rightDiv}>
                        <div className={classes.price}>
                        <div><h5><strong>{this.state.product.accessory_name}</strong></h5></div>    
                        <hr style={{border: '0.5px solid black'}}/>

                            <h6><strong>Price:</strong> <span className={classes.valueDet}>&#x20B9;{this.state.product.accessory_price}</span></h6>

                            <div className={classes.quantity}> 
                                  <h6><strong>Quantity:</strong> &nbsp;&nbsp;&nbsp;
                                     <button onClick={this.decreaseCounter} >
                                         -
                                     </button>
                                     <input readOnly className={classes.inputDiv}  id="count" type="number" value={this.state.counter} />
                                     <button onClick={this.increaseCounter}>
                                         +
                                     </button>
                                     </h6>
                            </div>            

                        
                            <div className={classes.buttonContainer}>

{
    localStorage.getItem('token') === null
 
 ? <div className={classes.but}>
     <NavLink to="/login"><button className="btn btn-primary">Kindly Sign In</button></NavLink>
   </div>  

 : <div className={classes.but}>
     {
            <div>
             
             {this.props.address === null || this.props.pincode === null || this.props.state === null || this.props.city === null || this.props.address === '' || this.props.pincode === '' || this.props.state === '' || this.props.city === ''

             ? <NavLink to="/Profile"><button className="btn btn-primary">Update your Profile</button></NavLink>

            //  : <NavLink  to={'/productpayment/:'+this.state.product.accessory_id} ><button disabled={!this.state.buyButton} className="btn btn-primary">Buy Product</button> </NavLink>
             : <button className="btn btn-success" onClick={this.buyProduct}>Buy Product</button>
              
             }  
           </div> 
           
                }
            </div> 
                  
     }
                
                            </div>               
                        </div>

                        <Modal
        show={this.state.modalShow}
        onHide={modalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
                 <div className={classes.modalHeader}>
                  <div className={classes.round}> {
                            this.props.image === null
                            ? <h2 style={{position: 'relative', objectFit: 'cover',
                            borderRadius: '50%',
                            width: '100%',
                            height: '100%',
                                display: 'inline-block',textAlign: "center",color: "black" }}>{this.props.fname.charAt(0)} </h2>
                            : <img alt="profile" className={classes.pp} src={this.props.image}/>
                        }
                  </div>
                  <div><p>{this.props.fname +" "+ this.props.lname}</p></div>      
             </div>      
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Give your review</h5>
          <textarea rows="5" style={{width: '100%'}}type="text" disabled={this.state.disabled} onChange={this.inputChangeHandler}  value={this.state.review} />
          {/* <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.submitHandler}>Save</Button>
        </Modal.Footer>
      </Modal>
        

                        <div className={classes.downRightDiv}>
                            {localStorage.getItem('userId')
                            ? <div><button className={classes.ratebut} onClick={this.showRate}>Rate our product</button></div>
                            : <div><NavLink to="/login"><button className={classes.ratebut} onClick={this.showRate}>Rate our product</button></NavLink></div>}
                            
                            <div>
                            {rateDiv}
                            </div>    

                            {localStorage.getItem('userId')
                            ? <div><button className={classes.ratebut} onClick={() => this.setState({ modalShow: true })}>Give your review</button></div>
                            : <div><NavLink to="/login"><button onClick={() => this.setState({ modalShow: true })} className={classes.ratebut}>Give your review</button></NavLink></div>}
                            
                        </div>
                    </div>

                </div>    

                <div className={classes.reviewsCont}>
                    <strong >Reviews</strong> 
                    {reviewlist}
               </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        image : state.auth.image,
        fname : state.auth.first_name,
        lname : state.auth.last_name
    }    
}

const mapDispatchToProps = dispatch => {
    return {
      type_payment: (payment_type) => dispatch(actions.type_of_payment(payment_type)),
      quantityNum : (quantity) => dispatch(actionp.quantityNum(quantity))
    }
  }
  

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);