import React from 'react'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between px-16 py-4'>
        <h4 className='bg-black uppercase text-white px-6 py-2 rounded-full'>
            Target Audience
        </h4>
        <button
        className='bg-gray-200 px-6 py-2 uppercase tracking-wider text-sm rounded-full'
        >
            Digital Banking Platform
        </button>
    </div>
  )
}

export default NavBar