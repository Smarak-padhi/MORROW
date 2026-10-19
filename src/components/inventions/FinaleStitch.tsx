import { useState } from 'react';
import { Heart, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  playChime: () => void;
}

const STEPS = [
  {
    label: '1. Reach toward your friend',
    line: 'Morrow offers a mitten paw. The Unfinished One moves closer into the light.',
    detail: 'Golden thread hums as the distance begins to close.'
  },
  {
    label: '2. Listen to the crooked thread',
    line: 'The golden thread curves where it wants. Morrow lets it wander.',
    detail: 'No ruler, no perfection. Just two threads learning to meet.'
  },
  {
    label: '3. Tie a wonderfully uneven knot',
    line: 'Their imperfect stitch holds fast. The clock tower begins to breathe.',
    detail: 'A crooked knot that is strong precisely because it is uneven.'
  },
] as const;

export function FinaleStitch({ onSuccess, playChime }: Props) {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState('A perfect straight line would be easy. But Morrow remembers who he left behind.');
  const [wrong, setWrong] = useState(false);
  const finished = step === STEPS.length;

  function advance() {
    if (finished) return;
    playChime();
    setWrong(false);
    setMessage(STEPS[step].line);
    const next = step + 1;
    setStep(next);
    if (next === STEPS.length) {
      onSuccess();
    }
  }

  function reset() {
    setStep(0);
    setWrong(false);
    setMessage('Let us begin the stitch again, gently.');
  }

  return (
    <div className="game-container finale-stitch-card" aria-label="The Final Stitch interactive puzzle">
      <div className="game-header">
        <div className="game-badge">
          <Heart size={18} aria-hidden="true" />
          <span>THE FINAL STITCH</span>
        </div>
        <h3>The First Unfinished Thing</h3>
        <p>
          Professor Perfect wants a straight, flawless seam with a brass ruler. But Morrow knows a friend cannot be repaired like a broken clock. Help him reach across the gap.
        </p>
      </div>

      <div className="finale-stage" aria-hidden="true">
        <svg
          viewBox="0 0 340 180"
          className="finale-svg"
          role="img"
          aria-label={`Two mitten paws connected by ${step} of three crooked golden stitches`}
        >
          <defs>
            <radialGradient id="stage-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E8C878" stopOpacity={finished ? '0.35' : '0.12'} />
              <stop offset="100%" stopColor="#E8C878" stopOpacity="0" />
            </radialGradient>
            <filter id="thread-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Felt fabric patterns */}
            <pattern id="peach-felt" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#C98F70" />
              <circle cx="2" cy="2" r="0.8" fill="#DDB095" opacity="0.6" />
              <circle cx="6" cy="6" r="0.8" fill="#B3785A" opacity="0.5" />
            </pattern>
            <pattern id="navy-felt" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#25324A" />
              <circle cx="2" cy="2" r="0.8" fill="#3D4E70" opacity="0.6" />
              <circle cx="6" cy="6" r="0.8" fill="#182132" opacity="0.5" />
            </pattern>
          </defs>

          {/* Warm center ambient glow */}
          <ellipse cx="170" cy="100" rx="140" ry="65" fill="url(#stage-glow)" />

          {/* Stage floor shadow */}
          <ellipse cx="170" cy="155" rx="130" ry="12" fill="#392F3B" opacity="0.12" />

          {/* The Unfinished One's mitten paw (Left - Navy felt) */}
          <g className="unfinished-paw">
            {/* Arm shadow */}
            <path d="M 15 118 Q 70 98 105 118" fill="none" stroke="#392F3B" strokeWidth="26" opacity="0.08" strokeLinecap="round" />
            {/* Navy arm */}
            <path d="M 15 115 Q 70 95 105 115" fill="none" stroke="url(#navy-felt)" strokeWidth="24" strokeLinecap="round" />
            {/* Mitten head */}
            <ellipse cx="106" cy="115" rx="14" ry="12" fill="url(#navy-felt)" stroke="#392F3B" strokeWidth="2.5" />
            {/* Arm stitching dashes */}
            <path d="M 25 115 Q 70 95 98 115" fill="none" stroke="#E8C878" strokeWidth="2" strokeDasharray="3,4" opacity="0.75" />
            {/* Thumb */}
            <path d="M 98 105 Q 106 97 114 104" fill="none" stroke="url(#navy-felt)" strokeWidth="9" strokeLinecap="round" />
            {/* Lilac patch cuff */}
            <rect x="25" y="102" width="12" height="26" rx="3" fill="#8E79A8" stroke="#392F3B" strokeWidth="2" transform="rotate(-15 31 115)" />
            <line x1="31" y1="104" x2="31" y2="126" stroke="#FFF8F1" strokeWidth="1.5" strokeDasharray="2,3" transform="rotate(-15 31 115)" />
            {/* The signature crooked knot marking */}
            <circle cx="102" cy="114" r="3" fill="#E8C878" />
            <path d="M 99 116 Q 103 120 106 114" fill="none" stroke="#E8C878" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* Morrow's mitten paw (Right - Peach felt) */}
          <g className="morrow-paw">
            {/* Arm shadow */}
            <path d="M 325 118 Q 270 98 235 118" fill="none" stroke="#392F3B" strokeWidth="26" opacity="0.08" strokeLinecap="round" />
            {/* Peach arm */}
            <path d="M 325 115 Q 270 95 235 115" fill="none" stroke="url(#peach-felt)" strokeWidth="24" strokeLinecap="round" />
            {/* Mitten head */}
            <ellipse cx="234" cy="115" rx="14" ry="12" fill="url(#peach-felt)" stroke="#392F3B" strokeWidth="2.5" />
            {/* Arm stitching dashes */}
            <path d="M 315 115 Q 270 95 242 115" fill="none" stroke="#FFF8F1" strokeWidth="2" strokeDasharray="3,4" opacity="0.85" />
            {/* Thumb */}
            <path d="M 242 105 Q 234 97 226 104" fill="none" stroke="url(#peach-felt)" strokeWidth="9" strokeLinecap="round" />
            {/* Plum scarf cuff */}
            <rect x="303" y="102" width="12" height="26" rx="3" fill="#A34063" stroke="#392F3B" strokeWidth="2" transform="rotate(15 309 115)" />
            <line x1="309" y1="104" x2="309" y2="126" stroke="#E8C878" strokeWidth="1.5" strokeDasharray="2,3" transform="rotate(15 309 115)" />
            {/* Little golden sewing needle in Morrow's paw */}
            <line x1="222" y1="112" x2="204" y2="108" stroke="#E8C878" strokeWidth="3" strokeLinecap="round" />
            <circle cx="221" cy="112" r="1.5" fill="#392F3B" />
          </g>

          {/* STITCH PROGRESS: Glowing Golden Thread */}
          {/* Step 1: Reach toward your friend */}
          {step >= 1 && (
            <g className="stitch-step-1" filter="url(#thread-glow)">
              <path
                d="M 204 108 Q 185 82 165 98"
                stroke="#E8C878"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="165" cy="98" r="4" fill="#E8C878" />
              {/* Thread sparkles */}
              <circle cx="185" cy="88" r="2" fill="#FFF8F1" />
            </g>
          )}

          {/* Step 2: Listen to the crooked thread */}
          {step >= 2 && (
            <g className="stitch-step-2" filter="url(#thread-glow)">
              <path
                d="M 165 98 Q 150 118 135 88 Q 124 78 116 104"
                stroke="#E8C878"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="135" cy="88" r="4" fill="#E8C878" />
              <circle cx="148" cy="112" r="2" fill="#FFF8F1" />
            </g>
          )}

          {/* Step 3: Tie a wonderfully uneven knot */}
          {step >= 3 && (
            <g className="stitch-step-3" filter="url(#thread-glow)">
              {/* The Crooked Bow Knot */}
              <path
                d="M 116 104 Q 106 114 114 115"
                stroke="#E8C878"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Golden bow loops */}
              <path
                d="M 160 88 C 145 70 135 100 155 95 C 175 90 180 70 160 88 Z"
                fill="none"
                stroke="#E8C878"
                strokeWidth="4"
              />
              <path
                d="M 152 95 Q 146 122 138 132"
                stroke="#E8C878"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 158 95 Q 166 124 175 130"
                stroke="#E8C878"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Center berry knot bead */}
              <circle cx="155" cy="93" r="5" fill="#A34063" stroke="#FFF8F1" strokeWidth="1.5" />
            </g>
          )}

          {/* Completion celebratory magical thread bursts */}
          {finished && (
            <g className="finished-sparkles" fill="#E8C878">
              <circle cx="130" cy="55" r="4" fill="#FFF8F1" />
              <circle cx="170" cy="45" r="5" />
              <circle cx="210" cy="60" r="3.5" fill="#FFF8F1" />
              <path d="M 170 35 L 173 45 L 183 48 L 173 51 L 170 61 L 167 51 L 157 48 L 167 45 Z" fill="#E8C878" />
              <path d="M 125 45 L 127 52 L 134 54 L 127 56 L 125 63 L 123 56 L 116 54 L 123 52 Z" fill="#FFF8F1" opacity="0.9" />
              <path d="M 215 50 L 217 56 L 223 58 L 217 60 L 215 66 L 213 60 L 207 58 L 213 56 Z" fill="#E8C878" opacity="0.9" />
            </g>
          )}
        </svg>
      </div>

      <div className="finale-progress-bar" role="progressbar" aria-valuenow={step} aria-valuemin={0} aria-valuemax={3}>
        <div className="progress-labels">
          <span className="palette-title">Crooked stitches completed:</span>
          <strong>{step} of 3</strong>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>

      <div className="finale-steps" role="group" aria-label="Final stitch choices">
        {STEPS.map((s, i) => {
          const isDone = i < step;
          const isCurrent = i === step;
          return (
            <button
              type="button"
              key={s.label}
              disabled={i !== step}
              className={`finale-step ${isDone ? 'finished' : ''} ${isCurrent ? 'active' : ''}`}
              onClick={advance}
            >
              <span className="step-indicator" aria-hidden="true">
                {isDone ? '✓' : isCurrent ? '✦' : '○'}
              </span>
              <div className="step-copy">
                <strong>{s.label}</strong>
                <small>{s.detail}</small>
              </div>
            </button>
          );
        })}
      </div>

      {!finished && (
        <button
          type="button"
          className="finale-perfect-btn"
          onClick={() => {
            setWrong(true);
            setMessage('Professor Perfect suggests a ruler. Morrow shakes his head: “That would erase what makes us us.”');
          }}
        >
          <span>Try to make it perfectly straight</span>
        </button>
      )}

      {finished && (
        <div className="finale-success-banner">
          <button type="button" className="finale-re-knot-btn" onClick={reset}>
            <RotateCcw size={16} /> Re-tie the crooked stitch
          </button>
        </div>
      )}

      <div className="game-reaction" role="status">
        {finished ? (
          <Sparkles size={20} className="reaction-icon reaction-sparkle" />
        ) : (
          <CheckCircle2 size={20} className="reaction-icon" />
        )}
        <p>
          {finished
            ? 'The crooked knot glows with warmth. The Unfinished One smiles. Professor Perfect looks down at her own porcelain hairline cracks, sets down her stamp, and whispers: "Imperfect. Acceptable. Somehow lovely."'
            : message}
          {wrong ? ' Try a different kind of repair.' : ''}
        </p>
      </div>
    </div>
  );
}
