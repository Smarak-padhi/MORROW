import { useState } from 'react';
import { Scissors, CheckCircle2 } from 'lucide-react';

interface Props { onSuccess: () => void; playChime: () => void }
const SHADOWS = [
  { id: 'duck', name: 'Duck shadow', description: 'A very duck-shaped shadow', dialogue: 'Duck: How responsible. How disappointingly ordinary.' },
  { id: 'tree', name: 'Tree shadow', description: 'An ambitious oak tree shadow', dialogue: 'Duck: I AM A FOREST. Sir Clack: You are a duck with excellent ambition.' },
  { id: 'star', name: 'Star shadow', description: 'A constellation shadow', dialogue: 'Pipkin: BREAKING NEWS: LOCAL DUCK BECOMES GALAXY.' },
] as const;
type ShadowId = typeof SHADOWS[number]['id'];
export function ShadowStitcher({ onSuccess, playChime }: Props) {
  const [found, setFound] = useState<ShadowId[]>([]);
  const [selected, setSelected] = useState<ShadowId | null>(null);
  const [message, setMessage] = useState('Three lost shadows are hiding in the inspector’s bag. Try each one.');
  function stitch(option: typeof SHADOWS[number]) {
    setSelected(option.id);
    if (found.includes(option.id)) { setMessage('That shadow has already been restored. Find the others.'); return; }
    playChime();
    const next = [...found, option.id];
    setFound(next);
    setMessage(option.dialogue);
    if (next.length === SHADOWS.length) onSuccess();
  }
  return <div className="game-container shadow-stitcher">
    <div className="game-header"><div className="game-badge"><Scissors size={18}/> INVENTION 01</div><h3>The Shadow Stitcher</h3><p>Return all three confiscated shadows. They might not fit exactly—and that is okay.</p></div>
    <div className="duck-stage"><svg viewBox="0 0 200 130" className="duck-svg" role="img" aria-label="A golden duck on a stitching table, with a changing shadow">
      <ellipse cx="100" cy="115" rx="50" ry="10" fill="#392F3B" opacity=".12"/>
      {selected==='duck' && <path d="M60 115 Q90 95 140 110 Q155 120 130 125Z" fill="#25324A" opacity=".5"/>}
      {selected==='tree' && <path d="M85 115 L85 85 Q50 65 80 40 Q120 30 135 60 Q150 85 110 115Z" fill="#25324A" opacity=".5"/>}
      {selected==='star' && <path d="M100 80 L108 100 L130 102 L112 114 L118 132 L100 120 L82 132 L88 114 L70 102 L92 100Z" fill="#25324A" opacity=".5"/>}
      <ellipse cx="100" cy="80" rx="32" ry="24" fill="#E8C878" stroke="#392F3B" strokeWidth="3"/>
      <circle cx="126" cy="62" r="16" fill="#E8C878" stroke="#392F3B" strokeWidth="3"/>
      <circle cx="131" cy="59" r="3" fill="#392F3B"/>
      <path d="M140 60 L158 64 L140 70Z" fill="#C98F70" stroke="#392F3B" strokeWidth="2.5"/>
      {found.length>0 && <path d="M85 96 L92 104 M98 98 L105 106 M112 96 L119 104" stroke="#A34063" strokeWidth="3" strokeLinecap="round"/>}
    </svg></div>
    <p className="palette-title">Stitch the missing shadows ({found.length}/3)</p>
    <div className="choices-grid" role="group" aria-label="Shadow options">{SHADOWS.map(opt => <button type="button" key={opt.id} className={`choice-card ${selected===opt.id?'active':''}`} onClick={() => stitch(opt)}><strong>{found.includes(opt.id)?'✓ ':''}{opt.name}</strong><small>{opt.description}</small></button>)}</div>
    <div className="game-reaction" role="status"><CheckCircle2 size={18} className="reaction-icon"/><p>{message}</p></div>
  </div>;
}
