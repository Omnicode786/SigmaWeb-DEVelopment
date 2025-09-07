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

      <div className='w-full max-w-md mx-auto shadow-md px-4 my-8 rounded-lg text-orange-600 bg-gray-500 text-center'>test</div>
      <div className='w-full max-w-md mx-auto shadow-md px-4 my-8 rounded-lg text-orange-600 bg-gray-500 text-center'>
      <input type="text"
      value = {Password} 
      className='outline-none w-full py-1 px-3' />




      </div>



    </>
  )
}

export default App
