// Shared layout/type vocabulary so every section stays visually
// consistent without re-deriving the scale each time.
export const styles = {
  section: "max-w-2xl mx-auto px-6 sm:px-8",
  // Hero's own column width — kept separate from the wider tokens below so
  // widening those doesn't reopen the dial-gutter crowding bug that was
  // already tuned against this exact value.
  sectionWide: "max-w-3xl mx-auto px-6 sm:px-8",
  sectionBio: "max-w-[880px] mx-auto px-6 sm:px-8",
  container: "max-w-[1100px] mx-auto px-6 sm:px-8",
  label: "font-sans text-xs tracking-[0.2em] uppercase text-muted",
  sectionEyebrow: "font-mono text-[11px] tracking-[0.16em] uppercase text-muted",
  heading: "font-serif font-normal text-paper leading-[1.05]",
  body: "font-sans text-muted leading-relaxed",
};
