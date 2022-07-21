import { actionTypes } from "../actions/actionTypes";


const initialState = {
    status: null,
    msg: {},
}



export default function(state=initialState, action) {
    switch(action.type) {
        case actionTypes.CREATE_MESSAGE:
            return action.payload

        default:
            return state
    }
}
