import { actionTypes } from "./actionTypes"
import axios from 'axios';
import { createMessage} from './message'
import { getError} from './error'
import { getToken } from "./auth";
import { itemUpdatedSucess } from "./mediumItem";


export const newItemAdded = (item) => (dispatch, getState) =>{
    var image = document.getElementById("new-item-image-ID");
    //console.log(image.files[0]);

    let formData = new FormData();
    
    const config = {
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    };

    const token = getState().authRD.token;
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    const body = JSON.stringify(item);


    formData.append('category', item.category);
    formData.append('type', item.type);
    formData.append('name', item.name);
    formData.append('extras', JSON.stringify(item.extras));
    formData.append('sizes_prices', JSON.stringify(item.sizes_prices));
    formData.append('img', image.files[0]);
    
    console.log(body.name);


    axios.post(`api/item/`, formData, config)
    .then((res)=>{
      console.log(res.data)

      dispatch({
        type: actionTypes.NEW_ITEM_ADDED_OK,
        payload: item
      });
      
      dispatch(
        createMessage({action: "item added successfully"})
      );

      

    })
    .catch((err)=>{

      console.log(err.response)

      dispatch(getError(
          err.response.data,
          err.response.status
      ));

      dispatch({
        type: actionTypes.NEW_ITEM_ADDED_FAILED,
        payload: {}
      });
    })
}


export const newItemKept = (item) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.NEW_ITEM_KEPT,
    payload: item
  });
}


export const updateItem = (item)=>(dispatch, getState)=>{
  var image = document.getElementById("update-item-image-ID");
  console.log(image.files[0]);

  let formData = new FormData();
  
  const config = {
    headers:{
      'Content-Type': 'multipart/form-data'
    }
  };

  const token = getState().authRD.token;
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  formData.append('category', item.category);
  formData.append('type', item.type);
  formData.append('name', item.name);
  formData.append('extras', JSON.stringify(item.extras));
  formData.append('sizes_prices', JSON.stringify(item.sizes_prices));
  image.files[0] !== undefined && formData.append('img', image.files[0]);
  
  

  axios.patch(`api/item/${item.id}/`, formData, config)
  .then((res)=>{
    
    console.log(res.data)

    dispatch(
      createMessage({"action": "item updated successfully"})
    );

  })
  .catch((err)=>{

    console.log(err.response)

    dispatch(getError(
        err.response.data,
        err.response.status
    ));

  })
}


export const deleteItem = (itemID)=>(dispatch, getState)=>{
  
  const config = {
    headers:{
      'Content-Type': 'multipart/form-data'
    }
  };
  const token = getState().authRD.token;
  if (token) config.headers["Authorization"] = `Bearer ${token}`;


  axios.delete(`api/item/${itemID}/`, config)
  .then((res)=>{
    
    dispatch({
      type: actionTypes.ITEM_DELETED,
      payload: itemID   //This for filter out at the "menu" reducer
    })

    dispatch(
      createMessage({"action": "item deleted successfully"})
    );

    

  })
  .catch((err)=>{

    console.log(err.response)

    dispatch(getError(
        err.response.data,
        err.response.status
    ));

  })


}