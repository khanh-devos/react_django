import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatPrice } from './ItemSet';
import { itemCancelled, itemsPaid } from '../../../actions/items';


const sumAllTotalPrice = (items)=>{
    return (items
    .filter(e => e.is_paid === false)
    .reduce( (prev, e)=> prev+ e.total_price, 0));
}

export class Orders extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    itemCancelled: PropTypes.func.isRequired,
    itemsPaid: PropTypes.func.isRequired,
  }

  constructor(props){
    super(props);
  }

  handleCancell = (id)=>{
    this.props.itemCancelled(id);     //dispatch is always auto-update
  }
  
  

  handlePayment = ()=>{
    
    const handleSingleOrder = (item) => {
      const {order_no, category, type, name, extras, 
        sizes_prices, unit_price, quantity, total_price} = item;
  
      this.props.itemsPaid(
        order_no, category, type, name, extras, 
        sizes_prices, unit_price, quantity, total_price
      );
    }

    this.props.items
    .filter( (item) => item.is_paid === false )
    .map( (item) => handleSingleOrder(item) );
    
  }

  render() {
    const items = this.props.items;
    
    return (
    <>

    <ul>
    {
        items.filter(item=> item.is_paid === false)
        .map( item => (
          <li key={item.id}>

            <label>{item.id} : </label>
            <span>order_no : {item.order_no} | </span>
          
            <span>type : {item.type} | </span>
            <span>name : {item.name} | </span>
            {
            item.extras.details.map(e=> <span key={e.id}>
                extras: {e.name} : {e.price} | {" "}
                </span>)
            }

            {
            item.sizes_prices.details.map(e=> <span key={e.id}>
                size : {e.name} {" "}
                </span>)
            }

            <span>unit price: {formatPrice(item.unit_price)} | </span>
            <b>
              <span>quant: {item.quantity} | </span>
              <span>total price: {formatPrice(item.total_price)} | </span>
              {/* <span>paid : {item.is_paid ? 'ok': 'not yet'} | </span> */}

            </b>
            
            <button className='button-class-1'
                    onClick={() => this.handleCancell(item.id)}    
                >Cancel</button>

          </li>))
    }

    {
        items.length>0 ? <div className='payment-button-frame'>
            
            <b><label> Total: $VND{" "}
              {formatPrice(sumAllTotalPrice(this.props.items))}
              </label></b>
            
            <br/>

            <button className='button-class-1 pay-button' 
                    onClick={() => this.handlePayment()}      
              >PAY ALL</button>

            
        </div>
        : <></>
        
    }    
        
    </ul>

    
    </>);
  }
}

const mapStateToProps = (state) => ({
  items: state.itemsRD.items,
});
  
export default connect(mapStateToProps, { itemCancelled, itemsPaid } )(Orders);

