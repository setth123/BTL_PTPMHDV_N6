import React, { useRef, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";

const ChartComponent = ({ data, labels, backgroundColor, title, type }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data.length || !labels.length) {
      return; 
    }

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: backgroundColor,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth:2,
          pointRadius: 5,
          pointHoverRadius: 12,
          barThickness: 60,
        },
      ],
    };
    const chartType = type === "horizon" ? "bar" : type;

    const options = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: false, 
          },
        }
      },
      ...(chartType === "bar" && type === "horizon" && { indexAxis: "y" }),
    };

    const chartInstance = new ChartJS(chartRef.current, {
      type: chartType, 
      data: chartData,
      options: options,
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data, labels, backgroundColor, title, type]);

  return (
    <div style={{ overflowX: 'auto',width:'3000px', height: '600px' }}>
       <canvas ref={chartRef} />
    </div>
  );
};

export default ChartComponent;
