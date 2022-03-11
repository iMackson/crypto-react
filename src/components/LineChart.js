import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
//import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);





export function LineChart({coinId, labels, priceData}) {

    const options = {
        responsive: true,
        plugins: {
          legend: {
              position: 'top',
            },    
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      
      //const labels = labels//['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
    const blueTheme = {
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
    const redTheme = {
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }


    const data = {
        labels,
        datasets: [
          {
            label: `Price for ${coinId}`,
            data: priceData, //labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: priceData[priceData.length - 1] > priceData[0] ? (blueTheme.borderColor) : (redTheme.borderColor),
            backgroundColor: priceData[priceData.length - 1] > priceData[0] ? (blueTheme.backgroundColor) : (redTheme.backgroundColor),
          },
        ],
      };

  return (
    <div>
        <Line options={options} data={data} />
    </div>
  )
}
