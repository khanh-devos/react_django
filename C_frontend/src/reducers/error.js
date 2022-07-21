import { actionTypes } from "../actions/actionTypes";




const inititalState = {
    status: null,
    msg: null,
};


export default function(state=inititalState, action){
    switch(action.type) {
        case actionTypes.GET_ERRORS:
            return {
                status: action.payload.status,
                msg: action.payload.msg,
            }


        default:
            return state
    }
}