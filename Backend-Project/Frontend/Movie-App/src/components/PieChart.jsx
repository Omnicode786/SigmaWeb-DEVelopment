import React from 'react'
import { Chart as ChartJS,

    Tooltip,
    Legend,
    ArcElement
 } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { PieChartData } from './data'


ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
)

const options = {};
const data = PieChartData;
const PieChart = () => {
    return <>
    <Pie data={data} options={options}/>
    </>
}

export default PieChart