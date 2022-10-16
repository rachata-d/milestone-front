import React, { useEffect, useState } from "react";
import { useLot } from "../contexts/lotContext";
import * as lotService from "../api/lotApi";
import { useAuth } from "../contexts/authContext";
import dateFormat from "dateformat";
import { useBid } from "../contexts/bidContext";
import Countdown from "react-countdown";

function AuctionPage() {
  const { fetchLot } = useLot();
  const [lot, setLot] = useState();
  const [input, setInput] = useState({});
  const [bids, setBids] = useState("");
  const { admin, user } = useAuth();
  const { bidding, getBid } = useBid();
  // const [currentBid, setCurrentBid] = useState();
  const [highestBid, setHighestBid] = useState();
  const [dream, setDream] = useState(false);

  let auctionDateStartHandler = "";
  if (lot) {
    auctionDateStartHandler = dateFormat(
      lot.auctionStart,
      "ddd dd/mm/yyyy HH:mm"
    );
  }
  let auctionDateEndHandler = "";
  if (lot) {
    auctionDateEndHandler = dateFormat(lot.auctionEnd, "ddd dd/mm/yyyy HH:mm");
  }

  useEffect(() => {
    const setDisplayLot = async () => {
      try {
        const lotData = await fetchLot();
        setLot(lotData.lots);
        setHighestBid(lotData.highestBid);
        setInput({ id: lotData.lots.id, status: lotData.status });
      } catch (err) {
        console.log(err);
      }
    };
    setDisplayLot();
  }, [fetchLot, dream]);

  // const currentBids = async (id) => {
  //   const res = await getBid(id);
  //   setCurrentBid(res.data);
  // };
  // useEffect(() => {
  //   if (lot) currentBids(lot?.id);
  // }, []);

  const handleSelect = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await lotService.updateLot(input);
  };

  const handleBidInput = async (e) => {
    setBids(e.target.value);
  };

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    await bidding({ bids, lotId: input?.id, userId: user?.id });
    setDream((prev) => !prev);
    setBids("");
  };

  const statusColor = {
    Pending: "text-orange-400",
    Ongoing: "text-green-500",
    "Bidding Closed": "text-red-600",
  };

  const onComplete = async () => {
    try {
      await lotService.updateLot({ ...input, status: "Bidding Closed" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center text-[45px] pb-8 font-bebas">
        Auctions
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
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 font-bebas"
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
                    className="inline-block bg-blue-500 rounded-full px-3 py-1 text-xl font-semibold text-white mr-2 mb-2 font-bebas"
                  >
                    Submit
                  </button>
                </div>
                <div className="px-6 pt-4 pb-2 flex justify-center"></div>
              </form>
            ) : null}
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 font-bebas">
              {lot.status === "Ongoing" ? (
                <div className="pb-4">
                  Time remaining:{" "}
                  <Countdown
                    date={lot?.auctionEnd}
                    onComplete={onComplete}
                    className="text-red-500"
                  />
                </div>
              ) : (
                <div className="mb-6">
                  <p>Auction Start: {auctionDateStartHandler}</p> <br />
                  <p>Auction End: {auctionDateEndHandler}</p>
                </div>
              )}
              <div>Starting Bid: ${lot.startingBid}</div>
              <br />
              <div className="mb-4">Current Bid: ${highestBid}</div>
              <p>
                Status:{" "}
                <span className={`${statusColor[lot.status]}`}>
                  {lot.status}
                </span>
              </p>
              {lot.status === "Ongoing" ? (
                <div className="flex gap-6 items-center">
                  <input
                    type="text"
                    placeholder="Your bid"
                    className="border-2 border-blue-500 outline-yellow-500 text-center h-[36px]"
                    value={bids}
                    onChange={handleBidInput}
                  />
                  <button
                    className="bg-blue-500 rounded-lg px-3 py-1 text-xl font-semibold text-white mr-2 font-bebas h-[36px]"
                    onClick={handleSubmitBid}
                  >
                    Place Bid
                  </button>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AuctionPage;
