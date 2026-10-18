import React, { useState } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

interface ImpossibleClockProps {
  onSuccess: () => void;
  playChime: () => void;
}

interface GearSlot {
  id: string;
  name: string;
  fitted: boolean;
  color: string;
}

export const ImpossibleClock: React.FC<ImpossibleClockProps> = ({ onSuccess, playChime }) => {
  const [gears, setGears] = useState<GearSlot[]>([
    { id: 'shadow', name: 'Shadow Cog', fitted: false, color: '#8E79A8' },
    { id: 'weather', name: 'Weather Spring', fitted: false, color: '#88A991' },
    { id: 'heart', name: 'Crooked Heart Key', fitted: false, color: '#E8C878' },
  ]);
  const [status, setStatus] = useState<string>('');

  const toggleGear = (id: string) => {
    playChime();
    setGears((prev) => {
      const updated = prev.map((g) => (g.id === id ? { ...g, fitted: !g.fitted } : g));
      const allFitted = updated.every((g) => g.fitted);
      if (allFitted) {
        setStatus('All gears mesh with an irregular, wonderful chime! Tomorrow starts ticking again.');
        onSuccess();
      } else {
        setStatus(`Adjusted ${id} gear.`);
      }
      return updated;
    });
  };

  const allReady = gears.every((g) => g.fitted);

  return (
    <div className="game-container impossible-clock">
      <div className="game-header">
        <div className="game-badge">
          <Clock size={18} /> INVENTION 03
        </div>
        <h3>The Impossible Clock</h3>
        <p>Professor Perfect froze time to prevent future mistakes. Fit the three irregular gears to restart tomorrow.</p>
      </div>

      <div className="clock-stage">
        <svg viewBox="0 0 200 140" className="clock-svg" role="img" aria-label="Impossible clock dial and gears">
          <circle cx="100" cy="70" r="58" fill="#FFF8F1" stroke="#392F3B" strokeWidth="4" />
          <circle cx="100" cy="70" r="48" fill="none" stroke="#E7D4D4" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Hands of Time */}
          <line
            x1="100"
            y1="70"
            x2="100"
            y2="32"
            stroke="#A34063"
            strokeWidth="3.5"
            strokeLinecap="round"
            className={allReady ? 'clock-ticking' : ''}
          />
          <line
            x1="100"
            y1="70"
            x2="125"
            y2="70"
            stroke="#392F3B"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="100" cy="70" r="6" fill="#E8C878" stroke="#392F3B" strokeWidth="2" />

          {/* Three visual gears */}
          {gears[0].fitted && (
            <circle cx="70" cy="50" r="14" fill="#8E79A8" opacity="0.6" stroke="#392F3B" strokeWidth="2" strokeDasharray="3 2" />
          )}
          {gears[1].fitted && (
            <circle cx="130" cy="50" r="16" fill="#88A991" opacity="0.6" stroke="#392F3B" strokeWidth="2" strokeDasharray="4 2" />
          )}
          {gears[2].fitted && (
            <path d="M 92 95 L 100 86 L 108 95 Z" fill="#E8C878" stroke="#A34063" strokeWidth="2.5" />
          )}
        </svg>
      </div>

      <div className="gear-controls" role="group" aria-label="Fit gears">
        {gears.map((g) => (
          <button
            key={g.id}
            type="button"
            className={`gear-btn ${g.fitted ? 'fitted' : ''}`}
            onClick={() => toggleGear(g.id)}
          >
            <span>{g.fitted ? '✓ Gear Engaged:' : '+ Insert Gear:'}</span>
            <strong>{g.name}</strong>
          </button>
        ))}
      </div>

      {status && (
        <div className="game-reaction" role="status">
          <CheckCircle2 size={18} className="reaction-icon" />
          <p>{status}</p>
        </div>
      )}
    </div>
  );
};
