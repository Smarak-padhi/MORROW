import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Map as MapIcon, Moon, Sun, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { chapters, dialogues, type ChapterId } from './story';
import { sound, type AudioEffect } from './sound';

import { ShadowStitcher } from './components/inventions/ShadowStitcher';
import { WeatherLoom } from './components/inventions/WeatherLoom';
import { ImpossibleClock } from './components/inventions/ImpossibleClock';
import { FinaleStitch } from './components/inventions/FinaleStitch';
import { Cinematic } from './components/Cinematic';
import { WorkshopComic } from './components/WorkshopComic';
import { ShadowStage } from './components/art/ShadowStage';
import { WeatherStage } from './components/art/WeatherStage';
import { ClockStage } from './components/art/ClockStage';
import { FinaleStage } from './components/art/FinaleStage';
import { EpilogueStage } from './components/art/EpilogueStage';
import { CharacterScrapbook } from './components/CharacterScrapbook';

type Saved = { completed: ChapterId[]; active: ChapterId; muted: boolean; easter: boolean; started: boolean };
const initial: Saved = { completed: [], active: 'workshop', muted: true, easter: false, started: false };
const known = chapters.map(c => c.id);
const puzzleChapters: ChapterId[] = ['shadows', 'weather', 'clock', 'finale'];

function load(): Saved {
  try {
    const old = JSON.parse(localStorage.getItem('morrow-v2') || localStorage.getItem('morrow-v1') || 'null');
    if (!old) return initial;
    const completed = Array.isArray(old.completed) ? old.completed.filter((id: ChapterId) => known.includes(id)) : [];
    return {
      completed,
      active: known.includes(old.active) ? old.active : 'workshop',
      muted: old.muted !== false,
      easter: old.easter === true,
      started: old.started === true || old.active !== 'workshop' || completed.length > 0,
    };
  } catch { return initial; }
}

