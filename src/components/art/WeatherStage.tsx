import React, { useEffect, useState } from 'react';

interface Props {
  dialog?: number;
}

export const WeatherStage: React.FC<Props> = ({ dialog: _dialog }) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
  }, []);

  return (
    <section className="storybook-stage weather-stage-bespoke" aria-label="Upside-Down Forest with raindrops falling upwards">
      {/* Background Mist and Inverted Canopy */}
      <div className="storybook-sky weather-forest-sky" aria-hidden="true">
        <span className="weather-mist mist-1" />
        <span className="weather-mist mist-2" />
      </div>

      <div className="storybook-scene-label">
        <span>CHAPTER 02</span>
        <span>03 / 06</span>
      </div>

      {/* Main Stop-Motion SVG Forest Stage */}
      <div className="stage-svg-wrap">
        <svg
          viewBox="0 0 600 380"
          preserveAspectRatio="xMidYMid slice"
          className="stage-svg-art"
          role="img"
          aria-label="Handcrafted scene of the Upside-Down Forest with inverted trees, the Frog Mayor holding his umbrella bucket, Pipkin perched, and Morrow"
        >
          <defs>
            <linearGradient id="forest-sky-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A6553" />
              <stop offset="50%" stopColor="#7E9A82" />
              <stop offset="100%" stopColor="#BACDB8" />
            </linearGradient>
            <linearGradient id="moss-ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6C876F" />
              <stop offset="100%" stopColor="#455B49" />
            </linearGradient>
            <linearGradient id="umbrella-leaf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#88A991" />
              <stop offset="100%" stopColor="#55755E" />
            </linearGradient>
            <filter id="forest-drop" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="5" stdDeviation="3" floodColor="#1a251c" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Sky background */}
          <rect width="600" height="380" fill="url(#forest-sky-grad)" />

          {/* INVERTED FOREST CANOPY (Trees hanging upside down from the sky!) */}
          <g className="inverted-trees" opacity="0.85">
            {/* Tree 1 (Left giant inverted pine) */}
            <path d="M 60 0 L 80 120 L 40 120 Z" fill="#3D5042" />
            <path d="M 50 70 L 90 170 L 30 170 Z" fill="#36493B" />
            <path d="M 40 130 L 100 230 L 20 230 Z" fill="#2F3F34" />
            <rect x="56" y="230" width="8" height="40" fill="#4A3427" />

            {/* Tree 2 (Mid-left inverted birch) */}
            <path d="M 170 0 L 185 90 L 155 90 Z" fill="#506655" />
            <path d="M 160 55 L 195 135 L 145 135 Z" fill="#435848" />
            <rect x="168" y="135" width="5" height="35" fill="#5A4739" />

            {/* Tree 3 (Right giant inverted spruce) */}
            <path d="M 460 0 L 485 110 L 435 110 Z" fill="#3D5042" />
            <path d="M 450 70 L 495 165 L 425 165 Z" fill="#36493B" />
            <path d="M 440 125 L 510 220 L 410 220 Z" fill="#2F3F34" />
            <rect x="456" y="220" width="8" height="45" fill="#4A3427" />

            {/* Tree 4 (Far right inverted birch) */}
            <path d="M 540 0 L 555 80 L 525 80 Z" fill="#506655" />
            <path d="M 530 50 L 565 125 L 515 125 Z" fill="#435848" />
            <rect x="538" y="125" width="5" height="30" fill="#5A4739" />
          </g>

          {/* MOSS FLOOR / STREAM (Foreground hill layers) */}
          <path d="M -20 330 Q 150 290 320 320 T 620 300 L 620 380 L -20 380 Z" fill="url(#moss-ground)" filter="url(#forest-drop)" />
          {/* Detailed felt moss patches and mushrooms */}
          <ellipse cx="140" cy="340" rx="45" ry="12" fill="#5C775F" />
          <ellipse cx="440" cy="345" rx="55" ry="14" fill="#5C775F" />
          {/* Spotted red toadstool */}
          <ellipse cx="230" cy="350" rx="14" ry="4" fill="#392F3B" opacity="0.2" />
          <path d="M 226 350 L 226 338 L 234 338 L 234 350 Z" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.5" />
          <path d="M 218 338 Q 230 322 242 338 Z" fill="#A34063" stroke="#392F3B" strokeWidth="1.5" />
          <circle cx="225" cy="331" r="1.5" fill="#FFF8F1" />
          <circle cx="234" cy="333" r="1.2" fill="#FFF8F1" />

          {/* CHARACTERS */}

          {/* 1. FROG MAYOR (Left - sitting on a moss log with his inverted umbrella bucket!) */}
          <g className="frog-mayor-group" transform="translate(160, 210)">
            {/* Ground shadow */}
            <ellipse cx="45" cy="135" rx="35" ry="8" fill="#392F3B" opacity="0.2" />
            {/* Moss log */}
            <path d="M 10 125 Q 45 115 80 125 L 75 140 Q 45 130 15 140 Z" fill="#5A4739" stroke="#392F3B" strokeWidth="2.5" />
            <ellipse cx="78" cy="132" rx="4" ry="8" fill="#755E4E" stroke="#392F3B" strokeWidth="1.5" />

            {/* Inverted umbrella bucket (collecting rain!) */}
            <g className="umbrella-bucket" transform="translate(15, 20)">
              {/* Cane handle pointing DOWN */}
              <path d="M 28 85 L 28 45 Q 28 35 20 35" fill="none" stroke="#63392A" strokeWidth="3" strokeLinecap="round" />
              {/* Inverted leaf canopy like a soup bowl */}
              <path d="M 0 45 Q 28 80 56 45 Q 28 55 0 45 Z" fill="url(#umbrella-leaf)" stroke="#392F3B" strokeWidth="2.5" />
              {/* Water collected inside the bowl */}
              <path d="M 8 50 Q 28 65 48 50 Q 28 54 8 50 Z" fill="#B0D5EB" opacity="0.85" />
              {/* Little water ripple */}
              <ellipse cx="28" cy="54" rx="10" ry="2" fill="#FFF8F1" opacity="0.6" />
            </g>

            {/* Frog Mayor Body */}
            {/* Green felt round belly */}
            <ellipse cx="50" cy="98" rx="22" ry="18" fill="#88A991" stroke="#392F3B" strokeWidth="2.5" />
            {/* Yellow-cream waistcoat */}
            <path d="M 38 92 Q 50 114 62 92 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="1.5" />
            {/* Gold Mayor medal / medallion */}
            <circle cx="50" cy="100" r="4.5" fill="#E8C878" stroke="#392F3B" strokeWidth="1.2" />
            <path d="M 47 94 L 50 100 L 53 94" stroke="#A34063" strokeWidth="1.5" fill="none" />
            {/* Big friendly frog eyes */}
            <circle cx="41" cy="80" r="8" fill="#88A991" stroke="#392F3B" strokeWidth="2" />
            <circle cx="41" cy="79" r="4" fill="#392F3B" />
            <circle cx="43" cy="77" r="1.5" fill="#FFF8F1" />
            <circle cx="59" cy="80" r="8" fill="#88A991" stroke="#392F3B" strokeWidth="2" />
            <circle cx="59" cy="79" r="4" fill="#392F3B" />
            <circle cx="61" cy="77" r="1.5" fill="#FFF8F1" />
            {/* Wide bemused frog smile */}
            <path d="M 40 88 Q 50 94 60 88" fill="none" stroke="#392F3B" strokeWidth="2" strokeLinecap="round" />
            {/* Frog hand holding umbrella handle */}
            <circle cx="42" cy="70" r="4" fill="#88A991" stroke="#392F3B" strokeWidth="1.5" />
          </g>

          {/* 2. PIPKIN (Perched on an inverted twig mid-air, flapping frantically) */}
          <g className="pipkin-group" transform="translate(265, 120)">
            {/* Inverted branch */}
            <path d="M 40 -40 Q 30 15 15 25" fill="none" stroke="#4A3427" strokeWidth="4" strokeLinecap="round" />
            {/* Pipkin Body */}
            <ellipse cx="25" cy="42" rx="16" ry="14" fill="#88A991" stroke="#392F3B" strokeWidth="2" />
            <circle cx="32" cy="38" r="11" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1.5" />
            <circle cx="36" cy="28" r="10" fill="#88A991" stroke="#392F3B" strokeWidth="2" />
            {/* Panicked big eyes */}
            <circle cx="39" cy="26" r="4" fill="#FFF8F1" stroke="#392F3B" strokeWidth="1" />
            <circle cx="40" cy="26" r="2" fill="#392F3B" />
            {/* Beak */}
            <path d="M 44 27 L 55 30 L 44 34 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="1.2" />
            {/* Courier Satchel */}
            <rect x="18" y="44" width="14" height="10" rx="2" fill="#C98F70" stroke="#392F3B" strokeWidth="1.2" />
            <line x1="12" y1="36" x2="22" y2="46" stroke="#A34063" strokeWidth="1.5" />
            {/* Flapping little blue wing */}
            <path d="M 15 36 Q 5 25 10 45 Z" fill="#8E79A8" stroke="#392F3B" strokeWidth="1.5" />
            {/* Little "DAILY PANIC" paper sticking out */}
            <rect x="20" y="40" width="8" height="6" fill="#FFF8F1" stroke="#392F3B" strokeWidth="0.8" transform="rotate(-15 24 43)" />
          </g>

          {/* 3. MORROW (Right side - looking up with peach felt body, plum scarf, needle & thread) */}
          <g className="morrow-stage-group" transform="translate(325, 185)">
            {/* Shadow */}
            <ellipse cx="65" cy="160" rx="38" ry="9" fill="#392F3B" opacity="0.22" />
            {/* Morrow Character */}
            {/* Spool Tail */}
            <g transform="translate(25, 130) rotate(-15)">
              <rect x="0" y="0" width="10" height="14" rx="2" fill="#8F5D48" stroke="#392F3B" strokeWidth="1.5" />
              <rect x="2" y="2" width="6" height="10" fill="#E8C878" />
              <path d="M 5 14 Q 2 24 -10 28" fill="none" stroke="#E8C878" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            {/* Pear Body */}
            <path
              d="M 45 80 C 25 110 30 150 65 155 C 100 150 105 110 85 80 C 80 65 50 65 45 80 Z"
              fill="#C98F70"
              stroke="#392F3B"
              strokeWidth="2.8"
            />
            {/* Asymmetrical Felt Ears */}
            {/* Left upright petal ear */}
            <path d="M 46 62 Q 35 25 48 20 Q 58 35 55 60 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="2.5" />
            <path d="M 48 55 Q 42 32 49 28" fill="none" stroke="#DDB095" strokeWidth="2" strokeLinecap="round" />
            {/* Right floppy curved ear */}
            <path d="M 75 62 Q 95 35 105 48 Q 95 65 80 65 Z" fill="#C98F70" stroke="#392F3B" strokeWidth="2.5" />
            {/* Forehead Gold Diamond Stitch */}
            <path d="M 65 55 L 68 59 L 65 63 L 62 59 Z" fill="#E8C878" stroke="#392F3B" strokeWidth="1" />
            {/* Button Eyes */}
            <circle cx="56" cy="74" r="4.5" fill="#392F3B" />
            <circle cx="57" cy="73" r="1.2" fill="#FFF8F1" />
            <circle cx="74" cy="74" r="4.5" fill="#392F3B" />
            <circle cx="75" cy="73" r="1.2" fill="#FFF8F1" />
            {/* Clueless/inquisitive little mouth */}
            <ellipse cx="65" cy="84" rx="2.5" ry="3.5" fill="#392F3B" />
            {/* Plum Scarf wrapped warmly */}
            <path d="M 40 88 Q 65 96 90 88 Q 92 98 65 102 Q 38 98 40 88 Z" fill="#A34063" stroke="#392F3B" strokeWidth="2.5" />
            {/* Scarf tail fluttering up in upside-down breeze! */}
            <path d="M 46 95 Q 35 110 32 125 Q 40 128 48 102 Z" fill="#A34063" stroke="#392F3B" strokeWidth="2" />
            <line x1="32" y1="125" x2="35" y2="128" stroke="#E8C878" strokeWidth="1.5" />
            {/* Mitten paws holding brass needle up toward the clouds */}
            <circle cx="50" cy="115" r="7" fill="#C98F70" stroke="#392F3B" strokeWidth="2" />
            <circle cx="80" cy="110" r="7" fill="#C98F70" stroke="#392F3B" strokeWidth="2" />
            {/* Giant brass needle pointed up */}
            <line x1="82" y1="110" x2="98" y2="60" stroke="#E8C878" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="96" cy="65" rx="1.5" ry="3" fill="#392F3B" transform="rotate(18 96 65)" />
            {/* Golden thread trailing from needle */}
            <path d="M 96 65 Q 120 45 110 20" fill="none" stroke="#E8C878" strokeWidth="2" strokeDasharray="3,3" />
          </g>

          {/* UPSIDE-DOWN RAINDROPS (Tactile glass beads traveling UPWARDS) */}
          <g className={`upside-down-rain ${isReducedMotion ? 'reduced-motion-static' : 'rain-rising'}`}>
            {[
              { cx: 70, cy: 300, r: 3.5, op: 0.75, delay: '0s' },
              { cx: 160, cy: 260, r: 4, op: 0.9, delay: '0.4s' },
              { cx: 220, cy: 220, r: 3, op: 0.7, delay: '0.9s' },
              { cx: 310, cy: 280, r: 4.5, op: 0.85, delay: '0.2s' },
              { cx: 360, cy: 240, r: 3.5, op: 0.8, delay: '0.7s' },
              { cx: 480, cy: 290, r: 4, op: 0.75, delay: '1.1s' },
              { cx: 530, cy: 250, r: 3, op: 0.7, delay: '0.5s' },
              { cx: 120, cy: 180, r: 4, op: 0.8, delay: '1.3s' },
              { cx: 280, cy: 170, r: 3.5, op: 0.85, delay: '0.8s' },
              { cx: 430, cy: 160, r: 4.5, op: 0.9, delay: '0.3s' },
            ].map((drop, i) => (
              <g key={i} className="rain-bead" style={{ animationDelay: drop.delay }}>
                {/* Teardrop with pointed end DOWN and bulb UP (because it falls upward!) */}
                <path
                  d={`M ${drop.cx} ${drop.cy} Q ${drop.cx - drop.r} ${drop.cy - drop.r * 2} ${drop.cx} ${drop.cy - drop.r * 3} Q ${drop.cx + drop.r} ${drop.cy - drop.r * 2} ${drop.cx} ${drop.cy} Z`}
                  fill="#CBE4F5"
                  stroke="#392F3B"
                  strokeWidth="1"
                  opacity={drop.op}
                />
                <circle cx={drop.cx - 1} cy={drop.cy - drop.r * 1.8} r={drop.r * 0.35} fill="#FFF8F1" />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="storybook-scene-bottom">
        <span>A Forecast of Absolute Nonsense</span>
        <span>✦</span>
      </div>
    </section>
  );
};
