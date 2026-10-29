// A small set of hand-drawn SVG objects, one consistent style — flat
// duotone (white fill, black linework), a single accent-color detail each,
// same stroke weight throughout. Stand-ins for real photographed objects
// (Studio Loop's collage), built instead of sourced so the quality and
// palette are fully under our control.

const STROKE = "#000000";
const FILL = "#ffffff";
const SHADE = "#c9c9c9";
const ACCENT = "#4fd1c5";
const DARK = "#141414";
const W = 2.5;

export const Laptop = (props) => (
  <svg viewBox="0 0 120 100" fill="none" {...props}>
    <rect x="18" y="10" width="70" height="48" rx="4" fill={FILL} stroke={STROKE} strokeWidth={W} />
    <rect x="24" y="16" width="58" height="36" fill={DARK} />
    <rect x="28" y="20" width="30" height="3" rx="1.5" fill={ACCENT} />
    <rect x="28" y="27" width="42" height="2.5" rx="1.25" fill={FILL} opacity="0.5" />
    <rect x="28" y="33" width="36" height="2.5" rx="1.25" fill={FILL} opacity="0.5" />
    <path d="M6 62 L100 62 L90 78 Q88 82 83 82 L23 82 Q18 82 16 78 Z" fill={SHADE} stroke={STROKE} strokeWidth={W} strokeLinejoin="round" />
  </svg>
);

export const Camera = (props) => (
  <svg viewBox="0 0 120 100" fill="none" {...props}>
    <rect x="14" y="28" width="92" height="58" rx="8" fill={FILL} stroke={STROKE} strokeWidth={W} />
    <rect x="40" y="14" width="30" height="18" rx="4" fill={FILL} stroke={STROKE} strokeWidth={W} />
    <circle cx="60" cy="58" r="24" fill={SHADE} stroke={STROKE} strokeWidth={W} />
    <circle cx="60" cy="58" r="14" fill={DARK} />
    <circle cx="66" cy="52" r="4" fill={ACCENT} opacity="0.9" />
    <rect x="88" y="38" width="10" height="7" rx="2" fill={ACCENT} />
  </svg>
);

export const Glasses = (props) => (
  <svg viewBox="0 0 100 46" fill="none" {...props}>
    <rect x="4" y="10" width="34" height="28" rx="10" fill={FILL} stroke={STROKE} strokeWidth={W + 1} />
    <rect x="62" y="10" width="34" height="28" rx="10" fill={FILL} stroke={STROKE} strokeWidth={W + 1} />
    <path d="M38 20 Q50 14 62 20" stroke={STROKE} strokeWidth={W + 1} fill="none" strokeLinecap="round" />
    <path d="M4 22 Q-4 22 -2 16" stroke={STROKE} strokeWidth={W + 1} fill="none" strokeLinecap="round" />
    <path d="M96 22 Q104 22 102 16" stroke={STROKE} strokeWidth={W + 1} fill="none" strokeLinecap="round" />
    <path d="M10 16 Q14 12 22 12" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />
  </svg>
);

export const Notebook = (props) => (
  <svg viewBox="0 0 120 100" fill="none" {...props}>
    <path d="M14 14 L60 8 L60 88 L14 94 Z" fill={FILL} stroke={STROKE} strokeWidth={W} strokeLinejoin="round" />
    <path d="M60 8 L106 14 L106 94 L60 88 Z" fill={SHADE} stroke={STROKE} strokeWidth={W} strokeLinejoin="round" />
    <path d="M24 30 L50 27" stroke={STROKE} strokeWidth="1.5" opacity="0.5" />
    <path d="M24 42 L50 39" stroke={STROKE} strokeWidth="1.5" opacity="0.5" />
    <path d="M24 54 L50 51" stroke={STROKE} strokeWidth="1.5" opacity="0.5" />
    <path d="M30 78 L96 20" stroke={ACCENT} strokeWidth={W + 1} strokeLinecap="round" />
    <path d="M92 16 L100 24 L96 20 Z" fill={STROKE} />
  </svg>
);

