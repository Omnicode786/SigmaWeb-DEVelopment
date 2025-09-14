
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo / Name */}
          <h2 className="text-2xl font-extrabold text-amber-500 cursor-pointer tracking-wide hover:text-amber-600 transition-colors duration-300">
            Muzammil Alam
          </h2>



{/* if we are routing and we add a tags then it will show us a reload instead use links */}

          {/* Nav Links */}
          <ul className="flex gap-8 text-gray-700 font-medium">
            <li className="hover:text-amber-500 transition-colors duration-300 cursor-pointer">
              {/* <a href="/">Home</a> */}
              <Link to='/'>Home</Link>
            </li>
            <li className="hover:text-amber-500 transition-colors duration-300 cursor-pointer">
                          {/* <a href="/about">About us</a> */}
              <Link to='/about'>About us</Link>

            </li>
            <li className="hover:text-amber-500 transition-colors duration-300 cursor-pointer">
                            {/* <a href="/contact">Contact us</a> */}
              <Link to='/contact'>Contact us</Link>

            </li> <li className="hover:text-amber-500 transition-colors duration-300 cursor-pointer">
                            {/* <a href="/product">Products</a> */}
              <Link to='/product'>Products</Link>

            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
