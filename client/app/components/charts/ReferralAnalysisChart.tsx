import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const ReferralAnalysisChart = ({data} : any) => {
    console.log(data)
    const series = [data.successfulCount, data.unsuccessfulCount]
    const [options, setOptions] = useState({
      chart: {
        width: 380,
        type: "donut",
      },
      labels: ["successfulCount", "unsuccessfulCount"],
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
    <div>
         <ReactApexChart options={options} series={series} type="pie" width={380} />
    </div> 
  )
}

export default ReferralAnalysisChart