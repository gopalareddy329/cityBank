import React from 'react'
import Chart from "react-apexcharts";


const AreaChart = () => {
    const options={
          
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
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
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
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