import { useState } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
interface Props { onSuccess: () => void; playChime: () => void }
const GEARS = [
  { id: 'shadow', name: 'Shadow Cog', clue: 'The past gives tomorrow a shadow.' },
  { id: 'weather', name: 'Weather Spring', clue: 'The sky moves the hands forward.' },
  { id: 'heart', name: 'Crooked Heart Key', clue: 'A heart must be fitted last.' },
] as const;
type GearId = typeof GEARS[number]['id'];
export function ImpossibleClock({ onSuccess, playChime }: Props) {
  const [fitted, setFitted] = useState<GearId[]>([]);
  const [message, setMessage] = useState('The clock needs its shadow, then its weather, then its heart.');
  function fit(id: GearId) {
    if (fitted.includes(id)) { setMessage('That gear is already in place.'); return; }
    const expected = GEARS[fitted.length].id;
    playChime();
    if (id !== expected) { setMessage(`The gears protest! ${GEARS[fitted.length].clue}`); return; }
    const next = [...fitted,id];
    setFitted(next);
    setMessage(next.length===3 ? 'The crooked heart turns. Tomorrow begins again.' : `Click! ${next.length} of 3 gears fitted.`);
    if (next.length===3) onSuccess();
  }
  return <div className="game-container impossible-clock">
    <div className="game-header"><div className="game-badge"><Clock size={18}/> INVENTION 03</div><h3>The Impossible Clock</h3><p>Time has stopped. Use what Morrow learned in the village and forest to fit the gears in story order.</p></div>
    <div className="clock-stage"><svg viewBox="0 0 200 140" className="clock-svg" role="img" aria-label={`Clock with ${fitted.length} of three gears fitted`}>
      <circle cx="100" cy="70" r="58" fill="#FFF8F1" stroke="#392F3B" strokeWidth="4"/>
      <circle cx="100" cy="70" r="48" fill="none" stroke="#E7D4D4" strokeWidth="2" strokeDasharray="4 4"/>
      <line x1="100" y1="70" x2="100" y2="32" stroke="#A34063" strokeWidth="3.5" strokeLinecap="round" className={fitted.length===3?'clock-ticking':''}/>
      <line x1="100" y1="70" x2="125" y2="70" stroke="#392F3B" strokeWidth="4"/>
      <circle cx="100" cy="70" r="6" fill="#E8C878" stroke="#392F3B" strokeWidth="2"/>
      {fitted.includes('shadow') && <circle cx="70" cy="50" r="14" fill="#8E79A8" opacity=".65"/>}
      {fitted.includes('weather') && <circle cx="130" cy="50" r="16" fill="#88A991" opacity=".65"/>}
      {fitted.includes('heart') && <path d="M92 95 L100 86 L108 95Z" fill="#E8C878" stroke="#A34063" strokeWidth="2.5"/>}
    </svg></div>
    <div className="gear-controls" role="group" aria-label="Clock gears">{GEARS.map(g => <button key={g.id} type="button" className={`gear-btn ${fitted.includes(g.id)?'fitted':''}`} onClick={() => fit(g.id)} disabled={fitted.includes(g.id)}><span>{fitted.includes(g.id)?'✓ Fitted':'Insert gear'}</span><strong>{g.name}</strong></button>)}</div>
    <div className="game-reaction" role="status"><CheckCircle2 size={18} className="reaction-icon"/><p>{message}</p></div>
  </div>;
}
