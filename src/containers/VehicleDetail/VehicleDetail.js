import React,{Component} from 'react';
import classes from './VehicleDetail.module.css';
import { connect} from 'react-redux';
import axios from 'axios';
import Aux from '../../hoc/Auxilary';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import * as actionp from '../../store/actions/vehicle_click'
import Datetime from 'react-datetime';
import moment, * as moments from 'moment';
import './react-date.css';
import VehicleReviewDiv from './VehicleReviewDiv';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class VehicleDetail extends Component {

    state = {
        vehicles: {},
        owner: {},
        show: false,
        user: false,
        showDate: false,        
        startdatetime: '',
        enddatetime: '',
        Invalid: false,
        postedOn: '',
        moment: moment(),
        start: '',
        end: '',
        days: 1,
        reviewsArray: [],
        noReviews: false,
        startDateError: '',
        endDateError: '',
        depositAmount: 5000,
        modalShow:false,
        modalShowDoc: false

    }


    buyVehicleHandler = () => {
        if(this.props.user_id === null){
            alert("Kindly Login")
        }
        

        let vehicles = {
            client_id: this.props.user_id, 
            vehicle_id: this.state.vehicles.vehicle_id,
        }

        axios.post('/buy-now' , {vehicles: vehicles})
        .then(res => {
            alert("Sold")
        });
    }

    handleChange = (moment) => {
        this.setState({
          moment
        });
      }

    

    lendHandler = (e) => {
        this.setState(oldState => ({showDate: !oldState.showDate}));
    }
    
     componentDidMount () {
        window.scrollTo(0, 0);

        // if(localStorage.getItem('token')){
        //     const expiry = localStorage.getItem('expirationDate');
        //   let d1 = new Date(expiry);
        //   let d2 = new Date();
          
          
        //   let d3 = d1.getTime();
        //   let d4 = d2.getTime();
        //   let d5 = d3-d4;
        //   //305000
        //   if(d5<3405000)
        //   {
        //       console.log("LogOut")
        //       console.log(localStorage.getItem('userId'));
        //       this.props.getTokens(localStorage.getItem('email'), localStorage.getItem('userId'))
        //       // setTimeout(this.props.getTokens(localStorage.getItem('email'), localStorage.getItem('token')), 0)
        //       // this.props.getTokens(this.props.email, this.props.user_id);
        //   }
        // }
        // console.log(this.props.vehicle_id);
        const {match: {params}} = this.props;
        let a = params.vehicle_id;
        a = a.substring(1);
         axios.post(`/fetch-specific-vehicle`, {user_id: localStorage.getItem('userId'), vehicle_id: a})
         .then(response => {
           if(response===null)
           {

           }
           else
           {
            this.setState({
                vehicles: response.data[0],
                owner: response.data[0].owner,
            });
            
            this.setState({postedOn: response.data[0].createdAt.substring(0,10)})
            this.props.save_bank_account_no(response.data[1])
            this.props.fetch_selected_vehicle(response.data)
           }
         })
         .catch(err => {
             this.setState({Invalid: true})
         });


         axios.get(`/fetch-vehicle-comments-and-ratings/${a}`)
         .then(res => {
                if(res.data === 'No reviews'){
                    this.setState({
                        noReviews: true
                    })   
                }
                else {
                    const hist = [];
                 for(let key in res.data){
                     hist.push({
                         ...res.data[key],
                         id: key
                     });
                 }

                 this.setState({
                    reviewsArray: hist
                 })
             
                }
                 
         })
 }

     cancel = () => {
        this.setState({show: false});
    }

    proceedHandler = (e) => {
        e.preventDefault();
        axios.post('/rent-now', {user_client_id: this.props.user_id, 
                        vehicle_id: this.state.vehicles.vehicle_id,
                        start_date: this.state.startdatetime,
                        end_date: this.state.enddatetime})
        .then(response => {
            
            alert("Rented")
            this.setState({
                startdatetime : '',
                enddatetime: ''
            })
        })
    }

    logHandler = () => {
        this.setState({show: true});
    }

    cancel = () => {
        this.setState({show: false});
    }

    dateHandler = () => {

    }

     date_diff_indays = function(date1, date2) {
        let dt1 = new Date(date1);
        let dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
     }
 
    starth = (moment) => {
        let s = moments(moment._d).format('YYYY-MM-DD HH:mm');
        this.setState({
            start: s
        })
        this.props.startDate(s);
    }

    endh = (moment) => {
        
        let s = moments(moment._d).format('YYYY-MM-DD HH:mm');
        // console.log(s);


        this.setState({
            end: s
        }, () => {
       
               let a = moments(this.state.start).format('MM/DD/YYYY');
            //    console.log(a);
               let b = moments(moment._d).format('MM/DD/YYYY');
            //    console.log(b);
       
               let diff = this.date_diff_indays(a,b);
            //    console.log(diff);
       
               if(diff === 0){
                   this.setState({
                       days: 1
                   })
               }
               else {
               this.setState({
                   days: diff
               })
            }
        });



        this.props.endDate(s);

    }

    submitHandler = (e) => {
            this.setState({
                modalShow: false
            })
        
    }

    submitHandlerDoc = (e) => {
        this.setState({
            modalShowDoc: false
        })
    
}

    
    render () {

        let yesterday = Datetime.moment().subtract(1, 'day');
        let valid = function(current){
            return current.isAfter(yesterday);
        };
 
        // let prev = this.state.start;
        // let validend = function(current){
        //     return current.isAfter(prev)
        // }

        let reviewlist = null;

        if(this.state.noReviews === false){
            
        reviewlist = this.state.reviewsArray.map(dis => {
            return (
            <VehicleReviewDiv 
            key={dis.id}
            details = {dis}
            
            />
            )

        })

        }


        const sd = this.state.start;
        const ed = this.state.end;

        const enabled = sd.length > 0 && ed.length > 0;

        
        let datepickers = null;
        if(this.state.vehicles.price_per_day){
            datepickers = <div className={classes.date}>
                                <p style={{marginBottom: '-3px'}}>Start Date</p>
                                <Datetime isValidDate={valid}  style={{width: '60%'}} onChange={this.starth}/>  
                                <span>{this.state.startDateError}</span>
                                <p style={{marginBottom: '-3px'}}>End Date</p>
                               <Datetime isValidDate={valid}  onChange={this.endh}/>
                                <span>{this.state.endDateError}</span>
                          </div>
        }

        let modalClose = () => this.setState({ modalShow: false });

        let modalCloseDoc = () => this.setState({ modalShowDoc: false });

        return (
            <Aux>
         

            {this.state.Invalid === true 
            ?  <div className={classes.Container}> <h2> Error 404</h2> </div> 
            :  <div className={classes.Container}>
                                             
                <div className={classes.firstCont}>
                    <div className={classes.leftdiv}>
                             <div className={classes.image}>
                                 <img alt="im" className={classes.img} src={this.state.vehicles.image}/>
                             </div>
                             <div className={classes.details}>
                                  <h4>Details</h4>
                                  <hr style={{border: '0.5px solid grey'}}/>
                                  <div className={classes.innerdetails}>
                                 <div> <p><strong>Brand:</strong> <span className={classes.valueDetail}>{this.state.vehicles.brand}</span></p> </div> 
                                 <div> <p><strong>Model:</strong> <span className={classes.valueDetail}>{this.state.vehicles.model}</span> </p> </div>
                                 <div> <p><strong>Year:</strong> <span className={classes.valueDetail}>{this.state.vehicles.year}</span> </p></div>
                                 <div> <p><strong>Km Driven:</strong>  <span className={classes.valueDetail}>{this.state.vehicles.km_driven}</span> </p></div> 
                                 <div> <p><strong>State:</strong>  <span className={classes.valueDetail}>{this.state.vehicles.registration_state}</span> </p></div>
                                 <div> <p><strong>Fuel Type:</strong>  <span className={classes.valueDetail}>{this.state.vehicles.fuel_type}</span> </p></div> 
                                 <div> <p><strong>Vehicle Number:</strong>  <span className={classes.valueDetail}>{this.state.vehicles.number_plate}</span> </p></div>  
                                 
                                 <Modal
        show={this.state.modalShowDoc}
        onHide={modalCloseDoc}
        size="sg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
                 <div className={classes.modalHeader}>
                     Vehicle Document
                </div>      
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div className={classes.documentViewer}>
                    <a href={this.state.vehicles.documents} download="myimage"><img alt="Document" className={classes.vehicledocument} src={this.state.vehicles.documents} /></a>

                     {/* <img src={this.state.vehicles.documents} alt="Vehicle Document" className={classes.vehicledocument}/>       */}
                </div>                    
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.submitHandler}>Close</Button>
        </Modal.Footer>
      </Modal>    
                                 <div> <button onClick={() => this.setState({ modalShowDoc: true })} className={classes.valueDetail}>Vehicle Document</button> </div>  
                                       
                                 </div>
                             </div>
                    </div>

                    <div className={classes.rightdiv}>
                        <div className={classes.price}>
                        <div style={{marginLeft: '4px'}}> <h4><strong>{this.state.vehicles.brand} {this.state.vehicles.model}</strong></h4> </div>  
                            <hr style={{border: '0.5px solid grey'}}/>
                            {this.state.vehicles.price ? 
                            <div style={{marginLeft: '4px'}}><strong>Price: &#x20B9;</strong> <span className={classes.valueDetail}>{this.state.vehicles.price.toLocaleString('en-IN')}</span></div> : <div style={{marginLeft: '4px'}}><strong>Price per day:</strong> <span className={classes.valueDetail}>&#x20B9;{this.state.vehicles.price_per_day}</span></div>} 
                            <div style={{marginLeft: '4px'}}><strong> Ad Posted On: </strong> <span className={classes.valueDetail}>{this.state.postedOn}</span></div>    
                            <div style={{marginLeft: '4px'}}><strong>Owner: </strong><span className={classes.valueDetail}>{this.state.owner.name}</span></div>

                            <Modal
        show={this.state.modalShow}
        onHide={modalClose}
        size="sg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
                 <div className={classes.modalHeader}>
                     Owner Details
                </div>      
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div className={classes.modalDetails}>
                     <table>           

                    <tr>
                         <td><strong>Name:</strong></td>
                         <td>{this.state.owner.name}</td>
                     </tr>   

                     <tr>
                         <td><strong>Phone Number:</strong></td>
                         <td>{this.state.owner.mobile_no}</td>
                     </tr>

                     
                     <tr>
                         <td><strong>Address:</strong></td>
                         <td>{this.state.owner.address}</td>
                     </tr>
                     
                     <tr>
                         <td><strong>State:</strong></td>
                         <td>{this.state.owner.state}</td>
                     </tr>

                     
                     <tr>
                         <td><strong>City:</strong></td>
                         <td>{this.state.owner.city}</td>
                     </tr>

                     
                     <tr>
                         <td><strong>Pincode:</strong></td>
                         <td>{this.state.owner.pincode}</td>
                     </tr>
                     </table>           
                </div>                    
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.submitHandler}>Close</Button>
        </Modal.Footer>
      </Modal>    

                            <div style={{marginLeft: '4px'}}>
                            <button 
                            // className={classes.ownerdet}
                            class="btn btn-primary btn-sm"
                             onClick={() => this.setState({ modalShow: true })}>
                                Owner Details
                            </button></div>
                            <div> {datepickers} </div>
                            <div className={classes.buttonCont}>
                            {
                    localStorage.getItem('token') === null
                 
                 ? <div className={classes.but}>
                     <NavLink to="/login"><button className="btn btn-info">Kindly Sign In</button></NavLink>
                   </div>  
               
                 : <div className={classes.but}>
                     {  
                         this.state.vehicles.price 
                         
                         ? <div className={classes.but}>
                             
                             {this.props.address === null || this.props.pincode === null || this.props.state === null || this.props.city === null || this.props.address === '' || this.props.pincode === '' || this.props.state === '' || this.props.city === ''

                             ? <NavLink to="/Profile"><button className="btn btn-primary">Update your Profile</button></NavLink>

                             : <NavLink to={'/payment/:'+this.props.vehicle_id}><button className="btn btn-primary">Buy Vehicle</button> </NavLink>
                              
                             }  
                           </div> 
                           
                          : <div className={classes.but}>

                               {this.props.address === null || this.props.pincode === null || this.props.state === null || this.props.city === null || this.props.address === '' || this.props.pincode === '' || this.props.state === '' || this.props.city === ''

                               ? <NavLink to="/Profile"><button className="btn btn-success">Update your Profile</button></NavLink>

                               : <NavLink to={'/payment/:'+this.props.vehicle_id}>
                                   <button 
                                   disabled={!enabled}
                                   className="btn btn-success">Rent Vehicle</button></NavLink>

                                }
                            </div> 
                         
                         
                     }
                 
                  </div> 
               
               }           

                            <div style={{marginLeft:'5px'}}>
                                {!this.state.vehicles.price 
                                ? <div style={{ width: '100%', height: '80%'}}><p style={{fontSize: '0.8em', marginTop: '10%'}}>A deposit of &#x20B9; 5000 will be taken.
                                {this.state.depositAmount} + {this.state.vehicles.price_per_day * this.state.days} = {this.state.vehicles.price_per_day* this.state.days + 5000}
                                </p></div>
                                : null }
                            </div>
                            </div>    
                            
                        </div>
                    </div>
                </div>  
            </div> }


            {
                this.state.noReviews
                ? null
                : <div className={classes.reviewsCont}>

                {reviewlist}
           </div>

            }
            
            </Aux>
        );
    };
}

const mapStateToProps = state => {
    return {
        vehicle_id: state.vehicle.vehicle_id,
        vehicles: state.vehicle.vehicles,
        user_id: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
        address: state.auth.address,
        state: state.auth.state,
        city: state.auth.city,
        pincode: state.auth.pincode,
        number : state.auth.phone_number
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getTokens: (email,user_id) => dispatch(actions.authRefresh(email,user_id)),
        startDate: (startDate) => dispatch(actionp.startDate(startDate)),
        endDate: (endDate) => dispatch(actionp.endDate(endDate)),
        fetch_selected_vehicle: (vehicle) => dispatch(actionp.fetch_selected_vehicle(vehicle)),
        save_bank_account_no : (bank_no) => dispatch(actionp.save_owner_bank_account_no(bank_no)),
        no_of_days: (start,end) => dispatch(actionp.no_of_days(start,end))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetail);