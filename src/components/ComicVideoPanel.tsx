import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, RotateCcw } from 'lucide-react';

interface ComicVideoPanelProps {
  src: string;
  poster: string;
  fallbackArt: React.ReactNode;
  ariaLabel: string;
  captionTitle?: string;
  autoPlay?: boolean;
  onEnded?: () => void;
}

export const ComicVideoPanel: React.FC<ComicVideoPanelProps> = ({
  src,
  poster,
  fallbackArt,
  ariaLabel,
  autoPlay = false,
  onEnded,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (autoPlay && videoRef.current && !isReducedMotion) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay was prevented by browser policy; stay on poster ready to click
          setIsPlaying(false);
        });
    }
  }, [autoPlay, isReducedMotion, src]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
    }
  };

  const replay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  if (hasError || isReducedMotion) {
    return <div className="comic-art-stage">{fallbackArt}</div>;
  }

  return (
    <div className="comic-video-stage" aria-label={ariaLabel}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        muted={isMuted}
        preload="metadata"
        onEnded={() => {
          setIsPlaying(false);
          if (onEnded) onEnded();
        }}
        onError={() => setHasError(true)}
        className="comic-panel-video"
      />
      <div className="comic-video-controls">
        <button
          type="button"
          className="comic-video-btn"
          onClick={isPlaying ? togglePlay : isPlaying === false && videoRef.current && videoRef.current.currentTime > 0 ? replay : togglePlay}
          aria-label={isPlaying ? 'Pause cinematic' : 'Play cinematic animation'}
        >
          {isPlaying ? '⏸ Pause' : videoRef.current && videoRef.current.currentTime > 0 ? <><RotateCcw size={14}/> Replay</> : <><Play size={14}/> Play clip</>}
        </button>
        <button
          type="button"
          className="comic-video-btn"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          {isMuted ? <VolumeX size={15}/> : <Volume2 size={15}/>}
        </button>
      </div>
    </div>
  );
};
