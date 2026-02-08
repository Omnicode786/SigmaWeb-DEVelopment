import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='flex  justify-between items-center w-full'>
           {/* Header */}
      <h1 className="text-4xl w-95 text font-bold mb-6 text-emerald-400">
        Media Explorer
      </h1>
      <div className="flex w-full text-xl gap-5  justify-end items-center">
    <Link className="text-white font-semibold" to={'/'}>Home</Link>
      <Link to={'/collection'} className="text-white font-semibold">Collections</Link>

      </div>
  
    </div>
  )
}

export default NavBar