import React from "react";
import { Link } from "react-router-dom";
import logo from "../public/images/manewlogo.png";
import LoginModal from "./LoginModal";
import Modal from "./RegisterModal";
import { useState } from "react";
import { useAuth } from "../contexts/authContext";

function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { user, logout, admin } = useAuth();

  return (
    <div>
      <nav className="flex justify-between gap-5 shadow-lg bg-gray-100">
        <Link to="/">
          <div className="pt-4 w-[120px] h-[80px] mx-4">
            <img src={logo} alt="Mile-Logo"></img>
          </div>
        </Link>
        <div className="flex gap-20 items-center px-4 font-serif font-medium">
          <Link to="/" className="md:hover:text-blue-600">
            Home
          </Link>
          <Link to="/listing" className="md:hover:text-blue-600">
            Listings
          </Link>
          {user || admin ? (
            <div>
              <Link to="/user" className="md:hover:text-blue-600">
                Profile
              </Link>
              {admin && (
                <Link className="md:hover:text-blue-600 pl-14">Edit</Link>
              )}
              <Link className="md:hover:text-red-600 pl-20" onClick={logout}>
                Logout
              </Link>
            </div>
          ) : (
            <div>
              <Link
                className="md:hover:text-blue-600"
                onClick={() => setRegisterOpen(true)}
              >
                Register
              </Link>
              <Link
                className="md:hover:text-blue-600 ml-20"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </Link>
            </div>
          )}

          <Modal open={registerOpen} close={() => setRegisterOpen(false)} />
          <LoginModal open={loginOpen} close={() => setLoginOpen(false)} />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
