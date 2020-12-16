import React, { useEffect } from 'react';
import Home from './container/Home/index.js';
import { getAllCatagories }  from "./actions/catagory_actions.js";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, useHistory, withRouter } from 'react-router-dom';
import CategoryShowPage from './container/CategoryShow/index.js';
import ProductShowPage from './container/ProductShow/index.js';
import CartShowPage from './container/CartShow/index.js';
import SignIn from './container/SignIn/index.js';
import SignUp from './container/SignUp/index.js';
import { authConstants } from './actions/constants'; 
import getCart from './actions/cart_actions.js';  

const Routes = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.auth);
    console.log(user.user); 

    useEffect( () => {
        dispatch(getAllCatagories()); 
        }, []);

    useEffect( () => {
        dispatch(getCart())
    },[cart.cartItemRequest, user.user]);




    useEffect( () => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        console.log(user, token)
        if(user && token){
            dispatch({
                type: authConstants.LOGIN_SUCCESS, 
                payload: {
                    user:user,
                    token:token,
                    authenticate: true,
                    authenticating: false
                } 
            })
        }
    },[]);

        return(
            <Switch>

                <Route exact path = '/'>
                    <Home/>
                </Route>

                <Route path = '/signup'>
                    <SignUp/>
                </Route>

                <Route path = '/signin'>
                    <SignIn/>
                </Route>

                <Route exact path = "/category/:categoryid">
                    <CategoryShowPage/>
                </Route>

                <Route path ="/product/:productid">
                    <ProductShowPage/>
                </Route>

                <Route path = "/cart">
                    <CartShowPage/>
                </Route>
            </Switch>
        )
}

const App = () => {
    
    return(
        <div className = 'App'>
            <Router>
                <Routes/>
            </Router>
        </div>
    )
}

export default App;