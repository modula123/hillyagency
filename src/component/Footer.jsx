import React from "react";
import { Link } from "react-router-dom";
import { assets, contacts } from "../assets/assets";
import { CiClock2, CiLocationOn, CiMail } from "react-icons/ci";
import {
  LuFacebook,
  LuInstagram,
  LuLinkedin,
  LuPhone,
  LuYoutube,
} from "react-icons/lu";
import { FaPinterestP, FaXTwitter } from "react-icons/fa6";

import "./../style/component.scss";

const HomeFooter = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="top">
            <div className="content">
              <div className="left">
                <Link to={""} className="logo">
                  <img src={assets.whitelogo} alt="Logo" />
                </Link>
              </div>
              <div className="right">
                <span className="icon">
                  <LuPhone />
                </span>
                <p>Need help? Call us</p>
                <Link to={`tel:${contacts.phone}`}>{contacts.phone}</Link>
              </div>
            </div>
          </div>
          <div className="main">
            <div className="content">
              <div className="brand">
                <h3>Contact Us</h3>
                <ul>
                  <li>
                    <Link>
                      <span className="icon">
                        <CiLocationOn />
                      </span>
                      <span className="text">{contacts.address}</span>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <span className="icon">
                        <CiClock2 />
                      </span>
                      <span className="text">{contacts.hours}</span>
                    </Link>
                  </li>
                  <li>
                    {contacts.supportEmail && contacts.supportEmail != "" ? (
                      <Link to={contacts.supportEmail}>
                        <span className="icon">
                          <CiMail />
                        </span>
                        <span className="text">{contacts.supportEmail}</span>
                      </Link>
                    ) : (
                      <Link to={contacts.email}>
                        <span className="icon">
                          <CiMail />
                        </span>
                        <span className="text">{contacts.email}</span>
                      </Link>
                    )}
                  </li>
                </ul>
                <h4>Follow us:</h4>
                <ul className="socials">
                  {contacts.socialsMedia.instagram ? (
                    <li>
                      <Link
                        to={`https://instagram.com/${contacts.socialsMedia.instagram}`}
                      >
                        <LuInstagram />
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  {contacts.socialsMedia.facebook ? (
                    <li>
                      <Link
                        to={`https://facebook.com/${contacts.socialsMedia.facebook}`}
                      >
                        <LuFacebook />
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  {contacts.socialsMedia.twitter ? (
                    <li>
                      <Link
                        to={`https://x.com/${contacts.socialsMedia.twitter}`}
                      >
                        <FaXTwitter />
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  {contacts.socialsMedia.linkedin ? (
                    <li>
                      <Link
                        to={`https://linkedin.com/company/${contacts.socialsMedia.linkedin}`}
                      >
                        <LuLinkedin />
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  {contacts.socialsMedia.youtube ? (
                    <li>
                      <Link
                        to={`https://youtube.com/@{contacts.socialsMedia.youtube}`}
                      >
                        <LuYoutube />
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  {contacts.socialsMedia.pinterest ? (
                    <li>
                      <Link
                        to={`https://pinterest.com/${contacts.socialsMedia.pinterest}`}
                      >
                        <FaPinterestP />
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
              {/* <div className="links-cont"> */}
              <div className="links">
                <h3>Services</h3>
                <ul>
                  <li>
                    <Link>Tour Guide</Link>
                  </li>
                  <li>
                    <Link>Transportation</Link>
                  </li>
                  <li>
                    <Link>Hotel Booking</Link>
                  </li>
                  <li>
                    <Link>Event Booking</Link>
                  </li>
                  <li>
                    <Link>Rental Services</Link>
                  </li>
                  <li>
                    <Link>Restaurant Booking</Link>
                  </li>
                </ul>
              </div>
              <div className="links">
                <h3>Company</h3>
                <ul>
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                  <li>
                    <Link>Jobs & Career</Link>
                  </li>
                  <li>
                    <Link>Contact Us</Link>
                  </li>
                  <li>
                    <Link>Our Agents</Link>
                  </li>
                </ul>
              </div>
              <div className="links">
                <h3>Support</h3>
                <ul>
                  <li>
                    <Link>Help Center</Link>
                  </li>
                  <li>
                    <Link>Live Chat</Link>
                  </li>
                  <li>
                    <Link>WhatsApp</Link>
                  </li>
                  <li>
                    <Link>How it works</Link>
                  </li>
                  <li>
                    <Link>FAQs</Link>
                  </li>
                </ul>
              </div>
              <div className="links">
                <h3>Legal</h3>
                <ul>
                  <li>
                    <Link>Terms of Service</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Cookies Policy</Link>
                  </li>
                  <li>
                    <Link>Data Policy</Link>
                  </li>
                  <li>
                    <Link>Refund Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="bottom">
            <div className="content">
              <div className="left">
                <p>&copy; {new Date().getFullYear()} Hilly Agency.</p>
              </div>
              <div className="right">
                <ul>
                  <li>
                    <Link>Terms</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Accessibility</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomeFooter;
