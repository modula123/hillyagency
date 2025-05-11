import React from "react";
import { destinations } from "../../assets/assets";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import TourCard from "../../component/reusable/TourCard";

const HomepageHotels = () => {
  const filteredHotels = destinations
    .flatMap((destination) =>
      (destination.hotels || []).map((hotel) => ({
        ...hotel,
        location: destination.title,
        currency: destination.currency,
      }))
    )
    .filter((hotel) => {
      const avgRating =
        hotel.reviews && hotel.reviews.length
          ? hotel.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
            hotel.reviews.length
          : 0;
      return avgRating >= 3;
    })
    .sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0));

  return (
    <>
      <div className="tour-packages">
        <div className="container">
          <div className="content">
            <div className="sec-title">
              <div>
                <h1>Top Rated Hotels</h1>
                <p>Quality as judged by customers. Book at the ideal price!</p>
              </div>
              <div>
                <Link to={"/hotels"}>
                  <span>View More</span>
                  <span>
                    <FaArrowRightLong />
                  </span>
                </Link>
              </div>
            </div>
            <div className="contents">
              <div className="boxes">
                
                {filteredHotels.length < 1 ? (
                  <div className="no-result">
                    <p>No top rated hotels available for a moment.</p>
                  </div>
                ) : (
                  filteredHotels
                    .slice(0, 3)
                    .map((hotel, index) => (
                      <TourCard key={index} tour={hotel} />
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageHotels;
