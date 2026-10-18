import { useState } from 'react';
import { Scissors, CheckCircle2, Sparkles } from 'lucide-react';

interface Props { onSuccess: () => void; playChime: () => void }
type Resident = 'duck' | 'lantern' | 'snail';
type Shadow = 'tree' | 'star' | 'duck';
const RESIDENTS: { id: Resident; name: string; icon: string; clue: string; correct: Shadow; reaction: string }[] = [
  { id:'duck', name:'Village Duck', icon:'🦆', clue:'“I have always dreamed of being a forest.”', correct:'tree', reaction:'Duck: I AM A FOREST! Sir Clack: An ambitious duck indeed.' },
  { id:'lantern', name:'Little Lantern', icon:'🏮', clue:'“I want to light up the whole night.”', correct:'star', reaction:'Pipkin: BREAKING NEWS! A lantern has become a constellation!' },
  { id:'snail', name:'Wandering Snail', icon:'🐌', clue:'“I wish I could waddle as bravely as Duck.”', correct:'duck', reaction:'Snail: Quack! ... Was that convincing? Morrow: Perfectly imperfect.' },
];
const SHADOWS: { id: Shadow; name: string; symbol: string; clue: string }[] = [
  { id:'duck', name:'Duck shadow', symbol:'🦆', clue:'A brave little waddle' },
  { id:'tree', name:'Tree shadow', symbol:'🌳', clue:'A towering old oak' },
  { id:'star', name:'Star shadow', symbol:'⭐', clue:'A piece of the night sky' },
];

export function ShadowStitcher({ onSuccess, playChime }: Props) {
  const [resident, setResident] = useState<Resident>('duck');
  const [restored, setRestored] = useState<Resident[]>([]);
  const [choice, setChoice] = useState<Shadow | null>(null);
  const [message, setMessage] = useState('The inspector took their unusual shadows. Listen to each resident and choose the shadow they wished for.');
  const active = RESIDENTS.find(r => r.id === resident)!;
  const chosen = SHADOWS.find(s => s.id === choice);
  const complete = restored.length === RESIDENTS.length;
  function stitch(shadow: Shadow) {
    if (restored.includes(resident)) { setMessage('That resident has already been helped. Choose someone else.'); return; }
    setChoice(shadow);
    if (shadow !== active.correct) {
      setMessage(`Not quite! ${active.name} says: ${active.clue} Look for the shadow that fits their wish.`);
      return;
    }
    playChime();
    const next = [...restored, resident];
    setRestored(next);
    setMessage(active.reaction);
    if (next.length === RESIDENTS.length) onSuccess();
    else {
      const upcoming = RESIDENTS.find(r => !next.includes(r.id));
      if (upcoming) { setResident(upcoming.id); setChoice(null); }
    }
  }
  return <div className="game-container shadow-stitcher">
    <div className="game-header">
      <div className="game-badge"><Scissors size={18}/> INVENTION 01 · SHADOW STITCHER</div>
      <h3>Who gets which shadow?</h3>
      <p>These residents don't want ordinary shadows. Listen to their wishes, then stitch the right one back.</p>
    </div>
    <p className="palette-title">1. Choose a resident ({restored.length}/3 restored)</p>
    <div className="shadow-residents" role="group" aria-label="Village residents">
      {RESIDENTS.map(r => <button type="button" key={r.id} className={`shadow-resident ${resident===r.id?'selected':''} ${restored.includes(r.id)?'repaired':''}`} aria-pressed={resident===r.id} onClick={() => { setResident(r.id); setChoice(null); setMessage(restored.includes(r.id) ? `${r.name} has a wonderful shadow now.` : r.clue); }}>
        <span aria-hidden="true">{r.icon}</span><strong>{r.name}</strong><small>{restored.includes(r.id)?'✓ Restored':'Needs a shadow'}</small>
      </button>)}
    </div>
    <div className="shadow-workbench" aria-live="polite">
      <div className="shadow-figure" aria-hidden="true"><span>{active.icon}</span><span className="shadow-thread">〰</span><span className="shadow-projection">{restored.includes(active.id) ? SHADOWS.find(s => s.id===active.correct)?.symbol : chosen?.symbol || '❔'}</span></div>
      <p><strong>{active.name}:</strong> {active.clue}</p>
    </div>
    <p className="palette-title">2. Stitch on a shadow</p>
    <div className="choices-grid" role="group" aria-label="Available shadow shapes">
      {SHADOWS.map(s => <button type="button" key={s.id} className={`choice-card ${choice===s.id?'active':''}`} disabled={complete || restored.includes(resident)} onClick={() => stitch(s.id)}>
        <span className="shadow-choice-symbol" aria-hidden="true">{s.symbol}</span><strong>{s.name}</strong><small>{s.clue}</small>
      </button>)}
    </div>
    <div className="game-reaction" role="status">{complete ? <Sparkles size={18} className="reaction-icon"/> : <CheckCircle2 size={18} className="reaction-icon"/>}<p>{complete ? 'All three impossible shadows are home. Morrow has saved Shadow Village!' : message}</p></div>
  </div>;
}
