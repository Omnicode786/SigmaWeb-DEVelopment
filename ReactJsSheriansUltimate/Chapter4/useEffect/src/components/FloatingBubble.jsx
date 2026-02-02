import React from 'react'

const FloatingBubble = ({ info, delay, onClick }) => {

      return (
    <div 
      onClick={onClick}
      className={`absolute w-24 h-24 ${info.color} rounded-full flex items-center justify-center text-4xl cursor-pointer shadow-lg border-4 border-white animate-float hover:scale-125 transition-transform z-20`}
      style={{ 
        left: `${15 + (info.id * 15)}%`, 
        top: `${20 + (info.id * 5)}%`,
        animationDelay: `${delay}s`
      }}
    >
      {info.icon}
    </div>
  
  )
}

export default FloatingBubble