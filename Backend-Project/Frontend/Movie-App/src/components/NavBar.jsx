import React from 'react'
import { Link, useNavigate } from 'react-router'



const NavBar = () => {

  const navigate = useNavigate()
  const Logout = () => {
  
  localStorage.removeItem('token');
  navigate('/login');
  window.location.reload();
}
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <ul className="
        flex items-center gap-8 px-8 py-4 
        bg-blue-500/10 backdrop-blur-xl
        brightness-300 
        border border-white/20 rounded-full 
        shadow-xl text-black font-bold 
        whitespace-nowrap
      ">
  <Link 
           to="/home" 
           className="hover:text-white bg-blue-900/50 hover:shadow-lg nav-link cursor-pointer transition-all"
         >
           Home
         </Link> 
         <Link 
           to="/movies" 
           className="hover:text-white bg-blue-900/50 hover:shadow-lg nav-link cursor-pointer transition-all"
         > 
           Movies
         </Link>
         <Link 
           to="/watchlist" 
           className="hover:text-white bg-blue-900/50 hover:shadow-lg nav-link cursor-pointer transition-all"
         >
           WatchList
         </Link>
        <li>
          <button onClick={Logout} className="bg-blue-600/10 hover:bg-red-900 hover:text-black px-5 py-2 rounded-full transition-all active:scale-95">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar