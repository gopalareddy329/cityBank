import React from 'react'
import Chart from "react-apexcharts";


const PieChart = ({labels,y,title}) => {
    const options={
        series: y,
        options: {
          chart: {
            type: 'donut',
          },
          labels: labels,
          title:{
            text: title,
            align: 'left'
          }
          
        },
      
      
      };
    
  return (
    <div className='w-full' >
        <Chart
              options={options.options}
              type="donut"
              series={options.series}
              style={{"width":"80%","height":"fit"}}
              
            />
    </div>
  )
}

export default PieChart