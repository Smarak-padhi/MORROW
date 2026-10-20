import { useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Bell } from 'lucide-react';
import { ComicVideoPanel } from './ComicVideoPanel';
import {
  Panel1Establish,
  Panel2Bell,
  Panel3Reaction,
  Panel4GiantPOV,
  Panel5TwoShot,
  Panel6Hello,
  Panel7Pipkin,
  Panel8Pause,
  Panel9Exit,
} from './art/WorkshopComicScenes';

type Props = {
  beat: number;
  awake: boolean;
  onBell: () => void;
  onNext: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
};

const beats = [
  {
    title: 'A very bad first day',
    shot: 'establish',
    label: 'SOMEWHERE BETWEEN A WISH AND A LOOSE THREAD…',
    speaker: '',
    words: '',
    videoSrc: null,
    posterSrc: null,
  },
  {
    title: 'A small sound',
    shot: 'bell',
    label: 'CLOSE-UP',
    speaker: '',
    words: '',
    videoSrc: null,
    posterSrc: null,
  },
  {
    title: 'An unexpected visitor',
    shot: 'reaction',
    label: 'SUDDENLY!',
    speaker: 'MORROW',
    words: 'AH! A GIANT!',
    videoSrc: '/cinematics/prologue-02-giant.mp4',
    posterSrc: '/cinematics/prologue-02-giant-poster.jpg',
  },
  {
    title: 'From a very small point of view',
    shot: 'giant',
    label: 'MORROW’S POINT OF VIEW',
    speaker: '',
    words: '',
    videoSrc: null,
    posterSrc: null,
  },
  {
    title: 'A very reasonable explanation',
    shot: 'clack',
    label: 'TWO-SHOT',
    speaker: 'SIR CLACK',
    words: 'That is a visitor, you walnut.',
    videoSrc: '/cinematics/prologue-03-clack-visitor.mp4',
    posterSrc: '/cinematics/prologue-03-clack-visitor-poster.jpg',
  },
  {
    title: 'Introductions',
    shot: 'hello',
    label: 'HELLO!',
    speaker: 'MORROW',
    words: 'HELLO, POTENTIALLY POLITE GIANT!',
    videoSrc: '/cinematics/prologue-04-morrow-hello.mp4',
    posterSrc: '/cinematics/prologue-04-morrow-hello-poster.jpg',
  },
  {
    title: 'Breaking news',
    shot: 'pipkin',
    label: 'WHOOSH!',
    speaker: 'PIPKIN',
    words: 'EMERGENCY! THE WORLD IS BROKEN!',
    videoSrc: '/cinematics/prologue-05-pipkin-emergency.mp4',
    posterSrc: '/cinematics/prologue-05-pipkin-emergency-poster.jpg',
  },
  {
    title: 'An important question',
    shot: 'question',
    label: 'A VERY LONG PAUSE',
    speaker: 'SIR CLACK',
    words: 'Which part?',
    videoSrc: '/cinematics/prologue-06-clack-which-part.mp4',
    posterSrc: '/cinematics/prologue-06-clack-which-part-poster.jpg',
  },
  {
    title: 'A very short answer',
    shot: 'exit',
    label: 'NEXT: THE SHADOW SCANDAL',
    speaker: 'PIPKIN',
    words: 'YES.',
    videoSrc: '/cinematics/prologue-07-pipkin-yes.mp4',
    posterSrc: '/cinematics/prologue-07-pipkin-yes-poster.jpg',
  },
] as const;

function Balloon({ speaker, words, side = 'left' }: { speaker: string; words: string; side?: 'left' | 'right' }) {
  return (
    <div className={`comic-balloon comic-balloon--${side}`}>
      <span className="comic-speaker">{speaker}</span>
      <p>{words}</p>
    </div>
  );
}

