import { actionTypes } from "./actionTypes"

//For errors
export const getError = (msg, status) => {
    return {
        type: actionTypes.GET_ERRORS,
        payload: {
            msg,
            status
        }
    }
}

