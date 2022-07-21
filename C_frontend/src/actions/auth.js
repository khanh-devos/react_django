import axios from 'axios';
import { actionTypes } from './actionTypes';
import { getError } from './error';
import { createMessage } from './message';



export const getToken = (getState)=>{
    const config = {
        headers:{
            "Content-Type": 'application/json',
        }
    };
  
    const token = getState().authRD.token;
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    else console.log("failed to call getToken ");
    
    return config
}



export const login = (username, password) => (dispatch) => {
    const config = {
        headers:{
            "Content-Type": 'application/json'
        }
    }
  
    //convert to JSON
    const body = JSON.stringify({ username, password });
    
    axios
    .post(`api/login/`, body, config)
    .then( (res) => {

        console.log(res.data);
        
        dispatch({
            type: actionTypes.LOGIN_SUCCEED,
            payload: res.data,
        })

        //AT THE SAME TIME, WE SHOULD CALLING action "tokenLogin" 
        //THIS IMPORTANCE BECAUSE 

    })
    .catch( (err) => {
        console.log(err.response);

        dispatch(getError(
            err.response.data,
            err.response.status
        ));

        dispatch({
            type: actionTypes.LOGIN_FAILED
        })
    })
}



export const tokenLogin = ()=> (dispatch, getState)=>{
    dispatch({type: actionTypes.USER_LOADING});
    
    const config = getToken(getState);

    axios.get(`api/token/`, config)
    .then((res)=> {
        console.log(res.data);
        
        dispatch({
            type: actionTypes.USER_LOADED_SUCCESS,
            payload: res.data,
        })
    })
    .catch((err)=> {
        dispatch(getError(
            err.response.status,
            err.response.data
        ));

        dispatch({
            type: actionTypes.TOKEN_DEAD
        });
    })
}

export const logout = () => (dispatch, getState) => {
    const config = getToken(getState);
    
    axios
    .get(`api/logout/`, config)
    .then( (res) => {

        console.log(res.data);
        
        dispatch({
            type: actionTypes.LOG_OUT_SUCCEED,
            payload: res.data,
        })
    })
    .catch( (err) => {
        console.log(err.response);

        dispatch(getError(
            err.response.data,
            err.response.status
        ));

    })
}


export const register = ({username, email, password}) => dispatch => {
    const config = {
        headers:{
            "Content-Type": 'application/json'
        }
    }
  
    //convert to JSON
    const body = JSON.stringify({ username, email, password });
    
    axios
    .post(`api/register/`, body, config)
    .then( (res) => {
        
        console.log(res.data);

        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: res.data,
        })
    })
    .catch( (err) => {
        console.log(err.response);

        dispatch(getError(
            err.response.data,
            err.response.status
        ));

        dispatch({
            type: actionTypes.REGISTER_FAILED
        })
    })
}


export const changePassword = (old_password, new_password) => (dispatch, getState) => {

    const config = getToken(getState);
    const body = JSON.stringify({old_password, new_password});

    axios.put(`api/password/change`, body, config)
    .then((res)=>{
        
        dispatch({
            type: actionTypes.PASSWORD_CHANGED_SUCCEED
        });

        dispatch(createMessage(
           {action: "password changed success !"}
        ));
    })
    .catch((err)=>{
        console.log(err.response);

        dispatch(getError(
            err.response.data,
            err.response.status
        ))

        dispatch({
            type: actionTypes.PASSWORD_CHANGED_FAILED
        })
    })
  
}