import { useEffect, useRef } from 'react';
import { ArrowRight, Bell } from 'lucide-react';

type Props = {
  beat: number;
  awake: boolean;
  onBell: () => void;
  onNext: () => void;
};

const beats = [
  { title: 'A very bad first day', shot: 'establish', label: 'SOMEWHERE BETWEEN A WISH AND A LOOSE THREAD…', speaker: '', words: '' },
  { title: 'A small sound', shot: 'bell', label: 'CLOSE-UP', speaker: '', words: '' },
  { title: 'An unexpected visitor', shot: 'reaction', label: 'SUDDENLY!', speaker: 'MORROW', words: 'AH! A GIANT!' },
  { title: 'From a very small point of view', shot: 'giant', label: 'MORROW’S POINT OF VIEW', speaker: '', words: '' },
  { title: 'A very reasonable explanation', shot: 'clack', label: 'TWO-SHOT', speaker: 'SIR CLACK', words: 'That is a visitor, you walnut.' },
  { title: 'Introductions', shot: 'hello', label: 'HELLO!', speaker: 'MORROW', words: 'HELLO, POTENTIALLY POLITE GIANT!' },
  { title: 'Breaking news', shot: 'pipkin', label: 'WHOOSH!', speaker: 'PIPKIN', words: 'EMERGENCY! THE WORLD IS BROKEN!' },
  { title: 'An important question', shot: 'question', label: 'A VERY LONG PAUSE', speaker: 'SIR CLACK', words: 'Which part?' },
  { title: 'A very short answer', shot: 'exit', label: 'NEXT: THE SHADOW SCANDAL', speaker: 'PIPKIN', words: 'YES.' },
] as const;

function Balloon({ speaker, words, side = 'left' }: { speaker: string; words: string; side?: 'left' | 'right' }) {
  return <div className={`comic-balloon comic-balloon--${side}`}>
    <span className="comic-speaker">{speaker}</span>
    <p>{words}</p>
  </div>;
}

export function WorkshopComic({ beat, awake, onBell, onNext }: Props) {
  const newest = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (beat > 0 && newest.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      newest.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [beat]);
  return <div className="comic-workshop">
    <header className="comic-heading">
      <span>PROLOGUE · 01 / 06</span>
      <h1>The Workshop</h1>
      <p>Scroll through the story. Each frame is another moment, not another version of Morrow.</p>
    </header>
    <div className="comic-strip" aria-label="Workshop comic panels">
      {beats.slice(0, awake ? beat + 2 : 1).map((panel, i) => {
        const current = i === (awake ? Math.min(beat + 1, beats.length - 1) : 0);
        return <section ref={current ? newest : undefined} key={panel.shot} className={`comic-panel comic-panel--${panel.shot}`} aria-label={panel.title}>
          <span className="comic-panel-caption">{panel.label}</span>
          {panel.shot === 'establish' && <>
            <div className="comic-establish-image" role="img" aria-label="Morrow's warmly lit miniature workshop"/>
            <div className="comic-narrator">Once upon a nearly-perfect morning, a very small mistake was sleeping.</div>
          </>}
          {panel.shot === 'bell' && <>
            <div className="comic-bell-drawing" aria-hidden="true"><Bell size={90} strokeWidth={1.6}/></div>
            <strong className="comic-sfx">DING!</strong>
          </>}
          {(panel.shot === 'reaction' || panel.shot === 'hello' || panel.shot === 'clack') && <img className="comic-morrow" src="/characters/morrow.png" alt="Morrow, the peach felt Stitchling" />}
          {panel.shot === 'giant' && <>
            <div className="comic-visitor" aria-hidden="true"><span/></div>
            <div className="comic-narrator">To someone the size of a spool, every visitor looks enormous.</div>
          </>}
          {panel.shot === 'clack' && <div className="comic-clack-placeholder" aria-label="Sir Clack's position, awaiting matching handcrafted panel art"><span>SIR CLACK</span></div>}
          {panel.shot === 'pipkin' && <><div className="comic-paper" aria-hidden="true"><strong>EXTRA!</strong><span>THE WORLD IS BROKEN</span></div><div className="comic-speed-lines" aria-hidden="true"/></>}
          {panel.shot === 'question' && <div className="comic-silence" aria-hidden="true">…</div>}
          {panel.shot === 'exit' && <div className="comic-door" aria-hidden="true"><span>?</span></div>}
          {panel.words && <Balloon speaker={panel.speaker} words={panel.words} side={panel.shot === 'clack' ? 'right' : 'left'}/>}
          {panel.shot === 'bell' && !awake && <button className="comic-bell-action" onClick={onBell} type="button">Ring the bell to wake the workshop <Bell size={20}/></button>}
        </section>;
      })}
    </div>
    <section className="storybook-reading comic-reading" aria-label="Story dialogue">
      <span className="story-overline">PROLOGUE · A VERY BAD FIRST DAY</span>
      <h2>The Workshop</h2>
      {!awake ? <button type="button" className="storybook-action" onClick={onBell}>Ring the bell to wake the workshop <Bell size={20}/></button>
        : beat < 7 ? <button className="storybook-action" type="button" onClick={onNext}>Turn the page <ArrowRight size={18}/></button>
        : null}
      <span className="storybook-page-number">{awake ? Math.min(beat + 2, 9) : 1} of 9 panels · Scroll to read</span>
    </section>
  </div>;
}
