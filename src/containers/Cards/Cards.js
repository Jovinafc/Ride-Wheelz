import React, { Component } from 'react';
import Card from '../../components/UI/Card/Card';
import classes from './Cards.module.css';
import { connect} from 'react-redux';
import * as actions from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import 'react-accessible-accordion/dist/minimal-example.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import axios from 'axios';
// import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import Picky from 'react-picky';
import "react-picky/dist/picky.css";
import 'rc-slider/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import Sidebar from "react-sidebar";


function searchingFor(term) {
    return function(x) {
        return x.brand.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class Cards extends Component {
    constructor (props){
        super(props);
        this.getVehicleDetails = this.getVehicleDetails.bind(this);
        this.selectMultipleKm_Driven = this.selectMultipleKm_Driven.bind(this);
        this.selectMultipleState = this.selectMultipleState.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.onsidebar = this.onsidebar.bind(this);

        this.state = {
            value4: {
                min: 0,
                max:200000
            },
            display: [],
            minError: '',
            maxError: '',
            sidebarOpen: false,
            vehicles: [],
            filter_vehicles: [],
            user_id: this.props.user_id,
            term: '',
            price: '',
            regStateSelected: [],
            reg_state: [],
            kmDrivenSelected: [],
            kmDriven: [],
            service_type: [],
            vehicle_type: [],
            fuel_type: [],
            pricemin: 0,
            pricemax: 0,    
            price_range: [],
            filterstring: '/filter?',
            filterValues: {
                vehicle_type: [],
                service_type: [],
                fuel_type: [],
                pricemin: 0,
                pricemax: 0,
                price_range: [],
                regStateSelected: [],
                kmDrivenSelected: []
            }
        }
    }

    onSetSidebarOpen(open) {
        if(this.state.sidebarOpen !== open){
            this.setState({ sidebarOpen: !this.state.sidebarOpen});
        }
      }

      onsidebar = (e) => {
            e.preventDefault();
            if(this.state.sidebarOpen === true){
                this.setState({sidebarOpen: false})
            }else {
                this.setState({sidebarOpen: true})
            }
      }

    getVehicleDetails = () => {
        if(localStorage.getItem('userId') === null){
            axios.get(`/filter1?type_of_service=${this.state.filterValues.service_type.join()}&vehicle_type=${this.state.filterValues.vehicle_type.join()}&fuel_type=${this.state.filterValues.fuel_type.join()}&select_state=${this.state.filterValues.regStateSelected.join()}&pricemin=${this.state.filterValues.pricemin}&pricemax=${this.state.filterValues.pricemax}&user_id=${1000}`)
        .then(result => {
            const fetchedFilteredValues = [];
            for(let key in result.data){
                fetchedFilteredValues.push({
                    ...result.data[key],
                    id:key
                });
            }
            this.setState({
                filter_vehicles: fetchedFilteredValues
            })
        })
        .catch(err => {
            console.log(err);
        })

        }
        else
        {
            axios.get(`/filter1?type_of_service=${this.state.filterValues.service_type.join()}&vehicle_type=${this.state.filterValues.vehicle_type.join()}&fuel_type=${this.state.filterValues.fuel_type.join()}&select_state=${this.state.filterValues.regStateSelected.join()}&pricemin=${this.state.filterValues.pricemin}&pricemax=${this.state.filterValues.pricemax}&user_id=${localStorage.getItem('userId')}`)
        .then(result => {
            const fetchedFilteredValues = [];
            for(let key in result.data){
                fetchedFilteredValues.push({
                    ...result.data[key],
                    id:key
                });
            }
            this.setState({
                filter_vehicles: fetchedFilteredValues
            })
        })
        .catch(err => {
            console.log(err);
        })
   
        }

        axios.post('/fetch-vehicles-except-current-user', {user_id: this.props.user_id}).then(result => {
            const fetchedValues = [];
            for(let key in result.data){
                fetchedValues.push({
                    ...result.data[key],
                    id: key
                });
            }
            this.setState({vehicles: fetchedValues})
        })
        .catch(err => {
            console.log(err);
        })
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        this.getVehicleDetails();

        axios.get('/fetch-registration-state').then(result => {
            this.setState({reg_state: result.data})
        });

        axios.get('/fetch-km_driven').then(result => {
            this.setState({kmDriven: result.data})
        });
       
    }

    searchHandler = (e) => {
        this.setState({term: e.target.value})
    }



    //Price Handler and Builder
    priceRangeHandler = (e) => {
       
        this.setState({
            price_range: e,
            pricemin: e[0],
            pricemax: e[1],
            filterValues: {
                ...this.state.filterValues,
                pricemin: e[0],
                pricemax: e[1]   
            }
        }, () => {
            this.getVehicleDetails();
        })
        
    }


        //State Handler and Builder
        selectMultipleState = (value) => {
            this.setState({
                regStateSelected: value,
                filterValues: {
                    ...this.state.filterValues,
                    regStateSelected: value
                }  
            }, () => {
                this.state_Builder();
            })
        }

        state_Builder = () => {
            this.getVehicleDetails();
        }
  
        //KM Driven Handler and Builder
      selectMultipleKm_Driven = (value) => {
        this.setState({
            kmDrivenSelected: value,
            filterValues: {
                ...this.state.filterValues,
                kmDrivenSelected: value
            }            
        }, () => {
            this.km_drivenBuilder();
        })
      }

      km_drivenBuilder = () => {
        this.getVehicleDetails();

    }   
    tooltip = { placement: 'After', isVisible: true, showOn: 'Always' };

     ticks= { placement: 'After', format: 'C2', largeStep: 20, smallStep: 10, showSmallTicks: true };

     // Service Type Handler and Builder
      serviceHandler = (e) => {
          if(e.target.checked){
              this.setState({ 
                    filterValues: {
                        ...this.state.filterValues,
                        service_type: [
                            ...this.state.filterValues.service_type,
                            e.target.value
                        ]
                    }                  
                }, () => {
                    this.service_typeBuilder();
                })
              
          }
          else {
              this.setState({
                  filterValues: {
                      ...this.state.filterValues,
                      service_type: this.state.filterValues.service_type.filter(type => {
                          return type !== e.target.value
                      })
                }},() => {
                 this.service_typeBuilder();
              })
          }          
      }

      service_typeBuilder = () => {
        this.getVehicleDetails();

        }

      // Vehicle Type Handler and Builder       
      vehicle_typeHandler = (e) => {
        if(e.target.checked){
            this.setState({
                  filterValues: {
                      ...this.state.filterValues,
                      vehicle_type: [
                          ...this.state.filterValues.vehicle_type,
                          e.target.value
                      ]
                  }               
              },() => {
                this.vehicle_typeBuilder();
            })
            
        }
        else {
            this.setState({
                filterValues: {
                    ...this.state.filterValues,
                    vehicle_type: this.state.filterValues.vehicle_type.filter(type=> {
                        return type !== e.target.value
                    })
                }
                }, () => {
                    this.vehicle_typeBuilder();
                })
            
        }
      }

      vehicle_typeBuilder = () => {
        // let arr = this.state.filterValues.vehicle_type;
        this.getVehicleDetails();

    }

    // Fuel _type Handler and Builder
      fuel_typeHandler = (e) => {
        if(e.target.checked){
            this.setState({ 
                  filterValues: {
                      ...this.state.filterValues,
                      fuel_type: [
                          ...this.state.filterValues.fuel_type,
                          e.target.value
                      ]
                 }            
              }, () => {
                this.fuel_typeBuilder();
            })
            
        }
        else {
            this.setState({
                filterValues : {
                    ...this.state.filterValues,
                fuel_type: this.state.filterValues.fuel_type.filter(type => {
                    return type !== e.target.value;
                })
                }}, () => {
                    this.fuel_typeBuilder();
                })
            }
        }

      fuel_typeBuilder = () => {
        //   let arr = this.state.filterValues.fuel_type;
        this.getVehicleDetails();
      }

      minnum = (e) => {
          e.preventDefault();
          this.setState({
              ...this.state,
              filterValues: {
                ...this.state.filterValues,
                pricemin: e.target.value
              }
          })

      }
      
      maxnum = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            filterValues: {
              ...this.state.filterValues,
              pricemax: e.target.value
            }
        })
    }

    minmaxsub = (e) => {
        e.preventDefault();

        // console.log(this.state.filterValues.pricemin);
            
        // console.log(this.state.filterValues.pricemax);
       
            if(this.state.filterValues.pricemin > this.state.filterValues.pricemax){
                // console.log('inside')
                this.setState({
                    minError: 'Invalid Range'
                })
            }
            else {
                this.setState({
                    minError: ''
                })
                this.getVehicleDetails();
            }

    }

    minmaxsubsmall = (e) => {
        e.preventDefault();
            // console.log(this.state.filterValues.pricemin);
            
            // console.log(this.state.filterValues.pricemax);
            
            if(this.state.filterValues.pricemin > this.state.filterValues.pricemax){
                this.setState({
                    minError: 'Invalid Range'
                })
            }
            else {
                this.setState({
                    minError: ''
                })
                this.getVehicleDetails();
                this.setState({
                    sidebarOpen: false
                })
            }

    }

    

    render () {

        let phonefilter = (
            <div className={classes.MenuSide}>
                   <Collapse >
                        <Panel header="Type of Service" headerClass="my-header-class">
                             <input type="checkbox" name="vehicle_type" onChange={this.serviceHandler} value="Sale" /> Sale &nbsp; 
                             <span style={{width: '20px', color:'white' }}>J</span>   
                             <input type="checkbox" name="vehicle_type" onChange={this.serviceHandler} value="Rent" /> Rent < br/>               

                        </Panel>

                        <Panel header="Vehicle Type" headerClass="my-header-class">
                            <input type="checkbox" name="vehicle_type" value="Four-Wheelers" onChange={this.vehicle_typeHandler}/> 4-Wheelers &nbsp; 
                            <input type="checkbox" name="vehicle_type" value="Two-Wheelers" onChange={this.vehicle_typeHandler}/> 2-Wheelers < br/>               
                        </Panel>

                        
                        <Panel header="Fuel Type" headerClass="my-header-class">
                            <input type="checkbox" name="fuel_type" onChange={this.fuel_typeHandler} value="Diesel" /> Diesel &nbsp;
                            <input type="checkbox" name="fuel_type" onChange={this.fuel_typeHandler} value="Petrol" /> Petrol &nbsp;
                            <input type="checkbox" name="fuel_type" onChange={this.fuel_typeHandler} value="CNG" /> CNG
                                     
                        </Panel>

                        <Panel header="Select State" headerClass="my-header-class">
                            <Picky 
                                 value={this.state.regStateSelected}
                                 open={true}
                                 options={this.state.reg_state}
                                 includeFilter={true}
                                 dropdownHeight={600}
                                 onChange={this.selectMultipleState}
                                 valueKey="id"
                                 labelKey="name"
                                 multiple={true}
                                 includeSelectAll={true} />

                        <div style={{height: '300px'}}> </div>

                        </Panel>

                        <Panel header="Price Range" headerClass="my-header-class">
                            {/* <InputRange
                                maxValue={200000}
                                minValue={0}
                                formatLabel={value => `${value} Rs`}
                                value={this.state.value4}
                                onChange={value => this.setState({ value4: value })}
                                onChangeComplete={value => console.log(value)} /> */}
                                <div>
                                    <span style={{fontSize: '0.7em'}}>Select only one of Sale or Rent type</span>
                                   <br /> 
                                    Min <input style={{width: '80px'}} onChange={this.minnum} value={this.state.filterValues.pricemin} type="number"/>
                                    <br />
                                    <span style={{color: 'red'}}>{this.state.minError}</span>

                                    <br />
                                    Max <input style={{width: '80px'}} onChange={this.maxnum} value={this.state.filterValues.pricemax}  type="number" />
                                    <br />
                                    <button onClick={this.minmaxsubsmall} >Submit</button>
                                </div>
                        </Panel>
                  </Collapse>

                </div>
        )

        let displayVehicle;
        if(this.state.filter_vehicles.length > 0){
            
        displayVehicle = this.state.filter_vehicles
        .filter(searchingFor(this.state.term))
        .map(dis => {
            return (
             <Card className={classes.card} name={dis.brand} user_id={dis.user_id} vehicle_id={dis.vehicle_id} key={dis.id} model={dis.model} 
               price={dis.price} 
               image={dis.image}
               year={dis.year}
               rate={dis.avg_rating}
               price_per_day={dis.price_per_day}
               />  )
               });
        }
        else {
            displayVehicle = <div style={{textAlign: 'center', fontFamily: 'Roboto', marginLeft: '30%', marginTop: '15%', fontSize: '1.5em'}}>No Vehicles match your requirements</div>
        }
        if(this.props.loading){
            displayVehicle = <Spinner />
        }

        return (

            <div>
                <div className={classes.Container}>

                <div className={classes.Menu}>

<h5 >Filter</h5>
     <div className={classes.searchDiv}>
         <form >
            <input 
             type="text" 
             placeholder="Enter Vehicle Name"   
             value={this.state.term}
             onChange={this.searchHandler}/>
         </form>
    </div>

<Collapse >
    <Panel header="Type of Service" headerClass="my-header-class">
         <input type="checkbox" name="vehicle_type" onChange={this.serviceHandler} value="Sale" /> Sale &nbsp; 
         <input type="checkbox" name="vehicle_type" onChange={this.serviceHandler} value="Rent" /> Rent < br/>               
    </Panel>

    <Panel header="Vehicle Type" headerClass="my-header-class">
        <input type="checkbox" name="vehicle_type" value="Four-Wheelers" onChange={this.vehicle_typeHandler}/> 4-Wheelers &nbsp; 
        <input type="checkbox" name="vehicle_type" value="Two-Wheelers" onChange={this.vehicle_typeHandler}/> 2-Wheelers < br/>               
    </Panel>

    
    <Panel header="Fuel Type" headerClass="my-header-class">
        <input type="checkbox" name="fuel_type" onChange={this.fuel_typeHandler} value="Diesel" /> Diesel &nbsp;
        <input type="checkbox" name="fuel_type" onChange={this.fuel_typeHandler} value="Petrol" /> Petrol &nbsp;
        <input type="checkbox" name="fuel_type" onChange={this.fuel_typeHandler} value="CNG" /> CNG
                 
    </Panel>

    <Panel header="Select State" headerClass="my-header-class">
        <Picky 
             value={this.state.regStateSelected}
             open={true}
             options={this.state.reg_state}
             includeFilter={true}
             dropdownHeight={600}
             onChange={this.selectMultipleState}
             valueKey="id"
             labelKey="name"
             multiple={true}
             includeSelectAll={true} />

    <div style={{height: '250px'}}> </div>

    </Panel>

    <Panel header="Price Range" headerClass="my-header-class">
        {/* <InputRange
            maxValue={200000}
            minValue={0}
            formatLabel={value => `${value} Rs`}
            value={this.state.value4}
            onChange={value => this.setState({ value4: value })}
            onChangeComplete={value => console.log(value)} /> */}
            <div>
            <span style={{fontSize: '0.8em'}}>Select only one of Sale or Rent type</span>
                <br />
                 Min: <input onChange={this.minnum}  value={this.state.filterValues.pricemin} type="number"/>
                 <span style={{color: 'red'}}>{this.state.minError}</span>
                 <br />   
                 <br />
                 Max: <input onChange={this.maxnum}  value={this.state.filterValues.pricemax}  type="number" />
                 <button onClick={this.minmaxsub}>Submit</button>
             </div>
    </Panel>
</Collapse>

</div>

                <div className={classes.sidebarDiv}>
                <Sidebar
                 
                open={this.state.sidebarOpen}
                transitions={true}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white" } }}
                sidebar={phonefilter}
                >
                
                </Sidebar>
                </div>

{/*                  */}
                <div className={classes.Main}>  
                    <div className={classes.filterdiv}>    
 
                     <div className={classes.searchDiv}>
                              <form >
                                 <input 
                                  type="text" 
                                  placeholder="Enter Vehicle Name"   
                                  value={this.state.term}
                                  onChange={this.searchHandler}/>
                              </form>
                         </div>
 
                 <button className="btn btn-danger btn-xs" onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)} 
                //  className={classes.filterbar}
                 >
                         Filter 
                 </button>
                
                </div>
                    {displayVehicle}
                    
                </div>
            </div>

            </div>
            
        )

    }
}

const mapStateToProps = state => {
    return {
     user_id: state.auth.userId,
     loading: state.vehicle.loading,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        authCheckState: () => dispatch(actions.authCheckState())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Cards);