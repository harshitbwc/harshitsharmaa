import { motion } from "framer-motion";

// A handful of nodes with connecting lines whose opacity independently
// drifts in and out on its own loop — reads as a small neural net's
// connections quietly forming and breaking, not a literal diagram of
// anything. Cyan, glowing, deliberately a little irregular (staggered,
// uneven durations) so it doesn't read as a mechanical blink.
const NODES = [
  { x: 20, y: 12 },
  { x: 40, y: 8 },
  { x: 8, y: 30 },
  { x: 30, y: 32 },
  { x: 46, y: 26 },
  { x: 18, y: 46 },
];
const EDGES = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
  [2, 3],
  [3, 4],
  [3, 5],
  [2, 5],
  [4, 5],
];

const NeuralIcon = ({ className = "" }) => (
  <svg
    viewBox='0 0 54 54'
    className={className}
    style={{
      filter:
        "drop-shadow(0 0 5px rgba(79,209,197,0.95)) drop-shadow(0 0 12px rgba(79,209,197,0.5))",
    }}
  >
    {EDGES.map(([a, b], i) => (
      <motion.line
        key={`edge-${i}`}
        x1={NODES[a].x}
        y1={NODES[a].y}
        x2={NODES[b].x}
        y2={NODES[b].y}
        stroke='#4fd1c5'
        strokeWidth='1'
        initial={{ opacity: 0.12 }}
        animate={{ opacity: [0.12, 0.85, 0.12] }}
        transition={{
          duration: 2.4 + (i % 4) * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.22,
        }}
      />
    ))}
    {NODES.map((n, i) => (
      <motion.circle
        key={`node-${i}`}
        cx={n.x}
        cy={n.y}
        r='2.4'
        fill='#4fd1c5'
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
        transition={{
          duration: 2 + (i % 3) * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.3,
        }}
      />
    ))}
  </svg>
);

export default NeuralIcon;
