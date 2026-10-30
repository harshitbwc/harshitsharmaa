import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { navLinks } from "../constants";

const ANCHOR_IDS = navLinks.filter((n) => n.type === "anchor").map((n) => n.id);

// True only on "/" while scrolled within Hero's range (before Bio's top
// crosses the same 45%-down line Navbar's own active-link tracking uses).
// Shared by SideNav (show its portrait buttons only here) and Navbar
// (hide its lg+ link row only here, since SideNav stands in for it).
export const useHeroActive = () => {
  const [activeAnchor, setActiveAnchor] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const targets = ANCHOR_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (targets.length === 0) return;

    const check = () => {
      const line = window.innerHeight * 0.45;
      let current = null;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActiveAnchor(current);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [isHome]);

  return isHome && !activeAnchor;
};
