import React, { useState } from 'react';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

interface FinaleStitchProps {
  onSuccess: () => void;
  playChime: () => void;
}

export const FinaleStitch: React.FC<FinaleStitchProps> = ({ onSuccess, playChime }) => {
  const [stitched, setStitched] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleFinalStitch = () => {
    playChime();
    setStitched(true);
    setMessage(
      'Morrow loops the gold thread through the crooked knot. Professor Perfect pauses: "It violates seventeen regulations... yet it is rather lovely."'
    );
    onSuccess();
  };

  return (
    <div className="game-container finale-stitch">
      <div className="game-header">
        <div className="game-badge">
          <Heart size={18} /> THE FINAL STITCH
        </div>
        <h3>The First Unfinished Thing</h3>
        <p>
          Professor Perfect demands a perfectly symmetrical seal. But the shadow creature steps forward, holding the familiar crooked knot.
        </p>
      </div>

      <div className="finale-stage">
        <svg viewBox="0 0 220 140" className="finale-svg" role="img" aria-label="Crooked knot joining two hands">
          <ellipse cx="110" cy="118" rx="60" ry="10" fill="#392F3B" opacity="0.14" />
          
          {/* Shadow Creature Mitten Hand */}
          <path d="M 40 85 Q 85 80 95 90" fill="none" stroke="#25324A" strokeWidth="16" strokeLinecap="round" />
          
          {/* Morrow Warm Mitten Paw */}
          <path d="M 180 85 Q 135 80 125 90" fill="none" stroke="#C98F70" strokeWidth="16" strokeLinecap="round" />

          {/* Golden Crooked Knot in Center */}
          <g className="central-knot">
            <path
              d="M 102 75 Q 110 65 118 75 T 110 92 Z"
              fill="#E8C878"
              stroke="#A34063"
              strokeWidth="3"
            />
            {stitched && (
              <path
                d="M 90 90 L 130 90 M 110 70 L 110 110"
                stroke="#E8C878"
                strokeWidth="3.5"
                strokeDasharray="4 2"
                strokeLinecap="round"
              />
            )}
          </g>
        </svg>
      </div>

      {!stitched ? (
        <button
          type="button"
          className="primary final-stitch-btn"
          onClick={handleFinalStitch}
        >
          <Sparkles size={18} /> Make the crooked final stitch
        </button>
      ) : (
        <div className="game-reaction" role="status">
          <CheckCircle2 size={18} className="reaction-icon" />
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};
