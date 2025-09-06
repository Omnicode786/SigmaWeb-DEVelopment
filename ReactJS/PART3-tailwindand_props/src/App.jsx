// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
"use client";


import Card1 from './components/Card1';

import CArd2 from './components/CArd2';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-amber-400 text-black'>Hello World</h1>
      <h3>Prosp makes components reusable</h3>
    <Card1 username = "Muzammil Alam"/>
 <CArd2 username = "Muzammil Alam"/>

   
    </>
  )
}




export default App
