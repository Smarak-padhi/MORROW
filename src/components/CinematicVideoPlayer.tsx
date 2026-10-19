import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, RotateCcw } from 'lucide-react';

export interface CinematicVideoPlayerProps {
  src: string;
  poster: string;
  title: string;
  speaker?: string;
  caption?: string;
  overlayArt?: React.ReactNode;
  fallbackStage?: React.ReactNode;
  ariaLabel: string;
  onEnded?: () => void;
  className?: string;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const CinematicVideoPlayer: React.FC<CinematicVideoPlayerProps> = ({
  src,
  poster,
  title,
  speaker,
  caption,
  overlayArt,
  fallbackStage,
  ariaLabel,
  onEnded,
  className = '',
  isMuted: propMuted,
  onToggleMute,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [localMuted, setLocalMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const effectiveMuted = propMuted !== undefined ? propMuted : localMuted;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = effectiveMuted;
    }
  }, [effectiveMuted]);

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
    return (
      <div className={`cinematic-fallback-stage ${className}`} aria-label={ariaLabel}>
        {fallbackStage || (
          <div className="cinematic-poster-fallback">
            <img src={poster} alt={title} className="cinematic-poster-img" />
            <div className="cinematic-caption-banner">
              {speaker && <strong className="cinematic-speaker">{speaker}</strong>}
              {caption && <p>{caption}</p>}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`cinematic-player-wrap ${className}`} aria-label={ariaLabel}>
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
        className="cinematic-media-video"
      />

      {/* Optional In-Scene Overlay (e.g. Duck's Ground-Cast Tree Shadow) */}
      {overlayArt}

      {/* Floating Control Buttons */}
      <div className="comic-video-controls" role="toolbar" aria-label="Cinematic video controls">
        <button
          type="button"
          className="comic-video-btn"
          onClick={
            isPlaying
              ? togglePlay
              : videoRef.current && videoRef.current.currentTime > 0
              ? replay
              : togglePlay
          }
          aria-label={
            isPlaying
              ? 'Pause cinematic'
              : videoRef.current && videoRef.current.currentTime > 0
              ? 'Replay cinematic'
              : `Play ${title}`
          }
        >
          {isPlaying ? (
            '⏸ Pause'
          ) : videoRef.current && videoRef.current.currentTime > 0 ? (
            <>
              <RotateCcw size={14} /> Replay
            </>
          ) : (
            <>
              <Play size={14} /> Play scene
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

      {/* Optional Integrated Caption Bar */}
      {caption && (
        <div className="cinematic-caption-overlay" aria-live="polite">
          {speaker && <span className="cinematic-speaker">{speaker}</span>}
          <p>{caption}</p>
        </div>
      )}
    </div>
  );
};
