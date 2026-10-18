import React from 'react';

/**
 * Procedural Handcrafted Comic Panel SVG Artwork
 * 
 * Each panel is an authentic, layered SVG scene with character acting,
 * environment, tactile textures, and expressive poses matching the story bible.
 */

// Panel 1: Morrow Sleeping in Sewing Basket
export const Panel1Establish: React.FC = () => (
  <svg viewBox="0 0 400 480" className="comic-scene-svg" aria-label="Morrow sleeping peacefully curled in a sewing basket on the workbench">
    <defs>
      <linearGradient id="p1-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2A1B28" />
        <stop offset="45%" stopColor="#4A3036" />
        <stop offset="85%" stopColor="#7D4E3D" />
        <stop offset="100%" stopColor="#513023" />
      </linearGradient>
      <radialGradient id="p1-window-light" cx="0.8" cy="0.2" r="0.7">
        <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.45" />
        <stop offset="50%" stopColor="#E8C878" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#E8C878" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="p1-wood" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6C4533" />
        <stop offset="25%" stopColor="#875841" />
        <stop offset="50%" stopColor="#5F3A29" />
        <stop offset="75%" stopColor="#875841" />
        <stop offset="100%" stopColor="#5A3423" />
      </linearGradient>
      <linearGradient id="p1-basket" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#B38A56" />
        <stop offset="100%" stopColor="#75512B" />
      </linearGradient>
      <linearGradient id="p1-morrow-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F5CCA0" />
        <stop offset="100%" stopColor="#C98F70" />
      </linearGradient>
      <linearGradient id="p1-scarf" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8E79A8" />
        <stop offset="100%" stopColor="#A34063" />
      </linearGradient>
    </defs>

    {/* Background Workshop Wall */}
    <rect width="400" height="480" fill="url(#p1-bg)" />

    {/* Morning Window Sunlight Beam */}
    <polygon points="400,0 260,0 120,400 400,420" fill="url(#p1-window-light)" />
    
    {/* Floating Dust Motes */}
    <circle cx="280" cy="110" r="1.5" fill="#FFF8F1" opacity="0.6" />
    <circle cx="320" cy="160" r="2" fill="#E8C878" opacity="0.7" />
    <circle cx="230" cy="190" r="1" fill="#FFF8F1" opacity="0.5" />
    <circle cx="290" cy="240" r="2" fill="#E8C878" opacity="0.5" />

    {/* Wooden Workshop Shelf with Jars */}
    <rect x="0" y="80" width="180" height="14" rx="2" fill="#4B2E1E" stroke="#251610" strokeWidth="2" />
    <rect x="25" y="44" width="28" height="36" rx="4" fill="#C5D8D1" opacity="0.65" stroke="#392F3B" strokeWidth="2" />
    <rect x="29" y="40" width="20" height="6" rx="2" fill="#C98F70" stroke="#392F3B" strokeWidth="1.5" />
    <rect x="65" y="52" width="35" height="28" rx="3" fill="#E8C878" opacity="0.5" stroke="#392F3B" strokeWidth="2" />

    {/* Wooden Workbench Tabletop */}
    <rect x="0" y="320" width="400" height="160" fill="url(#p1-wood)" stroke="#302018" strokeWidth="4" />
    {/* Wood grain lines */}
    <line x1="0" y1="345" x2="400" y2="345" stroke="#482A1B" strokeWidth="2" opacity="0.5" />
    <line x1="0" y1="380" x2="400" y2="380" stroke="#482A1B" strokeWidth="2" opacity="0.4" />
    <line x1="0" y1="415" x2="400" y2="415" stroke="#482A1B" strokeWidth="2" opacity="0.5" />

    {/* Spools of Thread on Table */}
    <g transform="translate(45, 335)">
      <ellipse cx="20" cy="28" rx="16" ry="6" fill="#302018" opacity="0.3" />
      <rect x="10" y="10" width="20" height="18" fill="#88A991" stroke="#392F3B" strokeWidth="2" />
      <ellipse cx="20" cy="10" rx="14" ry="4" fill="#D7B58B" stroke="#392F3B" strokeWidth="1.5" />
      <ellipse cx="20" cy="28" rx="14" ry="4" fill="#88A991" stroke="#392F3B" strokeWidth="1.5" />
      {/* Loose thread line */}
      <path d="M 28 26 Q 50 40 75 35" fill="none" stroke="#88A991" strokeWidth="2" strokeDasharray="3 2" />
    </g>

    {/* Brass Thimble & Ruler */}
    <rect x="310" y="340" width="75" height="10" rx="1" fill="#D8A95B" stroke="#392F3B" strokeWidth="1.5" />
    <line x1="320" y1="340" x2="320" y2="344" stroke="#392F3B" strokeWidth="1" />
    <line x1="330" y1="340" x2="330" y2="346" stroke="#392F3B" strokeWidth="1" />
    <line x1="340" y1="340" x2="340" y2="344" stroke="#392F3B" strokeWidth="1" />
    <line x1="350" y1="340" x2="350" y2="346" stroke="#392F3B" strokeWidth="1" />
    <line x1="360" y1="340" x2="360" y2="344" stroke="#392F3B" strokeWidth="1" />
    <line x1="370" y1="340" x2="370" y2="346" stroke="#392F3B" strokeWidth="1" />

    {/* Sewing Basket Shadow */}
    <ellipse cx="215" cy="365" rx="100" ry="24" fill="#251610" opacity="0.45" />

    {/* Woven Wicker Basket Base */}
    <ellipse cx="215" cy="335" rx="95" ry="38" fill="url(#p1-basket)" stroke="#392F3B" strokeWidth="3.5" />
    {/* Wicker cross-hatch texture */}
    <path d="M 130 330 Q 215 350 300 330 M 140 340 Q 215 360 290 340 M 155 350 Q 215 368 275 350" fill="none" stroke="#5C3B1C" strokeWidth="2" opacity="0.6" />

    {/* Soft Velvet Fabric Scrap Bedding */}
    <path d="M 140 330 Q 180 345 230 340 Q 285 335 295 320 Q 280 300 215 305 Q 155 305 140 330 Z" fill="#673950" stroke="#392F3B" strokeWidth="2" />

    {/* SLEEPING MORROW CURLED UP */}
    <g className="sleeping-morrow" transform="translate(145, 220)">
      {/* Body curled */}
      <ellipse cx="70" cy="90" rx="46" ry="34" fill="url(#p1-morrow-body)" stroke="#392F3B" strokeWidth="3.5" />

      {/* Head resting to the side */}
      <circle cx="50" cy="72" r="32" fill="url(#p1-morrow-body)" stroke="#392F3B" strokeWidth="3.5" />

      {/* Forehead Gold Diamond Mark */}
      <path d="M 46 54 L 51 59 L 46 64 L 41 59 Z" fill="#E8C878" stroke="#A34063" strokeWidth="1.5" />

      {/* Asymmetrical Folded Petal Ears resting gently */}
      {/* Left ear */}
      <path d="M 32 60 Q 10 40 18 20 Q 34 26 40 48 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="3" />
      <path d="M 28 42 Q 20 28 22 24 Q 30 28 32 42 Z" fill="#E8C878" opacity="0.8" />
      {/* Right ear flopped over */}
      <path d="M 64 52 Q 88 35 98 46 Q 85 64 68 62 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="3" />
      <path d="M 74 50 Q 88 42 90 48 Q 82 56 72 56 Z" fill="#E8C878" opacity="0.8" />

      {/* Sleeping Closed Eyes (gentle upward crescent stitches) */}
      <path d="M 36 74 Q 41 78 46 74" fill="none" stroke="#392F3B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 54 75 Q 59 79 64 75" fill="none" stroke="#392F3B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Rosy Cheek Blush */}
      <ellipse cx="34" cy="80" rx="6" ry="4" fill="#A34063" opacity="0.3" />
      <ellipse cx="66" cy="81" rx="6" ry="4" fill="#A34063" opacity="0.3" />

      {/* Little Nose & Contented Sleeping Mouth */}
      <circle cx="49" cy="76" r="1.5" fill="#392F3B" />
      <path d="M 47 80 Q 50 82 53 80" fill="none" stroke="#392F3B" strokeWidth="1.8" strokeLinecap="round" />

      {/* Oversized Scarf Wrapped as a Cozy Blanket */}
      <path d="M 40 88 Q 72 82 104 90 Q 98 108 64 106 Q 44 104 40 88 Z" fill="url(#p1-scarf)" stroke="#392F3B" strokeWidth="3" />
      <line x1="55" y1="94" x2="65" y2="92" stroke="#E8C878" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="75" y1="92" x2="85" y2="93" stroke="#FFF8F1" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Scarf fringed tail drooping over basket */}
      <path d="M 96 96 Q 115 110 110 128 Q 98 126 92 104 Z" fill="#8E79A8" stroke="#392F3B" strokeWidth="2" />
      <line x1="100" y1="126" x2="100" y2="132" stroke="#E8C878" strokeWidth="1.5" />
      <line x1="104" y1="125" x2="105" y2="132" stroke="#E8C878" strokeWidth="1.5" />

      {/* Tucked mitten paw */}
      <ellipse cx="48" cy="98" rx="8" ry="6" fill="#C98F70" stroke="#392F3B" strokeWidth="2" />

      {/* Spool Tail peeking out behind body */}
      <ellipse cx="112" cy="88" rx="7" ry="5" fill="#E8C878" stroke="#392F3B" strokeWidth="1.5" />
      <line x1="112" y1="83" x2="112" y2="93" stroke="#A34063" strokeWidth="2" />

      {/* Gentle Zzz Floating */}
      <text x="80" y="35" fill="#FFF8F1" opacity="0.7" fontStyle="italic" fontWeight="bold" fontSize="16" fontFamily="Georgia, serif">z</text>
      <text x="96" y="22" fill="#E8C878" opacity="0.85" fontStyle="italic" fontWeight="bold" fontSize="20" fontFamily="Georgia, serif">Z</text>
    </g>
  </svg>
);

