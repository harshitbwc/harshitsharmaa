import { useEffect, useState } from "react";

import Radio from "./Radio";
import FloatingChat from "./FloatingChat";
import MobileDock from "./MobileDock";

// Picks exactly one of {desktop pair, mobile dock} — never both mounted at
// once, since each owns its own <audio> element via useRadioPlayer.
const FloatingWidgets = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop ? (
    <>
      <Radio />
      <FloatingChat />
    </>
  ) : (
    <MobileDock />
  );
};

export default FloatingWidgets;
