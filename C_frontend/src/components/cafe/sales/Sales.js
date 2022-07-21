import React, { Component } from 'react';
import { formatPrice } from '../menu/ItemSet';


export class Sales extends Component {
  
  render() {
    const order = this.props.order;

    return (
    <tr>
      <td>{order.id}</td>
      <td>{order.order_no}</td>
      <td>{order.owner_name}</td>

      <td>{order.name}</td>
      <td>{
          order.extras.details.map(e => <div key={e.id}>{e.name}</div>)
          }</td>
      <td>{
          order.sizes_prices.details.map(e => <div key={e.id}>{e.name}</div>)
          }</td>
      <td>{formatPrice(order.unit_price)}</td>
      <td>{order.quantity}</td>
      <td>{formatPrice(order.total_price)}</td>
      
      <td className='order-date'>{order.created_year}</td>
      <td className='order-date'>{order.created_month}</td>
      <td >{order.created_date}</td>
      <td >{order.created_time.substr(0, 5)}</td>


    </tr>
    );
  }
}


export default Sales;
