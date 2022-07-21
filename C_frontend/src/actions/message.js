import { actionTypes } from "./actionTypes"


export const createMessage = msg => {
    return {
        type: actionTypes.CREATE_MESSAGE,
        payload: msg
    }
}