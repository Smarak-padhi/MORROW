import React from 'react';

export const ResidentDuckArt: React.FC = () => (
  <svg viewBox="0 0 60 60" className="resident-svg-icon" aria-hidden="true">
    <ellipse cx="30" cy="40" rx="18" ry="14" fill="#FBF7EE" stroke="#392F3B" strokeWidth="2.5" />
    <circle cx="38" cy="24" r="12" fill="#FBF7EE" stroke="#392F3B" strokeWidth="2.5" />
    <path d="M 46 25 L 56 27 L 46 31 Z" fill="#D98A3C" stroke="#392F3B" strokeWidth="2" />
    <ellipse cx="38" cy="22" rx="2" ry="3" fill="#392F3B" />
    <path d="M 28 32 Q 38 29 46 33 Q 44 40 38 37 Z" fill="#88A991" stroke="#392F3B" strokeWidth="1.8" />
  </svg>
);

export const ResidentLanternArt: React.FC = () => (
  <svg viewBox="0 0 60 60" className="resident-svg-icon" aria-hidden="true">
    <rect x="20" y="20" width="20" height="24" rx="4" fill="#E8C878" stroke="#392F3B" strokeWidth="2.5" />
    <line x1="20" y1="28" x2="40" y2="28" stroke="#392F3B" strokeWidth="1.5" />
    <line x1="20" y1="36" x2="40" y2="36" stroke="#392F3B" strokeWidth="1.5" />
    <path d="M 18 20 Q 30 14 42 20" stroke="#392F3B" strokeWidth="3" fill="none" />
    <circle cx="30" cy="12" r="3" fill="none" stroke="#392F3B" strokeWidth="2" />
    <circle cx="30" cy="32" r="5" fill="#FFF8F1" opacity="0.8" />
  </svg>
);

export const ResidentSnailArt: React.FC = () => (
  <svg viewBox="0 0 60 60" className="resident-svg-icon" aria-hidden="true">
    <ellipse cx="35" cy="40" rx="14" ry="12" fill="#C98F70" stroke="#392F3B" strokeWidth="2.5" />
    <path d="M 35 40 A 6 6 0 0 0 35 34 A 4 4 0 0 0 35 30" fill="none" stroke="#392F3B" strokeWidth="2" />
    <path d="M 12 46 Q 30 46 48 46 Q 52 42 48 38 Q 42 38 40 40 Z" fill="#E8B28C" stroke="#392F3B" strokeWidth="2.5" />
    <line x1="18" y1="42" x2="15" y2="34" stroke="#392F3B" strokeWidth="2" />
    <circle cx="15" cy="34" r="1.5" fill="#392F3B" />
  </svg>
);

export const ShadowTreeArt: React.FC = () => (
  <svg viewBox="0 0 60 60" className="shadow-svg-icon" aria-hidden="true">
    <ellipse cx="30" cy="24" rx="18" ry="14" fill="#25202D" />
    <path d="M 28 35 L 28 50 L 32 50 L 32 35 Z" fill="#25202D" />
  </svg>
);

export const ShadowStarArt: React.FC = () => (
  <svg viewBox="0 0 60 60" className="shadow-svg-icon" aria-hidden="true">
    <polygon points="30,12 35,24 48,25 38,34 41,47 30,40 19,47 22,34 12,25 25,24" fill="#25202D" />
  </svg>
);

export const ShadowDuckArt: React.FC = () => (
  <svg viewBox="0 0 60 60" className="shadow-svg-icon" aria-hidden="true">
    <ellipse cx="28" cy="36" rx="16" ry="11" fill="#25202D" />
    <circle cx="36" cy="24" r="9" fill="#25202D" />
    <polygon points="42,23 52,25 42,28" fill="#25202D" />
  </svg>
);
