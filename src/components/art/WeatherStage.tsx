import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles, Film, RotateCcw } from 'lucide-react';
import { Morrow } from './Morrow';
import { SirClack, Pipkin } from './SupportingCast';
import { TactileWeatherLoom } from '../inventions/TactileWeatherLoom';
import { CinematicVideoPlayer } from '../CinematicVideoPlayer';

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
  actionPrompt: string;
}

const DIALOGUE_BEATS: DialogueBeat[] = [
  {
    speaker: 'frog',
    name: 'Frog Mayor',
    roleTag: 'UPSIDE-DOWN MAYOR',
    text: '“The rain is falling UP. My umbrella is now a bucket.”',
    cameraFocus: 'frog',
    actionPrompt: 'Frog Mayor taps his foot indignantly as raindrops rise into his umbrella',
  },
  {
    speaker: 'morrow',
    name: 'Morrow',
    roleTag: 'APPRENTICE STITCHLING',
    text: '“I can fix that!”',
    cameraFocus: 'morrow',
    actionPrompt: 'Morrow raises his brass needle toward the upside-down forest canopy',
  },
  {
    speaker: 'clack',
    name: 'Sir Clack',
    roleTag: 'GRUMPY MENTOR',
    text: '“Last time you said that, a duck became a forest.”',
    cameraFocus: 'clack',
    actionPrompt: 'Sir Clack snaps his brass clasps with deep mentor skepticism',
  },
  {
    speaker: 'pipkin',
    name: 'Pipkin',
    roleTag: 'SPECIAL EDITION',
    text: '“BREAKING NEWS: LOCAL CLOUD REFUSES GRAVITY.”',
    cameraFocus: 'pipkin',
    actionPrompt: 'Pipkin flutters upside-down against the rising drafts',
  },
];

/**
 * Animated Frog Mayor Character SVG with Umbrella Bucket & Warmth States
 */
const SceneFrogMayor: React.FC<{ isSpeaking?: boolean; isWarmed?: boolean }> = ({
  isSpeaking = false,
  isWarmed = false,
}) => (
  <svg
    viewBox="0 0 160 180"
    className={`scene-frog-mayor-art ${isSpeaking ? 'is-speaking' : ''} ${isWarmed ? 'is-warmed' : ''}`}
    role="img"
    aria-label="Frog Mayor with upside-down umbrella bucket"
  >
    <defs>
      <linearGradient id="frog-umbrella-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#88A991" />
        <stop offset="100%" stopColor="#4E6E57" />
      </linearGradient>
    </defs>

    {/* Contact Shadow on moss log */}
    <ellipse cx="80" cy="165" rx="36" ry="8" fill="#1a251c" opacity="0.3" />

    {/* Moss log base */}
    <path d="M 30 152 Q 80 142 130 152 L 125 168 Q 80 158 35 168 Z" fill="#5A4739" stroke="#392F3B" strokeWidth="2.5" />

    {/* Inverted Umbrella Bucket (held by Mayor's webbed hand) */}
    <g className="frog-umbrella-bucket" transform="translate(45, 30)">
      {/* Cane handle curved downward */}
      <path d="M 35 105 L 35 60 Q 35 48 24 48" fill="none" stroke="#63392A" strokeWidth="3.5" strokeLinecap="round" />
      {/* Upside-down leaf canopy acting as a bucket/bowl */}
      <path d="M 0 60 Q 35 105 70 60 Q 35 72 0 60 Z" fill="url(#frog-umbrella-grad)" stroke="#392F3B" strokeWidth="2.5" />
      {/* Water pool inside */}
      <path d="M 10 66 Q 35 84 60 66 Q 35 71 10 66 Z" fill="#B0D5EB" opacity="0.85" />
      <ellipse cx="35" cy="72" rx="12" ry="3" fill="#FFF8F1" opacity="0.6" />
    </g>

    {/* Plump felt frog body */}
    <ellipse cx="80" cy="120" rx="28" ry="24" fill="#88A991" stroke="#392F3B" strokeWidth="3" />
    {/* Cream buttercup waistcoat */}
    <path d="M 64 112 Q 80 140 96 112 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="1.8" />
    {/* Mayor gold medal */}
    <circle cx="80" cy="124" r="5.5" fill="#E8C878" stroke="#392F3B" strokeWidth="1.5" />
    <path d="M 76 116 L 80 124 L 84 116" stroke="#A34063" strokeWidth="1.5" fill="none" />

    {/* Big friendly frog eyes */}
    <circle cx="68" cy="95" r="10" fill="#88A991" stroke="#392F3B" strokeWidth="2.5" />
    <circle cx="68" cy="94" r="5" fill="#392F3B" />
    <circle cx="70" cy="92" r="1.8" fill="#FFF8F1" />
    <circle cx="92" cy="95" r="10" fill="#88A991" stroke="#392F3B" strokeWidth="2.5" />
    <circle cx="92" cy="94" r="5" fill="#392F3B" />
    <circle cx="94" cy="92" r="1.8" fill="#FFF8F1" />

    {/* Wire-rimmed spectacles */}
    <circle cx="68" cy="94" r="7.5" fill="none" stroke="#E8C878" strokeWidth="1.8" />
    <circle cx="92" cy="94" r="7.5" fill="none" stroke="#E8C878" strokeWidth="1.8" />
    <line x1="75.5" y1="94" x2="84.5" y2="94" stroke="#E8C878" strokeWidth="1.8" />

    {/* Bemused / Contented Smile */}
    {isWarmed ? (
      <>
        <path d="M 66 106 Q 80 116 94 106" fill="none" stroke="#392F3B" strokeWidth="2.5" strokeLinecap="round" />
        {/* Rosy warm cheeks */}
        <circle cx="58" cy="106" r="4.5" fill="#A34063" opacity="0.5" />
        <circle cx="102" cy="106" r="4.5" fill="#A34063" opacity="0.5" />
      </>
    ) : (
      <path d="M 68 108 Q 80 104 92 108" fill="none" stroke="#392F3B" strokeWidth="2.5" strokeLinecap="round" />
    )}
  </svg>
);

