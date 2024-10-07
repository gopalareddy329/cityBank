import React from 'react'
import Chart from "react-apexcharts";


const RadarPlot = ({x,y,title}) => {
  const series = y.map((item, index) => {
    return {
        name: `Series ${index + 1}`,  
        data: item                  
    };
});

  var options = {
          
      series: series,
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
          text: title
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