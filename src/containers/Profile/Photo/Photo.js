import React, {Component} from 'react';
import classes from './Photo.module.css';
import ProfNav from '../ProfNav/ProfNav';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import LoadingOverlay from 'react-loading-overlay';
 
class Photo extends Component {
    state = {
        file: '',
        imagePreviewUrl: '',
        dis: true,
        removedis: true
    }

    fetchUserImage = () => {
        axios.post('/fetch-user', {user_id: this.props.user_id})
        .then(res => {
            if(res.data.image){
                this.setState({
                    imagePreviewUrl: res.data.image,
                    dis: false,
                    removedis: false
                })

            }
            else {
                this.setState({
                    imagePreviewUrl: ''
                })
            }
        })
    }
    componentDidMount = () => {
        window.scrollTo(0, 0);

        this.fetchUserImage();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.photoProcess(this.props.user_id);
        const fd = new FormData();
        fd.append('profileImage',this.state.file);
        axios.post('/profileImage',fd).then(()=>{
            
            axios.post('/update-profile-image', {user_id:this.props.user_id})
            .then(res => {
                this.props.user_data(this.props.user_id);
                this.setState({
                    removedis: false
                })
            });
        }).catch(e=>{
            
        })
    }

    handleChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        if(file===undefined)
        {
            this.setState({imagePreviewUrl:null,
            dis: true})
        }
        reader.onload = (e) => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                dis: false
            });
        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            this.setState({
                imagePreviewUrl: ''
            });    
        };
        
    }

    removeImage = (e) => {
        e.preventDefault();
        this.props.photoProcess(this.props.user_id);

        axios.post('/remove-profile-image', {user_id: localStorage.getItem('userId')})
        .then(res => {
            this.fetchUserImage();
            this.props.user_data(this.props.user_id);
            this.setState({
                file: '',
                removedis: true,
                dis: true
            })
        })
        
    }

    

    render () {

        let disableButton = false;

        if(this.state.file === ''){
            disableButton = true
        }
        

        let styles = {
            scroll: 'no'
        }
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if(imagePreviewUrl) {
            imagePreview = (<img style={styles} className={classes.Image} src={imagePreviewUrl} alt="P" />);
        }

        let preImage = (<div className={classes.preImage}></div>    )

        return (
            <LoadingOverlay  active={this.props.upload} spinner text='Photo Uploading'>

            <div className={classes.Container}>

                <div className={classes.Menu}>
                    <ProfNav />
                </div>

                <div className={classes.Main}>
                    <h3>Profile Photo</h3>
                    <hr style={{border: '1px solid black'}}/>


                    <div style={{textAlign: 'center'}}> 
                        <div className={classes.ImageCont}>
                            {this.state.imagePreviewUrl === ''
                            ? preImage
                            : imagePreview } 
                        </div>

                        <form className={classes.Form}  >
                            <div className={classes.imageinput}>
                            <input type="file" accept="image/*" className={classes.imageinp} onChange={this.handleChange} />
                            </div>
                            <br />
                            <div className={classes.buttons}>
                            <button disabled={disableButton} className="btn btn-primary" onClick={this.handleSubmit}>Upload Image</button>
                            
                            <div style={{width: '30px', color: 'white'}}>J</div> 

                            <button disabled={this.state.removedis} onClick={this.removeImage} className="btn btn-danger">Remove Image</button>                           
                            </div>

                        </form>
                        


                    </div>

                </div>


            </div>
            </LoadingOverlay>

        );
    }
}

const mapStateToProps = state => {
    return {
        user_id : state.auth.userId,
        upload: state.auth.photoadd
    }
}

const mapDispatchToProps = dispatch => {
    return {
        user_data : (user) => dispatch(actions.userData(user)),
        photoProcess: (user) => dispatch(actions.photoProcess(user))   
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Photo);