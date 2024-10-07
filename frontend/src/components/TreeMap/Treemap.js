import React from 'react'
import Chart from "react-apexcharts";
const Treemap = (data) => {
  var d=data?.data?.map((item)=>({x:item.Reason,y:item.total_spent}))

    const options={
          
        series: [
          {
            data:d
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
            text: 'Expenditure'
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