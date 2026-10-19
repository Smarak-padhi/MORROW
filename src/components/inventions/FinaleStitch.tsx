import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  playChime: () => void;
  onClimaxStageChange?: (stage: number) => void;
  initialClimaxStage?: number;
}

export const FinaleStitch: React.FC<Props> = ({
  onSuccess,
  playChime,
  onClimaxStageChange,
  initialClimaxStage = 0,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Knot and climax progression states
  const [knotCinched, setKnotCinched] = useState(initialClimaxStage >= 7);
  const [climaxStage, setClimaxStage] = useState<number>(initialClimaxStage);

  // Direct manipulation drag states
  const [isDraggingNeedle, setIsDraggingNeedle] = useState(false);
  const isDraggingNeedleRef = useRef(false);
  const [needlePos, setNeedlePos] = useState({ x: 245, y: 115 });

  // Microcopy feedback
  const [feedback, setFeedback] = useState(
    'Step 1: Guide Morrow’s golden needle across the cathedral gap to reach his first creation.'
  );

  const climaxStartedRef = useRef(initialClimaxStage >= 7);
  const playChimeRef = useRef(playChime);
  const onSuccessRef = useRef(onSuccess);
  const onClimaxStageChangeRef = useRef(onClimaxStageChange);

  useEffect(() => {
    playChimeRef.current = playChime;
  }, [playChime]);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    onClimaxStageChangeRef.current = onClimaxStageChange;
  }, [onClimaxStageChange]);

  // Notify parent of climax stage updates
  useEffect(() => {
    if (onClimaxStageChangeRef.current) {
      onClimaxStageChangeRef.current(climaxStage);
    }
  }, [climaxStage]);

  // Helper to convert client pointer coordinates to SVG coordinate system
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

  // Complete knot cinch and initiate the emotional climax sequence
  const cinchCrookedKnot = useCallback(() => {
    if (knotCinched) return;
    playChimeRef.current();
    setKnotCinched(true);
    setNeedlePos({ x: 120, y: 115 });
    isDraggingNeedleRef.current = false;
    setIsDraggingNeedle(false);
    setFeedback(
      'A wonderfully crooked knot that holds fast! Imperfect. Acceptable. Beautiful.'
    );
  }, [knotCinched]);

  // Choreographed emotional climax sequence (Stages 1 through 7)
  useEffect(() => {
    if (!knotCinched || climaxStartedRef.current) return;
    climaxStartedRef.current = true;

    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const factor = isReduced ? 0.25 : 1;

    setClimaxStage(1); // Stage 1 (0ms): Golden aura spreads from knot outward

    const t2 = setTimeout(() => {
      setClimaxStage(2); // Stage 2 (600ms): Torn seams on companion begin glowing with golden stitches
      playChimeRef.current();
    }, 600 * factor);

    const t3 = setTimeout(() => {
      setClimaxStage(3); // Stage 3 (1400ms): Heart awakens and pulses on companion's chest
      playChimeRef.current();
    }, 1400 * factor);

    const t4 = setTimeout(() => {
      setClimaxStage(4); // Stage 4 (2200ms): Surrounding cathedral gears slow to gentle hum
    }, 2200 * factor);

    const t5 = setTimeout(() => {
      setClimaxStage(5); // Stage 5 (3000ms): Morrow and The Unfinished One step to meet paw-to-paw
      playChimeRef.current();
    }, 3000 * factor);

    const t6 = setTimeout(() => {
      setClimaxStage(6); // Stage 6 (3800ms): Cathedral fills with warm amber golden light
    }, 3800 * factor);

    const t7 = setTimeout(() => {
      setClimaxStage(7); // Stage 7 (4800ms): Sequence complete, hold celebration, unlock continuation
      onSuccessRef.current();
    }, 4800 * factor);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [knotCinched]);

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (knotCinched) return;
    e.preventDefault();
    e.stopPropagation();
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
      // Browser fallback
    }
    isDraggingNeedleRef.current = true;
    setIsDraggingNeedle(true);
    const coords = getSvgCoordinates(e.clientX, e.clientY);
    if (coords) {
      setNeedlePos(coords);
      setFeedback('Tension stretches true. The Unfinished One reaches out to meet you...');
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingNeedleRef.current || knotCinched) return;
    e.preventDefault();
    const coords = getSvgCoordinates(e.clientX, e.clientY);
    if (coords) {
      setNeedlePos(coords);
      // If dragged into close proximity with companion thread, give magnetic hint
      if (Math.hypot(coords.x - 120, coords.y - 115) <= 45) {
        setFeedback('Almost touching! Release or loop to cinch the crooked knot.');
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingNeedleRef.current || knotCinched) return;
    e.preventDefault();
    isDraggingNeedleRef.current = false;
    setIsDraggingNeedle(false);
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      // Browser fallback
    }

    const coords = getSvgCoordinates(e.clientX, e.clientY);
    const pos = coords || needlePos;
    const distToTarget = Math.hypot(pos.x - 120, pos.y - 115);

    // Forgiving hit radius (within 55px or anywhere left of center 160)
    if (distToTarget <= 55 || pos.x <= 150) {
      cinchCrookedKnot();
    } else {
      // Elastic settle back toward Morrow without harsh reset
      setNeedlePos({ x: 230, y: 115 });
      setFeedback('Reach across the cathedral gap to join threads with The Unfinished One.');
    }
  };

  // Reset for replay
  const handleReset = () => {
    setKnotCinched(false);
    climaxStartedRef.current = false;
    setClimaxStage(0);
    setNeedlePos({ x: 245, y: 115 });
    setFeedback('Step 1: Guide Morrow’s golden needle across the cathedral gap to reach his first creation.');
  };

  // Dynamic catenary curve and companion reach calculations
  const reachProgress = Math.min(1, Math.max(0, (245 - needlePos.x) / 125));
  const companionReachX = knotCinched ? 120 : 95 + reachProgress * 25;
  const sag = Math.sin(reachProgress * Math.PI) * 22;
  const isNearTarget = Math.hypot(needlePos.x - 120, needlePos.y - 115) <= 50;

  return (
    <div className="game-container finale-stitch-card" aria-label="The Final Stitch tactile interaction">
      <div className="game-header">
        <div className="game-badge">
          <Heart size={18} aria-hidden="true" color="#A34063" />
          <span>THE FINAL STITCH</span>
        </div>
        <h3>The First Unfinished Thing</h3>
        <p>
          Professor Perfect demands a straight, rigid seam measured by a brass ruler. But Morrow knows a friend cannot be repaired like a machine. Reach across the gap and join threads with your first creation.
        </p>
      </div>

      {/* Tactile Needle & Thread Canvas */}
      <div
        className="finale-stage physical-stitch-stage"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
          background: 'radial-gradient(circle at 50% 50%, #292138 0%, #15111d 100%)',
          padding: '12px',
          boxShadow: 'inset 0 0 25px rgba(0,0,0,0.6), 0 4px 15px rgba(0,0,0,0.4)',
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 380 220"
          className="finale-svg physical-stitch-svg"
          role="img"
          aria-label={`Tactile final stitch canvas. Morrow's golden thread connecting across the gap to The Unfinished One. Status: ${knotCinched ? 'Crooked knot cinched' : 'Awaiting thread connection'}`}
          style={{ width: '100%', maxHeight: '320px', display: 'block', margin: '0 auto', touchAction: 'none' }}
          onPointerMove={(e) => {
            if (isDraggingNeedleRef.current) handlePointerMove(e);
          }}
          onPointerUp={(e) => {
            if (isDraggingNeedleRef.current) handlePointerUp(e);
          }}
          onPointerCancel={(e) => {
            if (isDraggingNeedleRef.current) handlePointerUp(e);
          }}
        >
          <defs>
            <radialGradient id="cathedral-chasm-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F7D560" stopOpacity={knotCinched ? '0.45' : '0.12'} />
              <stop offset="70%" stopColor="#A34063" stopOpacity={knotCinched ? '0.2' : '0.04'} />
              <stop offset="100%" stopColor="#15111d" stopOpacity="0" />
            </radialGradient>
            <filter id="golden-pulse-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#F7D560" floodOpacity="0.9" />
            </filter>
            <filter id="knot-snap-aura">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#88A991" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* Ambient center illumination */}
          <ellipse cx="190" cy="115" rx="160" ry="75" fill="url(#cathedral-chasm-glow)" />

          {/* Platform Floor Shadows */}
          <ellipse cx="65" cy="165" rx="55" ry="12" fill="#0d0a14" opacity="0.65" />
          <ellipse cx="315" cy="165" rx="55" ry="12" fill="#0d0a14" opacity="0.65" />

          {/* Left Gear Platform (The Unfinished One's side) */}
          <g transform="translate(65, 155)">
            <ellipse cx="0" cy="0" rx="58" ry="18" fill="#2d243a" stroke="#8E79A8" strokeWidth="2.5" />
            <ellipse cx="0" cy="0" rx="42" ry="12" fill="#1b1626" stroke="#4d3b63" strokeWidth="1.5" strokeDasharray="4,3" />
          </g>

          {/* Right Gear Platform (Morrow's side) */}
          <g transform="translate(315, 155)">
            <ellipse cx="0" cy="0" rx="58" ry="18" fill="#2d243a" stroke="#D4A853" strokeWidth="2.5" />
            <ellipse cx="0" cy="0" rx="42" ry="12" fill="#1b1626" stroke="#8C6527" strokeWidth="1.5" strokeDasharray="4,3" />
          </g>

          {/* =========================================================================
              THE UNFINISHED ONE'S PAW & NAVY THREAD (Left)
             ========================================================================= */}
          <g className="companion-paw-assembly">
            {/* Navy arm stretching toward center */}
            <path
              d={`M 25 115 Q 55 ${105 - reachProgress * 6} ${companionReachX} 115`}
              fill="none"
              stroke="#25324A"
              strokeWidth="22"
              strokeLinecap="round"
            />
            {/* Mitten head */}
            <ellipse cx={companionReachX} cy="115" rx="14" ry="12" fill="#25324A" stroke="#182132" strokeWidth="2" />
            {/* Thumb */}
            <path
              d={`M ${companionReachX - 6} 107 Q ${companionReachX} 99 ${companionReachX + 6} 105`}
              fill="none"
              stroke="#25324A"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Torn Seam Marks (Heals with glowing gold stitches in Stage 2+) */}
            {climaxStage < 2 ? (
              <g opacity="0.75">
                <line x1="42" y1="108" x2="48" y2="122" stroke="#161220" strokeWidth="2.5" />
                <line x1="56" y1="106" x2="62" y2="120" stroke="#161220" strokeWidth="2.5" />
                <text x="50" y="136" textAnchor="middle" fill="#E8DEC8" fontSize="6.5" opacity="0.6">Torn Seam</text>
              </g>
            ) : (
              <g filter="url(#golden-pulse-glow)">
                <line x1="42" y1="108" x2="48" y2="122" stroke="#F7D560" strokeWidth="3" strokeLinecap="round" />
                <line x1="56" y1="106" x2="62" y2="120" stroke="#F7D560" strokeWidth="3" strokeLinecap="round" />
                <circle cx="45" cy="115" r="2.5" fill="#FFF8F1" />
                <circle cx="59" cy="113" r="2.5" fill="#FFF8F1" />
              </g>
            )}

            {/* Companion's signature chest heart (Glows warmly in Stage 3+) */}
            {climaxStage >= 3 && (
              <g transform="translate(38, 92)" filter="url(#golden-pulse-glow)" className="companion-heart-glow">
                <path
                  d="M -7 -3 C -11 -9, -2 -10, 0 -3 C 2 -10, 11 -9, 7 -3 C 4 3, 0 8, 0 8 C 0 8, -4 3, -7 -3 Z"
                  fill="#A34063"
                  stroke="#F7D560"
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="0" r="2" fill="#F7D560" />
              </g>
            )}

            {/* Companion's Navy Thread extending from paw to target knot junction */}
            <path
              d={`M ${companionReachX} 115 Q ${(companionReachX + 120) / 2} 114 120 115`}
              fill="none"
              stroke="#8E79A8"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* =========================================================================
              TARGET KNOT SNAP ZONE (Around 120, 115)
             ========================================================================= */}
          {!knotCinched && (
            <g
              transform="translate(120, 115)"
              filter={isNearTarget ? 'url(#knot-snap-aura)' : undefined}
            >
              <circle
                cx="0"
                cy="0"
                r="22"
                fill={isNearTarget ? 'rgba(136, 169, 145, 0.35)' : 'rgba(232, 200, 120, 0.1)'}
                stroke={isNearTarget ? '#88A991' : '#E8C878'}
                strokeWidth={isNearTarget ? 3 : 1.5}
                strokeDasharray="4,3"
              />
              <circle cx="0" cy="0" r="3" fill="#E8C878" />
              <text x="0" y="32" textAnchor="middle" fill="#E8C878" fontSize="7" opacity="0.8">
                Join Knot Here
              </text>
            </g>
          )}

          {/* =========================================================================
              MORROW'S PAW & SPOOL ANCHOR (Right)
             ========================================================================= */}
          <g className="morrow-paw-assembly">
            {/* Peach arm stretching forward */}
            <path d="M 355 115 Q 315 105 275 115" fill="none" stroke="#C98F70" strokeWidth="22" strokeLinecap="round" />
            <ellipse cx="275" cy="115" rx="14" ry="12" fill="#C98F70" stroke="#8B4A34" strokeWidth="2" />
            {/* Plum scarf cuff */}
            <rect x="325" y="103" width="10" height="24" rx="3" fill="#A34063" stroke="#252030" strokeWidth="1.5" />
            {/* Golden spool on tail */}
            <g transform="translate(350, 95)">
              <rect x="0" y="0" width="8" height="12" rx="2" fill="#8F5D48" stroke="#120c18" strokeWidth="1" />
              <rect x="2" y="2" width="4" height="8" fill="#F7D560" />
            </g>
          </g>

          {/* =========================================================================
              DYNAMIC ELASTIC GOLDEN THREAD
             ========================================================================= */}
          <path
            d={`M 270 115 Q ${(270 + needlePos.x) / 2} ${(115 + needlePos.y) / 2 + sag} ${needlePos.x} ${needlePos.y}`}
            fill="none"
            stroke="#F7D560"
            strokeWidth={knotCinched ? 5 : isDraggingNeedle ? 4.5 : 3.5}
            strokeLinecap="round"
            filter={knotCinched ? 'url(#golden-pulse-glow)' : undefined}
          />

          {/* Sparkles along the golden thread while dragging */}
          {isDraggingNeedle && (
            <g fill="#FFF8F1" opacity="0.9">
              <circle cx={(270 + needlePos.x) / 2} cy={(115 + needlePos.y) / 2 + sag - 3} r="2" />
              <text x={(270 + needlePos.x) / 2 + 10} y={(115 + needlePos.y) / 2 + sag} fontSize="8" fill="#F7D560">✦</text>
            </g>
          )}

          {/* =========================================================================
              CINCHED CROOKED KNOT (When joined)
             ========================================================================= */}
          {knotCinched && (
            <g transform="translate(120, 115)" filter="url(#golden-pulse-glow)" className="crooked-knot-cinch">
              {/* Crooked bow loops */}
              <path
                d="M -16 -12 C -28 -24, -4 -25, 0 -8 C 4 -25, 28 -24, 16 -12 C 10 2, 0 14, 0 14 C 0 14, -10 2, -16 -12 Z"
                fill="none"
                stroke="#F7D560"
                strokeWidth="3.5"
              />
              {/* Trailing uneven thread tails */}
              <path d="M -4 6 Q -12 24 -20 28" fill="none" stroke="#F7D560" strokeWidth="3" strokeLinecap="round" />
              <path d="M 4 6 Q 14 26 24 22" fill="none" stroke="#F7D560" strokeWidth="2.5" strokeLinecap="round" />
              {/* Center berry knot bead */}
              <circle cx="0" cy="0" r="5.5" fill="#A34063" stroke="#FFF8F1" strokeWidth="1.8" />
              <circle cx="0" cy="0" r="2" fill="#F7D560" />
              {/* Radiating sparkle stars */}
              <text x="-34" y="-18" fontSize="12" fill="#F7D560">✦</text>
              <text x="24" y="-18" fontSize="14" fill="#FFF8F1">✧</text>
              <text x="0" y="34" fontSize="11" fill="#F7D560">✦</text>
            </g>
          )}

          {/* =========================================================================
              DRAGGABLE MORROW NEEDLE
             ========================================================================= */}
          {!knotCinched && (
            <g
              transform={`translate(${needlePos.x}, ${needlePos.y})`}
              className="draggable-needle-group"
              onPointerDown={handlePointerDown}
              style={{
                cursor: isDraggingNeedle ? 'grabbing' : 'grab',
                touchAction: 'none',
                filter: isDraggingNeedle ? 'url(#golden-pulse-glow)' : 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))',
              }}
              role="slider"
              tabIndex={0}
              aria-valuemin={120}
              aria-valuemax={245}
              aria-valuenow={needlePos.x}
              aria-label="Morrow's polished brass needle. Drag across the cathedral chasm to join threads or press Enter/Arrows."
              onKeyDown={(e) => {
                if (knotCinched) return;
                if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  const nextX = Math.max(120, needlePos.x - 20);
                  setNeedlePos(p => ({ ...p, x: nextX }));
                  if (nextX <= 140) cinchCrookedKnot();
                } else if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  const nextX = Math.min(245, needlePos.x + 20);
                  setNeedlePos(p => ({ ...p, x: nextX }));
                } else if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  cinchCrookedKnot();
                }
              }}
            >
              {/* Invisible generous hit target */}
              <circle cx="0" cy="0" r="28" fill="transparent" style={{ pointerEvents: 'auto' }} />

              {/* Polished Brass Needle */}
              <line x1="16" y1="4" x2="-16" y2="-4" stroke="#F7D560" strokeWidth="4.5" strokeLinecap="round" />
              <polygon points="-22,-5 -14,-7 -14,-3" fill="#F7D560" />
              {/* Needle eye holding golden thread */}
              <circle cx="12" cy="3" r="2.5" fill="#15111d" stroke="#F7D560" strokeWidth="1.2" />
              {/* Grip ring */}
              <circle cx="0" cy="0" r="14" fill="rgba(247, 213, 96, 0.15)" stroke="#F7D560" strokeWidth="1.5" strokeDasharray="3,2" />
            </g>
          )}

          {/* Connected Paws Meeting at Center in Climax Stage 5+ */}
          {climaxStage >= 5 && (
            <g transform="translate(190, 115)" filter="url(#golden-pulse-glow)">
              <text x="0" y="-15" textAnchor="middle" fill="#F7D560" fontSize="9" fontWeight="bold">
                ✦ PAWS MEET ✦
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* =========================================================================
          ACCESSIBLE CLOCKWORK DRAWER (Dual-Mode Keyboard Alternative)
         ========================================================================= */}
      <details className="accessible-stitch-drawer" style={{ marginTop: '12px' }}>
        <summary
          style={{
            cursor: 'pointer',
            padding: '8px 12px',
            font: "700 0.8rem 'Space Mono', monospace",
            color: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>✦ Accessible Stitch Navigation (Keyboard / Voice)</span>
          <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>[Press Enter to Expand]</span>
        </summary>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px 4px 4px' }}>
          <button
            type="button"
            className="accessible-stitch-btn"
            onClick={() => {
              setNeedlePos({ x: 180, y: 115 });
              setFeedback('Guided halfway across the gap! Now join ends to cinch.');
            }}
            disabled={knotCinched}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'var(--surface)',
              border: '1.5px solid var(--line)',
              textAlign: 'left',
              cursor: knotCinched ? 'default' : 'pointer',
            }}
          >
            <strong>1. Guide Golden Thread Across Gap [Enter / Space]</strong>
            <small style={{ display: 'block', color: 'var(--ink)', opacity: 0.8 }}>
              {needlePos.x <= 180 ? '✓ Thread guided across gap' : 'Advance needle toward friend'}
            </small>
          </button>

          <button
            type="button"
            className="accessible-stitch-btn"
            onClick={cinchCrookedKnot}
            disabled={knotCinched}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: knotCinched ? 'rgba(136, 169, 145, 0.15)' : 'var(--surface)',
              border: knotCinched ? '2px solid var(--sage)' : '1.5px solid var(--line)',
              textAlign: 'left',
              cursor: knotCinched ? 'default' : 'pointer',
            }}
          >
            <strong>2. Join Uneven Thread Ends & Cinch Crooked Knot [Enter / Space]</strong>
            <small style={{ display: 'block', color: 'var(--ink)', opacity: 0.8 }}>
              {knotCinched ? '✓ Crooked knot cinched and holding fast' : 'Tie the imperfect stitch together'}
            </small>
          </button>
        </div>
      </details>

      {/* Replay action when completed */}
      {knotCinched && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button
            type="button"
            onClick={handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '99px',
              border: '1px solid var(--line)',
              background: 'rgba(255, 248, 241, 0.9)',
              fontSize: '0.75rem',
              fontFamily: "'Space Mono', monospace",
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={14} /> Re-tie the crooked stitch
          </button>
        </div>
      )}

      {/* Live Status Reaction Banner */}
      <div className="game-reaction" role="status" aria-live="polite" style={{ marginTop: '12px' }}>
        {knotCinched ? (
          <Sparkles size={18} className="reaction-icon" color="#A34063" />
        ) : (
          <CheckCircle2 size={18} className="reaction-icon" />
        )}
        <p>{feedback}</p>
      </div>
    </div>
  );
};