// Panel 2: The Brass Workshop Bell Close-up
export const Panel2Bell: React.FC = () => (
  <svg viewBox="0 0 360 400" className="comic-scene-svg" aria-label="Close-up of the brass counter bell ringing with sound waves">
    <defs>
      <radialGradient id="p2-bg" cx="0.5" cy="0.45" r="0.6">
        <stop offset="0%" stopColor="#FFF2D4" />
        <stop offset="60%" stopColor="#DFAD6E" />
        <stop offset="100%" stopColor="#7E4A2F" />
      </radialGradient>
      <linearGradient id="p2-brass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF5D6" />
        <stop offset="35%" stopColor="#E8C878" />
        <stop offset="70%" stopColor="#C9943B" />
        <stop offset="100%" stopColor="#7A4C18" />
      </linearGradient>
    </defs>

    <rect width="360" height="400" fill="url(#p2-bg)" />

    {/* Sound Wave Resonance Rings */}
    <circle cx="180" cy="195" r="115" fill="none" stroke="#E8C878" strokeWidth="4" opacity="0.4" strokeDasharray="12 8" />
    <circle cx="180" cy="195" r="145" fill="none" stroke="#FFF8F1" strokeWidth="3" opacity="0.5" strokeDasharray="16 10" />
    <circle cx="180" cy="195" r="170" fill="none" stroke="#A34063" strokeWidth="2.5" opacity="0.3" strokeDasharray="20 12" />

    {/* Counter Base Wooden Stand */}
    <ellipse cx="180" cy="275" rx="105" ry="24" fill="#392F3B" opacity="0.35" />
    <ellipse cx="180" cy="265" rx="95" ry="18" fill="#583522" stroke="#392F3B" strokeWidth="3.5" />
    <ellipse cx="180" cy="258" rx="85" ry="14" fill="#75472E" stroke="#392F3B" strokeWidth="2" />

    {/* Brass Bell Dome */}
    <path
      d="M 115 240 C 115 160 145 130 180 130 C 215 130 245 160 245 240 C 245 246 115 246 115 240 Z"
      fill="url(#p2-brass)"
      stroke="#392F3B"
      strokeWidth="4"
    />
    {/* Bell Highlight Curve */}
    <path d="M 145 160 Q 155 142 175 138" fill="none" stroke="#FFFDF5" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

    {/* Top Plunger / Clapper Button */}
    <rect x="175" y="112" width="10" height="20" rx="2" fill="#C9943B" stroke="#392F3B" strokeWidth="2.5" />
    <ellipse cx="180" cy="112" rx="14" ry="7" fill="url(#p2-brass)" stroke="#392F3B" strokeWidth="2.5" />

    {/* Vibration Marks */}
    <path d="M 85 175 Q 75 195 85 215" fill="none" stroke="#A34063" strokeWidth="4" strokeLinecap="round" />
    <path d="M 70 165 Q 55 195 70 225" fill="none" stroke="#392F3B" strokeWidth="3" strokeLinecap="round" />
    <path d="M 275 175 Q 285 195 275 215" fill="none" stroke="#A34063" strokeWidth="4" strokeLinecap="round" />
    <path d="M 290 165 Q 305 195 290 225" fill="none" stroke="#392F3B" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Panel 3: Morrow Startled Awake ("AH! A GIANT!")
export const Panel3Reaction: React.FC = () => (
  <svg viewBox="0 0 380 460" className="comic-scene-svg" aria-label="Morrow startled awake with wide eyes, paws in the air, scarf flying">
    <defs>
      <radialGradient id="p3-burst-glow" cx="0.5" cy="0.45" r="0.6">
        <stop offset="0%" stopColor="#FFF8E0" />
        <stop offset="45%" stopColor="#F9D494" />
        <stop offset="85%" stopColor="#E29555" />
        <stop offset="100%" stopColor="#A64B34" />
      </radialGradient>
      <linearGradient id="p3-morrow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FED8AF" />
        <stop offset="100%" stopColor="#C98F70" />
      </linearGradient>
    </defs>

    {/* Radiant Shock / Action Background */}
    <rect width="380" height="460" fill="url(#p3-burst-glow)" />

    {/* Dynamic Comic Action Sunburst Rays */}
    <g fill="#F2B76D" opacity="0.35">
      <polygon points="190,190 0,60 0,110" />
      <polygon points="190,190 0,180 0,230" />
      <polygon points="190,190 0,310 0,370" />
      <polygon points="190,190 70,460 130,460" />
      <polygon points="190,190 250,460 310,460" />
      <polygon points="190,190 380,350 380,290" />
      <polygon points="190,190 380,210 380,150" />
      <polygon points="190,190 380,80 340,0" />
      <polygon points="190,190 230,0 170,0" />
      <polygon points="190,190 100,0 40,0" />
    </g>

    {/* Floating / Bouncing Spool from surprise */}
    <g transform="translate(60, 240) rotate(-22)">
      <rect x="0" y="8" width="22" height="24" fill="#8E79A8" stroke="#392F3B" strokeWidth="2.5" />
      <ellipse cx="11" cy="8" rx="14" ry="5" fill="#E8C878" stroke="#392F3B" strokeWidth="2" />
      <ellipse cx="11" cy="32" rx="14" ry="5" fill="#E8C878" stroke="#392F3B" strokeWidth="2" />
      <path d="M 22 28 Q 45 40 50 65" fill="none" stroke="#A34063" strokeWidth="2" strokeDasharray="3 2" />
    </g>

    {/* STARTLED MORROW CHARACTER */}
    <g transform="translate(95, 45)">
      {/* Ground Contact Shadow vibrating */}
      <ellipse cx="95" cy="285" rx="60" ry="10" fill="#392F3B" opacity="0.2" />

      {/* Asymmetric Ears standing straight up in shock */}
      {/* Left Ear (spiked high with alarm zig-zag) */}
      <path d="M 60 95 Q 25 35 45 8 Q 70 18 82 72 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="4" />
      <path d="M 52 70 Q 40 40 48 24 Q 62 30 68 74 Z" fill="#E8C878" stroke="#A34063" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Right Ear (curved petal vibrating) */}
      <path d="M 120 85 Q 160 30 152 14 Q 132 50 115 88 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="4" />
      <path d="M 122 75 Q 146 42 142 26 Q 132 46 120 80 Z" fill="#E8C878" stroke="#A34063" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Pear Body jumping */}
      <path d="M 58 140 Q 25 185 52 235 Q 95 268 140 235 Q 168 185 136 140 Z" fill="url(#p3-morrow)" stroke="#392F3B" strokeWidth="4" />

      {/* Tiny Feet */}
      <path d="M 68 238 L 62 258 Q 70 262 76 258 L 80 238 Z" fill="#9A675E" stroke="#392F3B" strokeWidth="2.5" />
      <path d="M 122 238 L 128 258 Q 136 262 142 258 L 134 238 Z" fill="#9A675E" stroke="#392F3B" strokeWidth="2.5" />

      {/* Spool Tail curling high */}
      <path d="M 135 220 Q 185 210 180 180" fill="none" stroke="#8E79A8" strokeWidth="5" strokeDasharray="4 3" />
      <ellipse cx="180" cy="180" rx="9" ry="6" fill="#E8C878" stroke="#392F3B" strokeWidth="2" />
      <line x1="180" y1="174" x2="180" y2="186" stroke="#A34063" strokeWidth="3" />

      {/* Head */}
      <ellipse cx="96" cy="118" rx="58" ry="52" fill="url(#p3-morrow)" stroke="#392F3B" strokeWidth="4" />

      {/* Gold Diamond Stitched Forehead Mark */}
      <path d="M 96 82 L 102 88 L 96 94 L 90 88 Z" fill="#E8C878" stroke="#A34063" strokeWidth="2" />
      <circle cx="96" cy="88" r="1.5" fill="#392F3B" />

      {/* WIDE STARTLED BUTTON EYES */}
      {/* Left eye wide */}
      <ellipse cx="76" cy="116" rx="10" ry="12" fill="#392F3B" />
      <circle cx="79" cy="111" r="3.5" fill="#FFF8F1" />
      <line x1="72" y1="116" x2="80" y2="116" stroke="#FFF8F1" strokeWidth="1.5" opacity="0.6" />
      {/* Right eye wide */}
      <ellipse cx="118" cy="116" rx="10" ry="12" fill="#392F3B" />
      <circle cx="121" cy="111" r="3.5" fill="#FFF8F1" />
      <line x1="114" y1="116" x2="122" y2="116" stroke="#FFF8F1" strokeWidth="1.5" opacity="0.6" />

      {/* Eyebrows raised in shock */}
      <path d="M 68 98 Q 76 92 84 96" fill="none" stroke="#392F3B" strokeWidth="3" strokeLinecap="round" />
      <path d="M 110 96 Q 118 92 126 98" fill="none" stroke="#392F3B" strokeWidth="3" strokeLinecap="round" />

      {/* Startled Gasping Mouth ("O" shape) */}
      <ellipse cx="97" cy="140" rx="7" ry="10" fill="#392F3B" stroke="#A34063" strokeWidth="2" />
      <ellipse cx="97" cy="142" rx="3.5" ry="5" fill="#A34063" />

      {/* Startled Action Shock Lines around head */}
      <line x1="28" y1="75" x2="15" y2="65" stroke="#392F3B" strokeWidth="3" strokeLinecap="round" />
      <line x1="38" y1="50" x2="25" y2="38" stroke="#392F3B" strokeWidth="3" strokeLinecap="round" />
      <line x1="155" y1="75" x2="170" y2="65" stroke="#392F3B" strokeWidth="3" strokeLinecap="round" />
      <line x1="145" y1="50" x2="160" y2="38" stroke="#392F3B" strokeWidth="3" strokeLinecap="round" />

      {/* MITTEN ARMS THROWN UP IN ALARM */}
      {/* Left Arm raised */}
      <path d="M 52 165 Q 15 145 22 110" fill="none" stroke="#C98F70" strokeWidth="16" strokeLinecap="round" />
      <ellipse cx="22" cy="108" rx="9" ry="8" fill="#C98F70" stroke="#392F3B" strokeWidth="3" />
      <line x1="18" y1="108" x2="26" y2="108" stroke="#FFF8F1" strokeWidth="2" />

      {/* Right Arm raised with needle */}
      <path d="M 142 165 Q 175 145 170 110" fill="none" stroke="#C98F70" strokeWidth="16" strokeLinecap="round" />
      <ellipse cx="170" cy="108" rx="9" ry="8" fill="#C98F70" stroke="#392F3B" strokeWidth="3" />
      <line x1="166" y1="108" x2="174" y2="108" stroke="#FFF8F1" strokeWidth="2" />
      {/* Silver magic needle flying up */}
      <line x1="172" y1="110" x2="195" y2="80" stroke="#C5D8D1" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="193" cy="82" rx="3" ry="1.5" fill="#392F3B" />

      {/* FLUTTERING PATCHWORK SCARF */}
      <path d="M 50 155 Q 96 142 144 152 Q 138 174 94 168 Q 54 172 50 155 Z" fill="#8E79A8" stroke="#392F3B" strokeWidth="3.5" />
      {/* Scarf tail whipping left */}
      <path d="M 52 160 Q 20 185 10 215 Q 26 215 48 178 Z" fill="#A34063" stroke="#392F3B" strokeWidth="3" />
      {/* Scarf tail whipping right */}
      <path d="M 140 162 Q 175 180 185 205 Q 165 210 134 180 Z" fill="#6C5B83" stroke="#392F3B" strokeWidth="3" />
    </g>
  </svg>
);

