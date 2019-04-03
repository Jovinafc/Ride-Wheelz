import React, {Component} from 'react';
import classes from './SellVehicle.module.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Tabs from './Tabs/Tabs';
import { connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast} from 'react-toastify'
import Modal from 'react-bootstrap/Modal'
import Aux from '../../hoc/Auxilary';
import ReactTooltip from 'react-tooltip'
import { Redirect } from 'react-router-dom'
import Alert from 'react-s-alert';
import {ClipLoader} from 'react-spinners';
import { css } from '@emotion/core';



const override = css`
    display: block;
    margin: 0 auto;
    border-color: yellow;
`;

class SellVehicle extends Component {

    notify = () => toast("Ad Posted !");
    state = {
        formdata: {
            user_id: localStorage.getItem('userId'),
            type: '',
            brand: '',
            model: '',
            fuel: '',
            year: '',
            registration_state: '',
            km_driven: '',
            number_plate: '',
            price: '',
            image: '',
            documents: '',
            
        },
        types: [],
        brands: [],
        models: [],
        year: [],
        fuels: [],
        reg_state : [],
        km_driven: [],
        file: '',
        docfile: '',
        imagePrev: '',
        documentPrev: '',
        tempBrand: '',
        tempModel: '',
        tempType: '',
        sample: '',
        show: false,
        loading: false,
        width: window.innerWidth,
        proferror: false
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
      }

      handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
      };


    details = () => {
        axios.get('/fetch-year').then(result => {
            this.setState({year: result.data})
        });

        
        axios.get('/fetch-registration-state').then(result => {
            this.setState({reg_state: result.data})
        });

        axios.get('/fetch-km_driven').then(result => {
            this.setState({km_driven: result.data})
        });

    }


    componentDidMount () {
        window.scrollTo(0, 0);

        if(this.props.address === null || this.props.pincode === null || this.props.state === null || this.props.city === null || this.props.address === '' || this.props.pincode === '' || this.props.state === '' || this.props.city === ''){
            this.setState({show: true, proferror: true})
        }

        axios.get('/fetch-vehicle-type').then(result => {
            this.setState({types: result.data})
        })
        .catch(err => {
        });

        this.details(); 
    }

    handleClose = () =>  {
        this.setState({
            show: false
        })
      }
    

   selectChangedHandlerType = (e) => {
       this.setState({
           formdata: {
               ...this.state.formdata,
               type: e.target.value,
               km_driven: '',
               registration_state: '',
               fuel: '',
               year: '',
               image: '',
               model: '',
               brand: ''
           },
           brands: [],
           models: [],
           year: [],
           reg_state: [],
           km_driven: [],
           tempType: e.target.value,
           file: '',
           docfile: '',
           imagePrev: '',
           documentPrev: '',
           tempBrand: '',
           tempModel: ''
       })

       if(e.target.value === 'Two-Wheelers'){
           axios.get('/fetch-twoWheeler-brand').then(result => {
                this.setState({brands: result.data});
           });

           axios.get('/fetch-twoWheeler-fuel').then(result =>{
                this.setState({fuels: result.data})
           });

           this.details();
        }
        else {
            axios.get('/fetch-fourWheeler-brand').then(result => {
                this.setState({brands: result.data});
           });
           axios.get('/fetch-fourWheeler-fuel').then(result =>{
            this.setState({fuels: result.data})
       });

            this.details();
        }
 }

 
    selectChangedHandlerBrand = (e) => {
        if(this.state.formdata.type === ''){
            Alert.info('Select Vehicle Type', {
                position: 'top',
                effect: 'bouncyflip',
                timeout: 3000,
                html: false
            });
        }
        
        e.preventDefault();
        if(e.target.value === 'Others'){
            this.setState({
                tempBrand: e.target.value,
                formdata: {
                    ...this.state.formdata,
                    brand: ''
                }
            });
        }
        
        else { 
        this.setState({
            tempBrand: e.target.value,
            formdata: {
                ...this.state.formdata,
                brand: e.target.value
            }
        }); 

        if(this.state.tempType === 'Four-Wheelers'){
             axios.post('/fetch-fourWheeler-model', {brand: e.target.value})
             .then((result) => {
                 this.setState({models: result.data})
             }).catch(e => {
             })
        }
        else if(this.state.tempType === 'Two-Wheelers'){
            axios.post('/fetch-twoWheeler-model', {brand: e.target.value})
            .then((result) => {
                this.setState({models: result.data})
            }).catch(e => {
            })
       }
    }
}

    selectChangedHandlerModel = (e) => {
        if(e.target.value === 'Others'){
            this.setState({
                tempModel: e.target.value,
                formdata: {
                    ...this.state.formdata,
                    model: ''
                }
            });
        }
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                model: e.target.value
            },
            tempModel: e.target.value
        })
    }

    selectChangedHandlerYear = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                year: e.target.value
            }
        })
    }
    selectChangedHandlerKm = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                km_driven: e.target.value
            }
        })
    };

    selectChangedHandlerReg = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                registration_state: e.target.value
            }
        })
    };

    selectChangedHandlerFuel = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                fuel: e.target.value
            }
        })
    }

    selectChangedHandlerName = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                number_plate: e.target.value
            }
        })
    }
    
    selectChangedHandlerPrice = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                price: e.target.value
            }
        })
    }

    validate = () => {
        let isError = false;
        let errors = {}

        if(this.state.formdata.type === ''){
            isError = true;
        }
        
        if(this.state.formdata.brand === ''){
            isError = true;
        }
        if(this.state.formdata.model === ''){
            isError = true;
        }
        
        if(this.state.formdata.registration_state === ''){
            isError = true;
        }
        
        if(this.state.formdata.fuel === ''){
            isError = true;
        }
        
        if(this.state.formdata.km_driven === ''){
            isError = true;
        }
        
        if(this.state.formdata.image === ''){
            isError = true;
        }

        if(this.state.formdata.price=== ''){
            isError = true;
        }
        
        if(this.state.formdata.year === ''){
            isError = true;
        }

        if(this.state.formdata.number_plate === ''){
            isError = true;
        }
// if(this.state.formdata.documents=== ''){
        //     isError = true;
        // }
        if(isError){
            this.setState({
                ...this.state,
                ...errors
            })
        }

        return isError;
    }

    formSubmit = (event) => {
        event.preventDefault();

        if(this.state.proferror === true){
            Alert.warning('Kindly Update Your Profile First', {
                position: 'top',
                effect: 'bouncyflip',
                timeout: 3000,
                html: false
            });
        }
        else {
         const error = this.validate();

         if(!error){
            this.setState({
                loading: true
            })
            const fd = new FormData();
            fd.append('image',this.state.formdata.image);
            axios.post('/image',fd).then(()=>{  

               const sd = new FormData(); 
               sd.append('documentImage', this.state.formdata.documents) 
               axios.post('/documentImage', sd).then(res => {

                   axios.post('/store-vehicle-details',{vehicles:this.state.formdata})
                   .then((post) => {
                       Alert.info('Ad Posted', {
                           position: 'top',
                           effect: 'bouncyflip',
                           timeout: 3000,
                           html: false
                       });
                       // this.notify();
                       this.setState({
                           formdata: {
                               type: '',
                               brand: '',
                               model: '',
                               registration_state: '',
                               fuel: '',
                               image: '',
                               documents: '',
                               price: '',
                               year: '',
                               km_driven: '',
                               number_plate: '',
                               user_id: this.props.user_id
                             },
                             imagePrev: '',
                             documentPrev: '',
                             loading: false
                       }) 
               
                   }).catch(e=>{
                       Alert.warning('Some Error Occurred! Please Try Again', {
                        position: 'top',
                        effect: 'bouncyflip',
                        timeout: 3000,
                        html: false
                    });
                       this.setState({
                           loading: false
                       })
                   })

               }) 
               this.setState({documentPrev: ''})    
               this.setState({imagePrev:''});
    
        }).catch(e=>console.log(e));
        
        }
      
        }
        
    }

    
    // formSubmit = (event) => {
    //     const error = this.validate();
    //     if(!error){
    //         event.preventDefault();
    //         this.setState({
    //             loading: true
    //         })
    //         const fd = new FormData();
    //         fd.append('image',this.state.formdata.image);
    //         axios.post('/image',fd).then(()=>{  
    //             console.log('Image Sent');

    //                axios.post('/store-vehicle-details',{vehicles:this.state.formdata})
    //                .then((post) => {
    //                    console.log("Data Sent", post);
    //                    Alert.info('Ad Posted', {
    //                        position: 'top',
    //                        effect: 'bouncyflip',
    //                        timeout: 3000,
    //                        html: false
    //                    });
    //                    // this.notify();
    //                    this.setState({
    //                        formdata: {
    //                            type: '',
    //                            brand: '',
    //                            model: '',
    //                            registration_state: '',
    //                            fuel: '',
    //                            image: '',
    //                            documents: '',
    //                            price: '',
    //                            year: '',
    //                            km_driven: '',
    //                            number_plate: '',
    //                            user_id: this.props.user_id
    //                          },
    //                          imagePrev: '',
    //                          documentPrev: '',
    //                          loading: false
    //                    }) 
               
    //                }).catch(e=>{
    //                    console.log(e)
    //                    Alert.warning('Some Error Occurred! Please Try Again', {
    //                     position: 'top',
    //                     effect: 'bouncyflip',
    //                     timeout: 3000,
    //                     html: false
    //                 });
    //                    this.setState({
    //                        loading: false
    //                    })
    //                })

    //            }) 
    //            this.setState({documentPrev: ''})    
    //            this.setState({imagePrev:''})    
    //     }
      
    // }


      handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        if(file===undefined)
        {
            this.setState({imagePrev:null,})
        }

        reader.onload = (e) => {
          this.setState({
            file: file,
            sample: e.target.result,
            imagePrev: reader.result,
            formdata: {
                ...this.state.formdata,
                image: file
            }
           
          });
        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            this.setState({
                imagePrev: ''
            })
        }
        
     }
     
     handleDocumentChange = (e) => {
         e.preventDefault();
        
        let reader = new FileReader();
        let file = e.target.files[0];
        if(file === undefined) {
            this.setState({ documentPrev: null})
        }
        reader.onload = (e) => {
            this.setState({
                docfile: file,
                documentPrev: reader.result,
                formdata: {
                    ...this.state.formdata,
                    documents: file
                }
            });
        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            this.setState({
                documentPrev: ''
            })
        }
     }
    
      inputChangedHandlerBrand = (e) => {
          e.preventDefault();
          this.setState({
            formdata: {
                ...this.state.formdata,
                brand: e.target.value
            }
          })
      }

      inputChangedHandlerModel = (e) => {
        e.preventDefault();
        this.setState({
            formdata: {
                ...this.state.formdata,
                model: e.target.value
            }
        })
      }



  render () {

      let redirect = null;

      if(!this.props.isAuthenticated){
         redirect = <Redirect to="/login"/>
      }

      let disable = true;
      if(this.state.formdata.type !== '' && 
        this.state.formdata.brand !== '' &&
        this.state.formdata.model !== '' &&
        this.state.formdata.year !== '' &&
        this.state.formdata.km_driven!== '' &&
        this.state.formdata.registration_state !== '' &&
        this.state.formdata.fuel !== '' &&
        this.state.formdata.number_plate !== '' &&
        this.state.formdata.image !== '' &&
        this.state.formdata.price !== ''){
            disable = false;
        }
    let {imagePrev} = this.state;
    let imagePreview = null;
    if (imagePrev) {
      imagePreview = (<img alt="" className={classes.Image} src={imagePrev} />);
    }

    let {documentPrev} = this.state;
    let documentPreview = null;
    if(documentPrev) {
        documentPreview = (<img alt="document" className={classes.Image} src={documentPrev} />);
    }
    

    let alternate = null;
    if(this.state.tempBrand === 'Others') {
        alternate = (<TextField label="Brand" placeholder="Enter your Vehicle Brand" className={classes.other} onChange={this.inputChangedHandlerBrand} />);
    }
    

    let alternateM = null;
    if(this.state.tempBrand === 'Others' || this.state.tempModel === 'Others') {
        alternateM = (<TextField label="Model " placeholder="Enter your Vehicle Model" className={classes.other} 
        onChange={this.inputChangedHandlerModel}/>);
    }
    
    const options1 = this.state.types.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the Type</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    const options2 = this.state.brands.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the Brand</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    const options3 = this.state.models.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the Model</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    const options4 = this.state.year.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the Year</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    const options5 = this.state.fuels.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the Fuel Type</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    const options6 = this.state.reg_state.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the state</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );

    const options7 = this.state.km_driven.map((item,i) =>
        item === '' ? <MenuItem value={item} key={'placeholder'} hidden >Select the KM Driven</MenuItem> : 
        <MenuItem value={item} key={i} >{item}</MenuItem>
    );


    return (
        <Aux>
            {redirect}
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Body>
                    Kindly Update your profile before posting an ad
                </Modal.Body>
                <Modal.Footer>
                    <NavLink to="/Profile">
                        Go To Profile Page
                    </NavLink>
                        
                </Modal.Footer>
            </Modal>
        <div  className={classes.Box} >

            <Tabs />

        <div>
        
            <h2 style={{textAlign:'center', paddingBottom:'15px'}}>Sell your Vehicle</h2>

            <hr style={{border: '1px solid black'}}/>

            <form className={classes.Sell}>

                        <span><p style={{fontSize: '0.8em', textAlign: 'left', marginBottom: '2px'}}>(*Start with the Vehicle Type field)</p></span>
                        <div className={classes.firstDiv}>
                       <div className={classes.divs}> 
                      <label htmlFor="type" className={classes.Label}>Vehicle Type:</label>  
                      <Select
                             id="type" 
                             name="type"
                             className={classes.select} 
                             onChange={this.selectChangedHandlerType}
                             value={this.state.formdata.type}
                        >
                        {options1}
                        </Select>
                        </div>
                        </div>

                        <div className={classes.secondDiv}>
                        <div className={classes.secdiv} >
                        <label htmlFor="brand"  style={{marginBottom: '-10px'}}className={classes.Label}>Vehicle Brand:</label>
                        
                        <Select 
                            id="brand"
                            name="brand"
                            value={this.state.formdata.brand}
                            className={classes.select}
                           onChange= {this.selectChangedHandlerBrand}
                        >
                        {options2}
                        </Select>
                        <p className={classes.or} style={{marginBottom: '0px'}}>Select others if brand not present</p> 
                         {alternate}
                        </div>

                        <div className={classes.secdiv}>
                        <label htmlFor="model"  style={{marginBottom: '-15px'}}className={classes.Label}>Vehicle Model:</label>
                        <Select 
                            id="model"
                            name="model"    
                            value={this.state.formdata.model}
                            className={classes.select}
                           onChange= {this.selectChangedHandlerModel}
                        >
                        {options3}
                        </Select>
                        <p className={classes.or} style={{marginBottom: '2px'}}>Select others if model not present</p>
                        {alternateM}
                        </div>
                        
                        
                        <div className={classes.secdiv}>    


                        <label htmlFor="year" className={classes.Label}>Vehicle Year:</label>
                        <Select 
                            id="year"
                            name="year"
                            value={this.state.formdata.year}
                            className={classes.select}
                           onChange= {this.selectChangedHandlerYear}
                        >
                        {options4}
                        </Select>
                        </div>

                        </div>

                        <div className={classes.thirdDiv}> 

                        <div className={classes.thidiv}>
                        <label htmlFor="fuel" className={classes.Label}>Fuel Type:</label>
                        <Select 
                            id="fuel"
                            name="fuel"
                            className={classes.select}
                            value={this.state.formdata.fuel}
                           onChange= {this.selectChangedHandlerFuel}
                        >
                        {options5}
                        </Select>
                        
                        </div>

                        <div className={classes.thidiv}>
                        <label htmlFor="reg" className={classes.Label}>Reg State:</label>
                        <Select 
                            id="reg"
                            name="reg"
                            className={classes.select}
                            value={this.state.formdata.registration_state}
                           onChange= {this.selectChangedHandlerReg}
                        >
                        {options6}
                        </Select>
                        </div>

                        <div className={classes.thidiv}>
                        <label htmlFor="km" className={classes.Label}>Km Driven:</label>
                        <Select 
                            id="km"
                            name="km"
                            className={classes.select}
                            value={this.state.formdata.km_driven}
                           onChange= {this.selectChangedHandlerKm}
                        >
                        {options7}
                        </Select>
                        </div>

                        </div>
                        
                        <div className={classes.fourthDiv}>
                        {/* <table style={{textAlign: 'center'}}>
                            <tbody>
                            <tr>
                                 <td><label htmlFor="number" className={classes.Label}> Vehicle Number:</label></td>
                                 <td><TextField 
                                 label="Vehicle Number" 
                                 className={classes.other} 
                                 placeholder="Enter your vehicle number" 
                                 id="number" 
                                 name="number" 
                                 value={this.state.formdata.number_plate}
                                 onChange={this.selectChangedHandlerName} 
                                //  error={this.state.formdata.number_plate === ""}
                                //  helperText={this.state.formdata.number_plate === "" ? 'Empty field!' : ' '}
                                 /></td>
                                 
                            </tr>
                        
                            </tbody>
                            <tbody>
                        <tr>
                            <td><label htmlFor="image" className={classes.Label}>Vehicle Image:</label></td>
                            <td><TextField className={classes.other}  id="image" type="file" onChange={this.handleImageChange} /></td> 
                            { imagePreview }
                        
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            
                        <td><label htmlFor="document" className={classes.Label}>Vehicle Document:</label></td>
                        <td><TextField className={classes.other}  type="file" accept="application/pdf,application/vnd.ms-excel" id="document" onChange={this.handleDocumentChange} /></td> 
                        { documentPreview }   
                        </tr>         
                        </tbody>
                        
                        <tbody>
                        <tr>
                             <td><label htmlFor="price" className={classes.Label}>Price:</label></td>
                             <td><TextField label="Enter Price" type="number" className={classes.other} value={this.state.formdata.price} placeholder="Enter the price" id="price" name="number" onChange={this.selectChangedHandlerPrice} /></td>
                         </tr>
                         </tbody>
                        

                        </table> */}


                                <div className={classes.foudiv}>
                            
                                 <label htmlFor="number" className={classes.Label}>     Vehicle Number:</label>
                                 <TextField 
                                 label="Vehicle Number" 
                                 className={classes.other} 
                                 placeholder="Enter your vehicle number" 
                                 id="number" 
                                 name="number" 
                                 value={this.state.formdata.number_plate}
                                 onChange={this.selectChangedHandlerName} 
                                //  error={this.state.formdata.number_plate === ""}
                                //  helperText={this.state.formdata.number_plate === "" ? 'Empty field!' : ' '}
                                 />

                            </div>

                            <div className={classes.foudiv}>
                                 
                            <label htmlFor="image" className={classes.Label}>Vehicle Image:</label>
                            <TextField className={classes.other}  id="image" type="file" onChange={this.handleImageChange} />
                            <br />
                            { imagePreview }
                        
                            </div>

                            <div className={classes.foudiv}>
                        <label htmlFor="document" className={classes.Label}>Vehicle Document:</label>
                        <TextField className={classes.other}  type="file" accept="application/pdf,application/vnd.ms-excel" id="document" onChange={this.handleDocumentChange} />
                        <br />

                        { documentPreview }   

                        </div>

                            <div className={classes.foudiv}>
                        
                             <label htmlFor="price" className={classes.Label}>Price:</label>
                             <TextField label="Enter Price" type="number" className={classes.other} value={this.state.formdata.price} placeholder="Enter the price" id="price" name="number" onChange={this.selectChangedHandlerPrice} />
                        
                             </div>
                        <ReactTooltip disable place="right" type="warning" effect="float"/>

                        </div>
                  
                        <div style={{ marginTop: '20px'}}>
                        <button data-tip="React-tooltip" disabled={disable}  className="btn btn-primary" onClick={this.formSubmit}>
                            Submit
                        </button>
                        
                        <ClipLoader
                        style={override}
                //   css={override}
                  sizeUnit={"px"}
                  size={20}
                  color={'#123abc'}
                  loading={this.state.loading}
               />

                        </div>
                    


                        <br />
                        <br /> 
            </form>
            </div>
        </div>
        </Aux>
    );
    // }
  };
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
        address: state.auth.address,
        state: state.auth.state,
        city: state.auth.city,
        pincode: state.auth.pincode,
        number : state.auth.phone_number

    }
}

export default connect(mapStateToProps, null)(SellVehicle);