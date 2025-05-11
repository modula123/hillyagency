import React from "react";
import { assets } from "../../assets/assets";

const Homepage4Cta = () => {
  return (
    <>
      <div className="homepage-cta1">
        <div className="container">
          <div className="content">
            <div className="destination grid">
              <img src={assets.cta1bag} alt="" />
              <div className="text">
                <h4>62+ Destinations</h4>
                <p>Our expert team handpicked all destinations in this site.</p>
              </div>
            </div>
            <div className="support grid">
              <img src={assets.cta1support} alt="" />
              <div className="text">
                <h4>Great 24/7 Support</h4>
                <p>
                  We are here to help before, during, and even after your trip.
                </p>
              </div>
            </div>
            <div className="price grid">
              <img src={assets.cta1price} alt="" />
              <div className="text">
                <h4>Best Price</h4>
                <p>Price match within 48 hours of order confirmation</p>
              </div>
            </div>
            <div className="book grid">
              <img src={assets.cta1book} alt="" />
              <div className="text">
                <h4>Fast Booking</h4>
                <p>Suce booking and payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage4Cta;
