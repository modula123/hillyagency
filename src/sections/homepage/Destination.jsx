import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowRoundForward, IoMdArrowForward } from "react-icons/io";
import { destinations } from "../../assets/assets";
import { Link } from "react-router-dom";

const HomepageDestination = () => {
  return (
    <>
      <div className="destinations">
        <div className="container">
          <div className="content">
            <div className="sec-title">
              <div>
                <h1>Popular Destinations</h1>
                <p>Favourite destinations based on customer reviews</p>
              </div>
              <div>
                <Link to={"/destinations"}>
                  <span>View More</span>
                  <span>
                    <FaArrowRightLong />
                  </span>
                </Link>
              </div>
            </div>
            <div className="grids">
              {destinations
                .filter((place) => place.isFeatured)
                .slice(0, 7)
                .map((place, index) => (
                  <div className="grid" key={index}>
                    <div className="img">
                      <img src={place.thumbnail} alt={place.title} />
                    </div>
                    <div className="text">
                      <div>
                        <h3>{place.title}</h3>
                        <p>
                          <span>{place.tours.length}</span> Tours,{" "}
                          <span>{place.activities.length} Activities</span>
                        </p>
                      </div>
                      <div>
                        <Link
                          to={`/destinations/${place.id}-${place.subtitle
                            .toLowerCase()
                            .replace(/ /g, "-")
                            .replace(/[^\w-]+/g, "")}`}
                        >
                          <span>
                            <IoIosArrowRoundForward />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="box">
                <h3>Crafting your perfect travel experience</h3>
                <Link to={"/destinations"}>
                  <div>
                    <h4>Browse</h4>
                    <p>All destinations</p>
                  </div>
                  <div>
                    <span>
                      <IoIosArrowRoundForward />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageDestination;
