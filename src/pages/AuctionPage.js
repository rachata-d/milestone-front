import React, { useEffect, useState } from "react";
import { useLot } from "../contexts/lotContext";
import * as lotService from "../api/lotApi";
import { useAuth } from "../contexts/authContext";

function AuctionPage() {
  const { fetchLot } = useLot();
  const [lot, setLot] = useState();
  const [input, setInput] = useState({});
  const { admin } = useAuth();

  useEffect(() => {
    const setDisplayLot = async () => {
      try {
        const lotData = await fetchLot();
        setLot(lotData);
        setInput({ id: lotData.id, status: lotData.status });
      } catch (err) {
        // console.log(err);
      }
    };
    setDisplayLot();
    // console.log(lot);
  }, [fetchLot]);
  // console.log(lot);

  const handleSelect = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await lotService.updateLot(input);
  };

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
              <img src={lot?.Item.picture} alt="Item" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2"></div>
                <p className="text-[20px] font-bold">{lot?.Item.name}</p>
                <p className="text-gray-700 text-base">{lot?.description}</p>
              </div>
            </div>
          </div>
          <div>
            {admin ? (
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleOnSubmit}
              >
                <label htmlFor="status">Status:</label>
                <select
                  name="status"
                  id="status"
                  value={input.status}
                  onChange={handleSelect}
                >
                  <option value=""></option>
                  <option value="Bidding Closed">Bidding Closed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Pending">Pending</option>
                </select>
                <div>
                  <button
                    type="submit"
                    className="inline-block bg-blue-500 rounded-full px-3 py-1 text-xl font-semibold text-white mr-2 mb-2"
                  >
                    Submit
                  </button>
                </div>
                <div className="px-6 pt-4 pb-2 flex justify-center"></div>
              </form>
            ) : null}
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-6">
                <p>Auction Start:</p> <br /> <p>Auction End:</p>
              </div>
              <div>Starting Bid:</div>
              <br />
              <div className="mb-4">Current Bid:</div>
              <p>Status: {lot.status}</p>
              <button className="inline-block bg-blue-500 rounded-full px-3 py-1 text-xl font-semibold text-white mr-2 mb-2">
                Place Bid
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AuctionPage;
