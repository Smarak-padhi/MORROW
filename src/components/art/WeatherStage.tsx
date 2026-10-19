import React, { useState, useEffect, useRef, useCallback, useId } from 'react';
import { ArrowRight, Film, RotateCcw, Keyboard, Droplets, Wind, Sun, Volume2, VolumeX } from 'lucide-react';
import { Morrow } from './Morrow';
import { SirClack, Pipkin } from './SupportingCast';
import { StopMotionActor } from './StopMotionActor';

export interface WeatherStageProps {
  dialog?: number;
  puzzleDone?: boolean;
  onPuzzleSuccess?: () => void;
  onNextChapter?: () => void;
  playChime?: () => void;
}

interface DialogueBeat {
  speaker: 'frog' | 'morrow' | 'clack' | 'pipkin';
  name: string;
  roleTag: string;
  text: string;
  cameraFocus: 'frog' | 'morrow' | 'clack' | 'pipkin';
}

const DIALOGUE_BEATS: DialogueBeat[] = [
  {
    speaker: 'frog',
    name: 'Frog Mayor',
    roleTag: 'UPSIDE-DOWN MAYOR',
    text: '“The rain is falling UP. My umbrella is now a bucket.”',
    cameraFocus: 'frog',
  },
  {
    speaker: 'morrow',
    name: 'Morrow',
    roleTag: 'APPRENTICE STITCHLING',
    text: '“I can fix that!”',
    cameraFocus: 'morrow',
  },
  {
    speaker: 'clack',
    name: 'Sir Clack',
    roleTag: 'GRUMPY MENTOR',
    text: '“Last time you said that, a duck became a forest.”',
    cameraFocus: 'clack',
  },
  {
    speaker: 'pipkin',
    name: 'Pipkin',
    roleTag: 'SPECIAL EDITION',
    text: '“BREAKING NEWS: LOCAL CLOUD REFUSES GRAVITY.”',
    cameraFocus: 'pipkin',
  },
];

export interface WeatherSpoolDef {
  id: 'rain' | 'wind' | 'sun';
  name: string;
  shortName: string;
  threadName: string;
  color: string;
  glowColor: string;
  targetId: 'flowers' | 'windmill' | 'frog';
  targetName: string;
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
    glowColor: 'rgba(92, 147, 214, 0.75)',
    targetId: 'flowers',
    targetName: 'Thirsty Lilies',
    clue: 'Guide the cool blue water thread downward to parched lily roots.',
    reaction: 'Frog Mayor: “My lilies! The water remembers gravity and falls onto their thirsty roots!”',
    points: [
      { x: 64, y: 220, label: 'Rain Spool' },
      { x: 135, y: 240, label: 'Loom Eyelet' },
      { x: 235, y: 295, label: 'Canopy Ring' },
      { x: 335, y: 375, label: 'Floor Guide' },
      { x: 435, y: 445, label: 'Thirsty Lilies' },
    ],
  },
  {
    id: 'wind',
    name: 'Whistling Breeze',
    shortName: 'Wind Spool',
    threadName: 'Spiral draft stitch',
    color: '#9E88BA',
    glowColor: 'rgba(158, 136, 186, 0.75)',
    targetId: 'windmill',
    targetName: 'Frozen Windmill',
    clue: 'Guide the lavender draft thread upward around the motionless windmill sails.',
    reaction: 'Pipkin: “EXTRA! EXTRA! The windmill sails are spinning and my wings have lift!”',
    points: [
      { x: 64, y: 305, label: 'Wind Spool' },
      { x: 145, y: 215, label: 'Loom Pulley' },
      { x: 265, y: 155, label: 'Breeze Eyelet' },
      { x: 375, y: 110, label: 'Rooftop Spindle' },
      { x: 475, y: 85, label: 'Windmill Hub' },
    ],
  },
  {
    id: 'sun',
    name: 'Golden Sunbeam',
    shortName: 'Sun Spool',
    threadName: 'Warm bright stitch',
    color: '#E8C878',
    glowColor: 'rgba(232, 200, 120, 0.85)',
    targetId: 'frog',
    targetName: 'Frog Mayor',
    clue: 'Weave warm golden sunlight through the damp inverted branches to the chilly mayor.',
    reaction: 'Frog Mayor: “Ahhh! Warm velvet coat at last! Toasty amphibians are happy amphibians!”',
    points: [
      { x: 64, y: 390, label: 'Sun Spool' },
      { x: 155, y: 360, label: 'Loom Comb' },
      { x: 205, y: 335, label: 'Canopy Aperture' },
      { x: 250, y: 330, label: 'Branch Arch' },
      { x: 295, y: 415, label: 'Frog Mayor' },
    ],
  },
];

const HIT_RADIUS = 38;

/**
 * Handcrafted Frog Mayor Character SVG with Inverted Umbrella Bucket & Warmth States
 */
