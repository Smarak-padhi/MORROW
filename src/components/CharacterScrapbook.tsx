import React, { useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface CharacterProfile {
  id: string;
  name: string;
  title: string;
  quote: string;
  species: string;
  craft: string;
  description: string;
  stamp: string;
  badgeColor: string;
}

const CHARACTERS: CharacterProfile[] = [
  {
    id: 'morrow',
    name: 'Morrow',
    title: 'The Almost-Right Repairer',
    quote: '“We make wonderful mistakes.”',
    species: 'Stitchling Fantasy Creature',
    craft: 'Impossible-Things Repairer',
    description:
      'Handcrafted peach felt body with asymmetric petal ears, a gold diamond forehead stitch, two black button eyes, a cozy plum scarf, mitten paws, and a wooden spool tail trailing golden thread. Clumsy, endlessly curious, and gentle.',
    stamp: 'ORIGINAL HERO',
    badgeColor: 'var(--gold)',
  },
  {
    id: 'clack',
    name: 'Sir Clack',
    title: 'Grumpy Mentor & Toolbox',
    quote: '“Which part? Yes.”',
    species: 'Sentient Antique Toolbox',
    craft: 'Disaster Logger & Secret Scrapbook Keeper',
    description:
      'A weathered mahogany toolbox with brass corner reinforcements, twin latches, and an arched carrying handle. Beneath his perpetually unimpressed wooden brow lies a heart that secretly pins every adventure into his scrapbook.',
    stamp: 'KEEPER OF RECORDS',
    badgeColor: 'var(--rust)',
  },
  {
    id: 'pipkin',
    name: 'Pipkin',
    title: 'Senior Messenger & Chief Alarmist',
    quote: '“EMERGENCY! THE WORLD IS BROKEN!”',
    species: 'Blue Courier Bird',
    craft: 'Editor-in-Chief, The Daily Panic',
    description:
      'A tiny blue messenger bird with round panic-stricken eyes, a miniature leather shoulder satchel, and a loud editorial voice. Never seen without the latest special edition clutched in his beak.',
    stamp: 'PRESS PASS',
    badgeColor: 'var(--sage)',
  },
  {
    id: 'duck',
    name: 'The Duck',
    title: 'Village Resident of Note',
    quote: '“I AM A FOREST.”',
    species: 'Lost Shadows Duck',
    craft: 'Philosopher of Shadows',
    description:
      'A cream felt duck in an olive sage neckerchief. Formerly missing a shadow until Morrow stitched a giant 200-year-old oak tree shadow to his webbed feet. Extremely satisfied with the upgrade.',
    stamp: 'IMPOSSIBLE SILHOUETTE',
    badgeColor: 'var(--sage)',
  },
  {
    id: 'frog',
    name: 'The Frog Mayor',
    title: 'Mayor of Upside-Down Forest',
    quote: '“My umbrella is now a bucket.”',
    species: 'Distinguished Amphibian',
    craft: 'Civic Calm in Meteorological Chaos',
    description:
      'A plump emerald felt frog wearing a mustard waistcoat and gold civic medallion. Calmly adapted to upward rainfall by converting his upside-down leaf umbrella into a flower-filled water basin.',
    stamp: 'OFFICIAL MUNICIPAL',
    badgeColor: 'var(--moss)',
  },
  {
    id: 'perfect',
    name: 'Professor Primrose Perfect',
    title: 'Former Chief of Standards',
    quote: '“Imperfect. Acceptable. Somehow lovely.”',
    species: 'Porcelain Administrator',
    craft: 'Official Evaluator & Former Ruler-Wielder',
    description:
      'An elegant Victorian administrator in lilac silk with delicate golden hairline repair cracks along her porcelain cheek. Discovered that measuring people with brass rulers only erases what makes them lovely.',
    stamp: 'APPROVED IMPERFECT',
    badgeColor: 'var(--lilac)',
  },
  {
    id: 'unfinished',
    name: 'The Unfinished One',
    title: 'The First Friend',
    quote: '“You made me.”',
    species: 'Navy Felt Companion',
    craft: 'Guardian of the Crooked Knot',
    description:
      'Morrow’s very first creation from his earliest days in the workshop. Stitched with uneven navy felt, tender luminous golden eyes, and the original crooked golden knot on its chest. Has been quietly keeping the world together all along.',
    stamp: 'WONDERFULLY CROOKED',
    badgeColor: 'var(--berry)',
  },
];

export const CharacterScrapbook: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('morrow');
  const activeChar = CHARACTERS.find(c => c.id === selectedId) || CHARACTERS[0];

  return (
    <div className="character-scrapbook-module" aria-label="Character Scrapbook">
      <div className="scrapbook-header">
        <div className="scrapbook-badge">
          <BookOpen size={16} aria-hidden="true" />
          <span>SIR CLACK’S SCRAPBOOK</span>
        </div>
        <h4>The Almost-Right Friends</h4>
        <p className="scrapbook-subtitle">
          Every friend Morrow met on his journey, kept safe between handmade pressed pages.
        </p>
      </div>

      {/* Character Selector Pills */}
      <div className="scrapbook-tabs" role="tablist" aria-label="Characters in Sir Clack's scrapbook">
        {CHARACTERS.map(c => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === selectedId}
            className={`scrapbook-tab ${c.id === selectedId ? 'is-active' : ''}`}
            onClick={() => setSelectedId(c.id)}
          >
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Character Portfolio Card */}
      <div className="scrapbook-card" role="tabpanel" key={activeChar.id}>
        <div className="scrapbook-card-top">
          <div className="scrapbook-titles">
            <span className="scrapbook-role">{activeChar.title}</span>
            <h3 className="scrapbook-name">{activeChar.name}</h3>
            <span className="scrapbook-species">{activeChar.species} · {activeChar.craft}</span>
          </div>
          <div className="scrapbook-stamp" style={{ borderColor: activeChar.badgeColor, color: activeChar.badgeColor }}>
            <Sparkles size={12} aria-hidden="true" />
            <span>{activeChar.stamp}</span>
          </div>
        </div>

        <blockquote className="scrapbook-quote">{activeChar.quote}</blockquote>

        <p className="scrapbook-description">{activeChar.description}</p>
      </div>
    </div>
  );
};
