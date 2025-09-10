import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

const submit = (e) => {
  e.preventDefault();
  console.log("Hello")
  console.log(user);
  setUser('');
}

const [user,setUser] = useState("");

// isntead of changing or sending the value diorectly what we do is 
// two way  binding 
  return (
    <>
    <form onSubmit={(e) =>  submit(e)} action="">
      <input 
      value={user}
      onChange={(e) => {
          setUser(e.target.value);
          console.log(e.target.value)
          console.log("The username is ",user);
      }}
      
      type="text" className='text-white px-3 py-3 rounded-2xl m-2' placeholder='enter your name' />
      <button type='submit'  className='bg-blye-600 px-2 py-2 m-2'>Submit</button>
    </form>

     </>
  )
}

export default App
