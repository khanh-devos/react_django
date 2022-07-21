import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPdData, showSales } from '../../../actions/sales';
import {Redirect} from "react-router-dom";
import Sales from './Sales';

import {Grid } from '@material-ui/core';
import { formatPrice } from '../menu/ItemSet';
import MonthlyPlotting from './MonthlyPlotting';
import { ConvertStringToHTML } from './ConvertStrToHTML';
import MonthlyPie from './MonthlyPie';



const countSalesVol = (sales)=>{
  return sales.reduce( (pre,order)=> pre + order.total_price, 0);
}



function SalesOrders(props) {

  const [number, setNum] = useState(3);
  
  const [[sales, sales_volume], setSSV] = useState(()=>{
    
    props.showSales(number);  
    const sales = props.sales;
    const sales_volume = countSalesVol(sales);

    return [sales, sales_volume]
  });

  useEffect(() => {
    
    //As props.sales changes
    setSSV([props.sales, countSalesVol(props.sales)]);

    console.log("use effect 1 ");

  }, [props.sales]);

  
  //fOR YEAR AND MONTH
  const prev_y_m = useRef();    //FOR MEMORIZE PREVIOUS YEAR AND MONTH

  const [[year, month], setYM] = useState(()=>{
    //For plotting:
    const d = new Date();
    const year = d.getFullYear();
    const month = 1 + d.getMonth();
    
    props.getPdData(year, month);

    //initialize for prev_y_m
    prev_y_m.current = [year, month];

    return [year, month]
  });

  function handleChange(e){
      
    if (e.target.name === 'number') {
      props.showSales(e.target.value);
      setNum(e.target.value);
    }
    else if (e.target.name === 'year') {
      props.getPdData(e.target.value, month);
      setYM([e.target.value, month]);
    }
    else if (e.target.name === 'month') {
      props.getPdData(year, e.target.value);
      setYM([year, e.target.value]);
    }
  }
  
  //const betterHandleChange = useMemo((e)=>handleChange(e))

  useEffect(()=>{
    //check Err of empty DATA
    console.log("use effect 3 ");
    console.log(props.error.msg);

    if (props.error.msg !== null) {
      console.log('back to prev');
      console.log(prev_y_m.current);
      setYM(prev_y_m.current);
    }

  }, [props.error])

  
  //PANDAS DATA
  const [pdData, setpdData] = useState(()=>{
    console.log("props.pdData");
    //console.log(props.pdData.last_day);
    return props.pdData
  });
  

  useEffect(() => {
    //As props.pdData changes
    setpdData(props.pdData);
    prev_y_m.current = [year, month];

    console.log("use effect 2 ");

  }, [props.pdData]);

  

  if (!props.isAuthenticated){
    return <Redirect to="/login" />
  }

  return (
  <>
  <div>
    <div className='sales-table-container'>
      <label>Number of latest orders being shown : </label>
      <input name="number" type="number" value={number}  min="1" max="100"
            onChange={e => handleChange(e)}/><br /><br />
      {
      sales.length ===0 ? 
        <h3>Please wait</h3>
        : 
        <table className="table-salesOrder-1">
            <thead>
              <tr>
                <th>id</th>

                <th>Order No.</th>
                <th>User</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Size</th>
                <th>Unit Price ($VN)</th>
                <th>Quant</th>
                <th>Total Price ($VN)</th>
                
                <th className='order-date'>Year</th>
                <th className='order-date'>Month</th>
                <th >Date</th>
                <th >Time</th>

              </tr>
            </thead>

            {
              sales.map( (order) => <tbody key={order.id} >
                                      <Sales order={order} />
                                    </tbody>
              )
            }
        
          </table>
      }
    </div>

    <div className='sales-vol-container'>
      <h3>SALES VOLUME : $VND {formatPrice(sales_volume)}</h3>
    </div>

    {/* PLOTTING MONTHLY GRAPH */}
    <div className='sales-year-month-selection'>
        <h3>MONTHLY PLOTTING & STATISTICS </h3>

        <label>Year : </label>
        <input name="year" type="number" value={year}  min="2000" max="2050"
            onChange={e => handleChange(e)}/>

        <label> | Month : </label>
        <input name="month" type="number" value={month}  min="1" max="31"
            onChange={e => handleChange(e)}/>
      
        <br/><br/>
        
        {/* <div className='type-chart-label-color'>
        { 
          pdData.last_day !== undefined  ? 
                pdData.typesData.map(e => <div key={e.name}>
                    <button className={`graph-type gt-${e.name.toLowerCase()}`} ></button> 
                    <span>{e.name} : {e.total}</span>
                </div>)
              :
              <></>
        }
        </div> */}

    </div>

    <div className="sales-monthly-graph" >

        <div className="graph-BAR" >
          {
            pdData.last_day !== undefined  ? <MonthlyPlotting pdData={pdData}/>
                                          : <h2>Wait a little</h2>
          }
        </div>

        <div className="graph-Pie" >
        { 
          pdData.last_day !== undefined  ? 
              <MonthlyPie pdData={pdData} />
              :
              <></>
        }
        </div>

        


    </div>
    
    <div className="sales-monthly-graph" >
      <h3>QUANTITY PER NAME IN THIS MONTH {year}/{month} </h3>
      { 
        pdData.last_day !== undefined  ?
            <><ConvertStringToHTML domString={pdData.sales_per_name} />
            </>
            :
            <></>
      }
      
      <br/><br/>
      </div>
  </div>
  <br/><br/><br/>
  </>);
  
}


SalesOrders.propTypes = {
  sales: PropTypes.array.isRequired,
  pdData: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,

  getPdData: PropTypes.func.isRequired,
  showSales: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    sales: state.salesRD.sales,
    pdData: state.salesRD.pdData,
    isAuthenticated: state.authRD.isAuthenticated,
    error: state.msgErrorRD,
})

const mapDispatchToProps = (dispatch) => ({
    getPdData: (year, month) => dispatch(getPdData(year, month)),
    showSales: (number) => dispatch(showSales(number)),
})

export default connect(mapStateToProps, mapDispatchToProps )(SalesOrders);
//export default connect(mapStateToProps, { showSales, getPdData })(SalesOrders);