// Panel 4: From Morrow's Point of View (Tiny Spool Looking Up at Giant Doorway Visitor)
export const Panel4GiantPOV: React.FC = () => (
  <svg viewBox="0 0 380 460" className="comic-scene-svg" aria-label="Worm's eye view from the workbench of a giant friendly customer at the workshop door">
    <defs>
      <linearGradient id="p4-door-light" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#FFF7D9" />
        <stop offset="40%" stopColor="#F7DF9E" />
        <stop offset="80%" stopColor="#D89D66" />
        <stop offset="100%" stopColor="#4A2F39" />
      </linearGradient>
      <linearGradient id="p4-spool" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#E8C878" />
        <stop offset="50%" stopColor="#FFF2D4" />
        <stop offset="100%" stopColor="#C9943B" />
      </linearGradient>
    </defs>

    {/* Workshop Wall Shadow */}
    <rect width="380" height="460" fill="#2C202B" />

    {/* Towering Workshop Door Frame */}
    <path d="M 70 460 L 70 80 Q 190 20 310 80 L 310 460 Z" fill="url(#p4-door-light)" stroke="#1F151E" strokeWidth="8" />

    {/* Distant Sunny Hillside Outside Door */}
    <ellipse cx="190" cy="380" rx="140" ry="70" fill="#88A991" opacity="0.4" />
    <circle cx="270" cy="120" r="30" fill="#FFFBE6" opacity="0.6" />

    {/* TOWERING FRIENDLY GIANT VISITOR SILHOUETTE IN THE SUNLIGHT */}
    <g className="giant-visitor" fill="#392A36">
      {/* Huge friendly coat / boots */}
      <path d="M 120 460 L 135 240 Q 190 215 245 240 L 260 460 Z" />
      {/* Giant arms leaning down warmly */}
      <path d="M 135 245 Q 100 290 120 340 L 140 330 Q 130 280 150 250 Z" />
      <path d="M 245 245 Q 280 290 260 340 L 240 330 Q 250 280 230 250 Z" />
      {/* Giant scarf / collar */}
      <ellipse cx="190" cy="210" rx="42" ry="22" fill="#4B3547" />
      {/* Giant round friendly head */}
      <circle cx="190" cy="165" r="36" />
      {/* Cozy travelling hat */}
      <path d="M 145 160 Q 190 135 235 160 Q 220 120 190 115 Q 160 120 145 160 Z" fill="#261A24" />
      <ellipse cx="190" cy="160" rx="48" ry="10" fill="#261A24" />
      {/* Warm curious eye shine */}
      <circle cx="178" cy="162" r="3" fill="#FFF8F1" opacity="0.9" />
      <circle cx="202" cy="162" r="3" fill="#FFF8F1" opacity="0.9" />
    </g>

    {/* FOREGROUND: WORM'S EYE VIEW OF WORKBENCH EDGE & ENORMOUS SPOOL */}
    <rect x="0" y="375" width="380" height="85" fill="#452718" stroke="#1F151E" strokeWidth="4" />

    {/* Enormous Foreground Wooden Spool (shows Morrow's tiny scale) */}
    <g transform="translate(15, 270)">
      <ellipse cx="45" cy="120" rx="45" ry="15" fill="#302018" opacity="0.4" />
      <rect x="15" y="25" width="60" height="90" fill="#A34063" stroke="#1F151E" strokeWidth="3" />
      <ellipse cx="45" cy="25" rx="45" ry="15" fill="url(#p4-spool)" stroke="#1F151E" strokeWidth="3.5" />
      <ellipse cx="45" cy="115" rx="45" ry="15" fill="url(#p4-spool)" stroke="#1F151E" strokeWidth="3.5" />
      <circle cx="45" cy="25" r="8" fill="#5F3C18" />
    </g>

    {/* Enormous Giant Needle leaning against the table */}
    <line x1="330" y1="460" x2="365" y2="240" stroke="#CBDDD6" strokeWidth="7" strokeLinecap="round" />
    <line x1="333" y1="460" x2="368" y2="240" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Panel 5: Two-Shot with Morrow and Sir Clack ("That is a visitor, you walnut.")
export const Panel5TwoShot: React.FC = () => (
  <svg viewBox="0 0 380 440" className="comic-scene-svg" aria-label="Sir Clack the toolbox looking dryly at Morrow, who is peeking curiously">
    <defs>
      <linearGradient id="p5-wood" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8F5D48" />
        <stop offset="50%" stopColor="#754734" />
        <stop offset="100%" stopColor="#552E1E" />
      </linearGradient>
    </defs>

    {/* Warm Workshop Wall Background */}
    <rect width="380" height="440" fill="#694C38" />
    <line x1="0" y1="315" x2="380" y2="315" stroke="#3A2315" strokeWidth="5" />
    <rect x="0" y="315" width="380" height="125" fill="#4D2E1D" />

    {/* MORROW (LEFT): Peeking out sheepishly with curiosity */}
    <g transform="translate(30, 95)">
      {/* Ground contact shadow */}
      <ellipse cx="70" cy="225" rx="48" ry="8" fill="#251610" opacity="0.3" />

      {/* Ears perked sideways */}
      <path d="M 45 75 Q 15 30 35 12 Q 55 25 65 65 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="3.5" />
      <path d="M 40 55 Q 26 34 34 22 Q 46 28 52 58 Z" fill="#E8C878" opacity="0.8" />
      <path d="M 85 68 Q 115 25 125 35 Q 105 60 90 75 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="3.5" />
      <path d="M 90 60 Q 110 38 114 42 Q 102 55 92 65 Z" fill="#E8C878" opacity="0.8" />

      {/* Pear Body */}
      <path d="M 42 125 Q 18 165 42 205 Q 75 228 108 205 Q 128 165 102 125 Z" fill="#F0C69C" stroke="#392F3B" strokeWidth="3.5" />

      {/* Little feet */}
      <path d="M 50 205 L 45 222 Q 52 225 58 222 L 60 205 Z" fill="#9A675E" stroke="#392F3B" strokeWidth="2" />
      <path d="M 90 205 L 94 222 Q 100 225 106 222 L 100 205 Z" fill="#9A675E" stroke="#392F3B" strokeWidth="2" />

      {/* Head */}
      <ellipse cx="74" cy="98" rx="46" ry="42" fill="#F0C69C" stroke="#392F3B" strokeWidth="3.5" />

      {/* Stitched diamond forehead mark */}
      <path d="M 74 72 L 79 77 L 74 82 L 69 77 Z" fill="#E8C878" stroke="#A34063" strokeWidth="1.5" />

      {/* Curious, Sheepish Eyes looking toward Clack */}
      <ellipse cx="60" cy="98" rx="7" ry="9" fill="#392F3B" />
      <circle cx="63" cy="95" r="2.5" fill="#FFF8F1" />
      <ellipse cx="94" cy="98" rx="7" ry="9" fill="#392F3B" />
      <circle cx="97" cy="95" r="2.5" fill="#FFF8F1" />

      {/* Blush */}
      <ellipse cx="50" cy="106" rx="7" ry="4" fill="#A34063" opacity="0.3" />
      <ellipse cx="102" cy="106" rx="7" ry="4" fill="#A34063" opacity="0.3" />

      {/* Sheepish mouth */}
      <path d="M 70 115 Q 75 118 80 114" fill="none" stroke="#392F3B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Scarf with front knot */}
      <path d="M 38 125 Q 74 116 110 125 Q 105 145 74 138 Q 38 142 38 125 Z" fill="#8E79A8" stroke="#392F3B" strokeWidth="3" />
      <path d="M 88 135 Q 108 145 102 170 Q 88 170 82 145 Z" fill="#A34063" stroke="#392F3B" strokeWidth="2.5" />

      {/* Mitten paws holding wooden bobbin */}
      <ellipse cx="46" cy="148" rx="7" ry="6" fill="#C98F70" stroke="#392F3B" strokeWidth="2" />
      <ellipse cx="88" cy="148" rx="7" ry="6" fill="#C98F70" stroke="#392F3B" strokeWidth="2" />
      <rect x="52" y="142" width="30" height="12" rx="2" fill="#E8C878" stroke="#392F3B" strokeWidth="1.5" />
    </g>

    {/* SIR CLACK (RIGHT): Sentient Antique Toolbox Mentor */}
    <g transform="translate(195, 115)">
      {/* Clack Shadow */}
      <ellipse cx="80" cy="205" rx="65" ry="12" fill="#251610" opacity="0.4" />

      {/* Toolbox Wooden Body */}
      <rect x="15" y="85" width="130" height="115" rx="8" fill="url(#p5-wood)" stroke="#392F3B" strokeWidth="4" />

      {/* Metal Corners & Rivets */}
      <path d="M 15 105 L 15 85 L 35 85" fill="none" stroke="#E8C878" strokeWidth="6" />
      <path d="M 145 105 L 145 85 L 125 85" fill="none" stroke="#E8C878" strokeWidth="6" />
      <path d="M 15 175 L 15 200 L 35 200" fill="none" stroke="#E8C878" strokeWidth="6" />
      <path d="M 145 175 L 145 200 L 125 200" fill="none" stroke="#E8C878" strokeWidth="6" />

      {/* Brass Carry Handle on Top */}
      <path d="M 45 85 L 45 45 Q 80 30 115 45 L 115 85" fill="none" stroke="#C98F70" strokeWidth="10" strokeLinecap="round" />
      <rect x="68" y="32" width="24" height="14" rx="4" fill="#E8C878" stroke="#392F3B" strokeWidth="2.5" />

      {/* Middle Drawer Seam */}
      <line x1="15" y1="140" x2="145" y2="140" stroke="#392F3B" strokeWidth="3.5" />

      {/* Grumpy Toolbox Eyes looking dryly at Morrow */}
      <ellipse cx="55" cy="115" rx="7" ry="10" fill="#392F3B" />
      <circle cx="53" cy="112" r="2.5" fill="#FFF8F1" />
      <ellipse cx="105" cy="115" rx="7" ry="10" fill="#392F3B" />
      <circle cx="103" cy="112" r="2.5" fill="#FFF8F1" />

      {/* Grumpy Diagonal Eyebrows */}
      <line x1="45" y1="102" x2="65" y2="108" stroke="#392F3B" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="115" y1="102" x2="95" y2="108" stroke="#392F3B" strokeWidth="4.5" strokeLinecap="round" />

      {/* Brass Keyhole Mouth / Mustache */}
      <rect x="75" y="118" width="10" height="12" rx="3" fill="#E8C878" stroke="#392F3B" strokeWidth="2" />
      <circle cx="80" cy="122" r="2.5" fill="#392F3B" />
      <line x1="80" y1="123" x2="80" y2="128" stroke="#392F3B" strokeWidth="2" />
      {/* Dry brass plate mustache line */}
      <path d="M 68 160 Q 80 155 92 160" fill="none" stroke="#E8C878" strokeWidth="4" strokeLinecap="round" />
    </g>
  </svg>
);

// Panel 6: Morrow Welcoming the Giant ("HELLO, POTENTIALLY POLITE GIANT!")
export const Panel6Hello: React.FC = () => (
  <svg viewBox="0 0 380 440" className="comic-scene-svg" aria-label="Morrow standing tall, waving enthusiastically with a friendly smile">
    <defs>
      <radialGradient id="p6-glow" cx="0.5" cy="0.4" r="0.65">
        <stop offset="0%" stopColor="#FFF8E8" />
        <stop offset="55%" stopColor="#F9DDB1" />
        <stop offset="100%" stopColor="#A86D7C" />
      </radialGradient>
      <linearGradient id="p6-morrow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FED8AF" />
        <stop offset="100%" stopColor="#C98F70" />
      </linearGradient>
    </defs>

    {/* Cheerful Rose/Gold Warm Background */}
    <rect width="380" height="440" fill="url(#p6-glow)" />

    {/* Sparkle Stars of Optimism */}
    <g fill="#FFFDF5" opacity="0.8">
      <path d="M 50 70 L 53 78 L 61 81 L 53 84 L 50 92 L 47 84 L 39 81 L 47 78 Z" />
      <path d="M 330 110 L 332 116 L 338 118 L 332 120 L 330 126 L 328 120 L 322 118 L 328 116 Z" />
      <circle cx="95" cy="140" r="2.5" />
      <circle cx="290" cy="80" r="2" />
    </g>

    {/* Workbench Surface */}
    <rect x="0" y="325" width="380" height="115" fill="#583827" stroke="#302018" strokeWidth="4" />

    {/* MORROW STANDING TALL & WAVING ENTHUSIASTICALLY */}
    <g transform="translate(110, 50)">
      {/* Ground shadow */}
      <ellipse cx="80" cy="280" rx="55" ry="9" fill="#251610" opacity="0.25" />

      {/* Asymmetric Ears perked with joy */}
      {/* Left Ear high and proud */}
      <path d="M 45 80 Q 15 25 35 5 Q 60 15 70 65 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="3.8" />
      <path d="M 40 60 Q 28 32 36 18 Q 50 24 56 60 Z" fill="#E8C878" stroke="#A34063" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Right Ear happily folded */}
      <path d="M 102 75 Q 138 32 148 42 Q 128 72 108 82 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="3.8" />
      <path d="M 108 68 Q 128 42 136 48 Q 122 66 112 75 Z" fill="#E8C878" stroke="#A34063" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Body standing tall */}
      <path d="M 45 135 Q 18 180 45 225 Q 80 252 115 225 Q 142 180 115 135 Z" fill="url(#p6-morrow)" stroke="#392F3B" strokeWidth="4" />

      {/* Standing Feet */}
      <path d="M 52 225 L 48 245 Q 56 248 62 245 L 64 225 Z" fill="#9A675E" stroke="#392F3B" strokeWidth="2.5" />
      <path d="M 96 225 L 100 245 Q 108 248 114 245 L 108 225 Z" fill="#9A675E" stroke="#392F3B" strokeWidth="2.5" />

      {/* Spool Tail waving happily */}
      <path d="M 112 210 Q 155 200 150 230" fill="none" stroke="#8E79A8" strokeWidth="5" strokeDasharray="4 3" />
      <ellipse cx="150" cy="230" rx="8" ry="6" fill="#E8C878" stroke="#392F3B" strokeWidth="2" />
      <line x1="150" y1="224" x2="150" y2="236" stroke="#A34063" strokeWidth="2.5" />

      {/* Head */}
      <ellipse cx="80" cy="108" rx="52" ry="46" fill="url(#p6-morrow)" stroke="#392F3B" strokeWidth="4" />

      {/* Forehead Gold Diamond */}
      <path d="M 80 80 L 86 86 L 80 92 L 74 86 Z" fill="#E8C878" stroke="#A34063" strokeWidth="1.8" />
      <circle cx="80" cy="86" r="1.5" fill="#392F3B" />

      {/* Big Friendly Black Button Eyes */}
      <ellipse cx="62" cy="108" rx="8" ry="10" fill="#392F3B" />
      <circle cx="65" cy="104" r="3" fill="#FFF8F1" />
      <line x1="58" y1="108" x2="66" y2="108" stroke="#FFF8F1" strokeWidth="1.2" opacity="0.6" />

      <ellipse cx="98" cy="108" rx="8" ry="10" fill="#392F3B" />
      <circle cx="101" cy="104" r="3" fill="#FFF8F1" />
      <line x1="94" y1="108" x2="102" y2="108" stroke="#FFF8F1" strokeWidth="1.2" opacity="0.6" />

      {/* Rosy Cheeks */}
      <ellipse cx="50" cy="118" rx="8" ry="5" fill="#A34063" opacity="0.3" />
      <ellipse cx="110" cy="118" rx="8" ry="5" fill="#A34063" opacity="0.3" />

      {/* Big Cheerful Smiling Mouth */}
      <path d="M 72 122 Q 80 134 88 122" fill="#A34063" stroke="#392F3B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Plum Scarf fluttering */}
      <path d="M 40 135 Q 80 126 120 135 Q 115 155 80 148 Q 40 152 40 135 Z" fill="#8E79A8" stroke="#392F3B" strokeWidth="3.5" />
      <path d="M 98 145 Q 125 155 120 185 Q 105 185 96 155 Z" fill="#A34063" stroke="#392F3B" strokeWidth="2.5" />

      {/* Left arm resting warmly */}
      <path d="M 45 155 Q 25 175 35 190" fill="none" stroke="#C98F70" strokeWidth="14" strokeLinecap="round" />
      <ellipse cx="35" cy="190" rx="7" ry="6" fill="#C98F70" stroke="#392F3B" strokeWidth="2" />

      {/* RIGHT ARM WAVING HIGH IN THE AIR */}
      <path d="M 115 150 Q 145 110 135 75" fill="none" stroke="#C98F70" strokeWidth="15" strokeLinecap="round" />
      <ellipse cx="134" cy="72" rx="9" ry="8" fill="#C98F70" stroke="#392F3B" strokeWidth="3" />
      <line x1="130" y1="72" x2="138" y2="72" stroke="#FFF8F1" strokeWidth="2" />

      {/* Friendly Waving Motion Arcs */}
      <path d="M 148 58 Q 155 72 148 86" fill="none" stroke="#392F3B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 158 52 Q 168 72 158 92" fill="none" stroke="#A34063" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// Panel 7: Pipkin Crashing In with "The Daily Panic" ("EMERGENCY! THE WORLD IS BROKEN!")
