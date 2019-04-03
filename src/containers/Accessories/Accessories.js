import React, { Component} from 'react';
import classes from './Accessories.module.css';
import Accessory from './Accessory/Accessory';
import axios from 'axios';
import 'rc-collapse/assets/index.css';
import 'rc-slider/assets/index.css';


function searchingFor(term) {
    return function(x) {
        return x.accessory_name.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}


class Accessories extends Component {
    constructor(props){
    super(props);
        
    this.state = {
        products: [],
        term: ''
    }

    this.myRef = React.createRef()   // Create a ref object 

    }



    componentDidMount = () => {
        window.scrollTo(0, 0);


        axios.post('/fetch-accessories')
        .then(response => {
            this.setState({products: response.data})
        })
    }   

    searchHandler = (e) => {
        this.setState({term: e.target.value})
    }

    render () {

        let displayProducts = this.state.products
        .filter(searchingFor(this.state.term))
        .map(dis => {
            
            return (
            <Accessory className={classes.card} id={dis.accessory_id} name={dis.accessory_name} key={dis.accessory_id}  
               price={dis.accessory_price}
               type={dis.accessory_type}
               use={dis.accessory_use}
               qty={dis.accessory_qty}
               image={dis.accessory_image}
               average_rating={dis.avg_rating_accessories}
               />

            )
               
            });

        return (
            <div ref={this.myRef} className={classes.big}>

               

            <div>
                <div className={classes.Container}>
                      <div className={classes.Main}>  
                        {displayProducts}
                    </div>
                </div>

            </div>
            </div>
        )
    }
}   

export default Accessories;