export const SceneFrogMayor: React.FC<{ isSpeaking?: boolean; isWarmed?: boolean; className?: string }> = ({
  isSpeaking = false,
  isWarmed = false,
  className = '',
}) => (
  <svg
    viewBox="0 0 170 190"
    className={`scene-frog-mayor-art ${isSpeaking ? 'is-speaking' : ''} ${isWarmed ? 'is-warmed' : ''} ${className}`.trim()}
    role="img"
    aria-label="Frog Mayor with upside-down umbrella bucket"
  >
    <defs>
      <linearGradient id="frog-skin-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#88A991" />
        <stop offset="60%" stopColor="#70967A" />
        <stop offset="100%" stopColor="#4E6E57" />
      </linearGradient>
      <linearGradient id="frog-leaf-umbrella" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7FA88A" />
        <stop offset="50%" stopColor="#55755E" />
        <stop offset="100%" stopColor="#3A5342" />
      </linearGradient>
      <filter id="mayor-warm-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Contact shadow on moss log */}
    <ellipse cx="85" cy="172" rx="42" ry="9" fill="#1b251d" opacity="0.35" />

    {/* Weathered Moss Log */}
    <path
      d="M 25 158 Q 85 146 145 158 L 140 176 Q 85 164 30 176 Z"
      fill="#523F32"
      stroke="#392F3B"
      strokeWidth="2.5"
    />
    <path d="M 45 155 Q 65 148 85 153" stroke="#70967A" strokeWidth="3" fill="none" strokeLinecap="round" />

    {/* Inverted Leaf Umbrella Bucket (Held by Mayor's webbed hand) */}
    <g className="frog-umbrella-bucket" transform="translate(48, 32)">
      {/* Curved cane handle */}
      <path d="M 38 108 L 38 64 Q 38 48 24 48" fill="none" stroke="#68422A" strokeWidth="4" strokeLinecap="round" />
      {/* Inverted umbrella leaf bowl */}
      <path
        d="M -2 64 Q 38 112 78 64 Q 38 76 -2 64 Z"
        fill="url(#frog-leaf-umbrella)"
        stroke="#392F3B"
        strokeWidth="2.8"
      />
      {/* Sloshing pooled water inside */}
      <path d="M 8 70 Q 38 90 68 70 Q 38 76 8 70 Z" fill="#B0D5EB" opacity="0.9" />
      <ellipse cx="38" cy="76" rx="14" ry="3.5" fill="#FFF8F1" opacity="0.65" />
      <circle cx="38" cy="76" r="6" fill="none" stroke="#FFF8F1" strokeWidth="1" opacity="0.5" />
      <path d="M 68 70 Q 72 78 70 86" stroke="#B0D5EB" strokeWidth="1.8" fill="none" opacity="0.75" />
    </g>

    {/* Plump Felt Frog Body */}
    <ellipse cx="85" cy="124" rx="32" ry="26" fill="url(#frog-skin-grad)" stroke="#392F3B" strokeWidth="3.2" />

    {/* Plum Mayor Coat & Buttercup Waistcoat */}
    <path d="M 62 108 Q 85 146 108 108 L 102 136 Q 85 144 68 136 Z" fill="#7E2945" stroke="#392F3B" strokeWidth="2" />
    <path d="M 68 114 Q 85 142 102 114 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="1.8" />

    {/* Golden Mayoral Medallion */}
    <circle cx="85" cy="128" r="6.5" fill="#E8C878" stroke="#392F3B" strokeWidth="1.8" />
    <polygon points="85,123 87,127 91,127 88,129 89,133 85,131 81,133 82,129 79,127 83,127" fill="#F7D560" />
    <path d="M 80 118 L 85 128 L 90 118" stroke="#A34063" strokeWidth="1.6" fill="none" />

    {/* Big Expressive Frog Eyes */}
    <circle cx="71" cy="96" r="12" fill="url(#frog-skin-grad)" stroke="#392F3B" strokeWidth="2.8" />
    <circle cx="71" cy="95" r="6" fill="#392F3B" />
    <circle cx="73" cy="93" r="2.2" fill="#FFF8F1" />

    <circle cx="99" cy="96" r="12" fill="url(#frog-skin-grad)" stroke="#392F3B" strokeWidth="2.8" />
    <circle cx="99" cy="95" r="6" fill="#392F3B" />
    <circle cx="101" cy="93" r="2.2" fill="#FFF8F1" />

    {/* Polished Wire-Rimmed Spectacles */}
    <circle cx="71" cy="95" r="8.5" fill="none" stroke="#F7D560" strokeWidth="2.2" />
    <circle cx="99" cy="95" r="8.5" fill="none" stroke="#F7D560" strokeWidth="2.2" />
    <line x1="79.5" y1="95" x2="90.5" y2="95" stroke="#F7D560" strokeWidth="2.2" />

    {/* Mouth State: Warmed Smile vs Comical Grimace */}
    {isWarmed ? (
      <g filter="url(#mayor-warm-glow)">
        <path d="M 68 110 Q 85 122 102 110" fill="none" stroke="#392F3B" strokeWidth="2.8" strokeLinecap="round" />
        {/* Rosy warm cheeks */}
        <circle cx="58" cy="110" r="5.5" fill="#A34063" opacity="0.6" />
        <circle cx="112" cy="110" r="5.5" fill="#A34063" opacity="0.6" />
      </g>
    ) : (
      <path d="M 70 112 Q 85 106 100 112" fill="none" stroke="#392F3B" strokeWidth="2.8" strokeLinecap="round" />
    )}
  </svg>
);

/**
 * Full-Frame In-Engine Cinematic Reveal Modal (Frog Mayor's Umbrella Disaster)
 * Plays real Google Flow MP4 when present; otherwise renders authoritative in-engine stop-motion sequence.
 */
