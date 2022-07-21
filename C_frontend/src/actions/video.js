import axios from "axios"
import { actionTypes } from "./actionTypes"


export const getVideos = ()=>(dispatch, getState)=>{
    
    axios.get(`api/video/`)
    .then(res => {

        console.log(res.data);
        
        dispatch({
            type: actionTypes.VIDEO_GET,
            payload: res.data
        })
    })
    .catch(err=>{
        console.log(err.response)
    })
}


export const getDoubleDBVideo = ()=>(dispatch, getState)=>{
    
    axios.get(`api/combine/`)
    .then(res => {

        console.log(res.data);
        
        dispatch({
            type: actionTypes.DOUBLE_DB_VIDEO_GET,
            payload: res.data
        })
    })
    .catch(err=>{
        console.log(err.response)
    })
}

