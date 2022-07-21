import { actionTypes } from "../actions/actionTypes";


const initialState = {
    token: localStorage.getItem('token'),   //calling current Token
    user: null,

    isAuthenticated: false,
    isLoading: false,                       //auto-loading user by Token
    is_updated: false,
};


export default function(state=initialState, action){
    switch(action.type) {
        case actionTypes.LOGIN_SUCCEED:
        case actionTypes.REGISTER_SUCCESS:
            //create and save Token
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false 
            }

        case actionTypes.USER_LOADING:
        case actionTypes.PASSWORD_CHANGED_FAILED:
            return {
                ...state,
                isLoading: true,
            }

        case actionTypes.USER_LOADED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            }

        case actionTypes.TOKEN_DEAD:
        case actionTypes.LOGIN_FAILED:  
        case actionTypes.LOG_OUT_SUCCEED:
        case actionTypes.REGISTER_FAILED:
        case actionTypes.PASSWORD_CHANGED_SUCCEED:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
            }

        default:
            return state
    }
}