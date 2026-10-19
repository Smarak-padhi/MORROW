import React, { useState } from 'react';
import { StopMotionActor } from './StopMotionActor';
import { Morrow } from './Morrow';
import { SirClack, Pipkin } from './SupportingCast';

export interface EpilogueStageProps {
  dialog?: number;
  playChime?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

/**
 * EpilogueStage: The Almost-Right Repair Shop
 * Handcrafted miniature stop-motion artisan workshop at golden morning hour.
 * Features full character ensemble: Morrow & The Unfinished One side-by-side,
 * Sir Clack beside his open scrapbook, Pipkin on the sunny windowsill,
 * Professor Perfect observing with an approving nod, and Duck resting outside in the meadow.
 */
export const EpilogueStage: React.FC<EpilogueStageProps> = ({
  dialog: _dialog = 0,
  playChime = () => {},
  isMuted: _isMuted = true,
  onToggleMute: _onToggleMute,
}) => {
  const [activeSpeech, setActiveSpeech] = useState<string | null>(null);

  const handleCharacterClick = (speaker: string) => {
    playChime();
    setActiveSpeech((prev) => (prev === speaker ? null : speaker));
  };

  return (
    <section
      className="epilogue-stage-bespoke storybook-stage-container"
      aria-label="The Almost-Right Repair Shop at sunrise with Morrow, The Unfinished One, Sir Clack, Pipkin, Professor Perfect, and Duck"
    >
      <div className="epilogue-theatre-plate storybook-stage">
        {/* Dynamic Warm Morning Atmosphere & Volumetric Sunbeams */}
        <div className="storybook-sky epilogue-sunlit-sky" aria-hidden="true">
          <div className="epilogue-warm-sun-wash" />
          {/* Floating morning dust motes */}
          <div className="epilogue-dust-motes" aria-hidden="true">
            <span style={{ position: 'absolute', top: '25%', left: '22%', color: '#F7D560', fontSize: '11px', opacity: 0.7 }}>✧</span>
            <span style={{ position: 'absolute', top: '38%', left: '46%', color: '#FFF8F1', fontSize: '13px', opacity: 0.8 }}>✦</span>
            <span style={{ position: 'absolute', top: '18%', left: '68%', color: '#F7D560', fontSize: '10px', opacity: 0.65 }}>✧</span>
            <span style={{ position: 'absolute', top: '52%', left: '35%', color: '#FFF8F1', fontSize: '9px', opacity: 0.7 }}>✦</span>
            <span style={{ position: 'absolute', top: '44%', left: '78%', color: '#F7D560', fontSize: '12px', opacity: 0.75 }}>✧</span>
          </div>
        </div>

        <div className="storybook-scene-label">
          <span>EPILOGUE · 06 / 06</span>
          <span style={{ marginLeft: 'auto', font: "700 0.68rem 'Space Mono', monospace", color: '#E8C878' }}>
            ✦ The World Approved
          </span>
        </div>

        {/* =========================================================================
            WORKSHOP ARCHITECTURE & ENVIRONMENT (SVG 960x540 multiplane depth stage)
           ========================================================================= */}
        <div className="stage-svg-wrap">
          <svg
            viewBox="0 0 960 540"
            preserveAspectRatio="xMidYMid slice"
            className="stage-svg-art epilogue-architecture-svg"
            role="img"
            aria-label="Handcrafted scene of the Almost-Right Repair Shop at sunrise with wooden workbench, sunny arched window, shelves of spools, and Sir Clack's open scrapbook"
          >
            <defs>
              <linearGradient id="epilogue-wall-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF2D6" />
                <stop offset="45%" stopColor="#F7E2B5" />
                <stop offset="100%" stopColor="#E2C194" />
              </linearGradient>

              <linearGradient id="epilogue-timber-dark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#553022" />
                <stop offset="50%" stopColor="#3E2016" />
                <stop offset="100%" stopColor="#25120B" />
              </linearGradient>

              <linearGradient id="epilogue-workbench-wood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9C6B52" />
                <stop offset="35%" stopColor="#7E4F39" />
                <stop offset="100%" stopColor="#4A2B1D" />
              </linearGradient>

              <linearGradient id="epilogue-sunbeam-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#F7D560" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#E8C878" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="epilogue-brass-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F7D560" />
                <stop offset="50%" stopColor="#D4A853" />
                <stop offset="100%" stopColor="#8C6527" />
              </linearGradient>

              <radialGradient id="epilogue-contact-blur" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1B120C" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#1B120C" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#1B120C" stopOpacity="0" />
              </radialGradient>

              <filter id="epilogue-soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" />
              </filter>
            </defs>

            {/* Warm plaster wall with aged timber panelling */}
            <rect width="960" height="540" fill="url(#epilogue-wall-grad)" />

            {/* Ceiling Timber Beams & Hanging Workshop Crafts */}
            <g className="workshop-ceiling-beams">
              <rect x="0" y="0" width="960" height="24" fill="url(#epilogue-timber-dark)" />
              <rect x="180" y="0" width="28" height="85" fill="url(#epilogue-timber-dark)" />
              <rect x="520" y="0" width="28" height="85" fill="url(#epilogue-timber-dark)" />
              <rect x="820" y="0" width="28" height="85" fill="url(#epilogue-timber-dark)" />

              {/* Hanging bundle of dried lavender & sage on Beam 1 */}
              <g transform="translate(194, 85)">
                <line x1="0" y1="0" x2="0" y2="18" stroke="#E8C878" strokeWidth="1.2" />
                <path d="M -5 18 Q 0 42 0 46 Q 0 42 5 18 Z" fill="#88A991" />
                <circle cx="-2" cy="28" r="2.5" fill="#8E79A8" />
                <circle cx="2" cy="34" r="2.5" fill="#8E79A8" />
                <circle cx="0" cy="42" r="2" fill="#8E79A8" />
              </g>

              {/* Dangling brass gear windchime on Beam 2 */}
              <g transform="translate(534, 85)">
                <line x1="0" y1="0" x2="0" y2="24" stroke="#E8C878" strokeWidth="1.2" />
                <circle cx="0" cy="30" r="8" fill="none" stroke="url(#epilogue-brass-grad)" strokeWidth="3" strokeDasharray="3,2" />
                <line x1="-4" y1="38" x2="-4" y2="52" stroke="url(#epilogue-brass-grad)" strokeWidth="1.5" />
                <line x1="4" y1="38" x2="4" y2="48" stroke="url(#epilogue-brass-grad)" strokeWidth="1.5" />
              </g>
            </g>

            {/* =========================================================================
                LARGE SUNLIT ARCHED WORKSHOP WINDOW (Center-Left: 220 to 480)
               ========================================================================= */}
            <g className="workshop-arched-window" transform="translate(220, 45)">
              {/* Outer Deep Wooden Window Sill & Arched Casing */}
              <path
                d="M 0 90 Q 130 -30 260 90 L 260 260 L 0 260 Z"
                fill="#2A1C13"
                stroke="#1B120B"
                strokeWidth="6"
              />
              {/* Sunny Meadow View Outside Window */}
              <path
                d="M 6 92 Q 130 -22 254 92 L 254 254 L 6 254 Z"
                fill="#94C5E0"
              />
              {/* Distant Sunny Rolling Hills & Forest Trees */}
              <path
                d="M 6 185 Q 120 150 254 180 L 254 254 L 6 254 Z"
                fill="#587A5E"
              />
              <path
                d="M 6 205 Q 140 180 254 200 L 254 254 L 6 254 Z"
                fill="#7E9A82"
              />

              {/* DUCK SLEEPING UNDER THE 200-YEAR OAK TREE SHADOW (Outside in Garden) */}
              <g className="duck-in-meadow" transform="translate(70, 155)">
                {/* Impossible Oak Tree Shadow Spreading Over the Meadow */}
                <path
                  d="M 35 45 Q 25 25 18 -10 Q -8 -30 -2 -60 Q 30 -90 65 -65 Q 85 -35 55 -15 Q 42 20 35 45 Z"
                  fill="#243828"
                  opacity="0.8"
                />
                {/* Cream Felt Duck Sleeping Happily */}
                <ellipse cx="36" cy="45" rx="18" ry="12" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.8" />
                <circle cx="48" cy="38" r="9" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.8" />
                <path d="M 55 40 L 63 43 L 55 46 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="1.2" />
                {/* Sage neckerchief */}
                <rect x="42" y="41" width="7" height="12" rx="1.5" fill="#88A991" stroke="#392F3B" strokeWidth="1" />
                {/* Closed sleepy eye (contented crescent) */}
                <path d="M 46 37 Q 49 40 52 37" fill="none" stroke="#392F3B" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              {/* Window Mullions / Wooden Panes */}
              <line x1="130" y1="10" x2="130" y2="254" stroke="#4A3425" strokeWidth="5" />
              <line x1="6" y1="165" x2="254" y2="165" stroke="#4A3425" strokeWidth="5" />

              {/* Solid Heavy Wooden Window Sill Shelf (Where Pipkin sits) */}
              <rect x="-14" y="254" width="288" height="20" rx="3" fill="#6A4532" stroke="#25120B" strokeWidth="2.5" />
            </g>

            {/* VOLUMETRIC MORNING SUNBEAM (Streaming Across from Window to Workbench) */}
            <polygon
              points="220,60 480,60 760,540 280,540"
              fill="url(#epilogue-sunbeam-grad)"
              style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}
            />

            {/* =========================================================================
                ARTISAN WORKSHOP SHELVING (Left & Right Walls)
               ========================================================================= */}
            {/* Left Shelving Unit (Behind Professor Perfect) */}
            <g className="workshop-shelves-left" transform="translate(15, 90)">
              <rect x="0" y="0" width="16" height="280" fill="url(#epilogue-timber-dark)" />
              <rect x="135" y="0" width="16" height="280" fill="url(#epilogue-timber-dark)" />
              {/* Shelf 1 */}
              <rect x="0" y="70" width="150" height="12" rx="2" fill="url(#epilogue-workbench-wood)" stroke="#25120B" strokeWidth="1.5" />
              {/* Glass jar of golden buttons */}
              <rect x="25" y="42" width="22" height="28" rx="4" fill="#E8DEC8" stroke="#392F3B" strokeWidth="1.2" opacity="0.85" />
              <circle cx="36" cy="56" r="3" fill="#F7D560" />
              <circle cx="36" cy="64" r="2.5" fill="#E8C878" />
              {/* Stack of parchment books with ribbon bookmarks */}
              <rect x="65" y="48" width="55" height="10" rx="1.5" fill="#A34063" stroke="#25120B" strokeWidth="1" />
              <rect x="62" y="58" width="60" height="12" rx="1.5" fill="#25324A" stroke="#25120B" strokeWidth="1" />
              {/* Shelf 2 */}
              <rect x="0" y="170" width="150" height="12" rx="2" fill="url(#epilogue-workbench-wood)" stroke="#25120B" strokeWidth="1.5" />
              {/* Spool rack of embroidery threads */}
              <rect x="22" y="146" width="14" height="24" rx="2" fill="#8F5D48" stroke="#25120B" strokeWidth="1" />
              <rect x="24" y="150" width="10" height="16" fill="#F7D560" />
              <rect x="42" y="146" width="14" height="24" rx="2" fill="#8F5D48" stroke="#25120B" strokeWidth="1" />
              <rect x="44" y="150" width="10" height="16" fill="#A34063" />
              <rect x="62" y="146" width="14" height="24" rx="2" fill="#8F5D48" stroke="#25120B" strokeWidth="1" />
              <rect x="64" y="150" width="10" height="16" fill="#88A991" />
              {/* Pinned handwritten craft label */}
              <rect x="88" y="152" width="46" height="16" rx="2" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1" />
              <text x="111" y="163" fill="#A34063" fontSize="6.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.04em">
                TO BE LOVED
              </text>
            </g>

            {/* Right Shelving Unit (Clockwork Parts & Ceramic Pots) */}
            <g className="workshop-shelves-right" transform="translate(805, 90)">
              <rect x="0" y="0" width="16" height="280" fill="url(#epilogue-timber-dark)" />
              <rect x="125" y="0" width="16" height="280" fill="url(#epilogue-timber-dark)" />
              {/* Shelf 1 */}
              <rect x="0" y="90" width="140" height="12" rx="2" fill="url(#epilogue-workbench-wood)" stroke="#25120B" strokeWidth="1.5" />
              {/* Needle-felted flower pot */}
              <path d="M 28 90 L 32 68 L 52 68 L 56 90 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="1.2" />
              <circle cx="42" cy="58" r="9" fill="#A34063" stroke="#392F3B" strokeWidth="1" />
              <circle cx="42" cy="58" r="3.5" fill="#F7D560" />
              {/* Miniature restored clock model */}
              <circle cx="85" cy="68" r="16" fill="#25324A" stroke="url(#epilogue-brass-grad)" strokeWidth="2.5" />
              <circle cx="85" cy="68" r="3" fill="#F7D560" />
              <line x1="85" y1="68" x2="85" y2="58" stroke="#FFF8F1" strokeWidth="1.5" />
              <line x1="85" y1="68" x2="93" y2="68" stroke="#FFF8F1" strokeWidth="1.5" />
            </g>

            {/* =========================================================================
                MASSIVE SOLID TIMBER WORKBENCH (Lower Countertop Across Base)
               ========================================================================= */}
            <path
              d="M -20 330 L 980 330 L 980 540 L -20 540 Z"
              fill="url(#epilogue-workbench-wood)"
              stroke="#25120B"
              strokeWidth="4"
            />
            {/* Workbench Front Bevel Highlight */}
            <line x1="-20" y1="332" x2="980" y2="332" stroke="#DDB095" strokeWidth="3" opacity="0.6" />
            <line x1="-20" y1="346" x2="980" y2="346" stroke="#25120B" strokeWidth="2" opacity="0.45" />

            {/* =========================================================================
                SIR CLACK'S OPEN SCRAPBOOK (Center-Left of Workbench: x=360, y=320)
               ========================================================================= */}
            <g className="open-scrapbook-display" transform="translate(350, 318)">
              {/* Contact shadow */}
              <ellipse cx="110" cy="115" rx="130" ry="22" fill="url(#epilogue-contact-blur)" />

              {/* Distressed leather binding cover */}
              <path
                d="M 0 75 Q 110 88 220 75 L 226 102 Q 110 114 -6 102 Z"
                fill="#553022"
                stroke="#25120B"
                strokeWidth="2.5"
              />
              {/* Left Page (Cream pressed linen paper) */}
              <path
                d="M 12 68 Q 110 56 110 68 L 110 148 Q 12 156 12 148 Z"
                fill="#FFF8F1"
                stroke="#392F3B"
                strokeWidth="1.8"
              />
              {/* Right Page */}
              <path
                d="M 110 68 Q 110 56 208 68 L 208 148 Q 110 156 110 148 Z"
                fill="#FFF8F1"
                stroke="#392F3B"
                strokeWidth="1.8"
              />

              {/* Center Binding Thread Stitches */}
              <line x1="110" y1="68" x2="110" y2="148" stroke="#A34063" strokeWidth="2" strokeDasharray="4,3" />

              {/* Pinned Polaroid 1: Duck with Tree Shadow */}
              <g transform="translate(24, 76) rotate(-5)">
                <rect x="0" y="0" width="34" height="40" fill="#FAF6EE" stroke="#392F3B" strokeWidth="1.2" />
                <rect x="4" y="4" width="26" height="24" fill="#7E9A82" />
                <circle cx="17" cy="16" r="6" fill="#FFF8F1" />
                {/* Brass pushpin */}
                <circle cx="17" cy="2" r="2.5" fill="#E8C878" stroke="#392F3B" strokeWidth="0.8" />
              </g>

              {/* Pinned Polaroid 2: Inverted Umbrella Bloom */}
              <g transform="translate(68, 80) rotate(4)">
                <rect x="0" y="0" width="34" height="40" fill="#FAF6EE" stroke="#392F3B" strokeWidth="1.2" />
                <rect x="4" y="4" width="26" height="24" fill="#25324A" />
                <path d="M 10 20 Q 17 26 24 20" fill="none" stroke="#F7D560" strokeWidth="2" />
                <circle cx="17" cy="2" r="2.5" fill="#A34063" stroke="#392F3B" strokeWidth="0.8" />
              </g>

              {/* Pinned Polaroid 3: Clock Ticking 4:03 */}
              <g transform="translate(122, 78) rotate(-3)">
                <rect x="0" y="0" width="34" height="40" fill="#FAF6EE" stroke="#392F3B" strokeWidth="1.2" />
                <rect x="4" y="4" width="26" height="24" fill="#FFF8F1" />
                <circle cx="17" cy="16" r="9" fill="none" stroke="url(#epilogue-brass-grad)" strokeWidth="1.6" />
                <line x1="17" y1="16" x2="17" y2="10" stroke="#392F3B" strokeWidth="1.2" />
                <line x1="17" y1="16" x2="21" y2="16" stroke="#392F3B" strokeWidth="1.2" />
              </g>

              {/* Pinned Polaroid 4: The Golden Crooked Knot */}
              <g transform="translate(162, 82) rotate(6)">
                <rect x="0" y="0" width="34" height="40" fill="#FAF6EE" stroke="#392F3B" strokeWidth="1.2" />
                <rect x="4" y="4" width="26" height="24" fill="#1B1726" />
                <circle cx="17" cy="16" r="5" fill="#F7D560" />
                <circle cx="17" cy="16" r="2" fill="#A34063" />
              </g>

              {/* Official Purple Approval Stamp: "IMPERFECT · SOMEHOW LOVELY" */}
              <g transform="translate(125, 122) rotate(-4)">
                <rect x="0" y="0" width="76" height="20" rx="3" fill="none" stroke="#A34063" strokeWidth="2" strokeDasharray="3,2" />
                <text x="38" y="14" fill="#A34063" fontSize="7.2" fontWeight="800" textAnchor="middle" letterSpacing="0.04em">
                  SOMEHOW LOVELY
                </text>
              </g>
            </g>

            {/* SIR CLACK'S BRASS COUNTER BELL (Beside Scrapbook: x=580, y=380) */}
            <g className="clack-counter-bell" transform="translate(580, 395)">
              <ellipse cx="14" cy="22" rx="18" ry="6" fill="url(#epilogue-contact-blur)" />
              <path d="M 0 20 Q 14 -2 28 20 Z" fill="url(#epilogue-brass-grad)" stroke="#25120B" strokeWidth="1.8" />
              <rect x="12" y="-4" width="4" height="6" fill="#8C6527" stroke="#25120B" strokeWidth="1" />
              <circle cx="14" cy="-5" r="3" fill="#F7D560" stroke="#25120B" strokeWidth="1" />
            </g>

            {/* WORKSHOP DETAILS & TOOLS ON BENCH */}
            {/* Spool of Golden Thread with Trailing Ribbon */}
            <g transform="translate(710, 435)">
              <rect x="0" y="0" width="18" height="28" rx="3" fill="#8F5D48" stroke="#25120B" strokeWidth="1.5" />
              <rect x="2" y="4" width="14" height="20" fill="#F7D560" />
              <path d="M 9 28 Q 20 42 42 38" fill="none" stroke="#F7D560" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Brass Tailor Shears */}
            <g transform="translate(850, 440) rotate(-25)">
              <ellipse cx="6" cy="4" rx="6" ry="4" fill="none" stroke="url(#epilogue-brass-grad)" strokeWidth="2" />
              <ellipse cx="6" cy="16" rx="6" ry="4" fill="none" stroke="url(#epilogue-brass-grad)" strokeWidth="2" />
              <line x1="12" y1="10" x2="38" y2="5" stroke="url(#epilogue-brass-grad)" strokeWidth="2.5" />
              <line x1="12" y1="10" x2="38" y2="15" stroke="url(#epilogue-brass-grad)" strokeWidth="2.5" />
              <circle cx="15" cy="10" r="2" fill="#25120B" />
            </g>

