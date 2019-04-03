import React from 'react';
import { Slide } from 'react-slideshow-image';
import v1 from '../../Images/vehicle1.jpg';
import v2 from '../../Images/vehicle2.jpg';
// import v3 from '../../Images/vehicle3.jpg';
import v4 from '../../Images/Vehicle.v1.jpg';

// import Image from '../../containers/HomePage/Vehicle.v1.jpg'
import classes from './ImageSlider.module.css';

const slideImages = [
  v1,
  v2,
  v4
];
 
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  
}
 
const ImageSlider = () => {
    return (
      <div style={{height:'500px'}}>   
      <Slide className={classes.cont} {...properties}>
        <div  className="each-slide">
          <div  style={{'backgroundImage': `url(${slideImages[0]})`, height: '400px', objectFit: 'cover'}}>
            <span>Slide 1</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]})`,height: '400px',objectFit: 'cover'}}>
            <span>Slide 2</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})`,height: '400px', width:'100%' }}>
            <span>Slide 3</span>
          </div>
        </div>
      </Slide>
      </div>
    )
}


export default ImageSlider;