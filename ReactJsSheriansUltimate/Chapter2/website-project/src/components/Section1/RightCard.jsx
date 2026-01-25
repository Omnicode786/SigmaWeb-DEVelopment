import React from 'react'
import RightCardContent from './RightCardContent'

const RightCard = ({ user }) => {
  return (
    <div className='h-full md:h-[34rem] shrink-0 w-72 md:w-80 relative rounded-3xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500 snap-start'>
      <img
        className='h-full w-full object-cover'
        src={user.image}
        alt={`User ${user.id}`}
      />
      <RightCardContent id={user.id} para={user.paragraph} />
    </div>
  )
}

export default RightCard
