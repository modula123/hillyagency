import React from "react";

import "./../style/homepage.scss";

import HomepageHero from "../sections/homepage/Hero";
import HomepageCta3 from "../sections/homepage/Cta3";
import HomepageBlog from "../sections/homepage/Blog";
import HomepageBrands from "../sections/homepage/Brands";
import HomepageTestimony from "../sections/homepage/Testimony";
import HomepageRecommended from "../sections/homepage/Recommended";
import HomepageCta2 from "../sections/homepage/Cta2";
import HomepageHotels from "../sections/homepage/Hotels";
import Homepage4Cta from "../sections/homepage/Cta1";
import HomepageTours from "../sections/homepage/Tours";
import HomepageDestination from "../sections/homepage/Destination";

const Homepage = () => {
  return (
    <>
      <div className="homepage">
        <HomepageHero />
        <HomepageDestination />
        <HomepageTours />
        <Homepage4Cta />
        <HomepageHotels />
        <HomepageCta2 />
        <HomepageRecommended />
        <HomepageTestimony />
        <HomepageBrands />
        <HomepageBlog />
        <HomepageCta3 />
      </div>
    </>
  );
};

export default Homepage;
