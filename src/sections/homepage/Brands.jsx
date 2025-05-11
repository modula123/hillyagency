import React, { useEffect, useState, useRef } from "react";
import { brands } from "../../assets/assets";
import { Tooltip } from "react-tooltip";

const getVisibleCount = () => {
  if (window.innerWidth >= 1024) return 5; // Large screens
  if (window.innerWidth >= 640) return 3; // Small screens
  return 3; // Default fallback
};

const HomepageBrands = () => {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [startIndex, setStartIndex] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % brands.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [brands.length]);

  // Calculate the visible logos
  const visibleBrands = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleBrands.push(brands[(startIndex + i) % brands.length]);
  }

  // The "active" logo is the one in the middle
  const activeIdx = Math.floor(visibleCount / 2);

  return (
    <div className="home-brands">
      <div className="container">
        <div
          className="content"
          style={{ display: "flex", gap: "2rem", justifyContent: "center" }}
        >
          {visibleBrands.map((logo, idx) => (
            <div
              className={`img${idx === activeIdx ? " active" : ""}`}
              id={logo.title}
              key={logo.title}
              style={{ transition: "all 0.3s" }}
            >
              <img src={logo.image} alt={logo.title} />
              <Tooltip anchorId={logo.title} content={logo.title} />
            </div>
          ))}
        </div>
      </div>
      {/* Example CSS for .active:
        .img.active { transform: scale(1.1); box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
      */}
    </div>
  );
};

export default HomepageBrands;
