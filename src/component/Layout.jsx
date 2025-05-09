import React from "react";
import HomeHeader from "./Header";
import { Outlet } from "react-router-dom";
import HomeFooter from "./Footer";

const HomeLayout = () => {
  return (
    <>
      <HomeHeader />
      <Outlet />
      <HomeFooter />
    </>
  );
};

export default HomeLayout;
