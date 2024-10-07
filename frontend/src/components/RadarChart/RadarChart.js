import React from 'react'
import Chart from "react-apexcharts";


const RadarPlot = ({x,y,data}) => {
  var x=data.map((item)=>item.Reason)
  var series1 = data.map((item, index) => item.total_amount_spent);
  var series2 = data.map((item, index) => item.total_can_spent);


  var options = {
          
      series: [
        {
          "name":"Amount Spent",
          "data":series1
        },
        {
          "name":"Amount Can Spent",
          "data":series2

        }
      ],
      options: {
        chart: {
          type: 'radar',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          }
        },
        title: {
          text: "Evaluator Report"
        },
        stroke: {
          width: 2
        },
        fill: {
          opacity: 0.1
        },
        markers: {
          size: 0
        },
        
        xaxis: {
          categories: x
        }
      },
    
    
    };
  
  return (
    <div className='w-full' >
        <Chart
              options={options.options}
              type="radar"
              series={options.series}
              style={{"width":"100%","minHeight":"100%"}}
              
           
            />
    </div>
  )
}

export default RadarPlot