import axios from "axios";
import { createContext, useContext, useCallback } from "react";

const ItemContext = createContext();

function ItemContextProvider({ children }) {
  const fetchItem = useCallback(async () => {
    const itemData = await axios.get("/items");
    return itemData.data.items;
  }, []);

  return (
    <ItemContext.Provider value={{ fetchItem }}>
      {children}
    </ItemContext.Provider>
  );
}

export const useItem = () => {
  return useContext(ItemContext);
};

export default ItemContextProvider;
