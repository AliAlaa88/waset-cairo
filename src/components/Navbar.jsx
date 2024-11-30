import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Left Section with Icon */}
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/40"
          alt="Icon"
          className="h-10 w-10 rounded-full"
        />
      </div>

      {/* Centered Tabs */}
      <ul className="flex justify-center space-x-6 w-full text-2xl">
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          <Link to="/home">Home</Link>
        </li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          <Link to="/home/tour-packs">Tour Packages</Link>
        </li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          <Link to="/home/events">Events</Link>
        </li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          <Link to="/home/monuments">Monuments</Link>
        </li>
      </ul>

      {/* Right Section with Profile Link */}
      <div className="w-20 text-gray-700 hover:text-blue-500">
        <Link to="/profile">My profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
