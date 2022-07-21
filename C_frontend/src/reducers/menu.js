import { actionTypes } from "../actions/actionTypes"



export function findID(state) {
    //pre = -1 is initialization.
    const maxId = state.reduce( (pre, pro2) => Math.max(pre, pro2.id), -1); 
    return maxId + 1
}

const initialState = {
    menu: [],
}

export default function(state=initialState, action){
    switch(action.type){
        case actionTypes.MENU_MADE:
            return {
                ...state,
                menu: [...action.payload]
            }

        case actionTypes.ITEM_DELETED:
            return {
                ...state,
                menu: state.menu.filter( e => e.id !== action.payload)
            }

        default:
            return state
    }
}