            {/* Ground Contact Shadows for Actors */}
            <g className="actor-contact-shadows" aria-hidden="true">
              {/* Professor Perfect shadow (Left, x ≈ 155, y ≈ 410) */}
              <ellipse cx="155" cy="410" rx="38" ry="12" fill="url(#epilogue-contact-blur)" />
              {/* Sir Clack shadow (Center-left, x ≈ 340, y ≈ 415) */}
              <ellipse cx="340" cy="415" rx="38" ry="12" fill="url(#epilogue-contact-blur)" />
              {/* The Unfinished One shadow (Right-center, x ≈ 665, y ≈ 420) */}
              <ellipse cx="665" cy="420" rx="42" ry="13" fill="url(#epilogue-contact-blur)" />
              {/* Morrow shadow (Right, x ≈ 805, y ≈ 422) */}
              <ellipse cx="805" cy="422" rx="44" ry="14" fill="url(#epilogue-contact-blur)" />
            </g>
          </svg>
        </div>

        {/* =========================================================================
            STOP-MOTION CHARACTER ACTORS (Positioned with Responsive Percentage Coordinates)
           ========================================================================= */}

        {/* 1. PROFESSOR PRIMROSE PERFECT (Left Workshop Corner - Proud & Approving) */}
        <div
          className="stage-actor-anchor epilogue-professor-anchor"
          style={{
            position: 'absolute',
            left: '11%',
            bottom: '22%',
            width: '95px',
            height: '135px',
            cursor: 'pointer',
            zIndex: 4,
          }}
          onClick={() => handleCharacterClick('professor')}
          title="Professor Primrose Perfect · Click to hear her thoughts"
        >
          <StopMotionActor
            character="professor"
            state="happy"
            isSpeaking={activeSpeech === 'professor'}
            alt="Professor Primrose Perfect in Victorian lilac dress with golden hairline repair crack, smiling approvingly"
            fallbackSvg={
              <svg viewBox="0 0 100 120" width="100%" height="100%">
                <ellipse cx="50" cy="110" rx="30" ry="7" fill="#1e1828" opacity="0.3" />
                <rect x="25" y="48" width="50" height="60" rx="6" fill="#FFF8F1" stroke="#252030" strokeWidth="2.5" />
                <path d="M 40 48 Q 50 56 60 48" fill="#A34063" />
                <circle cx="50" cy="38" r="22" fill="#E8DEC8" stroke="#252030" strokeWidth="2.5" />
                <circle cx="43" cy="36" r="3" fill="#252030" />
                <circle cx="57" cy="36" r="3" fill="#252030" />
                <path d="M 44 54 Q 50 62 56 54" fill="none" stroke="#252030" strokeWidth="2" strokeLinecap="round" />
                {/* Hairline golden crack */}
                <path d="M 52 18 Q 50 26 53 32" fill="none" stroke="#E8C878" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="34" y="24" width="32" height="18" fill="#252030" rx="2" />
                <ellipse cx="50" cy="40" rx="24" ry="4" fill="#252030" />
                <rect x="34" y="34" width="32" height="4" fill="#A34063" />
              </svg>
            }
          />
          {activeSpeech === 'professor' && (
            <div className="character-speech-bubble bubble-professor" role="tooltip">
              <strong>Professor Perfect</strong>
              <p>“Imperfect. Acceptable. Somehow lovely. You may keep the shop open forever.”</p>
            </div>
          )}
        </div>

