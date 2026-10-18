import React, { useState } from 'react';
import { Scissors, Sparkles, CheckCircle2 } from 'lucide-react';

interface ShadowStitcherProps {
  onSuccess: () => void;
  playChime: () => void;
}

interface ShadowOption {
  id: string;
  name: string;
  description: string;
  dialogue: string;
  isCorrect?: boolean;
}

const SHADOW_OPTIONS: ShadowOption[] = [
  {
    id: 'duck',
    name: 'Duck shadow',
    description: 'A very duck-shaped shadow',
    dialogue: 'Duck: A responsible duck shadow? How predictable. But it fits nicely!',
    isCorrect: true,
  },
  {
    id: 'tree',
    name: 'Tree shadow',
    description: 'An expansive oak tree shadow',
    dialogue: 'Duck: I AM A FOREST. Sir Clack: That is not how ducks work. Morrow: It is a very ambitious duck.',
    isCorrect: true,
  },
  {
    id: 'star',
    name: 'Star shadow',
    description: 'A twinkling constellation shadow',
    dialogue: 'Duck: I demand a celestial crown! Pipkin: BREAKING: BIRD BECOMES GALAXY.',
    isCorrect: true,
  },
];

export const ShadowStitcher: React.FC<ShadowStitcherProps> = ({ onSuccess, playChime }) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [stitching, setStitching] = useState<boolean>(false);
  const [reaction, setReaction] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSelect = (option: ShadowOption) => {
    setSelectedId(option.id);
    setStitching(true);
    playChime();

    setTimeout(() => {
      setStitching(false);
      setReaction(option.dialogue);
      setCompleted(true);
      onSuccess();
    }, 450);
  };

  return (
    <div className="game-container shadow-stitcher">
      <div className="game-header">
        <div className="game-badge">
          <Scissors size={18} /> INVENTION 01
        </div>
        <h3>The Shadow Stitcher</h3>
        <p>The inspector confiscated the village shadows. Stitch an experimental shadow onto the duck.</p>
      </div>

      <div className="duck-stage" aria-label="Duck shadow experiment visual stage">
        {/* Interactive SVG Duck & Shadow Preview */}
        <svg viewBox="0 0 200 130" className="duck-svg" role="img" aria-label="Duck on the stitching table">
          <ellipse cx="100" cy="115" rx="50" ry="10" fill="#392F3B" opacity="0.12" />
          
          {/* Casted Shadow based on selection */}
          {selectedId === 'duck' && (
            <path d="M 60 115 Q 90 95 140 110 Q 155 120 130 125 Z" fill="#25324A" opacity="0.45" />
          )}
          {selectedId === 'tree' && (
            <path d="M 85 115 L 85 85 Q 50 65 80 40 Q 120 30 135 60 Q 150 85 110 115 Z" fill="#25324A" opacity="0.45" />
          )}
          {selectedId === 'star' && (
            <path d="M 100 80 L 108 100 L 130 102 L 112 114 L 118 132 L 100 120 L 82 132 L 88 114 L 70 102 L 92 100 Z" fill="#25324A" opacity="0.45" />
          )}

          {/* Duck Illustration */}
          <ellipse cx="100" cy="80" rx="32" ry="24" fill="#E8C878" stroke="#392F3B" strokeWidth="3" />
          <circle cx="126" cy="62" r="16" fill="#E8C878" stroke="#392F3B" strokeWidth="3" />
          <circle cx="131" cy="59" r="3" fill="#392F3B" />
          <path d="M 140 60 L 158 64 L 140 70 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="2.5" />
          {/* Thread stitches joining shadow */}
          {completed && (
            <path d="M 85 96 L 92 104 M 98 98 L 105 106 M 112 96 L 119 104" stroke="#A34063" strokeWidth="3" strokeLinecap="round" />
          )}
        </svg>
      </div>

      <div className="choices-grid" role="group" aria-label="Shadow options">
        {SHADOW_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`choice-card ${selectedId === opt.id ? 'active' : ''}`}
            onClick={() => handleSelect(opt)}
            disabled={stitching}
          >
            <strong>{opt.name}</strong>
            <small>{opt.description}</small>
          </button>
        ))}
      </div>

      {stitching && (
        <div className="stitching-pulse" role="status">
          <Sparkles className="spin-icon" size={16} /> Stitching magical thread...
        </div>
      )}

      {reaction && !stitching && (
        <div className="game-reaction" role="status">
          <CheckCircle2 size={18} className="reaction-icon" />
          <p>{reaction}</p>
        </div>
      )}
    </div>
  );
};