export const Dumbbell = (props) => (
  <svg viewBox="0 0 120 60" fill="none" {...props}>
    <rect x="40" y="24" width="40" height="12" rx="4" fill={SHADE} stroke={STROKE} strokeWidth={W} />
    <rect x="16" y="10" width="16" height="40" rx="5" fill={FILL} stroke={STROKE} strokeWidth={W} />
    <rect x="4" y="18" width="10" height="24" rx="4" fill={FILL} stroke={STROKE} strokeWidth={W} />
    <rect x="88" y="10" width="16" height="40" rx="5" fill={FILL} stroke={STROKE} strokeWidth={W} />
    <rect x="106" y="18" width="10" height="24" rx="4" fill={FILL} stroke={STROKE} strokeWidth={W} />
  </svg>
);

export const Clapperboard = (props) => (
  <svg viewBox="0 0 120 100" fill="none" {...props}>
    <rect x="10" y="34" width="100" height="58" rx="4" fill={FILL} stroke={STROKE} strokeWidth={W} />
    <path d="M10 34 L20 12 L100 12 L110 34 Z" fill={SHADE} stroke={STROKE} strokeWidth={W} strokeLinejoin="round" />
    <path d="M28 12 L38 34 M50 12 L60 34 M72 12 L82 34" stroke={STROKE} strokeWidth={W} />
    <rect x="24" y="52" width="72" height="4" fill={ACCENT} opacity="0.8" />
    <rect x="24" y="66" width="50" height="4" fill={STROKE} opacity="0.35" />
  </svg>
);

export const Books = (props) => (
  <svg viewBox="0 0 120 90" fill="none" {...props}>
    <rect x="10" y="58" width="100" height="16" rx="2" fill={SHADE} stroke={STROKE} strokeWidth={W} />
    <rect x="16" y="36" width="88" height="20" rx="2" fill={FILL} stroke={STROKE} strokeWidth={W} />
    <rect x="24" y="12" width="70" height="22" rx="2" fill={FILL} stroke={STROKE} strokeWidth={W} transform="rotate(-4 60 23)" />
    <rect x="30" y="44" width="40" height="3" fill={ACCENT} opacity="0.8" />
  </svg>
);

export const Mic = (props) => (
  <svg viewBox="0 0 90 120" fill="none" {...props}>
    <rect x="23" y="4" width="44" height="64" rx="22" fill={FILL} stroke={STROKE} strokeWidth={W} />
    {/* Solid grille bars instead of thin faint lines — the earlier version
        read as a blank pill at the size this actually renders at. */}
    <rect x="32" y="16" width="26" height="5" rx="2.5" fill={DARK} />
    <rect x="32" y="27" width="26" height="5" rx="2.5" fill={DARK} />
    <rect x="32" y="38" width="26" height="5" rx="2.5" fill={DARK} />
    <rect x="32" y="49" width="26" height="5" rx="2.5" fill={ACCENT} />
    <path d="M10 52 Q10 88 45 88 Q80 88 80 52" stroke={STROKE} strokeWidth={W} fill="none" strokeLinecap="round" />
    <line x1="45" y1="88" x2="45" y2="106" stroke={STROKE} strokeWidth={W} strokeLinecap="round" />
    <line x1="23" y1="114" x2="67" y2="114" stroke={STROKE} strokeWidth={W} strokeLinecap="round" />
  </svg>
);

// The one thing on the wheel that isn't for public consumption — paired
// deliberately against Notebook (public writing) as the private, locked
// counterpart, rather than reaching for something literal like a mask.
export const Diary = (props) => (
  <svg viewBox="0 0 110 100" fill="none" {...props}>
    <rect x="10" y="10" width="90" height="80" rx="4" fill={FILL} stroke={STROKE} strokeWidth={W} />
    <rect x="10" y="10" width="18" height="80" fill={SHADE} stroke={STROKE} strokeWidth={W} />
    <path d="M47 42 L47 32 Q47 22 55 22 Q63 22 63 32 L63 42" stroke={STROKE} strokeWidth={W} fill="none" strokeLinecap="round" />
    <rect x="42" y="42" width="26" height="20" rx="3" fill={DARK} stroke={STROKE} strokeWidth={W} />
    <circle cx="55" cy="50" r="3" fill={ACCENT} />
    <line x1="55" y1="53" x2="55" y2="58" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
