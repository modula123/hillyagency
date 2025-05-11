import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { destinations } from "../../assets/assets";
import { IoLocationOutline } from "react-icons/io5";
import TourCard from "../../component/reusable/TourCard";

const HomepageTours = () => {
  const filteredTours = destinations
    .flatMap((destination) =>
      (destination.tours || []).map((tour) => ({
        ...tour,
        location: destination.title,
        currency: destination.currency,
      }))
    )
    .filter((tour) => {
      const avgRating =
        tour.reviews && tour.reviews.length
          ? tour.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
            tour.reviews.length
          : 0;
      return avgRating >= 3.5;
    })
    .sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0));

  return (
    <>
      <div className="tour-packages">
        <div className="container">
          <div className="content">
            <div className="sec-title">
              <div>
                <h1>Best Tour Packages</h1>
                <p>Quality as judged by customers. Book at the ideal price!</p>
              </div>
              <div>
                <Link to={"/tours"}>
                  <span>View More</span>
                  <span>
                    <FaArrowRightLong />
                  </span>
                </Link>
              </div>
            </div>
            <div className="contents">
              <div className="boxes">
                {filteredTours.slice(0, 3).map((tour, index) => (
                  <TourCard key={index} tour={tour} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageTours;