export const CinematicWeatherReveal: React.FC<{ onReturn: () => void }> = ({ onReturn }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
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
    <div className="living-cinematic-bridge-modal" role="dialog" aria-modal="true" aria-label="Frog Mayor Umbrella Disaster Reveal">
      <div className="cinematic-reveal-stage">
        {/* Real MP4 Video if available in public/cinematics/ */}
        <video
          ref={videoRef}
          src="/cinematics/weather-02-umbrella.mp4"
          className="cinematic-media-video"
          playsInline
          autoPlay
          muted={isMuted}
          loop
          onLoadedData={() => setVideoLoaded(true)}
          style={{ display: videoLoaded ? 'block' : 'none', width: '100%', height: '100%', objectFit: 'contain' }}
        />

        {/* 16:9 Full Frame Stop-Motion Animated Sequence (Authoritative In-Engine Fallback) */}
        {!videoLoaded && (
          <svg viewBox="0 0 640 360" className="cinematic-reveal-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="cinematic-vignette" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="#2A4030" />
                <stop offset="60%" stopColor="#18251B" />
                <stop offset="100%" stopColor="#0B120D" />
              </radialGradient>
              <linearGradient id="cloud-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#314D38" />
                <stop offset="100%" stopColor="#1C2E21" />
              </linearGradient>
            </defs>

            {/* Vignette Background */}
            <rect width="640" height="360" fill="url(#cinematic-vignette)" />

            {/* Inverted Rain Cloud at Top */}
            <g transform="translate(180, 20)">
              <ellipse cx="140" cy="40" rx="120" ry="35" fill="url(#cloud-grad)" />
              <circle cx="90" cy="45" r="30" fill="url(#cloud-grad)" />
              <circle cx="190" cy="45" r="32" fill="url(#cloud-grad)" />
              <path d="M 20 50 Q 140 75 260 50" stroke="#799F84" strokeWidth="2" fill="none" opacity="0.4" />
            </g>

            {/* Rising Rain Beads (Traveling upward into cloud) */}
            {isPlaying && (
              <g className="cinematic-rising-rain">
                {[
                  { x: 160, y: 310, d: '0s' },
                  { x: 230, y: 280, d: '0.4s' },
                  { x: 300, y: 320, d: '0.9s' },
                  { x: 370, y: 290, d: '0.2s' },
                  { x: 440, y: 315, d: '0.7s' },
                  { x: 500, y: 285, d: '1.1s' },
                ].map((r, i) => (
                  <rect
                    key={i}
                    x={r.x}
                    y={r.y}
                    width="3"
                    height="16"
                    rx="1.5"
                    fill="#B0D5EB"
                    className="rising-raindrop"
                    style={{ animationDelay: r.d }}
                  />
                ))}
              </g>
            )}

            {/* Central Character: Large Frog Mayor with Overflowing Umbrella Bucket */}
            <g transform="translate(235, 80)">
              <SceneFrogMayor isSpeaking />
            </g>

            {/* Graphic Novel Subtitle Banner */}
            <g transform="translate(60, 285)">
              <rect width="520" height="55" rx="12" fill="#FFF8F1" stroke="#392F3B" strokeWidth="2.5" />
              <text x="20" y="24" style={{ font: '800 11px Space Mono, monospace' }} fill="#A34063" letterSpacing="0.06em">
                FROG MAYOR · UPSIDE-DOWN FOREST DISASTER
              </text>
              <text x="20" y="44" style={{ font: '600 15px Nunito, sans-serif' }} fill="#392F3B">
                “The rain is falling UP. My umbrella is now a bucket.”
              </text>
            </g>
          </svg>
        )}

        {/* Floating Player Controls Bar */}
        <div className="comic-video-controls" role="toolbar" aria-label="Cinematic video controls">
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
            onClick={onReturn}
            style={{ marginLeft: 'auto' }}
          >
            Return to Scene ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export const WeatherStage: React.FC<WeatherStageProps> = ({
  dialog = 0,
  puzzleDone = false,
  onPuzzleSuccess,
  onNextChapter,
  playChime = () => {},
}) => {
  const [currentBeat, setCurrentBeat] = useState<number>(() => (puzzleDone ? 5 : Math.min(dialog, 3)));
  const [showCinematic, setShowCinematic] = useState<boolean>(false);
  const [solvedTargets, setSolvedTargets] = useState<string[]>(() =>
    puzzleDone ? ['flowers', 'windmill', 'frog'] : []
  );
  const [activeSpoolIndex, setActiveSpoolIndex] = useState<number>(0);
  const [activePointProgress, setActivePointProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
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

  // Reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  // Synchronize incoming puzzleDone
  useEffect(() => {
    if (puzzleDone && currentBeat < 5) {
      setCurrentBeat(5);
      setSolvedTargets(['flowers', 'windmill', 'frog']);
    }
  }, [puzzleDone, currentBeat]);

  // Optional auto-play dialogue progression
  useEffect(() => {
    if (!isAutoPlay || currentBeat >= 4 || showCinematic) return;

    const timer = setTimeout(() => {
      setCurrentBeat((prev) => (prev < 3 ? prev + 1 : 4));
    }, 4500);

    return () => clearTimeout(timer);
  }, [isAutoPlay, currentBeat, showCinematic]);

  const advanceBeat = useCallback(() => {
    playChime();
    setCurrentBeat((prev) => {
      if (prev < 3) return prev + 1;
      return 4; // Enter interactive in-world loom
    });
  }, [playChime]);

  // Client to SVG coordinates in 600x520 viewBox
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
        x: Math.max(0, Math.min(600, svgP.x)),
        y: Math.max(0, Math.min(520, svgP.y)),
      };
    } catch {
      const rect = svg.getBoundingClientRect();
      const scaleX = 600 / rect.width;
      const scaleY = 520 / rect.height;
      return {
        x: Math.max(0, Math.min(600, (clientX - rect.left) * scaleX)),
        y: Math.max(0, Math.min(520, (clientY - rect.top) * scaleY)),
      };
    }
  }, []);

  const advanceWeavePoint = useCallback(
    (spoolIdx: number, newPointCount: number) => {
      const spool = WEATHER_SPOOLS[spoolIdx];
      playChime();

      if (newPointCount >= spool.points.length) {
        setActivePointProgress(spool.points.length);
        setIsDragging(false);
        isDraggingRef.current = false;
        setPointerPos(null);

        if (!solvedTargetsRef.current.includes(spool.targetId)) {
          const nextSolved = [...solvedTargetsRef.current, spool.targetId];
          setSolvedTargets(nextSolved);

          if (nextSolved.length === WEATHER_SPOOLS.length) {
            setCurrentBeat(5); // Enter celebration payoff
            onPuzzleSuccess?.();
          } else {
            const nextUnsolved = WEATHER_SPOOLS.findIndex((s) => !nextSolved.includes(s.targetId));
            if (nextUnsolved !== -1) {
              setActiveSpoolIndex(nextUnsolved);
              setActivePointProgress(0);
            }
          }
        }
      } else {
        setActivePointProgress(newPointCount);
      }
    },
    [onPuzzleSuccess, playChime]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (currentBeat !== 4) return;
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
    [currentBeat, getSvgCoordinates, advanceWeavePoint]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (!isDraggingRef.current || currentBeat !== 4) return;
      const coords = getSvgCoordinates(e.clientX, e.clientY);
      if (!coords) return;
      setPointerPos(coords);

      const spoolIdx = activeSpoolRef.current;
      const spool = WEATHER_SPOOLS[spoolIdx];
      const currentProgress = activeProgressRef.current;
      if (currentProgress >= spool.points.length) return;

      const targetPt = spool.points[currentProgress];
      const dist = Math.hypot(coords.x - targetPt.x, coords.y - targetPt.y);

      if (dist <= HIT_RADIUS) {
        advanceWeavePoint(spoolIdx, currentProgress + 1);
      }
    },
    [currentBeat, getSvgCoordinates, advanceWeavePoint]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;
    setPointerPos(null);
  }, []);

  const handleKeyboardAdvance = useCallback(() => {
    if (currentBeat !== 4) return;
    const spoolIdx = activeSpoolIndex;
    const spool = WEATHER_SPOOLS[spoolIdx];
    if (solvedTargets.includes(spool.targetId)) return;
    advanceWeavePoint(spoolIdx, activePointProgress + 1);
  }, [currentBeat, activeSpoolIndex, activePointProgress, solvedTargets, advanceWeavePoint]);

  const activeBeatData = DIALOGUE_BEATS[Math.min(currentBeat, 3)];
  const isWeaving = currentBeat === 4;
  const isCelebrating = currentBeat >= 5 || puzzleDone;

  const isRainSolved = solvedTargets.includes('flowers');
  const isWindSolved = solvedTargets.includes('windmill');
  const isSunSolved = solvedTargets.includes('frog');
  const currentSpool = WEATHER_SPOOLS[activeSpoolIndex];

  const cameraClass = isCelebrating
    ? 'camera-focus-frog'
    : isWeaving
    ? 'camera-focus-loom'
    : `camera-focus-${activeBeatData.cameraFocus}`;

  const lastStitchedPoint =
    activePointProgress > 0 ? currentSpool.points[activePointProgress - 1] : null;

  return (
    <div className="living-weather-forest-container">
      {/* Compact Cinematic Storybook Header */}
      <section className="storybook-reading living-scene-heading reveal-on-scroll" aria-label="Chapter 02 introduction">
        <div>
          <p className="story-overline">CHAPTER 02 · A FORECAST OF ABSOLUTE NONSENSE</p>
          <h1>Upside-Down Forest</h1>
        </div>
        <div className="storybook-scene-label-pill">
          <span>03 / 06</span>
          <button
            type="button"
            className="auto-dialogue-toggle"
            onClick={() => setIsAutoPlay((v) => !v)}
            aria-pressed={isAutoPlay}
          >
            {isAutoPlay ? 'Auto: ON' : 'Auto: OFF'}
          </button>
        </div>
      </section>

      {/* Main Living 2.5D Forest Stage */}
      <section
        className={`storybook-stage living-weather-scene ${isCelebrating ? 'is-celebrating is-solved' : ''}`}
        aria-label="Persistent 2.5D Living Scene of the Upside-Down Forest with Morrow, Sir Clack, Pipkin, and Frog Mayor"
      >
        {/* Parallax & Camera Attention Wrapper */}
        <div className={`living-scene-camera ${cameraClass}`} aria-hidden="true">
          {/* Layer 1: Forest Sky Background */}
          <div className="living-forest-sky-layer" style={{ backgroundImage: 'url(/environments/forest-canopy.webp)', backgroundSize: 'cover', backgroundPosition: 'center top', opacity: 0.85 }}>
            <span className="forest-sun-orb" />
          </div>

          {/* Interactive Shared SVG Scene (Characters + Loom + Targets) */}
          <svg
            ref={svgRef}
            viewBox="0 0 600 520"
            className="living-forest-master-svg tactile-weather-svg"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="application"
            aria-label={`Interactive Upside-Down Forest Weather Scene with 3 spools. Solved ${solvedTargets.length} of 3.`}
            style={{ touchAction: 'none', width: '100%', height: '100%', display: 'block' }}
          >
            <defs>
              <linearGradient id="tree-wood-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#314D38" />
                <stop offset="100%" stopColor="#1E2F23" />
              </linearGradient>
              <linearGradient id="tree-branch-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5D8566" />
                <stop offset="100%" stopColor="#34543C" />
              </linearGradient>
              <linearGradient id="loom-brass-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F7D560" />
                <stop offset="50%" stopColor="#C89D3C" />
                <stop offset="100%" stopColor="#8A6720" />
              </linearGradient>
              <linearGradient id="moss-ground-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#435C48" />
                <stop offset="60%" stopColor="#2F4234" />
                <stop offset="100%" stopColor="#1C281F" />
              </linearGradient>
              <filter id="loom-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* INVERTED CANOPY TREES (Layered Hanging Trees with High-Contrast Foliage) */}
            <g className="living-inverted-canopy">
              {/* Inverted Tree 1 (Left above Loom & Pipkin) */}
              <path d="M 25 0 L 105 170 L 5 170 Z" fill="url(#tree-wood-grad)" stroke="#16251A" strokeWidth="2" />
              <path d="M 35 30 L 115 150 L 15 150 Z" fill="url(#tree-branch-grad)" opacity="0.85" />
              <rect x="52" y="170" width="10" height="36" rx="2" fill="#523F32" stroke="#392F3B" strokeWidth="1.5" />
              {/* Hanging Perch Branch for Pipkin */}
              <path d="M 57 195 Q 90 218 128 206" stroke="#523F32" strokeWidth="4" fill="none" strokeLinecap="round" />

              {/* Inverted Tree 2 (Center above Mayor) */}
              <path d="M 220 0 L 290 145 L 170 145 Z" fill="#28402F" stroke="#16251A" strokeWidth="2" />
              <path d="M 230 25 L 280 135 L 185 135 Z" fill="url(#tree-branch-grad)" opacity="0.75" />
              <rect x="228" y="145" width="8" height="28" rx="2" fill="#523F32" stroke="#392F3B" strokeWidth="1.5" />

              {/* Inverted Tree 3 (Right above Windmill & Morrow) */}
              <path d="M 430 0 L 520 180 L 370 180 Z" fill="url(#tree-wood-grad)" stroke="#16251A" strokeWidth="2" />
              <path d="M 445 35 L 510 160 L 395 160 Z" fill="url(#tree-branch-grad)" opacity="0.85" />
              <rect x="442" y="180" width="10" height="38" rx="2" fill="#523F32" stroke="#392F3B" strokeWidth="1.5" />

              {/* Inverted Pine Cones Dangling on Threads */}
              <g transform="translate(100, 150)">
                <line x1="0" y1="0" x2="0" y2="18" stroke="#E8C878" strokeWidth="1" strokeDasharray="2 2" />
                <ellipse cx="0" cy="22" rx="4.5" ry="6" fill="#68422A" stroke="#392F3B" strokeWidth="1" />
              </g>
              <g transform="translate(390, 155)">
                <line x1="0" y1="0" x2="0" y2="20" stroke="#E8C878" strokeWidth="1" strokeDasharray="2 2" />
                <ellipse cx="0" cy="24" rx="4.5" ry="6" fill="#68422A" stroke="#392F3B" strokeWidth="1" />
              </g>
            </g>

            {/* MOSS GROUND LAYER */}
            <path
              d="M 0 410 Q 150 380 300 395 T 600 390 L 600 520 L 0 520 Z"
              fill="url(#moss-ground-grad)"
              stroke="#1C281F"
              strokeWidth="2"
            />
            {/* Soft ground mounds */}
            <ellipse cx="140" cy="450" rx="70" ry="18" fill="#4E6B53" opacity="0.6" />
            <ellipse cx="460" cy="460" rx="85" ry="20" fill="#4E6B53" opacity="0.6" />

            {/* Decorative Fly Agaric Toadstools */}
            <g transform="translate(195, 455)">
              <rect x="-2" y="4" width="4" height="12" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1" />
              <path d="M -9 5 Q 0 -6 9 5 Z" fill="#A34063" stroke="#392F3B" strokeWidth="1.2" />
              <circle cx="-3" cy="2" r="1.2" fill="#FFF8F1" />
              <circle cx="3" cy="1" r="1.2" fill="#FFF8F1" />
            </g>
            <g transform="translate(370, 460)">
              <rect x="-2.5" y="5" width="5" height="14" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1" />
              <path d="M -11 6 Q 0 -8 11 6 Z" fill="#A34063" stroke="#392F3B" strokeWidth="1.2" />
              <circle cx="-4" cy="2" r="1.5" fill="#FFF8F1" />
              <circle cx="4" cy="1" r="1.5" fill="#FFF8F1" />
            </g>

            {/* Practical Miniature Lights & Forest Motes (Handcrafted Stop-Motion Atmosphere) */}
            <g className="forest-practical-lights" aria-hidden="true">
              {/* Hanging amber lantern on Tree 1 branch */}
              <g transform="translate(142, 204)" filter="url(#loom-glow)">
                <line x1="0" y1="0" x2="0" y2="10" stroke="#E8C878" strokeWidth="1.2" />
                <polygon points="-4,10 4,10 6,22 -6,22" fill="#3D2B1F" stroke="#E8C878" strokeWidth="1" />
                <circle cx="0" cy="16" r="3.5" fill="#F7D560" opacity="0.9" />
              </g>

              {/* Hanging lantern on right tree */}
              <g transform="translate(425, 210)" filter="url(#loom-glow)">
                <line x1="0" y1="0" x2="0" y2="12" stroke="#E8C878" strokeWidth="1.2" />
                <polygon points="-4,12 4,12 5,22 -5,22" fill="#3D2B1F" stroke="#E8C878" strokeWidth="1" />
                <circle cx="0" cy="17" r="3.2" fill="#F7D560" opacity="0.85" />
              </g>

              {/* Bioluminescent moss lichen */}
              <ellipse cx="280" cy="435" rx="14" ry="4" fill="#70967A" opacity="0.6" filter="url(#loom-glow)" />
              <ellipse cx="330" cy="442" rx="12" ry="3.5" fill="#70967A" opacity="0.5" filter="url(#loom-glow)" />

              {/* Ambient glowing spore motes */}
              <circle cx="170" cy="320" r="1.8" fill="#F7D560" opacity="0.7" />
              <circle cx="310" cy="250" r="1.5" fill="#FFF8F1" opacity="0.65" />
              <circle cx="485" cy="305" r="2.0" fill="#F7D560" opacity="0.75" />
              <circle cx="260" cy="450" r="1.6" fill="#B0D5EB" opacity="0.6" />
            </g>

            {/* TARGET 2: FROZEN / SPINNING WINDMILL (Upper Right Canopy, x=475, y=85) */}
            <g className={`forest-target windmill-target ${isWindSolved ? 'is-spinning' : ''}`} transform="translate(475, 85)">
              {/* Wooden Inverted Mill Tower */}
              <polygon points="-16,-60 16,-60 22,0 -22,0" fill="#523F32" stroke="#392F3B" strokeWidth="2.5" />
              <rect x="-10" y="-45" width="20" height="24" rx="2" fill="#32241B" stroke="#392F3B" strokeWidth="1.5" />
              <line x1="-16" y1="-25" x2="16" y2="-25" stroke="#E8C878" strokeWidth="1.5" />
              {/* Brass Hub */}
              <circle cx="0" cy="0" r="8" fill="#F7D560" stroke="#392F3B" strokeWidth="2" />

              {/* 4 Windmill Lattice Sails */}
              <g className={`windmill-blades ${isWindSolved ? 'spinning-blades' : ''}`}>
                <g transform="rotate(0)">
                  <rect x="-4" y="-50" width="8" height="44" rx="2" fill="#F5E6CA" stroke="#392F3B" strokeWidth="1.5" />
                  <line x1="0" y1="-50" x2="0" y2="-6" stroke="#392F3B" strokeWidth="1" strokeDasharray="3 3" />
                </g>
                <g transform="rotate(90)">
                  <rect x="-4" y="-50" width="8" height="44" rx="2" fill="#F5E6CA" stroke="#392F3B" strokeWidth="1.5" />
                  <line x1="0" y1="-50" x2="0" y2="-6" stroke="#392F3B" strokeWidth="1" strokeDasharray="3 3" />
                </g>
                <g transform="rotate(180)">
                  <rect x="-4" y="-50" width="8" height="44" rx="2" fill="#F5E6CA" stroke="#392F3B" strokeWidth="1.5" />
                  <line x1="0" y1="-50" x2="0" y2="-6" stroke="#392F3B" strokeWidth="1" strokeDasharray="3 3" />
                </g>
                <g transform="rotate(270)">
                  <rect x="-4" y="-50" width="8" height="44" rx="2" fill="#F5E6CA" stroke="#392F3B" strokeWidth="1.5" />
                  <line x1="0" y1="-50" x2="0" y2="-6" stroke="#392F3B" strokeWidth="1" strokeDasharray="3 3" />
                </g>
                <circle cx="0" cy="0" r="4" fill="#F7D560" stroke="#392F3B" strokeWidth="1" />
              </g>

              {/* Swirling Wind Gusts when Solved */}
              {isWindSolved && (
                <g className="breeze-swirls" stroke="#FFF8F1" strokeWidth="1.8" fill="none" opacity="0.85">
                  <path d="M -32 -22 Q -45 -45 -22 -45 Q 0 -45 -5 -28" strokeDasharray="4 3" />
                  <path d="M 32 22 Q 45 45 22 45 Q 0 45 5 28" strokeDasharray="4 3" />
                </g>
              )}
            </g>

            {/* TARGET 1: THIRSTY / BLOOMING LILIES (Bottom-Right, x=435, y=445) */}
            <g className={`forest-target lilies-target ${isRainSolved ? 'is-blooming' : ''}`} transform="translate(435, 445)">
              {/* Pond Stones Base */}
              <ellipse cx="0" cy="10" rx="38" ry="12" fill="#253527" stroke="#392F3B" strokeWidth="2.2" />

              {/* Water ripples if Rain is solved */}
              {isRainSolved && (
                <g className="water-ripples">
                  <ellipse cx="0" cy="10" rx="44" ry="15" fill="none" stroke="#5C93D6" strokeWidth="1.8" opacity="0.8" />
                  <ellipse cx="0" cy="10" rx="26" ry="9" fill="none" stroke="#B0D5EB" strokeWidth="1.4" opacity="0.9" />
                </g>
              )}

              {/* Lily Pads */}
              <ellipse cx="-16" cy="8" rx="15" ry="6.5" fill="#4E6E57" stroke="#392F3B" strokeWidth="1.6" />
              <ellipse cx="16" cy="9" rx="16" ry="6.5" fill="#4E6E57" stroke="#392F3B" strokeWidth="1.6" />

              {/* Lily Flowers (Closed buds vs Blooming) */}
              {isRainSolved ? (
                <g className="blooming-water-lilies" filter="url(#loom-glow)">
                  <path d="M 0 0 C -14 -18, -4 -26, 0 -10 C 4 -26, 14 -18, 0 0 Z" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.6" />
                  <circle cx="0" cy="-8" r="4" fill="#F7D560" />
                  <path d="M -15 2 C -24 -11, -15 -18, -11 -5 Z" fill="#F4B8C8" stroke="#392F3B" strokeWidth="1.4" />
                  <path d="M 15 2 C 24 -11, 15 -18, 11 -5 Z" fill="#F4B8C8" stroke="#392F3B" strokeWidth="1.4" />
                </g>
              ) : (
                <g className="closed-buds" opacity="0.85">
                  <ellipse cx="0" cy="3" rx="7" ry="10" fill="#7FA88A" stroke="#392F3B" strokeWidth="1.8" />
                  <line x1="0" y1="-7" x2="0" y2="11" stroke="#392F3B" strokeWidth="1.6" />
                </g>
              )}
            </g>

            {/* TARGET 3: SUNBEAMS ON FROG MAYOR (Center, x=295, y=415) */}
            {isSunSolved && (
              <g className="mayor-sunbeams" filter="url(#loom-glow)" opacity="0.5">
                <polygon points="295,0 230,440 360,440" fill="url(#loom-brass-grad)" />
                <line x1="295" y1="0" x2="250" y2="440" stroke="#FFF8F1" strokeWidth="1.8" strokeDasharray="6 4" opacity="0.85" />
                <line x1="295" y1="0" x2="340" y2="440" stroke="#FFF8F1" strokeWidth="1.8" strokeDasharray="6 4" opacity="0.85" />
              </g>
            )}

            {/* RISING RAINDROPS (Traveling upward from moss to sky when rain unsolved) */}
            {!isRainSolved && !prefersReducedMotion && (
              <g className="living-rising-rain">
                {[
                  { x: 170, y: 390, d: '0s' },
                  { x: 250, y: 360, d: '0.4s' },
                  { x: 330, y: 380, d: '0.8s' },
                  { x: 410, y: 370, d: '0.2s' },
                  { x: 500, y: 390, d: '0.6s' },
                ].map((drop, i) => (
                  <rect
                    key={i}
                    x={drop.x}
                    y={drop.y}
                    width="2.5"
                    height="12"
                    rx="1.2"
                    fill="#B0D5EB"
                    className="rising-raindrop"
                    style={{ animationDelay: drop.d }}
                  />
                ))}
              </g>
            )}

            {/* CARVED BRASS WEATHER LOOM (In-World Object on Left, x=24..104, y=175..450) */}
            <g className="in-world-brass-loom">
              {/* Wooden plinth base */}
              <rect x="20" y="440" width="88" height="16" rx="4" fill="#3D2B1F" stroke="#392F3B" strokeWidth="2.5" />
              {/* Vertical Carved Brass Uprights */}
              <rect x="30" y="175" width="12" height="268" rx="3" fill="url(#loom-brass-grad)" stroke="#392F3B" strokeWidth="2.5" />
              <rect x="88" y="175" width="10" height="268" rx="2.5" fill="url(#loom-brass-grad)" stroke="#392F3B" strokeWidth="2" />
              {/* Horizontal Crossbars with acorn finials */}
              <line x1="24" y1="185" x2="104" y2="185" stroke="#F7D560" strokeWidth="5" strokeLinecap="round" />
              <circle cx="24" cy="185" r="4.5" fill="#F7D560" stroke="#392F3B" strokeWidth="1.2" />
              <circle cx="104" cy="185" r="4.5" fill="#F7D560" stroke="#392F3B" strokeWidth="1.2" />
              <line x1="24" y1="435" x2="104" y2="435" stroke="#F7D560" strokeWidth="5" strokeLinecap="round" />

              {/* Physical Spool 1: Rain (64, 220) */}
              <g
                className={`loom-spool-interactive ${activeSpoolIndex === 0 ? 'is-selected' : ''}`}
                onClick={() => {
                  setActiveSpoolIndex(0);
                  setActivePointProgress(isRainSolved ? 5 : 0);
                }}
                transform="translate(64, 220)"
              >
                <rect x="-18" y="-14" width="36" height="28" rx="4" fill="#5C93D6" stroke="#392F3B" strokeWidth="2.2" />
                <line x1="-14" y1="-8" x2="14" y2="8" stroke="#FFF8F1" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="0" cy="0" r="4.5" fill="#F7D560" stroke="#392F3B" strokeWidth="1.5" />
                {isRainSolved && <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#FFF8F1" fontWeight="bold">✓</text>}
              </g>

              {/* Physical Spool 2: Wind (64, 305) */}
              <g
                className={`loom-spool-interactive ${activeSpoolIndex === 1 ? 'is-selected' : ''}`}
                onClick={() => {
                  setActiveSpoolIndex(1);
                  setActivePointProgress(isWindSolved ? 5 : 0);
                }}
                transform="translate(64, 305)"
              >
                <rect x="-18" y="-14" width="36" height="28" rx="4" fill="#9E88BA" stroke="#392F3B" strokeWidth="2.2" />
                <path d="M -12 -5 Q 0 8 12 -5" fill="none" stroke="#FFF8F1" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="0" cy="0" r="4.5" fill="#F7D560" stroke="#392F3B" strokeWidth="1.5" />
                {isWindSolved && <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#FFF8F1" fontWeight="bold">✓</text>}
              </g>

              {/* Physical Spool 3: Sun (64, 390) */}
              <g
                className={`loom-spool-interactive ${activeSpoolIndex === 2 ? 'is-selected' : ''}`}
                onClick={() => {
                  setActiveSpoolIndex(2);
                  setActivePointProgress(isSunSolved ? 5 : 0);
                }}
                transform="translate(64, 390)"
              >
                <rect x="-18" y="-14" width="36" height="28" rx="4" fill="#E8C878" stroke="#392F3B" strokeWidth="2.2" />
                <circle cx="0" cy="0" r="7" fill="none" stroke="#FFF8F1" strokeWidth="1.5" strokeDasharray="2 2" />
                <circle cx="0" cy="0" r="4.5" fill="#F7D560" stroke="#392F3B" strokeWidth="1.5" />
                {isSunSolved && <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#FFF8F1" fontWeight="bold">✓</text>}
              </g>
            </g>

            {/* RENDER WOVEN THREAD PATHS */}
            {WEATHER_SPOOLS.map((spool, sIdx) => {
              const isDone = solvedTargets.includes(spool.targetId);
              const isActive = activeSpoolIndex === sIdx;
              const progress = isActive ? activePointProgress : isDone ? spool.points.length : 0;
              if (progress <= 1 && !isDone) return null;

              const connectedPoints = spool.points.slice(0, progress);
              const pathD = connectedPoints.reduce(
                (acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
                ''
              );

              return (
                <g key={`woven-${spool.id}`} className="woven-thread-path">
                  <path
                    d={pathD}
                    fill="none"
                    stroke={spool.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: `drop-shadow(0 0 6px ${spool.glowColor})` }}
                  />
                  {/* Decorative blanket cross-stitches */}
                  {connectedPoints.map((pt, pIdx) => (
                    <circle key={`knot-${pIdx}`} cx={pt.x} cy={pt.y} r="4" fill="#F7D560" stroke="#392F3B" strokeWidth="1.2" />
                  ))}
                </g>
              );
            })}

            {/* LIVE DRAGGING THREAD FROM LAST PIN TO CURSOR */}
            {isDragging && pointerPos && lastStitchedPoint && (
              <g className="live-drag-thread" aria-hidden="true">
                <path
                  d={`M ${lastStitchedPoint.x} ${lastStitchedPoint.y} Q ${(lastStitchedPoint.x + pointerPos.x) / 2} ${
                    (lastStitchedPoint.y + pointerPos.y) / 2 - 14
                  } ${pointerPos.x} ${pointerPos.y}`}
                  fill="none"
                  stroke={currentSpool.color}
                  strokeWidth="3.5"
                  strokeDasharray="4 2"
                  style={{ filter: `drop-shadow(0 0 8px ${currentSpool.glowColor})` }}
                />
              </g>
            )}

            {/* GUIDE EYELETS FOR ACTIVE OR WEAVING OBJECTIVE */}
            {isWeaving && !solvedTargets.includes(currentSpool.targetId) && (
              <g className="loom-guide-eyelets">
                {currentSpool.points.map((pt, pIdx) => {
                  const isStitched = pIdx < activePointProgress;
                  const isNextTarget = pIdx === activePointProgress;

                  return (
                    <g key={`guide-${pIdx}`} transform={`translate(${pt.x}, ${pt.y})`}>
                      <circle r={HIT_RADIUS} fill="transparent" style={{ cursor: isNextTarget ? 'pointer' : 'default' }} />
                      <circle
                        className={isNextTarget ? 'target-beacon-pulse' : undefined}
                        r={isNextTarget ? 13 : 8.5}
                        fill="#1C281F"
                        stroke={isStitched ? currentSpool.color : isNextTarget ? '#F7D560' : 'rgba(232, 200, 120, 0.45)'}
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
                <line x1="0" y1="0" x2="16" y2="8" stroke="#F7D560" strokeWidth="2.8" strokeLinecap="round" />
                <line x1="0" y1="0" x2="8" y2="4" stroke="#FFF8F1" strokeWidth="1.3" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>

        {/* CHARACTER LAYER OVERLAY (StopMotionActor System with Tactile Stepped Animations) */}
        <div className="living-characters-row" aria-hidden="true">
          {/* Sir Clack on left beside the loom */}
          <div
            className={`living-character living-clack-wrap ${
              !isWeaving && activeBeatData.speaker === 'clack' ? 'speaker-active' : ''
            }`}
            onClick={() => {
              if (currentBeat < 3) setCurrentBeat(2);
            }}
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '19%',
              width: '18%',
              zIndex: 4,
            }}
          >
            <StopMotionActor
              character="clack"
              state={isCelebrating ? 'happy' : activeBeatData.speaker === 'clack' ? 'talking' : 'idle'}
              isSpeaking={!isWeaving && activeBeatData.speaker === 'clack'}
              fallbackSvg={<SirClack />}
              alt="Sir Clack the Antique Toolbox Mentor"
            />
          </div>

          {/* Pipkin perched upside-down above Sir Clack */}
          <div
            className={`living-character living-weather-pipkin-wrap ${
              !isWeaving && activeBeatData.speaker === 'pipkin' ? 'speaker-active' : ''
            }`}
            onClick={() => {
              if (currentBeat < 3) setCurrentBeat(3);
            }}
            style={{
              position: 'absolute',
              bottom: '48%',
              left: '18%',
              width: '13%',
              zIndex: 5,
              transform: activeBeatData.speaker === 'pipkin' ? 'scale(1.15) rotate(180deg)' : 'scale(1.0) rotate(180deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <StopMotionActor
              character="pipkin"
              state={isCelebrating ? 'happy' : 'surprised'}
              isSpeaking={!isWeaving && activeBeatData.speaker === 'pipkin'}
              fallbackSvg={<Pipkin />}
              alt="Pipkin the Delivery Bird"
            />
          </div>

          {/* Frog Mayor on Moss Log in center */}
          <div
            className={`living-character living-frog-wrap ${
              !isWeaving && activeBeatData.speaker === 'frog' ? 'speaker-active' : ''
            }`}
            onClick={() => {
              if (currentBeat < 3) setCurrentBeat(0);
            }}
            style={{
              position: 'absolute',
              bottom: '9%',
              left: '37%',
              width: '26%',
              zIndex: 4,
            }}
          >
            <StopMotionActor
              character="frog"
              state={isCelebrating || isSunSolved ? 'happy' : 'talking'}
              isSpeaking={!isWeaving && activeBeatData.speaker === 'frog'}
              fallbackSvg={
                <SceneFrogMayor
                  isSpeaking={!isWeaving && activeBeatData.speaker === 'frog'}
                  isWarmed={isSunSolved}
                />
              }
              alt="Frog Mayor of Upside-Down Forest"
            />
          </div>

          {/* Morrow on right with brass needle */}
          <div
            className={`living-character living-morrow-wrap ${
              !isWeaving && activeBeatData.speaker === 'morrow' ? 'speaker-active' : ''
            }`}
            onClick={() => {
              if (currentBeat < 3) setCurrentBeat(1);
            }}
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '2%',
              width: '24%',
              zIndex: 4,
            }}
          >
            <StopMotionActor
              character="morrow"
              state={isCelebrating ? 'happy' : isWeaving ? 'action' : 'idle'}
              isSpeaking={!isWeaving && activeBeatData.speaker === 'morrow'}
              isAction={isDragging}
              fallbackSvg={
                <Morrow
                  expression={isCelebrating ? 'happy' : isWeaving ? 'focused' : 'curious'}
                />
              }
              alt="Morrow the Apprentice Stitchling"
            />
          </div>
        </div>

        {/* IN-SCENE SPEECH BALLOON (Beats 0-3 and Beat 5; Hidden during Weaving & Cinematic) */}
        {!isWeaving && !showCinematic && (
          <div
            className={`scene-speech-balloon speaker-${isCelebrating ? 'frog' : activeBeatData.speaker}`}
            role="region"
            aria-live="polite"
          >
            <div className="balloon-tag-row">
              <span className="balloon-speaker-badge">
                {isCelebrating ? 'FROG MAYOR' : activeBeatData.name}
              </span>
              <span className="balloon-role-tag">
                {isCelebrating ? 'CELEBRATION PAYOFF' : activeBeatData.roleTag}
              </span>
            </div>
            <p className="speech-balloon-text">
              {isCelebrating
                ? '“Congratulations! You invented very wet, wonderfully warm furniture! The lilies are sipping downward and my velvet coat is toasty!”'
                : activeBeatData.text}
            </p>
            <div className="balloon-footer-actions">
              {!isCelebrating ? (
                <>
                  <button
                    type="button"
                    className="balloon-action-btn balloon-next-btn"
                    onClick={advanceBeat}
                    aria-label={currentBeat < 3 ? 'Turn the page to next dialogue beat' : 'Turn the page · Weave the sky on the weather loom'}
                  >
                    {currentBeat < 3 ? 'Turn the page ▾' : 'Turn the page · Weave the sky ➔'}
                  </button>
                  <button
                    type="button"
                    className="balloon-action-btn balloon-video-btn"
                    onClick={() => setShowCinematic(true)}
                    aria-label="Watch Frog Mayor umbrella disaster reveal film"
                  >
                    <Film size={14} /> Reveal Film
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="balloon-action-btn balloon-video-btn"
                  onClick={() => {
                    setCurrentBeat(4);
                    setSolvedTargets([]);
                    setActivePointProgress(0);
                  }}
                  aria-label="Re-weave the weather loom"
                >
                  <RotateCcw size={14} /> Re-weave loom
                </button>
              )}
            </div>
          </div>
        )}

        {/* COMPACT CONTEXTUAL GUIDANCE PILL (Beat 4 Weaving Mode) */}
        {isWeaving && (
          <div className="forest-guidance-pill" role="status" aria-live="polite">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: currentSpool.color, fontSize: '1.1rem' }}>✦</span>
              Drag <strong>{currentSpool.name}</strong> to {currentSpool.targetName}
            </span>
            <span style={{ fontSize: '0.75rem', opacity: 0.85, fontFamily: 'Space Mono, monospace' }}>
              Guide {activePointProgress + 1}/5
            </span>
          </div>
        )}

        {/* IN-ENGINE CINEMATIC REVEAL MODAL */}
        {showCinematic && <CinematicWeatherReveal onReturn={() => setShowCinematic(false)} />}
      </section>

      {/* COMPACT CELEBRATION CONTINUATION BUTTON (Directly Below Stage) */}
      {isCelebrating && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button
            type="button"
            className="storybook-action chapter-continue living-scene-next-btn"
            onClick={onNextChapter}
            aria-label="Step into the next chapter · Tomorrow Town"
          >
            Step into the next chapter · Tomorrow Town <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* ACCESSIBLE ALTERNATIVE WEAVING DRAWER (Keyboard & Screen Readers) */}
      <details className="accessible-loom-drawer" open role="region" aria-label="Alternative accessible loom controls" id={liveRegionId}>
        <summary>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Keyboard size={15} aria-hidden="true" />
            <span>Accessible Controls & Spool Selectors</span>
          </span>
          <span style={{ fontSize: '0.72rem', opacity: 0.8, fontFamily: 'Space Mono, monospace' }}>
            [Enter / Space]
          </span>
        </summary>
        <div className="accessible-loom-controls">
          {/* Keyboard advance helper */}
          <div className="accessible-keyboard-bar">
            <button
              type="button"
              className="tactile-stitch-keyboard-btn"
              onClick={handleKeyboardAdvance}
              aria-label={`Advance thread with keyboard [Enter / Space]: Connect guide ${activePointProgress + 1} of 5 on ${currentSpool.shortName}`}
            >
              <Keyboard size={16} aria-hidden="true" />
              <span>
                Weave with Keyboard <strong>[Enter / Space]</strong>
              </span>
            </button>
          </div>

          {/* Accessible resident buttons for mobile-qa.mjs and assistive technology */}
          <div className="tactile-resident-inspectors loom-resident-inspectors" role="group" aria-label="Select thread and target destination">
            {WEATHER_SPOOLS.map((spool, idx) => {
              const isDone = solvedTargets.includes(spool.targetId);
              const isSelected = activeSpoolIndex === idx;

              return (
                <div key={spool.id} className="resident-inspect-pair">
                  {/* Spool Button (/gentle downpour/i, /whistling breeze/i, /golden sunbeam/i) */}
                  <button
                    type="button"
                    className={`resident-inspect-btn ${isSelected ? 'active' : ''} ${isDone ? 'repaired' : ''}`}
                    onClick={() => {
                      setActiveSpoolIndex(idx);
                      setActivePointProgress(isDone ? spool.points.length : 0);
                    }}
                    aria-label={`${spool.name} thread spool`}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {spool.id === 'rain' ? <Droplets size={12} /> : spool.id === 'wind' ? <Wind size={12} /> : <Sun size={12} />}
                      {spool.name}
                    </span>
                    <small>{isDone ? '✓ Anchored' : spool.threadName}</small>
                  </button>

                  {/* Target Button (/thirsty lilies/i, /frozen windmill/i, /frog mayor/i) */}
                  <button
                    type="button"
                    className={`shadow-inspect-btn ${isSelected ? 'active' : ''} ${isDone ? 'repaired' : ''}`}
                    onClick={() => {
                      advanceWeavePoint(idx, spool.points.length);
                    }}
                    aria-label={`${spool.targetName} target destination`}
                  >
                    <span>{spool.targetName}</span>
                    <small>{isDone ? '✓ Weave Sealed' : 'Weave Target'}</small>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </details>
    </div>
  );
};

export default WeatherStage;
