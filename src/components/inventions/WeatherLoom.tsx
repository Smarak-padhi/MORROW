import React, { useState } from 'react';
import { CloudRain, Sparkles, CheckCircle2 } from 'lucide-react';

interface WeatherLoomProps {
  onSuccess: () => void;
  playChime: () => void;
}

interface WeatherThread {
  id: string;
  name: string;
  symbol: string;
  color: string;
}

interface LoomTarget {
  id: string;
  name: string;
  desc: string;
}

const WEATHERS: WeatherThread[] = [
  { id: 'down-rain', name: 'Gentle Downpour', symbol: '🌧', color: '#88A991' },
  { id: 'rising-wind', name: 'Whistling Breeze', symbol: '🍃', color: '#8E79A8' },
  { id: 'sun-patch', name: 'Golden Sunbeam', symbol: '☀️', color: '#E8C878' },
];

const TARGETS: LoomTarget[] = [
  { id: 'flowers', name: 'Thirsty Lilies', desc: 'Need moisture falling downwards' },
  { id: 'windmill', name: 'Frozen Windmill', desc: 'Needs a lively breeze' },
  { id: 'frog', name: 'Frog Mayor', desc: 'Needs sunshine to dry his bucket' },
];

export const WeatherLoom: React.FC<WeatherLoomProps> = ({ onSuccess, playChime }) => {
  const [selectedWeather, setSelectedWeather] = useState<string>('down-rain');
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [weaving, setWeaving] = useState<boolean>(false);
  const [log, setLog] = useState<string>('');

  const handleWeave = (targetId: string) => {
    setSelectedTarget(targetId);
    setWeaving(true);
    playChime();

    setTimeout(() => {
      setWeaving(false);
      let outcome = '';
      if (targetId === 'flowers') {
        outcome = 'Flowers drink upside-down rain happily. Sir Clack: Well, at least they are hydrated.';
      } else if (targetId === 'windmill') {
        outcome = 'Windmill spins backward, churning clouds into sweet spun sugar! Pipkin: SENSATIONAL!';
      } else {
        outcome = 'Frog Mayor puts down his bucket umbrella. "A polite rain at last!"';
      }
      setLog(outcome);
      onSuccess();
    }, 450);
  };

  return (
    <div className="game-container weather-loom">
      <div className="game-header">
        <div className="game-badge">
          <CloudRain size={18} /> INVENTION 02
        </div>
        <h3>The Weather Loom</h3>
        <p>The sky is raining upwards. Weave weather threads onto earthly targets to stabilize the forest.</p>
      </div>

      <div className="loom-palette" role="group" aria-label="Select weather thread">
        <span className="palette-title">1. Choose weather spool:</span>
        <div className="spool-options">
          {WEATHERS.map((w) => (
            <button
              key={w.id}
              type="button"
              className={`spool-btn ${selectedWeather === w.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedWeather(w.id);
                playChime();
              }}
            >
              <span className="spool-icon">{w.symbol}</span>
              <span>{w.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="targets-section">
        <span className="palette-title">2. Weave into place:</span>
        <div className="choices-grid">
          {TARGETS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`choice-card ${selectedTarget === t.id ? 'active' : ''}`}
              onClick={() => handleWeave(t.id)}
              disabled={weaving}
            >
              <strong>{t.name}</strong>
              <small>{t.desc}</small>
            </button>
          ))}
        </div>
      </div>

      {weaving && (
        <div className="stitching-pulse" role="status">
          <Sparkles className="spin-icon" size={16} /> Shuttle weaving sky threads...
        </div>
      )}

      {log && !weaving && (
        <div className="game-reaction" role="status">
          <CheckCircle2 size={18} className="reaction-icon" />
          <p>{log}</p>
        </div>
      )}
    </div>
  );
};
