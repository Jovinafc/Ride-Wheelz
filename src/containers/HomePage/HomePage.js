import React, { Component} from 'react';
import classes from './HomePage.module.css';
import Carousel from 'react-bootstrap/Carousel'
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { NavLink } from 'react-router-dom';
import axios from 'axios';


class HomePage extends Component {

    state = {
        vehicles: []
    }

    componentDidMount = () => {

        window.scrollTo(0, 0);

        axios.post('/fetch-vehicles-except-current-user', {user_id: localStorage.getItem('userId')}).then(result => {
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
        })
    }


    render () {
        let size = 3;
        let display = this.state.vehicles.slice(0,size).map(dis => {
            return (
                <NavLink style={{textDecoration: 'none'}} className={classes.topVehiclesDiv} key={dis.id} to={'/vehicledetail/:'+dis.vehicle_id}>
                
                    <div style={{display: 'flex',paddingLeft:'2%', paddingRight:'5%',  justifyContent: 'space-between'}}>
                    <p style={{color: 'white'}}>{dis.brand} {dis.model}</p>  
                        <p>{dis.price === null
                            ? <span className={classes.rent}>Rent</span>
                            : <span className={classes.sell}>Sale</span>}
                        </p>
                    </div>
                    <div className={classes.imageCont}>
                        <img  className={classes.image} src={dis.image} alt="Vehicle"/>
                    </div>
                
                </NavLink>
            )

        })

        return (
                     
                <div className={classes.home}>


                    <div className={classes.aboveCarousel}>
                        
                    </div>

                    <div className={classes.carouselCont}>
                    <Carousel className={classes.carousel}>
                        <Carousel.Item>
                        {/* <img className={classes.Image} src="http://res.cloudinary.com/beast0013/image/upload/v1548216751/geqnk9bclpaqboxkn2fc.jpg" /> */}
                        <img className={classes.Im} src="http://res.cloudinary.com/beast0013/image/upload/v1554221846/sfczdr0intvx1vx297aj.jpg   " alt="Vehicle " />

                        </Carousel.Item>


                        <Carousel.Item>
                        <img className={classes.Im} alt="Vehicle" src="http://res.cloudinary.com/beast0013/image/upload/v1554221918/vrqdrgtvks0af3ufl0j8.jpg"/>
  
                        </Carousel.Item>

                        <Carousel.Item>
                        <img className={classes.Im} alt="Vehicle" src="http://res.cloudinary.com/beast0013/image/upload/v1554221992/lhvdajmwflz3febxrtli.jpg"/>
  
                        </Carousel.Item>


                    </Carousel> 


                    </div>

                    <div className={classes.fourDivs}>
                                 
                                 
                                 
                                  {/* <div className={classes.firstDiv}>
                                       <NavLink to="/display">Buy any Vehicle</NavLink>  
                                  </div> */}

                                <NavLink style={{textDecoration: 'none'}} className={classes.firstDiv} to="/display">  
 
                                 <span style={{fontSize: "2em", fontFamily: 'Segoe UI', textDecoration: 'none'}}>
                                 Buy a Vehicle
                                  </span>
                                  </NavLink>

                                  <NavLink style={{textDecoration: 'none'}} className={classes.secondDiv} to="/display">
                                  <span style={{fontSize: "2em", fontFamily: 'Segoe UI' ,textDecoration: 'none'}}>
                                 Rent a Vehicle
                                  </span>
                                  </NavLink >
{/*                                   
                                  <div className={classes.secondDiv} >
                                       <NavLink style={{textDecoration: 'none'}} to="/display">Rent any Vehicle</NavLink>  
                                  </div>
                                    */}

                                <NavLink style={{textDecoration: 'none'}} className={classes.thirdDiv} to="/display">
                                  <span style={{fontSize: "2em", fontFamily: 'Segoe UI', textDecoration: 'none'}}>
                                 Sell your Vehicle
                                  </span>
                                  </NavLink >

                                   {/* <div className={classes.thirdDiv}>
                                         <NavLink  to="/sell/sell">Sell your Vehicle</NavLink>  
                                  </div> */}

                                    <NavLink style={{textDecoration: 'none'}} className={classes.fourthDiv} to="/display">
                                  <span style={{fontSize: "1.9em", fontFamily: 'Segoe UI', textAlign:"center", textDecoration: 'none'}}>
                                 Lend your Vehicle
                                  </span>
                                  </NavLink >
                                  {/* <div className={classes.fourthDiv}>
                                         <NavLink  to="/sell/lend">Lend your Vehicle</NavLink>  
                                  </div>
                                   */}

                    </div>

                    <div >
                        <h2 style={{color: 'white', textAlign: 'center'}}> Top Vehicles </h2>
                        <div className={classes.topVehicles}>
                            {display}
                        </div>
                    </div>
                 </div>
                )
    }
}

export default HomePage;