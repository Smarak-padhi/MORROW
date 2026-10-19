import React, { useState, useRef } from 'react';
import { Film, Volume2, VolumeX } from 'lucide-react';

interface Props {
  dialog?: number;
}

export const ClockStage: React.FC<Props> = ({ dialog: _dialog }) => {
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
    <section className="storybook-stage clock-stage-bespoke" aria-label="Tomorrow Town square with the frozen clocktower and Professor Perfect">
      {/* Background Town Square Sky */}
      <div className="storybook-sky clock-town-sky" aria-hidden="true">
        <span className="clock-gear-silhouette gear-bg-1" />
        <span className="clock-gear-silhouette gear-bg-2" />
      </div>

      <div className="storybook-scene-label">
        <span>CHAPTER 03 · 04 / 06</span>
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

      {/* Main Stop-Motion SVG Tomorrow Town Stage */}
      <div className="stage-svg-wrap">
        <svg
          viewBox="0 0 600 380"
          preserveAspectRatio="xMidYMid slice"
          className="stage-svg-art"
          role="img"
          aria-label="Handcrafted stop-motion scene of Tomorrow Town featuring the giant frozen clock at 4:01, Professor Primrose Perfect with her stamp, Sir Clack, and Morrow"
        >
          <defs>
            <linearGradient id="clock-sky-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#413952" />
              <stop offset="50%" stopColor="#6C5B7B" />
              <stop offset="100%" stopColor="#9C88A8" />
            </linearGradient>
            <linearGradient id="brass-clock" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5DF9E" />
              <stop offset="50%" stopColor="#D4A853" />
              <stop offset="100%" stopColor="#8C6527" />
            </linearGradient>
            <linearGradient id="cobble-floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#696372" />
              <stop offset="100%" stopColor="#3E3847" />
            </linearGradient>
            <filter id="clock-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#1e1828" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Indigo & Plum twilight sky */}
          <rect width="600" height="380" fill="url(#clock-sky-grad)" />

          {/* BACKGROUND CROOKED BUILDINGS & OVERLAPPING ROOFTOPS */}
          <g className="tomorrow-town-architecture" opacity="0.85">
            {/* Far Left Crooked Porcelain Tower with Brass Spire */}
            <path d="M 0 320 L 0 110 L 25 70 L 50 110 L 55 320 Z" fill="#32283e" stroke="#1e1828" strokeWidth="2" />
            <polygon points="25,70 20,25 30,25" fill="url(#brass-clock)" />
            <rect x="15" y="130" width="16" height="24" rx="3" fill="#F7D560" opacity="0.85" />
            <line x1="23" y1="130" x2="23" y2="154" stroke="#1e1828" strokeWidth="1.5" />
            <rect x="15" y="180" width="16" height="24" rx="3" fill="#F7D560" opacity="0.65" />

            {/* Overlapping Mid-Left Mansard Roof Building */}
            <path d="M 45 320 L 45 140 L 115 100 L 175 130 L 175 320 Z" fill="#3d334c" stroke="#1e1828" strokeWidth="2.5" />
            <path d="M 40 140 L 115 95 L 180 130 Z" fill="#6C5B7B" stroke="#1e1828" strokeWidth="2" />
            {/* Warm illuminated attic dormer windows */}
            <rect x="70" y="150" width="22" height="30" rx="3" fill="#F7D560" opacity="0.9" />
            <line x1="81" y1="150" x2="81" y2="180" stroke="#1e1828" strokeWidth="1.5" />
            <rect x="120" y="150" width="22" height="30" rx="3" fill="#F7D560" opacity="0.9" />
            <line x1="131" y1="150" x2="131" y2="180" stroke="#1e1828" strokeWidth="1.5" />

            {/* Overlapping Far-Right Stepped Gable Townhouse */}
            <path d="M 420 320 L 420 130 L 460 130 L 460 90 L 500 90 L 500 50 L 540 50 L 540 90 L 570 90 L 570 320 Z" fill="#362d44" stroke="#1e1828" strokeWidth="2" />
            <rect x="445" y="150" width="20" height="28" rx="3" fill="#F7D560" opacity="0.8" />
            <rect x="495" y="150" width="20" height="28" rx="3" fill="#F7D560" opacity="0.8" />
            <rect x="525" y="150" width="20" height="28" rx="3" fill="#F7D560" opacity="0.85" />
            <rect x="485" y="105" width="18" height="22" rx="2" fill="#F7D560" opacity="0.75" />

            {/* Suspended Frozen Clock Hands Floating in the town air */}
            <g opacity="0.5" transform="translate(100, 60) rotate(-25)">
              <line x1="0" y1="0" x2="0" y2="35" stroke="url(#brass-clock)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="0" r="4" fill="#E8C878" />
            </g>
            <g opacity="0.5" transform="translate(520, 45) rotate(40)">
              <line x1="0" y1="0" x2="0" y2="45" stroke="url(#brass-clock)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="0" r="4" fill="#E8C878" />
            </g>
          </g>

          {/* GIGANTIC FROZEN CLOCK TOWER ARCHWAY (Center / Background) */}
          <g className="clocktower-arch" filter="url(#clock-shadow)">
            {/* Stone Pillar Left */}
            <rect x="180" y="30" width="30" height="290" fill="#4A4454" stroke="#252030" strokeWidth="3" />
            {/* Stone Pillar Right */}
            <rect x="390" y="30" width="30" height="290" fill="#4A4454" stroke="#252030" strokeWidth="3" />
            {/* Arch Top */}
            <path d="M 175 40 Q 300 -10 425 40 L 425 75 Q 300 25 175 75 Z" fill="#585263" stroke="#252030" strokeWidth="3" />

            {/* Giant Clock Face (Outer rim) */}
            <circle cx="300" cy="135" r="95" fill="#FFF8F1" stroke="url(#brass-clock)" strokeWidth="14" />
            <circle cx="300" cy="135" r="86" fill="none" stroke="#252030" strokeWidth="2.5" />

            {/* Roman Numerals XII, III, VI, IX and tick marks */}
            <g fill="#252030" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              <text x="300" y="65">XII</text>
              <text x="368" y="140">III</text>
              <text x="300" y="210">VI</text>
              <text x="232" y="140">IX</text>
              {/* Tick marks */}
              {[30, 60, 120, 150, 210, 240, 300, 330].map(deg => (
                <line
                  key={deg}
                  x1={300 + 74 * Math.cos((deg * Math.PI) / 180)}
                  y1={135 + 74 * Math.sin((deg * Math.PI) / 180)}
                  x2={300 + 82 * Math.cos((deg * Math.PI) / 180)}
                  y2={135 + 82 * Math.sin((deg * Math.PI) / 180)}
                  stroke="#252030"
                  strokeWidth="2"
                />
              ))}
            </g>

            {/* CLOCK HANDS: FROZEN EXACTLY AT 4:01 */}
            {/* Hour hand pointing at IV */}
            <line x1="300" y1="135" x2="338" y2="162" stroke="#252030" strokeWidth="6" strokeLinecap="round" />
            {/* Minute hand stuck at 4:01 (1 minute past XII) */}
            <line x1="300" y1="135" x2="306" y2="70" stroke="#252030" strokeWidth="4" strokeLinecap="round" />
            <circle cx="300" cy="135" r="9" fill="url(#brass-clock)" stroke="#252030" strokeWidth="2" />

            {/* Frozen clockwork cogs behind & below */}
            <g transform="translate(300, 240)">
              {/* Brass Cog */}
              <circle cx="-50" cy="0" r="32" fill="none" stroke="url(#brass-clock)" strokeWidth="9" strokeDasharray="8,6" />
              <circle cx="-50" cy="0" r="14" fill="#3E3847" stroke="url(#brass-clock)" strokeWidth="3" />
              {/* Entangled crooked golden thread binding the cogs */}
              <path d="M -50 -10 Q -30 20 20 0 T 60 15" fill="none" stroke="#E8C878" strokeWidth="3.5" strokeDasharray="4,4" />
              <circle cx="45" cy="0" r="26" fill="none" stroke="url(#brass-clock)" strokeWidth="8" strokeDasharray="7,5" />
            </g>
          </g>

          {/* TOWN SQUARE COBBLESTONES */}
          <path d="M -20 320 Q 200 295 400 310 T 620 295 L 620 380 L -20 380 Z" fill="url(#cobble-floor)" />
          {/* Cobblestone paving stones */}
          {[60, 130, 210, 310, 420, 500, 560].map((x, i) => (
            <ellipse key={i} cx={x} cy={345 + (i % 3) * 6} rx="22" ry="7" fill="#585263" stroke="#252030" strokeWidth="1" />
          ))}

          {/* REGULATIONS NOTICE BOARD (Left side) */}
          <g className="notice-board" transform="translate(45, 180)">
            <ellipse cx="40" cy="140" rx="28" ry="6" fill="#1e1828" opacity="0.3" />
            {/* Wooden post */}
            <rect x="36" y="50" width="8" height="90" fill="#5A4739" stroke="#252030" strokeWidth="2" />
            {/* Big parchment notice */}
            <rect x="0" y="0" width="80" height="65" rx="3" fill="#FFF8F1" stroke="#252030" strokeWidth="2" />
            {/* Official Purple Stamp: "CANCELLED" */}
            <rect x="8" y="10" width="64" height="20" fill="none" stroke="#A34063" strokeWidth="2" strokeDasharray="2,2" transform="rotate(-8 40 20)" />
            <text x="40" y="24" fill="#A34063" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-8 40 20)">
              CANCELLED
            </text>
            <text x="40" y="42" fill="#252030" fontSize="6.5" textAnchor="middle" fontFamily="sans-serif">
              Tomorrow: Delayed
            </text>
            <text x="40" y="54" fill="#6C5B7B" fontSize="5.5" textAnchor="middle">
              Fun: 4:00 - 4:02 Only
            </text>
          </g>

          {/* PROFESSOR PRIMROSE PERFECT (Mid-left - on inspection podium holding her brass ruler and rubber stamp) */}
          <g className="professor-perfect-group" transform="translate(150, 150)">
            {/* Shadow */}
            <ellipse cx="45" cy="170" rx="30" ry="7" fill="#1e1828" opacity="0.3" />
            {/* Wooden inspection box / podium */}
            <rect x="20" y="145" width="50" height="25" rx="2" fill="#63392A" stroke="#252030" strokeWidth="2" />
            <line x1="20" y1="153" x2="70" y2="153" stroke="#8F5D48" strokeWidth="2" />

            {/* Severe elegant Victorian dress (Lilac & Porcelain) */}
            <path d="M 32 145 L 38 85 L 52 85 L 58 145 Z" fill="#8E79A8" stroke="#252030" strokeWidth="2" />
            {/* Crisp white lace collar */}
            <path d="M 38 85 Q 45 94 52 85 Z" fill="#FFF8F1" stroke="#252030" strokeWidth="1.5" />

            {/* Porcelain Face (With faint delicate hairline crack - vulnerability foreshadowing!) */}
            <ellipse cx="45" cy="65" rx="13" ry="16" fill="#F8F6F4" stroke="#252030" strokeWidth="2" />
            {/* Delicate gold-mended hairline crack on left cheek */}
            <path d="M 36 62 Q 39 67 37 72" fill="none" stroke="#E8C878" strokeWidth="1.2" strokeLinecap="round" />
            {/* Severe bun hairstyle */}
            <ellipse cx="45" cy="50" rx="10" ry="8" fill="#392F3B" stroke="#252030" strokeWidth="2" />
            {/* Stern round spectacles */}
            <circle cx="41" cy="64" r="4.5" fill="none" stroke="#E8C878" strokeWidth="1.5" />
            <circle cx="49" cy="64" r="4.5" fill="none" stroke="#E8C878" strokeWidth="1.5" />
            <line x1="45.5" y1="64" x2="44.5" y2="64" stroke="#E8C878" strokeWidth="1.5" />
            {/* Severe straight mouth */}
            <line x1="41" y1="74" x2="49" y2="74" stroke="#252030" strokeWidth="1.5" />

            {/* Hand holding gigantic Perfection Stamp */}
            <line x1="52" y1="100" x2="68" y2="92" stroke="#F8F6F4" strokeWidth="3" strokeLinecap="round" />
            <rect x="68" y="82" width="8" height="18" rx="2" fill="#A34063" stroke="#252030" strokeWidth="1.5" />
            <rect x="74" y="85" width="4" height="12" fill="#E8C878" />
          </g>

          {/* SIR CLACK & MORROW (Right side of square, inspecting the frozen cogs) */}
          {/* Sir Clack */}
          <g className="clack-group" transform="translate(305, 230)">
            <ellipse cx="30" cy="85" rx="28" ry="6" fill="#1e1828" opacity="0.25" />
            {/* Toolbox body */}
            <rect x="5" y="40" width="50" height="42" rx="4" fill="#8F5D48" stroke="#252030" strokeWidth="2.5" />
            {/* Brass latches */}
            <rect x="12" y="42" width="6" height="8" rx="1" fill="#E8C878" stroke="#252030" strokeWidth="1" />
            <rect x="42" y="42" width="6" height="8" rx="1" fill="#E8C878" stroke="#252030" strokeWidth="1" />
            {/* Handle */}
            <path d="M 18 40 L 18 24 Q 30 18 42 24 L 42 40" fill="none" stroke="#63392A" strokeWidth="4" strokeLinecap="round" />
            {/* Grumpy eyes */}
            <ellipse cx="20" cy="55" rx="3.5" ry="4" fill="#252030" />
            <ellipse cx="40" cy="55" rx="3.5" ry="4" fill="#252030" />
            <line x1="15" y1="48" x2="25" y2="52" stroke="#252030" strokeWidth="2" strokeLinecap="round" />
            <line x1="45" y1="48" x2="35" y2="52" stroke="#252030" strokeWidth="2" strokeLinecap="round" />
            {/* Slotted brass keyhole mouth */}
            <rect x="28" y="66" width="4" height="6" rx="1" fill="#E8C878" stroke="#252030" strokeWidth="1" />
          </g>

          {/* Morrow */}
          <g className="morrow-clock-group" transform="translate(350, 195)">
            <ellipse cx="55" cy="130" rx="34" ry="8" fill="#1e1828" opacity="0.25" />
            {/* Spool tail */}
            <g transform="translate(18, 100) rotate(-10)">
              <rect x="0" y="0" width="9" height="12" rx="2" fill="#8F5D48" stroke="#252030" strokeWidth="1.5" />
              <rect x="2" y="2" width="5" height="8" fill="#E8C878" />
              <path d="M 4 12 Q 2 20 -8 24" fill="none" stroke="#E8C878" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            {/* Pear body */}
            <path
              d="M 38 65 C 20 90 25 125 55 128 C 85 125 90 90 72 65 C 68 52 42 52 38 65 Z"
              fill="#C98F70"
              stroke="#252030"
              strokeWidth="2.5"
            />
            {/* Asymmetric ears */}
            <path d="M 40 50 Q 30 18 42 14 Q 50 28 47 48 Z" fill="#C98F70" stroke="#252030" strokeWidth="2" />
            <path d="M 64 50 Q 82 28 90 38 Q 82 54 70 54 Z" fill="#C98F70" stroke="#252030" strokeWidth="2" />
            {/* Forehead gold diamond */}
            <path d="M 55 45 L 57.5 48.5 L 55 52 L 52.5 48.5 Z" fill="#E8C878" stroke="#252030" strokeWidth="1" />
            {/* Button eyes */}
            <circle cx="47" cy="60" r="3.8" fill="#252030" />
            <circle cx="48" cy="59" r="1" fill="#FFF8F1" />
            <circle cx="63" cy="60" r="3.8" fill="#252030" />
            <circle cx="64" cy="59" r="1" fill="#FFF8F1" />
            {/* Plump scarf */}
            <path d="M 34 72 Q 55 78 76 72 Q 78 80 55 84 Q 32 80 34 72 Z" fill="#A34063" stroke="#252030" strokeWidth="2" />
            <path d="M 40 78 L 36 100 L 44 98 Z" fill="#A34063" stroke="#252030" strokeWidth="1.5" />
            {/* Mitten paws holding big brass cog & needle */}
            <circle cx="42" cy="95" r="6" fill="#C98F70" stroke="#252030" strokeWidth="1.8" />
            <circle cx="68" cy="90" r="6" fill="#C98F70" stroke="#252030" strokeWidth="1.8" />
            {/* Needle pointed at clockwork cogs */}
            <line x1="70" y1="90" x2="90" y2="55" stroke="#E8C878" strokeWidth="2.8" strokeLinecap="round" />
            <ellipse cx="88" y1="58" rx="1.2" ry="2.5" fill="#252030" transform="rotate(20 88 58)" />
          </g>
        </svg>
      </div>

      <div className="storybook-scene-bottom">
        <span>Tomorrow Has Been Cancelled</span>
        <span>✦</span>
      </div>

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
          <div className="cinematic-reveal-stage" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <video
              ref={videoRef}
              src="/cinematics/clock-01-freeze.mp4"
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
