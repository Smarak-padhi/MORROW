import React from 'react';
import { Sparkles } from 'lucide-react';
import { CinematicVideoPlayer } from '../CinematicVideoPlayer';

interface Props {
  dialog?: number;
  puzzleDone?: boolean;
}

export const ShadowStage: React.FC<Props> = ({ dialog: _dialog, puzzleDone = false }) => {
  {/* The Mandatory Impossible Tree Shadow: Anchored to Duck's feet and projected across the cobblestones */}
  const treeShadowOverlay = (
    <div className={`impossible-tree-shadow ${puzzleDone ? 'celebrating-tree-shadow' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 240 280" className="tree-shadow-svg">
        <defs>
          <linearGradient id="tree-shadow-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1420" stopOpacity="0.92" />
            <stop offset="45%" stopColor="#1a1420" stopOpacity="0.84" />
            <stop offset="100%" stopColor="#1a1420" stopOpacity="0.60" />
          </linearGradient>
        </defs>
        {/* Massive Gnarled Oak Tree Silhouette projecting from Duck's feet across the stones */}
        <path
          d="M 116 8 L 126 8 Q 124 45 135 68 Q 170 58 196 82 Q 228 105 224 142 Q 234 186 200 216 Q 162 246 120 240 Q 78 246 40 216 Q 6 186 16 142 Q 12 105 44 82 Q 70 58 105 68 Q 116 45 116 8 Z"
          fill="url(#tree-shadow-grad)"
        />
        {/* Spreading shadow branches along the cobblestone perspective */}
        <path d="M 120 68 Q 155 98 185 138" stroke="#1a1420" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.75" />
        <path d="M 120 68 Q 85 98 55 138" stroke="#1a1420" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.75" />
        <path d="M 120 105 Q 120 155 120 205" stroke="#1a1420" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.75" />
      </svg>
      {puzzleDone && (
        <div className="tree-shadow-sparkles" aria-hidden="true">
          <span className="sparkle s1">✦</span>
          <span className="sparkle s2">✧</span>
          <span className="sparkle s3">✦</span>
        </div>
      )}
    </div>
  );

  {/* Accessible 2D Fallback Stage */}
  const fallbackStage = (
    <div className="shadow-fallback-stage">
      <div className="shadow-duck-fallback">
        <svg viewBox="0 0 200 240" className="duck-fallback-svg" role="img" aria-label="Village Duck with an enormous tree shadow">
          <ellipse cx="100" cy="220" rx="35" ry="7" fill="#1a1420" opacity="0.3" />
          <ellipse cx="100" cy="155" rx="42" ry="48" fill="#FBF7EE" stroke="#392F3B" strokeWidth="4" />
          <circle cx="100" cy="95" r="32" fill="#FBF7EE" stroke="#392F3B" strokeWidth="4" />
          <path d="M 100 102 L 128 108 L 100 118 Z" fill="#D98A3C" stroke="#392F3B" strokeWidth="3" />
          <ellipse cx="90" cy="92" rx="5" ry="7" fill="#392F3B" />
          <circle cx="91" cy="89" r="2" fill="#FFF8F1" />
          <line x1="82" y1="84" x2="98" y2="88" stroke="#392F3B" strokeWidth="3" strokeLinecap="round" />
          <path d="M 78 122 Q 100 114 122 122 Q 118 138 100 132 Q 82 136 78 122 Z" fill="#88A991" stroke="#392F3B" strokeWidth="3" />
          <path d="M 85 203 L 80 220 M 115 203 L 120 220" stroke="#D98A3C" strokeWidth="5" strokeLinecap="round" />
        </svg>
        <div className="impossible-tree-shadow static">
          <svg viewBox="0 0 240 300" className="tree-shadow-svg">
            <path
              d="M 120 290 Q 115 230 110 180 Q 80 150 40 160 Q 20 120 50 90 Q 30 50 70 30 Q 120 10 170 30 Q 210 50 190 90 Q 220 120 200 160 Q 160 150 130 180 Q 125 230 120 290 Z"
              fill="#1a1420"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <section className={`storybook-stage shadow-stage-interactive ${puzzleDone ? 'is-solved' : ''}`} aria-label="Lost Shadows Village with the impossible tree shadow">
      {/* Background Cobblestone Village Atmosphere */}
      <div className="storybook-sky" aria-hidden="true">
        <span className="story-sun story-moon" />
        <span className="story-cloud cloud-a" />
        <span className="story-cloud cloud-b" />
      </div>

      <div className="storybook-landscape" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="storybook-scene-label">
        <span>CHAPTER 01</span>
        <span>02 / 06</span>
      </div>

      {/* Standardized Cinematic Video Player Architecture */}
      <CinematicVideoPlayer
        src="/cinematics/shadows-01-duck.mp4"
        poster="/cinematics/shadows-01-duck-poster.jpg"
        title="Duck's Impossible Tree Shadow"
        speaker={!_dialog || _dialog === 0 ? "Village Duck" : undefined}
        caption={!_dialog || _dialog === 0 ? "“My shadow has been confiscated. Apparently I am too duck-shaped.”" : undefined}
        overlayArt={treeShadowOverlay}
        fallbackStage={fallbackStage}
        ariaLabel="Lost Shadows Village with Duck and the impossible tree shadow"
        className="shadow-duck-cinematic"
      />

      {/* Beat 06 Cinematic Success Payoff Banner */}
      {puzzleDone && (
        <div className="shadow-payoff-banner" role="status" aria-live="polite">
          <div className="shadow-payoff-badge">
            <Sparkles size={15} />
            <span>BEAT 06 PAYOFF · ALL 3 SHADOWS RESTORED</span>
          </div>
          <p className="shadow-payoff-quote">
            <strong>Duck:</strong> “I AM A FOREST! Listen to my leaves rustle on the cobblestones!”
          </p>
        </div>
      )}

      <div className="story-atmosphere" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className="storybook-scene-bottom">
        <span>{puzzleDone ? '✦ The Shadows Are Singing ✦' : 'The Shadow Scandal'}</span>
        <span>✦</span>
      </div>
    </section>
  );
};
