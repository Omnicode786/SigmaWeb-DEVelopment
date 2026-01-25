import React from 'react'
import { RiArrowRightUpLine } from "@remixicon/react";

const RightCardContent = ({ id, para }) => {
  return (
    <div className='absolute bottom-0 left-0 w-full p-6 backdrop-blur-xs bg-black/40 text-white flex flex-col justify-between h-full'>
      <h2 className='bg-white text-black rounded-full w-12 p-2 text-center font-semibold'>{id}</h2>
      <p className='text-lg leading-snug mt-3'>{para}</p>
      <div className='flex gap-3 mt-5'>
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-full transition-colors duration-300'>Satisfied</button>
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-2 rounded-full transition-colors duration-300 flex items-center justify-center'>
          <RiArrowRightUpLine size={20}/>
        </button>
      </div>
    </div>
  )
}

export default RightCardContent
