import React from 'react'
import Chart from "react-apexcharts";
const LineChart = ({data}) => {
    var x = data.map((item, index) => (item.month))
    var series1 = data.map((item, index) => item.total_amount_spent);
    var series2 = data.map((item, index) => item.total_can_spent);
    var options = {
        options: {
          chart: {
            id: "basic-line"
          },
          title: {
            text: "Predicted Monthly Expenditure vs Actual Monthly Expenditure",
            align: 'left'
          },
          xaxis: {
            categories: x
          }
        },
        series:[
          {
            "name":"Amount Spent",
            "data":series1
          },
          {
            "name":"Can Spent",
            "data":series2
          }
        ],
        
      };
    
     
      
  return (
    <div className='w-full' id="chart">
        <Chart
              options={options.options}
              series={options.series}
              style={{"width":"100%","minHeight":"100%"}}
              type="line"
           
            />
</div>
  )
}

export default LineChart