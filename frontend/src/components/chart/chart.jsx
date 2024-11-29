import { useEffect } from "react";

const Chart = (data,labels,backgroundColor,title,type) => {
    useEffect(()=>{
        const data={
            labels:labels,
            datasets:[
                {
                    label:`Biểu đồ ${title}`,
                    data:data,
                    backgroundColor:backgroundColor
                }
            ]
        }
    })
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
      };
    const chart = new Chart(chartRef.current, {
        type: type,
        data: data,
        options: options,
    });
    return (
        <canvas ref={chartRef}/>
    )
}

export default Chart;