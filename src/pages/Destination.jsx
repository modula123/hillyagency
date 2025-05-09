import React from "react";
import { useParams } from "react-router-dom";
import { destinations } from "../assets/assets";

const SingleDestinationPage = () => {
  const { idSlug } = useParams();

  // Extract ID and slug
  const [id, ...slugParts] = idSlug.split("-");
  const slug = slugParts.join("-");

  // Find destination by ID (you could match both id + slug for extra safety)
  const destination = destinations.find((place) => place.id === id);

  if (!destination) {
    return <div className="container">Destination not found.</div>;
  }

  return (
    <div className="single-destination-page">
      <div className="hero">
        <img src={destination.thumbnail} alt={destination.title} />
        <div className="overlay">
          <h1>{destination.title}</h1>
          <p>{destination.bio}</p>
        </div>
      </div>

      <div className="container">
        <section className="intro">
          <div dangerouslySetInnerHTML={{ __html: destination.description }} />
        </section>

        <section className="stats">
          <p>
            <strong>{destination.tours?.length || 0}</strong> Tours |{" "}
            <strong>{destination.activities?.length || 0}</strong> Activities |{" "}
            <strong>{destination.hotels?.length || 0}</strong> Hotels |{" "}
            <strong>{destination.restaurants?.length || 0}</strong> Restaurants
          </p>
        </section>

      
      </div>
    </div>
  );
};

export default SingleDestinationPage;
