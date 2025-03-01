import React from "react";
import Loader from "./Loader";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Loader />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
