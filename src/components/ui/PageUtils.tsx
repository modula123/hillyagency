"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (bar) bar.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div id="scroll-progress" />;
}

export function PageLoader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`page-loader${hidden ? " hidden" : ""}`}>
      <Image
        src="/images/brand/blogo.svg"
        alt="Hilly Agency"
        width={120}
        height={60}
        priority
        className="dark:hidden"
      />
      <Image
        src="/images/brand/wlogo.svg"
        alt="Hilly Agency"
        width={120}
        height={60}
        priority
        className="hidden dark:block"
      />
    </div>
  );
}