export const Panel7Pipkin: React.FC = () => (
  <svg viewBox="0 0 380 440" className="comic-scene-svg" aria-label="Pipkin the blue messenger bird crashing through with flying newspaper papers">
    <defs>
      <linearGradient id="p7-speed-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#DFEAE2" />
        <stop offset="60%" stopColor="#A8C9BF" />
        <stop offset="100%" stopColor="#6C8D84" />
      </linearGradient>
    </defs>

    {/* Kinetic Speed Background */}
    <rect width="380" height="440" fill="url(#p7-speed-bg)" />

    {/* Dramatic Dynamic Action Lines */}
    <g stroke="#392F3B" opacity="0.3" strokeWidth="2.5" strokeLinecap="round">
      <line x1="20" y1="60" x2="140" y2="160" />
      <line x1="10" y1="120" x2="110" y2="200" />
      <line x1="50" y1="20" x2="180" y2="130" />
      <line x1="240" y1="260" x2="360" y2="360" />
      <line x1="210" y1="300" x2="330" y2="400" />
    </g>

    {/* Flying Feathers in the Gust */}
    <path d="M 60 90 Q 75 70 85 95 Q 70 100 60 90 Z" fill="#88A991" stroke="#392F3B" strokeWidth="1.5" />
    <path d="M 120 40 Q 140 25 145 45 Q 130 55 120 40 Z" fill="#8E79A8" stroke="#392F3B" strokeWidth="1.5" />

    {/* FLYING NEWSPAPER: "THE DAILY PANIC - EXTRA! THE WORLD IS BROKEN" */}
    <g transform="translate(45, 175) rotate(-14)">
      <rect x="0" y="0" width="165" height="135" rx="3" fill="#FFF8E8" stroke="#392F3B" strokeWidth="4" />
      {/* Newspaper Masthead */}
      <rect x="10" y="10" width="145" height="24" fill="#392F3B" />
      <text x="82" y="27" fill="#FFF8E8" fontStyle="italic" fontWeight="900" fontSize="13" fontFamily="Georgia, serif" textAnchor="middle">THE DAILY PANIC</text>
      {/* Breaking Headline Banner */}
      <rect x="10" y="38" width="145" height="34" fill="#A34063" />
      <text x="82" y="54" fill="#FFF8E8" fontWeight="900" fontSize="13" fontFamily="Space Mono, monospace" textAnchor="middle">EXTRA! EXTRA!</text>
      <text x="82" y="67" fill="#FFF8E8" fontWeight="800" fontSize="10" fontFamily="sans-serif" textAnchor="middle">THE WORLD IS BROKEN</text>
      {/* Fake columns of frantic news text */}
      <line x1="12" y1="80" x2="78" y2="80" stroke="#392F3B" strokeWidth="2" />
      <line x1="12" y1="87" x2="75" y2="87" stroke="#392F3B" strokeWidth="2" />
      <line x1="12" y1="94" x2="70" y2="94" stroke="#392F3B" strokeWidth="2" />
      <line x1="88" y1="80" x2="152" y2="80" stroke="#392F3B" strokeWidth="2" />
      <line x1="88" y1="87" x2="148" y2="87" stroke="#392F3B" strokeWidth="2" />
      <line x1="88" y1="94" x2="145" y2="94" stroke="#392F3B" strokeWidth="2" />
    </g>

    {/* PIPKIN: Panicked Blue Courier Bird Flapping in Mid-Air */}
    <g transform="translate(170, 70) rotate(12)">
      {/* Tail feathers flapping */}
      <path d="M 40 115 L 12 105 L 18 130 Z" fill="#8E79A8" stroke="#392F3B" strokeWidth="3" />

      {/* Round Blue-Sage Body */}
      <ellipse cx="85" cy="110" rx="46" ry="40" fill="#88A991" stroke="#392F3B" strokeWidth="4" />

      {/* Fluffy White Chest */}
      <circle cx="102" cy="105" r="30" fill="#FFF8F1" stroke="#392F3B" strokeWidth="3" />

      {/* Flapping Wings in Motion */}
      <path d="M 75 90 Q 50 40 85 30 Q 95 65 85 95 Z" fill="#6A8F74" stroke="#392F3B" strokeWidth="3.5" />

      {/* Head */}
      <circle cx="118" cy="78" r="28" fill="#88A991" stroke="#392F3B" strokeWidth="4" />

      {/* HUGE PANICKED BIRD EYES */}
      <circle cx="122" cy="72" r="11" fill="#FFF8F1" stroke="#392F3B" strokeWidth="3" />
      <circle cx="123" cy="72" r="5" fill="#392F3B" />
      <circle cx="125" cy="70" r="2" fill="#FFF8F1" />

      {/* Open Beak Squawking Headlines */}
      <path d="M 136 74 L 165 70 L 138 86 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="3" />
      <path d="M 140 86 L 158 92 L 136 94 Z" fill="#C9943B" stroke="#392F3B" strokeWidth="2.5" />

      {/* Leather Courier Satchel */}
      <rect x="70" y="112" width="36" height="26" rx="5" fill="#C98F70" stroke="#392F3B" strokeWidth="2.5" />
      <line x1="56" y1="92" x2="80" y2="116" stroke="#A34063" strokeWidth="3.5" />

      {/* Claws tucked in flight */}
      <path d="M 78 145 L 75 160 M 94 145 L 94 160" stroke="#392F3B" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  </svg>
);

