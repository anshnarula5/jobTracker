import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const FunnelChart = ({data} : any) => {
  const [series] = useState([
    {
      name: "Funnel Series",
      data: [...data.map((d:any) => d.count)],
    },
  ]);
  const [options] = useState({
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        barHeight: '80%',
        isFunnel: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
      },
      dropShadow: {
        enabled: true,
      },
    },
    title: {
      text: 'Recruitment Funnel',
      align: 'middle',
    },
    xaxis: {
      categories: [...data.map((d:any) => d.status)],
    },
    legend: {
      show: false,
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default FunnelChart;
