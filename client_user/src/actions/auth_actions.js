import React from 'react';
import axios from '../helpers/axios.js';
import { authConstants, userConstants } from "./constants";

export const signInAction = (email, password) => {
    return async (dispatch) => {

        dispatch({ type: authConstants.LOGIN_REQUEST });

        const res = await axios.post('/user/signin', {email, password})
            if(res.status === 200) {
                const { token, user } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token,
                        user
                    }
                })
            }
            if( res.status !== 200){
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: 'error'
                })
            } 
        }
    }

    export const signUpAction = (firstName, lastName, email, password) => {
        return (dispatch) => {

            dispatch({ type: userConstants.USER_REGISTER_REQUEST });
            console.log(firstName, lastName, email, password); 

             axios.post('/user/signup', {firstName, lastName, email, password})
             .then(res => {
                console.log(res)
                if(res.status === 200){
                    dispatch({
                        type: userConstants.USER_REGISTER_SUCCESS,  
                        payload: {
                            message: res.data
                        }
                    });
                } 
                if(res.status !== 200) {
                    dispatch({
                        type: userConstants.USER_REGISTER_FAILURE,
                        payload: { message: res.data.error }
                    })
                }
            })
        }
    }

    export const signOut = () => {
        return(dispatch) => {
            localStorage.clear(); 
            dispatch({
                type:authConstants.LOGOUT_SUCCESS,
                payload:'logout success'
            })
            window.location.reload(); 
        }
    }
        