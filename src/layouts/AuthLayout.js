import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Container from "./Container";

function AuthLayout() {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default AuthLayout;
