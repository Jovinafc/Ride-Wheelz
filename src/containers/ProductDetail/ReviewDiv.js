import React, {Component} from 'react';
import classes from './ReviewDiv.module.css';
import ReactStars from 'react-stars';
import axios from '../../axios';
import { connect } from 'react-redux';


class ReviewDiv extends Component {

    state = {
        thumbsup: 0,
        thumbsdown: 0,
        initalhelpCount: 0,
        initialnothelpCount: 0
    }

    counterMethod = () => {
        axios.get(`/helpful-accessory-count?accessory_id=${localStorage.getItem('product_id')}&feedback_id=${this.props.details.id}`)
        .then(res => {
            this.setState({
                initalhelpCount: res.data.countHelpful,
                initialnothelpCount: res.data.countNotHelpful
            })
        })

    }

    getLikedDetails = () => {
        axios.get(`/accessory-helpful?accessory_id=${this.props.details.accessory_id}&feedback_id=${this.props.details.id}&user_id=${localStorage.getItem('userId')}`)
        .then(res => {
            if(res.data[0].helpful === '1'){
                this.setState({
                    thumbsup: parseInt(res.data[0].helpful)
                })
            }
            else{
                this.setState({
                    thumbsup: 0
                })
            }
            if(res.data[0].not_helpful === '1'){
                this.setState({
                    thumbsdown: parseInt(res.data[0].not_helpful)
                })
            }
            else{
                this.setState({
                    thumbsdown: 0
                })
            }
        })
 
    }

    componentDidMount = () => {
        this.counterMethod();
        this.getLikedDetails();
           }


    up = (e) => {
        this.setState({
            up: this.state.up + 1
        })
        axios.post('/helpful-not-helpful', {type: 'accessory',
        helpful: 'set',
        user_id: localStorage.getItem('userId'),
        feedback_id: this.props.details.id,
        accessory_id: this.props.details.accessory_id 
        })
        .then(res => {
            this.counterMethod();
            this.getLikedDetails();
        })
        .catch(err => {
            this.counterMethod();
            this.getLikedDetails();
        })
    }

    
    down = (e) => {
        this.setState({
            down: this.state.down + 1
        })
        axios.post('/helpful-not-helpful', {type: 'accessory',
        notHelpful: 'set',
        user_id: localStorage.getItem('userId'),
        feedback_id: this.props.details.id,
        accessory_id: this.props.details.accessory_id 
    })
    .then(res => {
        this.counterMethod();
        this.getLikedDetails();
    })
    .catch(err => {
        this.counterMethod();
        this.getLikedDetails();
    })

    }
    render () {

        let rateDiv = <div>{this.props.details.rating 
                        ?   <ReactStars
                        count={5}
                        size={24}
                        value={this.props.details.rating}
                        half={false}
                        edit={false}
                        color2={'#ffd700'} />
                        : null
                        }
                         
                         </div>

        let a = this.props.details.user['first_name'].charAt(0);

        return (
            <div className={classes.mainDiv}>   
                <div className={classes.topDiv}>
                    <div className={classes.imageContainer}>
                        {this.props.details.user['image']
                        ? <img className={classes.image} src={this.props.details.user['image']} alt="pfimage" />
                        : <h2 style={{textAlign: "center", fontSize: '20px', color: "black"}}>{a}</h2>}
                    </div>
                    <div className={classes.namedate}>
                        <p>{this.props.details.user['first_name'] +" "+ this.props.details.user['last_name']}</p>
                        {/* <span>{this.props.details.createdAt.substring(0,8)}</span> */}
                    </div>      

                    <div className={classes.ratingDiv}>
                        {rateDiv}
                    </div>
                        
                </div>
                <div className={classes.downDiv}>
                    <textarea value={this.props.details.review || ''} style={{width: '100%', height: 'auto'}}type="text" disabled={true}/>
                    
                    <div className={classes.thumbs}>
                    <div className={classes.thumbupdown}>
                    <button disabled={!this.props.isAuthenticated} onClick={this.up}>
                    {this.state.thumbsup === 1    
                    ? <i style={{color: 'blue'}} className="fas fa-thumbs-up"></i>
                    : <i  className="fas fa-thumbs-up"></i>}
                    
                    </button>
                    
                    Helpful
                    <span style={{marginLeft:'4px'}}>{this.state.initalhelpCount}</span>
                    </div>

                    <div>
                    <button disabled={!this.props.isAuthenticated} onClick={this.down}> 
                    {this.state.thumbsdown === 1
                    ?  <i style={{color:'blue'}} className="fas fa-thumbs-down"></i>

                    :  <i className="fas fa-thumbs-down"></i>

                    }   
                    </button>
                    Not Helpful
                    <span style={{marginLeft:'4px'}}>{this.state.initialnothelpCount}</span>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null

    }
}

export default connect(mapStateToProps, null)(ReviewDiv);