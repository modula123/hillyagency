import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuUserRound } from "react-icons/lu";

import "./../style/component.scss";
import { assets } from "../assets/assets";

const Header = () => {
  const [menuModal, setMenuModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuModal(!menuModal);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="header">
      <div className={isScrolled ? "container" : "de-container"}>
        <div className="content">
          <div className="left">
            <Link className="logo">
              <img src={assets.logo} alt="Logo" />
            </Link>
            <ul className="nav">
              <li><Link to="/tours">Tours</Link></li>
              <li><Link to="/accomodations">Accomodations</Link></li>
              <li><Link to="/transportation">Transportation</Link></li>
              <li><Link to="/articles">Blogs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="right">
            <button className="button"><span>Book a Tour</span></button>
            <button className="btn"><span><LuUserRound /></span></button>
            <button className={menuModal ? "menu active" : "menu"} onClick={toggleMenu}>
              <span className="line line1"></span>
              <span className="line line2"></span>
            </button>

            {menuModal && (
              <div className="menu-modal">
                <ul>
                  <li><Link to="/tours">Tours</Link></li>
                  <li><Link to="/accomodations">Accomodations</Link></li>
                  <li><Link to="/transportation">Transportation</Link></li>
                  <li><Link to="/articles">Blogs</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <button className="button"><span>Book a Tour</span></button>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
