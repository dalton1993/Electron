import catagoryReducer from './catagory_reducer';
import productReducer from './product_reducer';
import  { combineReducers } from 'redux';
import userReducer from './user_reducer';
import authReducer from './auth_reducer';
import cartReducer from './cart_reducer';

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    catagory: catagoryReducer,
    products: productReducer,
    cart: cartReducer
}); 

export default rootReducer;   