import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaClipboardList,
  FaMoneyBillWave,
  FaBed,
  FaCar,
} from "react-icons/fa";

const SearchBox = () => {
  const [activeTab, setActiveTab] = useState("tours");

  return (
    <div className="search-box">
      {/* Tabs */}
      <div className="tabs">
        {["tours", "accommodation", "transportation"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
          </button>
        ))}
      </div>

      {/* Search Forms */}
      <div className="box-content">
        {activeTab === "tours" && (
          <div className="form-grid">
            <InputField label="Destination" icon={<FaMapMarkerAlt />} placeholder="Where to?" />
            <InputField label="Category" icon={<FaClipboardList />} placeholder="Tour type" />
            <InputField label="Budget range" icon={<FaMoneyBillWave />} placeholder="Budget range" />
          </div>
        )}

        {activeTab === "accommodation" && (
          <div className="form-grid">
            <InputField label="Location" icon={<FaMapMarkerAlt />} placeholder="City or region" />
            <InputField label="Accommodation Type" icon={<FaBed />} placeholder="Hotel, Apartment..." />
            <InputField label="Check-in Date" type="date" />
            <InputField label="Check-out Date" type="date" />
          </div>
        )}

        {activeTab === "transportation" && (
          <div className="form-grid">
            <InputField label="Pick-up Location" icon={<FaMapMarkerAlt />} placeholder="Pick-up city or airport" />
            <InputField label="Drop-off Location" icon={<FaMapMarkerAlt />} placeholder="Drop-off city or airport" />
            <InputField label="Vehicle Type" icon={<FaCar />} placeholder="Car, Bus, Bike..." />
          </div>
        )}

        <button className="search-button">Search</button>
      </div>
    </div>
  );
};

const InputField = ({ label, icon, placeholder, type = "text" }) => (
  <div className="input-box">
    <label>{label}</label>
    <div className="input">
      {icon && <span className="icon">{icon}</span>}
      <input type={type} placeholder={placeholder} />
    </div>
  </div>
);

export default SearchBox;
