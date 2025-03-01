import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./../style/component.scss";
import { assets } from "../assets/assets";

const Loader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFadeOut(false);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 1500); // Fully remove after fade-out
    }, 10);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    loading && (
      <div className={`loader-container ${fadeOut ? "fade-out" : ""}`}>
        <img src={assets.logo} alt="Loading..." className="loader" />
      </div>
    )
  );
};

export default Loader;
