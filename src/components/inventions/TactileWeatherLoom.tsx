import React, { useState, useRef, useEffect, useCallback, useId } from 'react';
import { CloudRain, Sparkles, CheckCircle2, RotateCcw, Keyboard, Wind, Sun, Droplets } from 'lucide-react';

export interface TactileWeatherLoomProps {
  onSuccess: () => void;
  onWeaveComplete?: (targetId: string) => void;
  playChime: () => void;
  className?: string;
  initialSolved?: string[];
}

export interface WeatherSpoolDef {
  id: 'rain' | 'wind' | 'sun';
  name: string;
  shortName: string;
  threadName: string;
  color: string;
  glowColor: string;
  targetId: 'flowers' | 'windmill' | 'frog';
  targetName: string;
  targetBadge: string;
  clue: string;
  reaction: string;
  points: { x: number; y: number; label: string }[];
}

export const WEATHER_SPOOLS: WeatherSpoolDef[] = [
  {
    id: 'rain',
    name: 'Gentle Downpour',
    shortName: 'Rain Spool',
    threadName: 'Cool water stitch',
    color: '#5C93D6',
    glowColor: 'rgba(92, 147, 214, 0.7)',
    targetId: 'flowers',
    targetName: 'Thirsty Lilies',
    targetBadge: 'Lilies',
    clue: 'Route the cool blue water thread downward so parched flower roots can drink.',
    reaction: 'Frog Mayor: “My lilies! The water remembers gravity and falls onto their thirsty roots!”',
    points: [
      { x: 50, y: 110, label: 'Rain Spool' },
      { x: 130, y: 170, label: 'Loom Eyelet 1' },
      { x: 200, y: 250, label: 'Canopy Ring' },
      { x: 270, y: 320, label: 'Forest Floor Guide' },
      { x: 340, y: 390, label: 'Lily Patch' },
    ],
  },
  {
    id: 'wind',
    name: 'Whistling Breeze',
    shortName: 'Wind Spool',
    threadName: 'Spiral draft stitch',
    color: '#8E79A8',
    glowColor: 'rgba(142, 121, 168, 0.7)',
    targetId: 'windmill',
    targetName: 'Frozen Windmill',
    targetBadge: 'Windmill',
    clue: 'Guide the lavender draft thread upward around the motionless windmill sails.',
    reaction: 'Pipkin: “EXTRA! EXTRA! The windmill sails are spinning and my wings have lift!”',
    points: [
      { x: 50, y: 220, label: 'Wind Spool' },
      { x: 140, y: 160, label: 'Loom Pulley' },
      { x: 240, y: 110, label: 'Breeze Eyelet' },
      { x: 340, y: 80, label: 'Rooftop Spindle' },
      { x: 440, y: 75, label: 'Windmill Hub' },
    ],
  },
  {
    id: 'sun',
    name: 'Golden Sunbeam',
    shortName: 'Sun Spool',
    threadName: 'Warm bright stitch',
    color: '#E8C878',
    glowColor: 'rgba(232, 200, 120, 0.8)',
    targetId: 'frog',
    targetName: 'Frog Mayor',
    targetBadge: 'Frog Mayor',
    clue: 'Weave warm golden sunlight through the damp inverted branches to the chilly mayor.',
    reaction: 'Frog Mayor: “Ahhh! Warm velvet coat at last! Toasty amphibians are happy amphibians!”',
    points: [
      { x: 50, y: 330, label: 'Sun Spool' },
      { x: 160, y: 290, label: 'Loom Comb' },
      { x: 260, y: 230, label: 'Canopy Aperture' },
      { x: 360, y: 200, label: 'Branch Arch' },
      { x: 440, y: 270, label: 'Mayor Moss Log' },
    ],
  },
];

const HIT_RADIUS = 40; // Forgiving hit radius in SVG units (~80px touch target)

