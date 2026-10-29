import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Hero, Bio, Work, ProductsTeaser, Contact } from "./index";
import { lenis } from "../lib/smoothScroll";

// Landing here with a hash (e.g. from the nav's "Work" link while on
// /products) needs a beat before scrolling: the target section has to
// actually mount and lay itself out first, or Lenis is scrolling toward a
// height that doesn't exist yet.
const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const timer = setTimeout(() => {
      const target = document.getElementById(id);
      if (target) lenis.scrollTo(target);
    }, 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  return (
    <>
      <Hero />
      <Bio />
      <Work />
      <ProductsTeaser />
      <Contact />
    </>
  );
};

export default Home;
