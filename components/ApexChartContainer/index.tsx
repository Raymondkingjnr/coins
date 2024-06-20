import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface OHLCData {
  x: number;
  y: string[];
}

interface ApexChartComponentProps {
  ohlcData: OHLCData[];
}

const ApexChartComponent: React.FC<ApexChartComponentProps> = ({
  ohlcData,
}) => {
  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "Candlestick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00B746", // Color for bullish candles
          downward: "#EF403C", // Color for bearish candles
        },
      },
    },
  };

  const series = [
    {
      name: "candlestick",
      data: ohlcData,
    },
  ];

  return (
    <div className=" w-full pt-6" id="chart">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={400}
      />
    </div>
  );
};

export default ApexChartComponent;
