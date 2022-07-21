import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Bar, VictoryAxis, VictoryBar, VictoryChart, 
  VictoryLabel, VictoryLegend, VictoryLine, VictoryStack, VictoryTheme, VictoryTooltip } from 'victory';

import PropTypes from 'prop-types';

const find_month_date_shown_date = (last_day)=>{
  
  let md = [];
  let sd = [];
  const shown = [1, 5, 10, 15, 20, 25, last_day];

  for (var i=1; i < 1+last_day; i++) {
    md.push(i);

    if (shown.includes(i)) sd.push(i)
    else sd.push("")
  }

  //console.log("count month_date times");

  return [md, sd]
}

const calSalesAvg = (pdData)=>{
  const last_day = pdData.last_day;
  const total_sales = pdData.typesData.reduce( (prev, e)=> prev + e.total, 0);
  
  console.log('sales AVG: ' + Math.max(Math.round(total_sales/last_day), 1));

  return Math.max(Math.round(total_sales/last_day), 1)
}


//############################################//
export default function MonthlyPlotting(props) {
  
  
  const [[month_date, shown_date], setMDSD] = useState(()=>{
    return find_month_date_shown_date(props.pdData.last_day)
  })
  
  
  const [typesData, setTD] = useState(props.pdData.typesData);

  const [sales_average, setSAvg] = useState(calSalesAvg(props.pdData));

  useEffect(() => {
    
    setMDSD(()=>{
      return find_month_date_shown_date(props.pdData.last_day)
    })

    setTD(props.pdData.typesData);

    setSAvg(calSalesAvg(props.pdData));

  },[props.pdData])
  


  return (<>
      <h3>GLASSES PER DAY</h3>
      
      <VictoryChart
            // PARENT AND HEIGHT FOR SETTING GRAPH SIZE
            style={{ background: { fill: "lavender" }, 
                     parent: { maxHeight: "50%" },

                    }}
            height={300}

            theme={VictoryTheme.material}
            domainPadding={50}

      >
        
        {/* SET X  */}
        <VictoryAxis
          label="Date"
          tickValues={month_date}
          tickFormat={shown_date} 

          style={{ 
            axisLabel: {fontSize: 10, padding: 30, fill:'black'},
          }}
          
        />

        {/* SET Y */}
        <VictoryAxis
          label="Glasses"
          dependentAxis
          tickFormat={ (y) => y }

          style={{ 
            axisLabel: {fontSize: 10, padding: 30, fill:'black'},
          }}
        />

        {/* SALES-AVERAGE LINE */}
        <VictoryLine
            style={{
              data: { stroke: "red", strokeWidth: 0.5 },
              labels: { angle: 0, fill: "red", fontSize: 10 },
            }}
            labels={[`average`]}
            labelComponent={<VictoryLabel x={275}/>}
            y={() => [Number(sales_average)]}
          />


        {/* CHART TITLE */}
        {/* <VictoryLabel 
            style={[ 
              {fontSize: 12, fontFamily: "fantasy", fontWeight: 'bold'}
            ]}
            text="GLASSES PER DAY" x={150} y={25} textAnchor="middle"
            /> */}

        
        <VictoryLegend x={55} y={10}
          //title="lEGEND"
          centerTitle
          orientation="horizontal"
          gutter={10}

          // style={{ 
          //   border: { stroke: "black" }, 
          // }}

          colorScale={["#38291f", 'gold', 'green']}
          data={[
            { name: `Coffee`}, { name: "MilkTea"}, { name: "Juice"}
          ]}
        />

        <VictoryLegend x={55} y={30}
          //title="lEGEND"
          centerTitle
          orientation="horizontal"
          gutter={10}

          // style={{ 
          //   border: { stroke: "black" }, 
          // }}

          colorScale={['orange', 'grey']}
          data={[
            { name: "Food"}, { name: "Other"}
          ]}
        />


        
        {/* SET COLOR FOR NAME/TYPE BASED ON INDEX */}
        <VictoryStack colorScale={["#38291f", 'gold', 'green', 'orange', 'grey']}>
          {
            typesData.map(e => <VictoryBar key={e.name} 
                                          data={e.data} x="date" y="quantity" 
                                          
                                          labels={({ datum }) => `y: ${datum.y}`}
                                          labelComponent={<VictoryTooltip />}
                                          dataComponent={
                                            <Bar
                                              tabIndex={0}
                                              ariaLabel={({ datum }) => `x: ${datum.x}`}
                                            />
                                          }

                                      /> )

          }

          
        </VictoryStack>

      </VictoryChart>
    

    
  
  </>)

}

