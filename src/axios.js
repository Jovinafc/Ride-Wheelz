import axios from 'axios';
import { connect} from 'react-redux'; 

const instance = axios.create({
    baseURL : 'http://localhost:3001/api'
    // baseURL : 'http://localhost:3001'
    // baseURL : 'http://192.168.43.247:3001/api'


});

// instance.defaults.headers.common['x-auth'] = localStorage.getItem('token');

const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
}

export default connect(mapStateToProps, null)(instance); 