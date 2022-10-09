import React, { useEffect, useState } from "react";
import { useLot } from "../contexts/lotContext";

function AuctionPage() {
  const { fetchLot } = useLot();
  const [lot, setLot] = useState();

  useEffect(() => {
    const setDisplayLot = async () => {
      try {
        const lotData = await fetchLot();
        // console.log(lotData);
        setLot(lotData);
      } catch (err) {
        // console.log(err);
      }
    };
    setDisplayLot();
    // console.log(lot);
  }, []);
  // console.log(lot);

  return (
    <>
      <div className="flex justify-center text-[45px] pb-8">
        Ongoing Auction
      </div>
      {lot ? (
        <div className="flex justify-center gap-[200px]">
          <div className=" flex justify-center items-center">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="text-[30px] text-center font-bold">
                {lot?.name}
              </div>
              <img src={lot?.Item.picture} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2"></div>
                <p className="text-[20px] font-bold">{lot?.Item.name}</p>
                <p className="text-gray-700 text-base">{lot?.description}</p>
              </div>
            </div>
          </div>
          <div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-6">
                <p>Auction Start:</p> <br /> <p>Auction End:</p>
              </div>
              <div>Starting Bid:</div>
              <br />
              <div className="mb-4">Current Bid:</div>
              <div className="px-6 pt-4 pb-2 flex justify-center">
                <button className="inline-block bg-blue-500 rounded-full px-3 py-1 text-xl font-semibold text-white mr-2 mb-2">
                  Place Bid
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AuctionPage;
