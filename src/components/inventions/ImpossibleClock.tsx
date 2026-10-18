import { useState } from 'react';
import { Clock, CheckCircle2, Sparkles } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  playChime: () => void;
}

const GEARS = [
  {
    id: 'shadow',
    name: 'Shadow Cog',
    step: '1st',
    clue: '“The past gives tomorrow a shadow.”',
    detail: 'Forged from the village’s restored shadows',
  },
  {
    id: 'weather',
    name: 'Weather Spring',
    step: '2nd',
    clue: '“The sky moves the hands forward.”',
    detail: 'Coiled from upward forest rainfall',
  },
  {
    id: 'heart',
    name: 'Crooked Heart Key',
    step: '3rd',
    clue: '“A heart must be fitted last.”',
    detail: 'Held secretly by the Unfinished One',
  },
] as const;

type GearId = typeof GEARS[number]['id'];

export function ImpossibleClock({ onSuccess, playChime }: Props) {
  const [fitted, setFitted] = useState<GearId[]>([]);
  const [message, setMessage] = useState('The clock needs its shadow, then its weather, and finally its heart.');

  function fit(id: GearId) {
    if (fitted.includes(id)) {
      setMessage('That gear is already in place.');
      return;
    }
    const expected = GEARS[fitted.length].id;
    playChime();
    if (id !== expected) {
      setMessage(`The gears jam! ${GEARS[fitted.length].clue}`);
      return;
    }
    const next = [...fitted, id];
    setFitted(next);
    setMessage(
      next.length === 3
        ? 'The crooked heart key clicks into place. Time ticks forward with wonder!'
        : `Click! ${next.length} of 3 gears fitted in story order.`
    );
    if (next.length === 3) onSuccess();
  }

  const complete = fitted.length === 3;

  return (
    <div className="game-container impossible-clock">
      <div className="game-header">
        <div className="game-badge">
          <Clock size={18} /> INVENTION 03 · THE IMPOSSIBLE CLOCK
        </div>
        <h3>Mending the Flow of Tomorrow</h3>
        <p>Professor Perfect froze time to prevent future mistakes. Fit the three symbolic gears in the order of Morrow’s journey.</p>
      </div>

      <div className="clock-stage">
        <svg
          viewBox="0 0 240 180"
          className="clock-svg"
          role="img"
          aria-label={`Clock with ${fitted.length} of three gears fitted`}
        >
          {/* Outer Brass Clockwork Bezel */}
          <circle cx="120" cy="90" r="76" fill="#FFF8F1" stroke="#392F3B" strokeWidth="5" />
          <circle cx="120" cy="90" r="64" fill="none" stroke="#E7D4D4" strokeWidth="2.5" strokeDasharray="5 5" />

          {/* Clock Ticks */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 120 + Math.sin(rad) * 58;
            const y1 = 90 - Math.cos(rad) * 58;
            const x2 = 120 + Math.sin(rad) * 64;
            const y2 = 90 - Math.cos(rad) * 64;
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#392F3B" strokeWidth={deg % 90 === 0 ? 3.5 : 2} />;
          })}

          {/* Clockwork Gears Inside */}
          {fitted.includes('shadow') && (
            <g transform="translate(85, 65)">
              <circle cx="0" cy="0" r="18" fill="#8E79A8" opacity="0.8" stroke="#392F3B" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="6" fill="#FFF8F1" stroke="#392F3B" strokeWidth="2" />
            </g>
          )}

          {fitted.includes('weather') && (
            <g transform="translate(155, 65)">
              <circle cx="0" cy="0" r="20" fill="#88A991" opacity="0.85" stroke="#392F3B" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="7" fill="#FFF8F1" stroke="#392F3B" strokeWidth="2" />
            </g>
          )}

          {fitted.includes('heart') && (
            <g transform="translate(120, 122)">
              <path
                d="M -10 -4 Q -16 -12 -6 -14 Q 0 -12 0 -4 Q 0 -12 6 -14 Q 16 -12 10 -4 L 0 8 Z"
                fill="#E8C878"
                stroke="#A34063"
                strokeWidth="2.5"
              />
            </g>
          )}

          {/* Hands */}
          <line
            x1="120"
            y1="90"
            x2="120"
            y2="42"
            stroke="#A34063"
            strokeWidth="4"
            strokeLinecap="round"
            className={complete ? 'clock-ticking' : ''}
          />
          <line x1="120" y1="90" x2="152" y2="90" stroke="#392F3B" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="120" cy="90" r="8" fill="#E8C878" stroke="#392F3B" strokeWidth="2.5" />
        </svg>
      </div>

      <p className="palette-title">Select gears to insert ({fitted.length}/3 in place)</p>
      <div className="gear-controls" role="group" aria-label="Clock gears">
        {GEARS.map(g => (
          <button
            key={g.id}
            type="button"
            className={`gear-btn ${fitted.includes(g.id) ? 'fitted' : ''}`}
            onClick={() => fit(g.id)}
            disabled={fitted.includes(g.id)}
          >
            <div className="gear-info">
              <span className="gear-step-badge">{g.step}</span>
              <strong>{g.name}</strong>
              <small>{g.detail}</small>
            </div>
            <span className="gear-status">{fitted.includes(g.id) ? '✓ Fitted' : 'Insert gear →'}</span>
          </button>
        ))}
      </div>

      <div className="game-reaction" role="status">
        {complete ? <Sparkles size={18} className="reaction-icon" /> : <CheckCircle2 size={18} className="reaction-icon" />}
        <p>{message}</p>
      </div>
    </div>
  );
}
