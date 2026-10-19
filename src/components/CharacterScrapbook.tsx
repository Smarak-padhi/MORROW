import React, { useState } from 'react';
import { BookOpen, Sparkles, MapPin, CheckCircle, Heart, Stamp } from 'lucide-react';

export interface MilestoneMemory {
  id: string;
  chapterNumber: string;
  chapterTag: string;
  title: string;
  date: string;
  photoCaption: string;
  excerpt: string;
  clackNote: string;
  stampText: string;
  stampColor: string;
  photoBg: string;
  photoIcon: string;
}

export interface CharacterProfile {
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

const MILESTONE_MEMORIES: MilestoneMemory[] = [
  {
    id: 'workshop',
    chapterNumber: '01',
    chapterTag: 'THE WORKSHOP',
    title: 'The Morning Morrow Woke Up',
    date: 'Day 1 · Dawn',
    photoCaption: 'Sir Clack’s antique brass bell and Morrow’s first loose golden thread',
    excerpt: '“Once upon a nearly-perfect morning, a very small mistake woke up. His name was Morrow. He could stitch almost anything together. Unfortunately, almost anything was currently falling apart.”',
    clackNote: 'Log Entry #001: Apprentice awoke early. Replaced bell ringer with a button. Result: Ding sounded like a giggle. Unacceptable. (Preserved button in drawer).',
    stampText: 'WONDERFUL BEGINNING',
    stampColor: 'var(--gold, #E8C878)',
    photoBg: 'linear-gradient(135deg, #4A2E1D 0%, #2A170F 100%)',
    photoIcon: '✳',
  },
  {
    id: 'shadows',
    chapterNumber: '02',
    chapterTag: 'SHADOW VILLAGE',
    title: 'The Duck Who Wanted To Be An Oak',
    date: 'Day 2 · Afternoon',
    photoCaption: 'A 200-year-old oak tree shadow carefully anchored to webbed feet',
    excerpt: '“Duck was tired of having a duck-shaped shadow. It only ever paddled. Morrow unpicked three seams of twilight and stitched a spreading oak canopy to Duck’s feet. Duck has never stood taller.”',
    clackNote: 'Log Entry #042: Duck refused to swim because oak trees do not migrate. Village children now take naps under Duck’s boughs. Highly irregular. Approved.',
    stampText: 'IMPOSSIBLE SILHOUETTE',
    stampColor: 'var(--sage, #88A991)',
    photoBg: 'linear-gradient(135deg, #1C2E24 0%, #0F1B14 100%)',
    photoIcon: '♧',
  },
  {
    id: 'weather',
    chapterNumber: '03',
    chapterTag: 'UPSIDE-DOWN FOREST',
    title: 'The Umbrella That Became A Bucket',
    date: 'Day 3 · Rainfall',
    photoCaption: 'Frog Mayor observing upward rain while his inverted umbrella drinks deep',
    excerpt: '“The clouds had turned upside-down and rain was falling upward into the stratosphere. Morrow threaded the brass loom with golden sunlight wool, giving every thirsty lily a direct drink.”',
    clackNote: 'Log Entry #078: Mayor declared umbrella-bucket a municipal landmark. Frogs now swim on the ceiling. Forest smells of peppermint tea. We will not fix it further.',
    stampText: 'SOMEHOW DELIGHTFUL',
    stampColor: 'var(--moss, #799F84)',
    photoBg: 'linear-gradient(135deg, #1A3222 0%, #0D1D13 100%)',
    photoIcon: '☁',
  },
  {
    id: 'clock',
    chapterNumber: '04',
    chapterTag: 'TOMORROW TOWN',
    title: 'The Hour of 4:03',
    date: 'Day 4 · Dusk',
    photoCaption: 'The Impossible Clock repaired with a loose gear and a crooked heart spring',
    excerpt: '“Tomorrow Town had frozen because everyone was waiting for the perfect hour. Morrow seated the loose brass cog, aligned the weather dial, and let time run warm, crooked, and kind.”',
    clackNote: 'Log Entry #113: Clock skips 4:00 entirely and rings 4:03 twice. Townspeople report coffee tastes sweeter. Professor Perfect dropped her clipboard. Success.',
    stampText: 'TIME MADE SWEET',
    stampColor: 'var(--rust, #A34063)',
    photoBg: 'linear-gradient(135deg, #322538 0%, #17101C 100%)',
    photoIcon: '◷',
  },
  {
    id: 'finale',
    chapterNumber: '05',
    chapterTag: 'CLOCK TOWER CATHEDRAL',
    title: 'The Final Stitch & The Crooked Knot',
    date: 'Day 5 · Golden Dawn',
    photoCaption: 'Morrow and The Unfinished One reuniting their hands over the golden chest knot',
    excerpt: '“In the great cathedral above the city, Morrow found his first unfinished creation. Not everything broken needed to be erased. One crooked golden stitch held the whole world together.”',
    clackNote: 'Log Entry #120: Professor Primrose Perfect inspected the final knot. Stamped the entire cathedral with her official seal. We are bringing them all home.',
    stampText: 'IMPERFECT · APPROVED',
    stampColor: 'var(--berry, #8E2D4E)',
    photoBg: 'linear-gradient(135deg, #2D1F38 0%, #150D1C 100%)',
    photoIcon: '✧',
  },
];

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
    badgeColor: 'var(--gold, #E8C878)',
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
    badgeColor: 'var(--rust, #A34063)',
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
    badgeColor: 'var(--sage, #88A991)',
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
    badgeColor: 'var(--sage, #88A991)',
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
    badgeColor: 'var(--moss, #799F84)',
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
    badgeColor: 'var(--lilac, #B298DC)',
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
    badgeColor: 'var(--berry, #8E2D4E)',
  },
];

