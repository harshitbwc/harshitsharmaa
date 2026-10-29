import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Created at module scope (not inside an effect) so it exists the moment
// any component imports it — React fires child effects (e.g. Hero's dial
// setup) before the parent App's, so an effect-scoped instance wouldn't
// exist yet when a child needed it on first mount.
export const lenis = new Lenis({ autoRaf: false });

/**
 * Wires the shared Lenis instance into GSAP's ticker so ScrollTrigger
 * stays in sync with Lenis's smoothed scroll position, and routes anchor
 * clicks through Lenis instead of the browser's instant jump.
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Lenis intercepts scroll, so plain `<a href="#id">` clicks need to be
    // routed through it or they jump instantly and fight the smoothed scroll.
    const onClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href").slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      // Section anchors are `.hash-span` elements with a built-in
      // `margin-top: -100px` to clear the fixed navbar, so no extra offset.
      lenis.scrollTo(target);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(onTick);
    };
  }, []);
};
