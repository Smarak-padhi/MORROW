import { useState, useCallback } from 'react';
import { Clock, CheckCircle2, Sparkles, Compass, Heart, Settings } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  playChime: () => void;
}

export function ImpossibleClock({ onSuccess, playChime }: Props) {
  // Step 1: Drag brass gear onto spindle
  const [gearFitted, setGearFitted] = useState(false);
  // Step 2: Rotate weather-vane dial into alignment (angle from 0 to 360, target is 180 deg)
  const [weatherAngle, setWeatherAngle] = useState(45);
  const [weatherAligned, setWeatherAligned] = useState(false);
  // Step 3: Insert glowing mainspring heart
  const [heartInserted, setHeartInserted] = useState(false);

  // Active drag state
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isRestarting, setIsRestarting] = useState(false);
  const [feedback, setFeedback] = useState('Step 1: Drag the brass cog onto the central spindle.');

  const isComplete = gearFitted && weatherAligned && heartInserted;

  // Handle Cog Placement
  const handleFitGear = useCallback(() => {
    if (gearFitted) return;
    playChime();
    setGearFitted(true);
    setActiveStep(2);
    setFeedback('Click! The shadow cog meshes with the escapement. Now rotate the weather-vane dial to true south (180°).');
  }, [gearFitted, playChime]);

  // Handle Weather Vane Dial Rotation
  const handleDialRotate = useCallback((delta: number) => {
    if (weatherAligned) return;
    setWeatherAngle((prev) => {
      const next = (prev + delta + 360) % 360;
      if (Math.abs(next - 180) <= 15) {
        // Snaps to alignment!
        playChime();
        setWeatherAligned(true);
        setActiveStep(3);
        setFeedback('Whirrr! The weather vane locks at 180°. Rainfall now powers the pendulum! Insert the crooked heart spring.');
        return 180;
      }
      return next;
    });
  }, [weatherAligned, playChime]);

  // Handle Heart Spring Insertion
  const handleInsertHeart = useCallback(() => {
    if (heartInserted || !gearFitted || !weatherAligned) return;
    playChime();
    setHeartInserted(true);
    setIsRestarting(true);
    setFeedback('TICK! TOCK! The impossible clock awakens with roaring brass gears and chime bells! Tomorrow is restored!');
    onSuccess();
  }, [heartInserted, gearFitted, weatherAligned, playChime, onSuccess]);

  return (
    <div
      className="game-container impossible-clock physical-clockwork-mechanism"
      role="application"
      aria-label="Physical Impossible Clock Mechanism: assemble spindle, weather-vane, and mainspring heart"
    >
      <div className="game-header">
        <div className="game-badge">
          <Clock size={18} aria-hidden="true" />
          <span>INVENTION 03 · PHYSICAL CLOCKWORK MECHANISM</span>
        </div>
        <h3>Restart Tomorrow’s Flow</h3>
        <p>
          Professor Perfect locked time at 4:01. Manipulate the miniature brass mechanisms in order: place the cog on its spindle, rotate the weather vane, and seat the crooked mainspring.
        </p>
      </div>

      {/* Mechanism Visual Canvas */}
      <div className="clock-stage physical-clock-stage" style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', background: 'radial-gradient(circle at 50% 50%, #2e263d 0%, #171220 100%)', padding: '16px' }}>
        <svg
          viewBox="0 0 340 320"
          className="clock-svg physical-clock-svg"
          role="img"
          aria-label={`Miniature clockwork mechanism. Cog: ${gearFitted ? 'Fitted' : 'Detached'}, Weather Dial: ${weatherAligned ? 'Aligned' : 'Off-center'}, Heart Spring: ${heartInserted ? 'Inserted' : 'Unseated'}`}
          style={{ width: '100%', maxHeight: '340px', display: 'block', margin: '0 auto' }}
        >
          <defs>
            <linearGradient id="brass-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5DF9E" />
              <stop offset="50%" stopColor="#D4A853" />
              <stop offset="100%" stopColor="#8C6527" />
            </linearGradient>
            <linearGradient id="copper-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E29272" />
              <stop offset="100%" stopColor="#8B4A34" />
            </linearGradient>
            <filter id="gold-clock-glow">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F7D560" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Outer Porcelain & Brass Clock Frame */}
          <circle cx="170" cy="160" r="145" fill="#21192e" stroke="url(#brass-grad)" strokeWidth="10" />
          <circle cx="170" cy="160" r="132" fill="#282035" stroke="#120c18" strokeWidth="3" />

          {/* Clock Ticks & Roman Numerals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 170 + Math.sin(rad) * 115;
            const y1 = 160 - Math.cos(rad) * 115;
            const x2 = 170 + Math.sin(rad) * 128;
            const y2 = 160 - Math.cos(rad) * 128;
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E8C878" strokeWidth={deg % 90 === 0 ? 3.5 : 1.5} opacity="0.6" />;
          })}

          {/* Background Brass Skeleton Gear Train */}
          <g opacity="0.35">
            <circle cx="120" cy="110" r="42" fill="none" stroke="url(#brass-grad)" strokeWidth="6" strokeDasharray="6,4" />
            <circle cx="220" cy="110" r="38" fill="none" stroke="url(#brass-grad)" strokeWidth="5" strokeDasharray="5,4" />
            <circle cx="170" cy="230" r="48" fill="none" stroke="url(#brass-grad)" strokeWidth="7" strokeDasharray="7,5" />
          </g>

          {/* STEP 1: Central Spindle & Brass Cog */}
          <g className="spindle-zone" transform="translate(170, 160)">
            {/* The bare spindle pin */}
            <circle cx="0" cy="0" r="12" fill="#140f1c" stroke="url(#brass-grad)" strokeWidth="3" />
            <circle cx="0" cy="0" r="4" fill="#F7D560" />

            {/* When fitted, the brass gear rotates smoothly (spins during restart!) */}
            {gearFitted && (
              <g className={isRestarting ? 'clock-gear-spin-fast' : 'clock-gear-spin'}>
                <circle cx="0" cy="0" r="54" fill="none" stroke="url(#brass-grad)" strokeWidth="14" strokeDasharray="14,10" />
                <circle cx="0" cy="0" r="42" fill="#2d233c" stroke="#120c18" strokeWidth="2" opacity="0.9" />
                <line x1="-42" y1="0" x2="42" y2="0" stroke="url(#brass-grad)" strokeWidth="3" />
                <line x1="0" y1="-42" x2="0" y2="42" stroke="url(#brass-grad)" strokeWidth="3" />
              </g>
            )}
          </g>

          {/* STEP 2: Weather Vane Dial at Top (170, 95) */}
          <g className="weather-vane-zone" transform="translate(170, 95)">
            <circle cx="0" cy="0" r="28" fill="#1e1828" stroke={weatherAligned ? '#88A991' : '#A34063'} strokeWidth="2.5" />
            <text x="0" y="-32" textAnchor="middle" fill="#E8C878" fontSize="8" fontWeight="bold">N</text>
            <text x="0" y="38" textAnchor="middle" fill={weatherAligned ? '#88A991' : '#F7D560'} fontSize="8" fontWeight="bold">S (180°)</text>

            {/* Weather pointer rotating */}
            <g transform={`rotate(${weatherAngle})`}>
              <line x1="0" y1="20" x2="0" y2="-20" stroke="url(#copper-grad)" strokeWidth="3.5" strokeLinecap="round" />
              <polygon points="0,-24 -5,-16 5,-16" fill="#F7D560" />
              <circle cx="0" cy="0" r="5" fill="#392F3B" stroke="#E8C878" strokeWidth="1.5" />
            </g>
          </g>

          {/* STEP 3: Crooked Heart Spring Slot at Bottom (170, 225) */}
          <g className="heart-spring-zone" transform="translate(170, 225)">
            <rect x="-30" y="-22" width="60" height="44" rx="8" fill="#1a1422" stroke={heartInserted ? '#F7D560' : 'rgba(232, 200, 120, 0.4)'} strokeWidth="2" strokeDasharray={heartInserted ? 'none' : '4,3'} />
            {!heartInserted && (
              <text x="0" y="4" textAnchor="middle" fill="#E8C878" fontSize="9" opacity="0.7">Heart Slot</text>
            )}
            {heartInserted && (
              <g filter="url(#gold-clock-glow)">
                {/* Coiled golden mainspring shaped like a heart */}
                <path
                  d="M -16 -6 C -24 -18, -4 -20, 0 -6 C 4 -20, 24 -18, 16 -6 C 10 6, 0 16, 0 16 C 0 16, -10 6, -16 -6 Z"
                  fill="#A34063"
                  stroke="#F7D560"
                  strokeWidth="2.5"
                />
                <circle cx="0" cy="0" r="4" fill="#F7D560" />
              </g>
            )}
          </g>

          {/* Hands: When complete, hands sweep forward past 4:01! */}
          <g transform="translate(170, 160)">
            {/* Hour Hand */}
            <line
              x1="0"
              y1="0"
              x2="35"
              y2={isRestarting ? '30' : '26'}
              stroke="#FFF8F1"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Minute Hand */}
            <line
              x1="0"
              y1="0"
              x2={isRestarting ? '-10' : '6'}
              y2={isRestarting ? '-70' : '-80'}
              stroke="#F7D560"
              strokeWidth="3.5"
              strokeLinecap="round"
              className={isRestarting ? 'clock-hand-sweeping' : ''}
            />
            <circle cx="0" cy="0" r="6" fill="#E8C878" stroke="#120c18" strokeWidth="2" />
          </g>

          {/* Celebratory Restart Bursts */}
          {isRestarting && (
            <g className="restart-sparkles" fill="#F7D560">
              <text x="50" y="60" fontSize="18">✦</text>
              <text x="270" y="70" fontSize="18">✧</text>
              <text x="60" y="270" fontSize="16">✧</text>
              <text x="270" y="260" fontSize="20">✦</text>
            </g>
          )}
        </svg>
      </div>

      {/* Tactile Manipulation Controls */}
      <div className="physical-mechanism-controls" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginTop: '14px' }}>
        {/* Step 1 Control: Brass Gear */}
        <button
          type="button"
          className={`gear-btn ${gearFitted ? 'fitted' : activeStep === 1 ? 'active' : ''}`}
          onClick={handleFitGear}
          disabled={gearFitted}
          aria-label="Fit Brass Cog on Spindle (Shadow Cog)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: '12px',
            background: gearFitted ? 'rgba(136, 169, 145, 0.15)' : 'var(--surface)',
            border: gearFitted ? '2px solid var(--sage)' : '2px solid var(--line)',
            cursor: gearFitted ? 'default' : 'pointer',
            textAlign: 'left',
          }}
        >
          <Settings size={22} color={gearFitted ? '#2e603b' : '#E8C878'} />
          <div>
            <strong style={{ display: 'block', fontSize: '0.9rem' }}>1. Fit Brass Cog on Spindle (Shadow Cog)</strong>
            <small style={{ color: 'var(--ink)', opacity: 0.8 }}>
              {gearFitted ? '✓ Meshed firmly on spindle' : 'Click/Tap to mount gear'}
            </small>
          </div>
        </button>

        {/* Step 2 Control: Weather-Vane Dial */}
        <div
          className={`dial-control-card ${weatherAligned ? 'aligned' : ''}`}
          style={{
            padding: '10px 14px',
            borderRadius: '12px',
            background: weatherAligned ? 'rgba(136, 169, 145, 0.15)' : 'var(--surface)',
            border: weatherAligned ? '2px solid var(--sage)' : '2px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', fontSize: '0.88rem' }}>
              <Compass size={18} color={weatherAligned ? '#2e603b' : '#9E88BA'} />
              2. Weather Vane: {weatherAngle}°
            </span>
            <small style={{ fontWeight: 800, color: weatherAligned ? '#2e603b' : '#A34063' }}>
              {weatherAligned ? '✓ Aligned South' : 'Target: 180°'}
            </small>
          </div>
          {!weatherAligned ? (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="balloon-action-btn"
                onClick={() => handleDialRotate(-45)}
                disabled={!gearFitted}
                style={{ flex: 1, padding: '4px 8px', fontSize: '0.78rem' }}
              >
                Rotate ↶ -45°
              </button>
              <button
                type="button"
                className="balloon-action-btn balloon-next-btn"
                onClick={() => handleDialRotate(45)}
                disabled={!gearFitted}
                style={{ flex: 1, padding: '4px 8px', fontSize: '0.78rem' }}
              >
                Rotate ↷ +45°
              </button>
              <button
                type="button"
                className="balloon-action-btn"
                onClick={() => {
                  playChime();
                  setWeatherAngle(180);
                  setWeatherAligned(true);
                  setActiveStep(3);
                  setFeedback('Whirrr! The weather vane locks at 180°. Rainfall now powers the pendulum! Insert the crooked heart spring.');
                }}
                disabled={!gearFitted}
                aria-label="Align Weather Spring"
                style={{ width: '100%', padding: '4px 8px', fontSize: '0.76rem', background: 'rgba(232, 200, 120, 0.15)' }}
              >
                Align Weather Spring ↷ 180°
              </button>
            </div>
          ) : (
            <small style={{ color: '#2e603b', fontWeight: 600 }}>Rainfall power flowing to pendulum.</small>
          )}
        </div>

        {/* Step 3 Control: Mainspring Heart */}
        <button
          type="button"
          className={`heart-btn ${heartInserted ? 'fitted' : activeStep === 3 ? 'active' : ''}`}
          onClick={handleInsertHeart}
          disabled={heartInserted || !weatherAligned}
          aria-label="Insert Heart Spring (Crooked Heart Key)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 14px',
            borderRadius: '12px',
            background: heartInserted ? 'rgba(136, 169, 145, 0.15)' : 'var(--surface)',
            border: heartInserted ? '2px solid var(--sage)' : '2px solid var(--line)',
            cursor: heartInserted || !weatherAligned ? 'default' : 'pointer',
            textAlign: 'left',
          }}
        >
          <Heart size={22} color={heartInserted ? '#2e603b' : '#A34063'} fill={heartInserted ? '#A34063' : 'none'} />
          <div>
            <strong style={{ display: 'block', fontSize: '0.9rem' }}>3. Insert Heart Spring (Crooked Heart Key)</strong>
            <small style={{ color: 'var(--ink)', opacity: 0.8 }}>
              {heartInserted ? '✓ Mainspring seated taut' : weatherAligned ? 'Click/Tap to seat heart spring' : 'Awaiting weather alignment'}
            </small>
          </div>
        </button>
      </div>

      {/* Live Status Banner */}
      <div className="game-reaction" role="status" aria-live="polite" style={{ marginTop: '14px' }}>
        {isComplete ? <Sparkles size={20} className="reaction-icon" /> : <CheckCircle2 size={20} className="reaction-icon" />}
        <p>{feedback}</p>
      </div>
    </div>
  );
}