        {/* 2. PIPKIN (Perched on the Sunny Arched Window Sill with Newspaper) */}
        <div
          className="stage-actor-anchor epilogue-pipkin-anchor"
          style={{
            position: 'absolute',
            left: '26%',
            top: '32%',
            width: '80px',
            height: '100px',
            cursor: 'pointer',
            zIndex: 4,
          }}
          onClick={() => handleCharacterClick('pipkin')}
          title="Pipkin the Delivery Bird · Click to read the headline"
        >
          <StopMotionActor
            character="pipkin"
            state="happy"
            isSpeaking={activeSpeech === 'pipkin'}
            alt="Pipkin the Delivery Bird perched with special celebration edition newspaper"
            fallbackSvg={<Pipkin />}
          />
          {activeSpeech === 'pipkin' && (
            <div className="character-speech-bubble bubble-pipkin" role="tooltip">
              <strong>Pipkin</strong>
              <p>“SPECIAL EDITION: LOCAL DISASTER DECLARED A COMPLETE MASTERPIECE!”</p>
            </div>
          )}
        </div>

        {/* 3. SIR CLACK (On Workbench beside his Scrapbook) */}
        <div
          className="stage-actor-anchor epilogue-clack-anchor"
          style={{
            position: 'absolute',
            left: '31%',
            bottom: '22%',
            width: '100px',
            height: '115px',
            cursor: 'pointer',
            zIndex: 4,
          }}
          onClick={() => handleCharacterClick('clack')}
          title="Sir Clack · Click to hear grumpy mentor praise"
        >
          <StopMotionActor
            character="clack"
            state="happy"
            isSpeaking={activeSpeech === 'clack'}
            alt="Sir Clack the sentient mahogany toolbox with polished brass latches and a warm smile"
            fallbackSvg={<SirClack />}
          />
          {activeSpeech === 'clack' && (
            <div className="character-speech-bubble bubble-clack" role="tooltip">
              <strong>Sir Clack</strong>
              <p>“I suppose... it is not entirely catastrophic. Do not make me say it twice.”</p>
            </div>
          )}
        </div>

