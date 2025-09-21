import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { destinations } from "../assets/assets";

import GeneralCard from "../component/reusable/GeneralCard";
import "./../style/destination.scss";

const tabs = [
  { key: "tours", label: "Tours", url: "tours" },
  { key: "activities", label: "Activities", url: "tours" },
  { key: "hotels", label: "Hotels", url: "tours" },
  { key: "restaurants", label: "Restaurants", url: "resta" },
  { key: "transport", label: "Cars", url: "car" },
  { key: "rentals", label: "Rentals", url: "accomodation" },
];

const SingleDestinationPage = () => {
  const { idSlug } = useParams();

  const [id, ...slugParts] = idSlug.split("-");
  const slug = slugParts.join("-");

  const destination = destinations.find((place) => place.id === id);

  if (!destination) {
    return <div className="container">Destination not found.</div>;
  }

  const [activeTab, setActiveTab] = useState("tours");

  return (
    <div className="single-destination-page">
      <div className="hero">
        <img src={destination.thumbnail} alt={destination.title} />
        <div className="overshad"></div>
        <div className="overlay">
          <h1>{destination.title}</h1>
          <p>{destination.bio}</p>
        </div>
      </div>

      <div className="container">
        <div className="single_destination_content">
          <div className="main_contents">
            <section className="intro">
              <div
                dangerouslySetInnerHTML={{ __html: destination.description }}
              />
            </section>

            <section className="tab_contents">
              <div className="tab_title">
                <h2>{tabs.find((tab) => tab.key === activeTab)?.label}</h2>
              </div>
              <div className="tab_cards_grid">
                {destination[activeTab]?.map((item) => (
                  <GeneralCard
                    key={item.id || item.carId}
                    data={item}
                    type={activeTab}
                  />
                )) || (
                  <div className="no_tab_content">
                    <p>No data available.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
          <div className="destination_sidebar">
            <div className="destination_box">
              <h3>{destination.title}</h3>
              <ul>
                {tabs.map((tab) => (
                  <li
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={activeTab === tab.key ? "active" : ""}
                  >
                    <span>{destination[tab.key]?.length || "0"}</span>
                    <span>{tab.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDestinationPage;
