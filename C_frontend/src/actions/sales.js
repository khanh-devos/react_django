import { actionTypes } from "./actionTypes";
import axios from "axios";
import { getToken } from "./auth";
import { getError } from "./error";
import { createMessage } from "./message";


export const showSales = (number)=>(dispatch, getState)=> {
    
    const config = getToken(getState);

    axios.get(`api/sortOrders/${number}`, config)
    .then((res)=>{

        console.log(res.data);

        dispatch({
            type: actionTypes.SALES_ORDERS,
            payload: res.data
        })
    })
    .catch((err)=>{
        dispatch(getError(
            err.response.data,
            err.response.status
        ))
    })
}

export const getOrderNo = ()=>(dispatch, getState)=>{
    const config = getToken(getState);
    axios.get(`api/orders/last`, config)
    .then((res) => {

        dispatch({
            type: actionTypes.ORDER_NO_GET,
            payload: res.data.name ==="" ? {id: 0} : res.data, 
        })
    })
    .catch((err) => {
        dispatch(getError(
            err.response.data,
            err.response.status,
        ))
    })

}

export const getPdData = (year, month)=>(dispatch, getState)=> {
    
    const config = getToken(getState);

    axios.get(`api/orders/plotting/${year}/${month}`, config)
    .then((res)=>{
        console.log(JSON.parse(res.data));

        dispatch({
            type: actionTypes.PANDAS_GET,
            payload: JSON.parse(res.data)
        })
    })
    .catch((err)=>{
        //console.log(err.response);

        dispatch(getError(
            err.response.data,
            err.response.status,
        ))
    })
}