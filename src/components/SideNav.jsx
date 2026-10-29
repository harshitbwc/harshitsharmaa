import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { navLinks } from "../constants";

// Same anchor-tracking logic Navbar.jsx uses for its own active-link state.
const ANCHOR_IDS = navLinks.filter((n) => n.type === "anchor").map((n) => n.id);

const GLOW = "0 0 10px rgba(79,209,197,0.7), 0 0 22px rgba(79,209,197,0.35)";

// A second, decorative quick-select that only exists alongside the Hero's
// own pinned dial — top-right, under the navbar, so it never competes
// with the dial's icons (those own the left/center). Visible only while
// no anchor section is active yet (i.e. still inside Hero's scroll-jack
// range); the moment Bio's top crosses the activation line this unmounts
// itself. Navbar's own Bio/Work/Products/Contact row stays the real,
// always-on nav — this is purely a "skip the dial" shortcut.
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

  const heroActive = isHome && !activeAnchor;
  if (!heroActive) return null;

  const Item = ({ nav }) => {
    // Tick stays flush against the container's right edge (it's always
    // the rightmost child), label flies out to its left on hover — so
    // every row's tick lines up vertically regardless of label length.
    const inner = (
      <>
        <span
          className='font-mono text-[11px] tracking-[0.22em] uppercase whitespace-nowrap text-muted opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent'
          onMouseEnter={(e) => (e.currentTarget.style.textShadow = GLOW)}
          onMouseLeave={(e) => (e.currentTarget.style.textShadow = "")}
        >
          {`[ ${nav.title} ]`}
        </span>
        <span className='block h-px w-4 bg-line2 transition-all duration-300 group-hover:w-8 group-hover:bg-accent' />
      </>
    );
    const className = "group flex items-center gap-3 py-1.5 outline-none";

    if (nav.type === "route") {
      return (
        <Link to={nav.path} className={className} aria-label={nav.title}>
          {inner}
        </Link>
      );
    }
    return (
      <a href={`#${nav.id}`} className={className} aria-label={nav.title}>
        {inner}
      </a>
    );
  };

  return (
    <nav
      aria-label='Jump to section'
      className='hidden lg:flex fixed right-6 xl:right-10 top-24 z-30 flex-col gap-1 items-end'
    >
      {navLinks.map((nav) => (
        <Item key={nav.id} nav={nav} />
      ))}
    </nav>
  );
};

export default SideNav;
