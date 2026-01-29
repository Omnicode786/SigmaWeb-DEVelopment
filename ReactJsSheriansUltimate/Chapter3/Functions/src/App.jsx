import { useState, useEffect, useRef } from 'react'
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
const onScroll = () => {
  console.log("YOu are scrolling");

  // the onscroll / on wheel elem
  // can give you the stuff the things like delta y how fast am i scrolling 
  // which page or div am i scrolling on
}




  const mouseRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseRef.current.style.left = e.clientX + "px";
      mouseRef.current.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, []);


  return (
    <>
    <div onWheel={onscroll}>
  <div className='page1'>
     <button onClick={buttonClicked}> Click Me</button>
    <div onMouseEnter={mouseEntered}>Hover your mouse here</div>
    <button onClick={(e) => {
console.log("Hello Guys", e.target);

// the e.target will give me the ting itselg

    }}>This in itself is a function</button>
    <input onChange={(e) => {
      IsChange(e);
    }} style={{backgroundColor: "gray", padding:"10px",borderRadius:"40px", color:"black"}} placeholder='Type here' type="text" name="" id="" />
   
    </div>

   <div className="page2">
      <div
        className={`mouse ${hovered ? "expand" : ""}`}
        ref={mouseRef}
      ></div>

      <div
        className="section1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      ></div>
    </div>
    </div>
  
    </>
  )
}

export default App
