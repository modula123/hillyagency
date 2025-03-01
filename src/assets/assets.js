import wlogo from "/images/brand/wlogo.svg";
import logo from "/images/brand/blogo.svg";
import loader from "/images/brand/loader.gif";

import hero1 from "/images/hero/nyungwe.jpg";
import hero2 from "/images/hero/gorilla.jpg";
import hero3 from "/images/hero/kivu.jpg";
import hero4 from "/images/hero/1.jpg";

export const assets = {
  logo,
  whitelogo: wlogo,
  loader,
};

///////////////////////
////// COMPONENTS ////
/////////////////////
// FOOTER
export const footerContent = {
  company: {
    title: "Hilly Agency",
    bio: "A trusted travel partner in Rwanda, specializing in unforgetable tours, seamless transportation, and premium accomodations.",
  },
  colinks: {
    title: "Company",
    links: [
      {
        text: "About us",
        url: "/about",
      },
      {
        text: "Blogs",
        url: "/articles",
      },
      {
        text: "Partners",
        url: "/about/#partners",
      },
      { text: "Contact us", url: "/contact" },
    ],
  },
  useful: {
    title: "Useful links",
    links: [
      { text: "Tours", url: "/tours" },
      { text: "Accomodations", url: "/accomodations" },
      { text: "Transportations", url: "/transportations" },
      { text: "Hospitality", url: "/hospitality" },
    ],
  },
  fast: {
    title: "Fast links",
    links: [
      { text: "Things to do", url: "/articles/article/things-to-do" },
      { text: "Destinations", url: "/articles/article/top-destinations" },
      {
        text: "Airport transfer",
        url: "/articles/article/airport-transfer-process",
      },
    ],
  },
  socials: {
    insta: "https://instagram.com/hillyagency",
    twitter: "https://x.com/hillyagency",
    tiktok: "https://tiktok.com/@hillyagency",
    youtube: "https://youtube.com/@hillyagency",
  },
};

/////////////////
/// HOMEPAGE ///
///////////////

// hero
export const homeHero = {
  title: "Explore the Hilly Wonders of Rwanda",
  descr:
    "Experience Rwanda's breathtaking landscapes—lush hills, sparkling lakes, and majestic volcanic mountains—through curated luxury tours, seamless transportation, premier accommodations, and world-class hospitality.",
  thumbnail: hero1,
};
