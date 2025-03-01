import React from "react";
import Homehero from "../homepage/Hero";
import HomeDestinations from "../homepage/Destinations";
import Home2CTAs from "../homepage/Cta1";
import HomeTourPackages from "../homepage/Tours";
import HomeBookingCTA from "../homepage/Cta2";
import HomeStays from "../homepage/Accomodations";
import HomeChooseUs from "../homepage/Why";
import HomeDiscountedPackages from "../homepage/Discounted";
import HomeTakeAction from "../homepage/Action";

import './../style/home.scss'

const Homepage = () => {
  return (
    <>
      <div className="homepage">
        <Homehero />
        <HomeDestinations />
        <Home2CTAs />
        <HomeTourPackages />
        <HomeBookingCTA />
        <HomeStays />
        <HomeChooseUs />
        <HomeDiscountedPackages />
        <HomeTakeAction />
      </div>
    </>
  );
};

export default Homepage;
