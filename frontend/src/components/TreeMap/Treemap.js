import React from 'react'
import Chart from "react-apexcharts";
const Treemap = () => {
    const options={
          
        series: [
          {
            data: [
              {
                x: 'Entertainment',
                y: 218
              },
              {
                x: 'Groceries',
                y: 149
              },
              {
                x: 'Dining Out',
                y: 184
              },
              {
                x: 'Utilities',
                y: 55
              },
              {
                x: 'Clothing',
                y: 84
              },
              {
                x: 'Miscellaneous',
                y: 31
              },
              {
                x: 'Education',
                y: 70
              },
              {
                x: 'Health',
                y: 30
              },
              {
                x: 'Travel',
                y: 44
              }
            ]
          }
        ],
        options: {
          legend: {
            show: false
          },
          chart: {
            height: 350,
            type: 'treemap'
          },
          title: {
            text: 'Basic Treemap'
          }
        },
      
      
      };
  return (
    <div className='w-full ' id="chart">
        <Chart
              options={options.options}
              series={options.series}
              style={{"width":"100%"}}
              type="treemap"            
            />
    </div>
  )
}

export default Treemap