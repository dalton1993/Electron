import { cartConstants } from '../actions/constants.js';

const initState = {
    cartItems: [],
    cartItemRequest: []
};

export default (state = initState, action) => {
    switch(action.type){
        case cartConstants.CART_UPDATE_FAILURE:
            state = {
                ...initState
            }
            break;
        case cartConstants.CART_UPDATE_SUCCESS: 
            state = {
                ...state,
                cartItems: action.payload
            }
            break;
        case cartConstants.CART_REQUEST_SUCCESS:
            state = {
                ...state,
                cartItemRequest: action.payload.productDetails
            }
            break;
        case cartConstants.CART_REQUEST_FAILURE:
            state = {
                ...state
            }
            break; 
    }
    return state; 
}