import axios from "axios";
import { createContext, useCallback, useContext } from "react";

const LotContext = createContext();

function LotContextProvider({ children }) {
  const fetchLot = useCallback(async () => {
    const lotData = await axios.get("/getlot");
    return lotData.data.lots;
  }, []);

  return (
    <LotContext.Provider value={{ fetchLot }}>{children}</LotContext.Provider>
  );
}

export const useLot = () => {
  return useContext(LotContext);
};

export default LotContextProvider;
