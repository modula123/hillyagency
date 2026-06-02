"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read whatever the layout script already set on <html>
    const current = document.documentElement.className.includes("dark") ? "dark" : "light";
    setTheme(current);

    // Listen for OS-level changes (only if user hasn't overridden)
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleOS = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("hilly-theme")) {
        const next = e.matches ? "dark" : "light";
        setTheme(next);
        document.documentElement.className = next;
      }
    };
    mq.addEventListener("change", handleOS);
    return () => mq.removeEventListener("change", handleOS);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.className = next;
    localStorage.setItem("hilly-theme", next);
  };

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="p-2 rounded-xl text-[var(--text)] hover:bg-[var(--bg2)] transition-all duration-300 flex items-center justify-center"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
