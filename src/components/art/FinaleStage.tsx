import React, { useState, useRef } from 'react';
import { Film, Volume2, VolumeX } from 'lucide-react';

interface Props {
  dialog?: number;
}

export const FinaleStage: React.FC<Props> = ({ dialog: _dialog }) => {
  const [showCinematic, setShowCinematic] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (videoRef.current) {
        if (next) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
      }
      return next;
    });
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  };

  return (
    <section className="storybook-stage finale-stage-bespoke" aria-label="Inside the Clock Tower mechanism with Morrow, The Unfinished One, and Professor Perfect">
      {/* Background Clockwork Cathedral Atmosphere */}
      <div className="storybook-sky finale-cathedral-sky" aria-hidden="true">
        <span className="tower-window-glow" />
      </div>

      <div className="storybook-scene-label">
        <span>FINALE · 05 / 06</span>
        <button
          type="button"
          className="balloon-action-btn balloon-video-btn"
          style={{ marginLeft: 'auto', padding: '3px 10px', fontSize: '0.72rem' }}
          onClick={() => setShowCinematic(true)}
          aria-label="Watch Finale Crooked Knot reveal film"
        >
          <Film size={13} /> Reveal Film
        </button>
      </div>

      {/* Main Stop-Motion SVG Finale Stage */}
      <div className="stage-svg-wrap">
        <svg
          viewBox="0 0 600 380"
          preserveAspectRatio="xMidYMid slice"
          className="stage-svg-art"
          role="img"
          aria-label="Handcrafted stop-motion scene of the Clock Tower mechanism where Morrow and The Unfinished One connect across the gear chasm with golden thread"
        >
          <defs>
            <linearGradient id="tower-night-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1B1726" />
              <stop offset="60%" stopColor="#2E253E" />
              <stop offset="100%" stopColor="#4A3B5F" />
            </linearGradient>
            <linearGradient id="bronze-gear" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5D78E" />
              <stop offset="50%" stopColor="#C49A45" />
              <stop offset="100%" stopColor="#75501B" />
            </linearGradient>
            <linearGradient id="navy-companion" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2E3C56" />
              <stop offset="100%" stopColor="#1A2234" />
            </linearGradient>
            <radialGradient id="thread-warmth" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E8C878" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#E8C878" stopOpacity="0" />
            </radialGradient>
            <filter id="golden-pulse" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Moody night background */}
          <rect width="600" height="380" fill="url(#tower-night-grad)" />

          {/* Stained-glass Rose Window in background */}
          <g opacity="0.25" transform="translate(300, 110)">
            <circle cx="0" cy="0" r="85" fill="none" stroke="#E8C878" strokeWidth="4" />
            <circle cx="0" cy="0" r="55" fill="none" stroke="#FFF8F1" strokeWidth="2" strokeDasharray="6,4" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
              <line
                key={deg}
                x1="0"
                y1="0"
                x2={85 * Math.cos((deg * Math.PI) / 180)}
                y2={85 * Math.sin((deg * Math.PI) / 180)}
                stroke="#E8C878"
                strokeWidth="2"
              />
            ))}
          </g>

          {/* GIGANTIC CLOCKWORK GEAR PLATFORMS */}
          {/* Left Gear Platform (Where The Unfinished One stands) */}
          <g className="gear-platform-left" transform="translate(130, 330)">
            <ellipse cx="0" cy="0" rx="140" ry="45" fill="#3A3245" stroke="url(#bronze-gear)" strokeWidth="12" strokeDasharray="18,12" />
            <ellipse cx="0" cy="0" rx="100" ry="32" fill="#262030" stroke="#E8C878" strokeWidth="3" />
          </g>

          {/* Right Gear Platform (Where Morrow stands) */}
          <g className="gear-platform-right" transform="translate(470, 330)">
            <ellipse cx="0" cy="0" rx="140" ry="45" fill="#3A3245" stroke="url(#bronze-gear)" strokeWidth="12" strokeDasharray="18,12" />
            <ellipse cx="0" cy="0" rx="100" ry="32" fill="#262030" stroke="#E8C878" strokeWidth="3" />
          </g>

          {/* Central Escapement Wheel & Pendulum in the chasm below */}
          <g className="central-chasm" transform="translate(300, 260)">
            <circle cx="0" cy="0" r="160" fill="url(#thread-warmth)" />
            {/* Escapement wheel */}
            <circle cx="0" cy="40" r="75" fill="none" stroke="url(#bronze-gear)" strokeWidth="10" strokeDasharray="14,10" opacity="0.6" />
            <circle cx="0" cy="40" r="25" fill="#1B1726" stroke="#E8C878" strokeWidth="3" />
          </g>

          {/* PROFESSOR PRIMROSE PERFECT (Center balcony / observation ledge) */}
          <g className="professor-finale" transform="translate(265, 80)">
            {/* Ledge */}
            <rect x="0" y="70" width="70" height="12" rx="2" fill="#4A3F58" stroke="#1B1726" strokeWidth="2" />
            <rect x="5" y="60" width="60" height="10" fill="none" stroke="#E8C878" strokeWidth="1.5" strokeDasharray="3,3" />

            {/* Professor silhouette with visible porcelain hairline crack */}
            {/* Dress */}
            <path d="M 24 70 L 28 35 L 42 35 L 46 70 Z" fill="#8E79A8" stroke="#1B1726" strokeWidth="2" />
            <path d="M 28 35 Q 35 42 42 35 Z" fill="#FFF8F1" stroke="#1B1726" strokeWidth="1.2" />
            {/* Porcelain Head */}
            <ellipse cx="35" cy="22" rx="10" ry="12" fill="#F8F6F4" stroke="#1B1726" strokeWidth="1.8" />
            {/* Delicate gold-repaired hairline crack glowing in the warm light */}
            <path d="M 28 20 Q 32 23 30 28" fill="none" stroke="#E8C878" strokeWidth="1.5" strokeLinecap="round" />
            {/* Hair Bun */}
            <ellipse cx="35" cy="10" rx="7" ry="6" fill="#2E253E" stroke="#1B1726" strokeWidth="1.5" />
            {/* Spectacles */}
            <circle cx="32" cy="21" r="3" fill="none" stroke="#E8C878" strokeWidth="1.2" />
            <circle cx="38" cy="21" r="3" fill="none" stroke="#E8C878" strokeWidth="1.2" />
            {/* Stamp resting on ledge - no longer striking! */}
            <rect x="50" y="62" width="6" height="8" rx="1" fill="#A34063" stroke="#1B1726" strokeWidth="1" />
          </g>

          {/* THE UNFINISHED ONE (Left - navy felt creature with crooked knot) */}
          <g className="unfinished-one-character" transform="translate(145, 190)">
            {/* Ground shadow */}
            <ellipse cx="50" cy="115" rx="36" ry="8" fill="#1B1726" opacity="0.3" />
            {/* Navy Felt Body */}
            <path
              d="M 35 60 Q 15 95 38 112 Q 65 125 78 105 Q 88 75 68 58 Q 50 48 35 60 Z"
              fill="url(#navy-companion)"
              stroke="#1B1726"
              strokeWidth="2.8"
            />
            {/* Asymmetric Left Ear (Crooked / bent) */}
            <path d="M 42 55 Q 30 25 40 18 Q 48 28 48 52 Z" fill="#25324A" stroke="#1B1726" strokeWidth="2.2" />
            {/* Asymmetric Right Ear (Perked) */}
            <path d="M 60 52 Q 74 28 82 36 Q 74 52 66 52 Z" fill="#25324A" stroke="#1B1726" strokeWidth="2.2" />
            {/* Glowing Golden Eyes */}
            <circle cx="48" cy="68" r="5" fill="#FFF8F1" stroke="#1B1726" strokeWidth="1.2" />
            <circle cx="48" cy="68" r="3" fill="#E8C878" />
            <circle cx="66" cy="68" r="5" fill="#FFF8F1" stroke="#1B1726" strokeWidth="1.2" />
            <circle cx="66" cy="68" r="3" fill="#E8C878" />
            {/* Gentle smile */}
            <path d="M 52 78 Q 57 83 62 78" fill="none" stroke="#E8C878" strokeWidth="1.8" strokeLinecap="round" />
            {/* Signature Crooked Knot on Chest */}
            <g transform="translate(56, 88)">
              <circle cx="0" cy="0" r="3.5" fill="#E8C878" />
              <path d="M -5 3 Q 0 8 5 2" fill="none" stroke="#E8C878" strokeWidth="2" strokeLinecap="round" />
              <circle cx="-3" cy="5" r="1.5" fill="#A34063" />
            </g>
            {/* Mitten paw reaching across the chasm */}
            <path d="M 68 85 Q 88 88 108 85" fill="none" stroke="#25324A" strokeWidth="14" strokeLinecap="round" />
            <circle cx="108" cy="85" r="7" fill="#25324A" stroke="#1B1726" strokeWidth="2" />
          </g>

          {/* MORROW (Right - peach felt, plum scarf, reaching across to his first friend) */}
          <g className="morrow-finale-group" transform="translate(365, 190)">
            {/* Ground shadow */}
            <ellipse cx="50" cy="115" rx="36" ry="8" fill="#1B1726" opacity="0.3" />
            {/* Spool Tail */}
            <g transform="translate(70, 92) rotate(15)">
              <rect x="0" y="0" width="9" height="12" rx="2" fill="#8F5D48" stroke="#1B1726" strokeWidth="1.5" />
              <rect x="2" y="2" width="5" height="8" fill="#E8C878" />
              <path d="M 4 12 Q 8 20 18 22" fill="none" stroke="#E8C878" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            {/* Pear Body */}
            <path
              d="M 32 60 C 15 88 20 115 50 118 C 80 115 85 88 68 60 C 62 48 38 48 32 60 Z"
              fill="#C98F70"
              stroke="#1B1726"
              strokeWidth="2.8"
            />
            {/* Asymmetric Ears */}
            <path d="M 35 48 Q 24 18 36 14 Q 44 26 42 46 Z" fill="#C98F70" stroke="#1B1726" strokeWidth="2.2" />
            <path d="M 58 48 Q 75 26 84 36 Q 76 52 64 52 Z" fill="#C98F70" stroke="#1B1726" strokeWidth="2.2" />
            {/* Forehead Gold Diamond */}
            <path d="M 50 42 L 52.5 45.5 L 50 49 L 47.5 45.5 Z" fill="#E8C878" stroke="#1B1726" strokeWidth="1" />
            {/* Button Eyes */}
            <circle cx="42" cy="56" r="4" fill="#1B1726" />
            <circle cx="43" cy="55" r="1.2" fill="#FFF8F1" />
            <circle cx="58" cy="56" r="4" fill="#1B1726" />
            <circle cx="59" cy="55" r="1.2" fill="#FFF8F1" />
            {/* Tender open mouth */}
            <ellipse cx="50" cy="65" rx="2.5" ry="3.5" fill="#1B1726" />
            {/* Plum Scarf */}
            <path d="M 28 68 Q 50 74 72 68 Q 74 76 50 80 Q 26 76 28 68 Z" fill="#A34063" stroke="#1B1726" strokeWidth="2.2" />
            <path d="M 54 74 L 58 96 L 66 94 Z" fill="#A34063" stroke="#1B1726" strokeWidth="1.5" />
            {/* Mitten paw reaching across the chasm */}
            <path d="M 32 82 Q 10 85 -10 82" fill="none" stroke="#C98F70" strokeWidth="14" strokeLinecap="round" />
            <circle cx="-10" cy="82" r="7" fill="#C98F70" stroke="#1B1726" strokeWidth="2" />
          </g>

          {/* THE GLOWING CROOKED GOLDEN THREAD BRIDGING THE GAP */}
          <g className="golden-bridge" filter="url(#golden-pulse)">
            {/* Waving crooked golden thread */}
            <path
              d="M 253 275 Q 285 252 304 268 T 355 272"
              fill="none"
              stroke="#E8C878"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Center signature crooked knot */}
            <circle cx="304" cy="268" r="5" fill="#A34063" stroke="#FFF8F1" strokeWidth="1.5" />
            <path d="M 299 262 Q 304 256 309 262 T 304 274" fill="none" stroke="#E8C878" strokeWidth="3" />
            {/* Floating golden thread particles */}
            <circle cx="270" cy="255" r="2.5" fill="#FFF8F1" />
            <circle cx="290" cy="280" r="2" fill="#E8C878" />
            <circle cx="320" cy="258" r="2.5" fill="#FFF8F1" />
            <circle cx="340" cy="280" r="2" fill="#E8C878" />
          </g>
        </svg>
      </div>

      <div className="storybook-scene-bottom">
        <span>The First Unfinished Thing</span>
        <span>✦</span>
      </div>

      {showCinematic && (
        <div
          className="living-cinematic-bridge-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Finale Crooked Knot Reveal"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 12,
            background: '#1a1420',
          }}
        >
          <div className="cinematic-reveal-stage" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <video
              ref={videoRef}
              src="/cinematics/finale-01-knot.mp4"
              className="cinematic-media-video"
              playsInline
              autoPlay
              muted={isMuted}
              loop
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <div className="comic-video-controls" role="toolbar" aria-label="Cinematic video controls" style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', gap: '8px', zIndex: 10, background: 'rgba(26,20,32,0.85)', padding: '8px 12px', borderRadius: '12px' }}>
              <button
                type="button"
                className="comic-video-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause cinematic' : 'Play cinematic'}
              >
                {isPlaying ? '⏸ Pause' : '▶ Play scene'}
              </button>
              <button
                type="button"
                className="comic-video-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <button
                type="button"
                className="balloon-action-btn balloon-next-btn"
                onClick={() => setShowCinematic(false)}
                style={{ marginLeft: 'auto' }}
              >
                Return to Scene ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
