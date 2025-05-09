import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const HomepageHero = () => {
  return (
    <>
      <div className="hero">
        <div className="video">
          <video loop autoPlay muted>
            <source src={assets.heroVid} />
          </video>
        </div>
        <div className="overlay"></div>
        <div className="container">
          <div className="content">
            <h2>Journey the Land of Thousand Hills.</h2>
            <p>
              We are a travel agency - based in Rwanda, specialized in tours,
              accommodations, transportations, and hospitality services.
            </p>

            <div className="buttons">
              <Link className="btn">
                <span>Explore Tours</span>
              </Link>
              <Link className="btn1">
                <span>Talk to Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageHero;
