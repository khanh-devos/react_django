import axios from "axios"
import { actionTypes } from "./actionTypes"


export const menuMade = ()=>(dispatch, getState)=>{
    axios.get(`api/item/`)
    .then(res => {

        console.log(res.data);
        
        dispatch({
            type: actionTypes.MENU_MADE,
            payload: res.data
        })
    })
    .catch(err=>{
        console.log(err.response)
    })
}

