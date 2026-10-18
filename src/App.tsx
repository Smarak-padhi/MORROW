import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Map as MapIcon,
  Moon,
  RotateCcw,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { chapters, dialogues, type ChapterId } from './story';
import { Morrow, type MorrowExpression } from './components/art/Morrow';
import { SirClack, Pipkin, TheUnfinishedOne } from './components/art/SupportingCast';
import { ShadowStitcher } from './components/inventions/ShadowStitcher';
import { WeatherLoom } from './components/inventions/WeatherLoom';
import { ImpossibleClock } from './components/inventions/ImpossibleClock';
import { FinaleStitch } from './components/inventions/FinaleStitch';

type Saved = {
  completed: ChapterId[];
  active: ChapterId;
  muted: boolean;
  easter: boolean;
};

const initial: Saved = {
  completed: [],
  active: 'workshop',
  muted: true,
  easter: false,
};

const known = chapters.map((c) => c.id);

function load(): Saved {
  try {
    const s = JSON.parse(localStorage.getItem('morrow-v1') || 'null');
    if (!s) return initial;
    return {
      completed: Array.isArray(s.completed)
        ? s.completed.filter((x: ChapterId) => known.includes(x))
        : [],
      active: known.includes(s.active) ? s.active : 'workshop',
      muted: s.muted !== false,
      easter: s.easter === true,
    };
  } catch {
    return initial;
  }
}

