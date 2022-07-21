import { actionTypes } from "../actions/actionTypes"


const initialState = {
    sales: [],
    pdData: {}
}

export default function(state=initialState, action){
    switch(action.type){
        case actionTypes.SALES_ORDERS:
            return {
                ...state,
                sales: [...action.payload]
            }

        case actionTypes.ORDER_NO_GET:
            return {
                ...state,
                sales: [action.payload],
            }
        
        case actionTypes.PANDAS_GET:
            return {
                ...state,
                pdData: {...action.payload}
            }

        default:
            return state
    }
}