import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


function buttonClicked(){
  console.log("The button was clicked");
}
function mouseEntered(){
  console.log("The mouse was entered")
}
const IsChange =  (e) => {
console.log("The input is changing")
console.log("The value is: ", e.target.value)
    }

  return (
    <>
     <button onClick={buttonClicked}> Click Me</button>
    <div onMouseEnter={mouseEntered}>Hover your mouse here</div>
    <button onClick={(e) => {
console.log("Hello Guys", e.target);

// the e.target will give me the ting itselg

    }}>This in itself is a function</button>
    <input onChange={(e) => {
      IsChange(e);
    }} style={{backgroundColor: "gray", padding:"10px",borderRadius:"40px", color:"black"}} placeholder='Type here' type="text" name="" id="" />
   
   
    </>
  )
}

export default App
