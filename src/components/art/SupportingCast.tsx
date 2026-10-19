import React from 'react';

interface CharacterArtProps {
  className?: string;
}

/**
 * Sir Clack: Grumpy sentient antique toolbox, mentor, and secret scrapbook keeper.
 */
export const SirClack: React.FC<CharacterArtProps> = ({ className = '' }) => (
  <svg
    className={`sir-clack ${className}`.trim()}
    viewBox="0 0 200 220"
    role="img"
    aria-label="Sir Clack, a grumpy antique wooden toolbox with brass hinges and handle"
  >
    <defs>
      <linearGradient id="clack-wood" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8F5D48" />
        <stop offset="100%" stopColor="#63392A" />
      </linearGradient>
    </defs>
    <ellipse cx="100" cy="205" rx="55" ry="8" fill="#392F3B" opacity="0.18" />
    {/* Toolbox Base */}
    <rect x="45" y="110" width="110" height="85" rx="8" fill="url(#clack-wood)" stroke="#392F3B" strokeWidth="4" />
    {/* Metal corners */}
    <path d="M 45 125 L 45 110 L 60 110" fill="none" stroke="#E8C878" strokeWidth="5" />
    <path d="M 155 125 L 155 110 L 140 110" fill="none" stroke="#E8C878" strokeWidth="5" />
    <path d="M 45 180 L 45 195 L 60 195" fill="none" stroke="#E8C878" strokeWidth="5" />
    <path d="M 155 180 L 155 195 L 140 195" fill="none" stroke="#E8C878" strokeWidth="5" />
    {/* Handle */}
    <path d="M 75 110 L 75 75 Q 100 60 125 75 L 125 110" fill="none" stroke="#C98F70" strokeWidth="8" strokeLinecap="round" />
    <rect x="88" y="62" width="24" height="12" rx="4" fill="#E8C878" stroke="#392F3B" strokeWidth="2" />
    {/* Drawer line */}
    <line x1="45" y1="155" x2="155" y2="155" stroke="#392F3B" strokeWidth="3" />
    {/* Grumpy Eyes & Brass Plate */}
    <ellipse cx="80" cy="135" rx="6" ry="8" fill="#392F3B" />
    <circle cx="82" cy="132" r="2" fill="#FFF8F1" />
    <ellipse cx="120" cy="135" rx="6" ry="8" fill="#392F3B" />
    <circle cx="122" cy="132" r="2" fill="#FFF8F1" />
    {/* Grumpy eyebrows */}
    <line x1="72" y1="124" x2="88" y2="128" stroke="#392F3B" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="128" y1="124" x2="112" y2="128" stroke="#392F3B" strokeWidth="3.5" strokeLinecap="round" />
    {/* Brass mustache / keyhole slot mouth */}
    <path d="M 92 172 Q 100 168 108 172" fill="none" stroke="#E8C878" strokeWidth="3" strokeLinecap="round" />
    <rect x="97" y="138" width="6" height="8" rx="2" fill="#E8C878" stroke="#392F3B" strokeWidth="1.5" />
  </svg>
);

/**
 * Pipkin: The dramatic blue delivery bird who publishes "The Daily Panic".
 */
export const Pipkin: React.FC<CharacterArtProps> = ({ className = '' }) => (
  <svg
    className={`pipkin ${className}`.trim()}
    viewBox="0 0 160 160"
    role="img"
    aria-label="Pipkin, a dramatic blue messenger bird with a miniature delivery satchel"
  >
    <ellipse cx="80" cy="145" rx="30" ry="5" fill="#392F3B" opacity="0.15" />
    {/* Tail feathers */}
    <path d="M 40 95 L 18 80 L 25 102 Z" fill="#8E79A8" stroke="#392F3B" strokeWidth="3" />
    {/* Body */}
    <ellipse cx="78" cy="95" rx="42" ry="36" fill="#88A991" stroke="#392F3B" strokeWidth="3.5" />
    {/* Dramatic chest fluff */}
    <circle cx="95" cy="88" r="28" fill="#FFF8F1" stroke="#392F3B" strokeWidth="2.5" />
    {/* Head */}
    <circle cx="108" cy="65" r="24" fill="#88A991" stroke="#392F3B" strokeWidth="3.5" />
    {/* Big panicked eyes */}
    <circle cx="114" cy="60" r="8" fill="#FFF8F1" stroke="#392F3B" strokeWidth="2" />
    <circle cx="115" cy="60" r="4" fill="#392F3B" />
    <circle cx="116" cy="58" r="1.5" fill="#FFF8F1" />
    {/* Beak */}
    <path d="M 126 62 L 148 68 L 126 75 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="2.5" />
    {/* Newspaper delivery satchel */}
    <rect x="65" y="98" width="30" height="22" rx="4" fill="#C98F70" stroke="#392F3B" strokeWidth="2" />
    <line x1="52" y1="80" x2="72" y2="102" stroke="#A34063" strokeWidth="3" />
    {/* Legs */}
    <line x1="72" y1="130" x2="68" y2="145" stroke="#392F3B" strokeWidth="3" />
    <line x1="88" y1="130" x2="88" y2="145" stroke="#392F3B" strokeWidth="3" />
  </svg>
);

/**
 * The Unfinished One: Morrow's unevenly stitched first creation, secretly helping all along.
 */
export const TheUnfinishedOne: React.FC<CharacterArtProps> = ({ className = '' }) => (
  <svg
    className={`unfinished-one ${className}`.trim()}
    viewBox="0 0 180 190"
    role="img"
    aria-label="The Unfinished One, a small shadowy creature with a recognizable crooked gold stitch"
  >
    <ellipse cx="90" cy="175" rx="45" ry="7" fill="#392F3B" opacity="0.2" />
    {/* Soft shadowy body */}
    <path
      d="M 60 90 Q 40 140 70 165 Q 110 185 130 155 Q 145 110 115 85 Q 90 70 60 90 Z"
      fill="#25324A"
      stroke="#392F3B"
      strokeWidth="3.5"
    />
    {/* Uneven ears */}
    <path d="M 70 85 Q 55 45 68 35 Q 80 50 82 82 Z" fill="#25324A" stroke="#392F3B" strokeWidth="3" />
    {/* Luminous, tender eyes */}
    <circle cx="82" cy="110" r="6" fill="#FFF8F1" />
    <circle cx="82" cy="110" r="3" fill="#E8C878" />
    <circle cx="112" cy="108" r="7" fill="#FFF8F1" />
    <circle cx="112" cy="108" r="3.5" fill="#E8C878" />
    {/* The recognizable golden crooked knot (Mystery Clue) */}
    <g className="crooked-knot">
      <path d="M 90 135 Q 98 128 106 136 T 100 148" fill="none" stroke="#E8C878" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="95" cy="138" r="2" fill="#A34063" />
      <circle cx="102" cy="142" r="2" fill="#A34063" />
    </g>
  </svg>
);
