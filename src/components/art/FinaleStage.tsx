import React, { useState, useRef, useEffect } from 'react';
import { Film, Volume2, VolumeX } from 'lucide-react';
import { StopMotionActor } from './StopMotionActor';
import { Morrow } from './Morrow';
import { FinaleStitch } from '../inventions/FinaleStitch';

interface Props {
  dialog?: number;
  puzzleDone?: boolean;
  onPuzzleSuccess?: () => void;
  onNextChapter?: () => void;
  playChime?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const FinaleStage: React.FC<Props> = ({
  dialog = 0,
  puzzleDone = false,
  onPuzzleSuccess,
  playChime = () => {},
  isMuted = true,
  onToggleMute,
}) => {
  const [showCinematic, setShowCinematic] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Climax stage progression: 0=idle, 1=knot_glow, 2=seams_close, 3=heart_glow, 4=gears_slow, 5=paws_meet, 6=dawn_wash, 7=complete
  const [climaxStage, setClimaxStage] = useState<number>(puzzleDone ? 7 : 0);
  const effectiveStage = puzzleDone ? 7 : climaxStage;

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
    } else if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const isDawn = effectiveStage >= 6;

  // Emotional poses for The Unfinished One
  let unfinishedPose: 'idle' | 'worried' | 'action' | 'happy' | 'talking' = 'worried';
  if (effectiveStage >= 5) {
    unfinishedPose = 'happy';
  } else if (dialog === 2 || dialog === 4 || dialog === 7) {
    unfinishedPose = 'talking';
  } else if (dialog >= 5) {
    unfinishedPose = 'action';
  } else if (dialog >= 3) {
    unfinishedPose = 'idle';
  } else {
    unfinishedPose = 'worried';
  }

  // Emotional poses for Morrow
  let morrowPose: 'idle' | 'action' | 'talking' | 'happy' = 'action';
  if (effectiveStage >= 5) {
    morrowPose = 'happy';
  } else if (dialog === 1 || dialog === 3 || dialog === 6) {
    morrowPose = 'talking';
  } else {
    morrowPose = 'action';
  }

  // Emotional poses for Professor Perfect
  let professorPose: 'idle' | 'talking' | 'happy' = 'idle';
  if (effectiveStage >= 6) {
    professorPose = 'happy';
  } else if (dialog === 0 || dialog === 5) {
    professorPose = 'talking';
  } else {
    professorPose = 'idle';
  }

