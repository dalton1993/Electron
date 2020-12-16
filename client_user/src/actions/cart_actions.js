import axios from '../helpers/axios.js';
import { cartConstants } from "./constants";
import React from 'react';

export default function getCart() { 

    return (dispatch) => {
        axios.get('/user/cart/get-cart')
        .then(res => {
            const data = res.data.cartItems;
            console.log(data);
            dispatch({
                type: cartConstants.CART_UPDATE_SUCCESS,
                payload: data
            })
        })
        .catch( (err) => {
            console.log(err);
            dispatch({
                type: cartConstants.CART_UPDATE_FAILURE,
                payload: err
            })
        })
    }
}
