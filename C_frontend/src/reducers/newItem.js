import { actionTypes } from "../actions/actionTypes";


const initialState = {
    category: "",
    type: "",
    name: "",
    
    extras: {details:[
        {
            id:0,
            name: "",
            price: "",
            default: ""
        },
    ]},
    sizes_prices: {details:[
        {
            id:0,
            name: "normal",
            price: "",
            default: "True"
        },
        {
            id:1,
            name: "large",
            price: "",
            default: "False"
        }
    ]},
    img: null
    
};


export default function(state=initialState, action){
    switch(action.type){
        case actionTypes.NEW_ITEM_ADDED:
        case actionTypes.NEW_ITEM_KEPT:
            return action.payload

        case actionTypes.NEW_ITEM_ADDED_OK:
            return initialState
            
        default:
            return state
    }
}