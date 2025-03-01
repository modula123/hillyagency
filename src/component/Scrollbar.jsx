import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / docHeight) * 100;
      setScrollHeight(scrollPercentage);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "3px",
        height: `${scrollHeight}%`,
        background: "#c13321",
        zIndex: 999999,
        borderRadius: "0 0 1rem 1rem",
        transition: "height .6s linear",
      }}
    />
  );
};

export default ScrollProgress;
