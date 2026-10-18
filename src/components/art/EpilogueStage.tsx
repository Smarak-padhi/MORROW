import React from 'react';

interface Props {
  dialog?: number;
}

export const EpilogueStage: React.FC<Props> = ({ dialog: _dialog }) => {
  return (
    <section className="storybook-stage epilogue-stage-bespoke" aria-label="The Workshop at golden morning with Sir Clack's scrapbook, Morrow, and all their friends">
      {/* Warm golden morning atmosphere */}
      <div className="storybook-sky epilogue-sunlit-sky" aria-hidden="true">
        <span className="epilogue-sunbeam beam-1" />
        <span className="epilogue-sunbeam beam-2" />
      </div>

      <div className="storybook-scene-label">
        <span>EPILOGUE</span>
        <span>06 / 06</span>
      </div>

      {/* Main Stop-Motion SVG Epilogue Stage */}
      <div className="stage-svg-wrap">
        <svg
          viewBox="0 0 600 380"
          preserveAspectRatio="xMidYMid slice"
          className="stage-svg-art"
          role="img"
          aria-label="Handcrafted scene of the Almost-Right Repair Shop at sunrise with Sir Clack's open scrapbook, Pipkin with the celebration edition, Duck under the tree shadow outside the window, and Morrow"
        >
          <defs>
            <linearGradient id="morning-sun-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="50%" stopColor="#F5DF9E" />
              <stop offset="100%" stopColor="#E3B378" />
            </linearGradient>
            <linearGradient id="workbench-wood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8F5D48" />
              <stop offset="100%" stopColor="#553022" />
            </linearGradient>
            <filter id="morning-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#4a301a" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Golden morning wall */}
          <rect width="600" height="380" fill="url(#morning-sun-grad)" />

          {/* LARGE WORKSHOP ARCHED WINDOW (Center-Left) */}
          <g className="workshop-window" transform="translate(60, 20)">
            {/* Window frame */}
            <path d="M 0 60 Q 75 0 150 60 L 150 200 L 0 200 Z" fill="#99BDD6" stroke="#5A4739" strokeWidth="5" />
            {/* Outside morning meadow */}
            <path d="M 0 160 Q 75 140 150 160 L 150 200 L 0 200 Z" fill="#7E9A82" />

            {/* DUCK SLEEPING UNDER THE IMPOSSIBLE TREE SHADOW (Outside in the garden!) */}
            <g transform="translate(65, 140)">
              {/* Tree shadow spreading across grass */}
              <path d="M 25 35 Q 20 15 15 -10 Q -5 -25 0 -45 Q 25 -65 50 -45 Q 65 -25 40 -10 Q 30 15 25 35 Z" fill="#2F3F34" opacity="0.65" />
              {/* Sleeping cream felt Duck */}
              <ellipse cx="25" cy="35" rx="14" ry="10" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.5" />
              <circle cx="34" cy="30" r="7" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.5" />
              <path d="M 40 31 L 46 33 L 40 35 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="1" />
              {/* Sage scarf */}
              <rect x="29" y="32" width="5" height="10" rx="1" fill="#88A991" />
              <line x1="32" y1="28" x2="36" y2="28" stroke="#392F3B" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Window pane mullions */}
            <line x1="75" y1="20" x2="75" y2="200" stroke="#5A4739" strokeWidth="3" />
            <line x1="0" y1="120" x2="150" y2="120" stroke="#5A4739" strokeWidth="3" />
          </g>

          {/* OAK WORKBENCH COUNTERTOP */}
          <path d="M -20 230 L 620 230 L 620 380 L -20 380 Z" fill="url(#workbench-wood)" filter="url(#morning-glow)" />
          <line x1="-20" y1="230" x2="620" y2="230" stroke="#DDB095" strokeWidth="3" opacity="0.4" />

          {/* SIR CLACK'S OPEN SCRAPBOOK (Center of workbench) */}
          <g className="open-scrapbook" transform="translate(130, 215)">
            <ellipse cx="75" cy="80" rx="90" ry="15" fill="#392F3B" opacity="0.3" />
            {/* Open leather binding */}
            <path d="M 0 55 Q 75 62 150 55 L 155 75 Q 75 82 -5 75 Z" fill="#63392A" stroke="#252030" strokeWidth="2" />
            {/* Left page (Cream handmade paper) */}
            <path d="M 10 50 Q 75 42 75 50 L 75 110 Q 10 115 10 110 Z" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.5" />
            {/* Right page */}
            <path d="M 75 50 Q 75 42 140 50 L 140 110 Q 75 115 75 110 Z" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.5" />
            {/* Pinned polaroid sketch 1: Duck with Tree Shadow */}
            <rect x="20" y="58" width="22" height="26" fill="#F8F6F4" stroke="#392F3B" strokeWidth="1" transform="rotate(-6 31 71)" />
            <ellipse cx="30" cy="73" rx="5" ry="4" fill="#E8C878" transform="rotate(-6 31 71)" />
            {/* Pinned polaroid sketch 2: Inverted Umbrella with Flowers */}
            <rect x="46" y="62" width="22" height="26" fill="#F8F6F4" stroke="#392F3B" strokeWidth="1" transform="rotate(4 57 75)" />
            <path d="M 50 78 Q 57 84 64 78" fill="none" stroke="#88A991" strokeWidth="2" transform="rotate(4 57 75)" />
            {/* Pinned polaroid sketch 3: Clock Ticking 4:03 */}
            <rect x="85" y="60" width="22" height="26" fill="#F8F6F4" stroke="#392F3B" strokeWidth="1" transform="rotate(-4 96 73)" />
            <circle cx="96" cy="73" r="6" fill="none" stroke="#D4A853" strokeWidth="1.2" transform="rotate(-4 96 73)" />
            {/* Official Purple Stamp: "SOMEHOW LOVELY" */}
            <rect x="88" y="90" width="46" height="15" fill="none" stroke="#A34063" strokeWidth="1.5" strokeDasharray="2,2" transform="rotate(-5 111 97)" />
            <text x="111" y="101" fill="#A34063" fontSize="6" fontWeight="bold" textAnchor="middle" transform="rotate(-5 111 97)">
              SOMEHOW LOVELY
            </text>
            {/* Sir Clack's Brass Counter Bell on the side */}
            <ellipse cx="170" cy="75" rx="10" ry="3" fill="#392F3B" opacity="0.3" />
            <path d="M 162 74 Q 170 58 178 74 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="1.5" />
            <rect x="169" y="55" width="2" height="4" fill="#C98F70" />
            <circle cx="170" cy="55" r="2" fill="#E8C878" />
          </g>

          {/* PIPKIN (Perched on the window sill holding the Special Celebration Edition) */}
          <g className="pipkin-epilogue" transform="translate(190, 130)">
            <ellipse cx="18" cy="42" rx="14" ry="12" fill="#88A991" stroke="#392F3B" strokeWidth="2" />
            <circle cx="24" cy="38" r="9" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.2" />
            <circle cx="28" cy="28" r="8" fill="#88A991" stroke="#392F3B" strokeWidth="1.8" />
            <circle cx="30" cy="27" r="3" fill="#392F3B" />
            <path d="M 34 28 L 44 31 L 34 34 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="1.2" />
            {/* Miniature Newspaper */}
            <rect x="8" y="24" width="20" height="24" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.2" transform="rotate(8 18 36)" />
            <text x="18" y="32" fill="#A34063" fontSize="3.5" fontWeight="bold" textAnchor="middle" transform="rotate(8 18 36)">
              SPECIAL EDITION
            </text>
            <text x="18" y="38" fill="#25324A" fontSize="2.8" textAnchor="middle" transform="rotate(8 18 36)">
              WORLD SAVED!
            </text>
          </g>

          {/* SIR CLACK (On the counter beside his scrapbook) */}
          <g className="clack-epilogue" transform="translate(270, 160)">
            <ellipse cx="30" cy="72" rx="28" ry="6" fill="#392F3B" opacity="0.3" />
            <rect x="5" y="28" width="50" height="42" rx="4" fill="#8F5D48" stroke="#252030" strokeWidth="2.5" />
            <rect x="12" y="30" width="6" height="8" rx="1" fill="#E8C878" stroke="#252030" strokeWidth="1" />
            <rect x="42" y="30" width="6" height="8" rx="1" fill="#E8C878" stroke="#252030" strokeWidth="1" />
            <path d="M 18 28 L 18 12 Q 30 6 42 12 L 42 28" fill="none" stroke="#63392A" strokeWidth="4" strokeLinecap="round" />
            {/* Proud, subtle little smile! */}
            <ellipse cx="20" cy="44" rx="3.5" ry="4" fill="#252030" />
            <ellipse cx="40" cy="44" rx="3.5" ry="4" fill="#252030" />
            {/* Softened eyebrows */}
            <line x1="16" y1="38" x2="24" y2="39" stroke="#252030" strokeWidth="2" strokeLinecap="round" />
            <line x1="44" y1="38" x2="36" y2="39" stroke="#252030" strokeWidth="2" strokeLinecap="round" />
            {/* Keyhole slot with gold ribbon */}
            <rect x="28" y="52" width="4" height="6" rx="1" fill="#E8C878" stroke="#252030" strokeWidth="1" />
            <path d="M 28 58 Q 30 66 35 68" fill="none" stroke="#E8C878" strokeWidth="1.5" />
          </g>

          {/* MORROW & THE UNFINISHED ONE (Right side of counter - happily together!) */}
          {/* The Unfinished One */}
          <g className="unfinished-epilogue" transform="translate(325, 140)">
            <ellipse cx="35" cy="88" rx="26" ry="6" fill="#392F3B" opacity="0.25" />
            <path
              d="M 25 45 Q 12 70 28 85 Q 48 95 58 80 Q 65 58 50 44 Q 36 36 25 45 Z"
              fill="#25324A"
              stroke="#1B1726"
              strokeWidth="2.2"
            />
            {/* Asymmetric ears */}
            <path d="M 28 42 Q 20 18 28 14 Q 34 22 34 40 Z" fill="#25324A" stroke="#1B1726" strokeWidth="1.8" />
            <path d="M 44 40 Q 55 20 62 26 Q 55 40 48 40 Z" fill="#25324A" stroke="#1B1726" strokeWidth="1.8" />
            {/* Glowing friendly eyes */}
            <circle cx="34" cy="52" r="3.5" fill="#E8C878" />
            <circle cx="48" cy="52" r="3.5" fill="#E8C878" />
            {/* Golden crooked knot */}
            <circle cx="40" cy="65" r="2.5" fill="#E8C878" />
          </g>

          {/* Morrow */}
          <g className="morrow-epilogue" transform="translate(365, 125)">
            <ellipse cx="45" cy="105" rx="32" ry="7" fill="#392F3B" opacity="0.25" />
            {/* Spool Tail wagging happily! */}
            <g transform="translate(62, 75) rotate(22)">
              <rect x="0" y="0" width="8" height="11" rx="2" fill="#8F5D48" stroke="#1B1726" strokeWidth="1.5" />
              <rect x="2" y="2" width="4" height="7" fill="#E8C878" />
              <path d="M 4 11 Q 8 20 16 22" fill="none" stroke="#E8C878" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            {/* Pear Body */}
            <path
              d="M 30 50 C 14 74 18 98 44 100 C 70 98 74 74 60 50 C 55 40 35 40 30 50 Z"
              fill="#C98F70"
              stroke="#1B1726"
              strokeWidth="2.4"
            />
            {/* Asymmetric ears */}
            <path d="M 32 40 Q 22 14 34 10 Q 40 22 38 38 Z" fill="#C98F70" stroke="#1B1726" strokeWidth="2" />
            <path d="M 52 40 Q 68 20 75 28 Q 68 42 58 42 Z" fill="#C98F70" stroke="#1B1726" strokeWidth="2" />
            {/* Forehead gold diamond */}
            <path d="M 44 34 L 46.5 37 L 44 40 L 41.5 37 Z" fill="#E8C878" stroke="#1B1726" strokeWidth="0.8" />
            {/* Button eyes */}
            <circle cx="38" cy="48" r="3.5" fill="#1B1726" />
            <circle cx="39" cy="47" r="1" fill="#FFF8F1" />
            <circle cx="52" cy="48" r="3.5" fill="#1B1726" />
            <circle cx="53" cy="47" r="1" fill="#FFF8F1" />
            {/* Happy open smile */}
            <path d="M 41 55 Q 45 60 49 55" fill="none" stroke="#1B1726" strokeWidth="1.8" strokeLinecap="round" />
            {/* Plum Scarf */}
            <path d="M 26 56 Q 44 62 62 56 Q 64 64 44 68 Q 24 64 26 56 Z" fill="#A34063" stroke="#1B1726" strokeWidth="2" />
            <path d="M 34 62 L 32 78 L 40 76 Z" fill="#A34063" stroke="#1B1726" strokeWidth="1.2" />
            {/* Mitten paws holding a tiny steaming teacup */}
            <ellipse cx="44" cy="74" rx="7" ry="5" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.5" />
            <path d="M 44 66 Q 42 61 44 58" fill="none" stroke="#E8C878" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
          </g>
        </svg>
      </div>

      <div className="storybook-scene-bottom">
        <span>Home, but different</span>
        <span>✦</span>
      </div>
    </section>
  );
};
