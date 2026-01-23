import React from 'react'

function Navbar() {
  return (
    <>
     <nav
      className="
        w-[60%] max-w-4xl h-16
        flex items-center justify-between px-10
        rounded-2xl

        bg-blue-400/10
        backdrop-blur-xl
        border border-blue-300/20
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
      "
    >
      <ul className="flex gap-10 w-full justify-between text-black-100 font-medium">
        <li className="cursor-pointer nav-list hover:text-blue-400 transition duration-300">
          Home
        </li>
        <li className="cursor-pointer nav-list hover:text-blue-400 transition duration-300">
          About
        </li>
        <li className="cursor-pointer nav-list hover:text-blue-400 transition duration-300">
          Services
        </li>
        <li className="cursor-pointer nav-list hover:text-blue-400 transition duration-300">
          Contact
        </li>
      </ul>
    </nav>

    </>
  )
}

export default Navbar