import { actionTypes } from "./actionTypes"
import axios from 'axios';
import { getToken } from "./auth";
import { getError } from "./error";
import { createMessage } from "./message";


export const itemSet = item => {
    return {
        type: actionTypes.ITEM_SET,
        payload: item
    }
};

export const itemCancelled = id => {
    return {
        type: actionTypes.ITEM_CANCELLED,
        payload: id
    }
};

export const itemsPaid = (
    order_no, category, type, name, 
    extras, sizes_prices, 
    unit_price, quantity, total_price) => (dispatch, getState) => {

    const body = JSON.stringify({
        order_no, category, type, name, 
        extras, sizes_prices, 
        unit_price, quantity, total_price
    });

    const config = getToken(getState);

    axios.post(`api/orders/`, body, config)
    .then( (res)=> {
        console.log(res.data);

        dispatch({
            type: actionTypes.ITEMS_PAID
        })

        dispatch({
            type: actionTypes.ORDER_SAVED
        })
    })
    .catch((err)=>{
        console.log(err.response.data);
        dispatch(getError(
            err.response.data,
            err.response.status
        ));
        
    })

}