  return (
    <section
      className={`finale-stage-bespoke ${isDawn ? 'finale-stage-restored' : 'finale-stage-shadowed'}`}
      aria-label="Inside the Clock Tower Cathedral mechanism with Morrow, The Unfinished One, and Professor Primrose Perfect"
    >
      {/* 2.5D Living Photographic Stop-Motion Theater Plate */}
      <div className="finale-cathedral-theatre-plate storybook-stage">
        {/* Deep Gothic Midnight Atmosphere & Moonlit Sky */}
        <div className="storybook-sky cathedral-sky" aria-hidden="true">
          {/* Dynamic Cathedral Lighting Wash (Cross-fades to warm golden dawn in Stage 6+) */}
          <div
            className="cathedral-lighting-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: isDawn
                ? 'radial-gradient(ellipse at 50% 30%, rgba(247, 213, 96, 0.35) 0%, rgba(232, 200, 120, 0.22) 50%, rgba(30, 24, 40, 0.25) 100%)'
                : 'radial-gradient(ellipse at 50% 35%, rgba(65, 57, 82, 0.4) 0%, rgba(22, 18, 32, 0.85) 100%)',
              transition: 'background 2.5s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Golden dust particles floating in the cathedral light */}
          <div className="cathedral-dust-particles" aria-hidden="true">
            <span style={{ position: 'absolute', top: '22%', left: '28%', color: '#F7D560', fontSize: '10px', opacity: 0.6 }}>✧</span>
            <span style={{ position: 'absolute', top: '35%', left: '52%', color: '#FFF8F1', fontSize: '12px', opacity: 0.7 }}>✦</span>
            <span style={{ position: 'absolute', top: '18%', left: '74%', color: '#F7D560', fontSize: '9px', opacity: 0.5 }}>✧</span>
            <span style={{ position: 'absolute', top: '55%', left: '38%', color: '#FFF8F1', fontSize: '8px', opacity: 0.6 }}>✦</span>
            <span style={{ position: 'absolute', top: '48%', left: '68%', color: '#F7D560', fontSize: '11px', opacity: 0.7 }}>✧</span>
          </div>
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

        {/* =========================================================================
            CLOCK TOWER CATHEDRAL ARCHITECTURE (SVG multiplane depth stage)
           ========================================================================= */}
        <div className="stage-svg-wrap">
          <svg
            viewBox="0 0 960 540"
            preserveAspectRatio="xMidYMid slice"
            className="stage-svg-art cathedral-architecture-svg"
            role="img"
            aria-label="Clock Tower Cathedral interior with stained-glass rose window, monumental brass gears, suspended wooden catwalks, and character platforms"
          >
            <defs>
              <linearGradient id="cathedral-brass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F5DF9E" />
                <stop offset="50%" stopColor="#D4A853" />
                <stop offset="100%" stopColor="#8C6527" />
              </linearGradient>
              <linearGradient id="cathedral-copper" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E29272" />
                <stop offset="100%" stopColor="#8B4A34" />
              </linearGradient>
              <radialGradient id="cathedral-moon-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF8F1" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#E8C878" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#1B1726" stopOpacity="0" />
              </radialGradient>
              <filter id="cathedral-gold-glow">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#F7D560" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* VAST MOONLIT CLOCK FACE & STAINED-GLASS ROSE WINDOW (Center Background) */}
            <g transform="translate(480, 180)" className="cathedral-clock-face" opacity={isDawn ? 0.9 : 0.65}>
              <circle cx="0" cy="0" r="160" fill="url(#cathedral-moon-glow)" />
              <circle cx="0" cy="0" r="148" fill="none" stroke="url(#cathedral-brass)" strokeWidth="6" />
              <circle cx="0" cy="0" r="132" fill="none" stroke="#2B2238" strokeWidth="2" strokeDasharray="6,4" />

              {/* Gothic Tracery & Radial Spokes */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <line
                    key={deg}
                    x1={Math.sin(rad) * 45}
                    y1={-Math.cos(rad) * 45}
                    x2={Math.sin(rad) * 144}
                    y2={-Math.cos(rad) * 144}
                    stroke="url(#cathedral-brass)"
                    strokeWidth={deg % 90 === 0 ? 3 : 1.2}
                    opacity="0.65"
                  />
                );
              })}
              {/* Inner Rose Rosette */}
              <circle cx="0" cy="0" r="45" fill="#20182C" stroke="url(#cathedral-brass)" strokeWidth="3" />
              <circle cx="0" cy="0" r="22" fill="#2D233E" stroke="#E8C878" strokeWidth="1.5" />
            </g>

            {/* HANGING ROPES & SUSPENDED EMBROIDERY THREAD STRANDS */}
            <g className="hanging-ropes" stroke="#4A3F58" strokeWidth="1.8" opacity="0.6">
              <line x1="160" y1="0" x2="160" y2="340" strokeDasharray="8,3" />
              <line x1="800" y1="0" x2="800" y2="340" strokeDasharray="8,3" />
              <line x1="280" y1="0" x2="280" y2="170" />
              <line x1="680" y1="0" x2="680" y2="170" />
              {/* Golden trailing thread strands from previous attempts */}
              <path d="M 280 170 Q 340 230 380 200" fill="none" stroke="#E8C878" strokeWidth="1.5" opacity="0.5" />
              <path d="M 680 170 Q 620 230 580 210" fill="none" stroke="#E8C878" strokeWidth="1.5" opacity="0.5" />
            </g>

            {/* GIGANTIC CENTRAL ESCAPEMENT GEAR IN CHASM (480, 380) */}
            <g
              transform="translate(480, 420)"
              className={effectiveStage >= 4 ? 'cathedral-gear-spin-slow' : 'cathedral-gear-spin'}
            >
              <circle cx="0" cy="0" r="115" fill="none" stroke="url(#cathedral-brass)" strokeWidth="16" strokeDasharray="18,12" />
              <circle cx="0" cy="0" r="88" fill="#1b1526" stroke="#120c18" strokeWidth="3" />
              <line x1="-88" y1="0" x2="88" y2="0" stroke="url(#cathedral-brass)" strokeWidth="4" />
              <line x1="0" y1="-88" x2="0" y2="88" stroke="url(#cathedral-brass)" strokeWidth="4" />
              <circle cx="0" cy="0" r="24" fill="#2d223c" stroke="#E8C878" strokeWidth="2" />
            </g>

            {/* LEFT GEAR PLATFORM (Where The Unfinished One stands) */}
            <g className="cathedral-platform-left" transform="translate(190, 440)">
              <ellipse cx="0" cy="0" rx="150" ry="40" fill="#2d243a" stroke="url(#cathedral-brass)" strokeWidth="10" strokeDasharray="16,10" />
              <ellipse cx="0" cy="0" rx="115" ry="28" fill="#1e1828" stroke="#120c18" strokeWidth="2" />
              {/* Wooden Catwalk Plank Texture */}
              <line x1="-90" y1="-5" x2="90" y2="-5" stroke="#3d324c" strokeWidth="2" />
              <line x1="-80" y1="5" x2="80" y2="5" stroke="#3d324c" strokeWidth="2" />
            </g>

            {/* RIGHT GEAR PLATFORM (Where Morrow stands) */}
            <g className="cathedral-platform-right" transform="translate(770, 440)">
              <ellipse cx="0" cy="0" rx="150" ry="40" fill="#2d243a" stroke="url(#cathedral-brass)" strokeWidth="10" strokeDasharray="16,10" />
              <ellipse cx="0" cy="0" rx="115" ry="28" fill="#1e1828" stroke="#120c18" strokeWidth="2" />
              {/* Wooden Catwalk Plank Texture */}
              <line x1="-90" y1="-5" x2="90" y2="-5" stroke="#3d324c" strokeWidth="2" />
              <line x1="-80" y1="5" x2="80" y2="5" stroke="#3d324c" strokeWidth="2" />
            </g>

            {/* HIGH OBSERVATION BALCONY FOR PROFESSOR PERFECT (480, 115) */}
            <g className="cathedral-balcony" transform="translate(480, 120)">
              {/* Heavy brass corbels / support brackets */}
              <path d="M -50 30 L -50 0 L -30 0 Z" fill="#8C6527" stroke="#120c18" strokeWidth="1.5" />
              <path d="M 50 30 L 50 0 L 30 0 Z" fill="#8C6527" stroke="#120c18" strokeWidth="1.5" />
              {/* Catwalk platform floor */}
              <rect x="-65" y="0" width="130" height="14" rx="3" fill="#2d243a" stroke="url(#cathedral-brass)" strokeWidth="2" />
              {/* Ornamental Gothic Railing */}
              <rect x="-60" y="-22" width="120" height="22" fill="none" stroke="url(#cathedral-brass)" strokeWidth="1.8" />
              {[-50, -30, -10, 10, 30, 50].map((x) => (
                <line key={x} x1={x} y1="-22" x2={x} y2="0" stroke="url(#cathedral-brass)" strokeWidth="1.5" />
              ))}
              {/* Resting measuring ruler & stamp */}
              <rect x="-45" y="-6" width="30" height="4" fill="#D4A853" stroke="#120c18" strokeWidth="0.8" />
              <rect x="25" y="-12" width="8" height="12" rx="1" fill="#A34063" stroke="#120c18" strokeWidth="1" />
            </g>

            {/* BRIDGING THREAD BEAM (Illuminates in Stage 1+) */}
            {effectiveStage >= 1 && (
              <g className="cathedral-connecting-bridge" filter="url(#cathedral-gold-glow)">
                <path
                  d="M 230 420 Q 480 370 730 420"
                  fill="none"
                  stroke="#F7D560"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <circle cx="480" cy="395" r="7" fill="#A34063" stroke="#FFF8F1" strokeWidth="2" />
                <circle cx="480" cy="395" r="3" fill="#F7D560" />
              </g>
            )}
          </svg>
        </div>

        {/* =========================================================================
            STOP-MOTION CHARACTER ACTORS & ANCHORED DIALOGUE
           ========================================================================= */}

        {/* 1. THE UNFINISHED ONE (Left Platform) */}
        <div
          className="stage-actor-anchor unfinished-anchor"
          style={{
            position: 'absolute',
            left: effectiveStage >= 5 ? '32%' : '14%',
            bottom: '12%',
            width: '120px',
            height: '150px',
            pointerEvents: 'auto',
            zIndex: 4,
            transition: 'all 2.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <StopMotionActor
            character="unfinished"
            state={unfinishedPose}
            isSpeaking={dialog === 2 || dialog === 4 || dialog === 7}
            alt="The Unfinished One: navy patchwork felt fantasy creature with signature crooked chest knot"
            fallbackSvg={
              <svg viewBox="0 0 120 150" width="100%" height="100%">
                <ellipse cx="60" cy="140" rx="42" ry="8" fill="#161220" opacity="0.4" />
                {/* Navy felt body */}
                <path
                  d="M 40 70 Q 20 110 44 130 Q 75 145 90 120 Q 100 85 76 68 Q 55 58 40 70 Z"
                  fill="#25324A"
                  stroke="#161220"
                  strokeWidth="3"
                />
                {/* Asymmetric ears */}
                <path d="M 46 65 Q 32 30 44 24 Q 54 36 54 62 Z" fill="#25324A" stroke="#161220" strokeWidth="2.5" />
                <path d="M 68 62 Q 84 32 94 42 Q 84 62 76 62 Z" fill="#25324A" stroke="#161220" strokeWidth="2.5" />
                {/* Golden eyes */}
                <circle cx="54" cy="80" r="5" fill="#FFF8F1" stroke="#161220" strokeWidth="1.2" />
                <circle cx="54" cy="80" r="3" fill="#E8C878" />
                <circle cx="74" cy="80" r="5" fill="#FFF8F1" stroke="#161220" strokeWidth="1.2" />
                <circle cx="74" cy="80" r="3" fill="#E8C878" />
                {/* Crooked chest knot */}
                <circle cx="64" cy="102" r="4" fill="#A34063" stroke="#FFF8F1" strokeWidth="1.5" />
              </svg>
            }
          />

          {(dialog === 2 || dialog === 4 || dialog === 7) && (
            <div className="character-speech-bubble bubble-unfinished" role="tooltip" aria-live="polite">
              <strong>The Unfinished One</strong>
              <p>
                {dialog === 2 && 'You left me when my stitches came out wrong.'}
                {dialog === 4 && 'I kept the world together while you learned.'}
                {dialog === 7 && 'Shall we make one wonderfully crooked stitch together?'}
              </p>
            </div>
          )}
        </div>

        {/* 2. MORROW (Right Platform) */}
        <div
          className="stage-actor-anchor morrow-finale-anchor"
          style={{
            position: 'absolute',
            right: effectiveStage >= 5 ? '32%' : '14%',
            bottom: '12%',
            width: '115px',
            height: '145px',
            pointerEvents: 'auto',
            zIndex: 4,
            transition: 'all 2.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <StopMotionActor
            character="morrow"
            state={morrowPose}
            isSpeaking={dialog === 1 || dialog === 3 || dialog === 6}
            alt="Morrow the Stitchling apprentice with patchwork scarf and trailing golden thread"
            fallbackSvg={<Morrow small expression={isDawn ? 'happy' : 'focused'} />}
          />

          {(dialog === 1 || dialog === 3 || dialog === 6) && (
            <div className="character-speech-bubble bubble-morrow" role="tooltip" aria-live="polite">
              <strong>Morrow</strong>
              <p>
                {dialog === 1 && 'I know that crooked knot. It was my first creation.'}
                {dialog === 3 && 'I was scared. I am sorry I left you.'}
                {dialog === 6 && 'You should never have been sent away. Neither should my friend.'}
              </p>
            </div>
          )}
        </div>

        {/* 3. PROFESSOR PRIMROSE PERFECT (High Observation Balcony) */}
        <div
          className="stage-actor-anchor professor-balcony-anchor"
          style={{
            position: 'absolute',
            left: '50%',
            top: '7%',
            transform: 'translateX(-50%)',
            width: '85px',
            height: '110px',
            pointerEvents: 'auto',
            zIndex: 5,
          }}
        >
          <StopMotionActor
            character="professor"
            state={professorPose}
            isSpeaking={dialog === 0 || dialog === 5}
            alt="Professor Primrose Perfect in Victorian waistcoat with golden porcelain hairline crack"
            fallbackSvg={
              <svg viewBox="0 0 100 120" width="100%" height="100%">
                <ellipse cx="50" cy="110" rx="30" ry="7" fill="#1e1828" opacity="0.3" />
                <rect x="25" y="48" width="50" height="60" rx="6" fill="#FFF8F1" stroke="#252030" strokeWidth="2.5" />
                <path d="M 40 48 Q 50 56 60 48" fill="#A34063" />
                <circle cx="50" cy="38" r="22" fill="#E8DEC8" stroke="#252030" strokeWidth="2.5" />
                <circle cx="43" cy="36" r="3" fill="#252030" />
                <circle cx="57" cy="36" r="3" fill="#252030" />
                {effectiveStage >= 6 ? (
                  <path d="M 44 54 Q 50 62 56 54" fill="none" stroke="#252030" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <line x1="44" y1="55" x2="56" y2="55" stroke="#252030" strokeWidth="2" strokeLinecap="round" />
                )}
                {/* Hairline crack in porcelain */}
                <path d="M 52 18 Q 50 26 53 32" fill="none" stroke="#E8C878" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="34" y="24" width="32" height="18" fill="#252030" rx="2" />
                <ellipse cx="50" cy="40" rx="24" ry="4" fill="#252030" />
                <rect x="34" y="34" width="32" height="4" fill="#A34063" />
              </svg>
            }
          />

          {(dialog === 0 || dialog === 5) && (
            <div
              className="character-speech-bubble bubble-professor-balcony"
              role="tooltip"
              aria-live="polite"
              style={{
                position: 'absolute',
                top: '105%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'max-content',
                maxWidth: '240px',
              }}
            >
              <strong>Professor Perfect</strong>
              <p>
                {dialog === 0 && 'One perfect stitch, and the world will be approved.'}
                {dialog === 5 && 'They sent me away when they saw my porcelain cracks. I thought perfection would keep everyone safe.'}
              </p>
            </div>
          )}
        </div>

        <div className="storybook-scene-bottom">
          <span style={{ background: 'rgba(22, 18, 32, 0.75)', padding: '2px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)', color: '#FFF8F1', font: "700 0.68rem 'Space Mono', monospace" }}>
            {isDawn ? '✦ A Wonderfully Crooked Knot · The World Approved ✦' : 'The First Unfinished Thing'}
          </span>
          <span style={{ background: 'rgba(22, 18, 32, 0.75)', padding: '2px 6px', borderRadius: '6px', backdropFilter: 'blur(4px)', color: '#F7D560' }}>✦</span>
        </div>
      </div>

      {/* =========================================================================
          PHYSICAL FINAL STITCH WORKBENCH (Directly Playable Below Cathedral)
         ========================================================================= */}
      <div
        className="finale-stitch-workbench"
        style={{
          width: '100%',
          maxWidth: '820px',
          margin: '14px auto 0',
          position: 'relative',
          zIndex: 6,
        }}
      >
        <FinaleStitch
          onSuccess={() => {
            if (onPuzzleSuccess) onPuzzleSuccess();
          }}
          playChime={playChime}
          onClimaxStageChange={setClimaxStage}
          initialClimaxStage={puzzleDone ? 7 : 0}
        />
      </div>

      {/* Cinematic Reveal Modal */}
      {showCinematic && (
        <div
          className="living-cinematic-bridge-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Finale Crooked Knot Reveal Film"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 12,
            background: '#161220',
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
            <div className="comic-video-controls" role="toolbar" aria-label="Cinematic video controls" style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', gap: '8px', zIndex: 10, background: 'rgba(22,18,32,0.9)', padding: '8px 12px', borderRadius: '12px' }}>
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
                Return to Cathedral ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
