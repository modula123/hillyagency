import React from "react";
import { Link } from "react-router-dom";

const GeneralCard = ({ type, data }) => {
  const getTitle = () => data.title || data.model || "Untitled";
  const getImage = () =>
    data.thumbnail ||
    data.images?.[0] ||
    data.gallery?.[0] ||
    "https://via.placeholder.com/300x200?text=No+Image";

  const getPrice = () => {
    if (type === "tours" || type === "activities") return `$${data.price}`;
    if (type === "hotels" || type === "restaurants") return null;
    if (type === "transport") return `$${data.price} / ${data.duration}`;
    if (type === "rentals") return `$${data.price} / mo`;
    return null;
  };

  const getDescription = () => {
    if (type === "transport") return `${data.brand} ${data.model}`;
    if (data.bio) return data.bio;
    if (data.description)
      return data.description.replace(/<[^>]+>/g, "").slice(0, 100) + "...";
    return "";
  };

  return (
    <Link to={""} className="general_card">
      <div className="img">
        <img src={getImage()} alt={getTitle()} />
      </div>
      <div>
        <h3 title={getTitle()}>{getTitle()}</h3>
        <p>{getDescription()}</p>
        {getPrice() && <strong className="price">{getPrice()}</strong>}
      </div>
    </Link>
  );
};

export default GeneralCard;
