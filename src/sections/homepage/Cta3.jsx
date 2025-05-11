import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { LuVoicemail } from "react-icons/lu";

const HomepageCta3 = () => {
  return (
    <>
      <div className="home-cta3">
        <div className="container">
          <div className="content">
            <div className="img">
              <img src={assets.canopy} alt="Canopy" />
            </div>
            <div className="text">
              <h3>Travel to Make Memories That Last</h3>
              <p>
                Every journey is story - allow us to craft extraordinary
                experience across Rwanda
              </p>
              <Link to={"/contact"}>
                <span>
                  <LuVoicemail />
                </span>
                <span>Book a Call</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageCta3;
