import { useState, useCallback } from 'react'

// import { useState } from "react"

// import './App.css'

function App() {

const [length,setLength] = useState(8);
const [numberAllowed,setNumberAllowed] = useState(false);
const [charAllowed,setCharAllowed] = useState(false);
const [Password,setPassword] = useState("");


const passwordGen = useCallback(() => {
let pass = "";
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
if (numberAllowed){
  str += "0123456789";
}
if (charAllowed){
   str += "!@#$%^&*-_+=[]{}~`";
}

for (let index = 1; index <= length; index++) {
  let char = Math.floor(Math.random() *str.length + 1);
  pass += str.charAt(char);

}
setPassword(pass);


}, [length,numberAllowed,charAllowed,setPassword])


  return (
    <>

      <div className='w-full'></div>


    </>
  )
}

export default App
