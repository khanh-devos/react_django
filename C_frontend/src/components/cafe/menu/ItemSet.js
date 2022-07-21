import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemSet } from '../../../actions/items';
import { getOrderNo } from '../../../actions/sales';
import { Redirect, Link } from 'react-router-dom';
import { deleteItem } from '../../../actions/newItem';

export const formatPrice = (price)=>{
    //convert price
    if (String(price).indexOf(",") === -1 && String(price).length >3) {
        var rev = String(price).split("").reverse().join("");
        var res = "";
        while (rev.length > 3) {
            var part = rev.slice(0, 3);
            rev = rev.slice(3);
            res += part + ",";
            
            if (rev.length > 3) continue;
            else res += rev;
        }
        return res.split("").reverse().join("");
         
    }
    else return price;  

}

export const calculateUnitPrice = (extrasDetails, sizesDetails)=>{
  const price1 = extrasDetails.reduce( (prev, e) => e.default==="True" ? 
                                  Number(e.price) + prev : prev, 0);
  
  const price2 = sizesDetails.reduce( (prev, e) => e.default==="True" ? 
                                  Number(e.price) + prev : prev, 0); 
  
  return Number(price1 + price2)
}

export const calculateTotalPrice = (unit_price, quantity)=>{
  return (unit_price * quantity);
}

