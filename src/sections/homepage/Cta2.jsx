import React from "react";
import { assets } from "../../assets/assets";
import { IoPlay } from "react-icons/io5";

const HomepageCta2 = () => {
  return (
    <>
      <div className="homepage-cta2">
        <div className="container">
          <div className="content">
            <div className="numbers">
              <div className="div">
                <h3>1k+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="div">
                <h3>25+</h3>
                <p>Guided Tours</p>
              </div>
              <div className="div">
                <h3>100+</h3>
                <p>Hotels & Stays</p>
              </div>
              <div className="div">
                <h3>50+</h3>
                <p>Organized Events</p>
              </div>
              <div className="div">
                <h3>95%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
            <div className="video">
              <button><IoPlay/></button>
              <img src={assets.thumbnail} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageCta2;
