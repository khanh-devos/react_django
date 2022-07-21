import { actionTypes } from "../actions/actionTypes";

//only take 1 item
const initialState= {
}

export default function(state=initialState, action){
    switch(action.type){
        case actionTypes.GET_MEDIUM_ITEM:
            return action.payload

        default:
            return state

    }
}