import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Wraps an interactive element so it pulls gently toward the cursor on
// hover — a cheap, well-worn "this site was crafted" signal. Used
// sparingly on primary affordances, not every link on the page.
const Magnetic = ({ children, strength = 0.35, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 14, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 200, damping: 14, mass: 0.2 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