export default function App() {
  const [save, setSave] = useState<Saved>(load);
  const [cinematic, setCinematic] = useState<string | null>(null);
  const [dialog, setDialog] = useState(0);
  const [night, setNight] = useState(false);
  const [view, setView] = useState<'story' | 'map'>('story');
  const [bell, setBell] = useState(0);
  const [awake, setAwake] = useState(false);
  const [puzzleDone, setPuzzleDone] = useState(false);
  const idx = chapters.findIndex(c => c.id === save.active);
  const chapter = chapters[Math.max(idx, 0)];
  const lines = dialogues[chapter.id];
  const lastLine = chapter.id === 'workshop' ? dialog >= 7 : dialog === lines.length - 1;
  const puzzleNeeded = puzzleChapters.includes(chapter.id);
  const ready = lastLine && (!puzzleNeeded || puzzleDone || save.completed.includes(chapter.id));
  const completedCount = save.completed.length;

  useEffect(() => { localStorage.setItem('morrow-v2', JSON.stringify(save)); }, [save]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [save.active, view, save.started]);
  // Re-observe story panels after each page turn. CSS only hides panels once
  // the observer is active; no-JS and reduced-motion content stays visible.
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    const nodes = document.querySelectorAll('.reveal-on-scroll');
    nodes.forEach(node => observer.observe(node));
    document.documentElement.classList.add('motion-ready');
    return () => { observer.disconnect(); document.documentElement.classList.remove('motion-ready'); };
  }, [save.active, save.started, view, dialog]);

  function play(effect: AudioEffect = 'chime') { sound.play(effect, save.muted); }
  function select(id: ChapterId) {
    const i = chapters.findIndex(c => c.id === id);
    if (i < 0 || (i !== 0 && !save.completed.includes(chapters[i - 1].id))) return;
    setSave(s => ({ ...s, active: id }));
    setDialog(0);
    setPuzzleDone(false);
    setView('story');
  }
  function nextChapter() {
    if (!ready) return;
    play('chime');
    const next = chapters[idx + 1];
    setSave(s => ({
      ...s,
      completed: [...new Set([...s.completed, chapter.id])],
      active: next ? next.id : chapter.id,
    }));
    setDialog(0);
    setPuzzleDone(false);
    setView('story');
    // Ship-first release: only the approved waking film plays. Chapter arrivals
    // are interactive story scenes until optional cinematic assets are approved.
    // Never request missing MP4 files during chapter transitions.
  }

  return (
    <div className={`app morrow-story ${night ? 'night' : ''}`}>
      <header className="story-topbar">
        <span className="story-brand">✳ MORROW</span>
        <div className="story-top-actions">
          {save.started && <button type="button" onClick={() => setView(v => v === 'story' ? 'map' : 'story')} aria-label={view === 'story' ? 'Open chapter map' : 'Return to story'}><MapIcon size={19}/><span className="desktop-label">{view === 'story' ? 'Chapters' : 'Return'}</span></button>}
          <button type="button" onClick={() => setNight(v => !v)} aria-label={night ? 'Daylight mode' : 'Night mode'}>{night ? <Sun size={19}/> : <Moon size={19}/>}</button>
          <button type="button" onClick={() => setSave(s => ({ ...s, muted: !s.muted }))} aria-label={save.muted ? 'Enable sound' : 'Mute sound'}>{save.muted ? <VolumeX size={19}/> : <Volume2 size={19}/>}</button>
        </div>
      </header>

      {cinematic ? (
        <Cinematic key={cinematic} scene={cinematic} onFinish={() => {
          setCinematic(null);
          if (!save.started) setSave(current => ({ ...current, started: true }));
        }}/>
      ) : !save.started ? (
        <main className="opening-scene">
          <div className="opening-glow" aria-hidden="true"/>
          <span className="opening-kicker">SOMEWHERE BETWEEN A WISH AND A LOOSE THREAD…</span>
          <div className="opening-character storybook-vignette-cameo">
            <img className="felt-morrow-vignette" src="/cinematics/morrow-waking-poster.jpg" alt="Morrow sleeping softly on his workbench before the adventure begins" />
          </div>
          <div className="opening-narration">
            <p className="opening-whisper">Once upon a nearly-perfect morning,</p>
            <h1>a very small mistake <em>woke up.</em></h1>
            <p>His name was Morrow. He could stitch almost anything together. Unfortunately, almost anything was currently falling apart.</p>
            <button className="storybook-action" type="button" onClick={() => { play('chime'); if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setSave(s => ({ ...s, started: true })); else setCinematic('waking'); }}>Open the story <ArrowRight size={20}/></button>
            <span className="opening-hint">An interactive storybook • sound is off by default</span>
          </div>
        </main>
      ) : view === 'map' ? (
        <main className="storybook-map">
          <p className="story-overline">THE WORLD BETWEEN THE PAGES</p>
          <h1>Where shall we go?</h1>
          <p>Every place has a problem. Some have more than one.</p>
          <div className="storybook-map-grid">
            {chapters.map((c, i) => {
              const unlocked = i === 0 || save.completed.includes(chapters[i - 1].id);
              return <button key={c.id} type="button" disabled={!unlocked} onClick={() => select(c.id)} className={`storybook-island ${unlocked ? 'is-open' : 'is-locked'}`}>
                <span aria-hidden="true">{['⌂','♧','☁','◷','✧','✿'][i]}</span>
                <strong>{c.name}</strong>
                <small>{save.completed.includes(c.id) ? 'Visited ✓' : unlocked ? 'Enter chapter' : 'Still a mystery'}</small>
              </button>;
            })}
          </div>
          <button className="storybook-link" type="button" onClick={() => setView('story')}><BookOpen size={18}/> Return to the story</button>
        </main>
      ) : (
        <main className={`storybook-chapter chapter-${chapter.id}`}>
          {chapter.id === 'workshop' ? (
            <WorkshopComic
              beat={dialog}
              awake={awake || save.completed.includes('workshop')}
              onBell={() => { setAwake(true); setBell(n => n + 1); play('bell'); }}
              onNext={() => { setDialog(d => Math.min(d + 1, 7)); play('chime'); }}
            />
          ) : (
            <>
              {chapter.id === 'shadows' ? (
                <ShadowStage dialog={dialog} puzzleDone={puzzleDone || save.completed.includes('shadows')} />
              ) : chapter.id === 'weather' ? (
                <WeatherStage dialog={dialog} />
              ) : chapter.id === 'clock' ? (
                <ClockStage dialog={dialog} />
              ) : chapter.id === 'finale' ? (
                <FinaleStage dialog={dialog} />
              ) : (
                <EpilogueStage dialog={dialog} />
              )}

              <section className="storybook-reading reveal-on-scroll" aria-label="Story dialogue">
                <p className="story-overline">{chapter.tag} · {chapter.subtitle}</p>
                <h1>{chapter.name}</h1>
                <div className="storybook-dialogue story-page-turn" aria-live="polite" key={`${chapter.id}-${dialog}`}>
                  <p>{lines[dialog]}</p>
                </div>
                {!lastLine ? (
                  <button className="storybook-action" type="button" onClick={() => { setDialog(d => Math.min(d + 1, lines.length - 1)); play('chime'); }}>Turn the page <ArrowRight size={18}/></button>
                ) : null}
                <span className="storybook-page-number">{dialog + 1} of {lines.length} · {lastLine ? 'The story continues below' : 'Tap to continue'}</span>
              </section>
            </>
          )}
          {lastLine && (
            <section className="storybook-interaction reveal-on-scroll" aria-label="Chapter interaction">
              {chapter.id === 'shadows' && (
                <>
                  <ShadowStitcher playChime={() => play('stitch')} onSuccess={() => setPuzzleDone(true)}/>
                  {(puzzleDone || save.completed.includes('shadows')) && (
                    <div className="chapter-payoff-card" aria-live="polite">
                      <div className="payoff-badge">
                        <Sparkles size={16} /> BEAT 06 PAYOFF: THREE IMPOSSIBLE SHADOWS RESTORED
                      </div>
                      <p>
                        <strong>Duck</strong> is a towering oak. <strong>Little Lantern</strong> lights the sky like a constellation. And <strong>Wandering Snail</strong> waddles with quiet courage.
                      </p>
                      <p className="payoff-reflection">
                        <em>Pipkin's Notebook:</em> “Local Stitchling proves that mistakes make the world much more interesting than perfection.”
                      </p>
                    </div>
                  )}
                </>
              )}
              {chapter.id === 'weather' && <WeatherLoom playChime={() => play('stitch')} onSuccess={() => setPuzzleDone(true)}/>}
              {chapter.id === 'clock' && <ImpossibleClock playChime={() => play('gear')} onSuccess={() => setPuzzleDone(true)}/>}
              {chapter.id === 'finale' && <FinaleStitch playChime={() => play('stitch')} onSuccess={() => setPuzzleDone(true)}/>}
              {chapter.id === 'epilogue' && (
                <div className="storybook-ending">
                  <p className="story-overline">THE ALMOST-RIGHT REPAIR SHOP · EST. TODAY</p>
                  <h2>It was never broken.</h2>
                  <p>Sir Clack's disaster log turned out to be a scrapbook. Pipkin printed a special edition. Professor Perfect stamped the whole world: <strong>IMPERFECT. ACCEPTABLE. SOMEHOW LOVELY.</strong></p>
                  <div className="ending-inventions">
                    <h3>Morrow's three inventions</h3>
                    <div className="ending-grid">
                      {['Shadow Stitcher', 'Weather Loom', 'Impossible Clock'].map((name, i) => <button type="button" key={name} onClick={() => select(chapters[i+1].id)}><span>0{i+1}</span><strong>{name}</strong><small>Replay the invention ↗</small></button>)}
                    </div>
                  </div>
                  <CharacterScrapbook />
                  <button className="storybook-link" type="button" onClick={() => { setBell(n => n+1); play('bell'); if (bell + 1 >= 5) setSave(s => ({ ...s, easter: true })); }}>Ring Sir Clack's bell ({bell})</button>
                  {save.easter && <p className="story-secret">The fourth invention is this website. You helped make it.</p>}
                </div>
              )}
              {ready && <button type="button" className="storybook-action chapter-continue" onClick={nextChapter}>{idx === chapters.length-1 ? 'Seal the story' : 'Step into the next chapter'} <ArrowRight size={20}/></button>}
              {lastLine && puzzleNeeded && !ready && <p className="storybook-prompt">Morrow needs your help before the next page can turn.</p>}
            </section>
          )}
          <footer className="storybook-footer">
            <span>We make wonderful mistakes. ✳</span>
            <button type="button" onClick={() => { if (window.confirm('Start the adventure over?')) { setSave(initial); setDialog(0); setAwake(false); setPuzzleDone(false); setView('story'); setCinematic(null); } }}><RotateCcw size={16}/> Start over</button>
            <span>{completedCount} chapters visited</span>
          </footer>
        </main>
      )}
    </div>
  );
}
