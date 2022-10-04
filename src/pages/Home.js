import React from "react";
import Modal from "../components/RegisterModal";
// import bgImg from "../public/images/bgimg.png";
import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import ListingItem from "../components/ListingItem";

function Home() {
  return (
    <>
      <div>
        <div className="bg-[url('public/images/bgimg.png')] bg-cover h-[370px] w-screen"></div>
      </div>
      <div className="grid grid-flow-col grid-cols-4 gap-y-[50px] pl-[80px] pt-[120px]">
        <ListingItem />
        <ListingItem />
        <ListingItem />
        <ListingItem />
      </div>
    </>
  );
}

export default Home;