export const WeatherStage: React.FC<WeatherStageProps> = ({
  dialog = 0,
  puzzleDone = false,
  onPuzzleSuccess,
  onNextChapter,
  playChime = () => {},
}) => {
  // Current beat: 0..3 = dialogue, 4 = tactile weaving, 5 = celebration
  const [currentBeat, setCurrentBeat] = useState<number>(() => (puzzleDone ? 5 : Math.min(dialog, 3)));
  const [showCinematic, setShowCinematic] = useState<boolean>(false);
  const [solvedCount, setSolvedCount] = useState<number>(() => (puzzleDone ? 3 : 0));
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
    }
  }, []);

  // Synchronize incoming puzzleDone
  useEffect(() => {
    if (puzzleDone && currentBeat < 5) {
      setCurrentBeat(5);
      setSolvedCount(3);
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
      return 4; // Enter tactile weather loom
    });
  }, [playChime]);

  const handleWeaveComplete = useCallback(
    (_targetId: string) => {
      setSolvedCount((prev) => Math.min(prev + 1, 3));
      playChime();
    },
    [playChime]
  );

  const handleLoomSuccess = useCallback(() => {
    setSolvedCount(3);
    setCurrentBeat(5); // Enter celebration phase
    playChime();
    onPuzzleSuccess?.();
  }, [playChime, onPuzzleSuccess]);

  const activeBeatData = DIALOGUE_BEATS[Math.min(currentBeat, 3)];
  const isWeaving = currentBeat === 4;
  const isCelebrating = currentBeat >= 5 || puzzleDone;

  const cameraClass = isCelebrating
    ? 'camera-focus-frog'
    : isWeaving
    ? 'camera-focus-loom'
    : `camera-focus-${activeBeatData.cameraFocus}`;

  return (
    <div className="living-weather-forest-container">
      {/* Narrative Header */}
      <section className="storybook-reading living-scene-heading reveal-on-scroll" aria-label="Chapter 02 introduction">
        <p className="story-overline">CHAPTER 02 · A FORECAST OF ABSOLUTE NONSENSE</p>
        <h1>Upside-Down Forest</h1>
        <p className="living-scene-subtext">
          {isCelebrating
            ? 'The upside-down forest breathes in harmony. Three sky threads hold the weather in wonderful balance.'
            : isWeaving
            ? 'Weave the sky back to the earth: guide rain to the lilies, breeze to the windmill, and sun to Frog Mayor.'
            : 'Rain falls from the ground into the clouds. The frog is mayor and his umbrella is an involuntary soup bowl.'}
        </p>
      </section>

      {/* Persistent 2.5D Living Forest Scene */}
      <section
        className={`storybook-stage living-weather-scene ${isCelebrating ? 'is-celebrating is-solved' : ''}`}
        aria-label="Persistent 2.5D Living Scene of the Upside-Down Forest with Morrow, Sir Clack, Pipkin, and Frog Mayor"
      >
        {/* Parallax & Camera Attention Wrapper */}
        <div className={`living-scene-camera ${cameraClass}`} aria-hidden="true">
          {/* Layer 1: Forest Sky & Deep Green Mist */}
          <div className="living-forest-sky-layer">
            <span className="forest-sun-orb" />
            <div className="story-atmosphere">
              <i /><i /><i /><i /><i />
            </div>
          </div>

          {/* Layer 2: Inverted Canopy Trees (Hanging from top of sky!) */}
          <div className="living-inverted-canopy-layer">
            <svg viewBox="0 0 600 220" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="inverted-tree-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#314535" />
                  <stop offset="100%" stopColor="#4A6550" />
                </linearGradient>
              </defs>
              {/* Inverted Tree 1 */}
              <path d="M 60 0 L 85 120 L 35 120 Z" fill="url(#inverted-tree-grad)" />
              <path d="M 50 70 L 95 170 L 25 170 Z" fill="#2A3C2E" />
              <rect x="56" y="170" width="8" height="40" fill="#4A3427" />

              {/* Inverted Tree 2 (Mid-left) */}
              <path d="M 180 0 L 195 90 L 165 90 Z" fill="#3D5342" />
              <path d="M 170 55 L 205 135 L 155 135 Z" fill="#314535" />
              <rect x="178" y="135" width="5" height="30" fill="#5A4739" />

              {/* Inverted Tree 3 (Mid-right) */}
              <path d="M 440 0 L 465 110 L 415 110 Z" fill="url(#inverted-tree-grad)" />
              <path d="M 430 70 L 475 165 L 405 165 Z" fill="#2A3C2E" />
              <rect x="436" y="165" width="8" height="35" fill="#4A3427" />
            </svg>
          </div>

          {/* Layer 3: Moss Ground Floor */}
          <div className="living-forest-ground-layer">
            <svg viewBox="0 0 600 160" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              <path d="M -10 60 Q 150 20 320 50 T 610 30 L 610 160 L -10 160 Z" fill="#3D5341" />
              <ellipse cx="140" cy="90" rx="60" ry="16" fill="#4E6B53" />
              <ellipse cx="450" cy="85" rx="70" ry="18" fill="#4E6B53" />
            </svg>
          </div>

          {/* RISING RAINDROPS (Traveling upward from ground to sky) */}
          <div className={`living-rising-rain ${prefersReducedMotion ? 'reduced-motion-static' : 'rain-rising'}`}>
            {[
              { left: '12%', bottom: '25%', delay: '0s' },
              { left: '26%', bottom: '15%', delay: '0.4s' },
              { left: '42%', bottom: '20%', delay: '0.9s' },
              { left: '60%', bottom: '18%', delay: '0.2s' },
              { left: '74%', bottom: '24%', delay: '0.7s' },
              { left: '88%', bottom: '16%', delay: '1.1s' },
            ].map((drop, i) => (
              <span
                key={i}
                className="rising-raindrop"
                style={{
                  left: drop.left,
                  bottom: drop.bottom,
                  animationDelay: drop.delay,
                }}
              />
            ))}
          </div>
        </div>

        {/* Topbar Info Pill & Auto-Advance Toggle */}
        <div className="storybook-scene-label">
          <span>CHAPTER 02 · 03/06</span>
          <button
            type="button"
            className="auto-dialogue-toggle"
            onClick={() => setIsAutoPlay((v) => !v)}
            aria-pressed={isAutoPlay}
            style={{
              background: isAutoPlay ? 'var(--berry)' : 'rgba(255, 248, 241, 0.85)',
              color: isAutoPlay ? '#FFF8F1' : '#392F3B',
              border: '1.5px solid var(--line)',
              borderRadius: '12px',
              padding: '2px 8px',
              font: '700 0.65rem monospace',
              cursor: 'pointer',
            }}
          >
            {isAutoPlay ? 'Auto: ON' : 'Auto: OFF'}
          </button>
        </div>

        {/* IN-SCENE SPEECH BALLOON ANCHORED OVER ACTIVE SPEAKER */}
        {!isWeaving && (
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
                  onClick={() => setCurrentBeat(4)}
                  aria-label="Re-weave the weather loom"
                >
                  <RotateCcw size={14} /> Re-weave Sky
                </button>
              )}
            </div>
          </div>
        )}

        {/* PERSISTENT CHARACTERS ROW */}
        <div className="living-characters-row">
          {/* Left Character: Sir Clack with Pipkin */}
          <div
            className={`living-character living-clack-wrap ${
              !isWeaving && activeBeatData.speaker === 'clack' ? 'speaker-active' : ''
            }`}
            onClick={() => {
              if (currentBeat < 3) setCurrentBeat(2);
            }}
          >
            <SirClack />
          </div>

          {/* Center-Left Character: Pipkin (Perched on inverted twig above Sir Clack) */}
          <div
            className={`living-character living-weather-pipkin-wrap ${
              !isWeaving && activeBeatData.speaker === 'pipkin' ? 'speaker-active' : ''
            }`}
            onClick={() => {
              if (currentBeat < 3) setCurrentBeat(3);
            }}
            style={{
              position: 'absolute',
              bottom: '38%',
              left: 'clamp(24px, 7vw, 54px)',
              width: '60px',
              zIndex: 5,
              transform: activeBeatData.speaker === 'pipkin' ? 'scale(1.15) rotate(180deg)' : 'scale(1.0) rotate(180deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            {/* Small inverted twig that Pipkin grips */}
            <svg viewBox="0 0 40 20" style={{ position: 'absolute', top: -8, left: 10, width: 30, height: 15, pointerEvents: 'none' }}>
              <path d="M 0 5 Q 15 15 35 2" stroke="#5A4739" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
            <Pipkin />
          </div>

          {/* Center-Right Character: Frog Mayor on his Moss Log */}
          <div
            className={`living-character living-frog-wrap ${
              !isWeaving && activeBeatData.speaker === 'frog' ? 'speaker-active' : ''
            }`}
            onClick={() => {
              if (currentBeat < 3) setCurrentBeat(0);
            }}
          >
            <SceneFrogMayor
              isSpeaking={!isWeaving && activeBeatData.speaker === 'frog'}
              isWarmed={isCelebrating}
            />
          </div>

          {/* Right Character: Morrow with needle and spool tail */}
          <div
            className={`living-character living-morrow-wrap ${
              !isWeaving && activeBeatData.speaker === 'morrow' ? 'speaker-active' : ''
            }`}
            onClick={() => {
              if (currentBeat < 3) setCurrentBeat(1);
            }}
          >
            <Morrow
              small
              expression={isCelebrating ? 'happy' : isWeaving ? 'focused' : 'curious'}
            />
          </div>
        </div>

        {/* TACTILE WEATHER LOOM GAMEPLAY CANVAS (Active during Beat 4) */}
        {isWeaving && (
          <div
            className="living-scene-stitcher-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 8,
              background: 'rgba(26, 38, 28, 0.94)',
              backdropFilter: 'blur(4px)',
              padding: '16px 12px',
              overflowY: 'auto',
            }}
          >
            <TactileWeatherLoom
              onWeaveComplete={handleWeaveComplete}
              onSuccess={handleLoomSuccess}
              playChime={playChime}
              initialSolved={solvedCount === 3 ? ['flowers', 'windmill', 'frog'] : []}
            />
          </div>
        )}

        {/* INLINE CINEMATIC REVEAL MODAL */}
        {showCinematic && (
          <div
            className="living-cinematic-bridge-modal"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 12,
              background: '#1a251c',
            }}
          >
            <CinematicVideoPlayer
              src="/cinematics/weather-02-umbrella.mp4"
              poster="/cinematics/weather-02-umbrella-poster.jpg"
              title="Frog Mayor’s Umbrella Disaster"
              speaker="Frog Mayor"
              caption="“The rain is falling UP. My umbrella is now a bucket.”"
              onEnded={() => setShowCinematic(false)}
              ariaLabel="Frog Mayor stop-motion umbrella reveal video"
              fallbackStage={
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#FFF8F1' }}>
                  <SceneFrogMayor isSpeaking />
                  <p style={{ marginTop: '16px', font: '600 1rem/1.4 Nunito, sans-serif' }}>
                    “The rain is falling UP. My umbrella is now a bucket.”
                  </p>
                </div>
              }
            />
            <button
              type="button"
              className="balloon-action-btn balloon-next-btn"
              onClick={() => setShowCinematic(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 14,
              }}
            >
              Return to Scene ✕
            </button>
          </div>
        )}

        {/* Scene Bottom Indicator */}
        <div className="storybook-scene-bottom">
          <span>{isCelebrating ? '✦ The Sky Has Found Its Gravity ✦' : 'A Forecast of Absolute Nonsense'}</span>
          <span>✦</span>
        </div>
      </section>

      {/* Post-Puzzle Story Payoff & Chapter Transition Button */}
      {isCelebrating && (
        <section className="chapter-payoff-card living-scene-payoff-card is-revealed" aria-live="polite">
          <div className="payoff-badge">
            <Sparkles size={16} /> BEAT 06 PAYOFF: THREE SKY THREADS RESTORED
          </div>
          <p>
            <strong>The thirsty lilies drink</strong> as cool rain curves back down to earth. The windmill sails turn
            merrily to steady Pipkin’s courier flight, and radiant sunbeams warm Frog Mayor’s velvet coat.
          </p>
          <p className="payoff-reflection">
            <em>Pipkin’s Notebook:</em> “Local amphibian confirms that even the upside-down sky can be stitched together with enough patience.”
          </p>

          {/* Chapter Continue Button (Matches regression test selector /step into the next chapter/i) */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              type="button"
              className="storybook-action chapter-continue living-scene-next-btn"
              onClick={onNextChapter}
            >
              Step into the next chapter · Tomorrow Town <ArrowRight size={20} />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default WeatherStage;
