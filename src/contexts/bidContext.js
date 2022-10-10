import { createContext, useContext, useCallback } from "react";
import * as bidService from "../api/bidApi";

const BidContext = createContext();

function BidContextProvider({ children }) {
  const bidding = async (input) => {
    await bidService.createBid(input);
  };

  const getBid = (id) => bidService.getBid(id);

  return (
    <BidContext.Provider value={{ bidding, getBid }}>
      {children}
    </BidContext.Provider>
  );
}

export const useBid = () => {
  return useContext(BidContext);
};

export default BidContextProvider;
