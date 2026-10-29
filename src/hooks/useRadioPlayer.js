import { useEffect, useRef, useState } from "react";
import { song1, song2 } from "../assets";

const playlist = [
  { title: "Late Ship Hours", artist: "Harsh x Modicoin", url: song1 },
  { title: "Quiet Compile", artist: "Harsh x Modicoin", url: song2 },
];

// Shared audio-player logic, used by exactly one of the desktop Radio
// widget or the mobile combined dock at a time (FloatingWidgets picks
// which based on viewport, never both) — two independent instances would
// mean two <audio> elements fighting to play simultaneously.
export const useRadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef(null);
  const track = playlist[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnd = () => setTrackIndex((i) => (i + 1) % playlist.length);
    audio.addEventListener("ended", handleEnd);
    return () => audio.removeEventListener("ended", handleEnd);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.load();
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [trackIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const nextTrack = () => setTrackIndex((i) => (i + 1) % playlist.length);
  const prevTrack = () => setTrackIndex((i) => (i - 1 + playlist.length) % playlist.length);

  return { audioRef, track, isPlaying, togglePlay, nextTrack, prevTrack };
};
