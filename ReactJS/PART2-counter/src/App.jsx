import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [counter, setCounter] = useState(15);


  // let counter = 15

// now we dont need i t

  const addValue = () => {
    counter = counter + 1;
    console.log("Value added");
    console.log(counter)
    setCounter(counter);

  }
  
  const RemoveValue = () => {
    counter =counter - 1;
    console.log("Value removed");
    console.log(counter)
    setCounter(counter);

  }

  return (
    <>
     <h1>Simple Counter App</h1>
     <h3>Current counter {counter}</h3>
     <button onClick={addValue}>Increase Value</button>
     <button onClick={RemoveValue}>Decrease Value</button>

    </>
  )
}

export default App
