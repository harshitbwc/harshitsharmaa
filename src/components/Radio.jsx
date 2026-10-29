import { useState } from "react";

import vinyl from "../assets/vinyl.jpg";
import { useRadioPlayer } from "../hooks/useRadioPlayer";

// Desktop-only pill (≥1024px) — FloatingWidgets renders MobileDock instead
// below that, never both at once (see useRadioPlayer's comment on why).
const Radio = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { audioRef, track, isPlaying, togglePlay, nextTrack, prevTrack } = useRadioPlayer();

  return (
    <div className='fixed bottom-6 left-6 z-30'>
      <audio ref={audioRef} src={track.url} preload='metadata' />

      <div
        className='relative flex items-center h-11 bg-surface/60 backdrop-blur-xl border border-line/60 shadow-glass rounded-full transition-all duration-300'
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* A static pill reads as decoration, not a control — this pulse
            is the "try me" signal before anyone's noticed it, same motif
            as the chat widget. Drops once it's actually playing, since the
            spinning glowing disc takes over that job at that point. */}
        {!isPlaying && (
          <span className='absolute inset-0 rounded-full border border-accent/50 animate-ping pointer-events-none' />
        )}
        <button
          onClick={togglePlay}
          className='w-11 h-11 flex-shrink-0 flex items-center justify-center'
          aria-label={isPlaying ? "Pause radio" : "Play radio"}
        >
          {/* The vinyl photo itself as the spinning disc, not a drawn icon. */}
          <img
            src={vinyl}
            alt=''
            className={`w-8 h-8 rounded-full object-cover border border-line2 ${
              isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
            }`}
          />
        </button>

        <div className='flex items-center gap-2 pr-4 whitespace-nowrap'>
          <span className='font-sans text-xs text-paper'>
            {isPlaying ? track.title : "Play lofi radio"}
          </span>

          <div
            className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-w-[60px] opacity-100 ml-1" : "max-w-0 opacity-0"
            }`}
          >
            <button
              onClick={prevTrack}
              className='font-sans text-xs text-muted hover:text-paper transition-colors'
              aria-label='Previous track'
            >
              ‹
            </button>
            <button
              onClick={nextTrack}
              className='font-sans text-xs text-muted hover:text-paper transition-colors'
              aria-label='Next track'
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Radio;
