import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles, Film, RotateCcw } from 'lucide-react';
import { Morrow } from './Morrow';
import { SirClack, Pipkin } from './SupportingCast';
import { StopMotionActor } from './StopMotionActor';
import { TactileShadowStitcher } from '../inventions/TactileShadowStitcher';
import { CinematicVideoPlayer } from '../CinematicVideoPlayer';

export interface ShadowStageProps {
  dialog?: number;
  puzzleDone?: boolean;
  onPuzzleSuccess?: () => void;
  onNextChapter?: () => void;
  playChime?: () => void;
}

interface DialogueBeat {
  speaker: 'duck' | 'clack' | 'pipkin' | 'morrow';
  name: string;
  roleTag: string;
  text: string;
  cameraFocus: 'duck' | 'clack' | 'pipkin' | 'morrow';
  actionPrompt: string;
}

const DIALOGUE_BEATS: DialogueBeat[] = [
  {
    speaker: 'duck',
    name: 'Village Duck',
    roleTag: 'VILLAGE RESIDENT',
    text: '“My shadow has been confiscated. Apparently I am too duck-shaped.”',
    cameraFocus: 'duck',
    actionPrompt: 'Duck gestures indignantly at his planted feet',
  },
  {
    speaker: 'clack',
    name: 'Sir Clack',
    roleTag: 'GRUMPY MENTOR',
    text: '“That is not how ducks work. An ambitious duck indeed.”',
    cameraFocus: 'clack',
    actionPrompt: 'Sir Clack snaps his brass latches with a dry click',
  },
  {
    speaker: 'pipkin',
    name: 'Pipkin',
    roleTag: 'SPECIAL EDITION',
    text: '“BREAKING NEWS: LOCAL WATERFOWL BECOMES ENTIRE ARBORETUM!”',
    cameraFocus: 'pipkin',
    actionPrompt: 'Pipkin flutters frantically on Sir Clack’s handle',
  },
  {
    speaker: 'morrow',
    name: 'Morrow',
    roleTag: 'APPRENTICE STITCHLING',
    text: '“Do not worry! I have a point—it is a needle! Let us mend the three damaged seams.”',
    cameraFocus: 'morrow',
    actionPrompt: 'Morrow raises his golden needle, studying the torn oak shadow',
  },
];

/**
 * Animated Village Duck SVG with wing-flap celebratory states
 */
const SceneDuck: React.FC<{ isSpeaking?: boolean; isCelebrating?: boolean }> = ({
  isSpeaking = false,
  isCelebrating = false,
}) => (
  <svg
    viewBox="0 0 160 180"
    className={`scene-duck-art ${isSpeaking ? 'is-speaking' : ''} ${isCelebrating ? 'is-celebrating' : ''}`}
    role="img"
    aria-label="Village Duck with mint knitted scarf"
  >
    {/* Ground contact shadow */}
    <ellipse cx="80" cy="168" rx="28" ry="6" fill="#1a1420" opacity="0.35" />

    {/* Webbed orange feet planted on the cobblestones */}
    <path d="M 66 152 L 58 168 M 94 152 L 102 168" stroke="#D98A3C" strokeWidth="4.5" strokeLinecap="round" />

    {/* Plump felt duck body */}
    <ellipse cx="80" cy="115" rx="36" ry="40" fill="#FBF7EE" stroke="#392F3B" strokeWidth="3.5" />

    {/* Belly blanket stitch line */}
    <path d="M 72 115 Q 80 126 88 115" fill="none" stroke="#88A991" strokeWidth="2" strokeDasharray="3 3" />

    {/* Flappable wings */}
    <g className="duck-wings">
      <path d="M 44 105 Q 32 118 42 135 Q 52 125 50 110 Z" fill="#F0E8D8" stroke="#392F3B" strokeWidth="3" />
      <path d="M 116 105 Q 128 118 118 135 Q 108 125 110 110 Z" fill="#F0E8D8" stroke="#392F3B" strokeWidth="3" />
    </g>

    {/* Duck head */}
    <circle cx="80" cy="62" r="26" fill="#FBF7EE" stroke="#392F3B" strokeWidth="3.5" />

    {/* Indignant button eye */}
    <ellipse cx="73" cy="58" rx="4" ry="5.5" fill="#392F3B" />
    <circle cx="74" cy="56" r="1.5" fill="#FFF8F1" />
    <line x1="64" y1="52" x2="79" y2="55" stroke="#392F3B" strokeWidth="2.5" strokeLinecap="round" />

    {/* Orange beak with proud clamped expression */}
    <path d="M 88 60 L 115 65 L 88 74 Z" fill="#D98A3C" stroke="#392F3B" strokeWidth="2.5" />

    {/* Sage knitted wool scarf knotted snugly */}
    <path d="M 58 84 Q 80 76 102 84 Q 98 100 80 94 Q 62 98 58 84 Z" fill="#88A991" stroke="#392F3B" strokeWidth="3" />
    <path d="M 88 92 L 95 118 L 82 116 Z" fill="#75987E" stroke="#392F3B" strokeWidth="2" />
  </svg>
);

