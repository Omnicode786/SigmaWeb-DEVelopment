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
        bg-blue-500/60 backdrop-blur-sm
        brightness-110 
        border border-white/20 rounded-full 
        shadow-xl text-white font-bold 
        whitespace-nowrap
      ">
  <Link 
           to="/watchlist" 
           className="hover:text-blue-800 hover:shadow-lg nav-link cursor-pointer transition-colors"
         >
           Home
         </Link>         <Link 
           to="/movies" 
           className="hover:text-blue-800 hover:shadow-lg nav-link cursor-pointer transition-colors"
         >
           Movies
         </Link>
         <Link 
           to="/watchlist" 
           className="hover:text-blue-800 hover:shadow-lg nav-link cursor-pointer transition-colors"
         >
           WatchList
         </Link>
        <li>
          <button onClick={Logout} className="bg-blue-600/90 hover:bg-blue-900 px-5 py-2 rounded-full transition-all active:scale-95">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar