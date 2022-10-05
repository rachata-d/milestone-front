import React, { useEffect } from "react";
import Modal from "../components/RegisterModal";
// import bgImg from "../public/images/bgimg.png";
import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import ListingItem from "../components/ListingItem";
import { useItem } from "../contexts/itemContext";

function Home() {
  const [item, setItem] = useState([]);
  const { fetchItem } = useItem();

  useEffect(() => {
    const setDisplayItem = async () => {
      try {
        const itemData = await fetchItem();
        setItem(itemData);
      } catch (err) {
        console.log(err);
      }
    };
    setDisplayItem();
  }, []);

  return (
    <>
      <div>
        <div className="bg-[url('public/images/bgimg.png')] bg-cover h-[370px] w-screen"></div>
      </div>
      <div className="grid grid-flow-col grid-cols-4 gap-y-[50px] pl-[80px] pt-[120px]">
        {item?.slice(0, 4).map((item) => (
          <ListingItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default Home;
