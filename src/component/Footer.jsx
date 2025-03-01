import React from "react";
import { footerContent } from "../assets/assets";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer">
        <div className="main">
          <div className="container">
            <div className="content">
              <div className="div">
                <h2>{footerContent.company.title} </h2>
                <p>{footerContent.company.bio} </p>
              </div>
              <div className="div">
                <h3>{footerContent.colinks.title} </h3>
                <ul>
                  {footerContent.colinks.links.map((li, index) => (
                    <li key={index}>
                      <Link to={li.url}>{li.text} </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="div">
                <h3>{footerContent.useful.title} </h3>
                <ul>
                  {footerContent.useful.links.map((li, index) => (
                    <li key={index}>
                      <Link to={li.url}>{li.text} </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="div">
                <h3>{footerContent.fast.title} </h3>
                <ul>
                  {footerContent.fast.links.map((li, index) => (
                    <li key={index}>
                      <Link to={li.url}>{li.text} </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="container">
            <div className="content">
              <div className="copy">
                <p>Hilly Agency &copy; {year}</p>
              </div>
              <div className="social">
                <Link id="ig" to={footerContent.socials.insta}>
                  <FaInstagram />
                </Link>
                <Tooltip anchorId="ig" content="Instagram" />

                <Link id="x" to={footerContent.socials.twitter}>
                  <FaXTwitter />
                </Link>
                <Tooltip anchorId="x" content="Twitter X" />

                <Link id="tt" to={footerContent.socials.tiktok}>
                  <FaTiktok />
                </Link>
                <Tooltip anchorId="tt" content="TikTok" />

                <Link id="u2b" to={footerContent.socials.youtube}>
                  <FaYoutube />
                </Link>
                <Tooltip anchorId="u2b" content="YouTube" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
