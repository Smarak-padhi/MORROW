import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Clock, CheckCircle2, Sparkles, Compass, Heart, Settings, Check } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  playChime: () => void;
  onRestartStageChange?: (stage: number) => void;
  initialRestartStage?: number;
}

export function ImpossibleClock({
  onSuccess,
  playChime,
  onRestartStageChange,
  initialRestartStage = 0,
}: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Puzzle step states
  const [gearFitted, setGearFitted] = useState(initialRestartStage >= 1);
  const [weatherAngle, setWeatherAngle] = useState(initialRestartStage >= 1 ? 180 : 45);
  const [weatherAligned, setWeatherAligned] = useState(initialRestartStage >= 1);
  const [heartInserted, setHeartInserted] = useState(initialRestartStage >= 1);

  // Feedback banner
  const [feedback, setFeedback] = useState(
    'Step 1: Drag the loose brass cog onto the central clock spindle.'
  );

  // Direct manipulation drag states
  const [isDraggingGear, setIsDraggingGear] = useState(false);
  const isDraggingGearRef = useRef(false);
  const [gearPos, setGearPos] = useState({ x: 45, y: 160 });

  const [isDraggingDial, setIsDraggingDial] = useState(false);
  const isDraggingDialRef = useRef(false);

  const [isDraggingHeart, setIsDraggingHeart] = useState(false);
  const isDraggingHeartRef = useRef(false);
  const [heartPos, setHeartPos] = useState({ x: 335, y: 235 });

  // Timed restart stages: 0=idle, 1=heart_glow, 2=gears, 3=hands, 4=steam, 5=lights, 6=professor, 7=dawn, 8=complete
  const [restartStage, setRestartStage] = useState<number>(initialRestartStage);

  // Notify parent of restart stage progression
  useEffect(() => {
    if (onRestartStageChange) {
      onRestartStageChange(restartStage);
    }
  }, [restartStage, onRestartStageChange]);

  // Helper to convert client pointer to SVG coordinate system
  const getSvgCoordinates = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } | null => {
      const svg = svgRef.current;
      if (!svg) return null;
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const svgPt = pt.matrixTransform(ctm.inverse());
      return { x: svgPt.x, y: svgPt.y };
    },
    []
  );

  // =========================================================================
  // STEP 1: BRASS COG DIRECT DRAG & DROP
  // =========================================================================
  const handleGearPointerDown = (e: React.PointerEvent) => {
    if (gearFitted) return;
    e.preventDefault();
    e.stopPropagation();
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
      // Browser fallback
    }
    isDraggingGearRef.current = true;
    setIsDraggingGear(true);
    const coords = getSvgCoordinates(e.clientX, e.clientY);
    if (coords) setGearPos(coords);
  };

  const handleGearPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingGearRef.current || gearFitted) return;
    e.preventDefault();
    const coords = getSvgCoordinates(e.clientX, e.clientY);
    if (coords) {
      setGearPos(coords);
    }
  };

  const snapGearToSpindle = useCallback(() => {
    playChime();
    setGearFitted(true);
    setGearPos({ x: 190, y: 160 });
    isDraggingGearRef.current = false;
    setIsDraggingGear(false);
    setFeedback(
      'Click! The brass shadow cog meshes with the escapement. Now rotate the weather dial to South (180°).'
    );
  }, [playChime]);

  const handleGearPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingGearRef.current || gearFitted) return;
    e.preventDefault();
    isDraggingGearRef.current = false;
    setIsDraggingGear(false);
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      // Fallback
    }

    const coords = getSvgCoordinates(e.clientX, e.clientY);
    const pos = coords || gearPos;
    // Distance to central spindle (190, 160)
    const dist = Math.hypot(pos.x - 190, pos.y - 160);
    if (dist <= 65) {
      snapGearToSpindle();
    } else {
      // Spring back to workbench tray
      setGearPos({ x: 45, y: 160 });
      setFeedback('Almost! Drag the brass cog right onto the central spindle pin.');
    }
  };

  // =========================================================================
  // STEP 2: WEATHER DIAL DIRECT ROTATION
  // =========================================================================
  const snapDialToSouth = useCallback(() => {
    playChime();
    setWeatherAngle(180);
    setWeatherAligned(true);
    isDraggingDialRef.current = false;
    setIsDraggingDial(false);
    setFeedback(
      'Whirrr! The weather vane locks at 180° South! Rainfall flows into the clock. Now seat the crooked heart spring.'
    );
  }, [playChime]);

  const updateDialAngle = useCallback((clientX: number, clientY: number) => {
    const coords = getSvgCoordinates(clientX, clientY);
    if (!coords) return;
    // Weather dial center is at (190, 85)
    const rad = Math.atan2(coords.y - 85, coords.x - 190);
    const deg = Math.round((((rad * 180) / Math.PI + 90 + 360) % 360));
    setWeatherAngle(deg);

    // Magnetic snap to South (180°) within 25 degrees
    if (Math.abs(deg - 180) <= 25) {
      snapDialToSouth();
    }
  }, [getSvgCoordinates, snapDialToSouth]);

  const handleDialPointerDown = (e: React.PointerEvent) => {
    if (weatherAligned || !gearFitted) return;
    e.preventDefault();
    e.stopPropagation();
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
    isDraggingDialRef.current = true;
    setIsDraggingDial(true);
    updateDialAngle(e.clientX, e.clientY);
  };

  const handleDialPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingDialRef.current || weatherAligned) return;
    e.preventDefault();
    updateDialAngle(e.clientX, e.clientY);
  };

  const handleDialPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingDialRef.current || weatherAligned) return;
    e.preventDefault();
    isDraggingDialRef.current = false;
    setIsDraggingDial(false);
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
    const coords = getSvgCoordinates(e.clientX, e.clientY);
    if (coords) {
      const rad = Math.atan2(coords.y - 85, coords.x - 190);
      const deg = Math.round((((rad * 180) / Math.PI + 90 + 360) % 360));
      if (Math.abs(deg - 180) <= 35 || (coords.y >= 85 && Math.abs(coords.x - 190) <= 35)) {
        snapDialToSouth();
        return;
      }
    }
    if (Math.abs(weatherAngle - 180) <= 35) {
      snapDialToSouth();
    }
  };

  // =========================================================================
  // STEP 3: CROOKED HEART SPRING DIRECT PULL & SEAT
  // =========================================================================
  const seatHeartSpring = useCallback(() => {
    playChime();
    setHeartInserted(true);
    setHeartPos({ x: 190, y: 235 });
    isDraggingHeartRef.current = false;
    setIsDraggingHeart(false);
    setFeedback(
      'TICK! TOCK! The mainspring seats taut. The impossible clock awakens with roaring brass gears and chime bells!'
    );
  }, [playChime]);

  const handleHeartPointerDown = (e: React.PointerEvent) => {
    if (heartInserted || !weatherAligned || !gearFitted) return;
    e.preventDefault();
    e.stopPropagation();
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
    isDraggingHeartRef.current = true;
    setIsDraggingHeart(true);
    const coords = getSvgCoordinates(e.clientX, e.clientY);
    if (coords) setHeartPos(coords);
  };

  const handleHeartPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingHeartRef.current || heartInserted) return;
    e.preventDefault();
    const coords = getSvgCoordinates(e.clientX, e.clientY);
    if (coords) setHeartPos(coords);
  };

  const handleHeartPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingHeartRef.current || heartInserted) return;
    e.preventDefault();
    isDraggingHeartRef.current = false;
    setIsDraggingHeart(false);
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      // Fallback
    }

    const coords = getSvgCoordinates(e.clientX, e.clientY);
    const pos = coords || heartPos;
    // Distance to heart slot (190, 235)
    const dist = Math.hypot(pos.x - 190, pos.y - 235);
    if (dist <= 65) {
      seatHeartSpring();
    } else {
      // Spring back to workbench tray
      setHeartPos({ x: 335, y: 235 });
      setFeedback('Pull the crooked heart spring taut into the clock’s escapement chest.');
    }
  };

  // =========================================================================
  // TIMED SUCCESS SEQUENCE ORCHESTRATION (8 Stages)
  // Stabilized to run exactly once when heart is inserted.
  // =========================================================================
  const sequenceStartedRef = useRef(initialRestartStage >= 8);
  const playChimeRef = useRef(playChime);
  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    playChimeRef.current = playChime;
  }, [playChime]);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    if (!heartInserted || sequenceStartedRef.current) return;
    sequenceStartedRef.current = true;

    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const factor = isReduced ? 0.25 : 1;

    setRestartStage(1); // Stage 1 (0ms): Heart spring begins glowing

    const t2 = setTimeout(() => {
      setRestartStage(2); // Stage 2 (500ms): Clock gears engage sequentially
      playChimeRef.current();
    }, 500 * factor);

    const t3 = setTimeout(() => {
      setRestartStage(3); // Stage 3 (1100ms): Clock hands start moving freely
      playChimeRef.current();
    }, 1100 * factor);

    const t4 = setTimeout(() => {
      setRestartStage(4); // Stage 4 (1700ms): Frozen bakery smoke becomes rising steam
    }, 1700 * factor);

    const t5 = setTimeout(() => {
      setRestartStage(5); // Stage 5 (2300ms): Windows and street lamps illuminate
    }, 2300 * factor);

    const t6 = setTimeout(() => {
      setRestartStage(6); // Stage 6 (2900ms): Professor Perfect reacts with stunned delight
    }, 2900 * factor);

    const t7 = setTimeout(() => {
      setRestartStage(7); // Stage 7 (3600ms): Town transitions from cold indigo to golden dawn
    }, 3600 * factor);

    const t8 = setTimeout(() => {
      setRestartStage(8); // Stage 8 (4500ms): Sequence complete, hold transformation
      onSuccessRef.current();
    }, 4500 * factor);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
    };
  }, [heartInserted]);

  // Derived proximity visual cues
  const gearNearSpindle =
    isDraggingGear && Math.hypot(gearPos.x - 190, gearPos.y - 160) <= 50;
  const heartNearSlot =
    isDraggingHeart && Math.hypot(heartPos.x - 190, heartPos.y - 235) <= 50;

  const isComplete = restartStage >= 8 || (gearFitted && weatherAligned && heartInserted);

  return (
    <div
      className="game-container impossible-clock physical-clockwork-mechanism"
      role="application"
      aria-label="Physical Impossible Clock Mechanism: assemble spindle, weather-vane, and mainspring heart"
    >
      <div className="game-header">
        <div className="game-badge">
          <Clock size={18} aria-hidden="true" />
          <span>INVENTION 03 · TABLETOP CLOCKWORK MECHANISM</span>
        </div>
        <h3>Restart Tomorrow’s Flow</h3>
        <p>
          Interact directly with the miniature clockwork: drag the brass cog onto the central spindle, rotate the weather dial to South (180°), and seat the crooked mainspring into the heart chamber.
        </p>
      </div>

      {/* Mechanism Direct Manipulation Canvas */}
      <div
        className="clock-stage physical-clock-stage"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
          background: 'radial-gradient(circle at 50% 50%, #2e263d 0%, #171220 100%)',
          padding: '12px',
          boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.6), 0 4px 15px rgba(0, 0, 0, 0.4)',
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 380 340"
          className="clock-svg physical-clock-svg"
          role="img"
          aria-label={`Miniature clockwork mechanism. Cog: ${gearFitted ? 'Fitted' : 'Detached'}, Weather Dial: ${weatherAligned ? 'Aligned 180°' : `${weatherAngle}°`}, Heart Spring: ${heartInserted ? 'Inserted' : 'Unseated'}`}
          style={{ width: '100%', maxHeight: '520px', maxWidth: '680px', display: 'block', margin: '0 auto', touchAction: 'none' }}
          onPointerMove={(e) => {
            if (isDraggingGearRef.current) handleGearPointerMove(e);
            if (isDraggingDialRef.current) handleDialPointerMove(e);
            if (isDraggingHeartRef.current) handleHeartPointerMove(e);
          }}
          onPointerUp={(e) => {
            if (isDraggingGearRef.current) handleGearPointerUp(e);
            if (isDraggingDialRef.current) handleDialPointerUp(e);
            if (isDraggingHeartRef.current) handleHeartPointerUp(e);
          }}
          onPointerCancel={(e) => {
            if (isDraggingGearRef.current) handleGearPointerUp(e);
            if (isDraggingDialRef.current) handleDialPointerUp(e);
            if (isDraggingHeartRef.current) handleHeartPointerUp(e);
          }}
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
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#F7D560" floodOpacity="0.85" />
            </filter>
            <filter id="snap-aura">
              <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#88A991" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Tabletop Workbench Tray Shadows & Trays */}
          {/* Left Tray: Loose Brass Cog Rest */}
          <rect x="15" y="115" width="60" height="90" rx="12" fill="#1b1525" stroke="#3d2f4d" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="45" y="132" textAnchor="middle" fill="#E8C878" fontSize="8" fontWeight="bold" opacity="0.75">COG TRAY</text>
          {!gearFitted && !isDraggingGear && (
            <text x="45" y="196" textAnchor="middle" fill="#E8C878" fontSize="7" opacity="0.6">DRAG ME</text>
          )}

          {/* Right Tray: Crooked Heart Spring Rest */}
          <rect x="305" y="190" width="60" height="90" rx="12" fill="#1b1525" stroke="#3d2f4d" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="335" y="207" textAnchor="middle" fill="#E8C878" fontSize="8" fontWeight="bold" opacity="0.75">SPRING TRAY</text>
          {!heartInserted && !isDraggingHeart && (
            <text x="335" y="270" textAnchor="middle" fill="#E8C878" fontSize="7" opacity="0.6">DRAG ME</text>
          )}

          {/* Outer Porcelain & Brass Clock Frame (Center 190, 160) */}
          <circle cx="190" cy="160" r="128" fill="#21192e" stroke="url(#brass-grad)" strokeWidth="8" />
          <circle cx="190" cy="160" r="116" fill="#282035" stroke="#120c18" strokeWidth="2.5" />

          {/* Clock Ticks & Markings */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 190 + Math.sin(rad) * 102;
            const y1 = 160 - Math.cos(rad) * 102;
            const x2 = 190 + Math.sin(rad) * 114;
            const y2 = 160 - Math.cos(rad) * 114;
            return (
              <line
                key={deg}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#E8C878"
                strokeWidth={deg % 90 === 0 ? 3 : 1.2}
                opacity="0.6"
              />
            );
          })}

          {/* Background Brass Skeleton Gear Train (Engages in Stage 2+) */}
          <g opacity={restartStage >= 2 ? 0.75 : 0.35} className={restartStage >= 2 ? 'clock-gear-spin-fast' : ''}>
            <circle cx="140" cy="120" r="36" fill="none" stroke="url(#brass-grad)" strokeWidth="5" strokeDasharray="5,4" />
            <circle cx="240" cy="120" r="32" fill="none" stroke="url(#copper-grad)" strokeWidth="4.5" strokeDasharray="4,3" />
          </g>

          {/* =========================================================================
              STEP 1: CENTRAL SPINDLE PIN & BRASS COG
             ========================================================================= */}
          {/* Spindle Target Pin at (190, 160) */}
          <g
            className="spindle-target"
            transform="translate(190, 160)"
            filter={gearNearSpindle ? 'url(#snap-aura)' : undefined}
          >
            <circle
              cx="0"
              cy="0"
              r="22"
              fill={gearNearSpindle ? 'rgba(136, 169, 145, 0.4)' : '#140f1c'}
              stroke={gearNearSpindle ? '#88A991' : 'url(#brass-grad)'}
              strokeWidth={gearNearSpindle ? 3.5 : 2}
              strokeDasharray={gearNearSpindle ? '4,2' : 'none'}
            />
            <circle cx="0" cy="0" r="4" fill="#F7D560" />
            {!gearFitted && !isDraggingGear && (
              <text x="0" y="34" textAnchor="middle" fill="#E8C878" fontSize="7.5" opacity="0.8">
                Drop Cog Here
              </text>
            )}
          </g>

          {/* Meshed Brass Gear (When fitted, spins with escapement) */}
          {gearFitted && (
            <g
              transform="translate(190, 160)"
              className={restartStage >= 2 ? 'clock-gear-spin-fast' : 'clock-gear-wobble'}
            >
              <circle cx="0" cy="0" r="48" fill="none" stroke="url(#brass-grad)" strokeWidth="12" strokeDasharray="12,8" />
              <circle cx="0" cy="0" r="36" fill="#2d233c" stroke="#120c18" strokeWidth="2" opacity="0.95" />
              <line x1="-36" y1="0" x2="36" y2="0" stroke="url(#brass-grad)" strokeWidth="2.5" />
              <line x1="0" y1="-36" x2="0" y2="36" stroke="url(#brass-grad)" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="8" fill="#F7D560" stroke="#140f1c" strokeWidth="1.5" />
            </g>
          )}

          {/* Draggable Loose Brass Cog (When not fitted) */}
          {!gearFitted && (
            <g
              transform={`translate(${gearPos.x}, ${gearPos.y})`}
              className="draggable-gear-group"
              onPointerDown={handleGearPointerDown}
              onPointerMove={handleGearPointerMove}
              onPointerUp={handleGearPointerUp}
              onPointerCancel={handleGearPointerUp}
              style={{
                cursor: isDraggingGear ? 'grabbing' : 'grab',
                touchAction: 'none',
                filter: isDraggingGear ? 'url(#gold-clock-glow)' : 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))',
              }}
              role="group"
              tabIndex={0}
              aria-label="Draggable Brass Cog on Workbench · Drag onto central spindle or press Enter"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  snapGearToSpindle();
                }
              }}
            >
              <circle cx="0" cy="0" r="34" fill="rgba(247, 213, 96, 0.18)" stroke="#F7D560" strokeWidth="2" strokeDasharray="4,3" />
              <circle cx="0" cy="0" r="26" fill="none" stroke="url(#brass-grad)" strokeWidth="10" strokeDasharray="9,5" />
              <circle cx="0" cy="0" r="18" fill="#2d233c" stroke="#120c18" strokeWidth="2" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="url(#brass-grad)" strokeWidth="2" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="url(#brass-grad)" strokeWidth="2" />
              <circle cx="0" cy="0" r="5" fill="#F7D560" stroke="#140f1c" strokeWidth="1" />
            </g>
          )}

          {/* =========================================================================
              STEP 2: WEATHER VANE DIAL (Center at 190, 85)
             ========================================================================= */}
          <g
            className={`weather-vane-zone ${isDraggingDial ? 'is-rotating' : ''}`}
            transform="translate(190, 85)"
            onPointerDown={handleDialPointerDown}
            onPointerMove={handleDialPointerMove}
            onPointerUp={handleDialPointerUp}
            onPointerCancel={handleDialPointerUp}
            onClick={(e) => {
              if (!gearFitted || weatherAligned) return;
              const coords = getSvgCoordinates(e.clientX, e.clientY);
              if (coords) {
                const rad = Math.atan2(coords.y - 85, coords.x - 190);
                const deg = Math.round((((rad * 180) / Math.PI + 90 + 360) % 360));
                if (Math.abs(deg - 180) <= 60 || coords.y >= 85) {
                  snapDialToSouth();
                }
              } else {
                snapDialToSouth();
              }
            }}
            style={{
              cursor: weatherAligned ? 'default' : isDraggingDial ? 'grabbing' : gearFitted ? 'grab' : 'not-allowed',
              touchAction: 'none',
            }}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={weatherAngle}
            tabIndex={gearFitted && !weatherAligned ? 0 : -1}
            aria-label={`Weather Spring dial. Target: 180° South. Current: ${weatherAngle}°. Drag circular dial or press Arrow Keys`}
            onKeyDown={(e) => {
              if (!gearFitted || weatherAligned) return;
              if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                const next = (weatherAngle + 15) % 360;
                setWeatherAngle(next);
                if (Math.abs(next - 180) <= 15) snapDialToSouth();
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                const next = (weatherAngle - 15 + 360) % 360;
                setWeatherAngle(next);
                if (Math.abs(next - 180) <= 15) snapDialToSouth();
              } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                snapDialToSouth();
              }
            }}
          >
            {/* Invisible Hit Boundary for Easy Touch & Drag Hit-Detection */}
            <circle
              cx="0"
              cy="0"
              r="38"
              fill="transparent"
              style={{
                pointerEvents: 'auto',
                cursor: weatherAligned ? 'default' : isDraggingDial ? 'grabbing' : gearFitted ? 'grab' : 'not-allowed',
              }}
            />

            {/* Compass Base Ring */}
            <circle
              cx="0"
              cy="0"
              r="26"
              fill="#1e1828"
              stroke={weatherAligned ? '#88A991' : isDraggingDial ? '#F7D560' : '#A34063'}
              strokeWidth={weatherAligned || isDraggingDial ? 3 : 2}
              filter={weatherAligned ? 'url(#gold-clock-glow)' : undefined}
            />

            {/* Compass Cardinal Points */}
            <text x="0" y="-30" textAnchor="middle" fill="#E8C878" fontSize="7.5" fontWeight="bold" pointerEvents="none">N</text>
            <text x="32" y="3" textAnchor="middle" fill="#E8C878" fontSize="7" opacity="0.6" pointerEvents="none">E</text>
            <text x="0" y="36" textAnchor="middle" fill={weatherAligned ? '#88A991' : '#F7D560'} fontSize="8" fontWeight="bold" pointerEvents="none">S (180°)</text>
            <text x="-32" y="3" textAnchor="middle" fill="#E8C878" fontSize="7" opacity="0.6" pointerEvents="none">W</text>

            {/* Weather pointer rotating with player input */}
            <g transform={`rotate(${weatherAngle})`} pointerEvents="none">
              <line x1="0" y1="18" x2="0" y2="-18" stroke="url(#copper-grad)" strokeWidth="3" strokeLinecap="round" />
              <polygon points="0,-22 -4,-15 4,-15" fill={weatherAligned ? '#88A991' : '#F7D560'} />
              <circle cx="0" cy="0" r="5" fill="#392F3B" stroke="#E8C878" strokeWidth="1.5" />
            </g>
          </g>

          {/* =========================================================================
              STEP 3: CROOKED HEART MAINSPRING (Slot at 190, 235)
             ========================================================================= */}
          {/* Heart Slot in Escapement Chest */}
          <g
            className="heart-spring-slot"
            transform="translate(190, 235)"
            filter={heartNearSlot ? 'url(#snap-aura)' : undefined}
          >
            <rect
              x="-28"
              y="-20"
              width="56"
              height="40"
              rx="8"
              fill={heartNearSlot ? 'rgba(163, 64, 99, 0.35)' : '#1a1422'}
              stroke={heartInserted ? '#F7D560' : heartNearSlot ? '#88A991' : 'rgba(232, 200, 120, 0.45)'}
              strokeWidth={heartNearSlot ? 3 : 2}
              strokeDasharray={heartInserted ? 'none' : '4,3'}
            />
            {!heartInserted && !isDraggingHeart && (
              <text x="0" y="4" textAnchor="middle" fill="#E8C878" fontSize="8" opacity="0.75">
                Heart Slot
              </text>
            )}

            {/* When inserted, the glowing mainspring radiates in Stage 1+ */}
            {heartInserted && (
              <g filter="url(#gold-clock-glow)" className={restartStage >= 1 ? 'heart-glow-pulsing' : ''}>
                <path
                  d="M -14 -5 C -22 -16, -4 -18, 0 -5 C 4 -18, 22 -16, 14 -5 C 9 5, 0 14, 0 14 C 0 14, -9 5, -14 -5 Z"
                  fill="#A34063"
                  stroke="#F7D560"
                  strokeWidth="2.5"
                />
                <circle cx="0" cy="0" r="3.5" fill="#F7D560" />
              </g>
            )}
          </g>

          {/* Dynamic Elastic Tension Spring Connecting Tray to Pointer while Dragging */}
          {isDraggingHeart && (
            <path
              d={`M 335 235 Q ${(335 + heartPos.x) / 2} ${(235 + heartPos.y) / 2 - 20} ${heartPos.x} ${heartPos.y}`}
              fill="none"
              stroke="#F7D560"
              strokeWidth="3"
              strokeDasharray="4,2"
              opacity="0.85"
            />
          )}

          {/* Draggable Crooked Heart Spring (When not inserted) */}
          {!heartInserted && (
            <g
              transform={`translate(${heartPos.x}, ${heartPos.y})`}
              className="draggable-heart-group"
              onPointerDown={handleHeartPointerDown}
              onPointerMove={handleHeartPointerMove}
              onPointerUp={handleHeartPointerUp}
              onPointerCancel={handleHeartPointerUp}
              style={{
                cursor: !weatherAligned ? 'not-allowed' : isDraggingHeart ? 'grabbing' : 'grab',
                touchAction: 'none',
                filter: isDraggingHeart ? 'url(#gold-clock-glow)' : 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))',
              }}
              role="group"
              tabIndex={weatherAligned ? 0 : -1}
              aria-label="Draggable Crooked Heart Spring · Drag into slot or press Enter"
              onKeyDown={(e) => {
                if (!weatherAligned || heartInserted) return;
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  seatHeartSpring();
                }
              }}
            >
              <circle cx="0" cy="0" r="26" fill="rgba(163, 64, 99, 0.25)" stroke="#F7D560" strokeWidth="2" strokeDasharray="3,3" />
              <path
                d="M -12 -4 C -18 -14, -3 -15, 0 -4 C 3 -15, 18 -14, 12 -4 C 8 4, 0 12, 0 12 C 0 12, -8 4, -12 -4 Z"
                fill="#A34063"
                stroke="#F7D560"
                strokeWidth="2.2"
              />
              <circle cx="0" cy="0" r="3" fill="#F7D560" />
            </g>
          )}

          {/* =========================================================================
              CLOCK HANDS (Sweeping past 4:01 in Stage 3+)
             ========================================================================= */}
          <g transform="translate(190, 160)" style={{ pointerEvents: 'none' }}>
            {/* Hour Hand: stuck at 4:01 (120°) vs advances to 5:00 in Stage 3+ */}
            <line
              x1="0"
              y1="0"
              x2={restartStage >= 3 ? '15' : '32'}
              y2={restartStage >= 3 ? '38' : '24'}
              stroke="#FFF8F1"
              strokeWidth="4.5"
              strokeLinecap="round"
              style={{ transition: 'all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            />
            {/* Minute Hand: stuck at 4:01 (6°) vs sweeps forward in Stage 3+ */}
            <line
              x1="0"
              y1="0"
              x2={restartStage >= 3 ? '-20' : '6'}
              y2={restartStage >= 3 ? '-62' : '-74'}
              stroke="#F7D560"
              strokeWidth="3.2"
              strokeLinecap="round"
              className={restartStage >= 3 ? 'clock-hand-sweeping' : ''}
            />
            <circle cx="0" cy="0" r="5.5" fill="#E8C878" stroke="#120c18" strokeWidth="1.8" />
          </g>

          {/* Sparkle Bursts during Restart */}
          {restartStage >= 1 && (
            <g className="restart-sparkles" fill="#F7D560">
              <text x="60" y="65" fontSize="16">✦</text>
              <text x="310" y="70" fontSize="18">✧</text>
              <text x="70" y="290" fontSize="15">✧</text>
              <text x="315" y="280" fontSize="18">✦</text>
            </g>
          )}
        </svg>
      </div>

      {/* Accessible Assistive Drawer & Keyboard Controls (Replaces massive numbered panel) */}
      <details className="accessible-clock-drawer" open style={{ marginTop: '12px' }}>
        <summary style={{ cursor: 'pointer', padding: '6px 8px', font: "700 0.8rem 'Space Mono', monospace", color: 'var(--ink)' }}>
          <span>Accessible & Keyboard Controls</span>
          <span style={{ fontSize: '0.72rem', color: isComplete ? 'var(--sage)' : 'var(--gold)', fontWeight: 800, marginLeft: '8px' }}>
            {gearFitted && weatherAligned && heartInserted ? '✓ 3/3 Mechanisms Meshed' : `${(gearFitted ? 1 : 0) + (weatherAligned ? 1 : 0) + (heartInserted ? 1 : 0)}/3 Assembled`}
          </span>
        </summary>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', padding: '8px 4px 4px' }}>
          {/* Step 1 Accessible Button */}
          <button
            type="button"
            className={`gear-btn accessible-clock-btn ${gearFitted ? 'fitted' : ''}`}
            onClick={snapGearToSpindle}
            disabled={gearFitted}
            aria-label="Fit Brass Cog on Spindle (Shadow Cog)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              borderRadius: '10px',
              background: gearFitted ? 'rgba(136, 169, 145, 0.15)' : 'var(--surface)',
              border: gearFitted ? '2px solid var(--sage)' : '2px solid var(--line)',
              cursor: gearFitted ? 'default' : 'pointer',
              textAlign: 'left',
            }}
          >
            {gearFitted ? <Check size={18} color="#2e603b" /> : <Settings size={18} color="#E8C878" />}
            <div>
              <strong style={{ display: 'block', fontSize: '0.84rem' }}>1. Fit Brass Cog on Spindle (Shadow Cog)</strong>
              <small style={{ color: 'var(--ink)', opacity: 0.8 }}>
                {gearFitted ? '✓ Meshed firmly' : 'Click/Tap or drag cog'}
              </small>
            </div>
          </button>

          {/* Step 2 Accessible Controls */}
          <div
            className={`dial-control-card ${weatherAligned ? 'aligned' : ''}`}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              background: weatherAligned ? 'rgba(136, 169, 145, 0.15)' : 'var(--surface)',
              border: weatherAligned ? '2px solid var(--sage)' : '2px solid var(--line)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 'bold', fontSize: '0.84rem' }}>
                <Compass size={17} color={weatherAligned ? '#2e603b' : '#9E88BA'} />
                2. Weather Vane: {weatherAngle}°
              </span>
              <small style={{ fontWeight: 800, color: weatherAligned ? '#2e603b' : '#A34063' }}>
                {weatherAligned ? '✓ South (180°)' : 'Target: 180°'}
              </small>
            </div>
            {!weatherAligned ? (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="balloon-action-btn"
                  onClick={() => {
                    const next = (weatherAngle - 45 + 360) % 360;
                    setWeatherAngle(next);
                    if (Math.abs(next - 180) <= 15) snapDialToSouth();
                  }}
                  disabled={!gearFitted}
                  style={{ flex: 1, padding: '3px 6px', fontSize: '0.74rem' }}
                >
                  Rotate ↶ -45°
                </button>
                <button
                  type="button"
                  className="balloon-action-btn balloon-next-btn"
                  onClick={() => {
                    const next = (weatherAngle + 45) % 360;
                    setWeatherAngle(next);
                    if (Math.abs(next - 180) <= 15) snapDialToSouth();
                  }}
                  disabled={!gearFitted}
                  style={{ flex: 1, padding: '3px 6px', fontSize: '0.74rem' }}
                >
                  Rotate ↷ +45°
                </button>
                <button
                  type="button"
                  className="balloon-action-btn"
                  onClick={snapDialToSouth}
                  disabled={!gearFitted}
                  aria-label="Align Weather Spring"
                  style={{ width: '100%', padding: '3px 6px', fontSize: '0.74rem', background: 'rgba(232, 200, 120, 0.15)' }}
                >
                  Align Weather Spring ↷ 180°
                </button>
              </div>
            ) : (
              <small style={{ color: '#2e603b', fontWeight: 600 }}>Rainfall power flowing to pendulum.</small>
            )}
          </div>

          {/* Step 3 Accessible Button */}
          <button
            type="button"
            className={`heart-btn accessible-clock-btn ${heartInserted ? 'fitted' : ''}`}
            onClick={seatHeartSpring}
            disabled={heartInserted || !weatherAligned}
            aria-label="Insert Heart Spring (Crooked Heart Key)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              borderRadius: '10px',
              background: heartInserted ? 'rgba(136, 169, 145, 0.15)' : 'var(--surface)',
              border: heartInserted ? '2px solid var(--sage)' : '2px solid var(--line)',
              cursor: heartInserted || !weatherAligned ? 'default' : 'pointer',
              textAlign: 'left',
            }}
          >
            {heartInserted ? <Check size={18} color="#2e603b" /> : <Heart size={18} color="#A34063" />}
            <div>
              <strong style={{ display: 'block', fontSize: '0.84rem' }}>3. Insert Heart Spring (Crooked Heart Key)</strong>
              <small style={{ color: 'var(--ink)', opacity: 0.8 }}>
                {heartInserted ? '✓ Mainspring seated' : weatherAligned ? 'Click/Tap or pull spring' : 'Awaiting weather alignment'}
              </small>
            </div>
          </button>
        </div>
      </details>

      {/* Live Status Banner */}
      <div className="game-reaction" role="status" aria-live="polite" style={{ marginTop: '12px' }}>
        {isComplete ? <Sparkles size={18} className="reaction-icon" /> : <CheckCircle2 size={18} className="reaction-icon" />}
        <p>{feedback}</p>
      </div>
    </div>
  );
}