export const ShadowStage: React.FC<ShadowStageProps> = ({
  dialog = 0,
  puzzleDone = false,
  onPuzzleSuccess,
  onNextChapter,
  playChime = () => {},
}) => {
  // Current beat: 0..3 = dialogue, 4 = tactile stitching, 5 = celebration
  const [currentBeat, setCurrentBeat] = useState<number>(() => (puzzleDone ? 5 : Math.min(dialog, 3)));
  const [showCinematic, setShowCinematic] = useState<boolean>(false);
  const [repairedCount, setRepairedCount] = useState<number>(() => (puzzleDone ? 3 : 0));
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  // Synchronize incoming puzzleDone prop
  useEffect(() => {
    if (puzzleDone && currentBeat < 5) {
      setCurrentBeat(5);
      setRepairedCount(3);
    }
  }, [puzzleDone, currentBeat]);

  // Optional auto-advance dialogue progression
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
      return 4; // Enter tactile stitch phase
    });
  }, [playChime]);

  const handleSeamComplete = useCallback(
    (seamIndex: number) => {
      setRepairedCount((prev) => Math.max(prev, seamIndex + 1));
      playChime();
    },
    [playChime]
  );

  const handleStitchSuccess = useCallback(() => {
    setRepairedCount(3);
    setCurrentBeat(5); // Enter celebration phase
    playChime();
    onPuzzleSuccess?.();
  }, [playChime, onPuzzleSuccess]);

  const activeBeatData = DIALOGUE_BEATS[Math.min(currentBeat, 3)];
  const isStitching = currentBeat === 4;
  const isCelebrating = currentBeat >= 5 || puzzleDone;

  const cameraClass = isCelebrating
    ? 'camera-focus-duck'
    : isStitching
    ? 'camera-focus-shadow'
    : `camera-focus-${activeBeatData.cameraFocus}`;

  return (
    <div className="living-shadow-village-container">
      {/* Narrative Header */}
      <section className="storybook-reading living-scene-heading reveal-on-scroll" aria-label="Chapter 01 introduction">
        <p className="story-overline">CHAPTER 01 · THE SHADOW SCANDAL</p>
        <h1>Lost Shadows Village</h1>
        <p className="living-scene-subtext">
          {isCelebrating
            ? 'Duck stands proud and tall. Three impossible seams hold tight on the cobblestones.'
            : isStitching
            ? 'Guide Morrow’s needle along all three torn seams to anchor the impossible tree shadow.'
            : 'A strange silence hangs over the cobblestones. The duck has opinions about his confiscated shadow.'}
        </p>
      </section>

      {/* Persistent 2.5D Living Village Scene */}
      <section
        className={`storybook-stage living-shadow-scene ${isCelebrating ? 'is-celebrating is-solved' : ''}`}
        aria-label="Persistent 2.5D Living Village Scene with Morrow, Sir Clack, Pipkin, and Duck"
      >
        {/* Parallax & Camera Attention Wrapper */}
        <div className={`living-scene-camera ${cameraClass}`} aria-hidden="true">
          {/* Layer 1: Sky, Moon, Stars */}
          <div className="living-sky-layer">
            <span className="living-moon" />
            <div className="story-atmosphere">
              <i /><i /><i /><i /><i />
            </div>
          </div>

          {/* Layer 2: Medieval Timber Cottages */}
          <div className="living-cottages-layer" style={{ backgroundImage: 'url(/environments/shadows-cottages.webp)', backgroundSize: 'cover', backgroundPosition: 'center bottom' }}>
            <svg viewBox="0 0 600 240" preserveAspectRatio="none" style={{ width: '100%', height: '100%', opacity: 0.4 }}>
              <defs>
                <linearGradient id="cottage-timber" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2e213b" />
                  <stop offset="100%" stopColor="#1e1628" />
                </linearGradient>
              </defs>
              {/* Left cottage */}
              <path d="M 10 240 L 10 110 L 90 40 L 170 110 L 170 240 Z" fill="url(#cottage-timber)" />
              <rect x="50" y="130" width="30" height="40" rx="4" fill="#F7D560" opacity="0.85" />
              <line x1="65" y1="130" x2="65" y2="170" stroke="#392F3B" strokeWidth="2" />
              {/* Center-left cottage */}
              <path d="M 160 240 L 160 130 L 230 70 L 300 130 L 300 240 Z" fill="#241a2f" />
              <rect x="210" y="145" width="28" height="36" rx="4" fill="#F7D560" opacity="0.65" />
              {/* Right cottages */}
              <path d="M 420 240 L 420 120 L 510 50 L 590 120 L 590 240 Z" fill="url(#cottage-timber)" />
              <rect x="470" y="135" width="32" height="42" rx="4" fill="#F7D560" opacity="0.85" />
            </svg>
          </div>

          {/* Layer 3: Perspective Cobblestone Ground */}
          <div className="living-ground-layer">
            <svg viewBox="0 0 600 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%', opacity: 0.35 }}>
              <line x1="50" y1="20" x2="0" y2="200" stroke="#FFF8F1" strokeWidth="1" strokeDasharray="6 8" />
              <line x1="200" y1="20" x2="150" y2="200" stroke="#FFF8F1" strokeWidth="1" strokeDasharray="6 8" />
              <line x1="400" y1="20" x2="450" y2="200" stroke="#FFF8F1" strokeWidth="1" strokeDasharray="6 8" />
              <line x1="550" y1="20" x2="600" y2="200" stroke="#FFF8F1" strokeWidth="1" strokeDasharray="6 8" />
            </svg>
          </div>
        </div>

        {/* Topbar Info Pill & Auto-Advance Toggle */}
        <div className="storybook-scene-label">
          <span>CHAPTER 01 · 02/06</span>
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
        {!isStitching && (
          <div
            className={`scene-speech-balloon speaker-${isCelebrating ? 'duck' : activeBeatData.speaker}`}
            role="region"
            aria-live="polite"
          >
            <div className="balloon-tag-row">
              <span className="balloon-speaker-badge">
                {isCelebrating ? 'VILLAGE DUCK' : activeBeatData.name}
              </span>
              <span className="balloon-role-tag">
                {isCelebrating ? 'CELEBRATION PAYOFF' : activeBeatData.roleTag}
              </span>
            </div>
            <p className="speech-balloon-text">
              {isCelebrating
                ? '“I AM A FOREST! Look at my leaves rustle across the cobblestones! Every seam is sturdy and proud!”'
                : activeBeatData.text}
            </p>
            <div className="balloon-footer-actions">
              {!isCelebrating ? (
                <>
                  <button
                    type="button"
                    className="balloon-action-btn balloon-next-btn"
                    onClick={advanceBeat}
                    aria-label={currentBeat < 3 ? 'Turn the page · Continue to next dialogue' : 'Turn the page · Mend the shadow'}
                  >
                    {currentBeat < 3 ? 'Turn the page ▾' : 'Turn the page · Mend the shadow ➔'}
                  </button>
                  <button
                    type="button"
                    className="balloon-action-btn balloon-video-btn"
                    onClick={() => setShowCinematic(true)}
                    aria-label="Watch Duck stop-motion reveal film"
                  >
                    <Film size={14} /> Film
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="balloon-action-btn balloon-video-btn"
                  onClick={() => setCurrentBeat(4)}
                  aria-label="Re-stitch the shadow"
                >
                  <RotateCcw size={14} /> Re-stitch seams
                </button>
              )}
            </div>
          </div>
        )}

        {/* PERSISTENT CHARACTERS ROW */}
        <div className="living-characters-row">
          {/* Left Character: Sir Clack with Pipkin perched on handle */}
          <div
            className={`living-character living-clack-wrap ${
              !isStitching && (activeBeatData.speaker === 'clack' || activeBeatData.speaker === 'pipkin')
                ? 'speaker-active'
                : ''
            }`}
            onClick={() => {
              if (currentBeat < 3) setCurrentBeat(1);
            }}
          >
            {/* Pipkin perched on Clack's arched handle */}
            <div
              style={{
                position: 'absolute',
                top: '-38px',
                left: '26px',
                width: '54px',
                zIndex: 5,
                transform: activeBeatData.speaker === 'pipkin' ? 'scale(1.15) rotate(-6deg)' : 'scale(0.95)',
                transition: 'transform 0.3s ease',
              }}
            >
              <StopMotionActor
                character="pipkin"
                state={isCelebrating ? 'happy' : 'surprised'}
                isSpeaking={!isStitching && activeBeatData.speaker === 'pipkin'}
                fallbackSvg={<Pipkin />}
                alt="Pipkin the Delivery Bird"
              />
            </div>
            <StopMotionActor
              character="clack"
              state={isCelebrating ? 'happy' : 'idle'}
              isSpeaking={!isStitching && activeBeatData.speaker === 'clack'}
              fallbackSvg={<SirClack />}
              alt="Sir Clack the Antique Toolbox Mentor"
            />
          </div>

          {/* Center-Left Character: Village Duck & His Gnarled Oak Shadow */}
          <div
            className={`living-character living-duck-wrap ${
              !isStitching && activeBeatData.speaker === 'duck' ? 'speaker-active' : ''
            }`}
            onClick={() => {
              if (currentBeat === 0) setShowCinematic(true);
            }}
          >
            <StopMotionActor
              character="duck"
              state={isCelebrating ? 'happy' : 'talking'}
              isSpeaking={!isStitching && activeBeatData.speaker === 'duck'}
              fallbackSvg={
                <SceneDuck
                  isSpeaking={!isStitching && activeBeatData.speaker === 'duck'}
                  isCelebrating={isCelebrating}
                />
              }
              alt="Village Duck"
            />

            {/* THE PERSISTENT GHOST TREE SHADOW (Visible in Conversation & Celebration) */}
            {!isStitching && (
              <div
                className={`impossible-tree-shadow ${isCelebrating ? 'celebrating-tree-shadow' : ''}`}
                style={{
                  position: 'absolute',
                  left: '35%',
                  top: '78%',
                  width: 'clamp(140px, 35vw, 190px)',
                  transform: 'perspective(260px) rotateX(45deg) rotate(22deg)',
                  transformOrigin: 'top left',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 240 280" className="tree-shadow-svg">
                  <path
                    d="M 116 8 L 126 8 Q 124 45 135 68 Q 170 58 196 82 Q 228 105 224 142 Q 234 186 200 216 Q 162 246 120 240 Q 78 246 40 216 Q 6 186 16 142 Q 12 105 44 82 Q 70 58 105 68 Q 116 45 116 8 Z"
                    fill="#1a1420"
                    opacity={isCelebrating ? 0.95 : 0.88}
                  />
                  {isCelebrating && (
                    <g className="tree-shadow-blooming-cluster">
                      <circle cx="60" cy="110" r="14" fill="#F7D560" opacity="0.65" />
                      <circle cx="180" cy="90" r="16" fill="#F7D560" opacity="0.65" />
                      <circle cx="120" cy="40" r="18" fill="#F7D560" opacity="0.75" />
                    </g>
                  )}
                </svg>
              </div>
            )}
          </div>

          {/* Right Character: Morrow with needle and spool tail */}
          <div
            className={`living-character living-morrow-wrap ${
              !isStitching && activeBeatData.speaker === 'morrow' ? 'speaker-active' : ''
            }`}
            onClick={() => {
              if (currentBeat < 3) setCurrentBeat(3);
            }}
          >
            <StopMotionActor
              character="morrow"
              state={isCelebrating ? 'happy' : isStitching ? 'action' : 'idle'}
              isSpeaking={!isStitching && activeBeatData.speaker === 'morrow'}
              fallbackSvg={
                <Morrow
                  small
                  expression={isCelebrating ? 'happy' : isStitching ? 'focused' : 'curious'}
                />
              }
              alt="Morrow the Apprentice Stitchling"
            />
          </div>
        </div>

        {/* TACTILE SHADOW STITCHER GAMEPLAY CANVAS (Active during Beat 4) */}
        {isStitching && (
          <div
            className="living-scene-stitcher-overlay direct-environmental-stitch-mode"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 8,
              background: 'radial-gradient(circle at 50% 50%, rgba(26, 20, 32, 0.45) 0%, rgba(18, 14, 24, 0.8) 100%)',
              backdropFilter: 'blur(2px)',
              padding: '12px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflowY: 'auto',
            }}
          >
            <TactileShadowStitcher
              onSeamComplete={handleSeamComplete}
              onSuccess={handleStitchSuccess}
              playChime={playChime}
              initialSeamsRepaired={Array.from({ length: repairedCount }, (_, i) => i)}
            />
          </div>
        )}

        {/* INLINE CINEMATIC REVEAL MODAL / PLAYER */}
        {showCinematic && (
          <div
            className="living-cinematic-bridge-modal"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 12,
              background: '#1a1420',
            }}
          >
            <CinematicVideoPlayer
              src="/cinematics/shadows-01-duck.mp4"
              poster="/cinematics/shadows-01-duck-poster.jpg"
              title="Duck’s Impossible Tree Shadow"
              speaker="Village Duck"
              caption="“My shadow has been confiscated. Apparently I am too duck-shaped.”"
              onEnded={() => setShowCinematic(false)}
              ariaLabel="Duck stop-motion reveal video"
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
          <span>{isCelebrating ? '✦ The Shadows Are Singing ✦' : 'The Living Village · Lost Shadows'}</span>
          <span>✦</span>
        </div>
      </section>

      {/* Accessible Resident & Shadow Controls (Matches mobile-qa.mjs and assistive technology) */}
      <details className="accessible-loom-drawer" open style={{ marginTop: '12px' }}>
        <summary>
          <span>Assistive Controls & Resident Shadows</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--sage)', fontWeight: 800 }}>
            {repairedCount}/3 Mended
          </span>
        </summary>
        <div style={{ padding: '8px 4px 4px' }}>
          <div className="tactile-resident-inspectors loom-resident-inspectors" role="group" aria-label="Select resident and target shadow">
            {[
              { resident: 'Village Duck', shadow: 'Tree shadow', index: 0 },
              { resident: 'Little Lantern', shadow: 'Star shadow', index: 1 },
              { resident: 'Wandering Snail', shadow: 'Duck shadow', index: 2 },
            ].map(({ resident, shadow, index }) => {
              const isDone = repairedCount > index;
              return (
                <div key={resident} className="resident-inspect-pair">
                  <button
                    type="button"
                    className={`resident-inspect-btn ${isDone ? 'repaired' : ''}`}
                    onClick={() => {
                      playChime();
                    }}
                    aria-label={`${resident} resident`}
                  >
                    <span>{resident}</span>
                    <small>{isDone ? '✓ Anchored' : 'Select resident'}</small>
                  </button>
                  <button
                    type="button"
                    className={`shadow-inspect-btn ${isDone ? 'repaired' : ''}`}
                    onClick={() => {
                      playChime();
                      if (index + 1 >= 3) {
                        handleStitchSuccess();
                      } else {
                        handleSeamComplete(index);
                      }
                    }}
                    aria-label={`${shadow} destination`}
                  >
                    <span>{shadow}</span>
                    <small>{isDone ? '✓ Stitched' : 'Mend shadow'}</small>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </details>

      {/* Post-Puzzle Story Payoff & Chapter Transition Button */}
      {isCelebrating && (
        <section className="chapter-payoff-card living-scene-payoff-card is-revealed" aria-live="polite">
          <div className="payoff-badge">
            <Sparkles size={16} /> BEAT 06 PAYOFF: THREE IMPOSSIBLE SEAMS RESTORED
          </div>
          <p>
            <strong>Duck’s oak tree shadow</strong> is rooted firmly on the stones. The bough catches the village breeze,
            and the canopy glows golden under the twilight moon.
          </p>
          <p className="payoff-reflection">
            <em>Pipkin’s Notebook:</em> “Local Stitchling proves that mistakes make the world much more interesting than perfection.”
          </p>

          {/* Chapter Continue Button (Matches regression test selector /step into the next chapter/i) */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              type="button"
              className="storybook-action chapter-continue living-scene-next-btn"
              onClick={onNextChapter}
            >
              Step into the next chapter · Upside-Down Forest <ArrowRight size={20} />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
