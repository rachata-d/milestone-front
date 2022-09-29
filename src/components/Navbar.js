import React from "react";
import { Link } from "react-router-dom";
import logo from "../public/images/Mile-Logo.png";

function Navbar() {
  return (
    <nav className="flex justify-between gap-5 shadow-lg bg-gray-100">
      <Link to="/">
        <div className="w-[120px] h-[80px] mx-4">
          <img src={logo} alt="Mile-Logo"></img>
        </div>
      </Link>
      <div className="flex gap-20 items-center px-4">
        <Link to="/">Home</Link>
        <Link to="/listing">Listings</Link>
        <Link>Register</Link>
        <Link>Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
