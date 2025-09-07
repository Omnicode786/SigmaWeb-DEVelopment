import { useState } from 'react'



function App() {
  // const [count, setCount] = useState(0)
      const [color,setColor] = useState("olive");


  return (


    
    <div className='w-full h-screen duration-200' style={{backgroundColor:color}}>  
    
    <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
<div className='flex flex-wrap gap-3 justify-center shadow-lg bg-white rounded-2xl px-3 py-2'>

  <button 
  onClick={()=> {setColor("red")}}
  className='shadow-2xs bg-red-500 rounded-full outline-none px-4 py-1 text-white'>Red</button>

  <button
  onClick={()=> {setColor("yellow")}}
  className='shadow-2xs bg-yellow-500 rounded-full outline-none px-4 py-1 text-white'>Red</button>
  <button
  onClick={()=> {setColor("green")}}
  className='shadow-2xs bg-green-500 rounded-full outline-none px-4 py-1 text-white'>Red</button>
  <button
  onClick={()=> {setColor("blue")}}
   className='shadow-2xs bg-blue-500 rounded-full outline-none px-4 py-1 text-white'>Red</button>


</div>

    </div>
    
    
    
    </div>


  
  )
}

export default App
