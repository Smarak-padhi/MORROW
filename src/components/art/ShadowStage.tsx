import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';

interface Props {
  dialog?: number;
}

export const ShadowStage: React.FC<Props> = ({ dialog: _dialog }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  return (
    <section className="storybook-stage shadow-stage-interactive" aria-label="Lost Shadows Village with the impossible tree shadow">
      {/* Background Cobblestone Village Atmosphere */}
      <div className="storybook-sky" aria-hidden="true">
        <span className="story-sun story-moon" />
        <span className="story-cloud cloud-a" />
        <span className="story-cloud cloud-b" />
      </div>

      <div className="storybook-landscape" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="storybook-scene-label">
        <span>CHAPTER 01</span>
        <span>02 / 06</span>
      </div>

      {/* Main Village Scene: Video or Illustrated Stop-Motion Canvas */}
      {!hasError ? (
        <div className="shadow-video-wrap">
          <video
            ref={videoRef}
            src="/cinematics/shadows-01-duck.mp4"
            poster="/cinematics/shadows-01-duck-poster.jpg"
            playsInline
            muted={isMuted}
            preload="metadata"
            onEnded={() => setIsPlaying(false)}
            onError={() => setHasError(true)}
            className="shadow-duck-video"
          />

          {/* THE MANDATORY IMPOSSIBLE TREE SHADOW: Anchored to Duck's feet */}
          <div className="impossible-tree-shadow" aria-hidden="true">
            <svg viewBox="0 0 240 300" className="tree-shadow-svg">
              <defs>
                <linearGradient id="tree-shadow-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a1420" stopOpacity="0.88" />
                  <stop offset="60%" stopColor="#1a1420" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#1a1420" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {/* Massive Gnarled Oak Tree Silhouette projecting from Duck's feet */}
              <path
                d="M 120 290 Q 115 230 110 180 Q 80 150 40 160 Q 20 120 50 90 Q 30 50 70 30 Q 120 10 170 30 Q 210 50 190 90 Q 220 120 200 160 Q 160 150 130 180 Q 125 230 120 290 Z"
                fill="url(#tree-shadow-grad)"
              />
              {/* Tree branches spreading across the cobblestones */}
              <path d="M 112 210 Q 75 180 55 130" stroke="#1a1420" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.8" />
              <path d="M 128 200 Q 165 170 185 130" stroke="#1a1420" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.8" />
            </svg>
          </div>

          {/* Video Control Pills */}
          <div className="comic-video-controls">
            <button type="button" className="comic-video-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause video' : 'Play video'}>
              {isPlaying ? '⏸ Pause' : <><Play size={14} /> Play Duck</>}
            </button>
            <button type="button" className="comic-video-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>
        </div>
      ) : (
        /* Accessible 2D Fallback Stage */
        <div className="shadow-fallback-stage">
          {/* Duck with the impossible tree shadow */}
          <div className="shadow-duck-fallback">
            <svg viewBox="0 0 200 240" className="duck-fallback-svg" role="img" aria-label="Village Duck with an enormous tree shadow">
              {/* Ground contact */}
              <ellipse cx="100" cy="220" rx="35" ry="7" fill="#1a1420" opacity="0.3" />
              {/* Duck Body */}
              <ellipse cx="100" cy="155" rx="42" ry="48" fill="#FBF7EE" stroke="#392F3B" strokeWidth="4" />
              <circle cx="100" cy="95" r="32" fill="#FBF7EE" stroke="#392F3B" strokeWidth="4" />
              {/* Beak with indignant expression */}
              <path d="M 100 102 L 128 108 L 100 118 Z" fill="#D98A3C" stroke="#392F3B" strokeWidth="3" />
              {/* Eyes */}
              <ellipse cx="90" cy="92" rx="5" ry="7" fill="#392F3B" />
              <circle cx="91" cy="89" r="2" fill="#FFF8F1" />
              <line x1="82" y1="84" x2="98" y2="88" stroke="#392F3B" strokeWidth="3" strokeLinecap="round" />
              {/* Sage scarf */}
              <path d="M 78 122 Q 100 114 122 122 Q 118 138 100 132 Q 82 136 78 122 Z" fill="#88A991" stroke="#392F3B" strokeWidth="3" />
              {/* Feet */}
              <path d="M 85 203 L 80 220 M 115 203 L 120 220" stroke="#D98A3C" strokeWidth="5" strokeLinecap="round" />
            </svg>
            {/* Tree Shadow */}
            <div className="impossible-tree-shadow static">
              <svg viewBox="0 0 240 300" className="tree-shadow-svg">
                <path
                  d="M 120 290 Q 115 230 110 180 Q 80 150 40 160 Q 20 120 50 90 Q 30 50 70 30 Q 120 10 170 30 Q 210 50 190 90 Q 220 120 200 160 Q 160 150 130 180 Q 125 230 120 290 Z"
                  fill="#1a1420"
                  opacity="0.8"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      <div className="story-atmosphere" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className="storybook-scene-bottom">
        <span>The Shadow Scandal</span>
        <span>✦</span>
      </div>
    </section>
  );
};
