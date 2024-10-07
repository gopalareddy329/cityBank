import React from 'react'
import Chart from "react-apexcharts";


const PieChart = ({data}) => {

  var labels=data.map((item)=>item.Reason)
  var y = data.map((item)=>item.total_amount_spent)
    const options={
        series: y,
        options: {
          chart: {
            type: 'donut',
          },
          labels: labels,
          title:{
            text: "Expenditure Over 6 Months",
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