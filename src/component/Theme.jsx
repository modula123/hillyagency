import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import "./../style/component.scss";

function Theme() {
  const [theme, setTheme] = useState("light-mode");

  // Apply saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light-mode";
    document.documentElement.className = savedTheme;
    setTheme(savedTheme);
  }, []);

  // Toggle light-dark mode
  const toggleTheme = () => {
    const newTheme = theme === "light-mode" ? "dark-mode" : "light-mode";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <div className="theme">
        <span className="themebtn" onClick={toggleTheme}>
          {theme != "light-mode" ? <MdDarkMode /> : <MdLightMode />}
        </span>
      </div>
    </>
  );
}

export default Theme;
