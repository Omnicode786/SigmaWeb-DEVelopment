
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS,
     CategoryScale, 
     LinearScale,
       BarElement
,Title,
Tooltip,
Legend

  } from 'chart.js';
import { barChartData} from './data';


  ChartJS.register(
   CategoryScale, 
     LinearScale,
       BarElement,
       Title,
       Tooltip,
       Legend
  )
  const options = {}
  const data = barChartData;
export const BarChart = () => {
  return (
   <>
   <Bar options={options} data={data}/>
   </>
  )
}

export default BarChart