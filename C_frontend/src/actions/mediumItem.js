import { actionTypes } from "./actionTypes"



export const getMediumItem = item => {
    return {
        type: actionTypes.GET_MEDIUM_ITEM,
        payload: item
    }
}
