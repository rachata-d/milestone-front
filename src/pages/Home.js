import React from "react";
import Modal from "../components/RegisterModal";
// import bgImg from "../public/images/bgimg.png";
import { useState } from "react";
import { useAuth } from "../contexts/authContext";

function Home() {
  return (
    <div>
      <div className="bg-[url('public/images/bgimg.png')] bg-cover h-[370px] w-screen">
        {/* <img src={bgImg} alt="backgroundImg" /> */}
      </div>
      <div></div>
    </div>
  );
}

export default Home;
