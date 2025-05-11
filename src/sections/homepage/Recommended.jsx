import React, { useState } from "react";
import { LuHotel } from "react-icons/lu";
import { assets, destinations } from "../../assets/assets";
import { IoIosRestaurant } from "react-icons/io";
import { IoCarSportOutline } from "react-icons/io5";
import { MdOutlineBedroomParent, MdOutlineTour } from "react-icons/md";
import { MdOutlineLocalActivity } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import TourCard from "../../component/reusable/TourCard";

const TABS = [
  { key: "hotels", label: "Hotel", icon: <LuHotel /> },
  { key: "tours", label: "Tours", icon: <MdOutlineTour /> },
  { key: "activities", label: "Activities", icon: <MdOutlineLocalActivity /> },
  { key: "rentals", label: "Homes", icon: <MdOutlineBedroomParent /> },
  { key: "transport", label: "Transports", icon: <IoCarSportOutline /> },
  { key: "restaurants", label: "Restaurants", icon: <IoIosRestaurant /> },
];

const HomepageRecommended = () => {
  const [activeTab, setActiveTab] = useState("hotels");

  const filtered = {
    hotels: destinations
      .flatMap((destination) =>
        (destination.hotels || []).map((hotel) => ({
          ...hotel,
          location: destination.title,
          currency: destination.currency,
        }))
      )
      .filter((hotel) => hotel.isFeatured),
    tours: destinations
      .flatMap((destination) =>
        (destination.tours || []).map((tour) => ({
          ...tour,
          location: destination.title,
          currency: destination.currency,
        }))
      )
      .filter((tour) => tour.isFeatured),
    activities: destinations
      .flatMap((destination) =>
        (destination.activities || []).map((activity) => ({
          ...activity,
          location: destination.title,
          currency: destination.currency,
        }))
      )
      .filter((activity) => activity.isFeatured),
    restaurants: destinations
      .flatMap((destination) =>
        (destination.restaurants || []).map((resto) => ({
          ...resto,
          location: destination.title,
          currency: destination.currency,
        }))
      )
      .filter((resto) => resto.isFeatured),
    rentals: destinations
      .flatMap((destination) =>
        (destination.rentals || []).map((rent) => ({
          ...rent,
          location: destination.title,
          currency: destination.currency,
        }))
      )
      .filter((rent) => rent.isFeatured),
    transport: destinations
      .flatMap((destination) =>
        (destination.transport || []).map((car) => ({
          ...car,
          location: destination.title,
          currency: destination.currency,
        }))
      )
      .filter((car) => car.isFeatured),
  };

  const currentList = filtered[activeTab] || [];

  return (
    <div className="home-recommended">
      <div className="container">
        <div className="content">
          <div className="sec-title">
            <div>
              <h1>Recommended for You</h1>
              <div className="tabs">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    className={`tab${activeTab === tab.key ? " active" : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
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
          <div className="boxes">
            {currentList.length > 0 ? (
              currentList
                .slice(0, 6)
                .map((item, index) => <TourCard key={index} tour={item} />)
            ) : (
              <div className="no-result">
                <p>Nothing for a moment/yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageRecommended;
