
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS,
     CategoryScale, 
     LinearScale,
      PointElement,
       LineElement
,Title,
Tooltip,
Legend

  } from 'chart.js';
import { lineChartData } from './data';


  ChartJS.register(
   CategoryScale, 
     LinearScale,
      PointElement,
       LineElement,
       Title,
       Tooltip,
       Legend
  )

export const LineGraph = () => {

    const options = {
responsive: true,
plugins: {
  legend: {
    position: "bottom"
  },
  title: {
    display: true,
    text: "This is what options can do",
    color: "lightblue"
  }
}

    };
    const data = lineChartData
    return <> <Line options={options} data={data} /> </>;
}