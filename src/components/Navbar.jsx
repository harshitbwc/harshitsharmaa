import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { navLinks } from "../constants";
import Magnetic from "./Magnetic";
import { useHeroActive } from "../hooks/useHeroActive";

// Anchor entries only make sense as an in-page jump while already on "/" —
// Lenis owns that scroll (see useSmoothScroll's click handler). Anywhere
// else, the same entry has to actually navigate home first, so it renders
// as a real route link instead ("/#work"); Home.jsx picks up that hash on
// mount and scrolls to it once the section exists.
const NavLink = ({ nav, isHome, isActive, className, onClick, variant = "desktop" }) => {
  const activeClass =
    variant === "mobile"
      ? isActive
        ? "text-accent"
        : "text-paper"
      : isActive
      ? "text-white bg-[#141414] rounded-full px-3.5 py-2"
      : "text-[#999]";
  if (nav.type === "route") {
    return (
      <Link to={nav.path} className={`${className} ${activeClass}`} onClick={onClick}>
        {nav.title}
      </Link>
    );
  }
  if (isHome) {
    return (
      <a href={`#${nav.id}`} className={`${className} ${activeClass}`} onClick={onClick}>
        {nav.title}
      </a>
    );
  }
  return (
    <Link to={`/#${nav.id}`} className={`${className} ${activeClass}`} onClick={onClick}>
      {nav.title}
    </Link>
  );
};

const Mark = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 28 28'
    className='border border-[#2b2b2b] rounded-[7px] shrink-0'
    style={{ background: "#000" }}
  >
    <path
      d='M14 4 A10 10 0 1 1 4 14'
      stroke='#4fd1c5'
      strokeWidth='1.4'
      strokeDasharray='2 3'
      fill='none'
      strokeLinecap='round'
    />
    <circle cx='14' cy='4' r='2' fill='#4fd1c5' />
  </svg>
);

// Anchor sections whose scroll position determines the active nav link.
// Only meaningful on "/" — elsewhere the only thing that can be "active"
// is the Products route link, handled separately via pathname.
const ANCHOR_IDS = navLinks.filter((n) => n.type === "anchor").map((n) => n.id);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const heroActive = useHeroActive();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // A section counts as "active" once its top crosses 45% down the
  // viewport — picked over the more common "50% visible" test because it
  // reads correctly even for a section taller than the viewport itself.
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

  const isNavActive = (nav) => {
    if (nav.type === "route") return location.pathname.startsWith(nav.path);
    return isHome && activeAnchor === nav.id;
  };

  return (
    <nav
      // border-b is always present (never conditionally added) and its
      // color always starts from an explicit value — border-transparent,
      // not the unset default. Tailwind's own base reset sets every
      // element's border-color to currentColor (the nav's text color,
      // effectively white) the moment a border-width appears with no
      // color class of its own; transitioning border-color from that
      // implicit white toward border-line2 is what read as a white line
      // flashing under the nav right as it turned solid, before settling
      // into the intended dark gray.
      className={`fixed top-0 w-full z-30 border-b transition-colors duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-line2"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className='max-w-5xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between'>
        {isHome ? (
          <a
            href='#top'
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
            className='flex items-center gap-2.5 font-serif text-lg text-paper hover:text-accent transition-colors'
          >
            <Mark />
            Harshit Sharmaa
          </a>
        ) : (
          <Link
            to='/'
            className='flex items-center gap-2.5 font-serif text-lg text-paper hover:text-accent transition-colors'
          >
            <Mark />
            Harshit Sharmaa
          </Link>
        )}

        {/* lg+ gets SideNav's buttons over the Hero portrait instead, but
            only while that's actually showing (heroActive) — everywhere
            else at lg+ (scrolled past Hero, or any other route) this row
            is the only nav, so it has to come back. Below sm it's the
            hamburger menu regardless. */}
        <ul className={`hidden sm:flex items-center gap-2 ${heroActive ? "lg:hidden" : ""}`}>
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <Magnetic strength={0.4}>
                <NavLink
                  nav={nav}
                  isHome={isHome}
                  isActive={isNavActive(nav)}
                  className='font-sans text-sm transition-colors'
                />
              </Magnetic>
            </li>
          ))}
        </ul>

        <button
          className='sm:hidden w-11 h-11 flex items-center justify-center rounded-full border border-line2'
          onClick={() => setToggle((t) => !t)}
          aria-label='Toggle menu'
          aria-expanded={toggle}
        >
          <span className='relative w-4 h-3 block'>
            <span
              className={`absolute left-0 top-0 w-4 h-px bg-paper transition-transform duration-300 ${
                toggle ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 w-4 h-px bg-paper transition-transform duration-300 ${
                toggle ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='sm:hidden fixed inset-0 top-16 bg-black z-20 flex flex-col'
          >
            {navLinks.map((nav, i) => (
              <div key={nav.id} className={i > 0 ? "border-t border-line2" : ""}>
                <NavLink
                  nav={nav}
                  isHome={isHome}
                  isActive={isNavActive(nav)}
                  variant='mobile'
                  onClick={() => setToggle(false)}
                  className='block px-6 py-6 font-serif text-[40px] leading-none'
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
