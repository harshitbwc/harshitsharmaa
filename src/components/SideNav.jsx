import { Link } from "react-router-dom";

import { navLinks } from "../constants";
import { useHeroActive } from "../hooks/useHeroActive";

// Four standalone buttons stacked bottom-right, right above the "Ask me
// anything" button (FloatingChat: bottom-6, 52px tall) — the real way to
// jump to a section at lg+, not a hover-reveal menu. Anchored low so it
// doesn't sit over the Hero portrait's face. Only exists alongside the
// portrait itself (see useHeroActive). Navbar keeps its own Bio/Work/
// Products/Contact row for the sm–lg range (no portrait, nothing to
// overlay there) and the mobile menu below that.
const SideNav = () => {
  const heroActive = useHeroActive();
  if (!heroActive) return null;

  const Item = ({ nav }) => {
    const className =
      "inline-flex items-center justify-center min-h-[40px] px-4 font-mono text-[11px] tracking-[0.2em] uppercase text-paper bg-black/40 backdrop-blur-md border border-line2 rounded-full transition-all duration-200 hover:border-accent hover:text-accent hover:[text-shadow:0_0_10px_rgba(79,209,197,0.7)] hover:shadow-[0_0_14px_rgba(79,209,197,0.35)]";
    const label = `[ ${nav.title} ]`;

    if (nav.type === "route") {
      return (
        <Link to={nav.path} className={className} aria-label={nav.title}>
          {label}
        </Link>
      );
    }
    return (
      <a href={`#${nav.id}`} className={className} aria-label={nav.title}>
        {label}
      </a>
    );
  };

  return (
    <nav
      aria-label='Jump to section'
      className='hidden lg:flex fixed right-6 xl:right-10 bottom-[92px] z-30 flex-col items-end gap-2.5'
    >
      {navLinks.map((nav) => (
        <Item key={nav.id} nav={nav} />
      ))}
    </nav>
  );
};

export default SideNav;