// Panel 8: Comedic Pause ("Which part?")
export const Panel8Pause: React.FC = () => (
  <svg viewBox="0 0 380 440" className="comic-scene-svg" aria-label="A deadpan silent beat with Sir Clack and Morrow staring at the news">
    <defs>
      <radialGradient id="p8-bg" cx="0.5" cy="0.5" r="0.6">
        <stop offset="0%" stopColor="#FFF2DC" />
        <stop offset="60%" stopColor="#D5C5B5" />
        <stop offset="100%" stopColor="#7E7079" />
      </radialGradient>
    </defs>

    <rect width="380" height="440" fill="url(#p8-bg)" />

    {/* Comedic Tension Ellipsis */}
    <g fill="#392F3B" opacity="0.35">
      <circle cx="140" cy="75" r="10" />
      <circle cx="190" cy="75" r="10" />
      <circle cx="240" cy="75" r="10" />
    </g>

    {/* Workbench */}
    <rect x="0" y="310" width="380" height="130" fill="#583827" stroke="#302018" strokeWidth="4" />

    {/* SIR CLACK WITH CRACKED-OPEN LID & SKEPTICAL WOODEN BROW */}
    <g transform="translate(130, 110)">
      {/* Clack Shadow */}
      <ellipse cx="65" cy="195" rx="60" ry="10" fill="#251610" opacity="0.35" />

      {/* Slightly opened lid angle */}
      <path d="M 10 70 L 120 58 L 125 78 L 15 88 Z" fill="#A8745A" stroke="#392F3B" strokeWidth="3.5" />

      {/* Main Base */}
      <rect x="15" y="85" width="105" height="95" rx="6" fill="#754734" stroke="#392F3B" strokeWidth="4" />

      {/* Brass corners */}
      <path d="M 15 105 L 15 85 L 35 85" fill="none" stroke="#E8C878" strokeWidth="5" />
      <path d="M 120 105 L 120 85 L 100 85" fill="none" stroke="#E8C878" strokeWidth="5" />

      {/* Eyes staring blankly */}
      <ellipse cx="50" cy="115" rx="6" ry="9" fill="#392F3B" />
      <circle cx="48" cy="112" r="2" fill="#FFF8F1" />
      <ellipse cx="85" cy="115" rx="6" ry="9" fill="#392F3B" />
      <circle cx="83" cy="112" r="2" fill="#FFF8F1" />

      {/* Extremely deadpan straight flat eyebrows */}
      <line x1="40" y1="104" x2="60" y2="104" stroke="#392F3B" strokeWidth="4" strokeLinecap="round" />
      <line x1="75" y1="104" x2="95" y2="104" stroke="#392F3B" strokeWidth="4" strokeLinecap="round" />

      {/* Brass Mustache / Plate */}
      <rect x="62" y="124" width="10" height="8" rx="2" fill="#E8C878" stroke="#392F3B" strokeWidth="2" />
      <line x1="56" y1="145" x2="78" y2="145" stroke="#E8C878" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  </svg>
);

