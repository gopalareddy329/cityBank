import React from 'react'
import Chart from "react-apexcharts";

const ColumnChart = () => {
    const options={
          
        series: [{
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43]
        }, {
          name: 'PRODUCT D',
          data: [21, 7, 25, 13, 22, 8]
        }],
        options: {
          chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10,
              borderRadiusApplication: 'end', // 'around', 'end'
              borderRadiusWhenStacked: 'last', // 'all', 'last'
              dataLabels: {
                total: {
                  enabled: true,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                }
              }
            },
          },
          xaxis: {
            type: 'datetime',
            categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
              '01/05/2011 GMT', '01/06/2011 GMT'
            ],
          }
        },
      
      
      };
  return (
    <div className='w-full'>
        <Chart
              options={options.options}
              type="bar"
              series={options.series}
              style={{"width":"80%","height":"100%"}}
              
            />
    </div>
  )
}

export default ColumnChart