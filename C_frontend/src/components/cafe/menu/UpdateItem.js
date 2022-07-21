import React, { Component } from 'react';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';

import { updateItem } from '../../../actions/newItem';
import { Grid } from '@material-ui/core';
import { getError } from '../../../actions/error';
import { Redirect } from 'react-router-dom';
import { createMessage } from '../../../actions/message';


export class UpdateItem extends Component {
  static propTypes = {
    mediumItem: PropTypes.object.isRequired,
    getError: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    createMessage: PropTypes.func.isRequired,
    msg: PropTypes.object.isRequired,
  }

  state = {
    ...this.props.mediumItem,
    updating_finished: false,
  } 

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.type==="file" ? 
                        `static/images/${e.target.files[0].name}`
                        : e.target.value
    });

    //show image
    const img = document.getElementById("show-update-item-img-ID");
    
    if (e.target.type==="file") {
      console.log(e.target.files[0].name)

      var fr = new FileReader();

      fr.readAsDataURL(e.target.files[0]);
      fr.onload = ()=> { img.src = fr.result };
    };

  }

  ClickImage=()=>{
    document.getElementById("update-item-image-ID").click();
  }

  addExtras = (e)=>{
    e.preventDefault();

    const details = this.state.extras.details;
    const id = details.length;
    
    const new_details = [
      ...details,
      {id: id, name: "", price: "", default: ""}
    ]

    this.setState({
      extras: {details: new_details}
    })
  }

  handleExtras = (e)=>{
    // alert(e.target.id);
    e.preventDefault();

    const details = this.state.extras.details;

    const previous_items = details.slice(0, Number(e.target.id)); 
    const selected_item = details.filter(extra => extra.id === Number(e.target.id) )[0]; 
    const rest_items = details.slice(Number(e.target.id)+1, details.length); 
    
    const new_details = [
      ...previous_items,
      {...selected_item,
        [e.target.name]: e.target.type === 'checkbox'? 
                        (e.target.checked ? "True": "False") 
                        : e.target.value
      },
      ...rest_items
    ];

    this.setState({
      extras: {details: new_details}
    });
    
  }
  
  
  handleSize = (e)=>{
    e.preventDefault();
    const details = this.state.sizes_prices.details;

    const previous_items = details.slice(0, Number(e.target.id)); 
    const selected_item = details.filter(size => size.id === Number(e.target.id) )[0]; 
    const after_items = details.slice(Number(e.target.id)+1, details.length); 

    const new_details = [
      ...previous_items,
      {...selected_item,
        [e.target.name]: e.target.value
      },
      ...after_items
    ];

    this.setState({
      sizes_prices: {details: new_details}
    });
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    const extras = this.state.extras;
    const sizes = this.state.sizes_prices;

    const item = this.state;
    item.category==='' ? this.props.getError({action: "please fill category"}) 
    :
    item.type==='' ? this.props.getError({action: "please fill type "})
    :
    item.name==='' && this.props.getError({action: "please fill name "})

    try {
      this.props.updateItem({
        ...item,
        extras: {details: extras.details.filter(
                          extra=> extra.name!=="" && extra.price !=="" )}
      });

      this.setState({updating_finished: true});
    }
    catch(err){ this.getError(
      err.response.data,
      err.response.status,
    )}
      
  }

  handleBack=(e)=>{
    e.preventDefault();
    history.back();

  }
  
  render() {
    const item = this.state;

    if (!this.props.isAuthenticated){
      this.props.createMessage({action: "Item updated FAILED"})
      return <Redirect to='/' />
    } 

    if (this.state.updating_finished) {
      return <Redirect to='/' />
    }


    return (
    <form onSubmit={this.handleSubmit} className="new-item-form">
      <h3>Update Item : {item.name}
      
      <button onClick={this.handleBack}
              style={{marginLeft:"2vw"}}
              >Back</button>
      </h3>

      <div class="new-item-container">
        <div class="new-item-left-side">
          <span>Category : </span>
          </div>
          
        <div class="new-item-right-side">
          <select size={1} name="category"  required
                  value={item.category}
                  onChange={this.handleChange} >
            <option></option>
            <option>Beverage</option>
            <option>Food</option>
            <option>Others</option>
          </select>
          
          </div>
        
        <div class="new-item-left-side">
          <span>Type : </span>
          </div>
        
        <div class="new-item-right-side">
          <select size={1} name="type" required
                  value={item.type}
                  onChange={this.handleChange} >
            <option></option>
            <option>Coffee</option>
            <option>MilkTea</option>
            <option>Juice</option>
            <option>Food</option>
            <option>Other</option>

          </select>
        </div>

        <div class="new-item-left-side">
          <span>Name : </span>
          </div>

        <div class="new-item-right-side">
          <input name="name" value={item.name} required
                  onChange={this.handleChange} />
        </div>
      </div>

      <div class="extras-container">
        <span>EXTRAS: </span>
      </div>
      { 
        item.extras.details.map(e => 
          <div key={e.id} className="new-item-extras-box">
            <div className='extras-group'>
              <span>Name: </span>
              <input name="name" value={e.name} type="text" id={e.id} className="extras-input"
                    onChange={this.handleExtras} />
            </div>

            <div className='extras-group'>
              <span>Price ($VN): </span> 
              <input name="price" value={e.price} type="number" id={e.id} className="extras-input"
                    onChange={this.handleExtras} />
            </div>

            <div className='extras-group'>
              <span>Default: </span>
              <input name="default" checked={e.default==="True"? true:false } 
                    type="checkbox" id={e.id}
                    onChange={this.handleExtras} />
            </div>
          </div>
        )
      }
      <button onClick={this.addExtras} 
              className="button-class-1">Add more extras </button><br /><br/>
      
      <div class="size-price-container">
      <span>SIZES & PRICES: </span></div>
      {
        item.sizes_prices.details.map(e=>
          <div key={e.id}>
            <div className="new-item-size-box">
              <div class="size-group-left">
                <span >Price ($VN, {e.name} size) : </span>
                </div>
              
              <div class="size-group-right">
                <input name="price" value={e.price} className="extras-input"
                      type="number" id={e.id}
                      onChange={this.handleSize} />
                </div>
            </div>
          </div>
        )
      }

        <div className='new-item-img-container'>
          <div className='new-item-img-label'>
            <span>CLICK TO SELECT IMAGE:</span>
            </div>
        
          <div className='new-item-img-frame'>
            <img src={this.state.img} 
               id="show-update-item-img-ID" width={"100%"}
               onClick={this.ClickImage}
               />
          </div>

        <div className='new-item-img-input'>
          <input name="img" type="file" id="update-item-image-ID" 
                onChange={this.handleChange} />
          
          </div>
      </div>

      <div className='new-item-submit-box'>
        <button type="submit" className='button-class-1'>SUBMIT</button>
      </div>

      <br /><br /><br /><br />
    </form>);
  }
}

const mapStateToProps = state => ({
  mediumItem: state.mediumItemRD,
  isAuthenticated: state.authRD.isAuthenticated, 
  msg: state.messageRD.msg === undefined ? {}: state.messageRD.msg, 
})

export default connect(mapStateToProps,  { createMessage, updateItem, getError })(UpdateItem);
