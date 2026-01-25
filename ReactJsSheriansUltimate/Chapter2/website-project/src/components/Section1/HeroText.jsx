import React from 'react'

const HeroText = () => {
  return (
    <div className="p-5 md:p-10">
      <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-extrabold mb-6">
        Prospective <br />
        <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400 bg-clip-text text-transparent drop-shadow-lg">Customer</span> <br />
        Segmentation
      </h1>
      <p className="text-gray-600 md:text-lg lg:text-xl leading-relaxed">
        Empower your business by understanding and segmenting your audience. Create meaningful experiences that connect, engage, and convert.
      </p>
    </div>
  )
}

export default HeroText
