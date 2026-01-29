import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState()

const [title, settitle] = useState('')

const submitHandeler = (form) => {
form.preventDefault();

  console.log("The form was submited if we directly put it then form submits really quicly and reloads and re renders so we see this log but then vanishes too quickly")

  // form has default behaviour

}



  return (
    <>
    {/* <form onSubmit={submitHandeler}>
      <input type = "text " placeholder = "Enter your name"/> 
      <button>
        Submit
        
      </button>
       </form> */}


{/* the above is default */}
    <form onSubmit={(form) => {
// form.preventDefault();
    // can be done here as well 
    submitHandeler(form);
    }}>
      <input type = "text " placeholder = "Enter your name"/> 
    {/* two way binding */}
    {/* concept in react */}

{/* aik teer se do nishane */}
<input type="text"
 name="" 
 placeholder='Enter your name'
onChange={(e) => {
  console.log("Inputing");
console.log(e.target.value);
settitle(e.target.value);


// we want react to do this stuff 
// this is all what two way binding is 
// if there is something else then add here
// 
}}

 id="" />

      <button>
        Submit
        
      </button>
       </form>


    </>
  )
}

export default App
