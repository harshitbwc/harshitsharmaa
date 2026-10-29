/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // True black/white, cyan accent — the warm brown-black + cream
        // pairing read as "yellowish" once the accent itself went cool.
        ink: "#000000",
        surface: "#141414",
        line: "#2b2b2b",
        paper: "#ffffff",
        muted: "#999999",
        accent: "#4fd1c5",
        accent2: "#7fe3da",
        body: "#c4c4c4",
        line2: "#1f1f1f",
      },
      fontFamily: {
        serif: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        hand: ['"Caveat"', "cursive"],
      },
      boxShadow: {
        // A subtle top highlight + soft shadow — the two things that read
        // as "glass" rather than just "blurred box".
        glass: "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 8px 30px -8px rgba(0,0,0,0.6)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
