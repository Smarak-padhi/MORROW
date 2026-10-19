import React, { useState, useRef, useEffect, useCallback, useId } from 'react';
import { Scissors, Sparkles, CheckCircle2, RotateCcw, Keyboard } from 'lucide-react';

export interface TactileShadowStitcherProps {
  onSeamComplete?: (seamIndex: number) => void;
  onSuccess: () => void;
  playChime: () => void;
  className?: string;
  initialSeamsRepaired?: number[];
}

export interface SeamDef {
  id: number;
  name: string;
  shortName: string;
  description: string;
  repairMessage: string;
  characterReaction: string;
  points: { x: number; y: number }[];
}

export const SEAMS: SeamDef[] = [
  {
    id: 0,
    name: 'Trunk Anchor Seam',
    shortName: 'Trunk Anchor',
    description: "Anchoring the oak trunk firmly to Duck's planted feet.",
    repairMessage: "Duck's feet feel the deep, steady root of an ancient oak!",
    characterReaction: 'Duck: “My toes! They have roots now! Real oak roots!”',
    points: [
      { x: 200, y: 412 },
      { x: 198, y: 372 },
      { x: 194, y: 332 },
      { x: 190, y: 292 },
      { x: 186, y: 252 },
    ],
  },
  {
    id: 1,
    name: 'Branch Fray Seam',
    shortName: 'Branch Fray',
    description: 'Mending the left spreading bough to catch the village breeze.',
    repairMessage: 'The left bough knits together, sturdy, supple, and wide.',
    characterReaction: 'Pipkin: “EXTRA! The left bough just caught a gentle gust!”',
    points: [
      { x: 186, y: 252 },
      { x: 154, y: 238 },
      { x: 122, y: 226 },
      { x: 90, y: 214 },
      { x: 58, y: 202 },
    ],
  },
  {
    id: 2,
    name: 'Canopy Crown Seam',
    shortName: 'Canopy Crown',
    description: 'Stitching the crown leaves into a rustling, protective ceiling.',
    repairMessage: 'The canopy crown seals taut with luminous golden thread!',
    characterReaction: 'Sir Clack: “Magnificent tension! Not a stitch out of true.”',
    points: [
      { x: 110, y: 55 },
      { x: 152, y: 36 },
      { x: 200, y: 28 },
      { x: 248, y: 36 },
      { x: 290, y: 55 },
    ],
  },
];

const ENCOURAGING_LINES = [
  '“A little loose—pull it taut!” whispers Morrow.',
  '“Hold steady! Guide the needle through the next hole.”',
  '“The thread slipped! Catch the loop again from the last stitch.”',
  '“Take your time—Morrow’s needle never rushes an imperfect stitch.”',
];

const HIT_RADIUS = 38; // Forgiving hit radius in SVG units (~76px touch diameter)

