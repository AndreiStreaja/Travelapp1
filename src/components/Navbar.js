import React, { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [navIsShown, setnavIsShown] = useState(false);
  const [userPopupVisible, setUserPopupVisible] = useState(false);
  
  const toggleNavIsShown = () => {
    setnavIsShown((navIsShown) => !navIsShown);
  };
  const toggleUserPopup = () => {
    setUserPopupVisible(!userPopupVisible);
  };
  

  const userEmail = localStorage.getItem('userEmail');


  return (
    <nav className="flex justify-between items-center h-20 px-4 fixed top-0 left-0 z-10 w-full text-white" style={{ backgroundColor: "grey" }}>
      <h1>TravelApp</h1>
        <div className="ml-auto">
          <Link to="/register">
            <button type="button" className="btn btn-secondary">Register</button>
          </Link>
        </div>


      <div className="hidden md:flex">
      </div>
  <div className="hidden md:flex items-center">
  <button onClick={toggleUserPopup} className="focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
  </button>
  {userPopupVisible && (
    <div className="absolute top-full right-0 mt-2 bg-gray-100/90 text-black px-4 py-2 rounded-md shadow-md">
      <p>{`Hello, ${userEmail}`}</p>
    </div>
  )}
</div>

    </nav>
  );
};

export default Navbar;
