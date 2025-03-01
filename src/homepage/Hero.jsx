import React from "react";
import { homeHero } from "../assets/assets";
import SearchBox from "../component/SearchBox";

const Homehero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-container">
          <div className="img">
            <img src={homeHero.thumbnail} />
          </div>

          <div className="content">
            <div className="text">
              <h2>{homeHero.title}</h2>
              <p>{homeHero.descr} </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content">
            <div className="search">
              <SearchBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homehero;
