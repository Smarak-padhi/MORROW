import { useState } from 'react';
import { CloudRain, CheckCircle2, Sparkles } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  playChime: () => void;
}

const THREADS = [
  { id: 'rain', name: 'Gentle Downpour', color: '#88A991', desc: 'Cool water stitch' },
  { id: 'wind', name: 'Whistling Breeze', color: '#8E79A8', desc: 'Spiral draft stitch' },
  { id: 'sun', name: 'Golden Sunbeam', color: '#E8C878', desc: 'Warm bright stitch' },
] as const;

const TARGETS = [
  {
    id: 'flowers',
    name: 'Thirsty Lilies',
    clue: 'The upward rain leaves the roots parched.',
    thread: 'rain',
    result: 'The rain remembers gravity. The lilies open their petals with quiet gratitude.',
    badge: 'Lilies',
  },
  {
    id: 'windmill',
    name: 'Frozen Windmill',
    clue: 'Its sails hang motionless in upside-down air.',
    thread: 'wind',
    result: 'The windmill creaks to life! Pipkin declares the sky open for daily news delivery.',
    badge: 'Windmill',
  },
  {
    id: 'frog',
    name: 'Frog Mayor',
    clue: 'His rain bucket hat is full and very cold.',
    thread: 'sun',
    result: 'The sun warms the mayor’s velvet coat. He officially forgives the clouds.',
    badge: 'Frog Mayor',
  },
] as const;

type Thread = typeof THREADS[number]['id'];
type Target = typeof TARGETS[number]['id'];

export function WeatherLoom({ onSuccess, playChime }: Props) {
  const [thread, setThread] = useState<Thread>('rain');
  const [solved, setSolved] = useState<Target[]>([]);
  const [message, setMessage] = useState('Select a weather thread, then stitch it into the forest feature that needs it.');

  function weave(target: typeof TARGETS[number]) {
    if (solved.includes(target.id)) {
      setMessage('This part of the forest is already mended.');
      return;
    }
    playChime();
    if (thread !== target.thread) {
      setMessage(`The sky resists! ${target.clue} Try another thread.`);
      return;
    }
    const next = [...solved, target.id];
    setSolved(next);
    setMessage(target.result);
    if (next.length === TARGETS.length) onSuccess();
  }

  const complete = solved.length === TARGETS.length;

  return (
    <div className="game-container weather-loom">
      <div className="game-header">
        <div className="game-badge">
          <CloudRain size={18} /> INVENTION 02 · THE WEATHER LOOM
        </div>
        <h3>Weaving the Sky Back Down</h3>
        <p>In the Upside-Down Forest, rain rises and the breeze is tangled. Weave the sky back to the forest floor.</p>
      </div>

      <p className="palette-title">1. Select your sky thread spool</p>
      <div className="spool-options" role="group" aria-label="Weather thread options">
        {THREADS.map(t => (
          <button
            type="button"
            key={t.id}
            aria-pressed={thread === t.id}
            className={`spool-btn ${thread === t.id ? 'active' : ''}`}
            onClick={() => setThread(t.id)}
          >
            <span className="spool-pip" style={{ background: t.color }} aria-hidden="true" />
            <div className="spool-text">
              <strong>{t.name}</strong>
              <small>{t.desc}</small>
            </div>
          </button>
        ))}
      </div>

      <p className="palette-title">2. Stitch thread to the forest ({solved.length}/3 repaired)</p>
      <div className="choices-grid" role="group" aria-label="Places to repair">
        {TARGETS.map(t => (
          <button
            type="button"
            key={t.id}
            className={`choice-card ${solved.includes(t.id) ? 'active' : ''}`}
            disabled={solved.includes(t.id)}
            onClick={() => weave(t)}
          >
            <span className="choice-badge">{t.badge}</span>
            <strong>{solved.includes(t.id) ? '✓ ' : ''}{t.name}</strong>
            <small>{t.clue}</small>
          </button>
        ))}
      </div>

      <div className="game-reaction" role="status">
        {complete ? <Sparkles size={18} className="reaction-icon" /> : <CheckCircle2 size={18} className="reaction-icon" />}
        <p>{complete ? 'All three sky threads are securely tied! The upside-down forest breathes again.' : message}</p>
      </div>
    </div>
  );
}
