import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/authContext";
import ItemContextProvider from "./contexts/itemContext";
import LotContextProvider from "./contexts/lotContext";
import BidContextProvider from "./contexts/bidContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ItemContextProvider>
        <LotContextProvider>
          <BidContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </BidContextProvider>
        </LotContextProvider>
      </ItemContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