        {/* 4. THE UNFINISHED ONE (Right-Center Workbench - Proud with Golden Knot) */}
        <div
          className="stage-actor-anchor epilogue-unfinished-anchor"
          style={{
            position: 'absolute',
            left: '64%',
            bottom: '22%',
            width: '110px',
            height: '145px',
            cursor: 'pointer',
            zIndex: 5,
          }}
          onClick={() => handleCharacterClick('unfinished')}
          title="The Unfinished One · Click to hear Morrow's first friend"
        >
          <StopMotionActor
            character="unfinished"
            state="happy"
            isSpeaking={activeSpeech === 'unfinished'}
            alt="The Unfinished One: navy patchwork felt companion with shining crooked golden chest knot, smiling warmly"
            fallbackSvg={
              <svg viewBox="0 0 120 150" width="100%" height="100%">
                <ellipse cx="60" cy="140" rx="42" ry="8" fill="#161220" opacity="0.4" />
                <path
                  d="M 40 70 Q 20 110 44 130 Q 75 145 90 120 Q 100 85 76 68 Q 55 58 40 70 Z"
                  fill="#25324A"
                  stroke="#161220"
                  strokeWidth="3"
                />
                <circle cx="50" cy="80" r="4.5" fill="#F7D560" />
                <circle cx="70" cy="80" r="4.5" fill="#F7D560" />
                <path d="M 54 94 Q 60 102 66 94" fill="none" stroke="#F7D560" strokeWidth="2.5" strokeLinecap="round" />
                {/* Golden crooked chest knot */}
                <circle cx="58" cy="108" r="4" fill="#F7D560" stroke="#FFF8F1" strokeWidth="1" />
              </svg>
            }
          />
          {activeSpeech === 'unfinished' && (
            <div className="character-speech-bubble bubble-unfinished" role="tooltip">
              <strong>The Unfinished One</strong>
              <p>“You never forgot me. Look at what we stitched together.”</p>
            </div>
          )}
        </div>

