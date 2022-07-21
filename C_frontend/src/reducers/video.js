import { actionTypes } from "../actions/actionTypes"



const initialState = {
    videos: [],
}

export default function(state=initialState, action){
    switch(action.type){
        case actionTypes.VIDEO_GET:
            return {
                ...state,
                videos: [...action.payload]
            }

        default:
            return state
    }
}