export function WorkshopComic({ beat, awake, onBell, onNext, isMuted, onToggleMute }: Props) {
  const newest = useRef<HTMLElement | null>(null);
  const autoAdvanceTimer = useRef<number | null>(null);
  const lastAdvancedBeat = useRef<number>(-1);

  // Safe advancement wrapper to prevent race conditions or duplicate step triggers
  const safeAdvance = useCallback(() => {
    if (autoAdvanceTimer.current) {
      window.clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    if (lastAdvancedBeat.current === beat) return;
    lastAdvancedBeat.current = beat;
    onNext();
  }, [beat, onNext]);

  useEffect(() => {
    if (beat > 0 && newest.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      newest.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [beat]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) window.clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  // For reduced-motion fallback where video is skipped or disabled:
  useEffect(() => {
    if (!awake) return;
    if (beat === 3 && typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (autoAdvanceTimer.current) window.clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = window.setTimeout(() => {
        safeAdvance();
      }, 2500);
    }
  }, [beat, awake, safeAdvance]);

  return (
    <div className="comic-workshop">
      <header className="comic-heading">
        <span>PROLOGUE · 01 / 06</span>
        <h1>The Workshop</h1>
        <p>A little mistake. A very big adventure.</p>
      </header>

      <div className="comic-strip" aria-label="Workshop comic panels">
        {beats.slice(0, awake ? beat + 2 : 1).map((panel, i) => {
          const current = i === (awake ? Math.min(beat + 1, beats.length - 1) : 0);

          return (
            <section
              ref={current ? newest : undefined}
              key={panel.shot}
              className={`comic-panel comic-panel--${panel.shot}`}
              aria-label={panel.title}
            >
              <span className="comic-panel-caption">{panel.label}</span>

              {/* Panel visual: video when available with procedural fallback, or pure handcrafted scene */}
              {panel.videoSrc && panel.posterSrc ? (
                <ComicVideoPanel
                  src={panel.videoSrc}
                  poster={panel.posterSrc}
                  ariaLabel={panel.title}
                  autoPlay={current}
                  isMuted={isMuted}
                  onToggleMute={onToggleMute}
                  onEnded={() => {
                    if (!current) return;
                    if (panel.shot === 'clack') {
                      // Sir Clack's cinematic panel (prologue-03-clack-visitor.mp4) finishes playing FIRST,
                      // followed by the 800 ms comedic pause, followed by Morrow's response.
                      if (autoAdvanceTimer.current) window.clearTimeout(autoAdvanceTimer.current);
                      autoAdvanceTimer.current = window.setTimeout(() => {
                        safeAdvance();
                      }, 800); // 0.8-second comedic pause
                    } else if (i < beats.length - 1) {
                      // For other video panels, automatically advance once the clip finishes playing
                      safeAdvance();
                    }
                  }}
                  fallbackArt={
                    <>
                      {panel.shot === 'reaction' && <Panel3Reaction />}
                      {panel.shot === 'clack' && <Panel5TwoShot />}
                      {panel.shot === 'hello' && <Panel6Hello />}
                      {panel.shot === 'pipkin' && <Panel7Pipkin />}
                      {panel.shot === 'question' && <Panel8Pause />}
                      {panel.shot === 'exit' && <Panel9Exit />}
                    </>
                  }
                />
              ) : (
                <div className="comic-art-stage">
                  {panel.shot === 'establish' && <Panel1Establish />}
                  {panel.shot === 'bell' && <Panel2Bell />}
                  {panel.shot === 'giant' && <Panel4GiantPOV />}
                </div>
              )}

              {/* Narrative Captions & Bell overlays */}
              {panel.shot === 'establish' && (
                <div className="comic-narrator">
                  Once upon a nearly-perfect morning, a very small mistake was sleeping. Then came a bell.
                </div>
              )}

              {panel.shot === 'bell' && (
                <div className="comic-bell-overlay">
                  <strong className="comic-sfx">DING!</strong>
                  {!awake && (
                    <button className="comic-bell-action" onClick={onBell} type="button">
                      Ring the bell to wake the workshop <Bell size={20} />
                    </button>
                  )}
                </div>
              )}

              {panel.shot === 'giant' && (
                <div className="comic-narrator">
                  To someone the size of a spool, every visitor looks enormous.
                </div>
              )}

              {panel.words && (
                <Balloon
                  speaker={panel.speaker}
                  words={panel.words}
                  side={panel.shot === 'clack' ? 'right' : 'left'}
                />
              )}
            </section>
          );
        })}
      </div>

      <section className="storybook-reading comic-reading" aria-label="Story dialogue">
        <span className="story-overline">PROLOGUE · A VERY BAD FIRST DAY</span>
        <h2>The Workshop</h2>
        {!awake ? (
          <button type="button" className="storybook-action" onClick={onBell}>
            Ring the bell to wake the workshop <Bell size={20} />
          </button>
        ) : beat < 7 ? (
          <button
            className="storybook-action"
            type="button"
            onClick={safeAdvance}
            aria-label="Turn the page · Continue story"
          >
            {beat === 3 ? 'Awaiting response…' : 'Continue story'} <ArrowRight size={18} />
          </button>
        ) : null}
        <span className="storybook-page-number">
          {awake ? Math.min(beat + 2, 9) : 1} of 9 panels · Scroll to read
        </span>
      </section>
    </div>
  );
}
