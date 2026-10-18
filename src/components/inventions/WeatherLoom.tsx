import { useState } from 'react';
import { CloudRain, CheckCircle2 } from 'lucide-react';

interface Props { onSuccess: () => void; playChime: () => void }
const THREADS = [
  { id: 'rain', name: 'Gentle Downpour', symbol: '🌧' },
  { id: 'wind', name: 'Whistling Breeze', symbol: '🍃' },
  { id: 'sun', name: 'Golden Sunbeam', symbol: '☀️' },
] as const;
const TARGETS = [
  { id: 'flowers', name: 'Thirsty Lilies', clue: 'The petals are thirsty.', thread: 'rain', result: 'The rain remembers how to fall. The lilies applaud politely.' },
  { id: 'windmill', name: 'Frozen Windmill', clue: 'Its sails have forgotten how to turn.', thread: 'wind', result: 'The windmill spins! Pipkin declares it the fastest bakery in town.' },
  { id: 'frog', name: 'Frog Mayor', clue: 'His rain bucket needs a little warmth.', thread: 'sun', result: 'The frog mayor dries his hat. A public holiday is declared.' },
] as const;
type Thread = typeof THREADS[number]['id'];
type Target = typeof TARGETS[number]['id'];

export function WeatherLoom({ onSuccess, playChime }: Props) {
  const [thread, setThread] = useState<Thread>('rain');
  const [solved, setSolved] = useState<Target[]>([]);
  const [message, setMessage] = useState('Choose a thread, then weave it into the place that needs it.');
  function weave(target: typeof TARGETS[number]) {
    if (solved.includes(target.id)) { setMessage('This part of the forest is already mended.'); return; }
    playChime();
    if (thread !== target.thread) {
      setMessage(`That made things stranger! ${target.clue} Try another spool.`);
      return;
    }
    const next = [...solved, target.id];
    setSolved(next);
    setMessage(target.result);
    if (next.length === TARGETS.length) onSuccess();
  }
  return <div className="game-container weather-loom">
    <div className="game-header"><div className="game-badge"><CloudRain size={18}/> INVENTION 02</div><h3>The Weather Loom</h3><p>Three problems, three kinds of sky-thread. Restore the forest one stitch at a time.</p></div>
    <p className="palette-title">1. Choose your weather thread</p>
    <div className="spool-options" role="group" aria-label="Weather thread">
      {THREADS.map(t => <button type="button" key={t.id} aria-pressed={thread===t.id} className={`spool-btn ${thread===t.id?'active':''}`} onClick={() => setThread(t.id)}><span aria-hidden="true">{t.symbol}</span>{t.name}</button>)}
    </div>
    <p className="palette-title">2. Stitch it to the world ({solved.length}/3 repaired)</p>
    <div className="choices-grid" role="group" aria-label="Places to repair">
      {TARGETS.map(t => <button type="button" key={t.id} className={`choice-card ${solved.includes(t.id)?'active':''}`} disabled={solved.includes(t.id)} onClick={() => weave(t)}><strong>{solved.includes(t.id)?'✓ ':''}{t.name}</strong><small>{t.clue}</small></button>)}
    </div>
    <div className="game-reaction" role="status"><CheckCircle2 size={18} className="reaction-icon"/><p>{message}</p></div>
  </div>;
}
