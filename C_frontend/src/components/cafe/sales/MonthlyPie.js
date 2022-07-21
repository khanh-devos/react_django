import React, { useEffect, useState } from 'react'
import { Bar, VictoryBar, VictoryChart, VictoryLabel, VictoryLegend, 
  VictoryPie, VictoryPolarAxis, VictoryStack, VictoryTheme, VictoryTooltip } from 'victory'

function MonthlyPie({pdData,}) {
  const [plot_data, setPlotData] = useState(()=>{
      
    const d = pdData.typesData.map( e => {
        return {name: e.name, quantity: e.total}
    })

      return d
  })


  useEffect(()=>{
    
    const d = pdData.typesData.map( e => {
        return {name: e.name, quantity: e.total}
    })

    setPlotData(d);

  },[pdData])

  return (
    <div>
      <div className='chart-title'>TOTAL GLASSES PER TYPE</div>

        <VictoryPie polar 
            title="TOTAL GLASSES PER TYPE"

            colorScale={["#38291f", 'gold', 'green', 'orange', 'grey']}
            data={plot_data}  x="name" y="quantity"

            

            style={{ labels: { padding: 5, fontSize: 20 } }}
            labels={({ datum }) => `${datum.name}: ${datum.quantity}`}
            //labelPlacement={({ datum }) => datum.quantity}
            // labelPosition="middle"

            labelComponent={
              <VictoryTooltip  />
            }

            
        />

        

    </div>
  )
}

export default MonthlyPie;

// plotting a round BAR
{/* <VictoryChart polar
          theme={VictoryTheme.material}
          innerRadius={50}
          startAngle={0}
          endAngle={360}

        >
          
          <VictoryPolarAxis 
            
          />
          
          <VictoryBar
            data={plot_data} x='name' y='quantity'
            
            colorScale={["#38291f", 'gold', 'green', 'orange', 'grey']}
            
            //labels={({ datum }) => `${datum.name}: ${datum.quantity}`}

            style={{ 
              data: { fill: "#38291f", 
                      stroke: "green", strokeWidth: 5 
                    },
              labels: { padding: 5, fontSize: 20 }
            }}
          />

          <VictoryBar
            data={plot_data} x='name' y='quantity'
            
            colorScale={["#38291f", 'gold', 'green', 'orange', 'grey']}
            
            //labels={({ datum }) => `${datum.name}: ${datum.quantity}`}

            style={{ 
              data: { fill: "gold", 
                      stroke: "green", strokeWidth: 5 
                    },
              labels: { padding: 5, fontSize: 20 }
            }}
          />
        </VictoryChart> */}