export interface CharacterScrapbookProps {
  playChime?: () => void;
}

export const CharacterScrapbook: React.FC<CharacterScrapbookProps> = ({ playChime }) => {
  const [activeTab, setActiveTab] = useState<'memories' | 'friends'>('memories');
  const [selectedMemoryId, setSelectedMemoryId] = useState<string>('finale');
  const [selectedCharId, setSelectedCharId] = useState<string>('morrow');

  const activeMemory = MILESTONE_MEMORIES.find(m => m.id === selectedMemoryId) || MILESTONE_MEMORIES[0];
  const activeChar = CHARACTERS.find(c => c.id === selectedCharId) || CHARACTERS[0];

  const handleSelectTab = (tab: 'memories' | 'friends') => {
    if (playChime) playChime();
    setActiveTab(tab);
  };

  const handleSelectMemory = (id: string) => {
    if (playChime) playChime();
    setSelectedMemoryId(id);
  };

  const handleSelectChar = (id: string) => {
    if (playChime) playChime();
    setSelectedCharId(id);
  };

  return (
    <div className="character-scrapbook-module tactile-keepsake-album" aria-label="Sir Clack's Keepsake Scrapbook">
      {/* Album Ribbon Header */}
      <div className="scrapbook-header">
        <div className="scrapbook-badge">
          <BookOpen size={16} aria-hidden="true" />
          <span>SIR CLACK’S PRIVATE DISASTER LOG & ALBUM</span>
        </div>
        <h4>The Almost-Right Keepsake</h4>
        <p className="scrapbook-subtitle">
          Turn through the pressed pages to revisit every place Morrow repaired and the friends who made each mistake wonderful.
        </p>

        {/* Primary Mode Switcher (Memories vs Friends) */}
        <div className="scrapbook-mode-switcher" role="tablist" aria-label="Scrapbook sections">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'memories'}
            className={`scrapbook-mode-btn ${activeTab === 'memories' ? 'is-active' : ''}`}
            onClick={() => handleSelectTab('memories')}
          >
            <MapPin size={14} aria-hidden="true" />
            <span>5 Milestone Memories</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'friends'}
            className={`scrapbook-mode-btn ${activeTab === 'friends' ? 'is-active' : ''}`}
            onClick={() => handleSelectTab('friends')}
          >
            <Heart size={14} aria-hidden="true" />
            <span>The Almost-Right Friends ({CHARACTERS.length})</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: FIVE MILESTONE JOURNEY MEMORIES
         ========================================================================= */}
      {activeTab === 'memories' && (
        <div className="scrapbook-memories-view" role="tabpanel" aria-label="Milestone journey memories">
          {/* Chapter Selector Timeline Strip */}
          <div className="scrapbook-tabs memories-tab-strip" role="tablist" aria-label="Milestone chapters">
            {MILESTONE_MEMORIES.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={m.id === selectedMemoryId}
                className={`scrapbook-tab ${m.id === selectedMemoryId ? 'is-active' : ''}`}
                onClick={() => handleSelectMemory(m.id)}
              >
                <span className="tab-chapter-number">{m.chapterNumber}</span>
                <span className="tab-chapter-tag">{m.chapterTag}</span>
              </button>
            ))}
          </div>

          {/* Active Milestone Pressed Page Card */}
          <div className="scrapbook-card milestone-memory-page" key={activeMemory.id}>
            {/* Top Washi-Tape Header */}
            <div className="washi-tape-accent" aria-hidden="true" />

            <div className="milestone-content-layout">
              {/* Polaroid Photo Frame */}
              <div className="polaroid-frame" aria-label={`Polaroid photograph: ${activeMemory.photoCaption}`}>
                {/* Brass Pushpin */}
                <div className="polaroid-pushpin" aria-hidden="true" />

                <div className="polaroid-photo" style={{ background: activeMemory.photoBg }}>
                  <span className="polaroid-symbol" aria-hidden="true">{activeMemory.photoIcon}</span>
                  <div className="polaroid-photo-overlay">
                    <span className="polaroid-date-badge">{activeMemory.date}</span>
                  </div>
                </div>

                <p className="polaroid-caption">{activeMemory.photoCaption}</p>
              </div>

              {/* Narrative Story Entry */}
              <div className="milestone-narrative">
                <div className="scrapbook-card-top">
                  <div className="scrapbook-titles">
                    <span className="scrapbook-role">{activeMemory.chapterTag} · {activeMemory.date}</span>
                    <h3 className="scrapbook-name">{activeMemory.title}</h3>
                  </div>

                  {/* Official Ink Stamp */}
                  <div
                    className="scrapbook-stamp tactile-ink-stamp"
                    style={{ borderColor: activeMemory.stampColor, color: activeMemory.stampColor }}
                  >
                    <Stamp size={13} aria-hidden="true" />
                    <span>{activeMemory.stampText}</span>
                  </div>
                </div>

                <blockquote className="scrapbook-quote memory-excerpt">
                  {activeMemory.excerpt}
                </blockquote>

                {/* Sir Clack's Disaster Log Postscript */}
                <div className="clack-log-annotation">
                  <div className="clack-log-label">
                    <CheckCircle size={13} aria-hidden="true" />
                    <span>SIR CLACK’S PRIVATE DISASTER LOG NOTE</span>
                  </div>
                  <p>{activeMemory.clackNote}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: THE ALMOST-RIGHT FRIENDS
         ========================================================================= */}
      {activeTab === 'friends' && (
        <div className="scrapbook-friends-view" role="tabpanel" aria-label="Character portfolios">
          {/* Character Selector Pills */}
          <div className="scrapbook-tabs" role="tablist" aria-label="Characters in Sir Clack's scrapbook">
            {CHARACTERS.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={c.id === selectedCharId}
                className={`scrapbook-tab ${c.id === selectedCharId ? 'is-active' : ''}`}
                onClick={() => handleSelectChar(c.id)}
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
      )}
    </div>
  );
};
