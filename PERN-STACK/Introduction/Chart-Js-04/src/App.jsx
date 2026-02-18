import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LineGraph } from './components/LineGraph.jsx';
import BarChart from './components/BarChart.jsx';
import PieChart from './components/PieChart';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div>My Chart App</div>
   <div className='container'>
   <LineGraph/>
   </div>
   <div className='container'>
<BarChart/>

   </div>
   <div className='container'>
    <PieChart/>
   </div>
    </>
  )
}

export default App