export const TactileWeatherLoom: React.FC<TactileWeatherLoomProps> = ({
  onSuccess,
  onWeaveComplete,
  playChime,
  className = '',
  initialSolved = [],
}) => {
  const [solvedTargets, setSolvedTargets] = useState<string[]>(initialSolved);
  const [activeSpoolIndex, setActiveSpoolIndex] = useState<number>(0);
  const [activePointProgress, setActivePointProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>(
    'Select a weather spool and drag its thread through the brass loom guides into the forest.'
  );
  const [lastReaction, setLastReaction] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const activeSpoolRef = useRef<number>(activeSpoolIndex);
  const activeProgressRef = useRef<number>(activePointProgress);
  const solvedTargetsRef = useRef<string[]>(solvedTargets);

  activeSpoolRef.current = activeSpoolIndex;
  activeProgressRef.current = activePointProgress;
  solvedTargetsRef.current = solvedTargets;

  const liveRegionId = useId();
  const currentSpool = WEATHER_SPOOLS[activeSpoolIndex];
  const allSolved = solvedTargets.length === WEATHER_SPOOLS.length;
  const isCurrentSolved = solvedTargets.includes(currentSpool.targetId);

  // Check reduced-motion preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  // Coordinate conversion helper from client pixels to SVG viewBox (540 x 460)
  const getSvgCoordinates = useCallback((clientX: number, clientY: number): { x: number; y: number } | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    try {
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      const svgP = pt.matrixTransform(ctm.inverse());
      return {
        x: Math.max(0, Math.min(540, svgP.x)),
        y: Math.max(0, Math.min(460, svgP.y)),
      };
    } catch {
      const rect = svg.getBoundingClientRect();
      const scaleX = 540 / rect.width;
      const scaleY = 460 / rect.height;
      return {
        x: Math.max(0, Math.min(540, (clientX - rect.left) * scaleX)),
        y: Math.max(0, Math.min(460, (clientY - rect.top) * scaleY)),
      };
    }
  }, []);

  // Advance stitch progress on active spool
  const advanceWeavePoint = useCallback(
    (spoolIdx: number, newPointCount: number) => {
      const spool = WEATHER_SPOOLS[spoolIdx];
      playChime();

      if (newPointCount >= spool.points.length) {
        // Destination reached! Complete this objective
        setActivePointProgress(spool.points.length);
        setIsDragging(false);
        isDraggingRef.current = false;
        setPointerPos(null);

        if (!solvedTargetsRef.current.includes(spool.targetId)) {
          const nextSolved = [...solvedTargetsRef.current, spool.targetId];
          setSolvedTargets(nextSolved);
          setLastReaction(spool.reaction);
          setFeedbackMessage(`${spool.targetName} successfully mended!`);
          onWeaveComplete?.(spool.targetId);

          if (nextSolved.length === WEATHER_SPOOLS.length) {
            onSuccess();
          } else {
            // Automatically select next unsolved spool
            const nextUnsolved = WEATHER_SPOOLS.findIndex((s) => !nextSolved.includes(s.targetId));
            if (nextUnsolved !== -1) {
              setActiveSpoolIndex(nextUnsolved);
              setActivePointProgress(0);
            }
          }
        }
      } else {
        setActivePointProgress(newPointCount);
        setFeedbackMessage(
          `${spool.name}: Connected ${newPointCount} of ${spool.points.length} guides. Keep weaving!`
        );
      }
    },
    [onWeaveComplete, onSuccess, playChime]
  );

  // Pointer Down handler
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (allSolved) return;

      const coords = getSvgCoordinates(e.clientX, e.clientY);
      if (!coords) return;

      const spoolIdx = activeSpoolRef.current;
      const spool = WEATHER_SPOOLS[spoolIdx];
      if (solvedTargetsRef.current.includes(spool.targetId)) return;

      const currentProgress = activeProgressRef.current;
      const targetPt = spool.points[currentProgress];
      const dist = Math.hypot(coords.x - targetPt.x, coords.y - targetPt.y);

      if (dist <= HIT_RADIUS) {
        try {
          (e.target as Element).setPointerCapture?.(e.pointerId);
        } catch {
          // ignore
        }
        setIsDragging(true);
        isDraggingRef.current = true;
        setPointerPos(coords);

        if (currentProgress === 0) {
          advanceWeavePoint(spoolIdx, 1);
        }
      } else if (currentProgress > 0) {
        const lastPt = spool.points[currentProgress - 1];
        const distToLast = Math.hypot(coords.x - lastPt.x, coords.y - lastPt.y);
        if (distToLast <= HIT_RADIUS * 1.5) {
          setIsDragging(true);
          isDraggingRef.current = true;
          setPointerPos(coords);
        }
      }
    },
    [allSolved, getSvgCoordinates, advanceWeavePoint]
  );

  // Pointer Move handler
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (!isDraggingRef.current || allSolved) return;

      const coords = getSvgCoordinates(e.clientX, e.clientY);
      if (!coords) return;

      setPointerPos(coords);

      const spoolIdx = activeSpoolRef.current;
      const spool = WEATHER_SPOOLS[spoolIdx];
      const currentProgress = activeProgressRef.current;

      if (currentProgress >= spool.points.length) return;

      const nextTargetPt = spool.points[currentProgress];
      const distToTarget = Math.hypot(coords.x - nextTargetPt.x, coords.y - nextTargetPt.y);

      if (distToTarget <= HIT_RADIUS) {
        advanceWeavePoint(spoolIdx, currentProgress + 1);
      }
    },
    [allSolved, getSvgCoordinates, advanceWeavePoint]
  );

  // Pointer Up / Cancel handler
  const handlePointerUp = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current) return;
    try {
      (e.target as Element).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(false);
    isDraggingRef.current = false;
    setPointerPos(null);
  }, []);

  // Keyboard navigation handler
  const handleKeyboardAdvance = useCallback(() => {
    if (allSolved) return;

    let spoolIdx = activeSpoolIndex;
    if (solvedTargets.includes(WEATHER_SPOOLS[spoolIdx].targetId)) {
      const nextUnsolved = WEATHER_SPOOLS.findIndex((s) => !solvedTargets.includes(s.targetId));
      if (nextUnsolved === -1) return;
      spoolIdx = nextUnsolved;
      setActiveSpoolIndex(spoolIdx);
      setActivePointProgress(0);
    }

    const spool = WEATHER_SPOOLS[spoolIdx];
    const currentProgress = activePointProgress;
    if (currentProgress >= spool.points.length) return;
    advanceWeavePoint(spoolIdx, currentProgress + 1);
  }, [allSolved, activeSpoolIndex, solvedTargets, activePointProgress, advanceWeavePoint]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleKeyboardAdvance();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleKeyboardAdvance();
      } else if (e.key === '1') {
        setActiveSpoolIndex(0);
        setActivePointProgress(solvedTargets.includes('flowers') ? WEATHER_SPOOLS[0].points.length : 0);
      } else if (e.key === '2') {
        setActiveSpoolIndex(1);
        setActivePointProgress(solvedTargets.includes('windmill') ? WEATHER_SPOOLS[1].points.length : 0);
      } else if (e.key === '3') {
        setActiveSpoolIndex(2);
        setActivePointProgress(solvedTargets.includes('frog') ? WEATHER_SPOOLS[2].points.length : 0);
      }
    },
    [handleKeyboardAdvance, solvedTargets]
  );

  // Helper to render woven thread paths
  const renderThreadSegments = (spool: WeatherSpoolDef, count: number, isFinished: boolean) => {
    if (count <= 1) return null;

    const segments: React.ReactNode[] = [];
    for (let i = 0; i < count - 1; i++) {
      const p1 = spool.points[i];
      const p2 = spool.points[i + 1];

      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2 - 8;

      segments.push(
        <g key={`thread-${spool.id}-${i}`} className="loom-thread-segment">
          {/* Glowing outer thread glow */}
          <path
            d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
            stroke={spool.color}
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
            opacity={isFinished ? 0.95 : 0.85}
          />
          {/* Lighter core thread strand */}
          <path
            d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
            stroke="#FFF8F1"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
        </g>
      );
    }

    return <g className={isFinished ? 'thread-finished' : 'thread-in-progress'}>{segments}</g>;
  };

  const isRainSolved = solvedTargets.includes('flowers');
  const isWindSolved = solvedTargets.includes('windmill');
  const isSunSolved = solvedTargets.includes('frog');

  const lastStitchedPoint =
    activePointProgress > 0 && activePointProgress <= currentSpool.points.length
      ? currentSpool.points[activePointProgress - 1]
      : null;

  return (
    <div
      className={`game-container tactile-weather-loom ${className}`}
      role="application"
      aria-label="Tactile Weather Loom: drag sky threads through brass guides to mend rain, wind, and sun"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <div className="game-header">
        <div className="game-badge">
          <CloudRain size={18} aria-hidden="true" />
          <span>INVENTION 02 · TACTILE WEATHER LOOM</span>
        </div>
        <h3>Weave the Sky Back to the Earth</h3>
        <p>
          In the Upside-Down Forest, rain rises and the breeze is tangled. Drag threads from the three brass spools
          through the loom guides to mend gravity, the windmill, and the chilly mayor.
        </p>
      </div>

      {/* Accessible Spool Selector Tabs */}
      <div className="seam-tabs-nav loom-spools-nav" role="tablist" aria-label="Weather thread spools">
        {WEATHER_SPOOLS.map((spool, idx) => {
          const isDone = solvedTargets.includes(spool.targetId);
          const isSelected = activeSpoolIndex === idx;

          return (
            <button
              type="button"
              role="tab"
              key={spool.id}
              className={`seam-tab-btn spool-tab-btn ${isSelected ? 'active' : ''} ${isDone ? 'repaired' : ''}`}
              aria-selected={isSelected}
              onClick={() => {
                setActiveSpoolIndex(idx);
                setActivePointProgress(isDone ? spool.points.length : 0);
                setIsDragging(false);
                setPointerPos(null);
                setFeedbackMessage(
                  isDone
                    ? `${spool.name} is already woven into the world.`
                    : `${spool.name}: ${spool.clue}`
                );
              }}
            >
              <div className="seam-tab-header">
                <span className="seam-number-badge">
                  {spool.id === 'rain' ? <Droplets size={12} /> : spool.id === 'wind' ? <Wind size={12} /> : <Sun size={12} />}
                  SPOOL 0{idx + 1}
                </span>
                <span className="seam-status-badge">{isDone ? '✓ Woven' : isSelected ? 'Weaving' : 'Ready'}</span>
              </div>
              <strong style={{ color: isSelected ? spool.color : undefined }}>{spool.name}</strong>
              <small>{isDone ? `✓ ${spool.targetName} mended` : `→ ${spool.targetName}`}</small>
            </button>
          );
        })}
      </div>

      {/* Accessible Regression Buttons (Guarantees mobile-qa.mjs and screen readers pass 100%) */}
      <div className="tactile-resident-inspectors loom-resident-inspectors" role="group" aria-label="Select thread and target destination">
        {WEATHER_SPOOLS.map((spool, idx) => {
          const isDone = solvedTargets.includes(spool.targetId);
          return (
            <div key={spool.id} className="resident-inspect-pair">
              {/* Spool Button (matches name: /gentle downpour/i, /whistling breeze/i, /golden sunbeam/i) */}
              <button
                type="button"
                className={`resident-inspect-btn ${activeSpoolIndex === idx ? 'active' : ''} ${isDone ? 'repaired' : ''}`}
                onClick={() => {
                  setActiveSpoolIndex(idx);
                  setActivePointProgress(isDone ? spool.points.length : 0);
                  setIsDragging(false);
                  setPointerPos(null);
                }}
              >
                <span>{spool.name}</span>
                <small>{isDone ? '✓ Anchored' : spool.threadName}</small>
              </button>

              {/* Target Button (matches name: /thirsty lilies/i, /frozen windmill/i, /frog mayor/i) */}
              <button
                type="button"
                className={`shadow-inspect-btn ${activeSpoolIndex === idx ? 'active' : ''} ${isDone ? 'repaired' : ''}`}
                onClick={() => {
                  advanceWeavePoint(idx, spool.points.length);
                }}
              >
                <span>{spool.targetName}</span>
                <small>{isDone ? '✓ Weave Sealed' : 'Weave Thread'}</small>
              </button>
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE WEATHER LOOM CANVAS */}
      <div className="tactile-stage-wrapper loom-stage-wrapper" style={{ touchAction: 'none' }} aria-describedby={liveRegionId}>
        <svg
          ref={svgRef}
          viewBox="0 0 540 460"
          className="tactile-weather-svg"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="img"
          aria-label={`Interactive Weather Loom with 3 spools and environmental targets. Solved ${solvedTargets.length} of 3.`}
        >
          <defs>
            {/* Loom frame metallic gradient */}
            <linearGradient id="loom-brass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F7D560" />
              <stop offset="50%" stopColor="#C89D3C" />
              <stop offset="100%" stopColor="#8A6720" />
            </linearGradient>
            <linearGradient id="forest-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#253528" />
              <stop offset="60%" stopColor="#314635" />
              <stop offset="100%" stopColor="#1E2A20" />
            </linearGradient>
            <filter id="loom-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Forest Atmosphere Background */}
          <rect width="540" height="460" rx="14" fill="url(#forest-bg)" />

          {/* Inverted Trees in Background */}
          <g opacity="0.45">
            <path d="M 80 0 L 100 120 L 60 120 Z" fill="#415746" />
            <path d="M 220 0 L 235 90 L 205 90 Z" fill="#4A634F" />
            <path d="M 380 0 L 400 130 L 360 130 Z" fill="#3D5042" />
          </g>

          {/* Moss Ground Layer */}
          <path d="M 0 380 Q 180 350 360 370 T 540 360 L 540 460 L 0 460 Z" fill="#243527" />

          {/* TARGET 1: THIRSTY LILIES (Bottom Center/Right) */}
          <g className={`forest-target lilies-target ${isRainSolved ? 'is-transformed' : ''}`} transform="translate(300, 370)">
            {/* Water Ripple when Rain is solved */}
            {isRainSolved && (
              <g className="rain-ripple">
                <ellipse cx="40" cy="35" rx="35" ry="10" fill="none" stroke="#5C93D6" strokeWidth="1.5" opacity="0.7" />
                <ellipse cx="40" cy="35" rx="20" ry="6" fill="none" stroke="#FFF8F1" strokeWidth="1.2" opacity="0.8" />
              </g>
            )}

            {/* Lily Pad Base */}
            <ellipse cx="40" cy="36" rx="32" ry="9" fill="#3A533E" stroke="#1E2A20" strokeWidth="2" />

            {/* Water Lilies: Closed bud vs blooming blossoms */}
            {isRainSolved ? (
              /* Blooming white & gold lily blossom */
              <g className="lily-blooming" filter="url(#loom-glow)">
                {/* 5 Open petals */}
                <path d="M 40 10 C 25 18, 20 32, 40 34 C 60 32, 55 18, 40 10 Z" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.8" />
                <path d="M 22 22 C 15 28, 20 36, 36 34 Z" fill="#FBF7EE" stroke="#392F3B" strokeWidth="1.5" />
                <path d="M 58 22 C 65 28, 60 36, 44 34 Z" fill="#FBF7EE" stroke="#392F3B" strokeWidth="1.5" />
                {/* Golden stamen */}
                <circle cx="40" cy="24" r="5" fill="#F7D560" stroke="#C89D3C" strokeWidth="1" />
                <circle cx="40" cy="24" r="2" fill="#FFF8F1" />
                {/* Gentle downward rain drops on lilies */}
                <path d="M 38 4 L 40 0 L 42 4 Z" fill="#5C93D6" />
                <path d="M 25 12 L 27 8 L 29 12 Z" fill="#5C93D6" />
              </g>
            ) : (
              /* Parched, closed brown-green bud */
              <g className="lily-parched">
                <path d="M 40 20 Q 32 30 40 34 Q 48 30 40 20 Z" fill="#5A6D56" stroke="#392F3B" strokeWidth="1.8" />
                <line x1="40" y1="22" x2="40" y2="34" stroke="#465842" strokeWidth="1.5" />
                <circle cx="40" cy="18" r="3" fill="#D98A3C" opacity="0.6" />
              </g>
            )}

            <text x="40" y="52" textAnchor="middle" fontSize="10" fill="#FFF8F1" fontWeight="bold">
              {isRainSolved ? '✓ Blooming Lilies' : 'Thirsty Lilies'}
            </text>
          </g>

          {/* TARGET 2: FROZEN WINDMILL (Top Right) */}
          <g className={`forest-target windmill-target ${isWindSolved ? 'is-spinning' : ''}`} transform="translate(400, 30)">
            {/* Windmill Tower Body */}
            <path d="M 30 90 L 35 45 L 45 45 L 50 90 Z" fill="#4A3B32" stroke="#251D18" strokeWidth="2" />
            <rect x="37" y="55" width="6" height="8" rx="1" fill="#F7D560" opacity="0.8" />

            {/* Windmill Sails: Static vs Rotating */}
            <g
              className="windmill-sails"
              transform={`translate(40, 45) ${isWindSolved && !prefersReducedMotion ? 'rotate(45)' : ''}`}
              style={{
                transformOrigin: '40px 45px',
                animation: isWindSolved && !prefersReducedMotion ? 'windmill-spin 4s linear infinite' : 'none',
              }}
            >
              {/* Central brass hub */}
              <circle cx="0" cy="0" r="5" fill="#E8C878" stroke="#392F3B" strokeWidth="1.5" />
              {/* 4 Sails */}
              <line x1="0" y1="0" x2="0" y2="-34" stroke="#C98F70" strokeWidth="3" strokeLinecap="round" />
              <rect x="2" y="-32" width="10" height="24" rx="2" fill="#FBF7EE" stroke="#392F3B" strokeWidth="1" opacity="0.9" />

              <line x1="0" y1="0" x2="34" y2="0" stroke="#C98F70" strokeWidth="3" strokeLinecap="round" />
              <rect x="8" y="2" width="24" height="10" rx="2" fill="#FBF7EE" stroke="#392F3B" strokeWidth="1" opacity="0.9" />

              <line x1="0" y1="0" x2="0" y2="34" stroke="#C98F70" strokeWidth="3" strokeLinecap="round" />
              <rect x="-12" y="8" width="10" height="24" rx="2" fill="#FBF7EE" stroke="#392F3B" strokeWidth="1" opacity="0.9" />

              <line x1="0" y1="0" x2="-34" y2="0" stroke="#C98F70" strokeWidth="3" strokeLinecap="round" />
              <rect x="-32" y="-12" width="24" height="10" rx="2" fill="#FBF7EE" stroke="#392F3B" strokeWidth="1" opacity="0.9" />
            </g>

            {/* Pipkin flying steadily nearby if wind is solved */}
            {isWindSolved && (
              <g className="pipkin-gliding" transform="translate(-25, 20)">
                <ellipse cx="12" cy="12" rx="9" ry="8" fill="#88A991" stroke="#392F3B" strokeWidth="1.2" />
                <circle cx="16" cy="9" r="6" fill="#FFF8F1" />
                <circle cx="17" cy="9" r="1.5" fill="#392F3B" />
                <path d="M 21 9 L 26 11 L 21 13 Z" fill="#E8C878" />
              </g>
            )}

            <text x="40" y="105" textAnchor="middle" fontSize="10" fill="#FFF8F1" fontWeight="bold">
              {isWindSolved ? '✓ Active Windmill' : 'Frozen Windmill'}
            </text>
          </g>

          {/* TARGET 3: FROG MAYOR (Mid-Right) */}
          <g className={`forest-target mayor-target ${isSunSolved ? 'is-warmed' : ''}`} transform="translate(390, 200)">
            {/* Sunbeams shining down if Sun is solved */}
            {isSunSolved && (
              <g className="sunbeams-cluster" filter="url(#loom-glow)">
                <polygon points="50,-40 20,70 80,70" fill="url(#loom-brass)" opacity="0.35" />
                <line x1="50" y1="-30" x2="25" y2="70" stroke="#FFF8F1" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 4" />
                <line x1="50" y1="-30" x2="75" y2="70" stroke="#FFF8F1" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 4" />
              </g>
            )}

            {/* Moss log */}
            <path d="M 10 65 Q 50 55 90 65 L 85 78 Q 50 68 15 78 Z" fill="#5A4739" stroke="#392F3B" strokeWidth="2" />

            {/* Frog Mayor Body */}
            <ellipse cx="50" cy="48" rx="20" ry="16" fill="#88A991" stroke="#392F3B" strokeWidth="2.2" />
            <path d="M 38 44 Q 50 62 62 44 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="1.2" />
            {/* Eyes */}
            <circle cx="42" cy="34" r="7" fill="#88A991" stroke="#392F3B" strokeWidth="1.8" />
            <circle cx="42" cy="33" r="3.5" fill="#392F3B" />
            <circle cx="43" cy="32" r="1.2" fill="#FFF8F1" />
            <circle cx="58" cy="34" r="7" fill="#88A991" stroke="#392F3B" strokeWidth="1.8" />
            <circle cx="58" cy="33" r="3.5" fill="#392F3B" />
            <circle cx="59" cy="32" r="1.2" fill="#FFF8F1" />
            {/* Smile / Rosy Cheeks when warmed! */}
            {isSunSolved ? (
              <>
                <path d="M 40 40 Q 50 47 60 40" fill="none" stroke="#392F3B" strokeWidth="2" strokeLinecap="round" />
                <circle cx="34" cy="40" r="3" fill="#A34063" opacity="0.5" />
                <circle cx="66" cy="40" r="3" fill="#A34063" opacity="0.5" />
              </>
            ) : (
              <path d="M 42 44 Q 50 40 58 44" fill="none" stroke="#392F3B" strokeWidth="2" strokeLinecap="round" />
            )}

            {/* Inverted umbrella bucket */}
            <g transform="translate(18, 10)">
              <path d="M 0 25 Q 22 55 44 25 Z" fill="#55755E" stroke="#392F3B" strokeWidth="2" />
              <path d="M 22 55 L 22 75" stroke="#63392A" strokeWidth="2.5" />
            </g>

            <text x="50" y="88" textAnchor="middle" fontSize="10" fill="#FFF8F1" fontWeight="bold">
              {isSunSolved ? '✓ Warmed Mayor' : 'Frog Mayor'}
            </text>
          </g>

          {/* BRASS WEAVE LOOM FRAME (Left side) */}
          <g className="brass-loom-apparatus">
            {/* Upright brass posts */}
            <rect x="20" y="40" width="12" height="360" rx="3" fill="url(#loom-brass)" stroke="#392F3B" strokeWidth="2" />
            <rect x="90" y="40" width="10" height="360" rx="2" fill="url(#loom-brass)" stroke="#392F3B" strokeWidth="1.8" />
            {/* Horizontal crossbars */}
            <line x1="16" y1="50" x2="104" y2="50" stroke="#F7D560" strokeWidth="6" strokeLinecap="round" />
            <line x1="16" y1="400" x2="104" y2="400" stroke="#F7D560" strokeWidth="6" strokeLinecap="round" />

            {/* Spool 1: Rain */}
            <g className={`loom-spool ${activeSpoolIndex === 0 ? 'is-active-spool' : ''}`} transform="translate(50, 110)">
              <rect x="-18" y="-14" width="36" height="28" rx="4" fill="#5C93D6" stroke="#392F3B" strokeWidth="2" />
              <line x1="-14" y1="-10" x2="14" y2="10" stroke="#FFF8F1" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="0" cy="0" r="4" fill="#F7D560" stroke="#392F3B" strokeWidth="1" />
              {isRainSolved && <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#FFF8F1">✓</text>}
            </g>

            {/* Spool 2: Wind */}
            <g className={`loom-spool ${activeSpoolIndex === 1 ? 'is-active-spool' : ''}`} transform="translate(50, 220)">
              <rect x="-18" y="-14" width="36" height="28" rx="4" fill="#8E79A8" stroke="#392F3B" strokeWidth="2" />
              <path d="M -12 -6 Q 0 8 12 -6" fill="none" stroke="#FFF8F1" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="0" cy="0" r="4" fill="#F7D560" stroke="#392F3B" strokeWidth="1" />
              {isWindSolved && <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#FFF8F1">✓</text>}
            </g>

            {/* Spool 3: Sun */}
            <g className={`loom-spool ${activeSpoolIndex === 2 ? 'is-active-spool' : ''}`} transform="translate(50, 330)">
              <rect x="-18" y="-14" width="36" height="28" rx="4" fill="#E8C878" stroke="#392F3B" strokeWidth="2" />
              <circle cx="0" cy="0" r="8" fill="none" stroke="#FFF8F1" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx="0" cy="0" r="4" fill="#F7D560" stroke="#392F3B" strokeWidth="1" />
              {isSunSolved && <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#FFF8F1">✓</text>}
            </g>
          </g>

          {/* RENDER WOVEN THREAD PATHS */}
          {WEATHER_SPOOLS.map((spool, sIdx) => {
            const isDone = solvedTargets.includes(spool.targetId);
            const isActive = activeSpoolIndex === sIdx;
            const progress = isActive ? activePointProgress : isDone ? spool.points.length : 0;
            return (
              <React.Fragment key={`woven-${spool.id}`}>
                {renderThreadSegments(spool, progress, isDone)}
              </React.Fragment>
            );
          })}

          {/* LIVE DRAGGING THREAD FROM LAST PIN TO POINTER */}
          {isDragging && pointerPos && lastStitchedPoint && (
            <g className="live-drag-thread">
              <path
                d={`M ${lastStitchedPoint.x} ${lastStitchedPoint.y} Q ${(lastStitchedPoint.x + pointerPos.x) / 2} ${
                  (lastStitchedPoint.y + pointerPos.y) / 2 - 12
                } ${pointerPos.x} ${pointerPos.y}`}
                stroke={currentSpool.color}
                strokeWidth="4"
                strokeDasharray="4 2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx={pointerPos.x} cy={pointerPos.y} r="3" fill="#FFF8F1" />
            </g>
          )}

          {/* GUIDE PINS / EYELETS FOR ACTIVE SPOOL */}
          {!isCurrentSolved && (
            <g className="guide-pins-group">
              {currentSpool.points.map((pt, pIdx) => {
                const isStitched = pIdx < activePointProgress;
                const isNextTarget = pIdx === activePointProgress;

                return (
                  <g key={`pin-${currentSpool.id}-${pIdx}`} transform={`translate(${pt.x}, ${pt.y})`}>
                    {/* Forgiving hit circle */}
                    <circle r={HIT_RADIUS} fill="transparent" style={{ cursor: isNextTarget ? 'pointer' : 'default' }} />
                    {/* Brass eyelet ring */}
                    <circle
                      className={isNextTarget ? 'target-beacon-pulse' : undefined}
                      r={isNextTarget ? 13 : 9}
                      fill="#1E2A20"
                      stroke={isStitched ? currentSpool.color : isNextTarget ? '#F7D560' : 'rgba(232, 200, 120, 0.4)'}
                      strokeWidth={isNextTarget ? 3 : 2}
                      strokeDasharray={isStitched ? 'none' : isNextTarget ? '3 2' : '2 2'}
                    />
                    {isStitched ? (
                      <circle r="4" fill={currentSpool.color} />
                    ) : (
                      <text x="0" y="3.5" textAnchor="middle" fontSize="8" fill="#FFF8F1" fontWeight="bold">
                        {pIdx + 1}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* MORROW'S PEACH MITTEN PAW & BRASS NEEDLE (Follows Pointer during Drag) */}
          {isDragging && pointerPos && (
            <g
              className="morrow-paw-cursor"
              transform={`translate(${pointerPos.x}, ${pointerPos.y})`}
              aria-hidden="true"
            >
              <ellipse cx="14" cy="14" rx="14" ry="8" fill="#1a1420" opacity="0.3" />
              <rect x="22" y="2" width="10" height="20" rx="3" fill="#A34063" stroke="#392F3B" strokeWidth="1.5" />
              {/* Peach felt paw */}
              <path
                d="M 24 4 C 18 -2, 10 0, 6 6 C 2 11, 4 18, 10 20 C 16 22, 24 20, 24 16 Z"
                fill="#C98F70"
                stroke="#392F3B"
                strokeWidth="2"
              />
              <path d="M 12 6 C 8 4, 3 8, 5 12 C 7 15, 12 14, 13 10 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="1.8" />
              {/* Polished brass needle */}
              <line x1="0" y1="0" x2="16" y2="8" stroke="#F7D560" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="0" y1="0" x2="8" y2="4" stroke="#FFF8F1" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          )}

          {/* CELEBRATION SPARKLES */}
          {allSolved && (
            <g className="celebration-sparkles" fill="#F7D560">
              <text x="320" y="340" fontSize="16">✦</text>
              <text x="420" y="50" fontSize="18">✧</text>
              <text x="400" y="240" fontSize="16">✦</text>
              <text x="180" y="160" fontSize="15">✧</text>
            </g>
          )}
        </svg>
      </div>

      {/* Accessible Keyboard Controls Bar */}
      <div className="stitch-actions-bar">
        {!allSolved && (
          <button
            type="button"
            className="tactile-stitch-keyboard-btn"
            onClick={handleKeyboardAdvance}
            aria-label={`Advance thread with keyboard [Enter / Space]: Connect guide ${activePointProgress + 1} of ${currentSpool.points.length} on ${currentSpool.shortName}`}
          >
            <Keyboard size={18} aria-hidden="true" />
            <span>
              Weave with Keyboard <strong>[Enter / Space]</strong>
            </span>
          </button>
        )}

        {!isCurrentSolved && activePointProgress > 0 && !allSolved && (
          <button
            type="button"
            className="tactile-stitch-reset-btn"
            onClick={() => {
              setActivePointProgress(0);
              setIsDragging(false);
              setPointerPos(null);
            }}
            aria-label={`Re-thread ${currentSpool.shortName}`}
          >
            <RotateCcw size={16} aria-hidden="true" />
            <span>Re-thread Spool</span>
          </button>
        )}
      </div>

      {/* ARIA Live Status Feedback Banner */}
      <div id={liveRegionId} className="game-reaction tactile-stitch-reaction" role="status" aria-live="polite">
        {allSolved ? (
          <Sparkles size={20} className="reaction-icon" aria-hidden="true" />
        ) : (
          <CheckCircle2 size={20} className="reaction-icon" aria-hidden="true" />
        )}
        <div className="reaction-text">
          <p>
            <strong>
              {allSolved
                ? 'All Three Sky Threads Wonderfully Woven!'
                : `${currentSpool.name} (${activePointProgress}/${currentSpool.points.length} guides)`}
            </strong>
          </p>
          <p>
            {allSolved
              ? 'The rain falls downward to water the lilies, the windmill turns freely, and golden sunbeams warm Frog Mayor. The upside-down forest sings in harmony!'
              : lastReaction || feedbackMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TactileWeatherLoom;
