import React, { Component } from 'react';
import { connect } from 'react-redux';
import { menuMade } from '../../../actions/menu';
import PropTypes from 'prop-types';
import { Grid, Input, Typography } from "@material-ui/core";
import TypeShowing from './TypeShowing';
import Orders from './Orders';



//Remove space and lower name
const lowerNameAndRemoveSpace = (name)=>{
  const nameArray = name.trim().toLowerCase().split(" ");
  return nameArray.reduce((pre, e) => pre+e, "") 
}



class Menu extends Component {
  static propTypes = {
    menu: PropTypes.array.isRequired,
    menuMade: PropTypes.func.isRequired,
  };
  
  componentDidMount = ()=>{
    this.props.menuMade();
  }

  moveToTop = ()=>{
    const behavior = {top:0, behavior:"smooth"};
    document.body.scrollTo(behavior);
    document.documentElement.scrollTo(behavior);
    
  }

  move = (e)=>{
    const food = document.getElementById("menu-"+ e.target.name +"-ID");

    food.scrollIntoView(
      {behavior: "smooth", block: "start", inline: "nearest"}
    );

    let app = document.getElementById("app");
    
    setTimeout(()=>{
      const ratio = Math.round(100*app.scrollLeft / (app.scrollWidth/2));
      ratio < 40 ? app.scrollTo(0, app.scrollTop)
                 : app.scrollTo(app.scrollWidth, app.scrollTop);

    },1000)
    
  }

  render() {

    const CoffeeList = this.props.menu.filter(item => item.type === 'Coffee');
    const MilkTeaList = this.props.menu.filter(item => item.type === 'MilkTea');
    const JuiceList = this.props.menu.filter(item => item.type === 'Juice');
    const FoodList = this.props.menu.filter(item => item.type === 'Food');
    const OtherList = this.props.menu.filter(item => item.type === 'Other');

    return (
    <div className='total-menu-order-payment' id="total-menu-ID">

      <div className='type-select-button-box' id="menu-Menu-ID">
        <label>MENU </label>
        <button name="Coffee" className='button-class-1' onClick={this.move}>
          Coffee</button>
        <button name="MilkTea" className='button-class-1' onClick={this.move}>
          MilkTea</button>
        <button name="Juice" className='button-class-1' onClick={this.move}>
          Juice</button>
        <button name="Food" className='button-class-1' onClick={this.move}>
          Food</button>
        <button name="Other" className='button-class-1' onClick={this.move}>
          Other</button>

        <button name="Payment" className='button-class-1 to-payment-button' 
          onClick={this.move}>
          PAYMENT</button>  
      </div>

      <div className="menu-container">
          
          <TypeShowing id="menu-Coffee-ID" moveToTop={this.moveToTop}
                      list={CoffeeList} type="Coffee"/>
          <TypeShowing id="menu-MilkTea-ID" moveToTop={this.moveToTop}
                      list={MilkTeaList} type="MilkTea"/>
          <TypeShowing id="menu-Juice-ID" moveToTop={this.moveToTop}
                      list={JuiceList} type="Juice"/>
          <TypeShowing id="menu-Food-ID"  moveToTop={this.moveToTop}
                      list={FoodList} type="Food"/>
          <TypeShowing id="menu-Other-ID" moveToTop={this.moveToTop}
                      list={OtherList} type="Other"/>

      </div>

      <div className="order-container" id="menu-Payment-ID">
        <div className='order-frame'> 

            <label>ORDER PAYMENT : </label><br />

            <Orders /> 
        </div>
 
        <button name="Menu" className='button-class-1 back-menu-button' 
              onClick={this.move}> BACK TO MENU
        </button>
      </div>

      
    
    </div>);
  }
}

const mapStateToProps = (state) => ({
  menu: state.menuRD.menu, 
});

export default connect(mapStateToProps, { menuMade } )(Menu);
