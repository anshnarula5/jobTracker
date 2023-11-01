import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const PieChart = ({data} : any) => {
    console.log(data)
    const series = [...data.map((d:any) => d.count)]
    const [options, setOptions] = useState({
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [...data.map((d:any) => d.status)],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
      
    });
  return (
    <div className=''>
         <ReactApexChart options={options} series={series} type="pie" width={500} />
    </div> 
  )
}

export default PieChart