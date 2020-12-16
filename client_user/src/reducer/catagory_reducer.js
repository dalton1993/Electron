import { catagoryConstants } from "../actions/constants";

const initState = {
    catagories: [],
    loading: false,
    error: null,
};

const buildNewCatagories = (parentId, catagories, catagory) => {

    let myCatagories = [];

    if(parentId == undefined){
        return [
            ...catagories,
            {
                _id: catagory._id,
                name: catagory.name,
                slug: catagory.slug,
                children: []
            }
        ]
    }

    for(let cat of catagories){

        if(cat._id == parentId){
            myCatagories.push({
                ...cat,
                children: cat.children ? buildNewCatagories(parentId, [...cat.children, {
                    _id:catagory._id, 
                    name:catagory.name, 
                    slug:catagory.slug, 
                    parentId: catagory.parentId, 
                    children: catagory.children}], catagory) : []
            })
        } else {
            myCatagories.push({
                ...cat,
                children: cat.children ? buildNewCatagories(parentId, cat.children, catagory) : []
            })
        }
    }
    return myCatagories;
}

export default (state = initState, action) => {
    switch(action.type){
        case catagoryConstants.GET_ALL_CATAGORIES_SUCCESS:
            state = {
                ...state,
                catagories: action.payload.catagories
            }
            break;
        case catagoryConstants.ADD_NEW_CATAGORIES_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break; 
        case catagoryConstants.ADD_NEW_CATAGORIES_SUCCESS:

            const updatedCatagories = buildNewCatagories(action.payload.catagory.parentId, state.catagories, action.payload.catagory);
            console.log(updatedCatagories);

            state = {
                ...state,
                catagories: updatedCatagories, 
                loading:false

            }
            break;
        case catagoryConstants.ADD_NEW_CATAGORIES_FAILURE:
            state = {
                ...initState,

            }
            break;
    }
    return state; 
}