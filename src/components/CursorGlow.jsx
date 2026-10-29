import { useEffect, useRef } from "react";

// A quiet radial glow that follows the cursor — pure CSS custom-property
// updates on mousemove, no re-renders, no library. Skipped on touch
// devices where there's no cursor to follow.
const CursorGlow = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    const onMove = (e) => {
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className='fixed inset-0 z-10 pointer-events-none transition-opacity duration-500 opacity-0 hidden sm:block'
      style={{
        background:
          "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(79, 209, 197, 0.07), transparent 70%)",
      }}
    />
  );
};

export default CursorGlow;
