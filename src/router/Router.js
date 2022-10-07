import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AdminLogin from "../pages/AdminLogin";
import AuctionPage from "../pages/AuctionPage";
import Home from "../pages/Home";
import Listing from "../pages/Listing";
import Profile from "../pages/Profile";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/adminextralogin" element={<AdminLogin />} />
        <Route path="/auction" element={<AuctionPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
