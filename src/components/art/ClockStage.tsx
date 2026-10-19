import React, { useState, useRef, useEffect } from 'react';
import { Film, Volume2, VolumeX } from 'lucide-react';
import { StopMotionActor } from './StopMotionActor';

interface Props {
  dialog?: number;
  puzzleDone?: boolean;
  onPuzzleSuccess?: () => void;
  onNextChapter?: () => void;
  playChime?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const ClockStage: React.FC<Props> = ({
  dialog = 0,
  puzzleDone = false,
  isMuted = true,
  onToggleMute,
}) => {
  const [showCinematic, setShowCinematic] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Synchronize video muted state with global sound
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

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

  const handleToggleMute = () => {
    if (onToggleMute) {
      onToggleMute();
    } else {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
      }
    }
  };

  return (
    <section
      className={`storybook-stage clock-stage-bespoke ${puzzleDone ? 'clock-stage-restored' : 'clock-stage-frozen'}`}
      aria-label="Tomorrow Town square with the miniature clocktower, Professor Primrose Perfect, Baker, and the frozen clock mechanism"
    >
      {/* 2.5D Living Photographic Stop-Motion Theater Plate */}
      <div className="storybook-sky clock-town-sky" aria-hidden="true">
        <img
          src="/environments/tomorrow-town.webp"
          alt=""
          className="tomorrow-town-bg-plate"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 42%',
            filter: puzzleDone
              ? 'brightness(1.08) saturate(1.2) contrast(1.02)'
              : 'brightness(0.92) saturate(0.88) contrast(1.05) hue-rotate(-8deg)',
            transition: 'filter 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* Dynamic Twilight / Golden Dawn Lighting Wash */}
        <div
          className="clock-lighting-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: puzzleDone
              ? 'radial-gradient(ellipse at 50% 30%, rgba(247, 213, 96, 0.28) 0%, rgba(232, 200, 120, 0.16) 45%, rgba(30, 24, 40, 0.25) 100%)'
              : 'radial-gradient(ellipse at 50% 35%, rgba(65, 57, 82, 0.35) 0%, rgba(26, 20, 32, 0.65) 100%)',
            transition: 'background 1.5s ease',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div className="storybook-scene-label">
        <span style={{ background: 'rgba(23, 18, 32, 0.7)', padding: '2px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)', color: '#FFF8F1', font: "700 0.68rem 'Space Mono', monospace" }}>
          CHAPTER 03 · {puzzleDone ? 'TOMORROW RESTORED ✦' : 'TIME LOCKED AT 4:01'}
        </span>
        <button
          type="button"
          className="balloon-action-btn balloon-video-btn"
          style={{ marginLeft: 'auto', padding: '3px 10px', fontSize: '0.72rem' }}
          onClick={() => setShowCinematic(true)}
          aria-label="Watch Tomorrow Town frozen clock reveal film"
        >
          <Film size={13} /> Reveal Film
        </button>
      </div>

      {/* Layered Interactive Multiplane Elements (SVG overlay matching 16:9 stage viewBox) */}
      <div className="stage-svg-wrap" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <svg
          viewBox="0 0 1000 562.5"
          preserveAspectRatio="xMidYMid slice"
          className="stage-svg-art"
          role="img"
          aria-label="Interactive stop-motion clockwork mechanism and town environment"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="brass-clock" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5DF9E" />
              <stop offset="50%" stopColor="#D4A853" />
              <stop offset="100%" stopColor="#8C6527" />
            </linearGradient>
            <filter id="gold-glow">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#F7D560" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* CHIMNEY STEAM: Frozen Stiff vs Rising Upon Dawn */}
          {/* Left Bakery Chimney (105, 270) */}
          {!puzzleDone ? (
            <g opacity="0.65" transform="translate(105, 255)">
              <path d="M 0 10 Q -6 0 0 -10 Q 6 -20 0 -28" fill="none" stroke="#E8E4EC" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3,3" />
              <circle cx="0" cy="-30" r="2.5" fill="#E8E4EC" />
            </g>
          ) : (
            <g className="chimney-steam-rising" fill="#FFF8F1" opacity="0.85">
              <circle cx="105" cy="250" r="4" />
              <circle cx="108" cy="235" r="6" />
              <circle cx="102" cy="218" r="8" />
              <circle cx="109" cy="198" r="11" opacity="0.5" />
            </g>
          )}

          {/* Right Townhouse Chimney (905, 200) */}
          {puzzleDone && (
            <g className="chimney-steam-rising" fill="#FFF8F1" opacity="0.8">
              <circle cx="905" cy="190" r="4" />
              <circle cx="908" cy="176" r="6" />
              <circle cx="904" cy="160" r="8" />
            </g>
          )}

          {/* REGULATIONS NOTICE BOARD (Left sidewalk, 70, 400) */}
          <g className="notice-board" transform="translate(65, 380)">
            <ellipse cx="36" cy="120" rx="22" ry="5" fill="#1e1828" opacity="0.4" />
            <rect x="33" y="55" width="7" height="65" fill="#5A4739" stroke="#252030" strokeWidth="1.5" />
            <rect x="0" y="0" width="72" height="58" rx="3" fill="#FFF8F1" stroke="#252030" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
            {!puzzleDone ? (
              <>
                <rect x="6" y="8" width="60" height="18" fill="none" stroke="#A34063" strokeWidth="2" strokeDasharray="2,2" transform="rotate(-7 36 17)" />
                <text x="36" y="21" fill="#A34063" fontSize="8.5" fontWeight="bold" textAnchor="middle" transform="rotate(-7 36 17)">
                  CANCELLED
                </text>
                <text x="36" y="38" fill="#252030" fontSize="6" textAnchor="middle" fontFamily="sans-serif">
                  Tomorrow: Delayed
                </text>
                <text x="36" y="49" fill="#6C5B7B" fontSize="5" textAnchor="middle">
                  Fun: 4:00 - 4:02 Only
                </text>
              </>
            ) : (
              <>
                <rect x="6" y="8" width="60" height="18" fill="none" stroke="#387A4C" strokeWidth="2" transform="rotate(-4 36 17)" />
                <text x="36" y="21" fill="#387A4C" fontSize="8.5" fontWeight="bold" textAnchor="middle" transform="rotate(-4 36 17)">
                  RESTORED
                </text>
                <text x="36" y="38" fill="#252030" fontSize="6" textAnchor="middle" fontFamily="sans-serif">
                  Imperfect & Lovely
                </text>
                <text x="36" y="49" fill="#D4A853" fontSize="5" textAnchor="middle">
                  All Hours Welcome ✦
                </text>
              </>
            )}
          </g>

          {/* DYNAMIC CLOCK MECHANISM OVERLAY ON CENTRAL CLOCK (Center at 490, 195) */}
          <g className="central-clock-overlay" transform="translate(490, 195)">
            {/* Ambient Clockwork Cogs (Accelerate and spin upon restart) */}
            <g className={puzzleDone ? 'clock-gear-spin-fast' : ''} opacity={puzzleDone ? '0.75' : '0.45'}>
              <circle cx="0" cy="55" r="28" fill="none" stroke="url(#brass-clock)" strokeWidth="7" strokeDasharray="7,5" />
              <circle cx="0" cy="55" r="12" fill="#221b2c" stroke="url(#brass-clock)" strokeWidth="2" />
            </g>

            {/* FROZEN AT 4:01 vs SWEEPING HANDS */}
            {/* Hour Hand: stuck at IV (120°) vs advanced forward */}
            <line
              x1="0"
              y1="0"
              x2={puzzleDone ? '-15' : '36'}
              y2={puzzleDone ? '42' : '22'}
              stroke="#252030"
              strokeWidth="5.5"
              strokeLinecap="round"
              style={{ transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            />
            {/* Minute Hand: stuck at 4:01 (6° from 12) vs sweeping freely */}
            <line
              x1="0"
              y1="0"
              x2={puzzleDone ? '-28' : '7'}
              y2={puzzleDone ? '-55' : '-65'}
              stroke="#F7D560"
              strokeWidth="3.5"
              strokeLinecap="round"
              className={puzzleDone ? 'clock-hand-sweeping' : ''}
            />
            {/* Central Spindle Hub */}
            <circle cx="0" cy="0" r="8" fill="url(#brass-clock)" stroke="#171220" strokeWidth="2" />
            {puzzleDone && <circle cx="0" cy="0" r="4" fill="#F7D560" filter="url(#gold-glow)" />}

            {/* Celebratory Sparkle Bursts */}
            {puzzleDone && (
              <g className="restart-sparkles" fill="#F7D560">
                <text x="-70" y="-70" fontSize="16">✦</text>
                <text x="75" y="-60" fontSize="18">✧</text>
                <text x="-80" y="80" fontSize="16">✧</text>
                <text x="80" y="75" fontSize="20">✦</text>
              </g>
            )}
          </g>

          {/* CROOKED LAMPPOST (745, 300) */}
          <g className="street-lamppost" transform="translate(745, 290)">
            <line x1="0" y1="160" x2="0" y2="15" stroke="#211a2c" strokeWidth="4" strokeLinecap="round" />
            <circle cx="0" cy="160" r="6" fill="#211a2c" />
            <line x1="-12" y1="22" x2="12" y2="18" stroke="#211a2c" strokeWidth="2.5" />
            <polygon points="-6,20 6,18 4,4 -4,6" fill={puzzleDone ? '#F7D560' : '#E8C878'} opacity={puzzleDone ? 0.95 : 0.6} stroke="#211a2c" strokeWidth="1.2" />
          </g>
        </svg>

        {/* =========================================================================
            STOP-MOTION CHARACTER ACTORS & DIALOGUE ANCHORS
           ========================================================================= */}

        {/* 1. BAKER (Far Left outside Bakery) */}
        <div
          className="stage-actor-anchor baker-anchor"
          style={{
            position: 'absolute',
            left: '14%',
            bottom: '8%',
            width: '90px',
            height: '130px',
            pointerEvents: 'auto',
            zIndex: 4,
          }}
        >
          <StopMotionActor
            character="baker"
            state={dialog === 0 ? 'talking' : puzzleDone ? 'happy' : 'idle'}
            isSpeaking={dialog === 0}
            alt="Baker holding wooden bread peel in flour-dusted linen apron"
            fallbackSvg={
              <svg viewBox="0 0 100 130" width="100%" height="100%">
                <ellipse cx="50" cy="120" rx="30" ry="6" fill="#1e1828" opacity="0.35" />
                <path d="M 32 118 L 38 65 L 62 65 L 68 118 Z" fill="#F4EFEA" stroke="#252030" strokeWidth="2.2" />
                <path d="M 40 75 L 60 75 L 63 118 L 37 118 Z" fill="#E8DEC8" stroke="#252030" strokeWidth="1.5" />
                <ellipse cx="52" cy="94" rx="8" ry="5" fill="#FFF8F1" opacity="0.8" />
                <circle cx="50" cy="48" r="16" fill="#E8B496" stroke="#252030" strokeWidth="2" />
                <circle cx="44" cy="46" r="2.5" fill="#252030" />
                <circle cx="56" cy="46" r="2.5" fill="#252030" />
                <path d="M 45 54 Q 50 58 55 54" fill="none" stroke="#252030" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 36 34 C 28 20 72 20 64 34 Z" fill="#FFF8F1" stroke="#252030" strokeWidth="2" />
                <rect x="36" y="32" width="28" height="6" fill="#F4EFEA" stroke="#252030" strokeWidth="1.5" />
                <line x1="62" y1="80" x2="88" y2="60" stroke="#8F5D48" strokeWidth="4" strokeLinecap="round" />
                <ellipse cx="88" cy="58" rx="8" ry="12" fill="#D4A853" stroke="#252030" strokeWidth="1.8" transform="rotate(30 88 58)" />
              </svg>
            }
          />
          {dialog === 0 && (
            <div className="character-speech-bubble bubble-baker" role="tooltip" aria-live="polite">
              <strong>Baker</strong>
              <p>I sold tomorrow’s bread yesterday! I haven’t baked it yet!</p>
            </div>
          )}
        </div>

        {/* 2. PROFESSOR PRIMROSE PERFECT (Center) */}
        <div
          className="stage-actor-anchor professor-anchor"
          style={{
            position: 'absolute',
            left: '48%',
            bottom: '12%',
            width: '100px',
            height: '170px',
            pointerEvents: 'auto',
            zIndex: 5,
          }}
        >
          {dialog === 1 && (
            <div className="character-speech-bubble bubble-professor" role="tooltip" aria-live="polite">
              <strong>Professor Perfect</strong>
              <p>Tomorrow introduces mistakes. Therefore tomorrow is cancelled.</p>
            </div>
          )}
        </div>

        {/* 3. MORROW (Center-Left beside Professor) */}
        <div
          className="stage-actor-anchor morrow-anchor"
          style={{
            position: 'absolute',
            left: '37%',
            bottom: '10%',
            width: '95px',
            height: '140px',
            pointerEvents: 'auto',
            zIndex: 5,
          }}
        >
          {dialog === 2 && (
            <div className="character-speech-bubble bubble-morrow" role="tooltip" aria-live="polite">
              <strong>Morrow</strong>
              <p>That seems a little extreme.</p>
            </div>
          )}
        </div>

        {/* 4. SIR CLACK (Right of Center) */}
        <div
          className="stage-actor-anchor clack-anchor"
          style={{
            position: 'absolute',
            left: '75%',
            bottom: '10%',
            width: '100px',
            height: '130px',
            pointerEvents: 'auto',
            zIndex: 4,
          }}
        >
          <StopMotionActor
            character="clack"
            state={dialog === 3 ? 'talking' : 'idle'}
            isSpeaking={dialog === 3}
            alt="Sir Clack the grumpy toolbox mentor"
            fallbackSvg={
              <svg viewBox="0 0 90 110" width="100%" height="100%">
                <ellipse cx="45" cy="100" rx="28" ry="6" fill="#1e1828" opacity="0.3" />
                <rect x="15" y="45" width="60" height="48" rx="4" fill="#8F5D48" stroke="#252030" strokeWidth="2.5" />
                <rect x="24" y="47" width="8" height="10" rx="1" fill="#E8C878" stroke="#252030" strokeWidth="1" />
                <rect x="58" y="47" width="8" height="10" rx="1" fill="#E8C878" stroke="#252030" strokeWidth="1" />
                <path d="M 30 45 L 30 26 Q 45 20 60 26 L 60 45" fill="none" stroke="#63392A" strokeWidth="4" strokeLinecap="round" />
                <ellipse cx="32" cy="64" rx="4" ry="4.5" fill="#252030" />
                <ellipse cx="58" cy="64" rx="4" ry="4.5" fill="#252030" />
                <line x1="26" y1="56" x2="38" y2="60" stroke="#252030" strokeWidth="2" strokeLinecap="round" />
                <line x1="64" y1="56" x2="52" y2="60" stroke="#252030" strokeWidth="2" strokeLinecap="round" />
                <rect x="42" y="76" width="6" height="8" rx="1" fill="#E8C878" stroke="#252030" strokeWidth="1" />
              </svg>
            }
          />
          {dialog === 3 && (
            <div className="character-speech-bubble bubble-clack" role="tooltip" aria-live="polite">
              <strong>Sir Clack</strong>
              <p>The paperwork must be dreadful.</p>
            </div>
          )}
        </div>

        {/* 5. PIPKIN (Perched on Street Lamppost) */}
        <div
          className="stage-actor-anchor pipkin-anchor"
          style={{
            position: 'absolute',
            left: '74%',
            bottom: '30%',
            width: '52px',
            height: '62px',
            pointerEvents: 'auto',
            zIndex: 6,
          }}
        >
          <StopMotionActor
            character="pipkin"
            state={puzzleDone ? 'happy' : 'idle'}
            alt="Pipkin perched on the street lamppost"
            fallbackSvg={
              <svg viewBox="0 0 60 60" width="100%" height="100%">
                <ellipse cx="30" cy="35" rx="14" ry="12" fill="#88A991" stroke="#252030" strokeWidth="1.8" />
                <circle cx="38" cy="28" r="8" fill="#88A991" stroke="#252030" strokeWidth="1.8" />
                <circle cx="41" cy="26" r="2" fill="#252030" />
                <polygon points="45,28 52,30 45,33" fill="#F7D560" stroke="#252030" strokeWidth="1" />
                <path d="M 20 38 Q 12 40 10 32" fill="none" stroke="#252030" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
          />
        </div>
      </div>

      <div className="storybook-scene-bottom">
        <span style={{ background: 'rgba(23, 18, 32, 0.7)', padding: '2px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)', color: '#FFF8F1', font: "700 0.68rem 'Space Mono', monospace" }}>
          {puzzleDone ? '✦ The Cogs Sing at Sunrise · Tomorrow Restored ✦' : 'Tomorrow Has Been Cancelled'}
        </span>
        <span style={{ background: 'rgba(23, 18, 32, 0.7)', padding: '2px 6px', borderRadius: '6px', backdropFilter: 'blur(4px)', color: '#F7D560' }}>✦</span>
      </div>

      {/* Cinematic Reveal Modal */}
      {showCinematic && (
        <div
          className="living-cinematic-bridge-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Tomorrow Town Frozen Clock Reveal"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 12,
            background: '#1a1420',
          }}
        >
          <div
            className="cinematic-reveal-stage"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <video
              ref={videoRef}
              src="/cinematics/clock-01-freeze.mp4"
              poster="/cinematics/clock-01-freeze-poster.jpg"
              className="cinematic-media-video"
              playsInline
              autoPlay
              muted={isMuted}
              loop
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <div
              className="comic-video-controls"
              role="toolbar"
              aria-label="Cinematic video controls"
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                display: 'flex',
                gap: '8px',
                zIndex: 10,
                background: 'rgba(26,20,32,0.85)',
                padding: '8px 12px',
                borderRadius: '12px',
              }}
            >
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
                onClick={handleToggleMute}
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
