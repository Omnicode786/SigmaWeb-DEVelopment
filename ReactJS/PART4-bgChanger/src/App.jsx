import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
      const [color,setColor] = useState("olive");


  return (


    
    <div className='w-full h-screen duration-200' style={{backgroundColor:color}}> HELLo 
    
    <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>Test
<div className='flex flex-wrap gap-3 justify-center shadow-lg bg-white rounded-lg'>

  <button>Red</button>
</div>

    </div>
    
    
    
    </div>


  
  )
}

export default App
