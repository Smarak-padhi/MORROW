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
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const ComicVideoPanel: React.FC<ComicVideoPanelProps> = ({
  src,
  poster,
  fallbackArt,
  ariaLabel,
  autoPlay = false,
  onEnded,
  isMuted: propMuted,
  onToggleMute,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [localMuted, setLocalMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Authoritative sound state: prop takes precedence if passed
  const effectiveMuted = propMuted !== undefined ? propMuted : localMuted;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Synchronize audio element muted property with effectiveMuted
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = effectiveMuted;
    }
  }, [effectiveMuted]);

  useEffect(() => {
    if (autoPlay && videoRef.current && !isReducedMotion) {
      videoRef.current.muted = effectiveMuted;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Browser autoplay policy might reject unmuted autoplay.
          // Fall back gracefully to playing muted if unmuted was rejected
          if (!effectiveMuted && videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                // If even muted autoplay fails, stay on poster ready to click
                setIsPlaying(false);
              });
          } else {
            setIsPlaying(false);
          }
        });
    }
  }, [autoPlay, isReducedMotion, src, effectiveMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  const replay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setHasError(true));
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleMute) {
      onToggleMute();
    } else {
      const next = !localMuted;
      if (videoRef.current) videoRef.current.muted = next;
      setLocalMuted(next);
    }
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
        muted={effectiveMuted}
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
          onClick={
            isPlaying
              ? togglePlay
              : isPlaying === false && videoRef.current && videoRef.current.currentTime > 0
              ? replay
              : togglePlay
          }
          aria-label={isPlaying ? 'Pause cinematic' : 'Play cinematic animation'}
        >
          {isPlaying ? (
            '⏸ Pause'
          ) : videoRef.current && videoRef.current.currentTime > 0 ? (
            <>
              <RotateCcw size={14} /> Replay
            </>
          ) : (
            <>
              <Play size={14} /> Play clip
            </>
          )}
        </button>
        <button
          type="button"
          className="comic-video-btn"
          onClick={handleToggleMute}
          aria-label={effectiveMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          {effectiveMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>
    </div>
  );
};
