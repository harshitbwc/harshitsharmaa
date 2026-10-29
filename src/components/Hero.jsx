import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Snap from "lenis/snap";

import { styles } from "../styles";
import portrait from "../assets/portrait.jpg";
import { lenis } from "../lib/smoothScroll";
import { dialItems } from "../constants";
import {
  Laptop,
  Camera,
  Glasses,
  Notebook,
  Mic,
  Dumbbell,
  Clapperboard,
  Books,
  Diary,
} from "./HeroObjects";

const SHADOW = "drop-shadow(0 14px 20px rgba(0,0,0,0.45))";

// dialItems (constants/index.js) is plain data, deliberately free of
// component references so that file stays safe to import from the
// serverless function. This is the one place it's paired back up with the
// actual icon components.
const ICONS = { laptop: Laptop, camera: Camera, glasses: Glasses, notebook: Notebook, mic: Mic, dumbbell: Dumbbell, clapperboard: Clapperboard, books: Books, diary: Diary };

const ANGLE_STEP = 15; // degrees between neighboring items on the wheel
const N = dialItems.length;
const MID = (N - 1) / 2;

// Two chapters, derived from the data rather than hard-coded indices, so
// adding/reordering dial items doesn't silently desync the progress rail.
const CHAPTERS = (() => {
  const groups = [];
  dialItems.forEach((item, i) => {
    const last = groups[groups.length - 1];
    if (last && last.name === item.chapter) last.indices.push(i);
    else groups.push({ name: item.chapter, indices: [i] });
  });
  return groups;
})();

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const spacerRef = useRef(null);
  const itemRefs = useRef([]);
  const arcRef = useRef(null);
  const stRef = useRef(null);
  const progressRef = useRef(0.5);
  // Index 0 (Glasses, "I get sh*t done.") is the home state, it's what
  // scroll progress 0 resolves to, so the unscrolled page and this default
  // always agree instead of jump-cutting on the first scroll event.
  const [activeIndex, setActiveIndex] = useState(0);
  const [dialPinned, setDialPinned] = useState(false); // desktop: scroll rotates the wheel
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const onMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", onMotionChange);

    // Scroll-pinning a semicircle only reads as a wheel once there's real
    // width to arc through — below `lg` it collapses to auto-rotate instead.
    const widthQuery = window.matchMedia("(min-width: 1024px)");
    setDialPinned(widthQuery.matches);
    const onWidthChange = (e) => setDialPinned(e.matches);
    widthQuery.addEventListener("change", onWidthChange);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      widthQuery.removeEventListener("change", onWidthChange);
    };
  }, []);

  const layout = (progress) => {
    progressRef.current = progress;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Pinned directly rather than derived from center+radius, so the
    // focused item always lands in the left gutter clear of the copy
    // column regardless of viewport width or how large the radius is.
    const focusX = Math.min(170, vw * 0.13);
    const radius = Math.min(380, vw * 0.3);
    const centerX = focusX - radius;
    const centerY = vh * 0.5;
    const rotation = (0.5 - progress) * (N - 1) * ANGLE_STEP;

    let closestIdx = 0;
    let closestDist = Infinity;

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const baseAngle = (index - MID) * ANGLE_STEP;
      const angle = baseAngle + rotation;
      const rad = (angle * Math.PI) / 180;
      const x = centerX + radius * Math.cos(rad);
      const y = centerY + radius * Math.sin(rad);

      const dist = Math.abs(angle);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = index;
      }

      const focus = Math.max(0, 1 - dist / 40);
      const scale = 0.6 + focus * 0.7;
      const opacity = 0.18 + focus * 0.82;

      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
      el.style.opacity = opacity;
      el.style.zIndex = String(Math.round(100 - dist));
    });

    // The faint guide track the items ride along — same center/radius the
    // items themselves use, so it always matches the actual arc.
    if (arcRef.current) {
      arcRef.current.setAttribute("cx", String(centerX));
      arcRef.current.setAttribute("cy", String(centerY));
      arcRef.current.setAttribute("r", String(radius));
    }

    // Updates live as the wheel passes each item's center, not just once
    // scrolling settles — the headline's transition below is short and
    // un-queued specifically so it can keep up with this firing on every
    // scroll frame instead of backing up into a lagging animation queue.
    setActiveIndex((prev) => (prev === closestIdx ? prev : closestIdx));
  };

  // Desktop: the wheel rotates as GSAP/ScrollTrigger track scroll through
  // the pinned stage — Lenis already drives ScrollTrigger.update elsewhere
  // (useSmoothScroll), so this scrub picks up the same smoothed position.
  //
  // On top of that, Lenis's own Snap plugin resolves the scroll to the
  // nearest item once it settles ("mandatory" — always snaps, never rests
  // halfway between two objects), which is the carousel-like feel that was
  // missing before. Snap points are plain scroll-position pixels, computed
  // from the same start/end ScrollTrigger already derived for the pin, so
  // the two stay in lockstep. It's only armed while the pinned stage is
  // actually the thing on screen — onEnter/onLeave toggle it off outside
  // that range, otherwise it would yank the page back in from anywhere
  // below the hero the moment scrolling settled.
  useEffect(() => {
    if (!dialPinned || reducedMotion) return;
    let snap;

    const setupSnap = () => {
      snap?.destroy();
      snap = new Snap(lenis, { type: "mandatory", duration: 0.55 });
      const st = stRef.current;
      if (!st) return;
      for (let i = 0; i < N; i++) {
        snap.add(st.start + (i / (N - 1)) * (st.end - st.start));
      }
    };

    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        trigger: spacerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => layout(self.progress),
        onEnter: () => snap?.start(),
        onEnterBack: () => snap?.start(),
        onLeave: () => snap?.stop(),
        onLeaveBack: () => snap?.stop(),
      });
      // Matches the real scroll position (top of page) rather than
      // centering the wheel arbitrarily — otherwise the first scroll event
      // would jump-cut from a "fake" starting layout to the real one.
      layout(0);
    }, spacerRef);

    setupSnap();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        setupSnap();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      snap?.destroy();
      ctx.revert();
      stRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialPinned, reducedMotion]);

  // Mobile/tablet: the semicircle has nowhere to arc through at this width
  // (it was landing on top of the headline), so instead of positioning the
  // wheel there's no wheel geometry at all here — just a plain list further
  // down, cycling its highlight on a timer. Stops permanently the moment
  // someone taps a row themselves.
  const [autoCycle, setAutoCycle] = useState(true);
  useEffect(() => {
    if (dialPinned || reducedMotion || !autoCycle) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % N);
    }, 3200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialPinned, reducedMotion, autoCycle]);

  useEffect(() => {
    const onResize = () => layout(progressRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={spacerRef}
      className={`relative ${reducedMotion ? "" : "h-screen lg:h-[320vh]"}`}
    >
      <div
        className={`relative flex items-start ${
          reducedMotion
            ? "min-h-[max(100vh,90vw)] sm:min-h-[max(100vh,51vw)] pb-16"
            : "sticky top-0 h-screen overflow-hidden"
        }`}
      >
        {/* Full portrait, uncropped. Desktop/tablet: height-driven sizing
            (h-full + aspect-ratio) so it can never exceed the pinned
            viewport's height regardless of screen ratio — that's what
            "full viewport height" without the old clipping bug requires.
            Reduced-motion keeps the earlier width-driven sizing, which is
            what makes a portrait-orientation mobile screen safe: a
            height-driven box there would derive an absurdly wide portrait
            from a tall, narrow container. */}
        <div
          aria-hidden
          className={`pointer-events-none select-none absolute right-0 top-0 aspect-[2/3] ${
            reducedMotion ? "w-[60vw] sm:w-[34vw]" : "h-full"
          }`}
        >
          <img
            src={portrait}
            alt=''
            className='w-full h-full object-cover object-top opacity-75'
            style={{
              // Only the left edge fades, blending the photo into the copy
              // column — the right edge sits flush against the screen edge
              // with nothing to blend into.
              maskImage: "linear-gradient(to right, transparent, black 42%)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 42%)",
            }}
          />
        </div>

        {/* The dial itself — nine hand-drawn objects on a semicircle,
            rotated by the pinned scroll above. Desktop only: at narrower
            widths the semicircle has nowhere to arc through without
            landing on the headline, so below `lg` this doesn't render at
            all — the grouped list further down stands in for it. */}
        {dialPinned && !reducedMotion && (
          <div className='absolute inset-0 pointer-events-none select-none'>
            <svg className='absolute inset-0 w-full h-full overflow-visible'>
              <circle
                ref={arcRef}
                r='0'
                fill='none'
                stroke='#1f1f1f'
                strokeWidth='1'
                strokeDasharray='3 6'
              />
            </svg>
            {dialItems.map(({ icon }, i) => {
              const Comp = ICONS[icon];
              return (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  className={`absolute left-0 top-0 w-20 h-20 rounded-full bg-surface border flex items-center justify-center p-3 ${
                    i === activeIndex ? "border-accent" : "border-line"
                  }`}
                  style={{ filter: SHADOW }}
                >
                  <Comp className='w-full h-full' />
                </div>
              );
            })}
          </div>
        )}

        <div
          className={`${styles.sectionWide} w-full relative pt-[26vh] sm:pt-[24vh] ${
            reducedMotion ? "" : "h-full flex flex-col"
          } ${dialPinned && !reducedMotion ? "lg:mx-0 lg:ml-[17vw] lg:mr-auto lg:max-w-lg" : ""}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='flex items-center gap-3 mb-8'
          >
            <span className='w-1.5 h-1.5 rounded-full bg-accent' />
            {dialPinned && !reducedMotion ? (
              <p className='font-mono text-[11px] tracking-[0.16em] uppercase'>
                <span className='text-paper'>{dialItems[activeIndex].label}</span>
                <span className='text-muted'> · {String(activeIndex + 1).padStart(2, "0")} / {N}</span>
              </p>
            ) : (
              <p className={styles.label}>Harshit Sharmaa</p>
            )}
          </motion.div>

          {/* Headline AND paragraph swap together as one unit per dial item
              — reduced motion gets a static entrance only. Everyone else
              gets a fade + slight rise on every change: no AnimatePresence
              exit/enter queue, just a keyed remount, so it can keep pace
              with `activeIndex` updating on every scroll frame instead of
              backing up behind a slow animation when scrolling is fast.
              min-h on each piece reserves its expected line count so the
              progress rail further down doesn't hop as copy swaps in. */}
          {reducedMotion ? (
            <>
              <h1
                className={`${styles.heading} text-[15vw] sm:text-6xl md:text-8xl mb-3 sm:mb-1 text-balance`}
              >
                {dialItems[0].line}
              </h1>
              <p className='font-sans text-[#a3a3a3] text-lg sm:text-[18px] max-w-xl mt-3 leading-relaxed text-pretty'>
                {dialItems[0].body}
              </p>
              {dialItems[0].highlight && (
                <p className='font-sans text-accent text-lg sm:text-[18px] mt-1 leading-relaxed'>
                  {dialItems[0].highlight}
                </p>
              )}
            </>
          ) : (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <h1
                className={`${styles.heading} mb-3 sm:mb-1 min-h-[2.15em] text-balance ${
                  dialPinned
                    ? "text-[clamp(52px,4.8vw,76px)]"
                    : "text-[15vw] sm:text-6xl md:text-8xl"
                }`}
              >
                {dialItems[activeIndex].line}
              </h1>
              <p
                className={`font-sans text-[#a3a3a3] max-w-xl mt-3 leading-relaxed text-pretty min-h-[4.8em] sm:min-h-[3.6em] ${
                  dialPinned
                    ? "text-[18px] lg:min-h-[4.8em] xl:min-h-[4.2em]"
                    : "text-lg sm:text-xl"
                }`}
              >
                {dialItems[activeIndex].body}
              </p>
              {dialItems[activeIndex].highlight && (
                <p
                  className={`font-sans text-accent mt-1 leading-relaxed ${
                    dialPinned ? "text-[18px]" : "text-lg sm:text-xl"
                  }`}
                >
                  {dialItems[activeIndex].highlight}
                </p>
              )}
            </motion.div>
          )}

          {/* Below `lg` (and always under reduced motion) the semicircle
              doesn't render at all — this list, grouped by chapter, stands
              in for it. Auto-cycles until you actually tap a row, then it
              hands control over for good. */}
          {(!dialPinned || reducedMotion) && (
            <div className='flex flex-col gap-6 max-w-md mt-10'>
              {CHAPTERS.map((group) => (
                <div key={group.name}>
                  <p className='font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-2'>
                    {group.name}
                  </p>
                  <div className='grid gap-1.5' style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                    {group.indices.map((i) => {
                      const { icon, label, line } = dialItems[i];
                      const Comp = ICONS[icon];
                      const isActive = !reducedMotion && i === activeIndex;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setAutoCycle(false);
                            setActiveIndex(i);
                          }}
                          className={`flex items-center gap-3 min-h-[52px] rounded-xl border bg-surface px-3 py-2 text-left transition-colors ${
                            isActive ? "border-accent" : "border-line2"
                          }`}
                        >
                          <span className='w-10 h-10 flex items-center justify-center shrink-0'>
                            <Comp className='w-full h-full' />
                          </span>
                          <span className='min-w-0'>
                            <span className='block font-sans text-sm text-paper truncate'>{line}</span>
                            <span className='block font-mono text-[10px] tracking-wide uppercase text-muted'>
                              {label}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* mt-auto (only takes effect inside the flex column above, i.e.
              whenever motion is on) pins this to the bottom of the pinned
              stage at a fixed distance from the viewport edge, regardless
              of how tall the headline/body/highlight above it are — it no
              longer visibly hops up and down as that content's height
              changes per dial item. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`flex items-center gap-2 pb-10 sm:pb-12 ${
              reducedMotion ? "mt-16" : "mt-auto"
            }`}
          >
            <span className={styles.label}>Scroll</span>
            <span className='w-8 h-px bg-line' />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
