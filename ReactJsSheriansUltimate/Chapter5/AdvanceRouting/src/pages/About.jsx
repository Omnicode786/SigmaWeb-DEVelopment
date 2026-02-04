import React from 'react'
import { useNavigate } from 'react-router-dom';
import Home from '../../../react-router-dom/src/pages/Home';

const About = () => {
const navigate = useNavigate();


  const btnClicked = ()=> {
    navigate('/')
    
  }
  return (
    <div>
      <button 
      onClick={btnClicked}
      className='px-4 py-4 bg-red-400 rounded m-2 cursor-pointer active:scale-90'>
      Return to Home Page

      </button>
        <h1>About page</h1>




    </div>
  )
}

export default About