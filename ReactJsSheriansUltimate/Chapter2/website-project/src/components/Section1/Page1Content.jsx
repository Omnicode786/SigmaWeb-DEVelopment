import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

const Page1Content = () => {
  return (
    <div 
    className='h-[90vh] -am py-5 flex justify-between items-center px-10'
    >
<LeftContent></LeftContent>
<RightContent></RightContent>
    </div>
  )
}

export default Page1Content