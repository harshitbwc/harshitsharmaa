import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import vinyl from "../assets/vinyl.jpg";
import { useRadioPlayer } from "../hooks/useRadioPlayer";
import { useAskChat } from "../hooks/useAskChat";
import { useChatContext } from "../context/ChatContext";
import ChatPanel from "./ChatPanel";

// <1024px only: Radio and the chat trigger were two separate floating
// pills that could sit close enough to collide at phone widths — this
// combines them into one bar instead. FloatingWidgets renders this OR the
// desktop pair, never both, so there's only ever one <audio> element.
const MobileDock = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();
  const { audioRef, track, isPlaying, togglePlay } = useRadioPlayer();
  const { openSignal, prefillRef } = useChatContext();
  const chat = useAskChat();
  const { setInput } = chat;

  useEffect(() => {
    setChatOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (openSignal === 0) return;
    setInput(prefillRef.current);
    setChatOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSignal]);

  return (
    <>
      <audio ref={audioRef} src={track.url} preload='metadata' />

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className='fixed left-3 right-3 sm:left-auto sm:w-[380px] bottom-[76px] z-40 bg-surface/90 backdrop-blur-xl border border-line/60 shadow-glass rounded-2xl overflow-hidden'
          >
            <ChatPanel {...chat} onClose={() => setChatOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className='fixed left-3 right-3 bottom-3 max-w-[560px] mx-auto z-40 flex items-center h-12 bg-surface/80 backdrop-blur-xl border border-line/60 shadow-glass rounded-full pl-1.5 pr-1.5 gap-2'>
        <button
          onClick={togglePlay}
          className='flex items-center gap-2 flex-1 min-w-0 h-full pl-1'
          aria-label={isPlaying ? "Pause radio" : "Play radio"}
        >
          <img
            src={vinyl}
            alt=''
            className={`w-8 h-8 rounded-full object-cover border border-line2 shrink-0 ${
              isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
            }`}
          />
          <span className='font-sans text-xs text-paper truncate'>
            {isPlaying ? track.title : "Play lofi radio"}
          </span>
        </button>

        <button
          onClick={() => setChatOpen((o) => !o)}
          className='inline-flex items-center justify-center h-9 shrink-0 font-sans text-sm font-semibold text-black bg-accent rounded-full px-4'
        >
          {chatOpen ? "Close" : "Ask me anything"}
        </button>
      </div>
    </>
  );
};

export default MobileDock;
