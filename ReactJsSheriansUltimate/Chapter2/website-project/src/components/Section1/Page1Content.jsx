import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

const Page1Content = ({ users }) => {
  return (
    <div className='h-[90vh] py-5 flex flex-col md:flex-row justify-between items-center px-5 md:px-16 gap-6'>
      <LeftContent />
      <RightContent users={users} />
    </div>
  )
}

export default Page1Content
