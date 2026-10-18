import { useState } from 'react';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
interface Props { onSuccess: () => void; playChime: () => void }
const STEPS = [
  { label:'Reach toward your friend', line:'Morrow offers a mitten paw. The Unfinished One moves closer.' },
  { label:'Listen to the crooked thread', line:'The golden thread curves where it wants. Morrow lets it.' },
  { label:'Tie a wonderfully uneven knot', line:'Their imperfect stitch holds. The clock begins to turn.' },
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
    if (next === STEPS.length) onSuccess();
  }
  return <div className="game-container finale-stitch">
    <div className="game-header">
      <div className="game-badge"><Heart size={18}/> THE FINAL STITCH</div>
      <h3>The First Unfinished Thing</h3>
      <p>Professor Perfect wants a straight, flawless seam. But Morrow knows a friend cannot be repaired like a broken clock. Help him reach across the gap.</p>
    </div>
    <div className="finale-stage">
      <svg viewBox="0 0 300 160" className="finale-svg" role="img" aria-label={`Two mitten paws connected by ${step} of three crooked golden stitches`}>
        <ellipse cx="150" cy="140" rx="95" ry="11" fill="#392F3B" opacity=".13"/>
        <path d="M 20 100 Q 75 78 112 102" fill="none" stroke="#25324A" strokeWidth="25" strokeLinecap="round"/>
        <path d="M 280 100 Q 225 78 188 102" fill="none" stroke="#C98F70" strokeWidth="25" strokeLinecap="round"/>
        <circle cx="112" cy="102" r="9" fill="#8E79A8"/>
        <circle cx="188" cy="102" r="9" fill="#E8C878"/>
        {step>=1 && <path d="M112 102 Q126 67 145 96" stroke="#E8C878" strokeWidth="6" strokeLinecap="round" fill="none"/>}
        {step>=2 && <path d="M145 96 Q154 119 170 79" stroke="#E8C878" strokeWidth="6" strokeLinecap="round" fill="none"/>}
        {step>=3 && <path d="M170 79 Q182 82 188 102 M161 79 Q171 69 180 81 M165 89 Q177 101 181 84" stroke="#E8C878" strokeWidth="6" strokeLinecap="round" fill="none"/>}
        {finished && <g fill="#E8C878"><circle cx="146" cy="47" r="4"/><circle cx="172" cy="46" r="3"/><circle cx="193" cy="65" r="3"/></g>}
      </svg>
    </div>
    <p className="palette-title">Stitches placed: {step}/3</p>
    <div className="finale-steps" role="group" aria-label="Final stitch choices">
      {STEPS.map((s,i)=><button type="button" key={s.label} disabled={i!==step} className={`finale-step ${i<step?'finished':''}`} onClick={advance}>
        <span aria-hidden="true">{i<step?'✓':i===step?'✦':'○'}</span><span>{s.label}</span>
      </button>)}
    </div>
    {!finished && <button type="button" className="finale-perfect" onClick={()=>{setWrong(true);setMessage('Professor Perfect suggests a ruler. Morrow shakes his head: “That would erase what makes us us.”');}}>Try to make it perfectly straight</button>}
    <div className="game-reaction" role="status">{finished?<Sparkles size={18} className="reaction-icon"/>:<CheckCircle2 size={18} className="reaction-icon"/>}<p>{finished ? 'The crooked knot glows. The Unfinished One smiles. Professor Perfect looks at her own porcelain cracks, then quietly sets down her stamp.' : message}{wrong?' Try a different kind of repair.':''}</p></div>
  </div>;
}
