import axios from "../helpers/axios"
import { catagoryConstants } from "./constants"


export const getAllCatagories = () => {
    return async dispatch => { 
        dispatch({
            type: catagoryConstants.GET_ALL_CATAGORIES_REQUEST,
        })

        const res = await axios.get('/catagory/getcatagory');
        console.log(res);

        const { catagoryList } = res.data
        
        if(res.status === 200){
            dispatch({
                type: catagoryConstants.GET_ALL_CATAGORIES_SUCCESS,
                payload: { catagories: catagoryList } 
            })
        } else {
            dispatch({
                type: catagoryConstants.GET_ALL_CATAGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}
