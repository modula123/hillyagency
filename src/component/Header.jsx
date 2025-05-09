import React from "react";

import { Link, NavLink } from "react-router-dom";

import {
  IoCallOutline,
  IoLogoInstagram,
  IoMailOutline,
  IoMenuOutline,
} from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { CiFacebook, CiLinkedin } from "react-icons/ci";
import { TbBrandLinkedin } from "react-icons/tb";
import { PiYoutubeLogo } from "react-icons/pi";

import "./../style/component.scss";
import { assets, contacts } from "./../assets/assets";
import Theme from "./Theme";

const HomeHeader = () => {
  const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
  };

  return (
    <>
      <header className="header">
        <div className="top">
          <div className="container">
            <div className="content">
              <div className="social">
                <div className="div">
                  <div className="icon">
                    <span>
                      <IoCallOutline />
                    </span>
                  </div>
                  <div className="text">
                    <span>Call Us</span>
                    <Link to={`tel:${contacts.phone}`}>
                      {formatPhoneNumber(contacts.phone)}
                    </Link>
                  </div>
                </div>
                <div className="div">
                  <div className="icon">
                    <span>
                      <IoMailOutline />
                    </span>
                  </div>
                  <div className="text">
                    <span>Leave Mail</span>
                    <Link to={`mailto:${contacts.email}`}>
                      {contacts.email}
                    </Link>
                  </div>
                </div>
              </div>
              <Link to={"/"} className="logo">
                <img src={assets.logo} alt="Hilly's Logo" />
              </Link>
              <div className="social">
                <div className="div">
                  <div className="icon">
                    <span>
                      <LuMapPin />
                    </span>
                  </div>
                  <div className="text">
                    <span>Location</span>
                    <Link to={contacts.location}>{contacts.address}</Link>
                  </div>
                </div>
                <div className="socials">
                  <span>Follow Us:</span>
                  <ul>
                    <li>
                      <Link
                        to={`https://instagram.com/${contacts.socialsMedia.instagram}`}
                      >
                        <IoLogoInstagram />
                      </Link>
                    </li>
                    {contacts.socialsMedia.linkedin ? (
                      <li>
                        <Link
                          to={`https://linkedin.com/company/${contacts.socialsMedia.linkedin}`}
                        >
                          <TbBrandLinkedin />
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                    {contacts.socialsMedia.youtube ? (
                      <li>
                        <Link
                          to={`https://youtube.com/@${contacts.socialsMedia.instagram}`}
                        >
                          <PiYoutubeLogo />
                        </Link>
                      </li>
                    ) : (
                      <li>
                        <Link
                          to={`https://youtube.com/${contacts.socialsMedia.facebook}`}
                        >
                          <CiFacebook />
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav>
          <div className="container">
            <div className="content">
              <ul className="navlinks">
                <li>
                  <NavLink to={"/"} activeClassName="">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/tours"} activeClassName="tours">
                    Tours
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/accommodations"}
                    activeClassName="accommodations"
                  >
                    Accommodation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/transportation"}
                    activeClassName="transportation"
                  >
                    Transports
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/restaurants"} activeClassName="restaurants">
                    Restaurants
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/contact"} activeClassName="contact">
                    Contacts
                  </NavLink>
                </li>
              </ul>
              <div className="action">
                <button>
                  <Theme />
                </button>
                <li>
                  <Link className="btn">
                    <span>Sign in</span>
                  </Link>
                </li>
                <li>
                  <Link className="btn1">
                    <span>Register</span>
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </nav>

        <div className="mini-nav">
          <div className="container">
            <div className="content">
              <Link to={""} className="logo">
                <img src={assets.logo} alt="Logo" />
              </Link>
              <div className="right">
                <button className="theme-btn">
                  <Theme />
                </button>
                <button className="menu">
                  <span>
                    <IoMenuOutline />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeHeader;