function App() {
  const [save, setSave] = useState<Saved>(load);
  const [dialog, setDialog] = useState(0);
  const [night, setNight] = useState(false);
  const [bell, setBell] = useState(0);
  const [view, setView] = useState<'story' | 'map'>('story');
  const [puzzleDone, setPuzzleDone] = useState(false);

  useEffect(() => {
    localStorage.setItem('morrow-v1', JSON.stringify(save));
  }, [save]);

  const idx = chapters.findIndex((c) => c.id === save.active);
  const chapter = chapters[idx];
  const unlocked = (i: number) => i === 0 || save.completed.includes(chapters[i - 1].id);

  function playChime() {
    if (save.muted) return;
    try {
      const AudioContextCtor = window.AudioContext;
      const ctx = new AudioContextCtor();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 660;
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.17);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
      osc.onended = () => void ctx.close();
    } catch {
      // Audio fallback
    }
  }

  function select(id: ChapterId) {
    const i = chapters.findIndex((c) => c.id === id);
    if (!unlocked(i)) return;
    setSave((s) => ({ ...s, active: id }));
    setDialog(0);
    setPuzzleDone(save.completed.includes(id));
    setView('story');
  }

  function complete() {
    setSave((s) => ({ ...s, completed: [...new Set([...s.completed, s.active])] }));
    if (idx < chapters.length - 1) {
      selectNext();
    } else {
      setView('map');
    }
  }

  function selectNext() {
    const next = chapters[idx + 1];
    if (next) {
      setSave((s) => ({
        ...s,
        completed: [...new Set([...s.completed, s.active])],
        active: next.id,
      }));
      setDialog(0);
      setPuzzleDone(save.completed.includes(next.id));
      setView('story');
    }
  }

  // Derive Morrow's current expression based on narrative context
  const getExpression = (): MorrowExpression => {
    if (save.active === 'workshop') return 'surprised';
    if (save.active === 'shadows') return 'curious';
    if (save.active === 'weather') return 'focused';
    if (save.active === 'clock') return 'determined';
    if (save.active === 'finale') return 'sheepish';
    return 'happy';
  };

  const isPuzzleStep = ['shadows', 'weather', 'clock', 'finale'].includes(save.active);
  const canAdvance = !isPuzzleStep || puzzleDone || save.completed.includes(save.active);

  return (
    <div className={night ? 'app night' : 'app'}>
      <header className="topbar">
        <a className="brand" href="#top" onClick={() => setView('story')}>
          <span className="brand-mark">✳</span> MORROW<span className="brand-dot">.</span>
        </a>
        <nav aria-label="Main navigation">
          <button
            type="button"
            onClick={() => setView('story')}
            aria-pressed={view === 'story'}
          >
            <BookOpen size={17} /> Story
          </button>
          <button
            type="button"
            onClick={() => setView('map')}
            aria-pressed={view === 'map'}
          >
            <MapIcon size={17} /> World map
          </button>
        </nav>
        <div className="top-actions">
          <button
            type="button"
            aria-label={night ? 'Use daylight' : 'Use night mode'}
            title="Toggle mood"
            onClick={() => setNight((x) => !x)}
          >
            {night ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button
            type="button"
            aria-label={save.muted ? 'Enable sound' : 'Mute sound'}
            title="Toggle sound"
            onClick={() => setSave((s) => ({ ...s, muted: !s.muted }))}
          >
            {save.muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="intro">
          <p className="eyebrow">AN INTERACTIVE LITTLE ADVENTURE • TRACK 2</p>
          <h1>
            Good things start <em>imperfect.</em>
          </h1>
          <p>
            Meet Morrow. A tiny Stitchling inventor with a magical needle, a questionable repair license, and a world to stitch back together.
          </p>
        </section>

        <div
          className="progress"
          aria-label={`${save.completed.length} of ${chapters.length} chapters completed`}
        >
          <div className="progress-label">
            <span>THE GREAT STITCHED JOURNEY</span>
            <span>
              {save.completed.length} / {chapters.length} complete
            </span>
          </div>
          <div className="track">
            <div style={{ width: `${(save.completed.length / chapters.length) * 100}%` }} />
          </div>
        </div>

        {view === 'map' ? (
          <section className="world-panel">
            <div className="section-top">
              <div>
                <p className="eyebrow">THE WORLD IS NOT QUITE RIGHT</p>
                <h2>The floating world</h2>
                <p>Completed islands bloom. Select an unlocked island to explore.</p>
              </div>
            </div>
            <div className="island-map">
              {chapters.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  className={`island island-${i} ${unlocked(i) ? 'open' : 'locked'}`}
                  disabled={!unlocked(i)}
                  onClick={() => select(c.id)}
                >
                  <span className="island-emoji" aria-hidden="true">
                    {['⌂', '♧', '☁', '◷', '✧', '✿'][i]}
                  </span>
                  <strong>{c.name}</strong>
                  <small>
                    {save.completed.includes(c.id)
                      ? '✓ Completed'
                      : unlocked(i)
                      ? 'Explore'
                      : 'Locked'}
                  </small>
                </button>
              ))}
            </div>
            <div className="map-foot">
              A stitched path connects the places you have discovered.{' '}
              <span>Tap a location to explore.</span>
            </div>
          </section>
        ) : (
          <section className="chapter-layout">
            <div className="scene">
              <div className="scene-stars" aria-hidden="true">
                ✦ · ✧ · ✦
              </div>
              <div className="scene-orbit orbit-one" />
              <div className="scene-orbit orbit-two" />

              <div className="scene-art">
                <Morrow expression={getExpression()} />
                <div className="scene-bubble">{chapter.quote}</div>
              </div>

              {/* Supporting cast cameos based on chapter */}
              {save.active === 'workshop' && <SirClack className="scene-cast cast-left" />}
              {save.active === 'weather' && <Pipkin className="scene-cast cast-right" />}
              {save.active === 'finale' && <TheUnfinishedOne className="scene-cast cast-left" />}

              <div className="scene-bottom">
                <span>✂ THE ALMOST-RIGHT REPAIR SHOP</span>
                <span>{chapter.tag}</span>
              </div>
            </div>

            <div className="story-panel">
              <p className="eyebrow">
                {chapter.tag} / {chapter.subtitle}
              </p>
              <h2>{chapter.name}</h2>
              <p className="chapter-detail">{chapter.detail}</p>

              <div className="dialogue" aria-live="polite">
                <span className="dialogue-tag">STORYBOOK</span>
                <p>{dialogues[save.active][dialog]}</p>
                <div className="dialogue-actions">
                  <span>
                    {dialog + 1} / {dialogues[save.active].length}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setDialog((d) => (d + 1) % dialogues[save.active].length);
                      playChime();
                    }}
                  >
                    Next line <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Functional Inventions per Chapter */}
              {save.active === 'shadows' && (
                <ShadowStitcher
                  playChime={playChime}
                  onSuccess={() => setPuzzleDone(true)}
                />
              )}

              {save.active === 'weather' && (
                <WeatherLoom
                  playChime={playChime}
                  onSuccess={() => setPuzzleDone(true)}
                />
              )}

              {save.active === 'clock' && (
                <ImpossibleClock
                  playChime={playChime}
                  onSuccess={() => setPuzzleDone(true)}
                />
              )}

              {save.active === 'finale' && (
                <FinaleStitch
                  playChime={playChime}
                  onSuccess={() => setPuzzleDone(true)}
                />
              )}

              {save.active === 'workshop' && (
                <div className="note">
                  <span>✳</span> First mission: wake the workshop and meet the crew. Tap "Next line" to hear the news, then continue your journey!
                </div>
              )}

              {save.active === 'epilogue' && (
                <div className="note">
                  <span>✳</span> The repair shop's motto is sealed: <em>"We make wonderful mistakes."</em>
                </div>
              )}

              <button
                type="button"
                className="primary"
                disabled={!canAdvance}
                onClick={() => {
                  playChime();
                  complete();
                }}
              >
                {idx === chapters.length - 1
                  ? 'Finish adventure'
                  : `Continue to ${chapters[Math.min(idx + 1, chapters.length - 1)].name}`}{' '}
                <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        <section className="extras">
          <div>
            <p className="eyebrow">A VERY OFFICIAL RECORD</p>
            <h2>Disaster department</h2>
            <p>Sir Clack insists these are 'valuable educational incidents'.</p>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setBell((n) => n + 1);
                if (bell + 1 >= 5) setSave((s) => ({ ...s, easter: true }));
                playChime();
              }}
            >
              Ring the workshop bell <span>↗</span>
            </button>
            {save.easter && (
              <p className="secret">
                SECRET FOUND: The fourth stitch. The website itself is Morrow's newest invention!
              </p>
            )}
          </div>
          <div className="counter">
            <small>OFFICIAL DISASTER COUNT</small>
            <strong>{String(bell + 3).padStart(5, '0')}</strong>
            <span>
              {bell > 0
                ? 'Sir Clack: I am running out of ink.'
                : 'Sir Clack: A remarkably peaceful afternoon.'}
            </span>
          </div>
        </section>

        <section className="character-sheet">
          <p className="eyebrow">ORIGINAL CHARACTER SHEET</p>
          <h2>Meet the Stitchling</h2>
          <div className="facts">
            <p>
              <strong>Name</strong>Morrow
            </p>
            <p>
              <strong>Species</strong>Stitchling (original fantasy creature)
            </p>
            <p>
              <strong>Profession</strong>Apprentice Impossible-Things Repairer
            </p>
            <p>
              <strong>Personality</strong>Gentle, impulsive, curious, clumsy
            </p>
            <p>
              <strong>Story</strong>Born from a wish and loose thread, learning that difference is not damage.
            </p>
            <p>
              <strong>Tagline</strong>We make wonderful mistakes.
            </p>
          </div>

          <h3>Three inventions</h3>
          <div className="inventions">
            {['Shadow Stitcher', 'Weather Loom', 'Impossible Clock'].map((n, i) => (
              <article key={n}>
                <span>0{i + 1}</span>
                <h4>{n}</h4>
                <p>
                  {[
                    'A magical needle that joins lost shadows to living things.',
                    'A loom that weaves clouds, rain and wind into unexpected weather.',
                    'A clock that measures meaningful moments as well as time.',
                  ][i]}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <span>✳ MORROW — A WONDERFULLY WRONG LITTLE WEBSITE</span>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset saved adventure progress?')) {
              setSave(initial);
              setDialog(0);
              setView('story');
              setPuzzleDone(false);
            }
          }}
        >
          <RotateCcw size={15} /> Reset adventure
        </button>
        <span>
          <Check size={15} /> Original character design; all 3 inventions functional; zero external IP
        </span>
      </footer>
    </div>
  );
}

export default App;
