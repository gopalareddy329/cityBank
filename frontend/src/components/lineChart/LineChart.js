import React from 'react'
import Chart from "react-apexcharts";
const LineChart = ({x,y,title}) => {
    const series = y.map((item, index) => {
        return {
            name: `Series ${index + 1}`,  
            data: item                  
        };
    });
    var options = {
        options: {
          chart: {
            id: "basic-line"
          },
          title: {
            text: title,
            align: 'left'
          },
          xaxis: {
            categories: x
          }
        },
        series: series,
        
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