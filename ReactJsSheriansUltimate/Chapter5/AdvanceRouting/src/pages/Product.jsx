import React from "react";
import { NavLink, Outlet } from 'react-router-dom';

const Product = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">

      <p className="text-gray-400">
        Explore premium collections for everyone.
      </p>
      <div className="flex gap-6">
        <NavLink to="men">Men</NavLink>
        <NavLink to="women">Women</NavLink>
      </div>
</div>
      

      {/* Child pages render here */}
      <Outlet />
    </div>
  );
};


export default Product