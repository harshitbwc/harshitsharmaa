import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { navLinks } from "../constants";

// Same anchor-tracking logic as the old top-bar nav (Navbar.jsx still runs
// its own copy for the sm–lg range where this sidebar isn't shown yet).
const ANCHOR_IDS = navLinks.filter((n) => n.type === "anchor").map((n) => n.id);

const GLOW = "0 0 10px rgba(79,209,197,0.7), 0 0 22px rgba(79,209,197,0.35)";

// ≥1024px only (same cutoff as Radio/FloatingChat) — a fixed left-edge
// selector instead of the old top-bar row. Collapsed to a dim tick at
// rest so it never competes with page content for width; hovering (or a
// section becoming the active one) lights the tick up into a bracketed,
// glowing label — closer to an arcade menu's option list than a website
// nav. Navbar.jsx keeps its own horizontal links for sm–lg, and the
// mobile hamburger menu below sm, so every breakpoint still has exactly
// one way to jump between sections.
const SideNav = () => {
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

  const isActive = (nav) => {
    if (nav.type === "route") return location.pathname.startsWith(nav.path);
    return isHome && activeAnchor === nav.id;
  };

  // Hero owns this same left edge with its own scroll-pinned dial of
  // icons — showing this selector on top of that is exactly the
  // "dial-gutter crowding" the Hero column width was already tuned to
  // avoid (see styles.js). Fading this in only once a real anchor section
  // is active sidesteps it: nothing shows until Hero's been scrolled
  // past, and it's unaffected on every other route (no dial there).
  const heroActive = isHome && !activeAnchor;

  const Item = ({ nav }) => {
    const active = isActive(nav);
    const inner = (
      <>
        <span
          className={`block h-px transition-all duration-300 ${
            active ? "w-8 bg-accent" : "w-4 bg-line2 group-hover:w-8 group-hover:bg-accent"
          }`}
          style={active ? { boxShadow: GLOW } : undefined}
        />
        <span
          className={`font-mono text-[11px] tracking-[0.22em] uppercase whitespace-nowrap transition-all duration-300 ${
            active
              ? "text-accent opacity-100 translate-x-0"
              : "text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent"
          }`}
          style={active ? { textShadow: GLOW } : undefined}
        >
          {`[ ${nav.title} ]`}
        </span>
      </>
    );
    const className = "group flex items-center gap-3 py-2.5 outline-none focus-visible:opacity-100";

    if (nav.type === "route") {
      return (
        <Link to={nav.path} className={className} aria-label={nav.title}>
          {inner}
        </Link>
      );
    }
    if (isHome) {
      return (
        <a href={`#${nav.id}`} className={className} aria-label={nav.title}>
          {inner}
        </a>
      );
    }
    return (
      <Link to={`/#${nav.id}`} className={className} aria-label={nav.title}>
        {inner}
      </Link>
    );
  };

  return (
    <nav
      aria-label='Section'
      className={`hidden lg:flex fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-30 flex-col gap-1 transition-opacity duration-500 ${
        heroActive ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {navLinks.map((nav) => (
        <Item key={nav.id} nav={nav} />
      ))}
    </nav>
  );
};

export default SideNav;