// Panel 9: The Open Workshop Doorway into Adventure ("YES.")
export const Panel9Exit: React.FC = () => (
  <svg viewBox="0 0 380 460" className="comic-scene-svg" aria-label="Morrow standing at the open workshop door, stepping out with needle and golden thread into the adventure">
    <defs>
      <linearGradient id="p9-outside-world" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6C84A3" />
        <stop offset="30%" stopColor="#9AB0C4" />
        <stop offset="65%" stopColor="#C9D6B9" />
        <stop offset="100%" stopColor="#DFE7D0" />
      </linearGradient>
    </defs>

    {/* Workshop Interior Shadows */}
    <rect width="380" height="460" fill="#2C212B" />

    {/* The Grand Open Archway Door to the Outer Fantasy World */}
    <path d="M 85 460 L 85 110 Q 190 40 295 110 L 295 460 Z" fill="url(#p9-outside-world)" stroke="#1A121A" strokeWidth="8" />

    {/* Strange Rolling Hills of Lost Shadows Village outside */}
    <path d="M 85 360 Q 150 320 220 345 Q 260 360 295 340 L 295 460 L 85 460 Z" fill="#75937F" />
    <path d="M 140 380 Q 210 350 295 385 L 295 460 L 140 460 Z" fill="#587A65" />

    {/* Distant quirky crooked towers */}
    <polygon points="120,320 128,260 136,320" fill="#4B6856" />
    <polygon points="250,335 258,280 266,335" fill="#4B6856" />

    {/* Long Mysterious Shadows Cast Inward into Workshop Floor */}
    <polygon points="125,460 170,410 185,460" fill="#181119" opacity="0.6" />
    <polygon points="190,460 220,390 240,460" fill="#181119" opacity="0.6" />

    {/* MORROW AT THE THRESHOLD STEPPING FORWARD */}
    <g transform="translate(140, 260)">
      {/* Shadow */}
      <ellipse cx="45" cy="155" rx="36" ry="8" fill="#181119" opacity="0.5" />

      {/* Trailing Magic Golden Thread */}
      <path d="M -40 145 Q 10 160 30 135 Q 50 110 52 95" fill="none" stroke="#E8C878" strokeWidth="3" strokeDasharray="4 3" />
      <circle cx="-40" cy="145" r="4" fill="#E8C878" />

      {/* Determined pear body */}
      <path d="M 22 75 Q 5 105 22 135 Q 45 152 70 135 Q 85 105 70 75 Z" fill="#F0C69C" stroke="#392F3B" strokeWidth="3.5" />

      {/* Stepping forward foot */}
      <path d="M 28 135 L 25 150 Q 32 154 38 150 L 40 135 Z" fill="#9A675E" stroke="#392F3B" strokeWidth="2" />
      <path d="M 58 135 L 65 148 Q 72 152 78 148 L 72 135 Z" fill="#9A675E" stroke="#392F3B" strokeWidth="2" />

      {/* Spool tail */}
      <ellipse cx="14" cy="138" rx="6" ry="4" fill="#E8C878" stroke="#392F3B" strokeWidth="1.5" />

      {/* Scarf fluttering behind into the workshop */}
      <path d="M 22 78 Q 50 72 75 80 Q 70 94 45 90 Q 22 92 22 78 Z" fill="#8E79A8" stroke="#392F3B" strokeWidth="2.5" />
      <path d="M 20 82 Q -5 95 0 118 Q 15 116 26 94 Z" fill="#A34063" stroke="#392F3B" strokeWidth="2" />

      {/* Head facing forward towards the adventure */}
      <ellipse cx="50" cy="62" rx="34" ry="30" fill="#F0C69C" stroke="#392F3B" strokeWidth="3.5" />

      {/* Determined eyes looking out */}
      <ellipse cx="44" cy="62" rx="5" ry="7" fill="#392F3B" />
      <circle cx="46" cy="59" r="2" fill="#FFF8F1" />
      <ellipse cx="68" cy="62" rx="5" ry="7" fill="#392F3B" />
      <circle cx="70" cy="59" r="2" fill="#FFF8F1" />

      {/* Forehead gold mark */}
      <path d="M 52 42 L 56 46 L 52 50 L 48 46 Z" fill="#E8C878" stroke="#A34063" strokeWidth="1.2" />

      {/* Asymmetric ears perked toward tomorrow */}
      <path d="M 30 46 Q 10 15 24 2 Q 40 12 45 40 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="3" />
      <path d="M 65 44 Q 90 18 96 26 Q 84 48 70 54 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="3" />

      {/* Determined smile */}
      <path d="M 52 72 Q 58 76 64 72" fill="none" stroke="#392F3B" strokeWidth="2.2" strokeLinecap="round" />

      {/* Hand holding the silver needle forward */}
      <line x1="68" y1="88" x2="95" y2="78" stroke="#CBDDD6" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="68" cy="88" rx="5" ry="4" fill="#C98F70" stroke="#392F3B" strokeWidth="1.5" />

      {/* PIPKIN perched on Morrow's shoulder */}
      <g transform="translate(10, 40) scale(0.65)">
        <ellipse cx="20" cy="25" rx="16" ry="14" fill="#88A991" stroke="#392F3B" strokeWidth="2.5" />
        <circle cx="28" cy="18" r="10" fill="#88A991" stroke="#392F3B" strokeWidth="2.5" />
        <circle cx="30" cy="16" r="4" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.5" />
        <circle cx="31" cy="16" r="1.5" fill="#392F3B" />
        <path d="M 36 17 L 46 19 L 36 23 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="1.5" />
      </g>
    </g>
  </svg>
);
