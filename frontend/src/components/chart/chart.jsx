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
          borderColor: backgroundColor,
          pointRadius: 5,
          pointHoverRadius: 12,
          barThickness: 60,         // Kích thước cố định cho các cột (50 pixel hoặc giá trị n mà bạn muốn)
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
          // Bỏ qua categoryPercentage và barPercentage để không thay đổi kích thước cột
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: false, // Không tự động bỏ qua nhãn
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
       <canvas ref={chartRef} height={400} width={0}/>
    </div>
  );
};

export default ChartComponent;
