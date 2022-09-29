import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import Listing from "../pages/Listing";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
      </Route>
    </Routes>
  );
}

export default Router;
