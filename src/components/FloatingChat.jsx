import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import { useAskChat } from "../hooks/useAskChat";
import { useChatContext } from "../context/ChatContext";
import ChatPanel from "./ChatPanel";
import NeuralIcon from "./NeuralIcon";

const NUDGE_DELAY = 4000;
const NUDGE_VISIBLE_FOR = 6000;
const NUDGE_SESSION_KEY = "chat_nudge_shown";

// Desktop-only pill (≥1024px) — FloatingWidgets renders MobileDock instead
// below that. Global, always-on access to the same AI embedded on the
// site, bottom-right (Radio owns bottom-left).
const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const hasOpenedRef = useRef(false);
  const location = useLocation();
  const { openSignal, prefillRef } = useChatContext();
  const chat = useAskChat();
  const { setInput } = chat;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // A cross-component "open me" request (ProductDetail's "Ask about X").
  useEffect(() => {
    if (openSignal === 0) return;
    hasOpenedRef.current = true;
    setShowNudge(false);
    setInput(prefillRef.current);
    setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSignal]);

  // A one-time nudge per session — for anyone who'd rather ask than read.
  // Stops for good the moment the chat's actually been opened once.
  useEffect(() => {
    if (hasOpenedRef.current) return;
    let shown = false;
    try {
      shown = sessionStorage.getItem(NUDGE_SESSION_KEY) === "1";
    } catch {
      shown = false;
    }
    if (shown) return;

    const showTimer = setTimeout(() => {
      if (hasOpenedRef.current) return;
      setShowNudge(true);
      try {
        sessionStorage.setItem(NUDGE_SESSION_KEY, "1");
      } catch {
        // ignore
      }
    }, NUDGE_DELAY);
    const hideTimer = setTimeout(() => setShowNudge(false), NUDGE_DELAY + NUDGE_VISIBLE_FOR);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const openChatLocal = () => {
    hasOpenedRef.current = true;
    setShowNudge(false);
    setOpen(true);
  };

  return (
    <div className='fixed bottom-6 right-6 z-40'>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className='absolute bottom-[64px] right-0 w-[min(92vw,380px)] bg-surface/80 backdrop-blur-xl border border-line/60 shadow-glass rounded-2xl overflow-hidden origin-bottom-right'
          >
            <ChatPanel {...chat} onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNudge && !open && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={openChatLocal}
            className='absolute bottom-3 right-[60px] w-56 bg-surface/90 backdrop-blur-xl border border-line/60 shadow-glass rounded-xl pl-4 pr-7 py-3 cursor-pointer'
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNudge(false);
              }}
              aria-label='Dismiss'
              className='absolute top-1.5 right-2 text-muted hover:text-paper text-xs leading-none p-1'
            >
              ×
            </button>
            <p className='font-sans text-xs text-paper leading-relaxed'>
              Not in the mood to read? Just ask me directly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => (open ? setOpen(false) : openChatLocal())}
        aria-label={open ? "Close chat" : "Ask me anything"}
        className={`flex items-center gap-2.5 h-[52px] pl-2.5 pr-4 rounded-full bg-surface/80 backdrop-blur-xl border shadow-glass transition-colors ${
          open ? "border-accent" : "border-line/60 hover:border-accent/70"
        }`}
      >
        <span className='w-9 h-9 flex items-center justify-center shrink-0'>
          <NeuralIcon className='w-full h-full' />
        </span>
        <span className='font-sans text-sm text-paper whitespace-nowrap'>
          {open ? "Close" : "Ask me anything"}
        </span>
      </button>
    </div>
  );
};

export default FloatingChat;