export const TactileShadowStitcher: React.FC<TactileShadowStitcherProps> = ({
  onSeamComplete,
  onSuccess,
  playChime,
  className = '',
  initialSeamsRepaired = [],
}) => {
  const [repairedSeams, setRepairedSeams] = useState<number[]>(initialSeamsRepaired);
  const [activeSeamIndex, setActiveSeamIndex] = useState<number>(() => {
    const firstUnrepaired = SEAMS.findIndex((s) => !initialSeamsRepaired.includes(s.id));
    return firstUnrepaired !== -1 ? firstUnrepaired : 0;
  });

  // Number of points connected in the current active seam (0 to points.length)
  const [activePointProgress, setActivePointProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>(
    'Duck’s impossible oak tree shadow is torn in 3 places. Drag Morrow’s needle along each seam to repair it.'
  );
  const [lastCompletedReaction, setLastCompletedReaction] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const activeSeamRef = useRef<number>(activeSeamIndex);
  const activeProgressRef = useRef<number>(activePointProgress);
  const repairedSeamsRef = useRef<number[]>(repairedSeams);

  activeSeamRef.current = activeSeamIndex;
  activeProgressRef.current = activePointProgress;
  repairedSeamsRef.current = repairedSeams;

  const liveRegionId = useId();
  const allCompleted = repairedSeams.length === SEAMS.length;
  const currentSeam = SEAMS[activeSeamIndex];
  const isCurrentSeamDone = repairedSeams.includes(activeSeamIndex);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener?.('change', listener);
      return () => mediaQuery.removeEventListener?.('change', listener);
    }
  }, []);

  // Prevent default scroll when dragging on touch devices
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault();
      }
    };

    svgEl.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      svgEl.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // Transform browser screen coordinates to SVG viewBox coordinates
  const getSvgCoordinates = useCallback((clientX: number, clientY: number): { x: number; y: number } | null => {
    const svg = svgRef.current;
    if (!svg) return null;

    try {
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = svg.getScreenCTM();
      if (ctm) {
        const transformed = pt.matrixTransform(ctm.inverse());
        return { x: transformed.x, y: transformed.y };
      }
    } catch {
      // Fallback calculation using bounding box
    }

    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    const x = ((clientX - rect.left) / rect.width) * 400;
    const y = ((clientY - rect.top) / rect.height) * 460;
    return { x, y };
  }, []);

  // Handle advancing a point in the seam (used by both pointer and keyboard)
  const advanceStitchPoint = useCallback((seamIdx: number, newPointCount: number) => {
    const seam = SEAMS[seamIdx];
    playChime();

    if (newPointCount >= seam.points.length) {
      // Seam is fully completed!
      const nextRepaired = Array.from(new Set([...repairedSeamsRef.current, seamIdx]));
      setRepairedSeams(nextRepaired);
      setActivePointProgress(seam.points.length);
      setIsDragging(false);
      isDraggingRef.current = false;
      setPointerPos(null);

      setLastCompletedReaction(seam.characterReaction);
      setFeedbackMessage(`${seam.name} complete! ${seam.repairMessage}`);
      onSeamComplete?.(seamIdx);

      if (nextRepaired.length === SEAMS.length) {
        onSuccess();
      } else {
        // Auto-select the next uncompleted seam
        const nextUnrepaired = SEAMS.findIndex((s) => !nextRepaired.includes(s.id));
        if (nextUnrepaired !== -1) {
          setTimeout(() => {
            setActiveSeamIndex(nextUnrepaired);
            setActivePointProgress(0);
          }, prefersReducedMotion ? 50 : 450);
        }
      }
    } else {
      setActivePointProgress(newPointCount);
      setFeedbackMessage(
        `${seam.shortName}: Connected ${newPointCount} of ${seam.points.length} guide holes. Keep dragging!`
      );
    }
  }, [onSeamComplete, onSuccess, playChime, prefersReducedMotion]);

  // Pointer Down handler
  const handlePointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (allCompleted) return;

    const coords = getSvgCoordinates(e.clientX, e.clientY);
    if (!coords) return;

    const seamIdx = activeSeamRef.current;
    if (repairedSeamsRef.current.includes(seamIdx)) {
      // Find first uncompleted seam or do nothing
      return;
    }

    const seam = SEAMS[seamIdx];
    const currentProgress = activeProgressRef.current;
    const targetIdx = currentProgress === 0 ? 0 : currentProgress;
    const targetPt = seam.points[targetIdx];

    const dist = Math.hypot(coords.x - targetPt.x, coords.y - targetPt.y);

    // If tapped near target hole (or anywhere if seam already started)
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
        // First hole touched
        advanceStitchPoint(seamIdx, 1);
      }
    } else if (currentProgress > 0) {
      // Resume dragging from where we left off
      const lastPt = seam.points[currentProgress - 1];
      const distToLast = Math.hypot(coords.x - lastPt.x, coords.y - lastPt.y);
      if (distToLast <= HIT_RADIUS * 1.5) {
        setIsDragging(true);
        isDraggingRef.current = true;
        setPointerPos(coords);
      }
    }
  }, [allCompleted, getSvgCoordinates, advanceStitchPoint]);

  // Pointer Move handler
  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current || allCompleted) return;

    const coords = getSvgCoordinates(e.clientX, e.clientY);
    if (!coords) return;

    setPointerPos(coords);

    const seamIdx = activeSeamRef.current;
    const seam = SEAMS[seamIdx];
    const currentProgress = activeProgressRef.current;

    if (currentProgress >= seam.points.length) return;

    const nextTargetPt = seam.points[currentProgress];
    const distToTarget = Math.hypot(coords.x - nextTargetPt.x, coords.y - nextTargetPt.y);

    if (distToTarget <= HIT_RADIUS) {
      // Reached next hole!
      advanceStitchPoint(seamIdx, currentProgress + 1);
    }
  }, [allCompleted, getSvgCoordinates, advanceStitchPoint]);

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

    const seamIdx = activeSeamRef.current;
    const seam = SEAMS[seamIdx];
    const currentProgress = activeProgressRef.current;

    if (currentProgress < seam.points.length && !repairedSeamsRef.current.includes(seamIdx)) {
      const randomLine = ENCOURAGING_LINES[Math.floor(Math.random() * ENCOURAGING_LINES.length)];
      setFeedbackMessage(`${randomLine} (Touch hole ${currentProgress + 1} to resume)`);
    }
  }, []);

  // Keyboard Advance
  const handleKeyboardAdvance = useCallback(() => {
    if (allCompleted) return;

    let seamIdx = activeSeamIndex;
    if (repairedSeams.includes(seamIdx)) {
      const nextUnrepaired = SEAMS.findIndex((s) => !repairedSeams.includes(s.id));
      if (nextUnrepaired === -1) return;
      seamIdx = nextUnrepaired;
      setActiveSeamIndex(seamIdx);
      setActivePointProgress(0);
    }

    const seam = SEAMS[seamIdx];
    const currentProgress = activePointProgress;
    if (currentProgress >= seam.points.length) return;
    const nextProgress = currentProgress + 1;

    advanceStitchPoint(seamIdx, nextProgress);
  }, [allCompleted, activeSeamIndex, repairedSeams, activePointProgress, advanceStitchPoint]);

  // Keyboard navigation on interactive container
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleKeyboardAdvance();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleKeyboardAdvance();
    } else if (e.key === '1') {
      setActiveSeamIndex(0);
      setActivePointProgress(repairedSeams.includes(0) ? SEAMS[0].points.length : 0);
    } else if (e.key === '2') {
      setActiveSeamIndex(1);
      setActivePointProgress(repairedSeams.includes(1) ? SEAMS[1].points.length : 0);
    } else if (e.key === '3') {
      setActiveSeamIndex(2);
      setActivePointProgress(repairedSeams.includes(2) ? SEAMS[2].points.length : 0);
    }
  }, [handleKeyboardAdvance, repairedSeams]);

  // Restart current seam
  const handleResetCurrentSeam = () => {
    if (repairedSeams.includes(activeSeamIndex)) return;
    setActivePointProgress(0);
    setIsDragging(false);
    setPointerPos(null);
    setFeedbackMessage(`Reset ${currentSeam.shortName}. Drag from hole 1 to begin.`);
  };

  // Helper to render blanket stitches along completed or in-progress segments
  const renderStitchSegments = (points: { x: number; y: number }[], count: number, isFinished: boolean) => {
    if (count <= 1) return null;

    const segments: React.ReactNode[] = [];
    for (let i = 0; i < count - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;

      // Slight natural curvature control point
      const midX = (p1.x + p2.x) / 2 + nx * 2;
      const midY = (p1.y + p2.y) / 2 + ny * 2;

      // 2 perpendicular blanket-stitch cross hashes along the segment
      const t1 = 0.35;
      const t2 = 0.7;
      const h1x = p1.x + dx * t1;
      const h1y = p1.y + dy * t1;
      const h2x = p1.x + dx * t2;
      const h2y = p1.y + dy * t2;

      segments.push(
        <g key={`stitch-${i}`} className="stitch-segment">
          {/* Main glowing golden blanket stitch line */}
          <path
            d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
            stroke="#E8C878"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            filter="url(#gold-stitch-glow)"
          />
          {/* Lighter core thread highlight */}
          <path
            d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
            stroke="#FFF8F1"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {/* Blanket cross-stitch tick 1 */}
          <line
            x1={h1x - nx * 1.5}
            y1={h1y - ny * 1.5}
            x2={h1x + nx * 6.5}
            y2={h1y + ny * 6.5}
            stroke="#F7D560"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Blanket cross-stitch tick 2 */}
          <line
            x1={h2x - nx * 1.5}
            y1={h2y - ny * 1.5}
            x2={h2x + nx * 6.5}
            y2={h2y + ny * 6.5}
            stroke="#F7D560"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      );
    }

    return <g className={isFinished ? 'seam-finished' : 'seam-in-progress'}>{segments}</g>;
  };

  // Render guide holes for a seam
  const renderGuideHoles = (seam: SeamDef, seamIndex: number) => {
    const isDone = repairedSeams.includes(seamIndex);
    const isActive = activeSeamIndex === seamIndex;
    const progress = isActive ? activePointProgress : isDone ? seam.points.length : 0;

    return (
      <g key={`seam-holes-${seam.id}`} className={`seam-holes-group seam-${seam.id}`}>
        {seam.points.map((pt, idx) => {
          const isStitched = idx < progress;
          const isNextTarget = isActive && !isDone && idx === progress;

          return (
            <g
              key={`hole-${seam.id}-${idx}`}
              className={`guide-hole ${isStitched ? 'is-stitched' : ''} ${isNextTarget ? 'is-target' : ''}`}
              transform={`translate(${pt.x}, ${pt.y})`}
            >
              {/* Outer forgiving touch target (hidden from view, accessible to pointer/touch) */}
              <circle
                r={HIT_RADIUS}
                fill="transparent"
                style={{ cursor: isNextTarget ? 'pointer' : 'default' }}
                aria-hidden="true"
              />

              {/* Visual hole ring in shadow cloth */}
              <circle
                r={isNextTarget ? 14 : 10}
                fill="#120c17"
                stroke={isStitched ? '#E8C878' : isNextTarget ? '#F7D560' : 'rgba(232, 200, 120, 0.4)'}
                strokeWidth={isNextTarget ? 3 : 2}
                strokeDasharray={isStitched ? 'none' : isNextTarget ? '4 2' : '2 2'}
                className={isNextTarget && !prefersReducedMotion ? 'target-beacon-pulse' : ''}
              />

              {/* Stitched golden brass eyelet & knot */}
              {isStitched ? (
                <>
                  <circle r="4.5" fill="#F7D560" stroke="#392F3B" strokeWidth="1.2" />
                  <circle r="1.5" fill="#FFF8F1" />
                </>
              ) : (
                /* Unstitched glowing thread eyelet notch along the torn seam */
                <>
                  <circle
                    r={isNextTarget ? 5 : 3.5}
                    fill={isNextTarget ? '#F7D560' : 'rgba(232, 200, 120, 0.65)'}
                    stroke="#1a1420"
                    strokeWidth="1.2"
                  />
                  {isNextTarget && (
                    <circle r="2" fill="#FFF8F1" />
                  )}
                </>
              )}
            </g>
          );
        })}
      </g>
    );
  };

  // Trailing golden thread and Morrow's paw during active dragging
  const lastStitchedPoint =
    activePointProgress > 0 && activePointProgress <= currentSeam.points.length
      ? currentSeam.points[activePointProgress - 1]
      : null;

  return (
    <div
      className={`direct-environmental-stitcher ${className}`}
      role="application"
      aria-label="Direct environmental shadow stitcher: drag Morrow's glowing golden thread along the 3 torn shadow seams"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Narrative In-Scene Guidance Banner */}
      <div className="environmental-stitch-guidance" aria-live="polite">
        <div className="guidance-seam-badge">
          <Scissors size={15} aria-hidden="true" />
          <span>SEAM {currentSeam.id + 1}/3: {currentSeam.shortName.toUpperCase()}</span>
        </div>
        <p className="guidance-instruction">
          {allCompleted
            ? 'All three torn seams have pulled together! Duck’s tree shadow rests peacefully.'
            : isCurrentSeamDone
            ? `${currentSeam.shortName} holds fast! Select the next damaged edge.`
            : `Drag Morrow's golden thread along the glowing torn edge to pull the shadow together.`}
        </p>
      </div>

      {/* Interactive Sewing Stage */}
      <div
        className="tactile-stage-wrapper"
        style={{ touchAction: 'none' }}
        aria-describedby={liveRegionId}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 400 460"
          className="tactile-shadow-svg"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="img"
          aria-label={`Oak tree shadow showing Duck at feet with ${repairedSeams.length} of 3 seams repaired.`}
        >
          <defs>
            {/* Ambient paper warmth background */}
            <radialGradient id="stage-paper-glow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#FFF8F1" stopOpacity="1" />
              <stop offset="70%" stopColor="#F7EEDD" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ECDCC7" stopOpacity="0.9" />
            </radialGradient>

            {/* Tree shadow silhouette fill */}
            <linearGradient id="tree-shadow-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1420" stopOpacity="0.96" />
              <stop offset="50%" stopColor="#1e1625" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#140f1a" stopOpacity="0.98" />
            </linearGradient>

            {/* Glowing Golden Thread Filter */}
            <filter id="gold-stitch-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#E8C878" floodOpacity="0.8" />
              <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="#F7D560" floodOpacity="0.9" />
            </filter>

            {/* Damaged seam fray pattern */}
            <filter id="tear-fray-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.28  0 0 0 0 0.16  0 0 0 0 0.32  0 0 0 0.6 0" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>

          {/* Transparent Canvas blending directly into village cobblestone scene */}
          <rect width="400" height="460" rx="18" fill="rgba(24, 19, 36, 0.45)" />

          {/* Perspective Village Cobblestones under Duck's feet */}
          <g className="stage-cobblestones" opacity="0.65">
            <ellipse cx="200" cy="430" rx="160" ry="24" fill="#140f1c" opacity="0.45" />
            <ellipse cx="140" cy="435" rx="40" ry="11" fill="#241b30" opacity="0.55" stroke="#3d2c52" strokeWidth="1" />
            <ellipse cx="200" cy="438" rx="48" ry="12" fill="#241b30" opacity="0.6" stroke="#3d2c52" strokeWidth="1" />
            <ellipse cx="260" cy="434" rx="42" ry="10" fill="#241b30" opacity="0.55" stroke="#3d2c52" strokeWidth="1" />
            <ellipse cx="90" cy="425" rx="32" ry="8" fill="#1b1424" opacity="0.4" stroke="#342545" strokeWidth="0.8" />
            <ellipse cx="310" cy="425" rx="34" ry="8" fill="#1b1424" opacity="0.4" stroke="#342545" strokeWidth="0.8" />
          </g>

          {/* Massive Gnarled Oak Tree Silhouette Shadow */}
          <g className="tree-shadow-silhouette" filter="url(#tear-fray-shadow)">
            <path
              d="M 195 415
                 C 192 360, 188 310, 184 255
                 C 150 250, 110 235, 58 205
                 C 38 185, 34 155, 46 125
                 C 30 95, 42 60, 75 42
                 C 108 24, 150 14, 200 14
                 C 250 14, 292 24, 325 42
                 C 358 60, 370 95, 354 125
                 C 366 155, 362 185, 342 205
                 C 290 235, 250 250, 216 255
                 C 212 310, 208 360, 205 415
                 Z"
              fill="url(#tree-shadow-gradient)"
            />
            {/* Interior oak branch shadows */}
            <path d="M 186 252 Q 130 220 70 195" stroke="#120c17" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.8" />
            <path d="M 214 255 Q 260 215 310 180" stroke="#120c17" strokeWidth="11" strokeLinecap="round" fill="none" opacity="0.8" />
            <path d="M 200 255 Q 196 160 200 80" stroke="#120c17" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.8" />
          </g>

          {/* Damaged Tear Lines (visible before seam is repaired) */}
          {SEAMS.map((s) => {
            const isDone = repairedSeams.includes(s.id);
            if (isDone) return null;

            // Generate jagged tear line through guide holes
            const d = s.points.reduce((acc, pt, i) => {
              if (i === 0) return `M ${pt.x} ${pt.y}`;
              const prev = s.points[i - 1];
              const midX = (prev.x + pt.x) / 2 + (i % 2 === 0 ? 5 : -5);
              const midY = (prev.y + pt.y) / 2 + (i % 2 === 0 ? -4 : 4);
              return `${acc} Q ${midX} ${midY} ${pt.x} ${pt.y}`;
            }, '');

            return (
              <g key={`tear-${s.id}`} className="damaged-tear-line" opacity={activeSeamIndex === s.id ? 0.95 : 0.55}>
                <path d={d} stroke="#3b1f35" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.75" />
                <path d={d} stroke="#E8C878" strokeWidth="1.8" strokeDasharray="3 4" strokeLinecap="round" fill="none" opacity="0.85" />
              </g>
            );
          })}

          {/* Stitched Seams (Completed or In-Progress) */}
          {SEAMS.map((s) => {
            const isDone = repairedSeams.includes(s.id);
            const isActive = activeSeamIndex === s.id;
            const progress = isDone ? s.points.length : isActive ? activePointProgress : 0;
            return renderStitchSegments(s.points, progress, isDone);
          })}

          {/* Guide Holes for each seam */}
          {SEAMS.map((s, idx) => renderGuideHoles(s, idx))}

          {/* Active Live Dragging Thread from last stitched hole to pointer */}
          {isDragging && pointerPos && lastStitchedPoint && (
            <g className="live-drag-thread" filter="url(#gold-stitch-glow)">
              <path
                d={`M ${lastStitchedPoint.x} ${lastStitchedPoint.y} Q ${(lastStitchedPoint.x + pointerPos.x) / 2} ${
                  (lastStitchedPoint.y + pointerPos.y) / 2 + 10
                } ${pointerPos.x} ${pointerPos.y}`}
                stroke="#E8C878"
                strokeWidth="3.5"
                strokeDasharray="5 3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Lighter thread shine */}
              <circle cx={pointerPos.x} cy={pointerPos.y} r="3" fill="#FFF8F1" />
            </g>
          )}

          {/* Morrow's Peach Felt Mitten Paw holding Polished Brass Needle */}
          {isDragging && pointerPos && (
            <g
              className="morrow-paw-cursor"
              transform={`translate(${pointerPos.x}, ${pointerPos.y})`}
              aria-hidden="true"
            >
              {/* Soft contact shadow */}
              <ellipse cx="14" cy="14" rx="15" ry="9" fill="#1a1420" opacity="0.25" />
              {/* Scarf / Cuff (plum fabric with gold stitch) */}
              <rect x="22" y="2" width="10" height="20" rx="3" fill="#A34063" stroke="#392F3B" strokeWidth="1.5" />
              <line x1="26" y1="4" x2="26" y2="20" stroke="#E8C878" strokeWidth="1" strokeDasharray="2 2" />
              {/* Peach felt mitten paw body */}
              <path
                d="M 24 4 C 18 -2, 10 0, 6 6 C 2 11, 4 18, 10 20 C 16 22, 24 20, 24 16 Z"
                fill="#C98F70"
                stroke="#392F3B"
                strokeWidth="2"
              />
              {/* Mitten thumb gripping needle */}
              <path
                d="M 12 6 C 8 4, 3 8, 5 12 C 7 15, 12 14, 13 10 Z"
                fill="#C98F70"
                stroke="#392F3B"
                strokeWidth="1.8"
              />
              {/* White stitch thread mark on mitten */}
              <path d="M 14 12 Q 18 10 20 14" fill="none" stroke="#FFF8F1" strokeWidth="1.2" strokeDasharray="2 2" />
              {/* Polished brass needle: tip is positioned right at (0, 0)! */}
              <line x1="0" y1="0" x2="16" y2="8" stroke="#F7D560" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="0" y1="0" x2="8" y2="4" stroke="#FFF8F1" strokeWidth="1.2" strokeLinecap="round" />
              {/* Needle eye */}
              <ellipse cx="14" cy="7" rx="1.8" ry="1.2" fill="#392F3B" />
              {/* Thread looped through needle eye */}
              <path d="M 14 7 Q 18 10 24 6" fill="none" stroke="#E8C878" strokeWidth="1.5" />
            </g>
          )}

          {/* Duck Character Art: Planted firmly at the base of the trunk */}
          <g className="village-duck-anchor" transform="translate(0, 0)">
            {/* Duck Feet planted at the Trunk Seam anchor */}
            <path d="M 188 418 L 180 426 M 212 418 L 220 426" stroke="#D98A3C" strokeWidth="3.5" strokeLinecap="round" />
            {/* White felt duck body */}
            <ellipse cx="200" cy="385" rx="20" ry="18" fill="#FBF7EE" stroke="#392F3B" strokeWidth="2.5" />
            {/* Hand-sewn belly stitch */}
            <path d="M 195 385 Q 200 392 205 385" fill="none" stroke="#88A991" strokeWidth="1.5" strokeDasharray="2 2" />
            {/* Duck head */}
            <circle cx="200" cy="360" r="14" fill="#FBF7EE" stroke="#392F3B" strokeWidth="2.5" />
            {/* Button eye */}
            <ellipse cx="196" cy="358" rx="2" ry="3" fill="#392F3B" />
            <circle cx="197" cy="357" r="0.8" fill="#FFF8F1" />
            {/* Duck beak */}
            <path d="M 206 358 L 218 362 L 206 366 Z" fill="#D98A3C" stroke="#392F3B" strokeWidth="1.8" />
            {/* Mint knitted scarf */}
            <path d="M 190 372 Q 200 368 210 372 Q 208 382 200 379 Z" fill="#88A991" stroke="#392F3B" strokeWidth="1.5" />
          </g>

          {/* Celebratory golden sparkles when all 3 seams are complete */}
          {allCompleted && (
            <g className="celebration-sparkles" fill="#F7D560">
              <text x="60" y="190" fontSize="16">✦</text>
              <text x="195" y="240" fontSize="18">✧</text>
              <text x="280" y="50" fontSize="16">✦</text>
              <text x="120" y="45" fontSize="15">✧</text>
              <text x="200" y="360" fontSize="16">✦</text>
            </g>
          )}
        </svg>
      </div>

      {/* Accessible Keyboard & Touch Controls Bar */}
      <div className="stitch-actions-bar">
        {!allCompleted && (
          <button
            type="button"
            className="tactile-stitch-keyboard-btn"
            onClick={handleKeyboardAdvance}
            aria-label={`Advance stitch with keyboard [Enter / Space]: Connect point ${activePointProgress + 1} of ${currentSeam.points.length} on ${currentSeam.shortName}`}
          >
            <Keyboard size={18} aria-hidden="true" />
            <span>
              Stitch with Keyboard <strong>[Enter / Space]</strong>
            </span>
          </button>
        )}

        {!isCurrentSeamDone && activePointProgress > 0 && !allCompleted && (
          <button
            type="button"
            className="tactile-stitch-reset-btn"
            onClick={handleResetCurrentSeam}
            aria-label={`Re-thread ${currentSeam.shortName}`}
          >
            <RotateCcw size={16} aria-hidden="true" />
            <span>Re-thread Seam</span>
          </button>
        )}
      </div>

      {/* ARIA Live Region & Reaction Feedback Banner */}
      <div id={liveRegionId} className="game-reaction tactile-stitch-reaction" role="status" aria-live="polite">
        {allCompleted ? (
          <Sparkles size={20} className="reaction-icon" aria-hidden="true" />
        ) : (
          <CheckCircle2 size={20} className="reaction-icon" aria-hidden="true" />
        )}
        <div className="reaction-text">
          <p>
            <strong>
              {allCompleted
                ? 'All Three Seams Perfectly Imperfect!'
                : `${currentSeam.shortName} (${activePointProgress}/${currentSeam.points.length} points)`}
            </strong>
          </p>
          <p>
            {allCompleted
              ? 'The tree shadow is anchored to Duck’s feet, the left bough reaches out, and the crown rustles proudly. Morrow has saved Duck’s dream!'
              : lastCompletedReaction || feedbackMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TactileShadowStitcher;
