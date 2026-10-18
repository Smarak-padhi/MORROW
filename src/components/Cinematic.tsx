import { useEffect, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, Volume2, VolumeX } from 'lucide-react';

type Props = { scene: string; onFinish: () => void };
export function Cinematic({ scene, onFinish }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const [ended, setEnded] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onFinish(); return; }
    const timeout = window.setTimeout(() => { if (video.current && video.current.readyState === 0) setFailed(true); }, 6500);
    return () => window.clearTimeout(timeout);
  }, [scene, onFinish]);
  if (failed) return (
    <main className="cinematic-fallback">
      <span className="cinematic-eyebrow">A PAGE IS TURNING…</span>
      <h1>Every wonderful mistake starts somewhere.</h1>
      <button className="storybook-action" onClick={onFinish} type="button">Continue the adventure <ArrowRight size={18}/></button>
    </main>
  );
  return (
    <main className="cinematic-player" aria-label={`Animated story scene: ${scene}`}>
      <video ref={video} key={scene} src={`/cinematics/morrow-${scene}.mp4`} poster={`/cinematics/morrow-${scene}.jpg`}
        autoPlay muted={muted} playsInline preload="auto" onEnded={() => setEnded(true)} onError={() => setFailed(true)}
        aria-label={`Morrow animated cinematic: ${scene}`}/>
      <div className="cinematic-player-shade" aria-hidden="true"/>
      <div className="cinematic-player-bar">
        <span className="cinematic-eyebrow">MORROW · {scene.replace(/-/g, ' ').toUpperCase()}</span>
        <div className="cinematic-player-buttons">
          <button type="button" onClick={() => setMuted(m => !m)} aria-label={muted ? 'Unmute cinematic' : 'Mute cinematic'}>{muted ? <VolumeX size={19}/> : <Volume2 size={19}/>}</button>
          {ended && <button type="button" onClick={() => { if (video.current) { video.current.currentTime = 0; void video.current.play(); setEnded(false); } }}><RotateCcw size={17}/> Replay</button>}
          <button type="button" onClick={onFinish}>{ended ? 'Continue story' : 'Skip scene'} <ArrowRight size={18}/></button>
        </div>
      </div>
    </main>
  );
}
