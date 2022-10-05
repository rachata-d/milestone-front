import React, { useState } from "react";
import ListingItem from "../components/ListingItem";
import { useAuth } from "../contexts/authContext";
import ItemCreateToggle from "../features/Items/ItemCreateToggle";
import * as itemService from "../api/itemApi";

function Listing() {
  const { admin } = useAuth();
  const [open, setIsOpen] = useState(false);
  const [item, setItem] = useState([]);

  // TODO create post here

  const createItem = async (input) => {
    try {
      const res = await itemService.createItem(input);
      setItem([res.data.item]);
    } catch (err) {
      console.log(err);
    }
  };

  // TODO send it as prop to item create toggle

  return (
    <>
      {admin && (
        <div className="text-[50px] border-cyan-500">
          <button onClick={() => setIsOpen(true)}>Add</button>
          <ItemCreateToggle
            open={open}
            close={() => setIsOpen(false)}
            createItem={createItem}
          />
        </div>
      )}
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