        {/* 5. MORROW (Right Workbench - Holding Hot Teacup & Brass Needle) */}
        <div
          className="stage-actor-anchor epilogue-morrow-anchor"
          style={{
            position: 'absolute',
            left: '78%',
            bottom: '22%',
            width: '120px',
            height: '150px',
            cursor: 'pointer',
            zIndex: 5,
          }}
          onClick={() => handleCharacterClick('morrow')}
          title="Morrow · Click to hear Morrow's words"
        >
          <StopMotionActor
            character="morrow"
            state="happy"
            isSpeaking={activeSpeech === 'morrow'}
            alt="Morrow the Stitchling apprentice smiling happily in his plum scarf with spool tail and mitten paws"
            fallbackSvg={<Morrow small expression="happy" />}
          />
          {activeSpeech === 'morrow' && (
            <div className="character-speech-bubble bubble-morrow" role="tooltip">
              <strong>Morrow</strong>
              <p>“We make wonderful mistakes. Tomorrow will be almost right, too.”</p>
            </div>
          )}
        </div>

        {/* Bottom Epilogue Atmosphere Ribbon */}
        <div className="storybook-scene-bottom">
          <span style={{ background: 'rgba(58, 38, 26, 0.85)', padding: '3px 10px', borderRadius: '8px', color: '#FFF8F1', font: "700 0.72rem 'Space Mono', monospace" }}>
            The Almost-Right Repair Shop · Open For All Imperfect Things
          </span>
          <span style={{ background: 'rgba(58, 38, 26, 0.85)', padding: '3px 8px', borderRadius: '8px', color: '#F7D560' }}>✳</span>
        </div>
      </div>
    </section>
  );
};
