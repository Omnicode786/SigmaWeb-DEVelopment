import React from 'react'
import RightCard from './RightCard'

const RightContent = ({ users }) => {
  return (
    <div id='right' className='h-full w-full md:w-3/4 flex overflow-x-auto snap-x snap-mandatory gap-5 py-5 px-2'>
      {users.map(user => (
        <RightCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default RightContent
