import React from 'react'
import Chart from "react-apexcharts";


const AreaChart = (data) => {
  var dates=data.data?.reports?.map((item)=>item.date)
  var amount=data.data?.reports?.map((item)=>item.amount)

    const options={
          
        series: [{
            name: 'Savings',
            data: amount
          }],
        options: {
          chart: {
            type: 'area',
            height: 350,
            zoom: {
              enabled: false
            }
          },

          stroke: {
            curve: 'straight'
          },
          
          title: {
            text: 'Advisor Report',
            align: 'left'
          },
          
          xaxis: {
            type: 'datetime',
            categories: dates
          },
          yaxis: {
            opposite: true
          },
          legend: {
            horizontalAlign: 'left'
          }
        },
      
      
      };
  return (
    <div className='w-full ' id="chart">
        <Chart
              options={options.options}
              series={options.series}
              style={{"width":"100%"}}
              type="area"
              height={400}
           
            />
    </div>
  )
}

export default AreaChart