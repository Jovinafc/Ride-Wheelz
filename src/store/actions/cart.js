import * as actionTypes from './actionTypes';
import axios from 'axios';
import Alert from 'react-s-alert';


export const add_Item = () => {
    return {
        type: actionTypes.ADD_ITEM
    }
}

export const remove_item = () => {
    return {
        type: actionTypes.REMOVE_ITEM
    }
}


export const update_items = (number) => {
    return {
        type: actionTypes.UPDATE_ITEMS,
        no_of_items: number
    }
}

export const number_of_items_on_logout = () => {
    return {
        type: actionTypes.SET_TO_ZERO
    }
} 

export const getNoOfItems = (user_id) => {
    return dispatch => {
        axios.post('', {user_id: user_id})
        .then(response => {
            // console.log(response);
            // console.log(response.data.details);
            dispatch(update_items(response.data.number));
            dispatch(cartDetails(response.data.details))
        })
    }
}
 
export const already_added_cart = () => {
    return {
        type: actionTypes.ALREADY_ADDED_TO_CART
    }
}

export const alertControl = () => {
    return {
        type: actionTypes.ALERT_CONTROL
    }
}

export const addToCart = (user_id,accessory_id,quantity) => {
    return dispatch => {
        axios.post('/addCart', {user_id: user_id, accessory_id: accessory_id, quantity: quantity})
        .then(response => {
            // console.log(response);
            if(response.data === 'Item Exist')
            {
                dispatch(alertControl())
                Alert.warning('Item Already Exists in Cart', {
                    position: 'top',
                    effect: 'bouncyflip',
                    timeout: 3000,
                    html: false
                });
                // alert    ("Item Exists");
                // alert.show('Oh look, an alert!')
                dispatch(already_added_cart())
            }
            dispatch(cartItems(user_id))
        })
        .catch(err=> {
            // console.log(err.response.data);
        })
    }
}


export const cartItems = (user_id) => {
    return dispatch => {
        axios.post('/cartItems', {user_id: user_id})
        .then( response => {
            dispatch(update_items(response.data.count));
            dispatch(cartDetails(response.data.accessory_details))    
        })
    }
}

export const onCardClick = (product_id) => {
    localStorage.removeItem('product_id');
    localStorage.setItem('product_id', product_id);
    return {
        type: actionTypes.PRODUCT_CLICK,
        product_id: product_id
    }
}

export const onProductClick = (product_id) => {
    return dispatch => {
        dispatch(onCardClick(product_id))
    }
}

export const cartDetails = (cartDetails) => {
    return {
        type: actionTypes.CART_DETAILS,
        cartDetails: cartDetails
    }
}


export const singleItemDetails = (accessory_details) => {
    return {
        type: actionTypes.SINGLE_ITEM,
        single_item: accessory_details
    }
}

export const quantityNum = (quantity) => {
    return {
        type: actionTypes.QUANTITY,
        quantity: quantity
    }
}

export const removeCartItems = () => {
    return {
        type: actionTypes.REMOVE_ITEM_CART
    }
}

export const cartAmountQunatity = () => {
    return dispatch => {
        axios.post('/checkout-check', {user_id: localStorage.getItem('userId')})
        .then(response => {
            // console.log(response.data);
            dispatch(cartAmount(response.data.count, response.data.grand_total))
            
        })
    }
}

export const cartAmount = (count, total) => {
    return {
        type: actionTypes.CART_AMOUNT,
        count: count,
        total: total
    }
}

export const startLoading = () => {
    return {
        type: actionTypes.START_LOADING
    }
}

export const stopLoading = () => {
    return {
        type: actionTypes.STOP_LOADING
    }
}