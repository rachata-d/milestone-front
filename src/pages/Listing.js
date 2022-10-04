import React from "react";
import ListingItem from "../components/ListingItem";

function Listing() {
  return (
    <>
      <div className="grid grid-flow-col grid-cols-4 grid-rows-2 gap-y-[50px] pl-[80px] pt-[25px]">
        <ListingItem />
        <ListingItem />
        <ListingItem />
        <ListingItem />
        <ListingItem />
        <ListingItem />
        <ListingItem />
        <ListingItem />
      </div>
    </>
  );
}

export default Listing;