export class ItemSet extends Component {
  static propTypes = {
    itemSet: PropTypes.func.isRequired,
    sales: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,

    getOrderNo: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props);
    this.state = {
      ... props.item,
      
      unit_price: calculateUnitPrice(
                      props.item.extras.details,
                      props.item.sizes_prices.details
                    ),     //add more
      
      quantity: 1,
      
      total_price: calculateTotalPrice(
                              calculateUnitPrice( 
                                props.item.extras.details,
                                props.item.sizes_prices.details
                              ),
                              1 
                    )

    };
  }

  handleExtras = (e)=>{
    //update extras
    const extras = this.state.extras;

    //differiate Type coffee and other Types due to iced or hot is opposite properties
    const updated_extas_details = 
      this.state.type.toLowerCase().indexOf("coffee") === -1 ?
        extras.details.map( item =>
          item.name === e.target.name ? 
            {...item, default: e.target.checked ? "True" : "False"}
            : {...item}
        )
        :
        extras.details.map( item =>     //Type Coffee
          item.name === e.target.name ? 
            {...item, default: e.target.checked ? "True" : "False"}
            : {...item, default: e.target.checked ? "False" : "True"}
        );
    
    const new_unit_price = calculateUnitPrice(updated_extas_details, 
                                              this.state.sizes_prices.details
                                          );
    
    this.setState({ 
      extras: { details: updated_extas_details },
      unit_price: new_unit_price,
      total_price: calculateTotalPrice(new_unit_price, this.state.quantity )

     });
  }

  handleSizes = (e)=>{
    //update extras
    const sizes_prices = this.state.sizes_prices;
    const updated_sizes_details = sizes_prices.details.map( item =>
        item.name === e.target.name ? 
            {...item, default: e.target.checked ? "True" : "False"}
            : 
            {...item, default: e.target.checked ? "False" : "True"}       //in contrary
    ) 
    
    const new_unit_price = calculateUnitPrice(this.state.extras.details,
                                              updated_sizes_details
                                            );
    
    this.setState({ 
      sizes_prices: { details: updated_sizes_details },
      unit_price: new_unit_price,
      total_price: calculateTotalPrice(new_unit_price, this.state.quantity)
    });
  }

  decreaseQuantity = (e)=>{
    const new_quantity = this.state.quantity === 1 ? 
                          1 : this.state.quantity-1
    this.setState({
      quantity: new_quantity,
      total_price: calculateTotalPrice(
        this.state.unit_price,
        new_quantity
      ) 
    });
  }

  increaseQuantity = (e)=>{
    const new_quantity = this.state.quantity + 1
    this.setState({
      quantity: new_quantity,
      total_price: calculateTotalPrice(
        this.state.unit_price,
        new_quantity
      )
    });
  }

  componentDidMount= ()=>{
    this.props.getOrderNo();
  }

  handleOK = ()=>{
    const item = this.state;
    const extrasDetails = this.state.extras.details;
    const sizeDetails = this.state.sizes_prices.details;

    //get last id in sales to make order_no
    const last_id = this.props.sales[0].id;
    const new_order_no = "K0" + String(last_id+1); 

    this.props.itemSet({
      category: item.category,     //avalable
      order_no: new_order_no,
      type: item.type,             //avalable
      name: item.name,             //avalable
      
      extras: {details: extrasDetails.filter(e => e.default==="True")},       //add more
      sizes_prices: {details: sizeDetails.filter(e => e.default==="True")},           //add more

      unit_price: item.unit_price,        //avalable
      quantity: item.quantity,            //avalable
      total_price: item.total_price,      //avalable
    });


    this.props.handleClose();
  }

  handleDelete = ()=>{
    const thisButton = document.getElementById('itemSet-del-button-ID')
    thisButton.disabled = true;

    const del_conf = document.getElementById('ItemSet-delete-confirm-ID');
    del_conf.style.display = 'block';

    //START TO SHOW "YES" BUTTON IN 1S
    setTimeout(()=>{
      del_conf.style.marginTop = '0vw';
      del_conf.style.transitionDuration = '0.6s';

      setTimeout(()=>{
        del_conf.style.visibility = 'visible';
        del_conf.style.transitionDuration = '0.2s';
      },700);

    },100);

    
    
    //START TO HIDDEN AGAIN THE 'YES' BUTTON
    setTimeout(()=>{
      del_conf.style.visibility = 'hidden';
      del_conf.style.transitionDuration = '0.3s';

      setTimeout(()=>{
        del_conf.style.marginTop = '-6.5vw';
        del_conf.style.transitionDuration = '0.5s';

        setTimeout(()=>{
          del_conf.style.display = 'none';
          thisButton.disabled = false;
        },500);

      },500);

    },2000);

    

    
  }

  render() {
    const item = this.state;

    return (<>
    <Grid container spacing={2} >
      <Grid item xs={6} >
        <label>id : {item.id}</label><br/>
        <label>{item.category} - {item.name}</label><br/>
        {
          this.props.isAuthenticated ?
            <button className='button-class-1' >
              <Link to='/updateItem' >UPDATE</Link>
            </button>
            :
            <></>
        }
        

        <div className="ItemSet-img-frame">
          <img src={item.img} width={"80%"} height={"80%"}/><br /><br />
        </div>
        
        {
          this.props.isAuthenticated ?
            <>
            <button className='button-class-1' id="itemSet-del-button-ID"
                    onClick={this.handleDelete}>
              DELETE
            </button>
            <div id='ItemSet-delete-confirm-ID'>
              <h3>Are you shure ? 
                <button className='button-class-2' 
                        onClick={()=>this.props.deleteItem(item.id)}
                    >YES
                </button>
              </h3>
            </div>
            
            </>
            :
            <></>
        }

        </Grid>
      
      <Grid item xs={6} >
        <label>Options : </label><br/>
        {
          item.extras.details.map( e => (
            <div key={e.id}>
              <li>
                <span>{e.name} : </span>
                <input type={"checkbox"} name={e.name} 
                      checked={e.default==="True" ? true : false}
                      onChange={this.handleExtras} />
                
                <span>VND: {formatPrice(e.price)}</span>
                </li>
            </div>
          ))
        }

        <label>Sizes : </label><br/>
        {
          item.sizes_prices.details.map( e => (
            <div key={e.id}>
                <li>
                <span>{e.name} : </span>
                <input type={"checkbox"} name={e.name} 
                      checked={e.default==="True" ? true : false}
                      onChange={this.handleSizes} />
            
                <span>VND: {formatPrice(e.price)}</span>
                </li>
            </div>

          ))
        }
        <br />
        <span>Unit Price : 
          VND {formatPrice(item.unit_price)}
          </span><br />
        <span>Quantity : {" "} </span>
          <button className='button-class-1'
                  onClick={this.decreaseQuantity} >-</button> 
          
          <strong style={{padding:"5px"}}>{item.quantity} </strong>

          <button className='button-class-1'
                  onClick={this.increaseQuantity} >+</button> 
        <br />
        <span>Total Price : 
          VND {formatPrice(item.total_price)}
          </span><br />
        <hr />

        <button className='button-class-1' onClick={this.handleOK}>OK</button>{" "}
        <button className='button-class-1' onClick={this.props.handleClose}>Cancel</button>
        </Grid>
    </Grid>
    <br />
    </>)
  }
}

const mapStateToProps = state => ({
  sales: state.salesRD.sales,
  isAuthenticated: state.authRD.isAuthenticated,
})

export default connect(mapStateToProps, { itemSet, getOrderNo, deleteItem })(ItemSet);
