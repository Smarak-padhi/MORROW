import { useEffect, useRef, useState, useCallback } from 'react';
import { Bell, Volume2, VolumeX } from 'lucide-react';
import {
  Panel1Establish,
  Panel2Bell,
  Panel4GiantPOV,
  Panel3Reaction,
  Panel5TwoShot,
  Panel6Hello,
  Panel7Pipkin,
  Panel8Pause,
  Panel9Exit,
} from './art/WorkshopComicScenes';
import { CinematicStage } from './cinematic/CinematicStage';
import { DialogueOverlay } from './cinematic/DialogueOverlay';
import { StoryControls } from './cinematic/StoryControls';

export interface WorkshopComicProps {
  beat: number;
  awake: boolean;
  onBell: () => void;
  onNext: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export interface WorkshopBeatDef {
  id: string;
  shot: string;
  title: string;
  badge: string;
  speaker?: string;
  role?: string;
  words?: string;
  narrator?: string;
  videoSrc?: string;
  posterSrc?: string;
}

export const WORKSHOP_BEATS: WorkshopBeatDef[] = [
  {
    id: 'beat-0',
    shot: 'establish',
    title: 'A Very Bad First Day',
    badge: 'PROLOGUE · SCENE 01',
    narrator: 'Somewhere between a wish and a loose thread… once upon a nearly-perfect morning, a very small mistake was sleeping.',
  },
  {
    id: 'beat-1',
    shot: 'bell',
    title: 'The Counter Bell',
    badge: 'PROLOGUE · SCENE 02',
    narrator: 'On the timber counter sits Sir Clack’s antique brass bell. Give it a firm ring to open the repair shop.',
  },
  {
    id: 'beat-2',
    shot: 'giant-entry',
    title: 'An Unexpected Visitor',
    badge: 'PROLOGUE · SCENE 03',
    speaker: 'MORROW',
    role: 'APPRENTICE STITCHLING',
    words: 'AH! A GIANT!',
    videoSrc: '/cinematics/prologue-02-giant.mp4',
    posterSrc: '/cinematics/prologue-02-giant-poster.jpg',
  },
  {
    id: 'beat-3',
    shot: 'giant-pov',
    title: 'A Spool’s-Eye Perspective',
    badge: 'PROLOGUE · SCENE 04',
    narrator: 'To someone the size of a wooden spool, every human customer towering over the counter looks colossal.',
    posterSrc: '/environments/workshop-bg.webp',
  },
  {
    id: 'beat-4',
    shot: 'clack-visitor',
    title: 'A Reasonable Explanation',
    badge: 'PROLOGUE · SCENE 05',
    speaker: 'SIR CLACK',
    role: 'ANTIQUE TOOLBOX MENTOR',
    words: 'That is a visitor, you walnut.',
    videoSrc: '/cinematics/prologue-03-clack-visitor.mp4',
    posterSrc: '/cinematics/prologue-03-clack-visitor-poster.jpg',
  },
  {
    id: 'beat-5',
    shot: 'morrow-hello',
    title: 'Proper Etiquette',
    badge: 'PROLOGUE · SCENE 06',
    speaker: 'MORROW',
    role: 'APPRENTICE STITCHLING',
    words: 'HELLO, POTENTIALLY POLITE GIANT!',
    videoSrc: '/cinematics/prologue-04-morrow-hello.mp4',
    posterSrc: '/cinematics/prologue-04-morrow-hello-poster.jpg',
  },
  {
    id: 'beat-6',
    shot: 'pipkin-emergency',
    title: 'Breaking News',
    badge: 'PROLOGUE · SCENE 07',
    speaker: 'PIPKIN',
    role: 'SPECIAL EDITION SWIFT',
    words: 'EMERGENCY! THE WORLD IS BROKEN!',
    videoSrc: '/cinematics/prologue-05-pipkin-emergency.mp4',
    posterSrc: '/cinematics/prologue-05-pipkin-emergency-poster.jpg',
  },
  {
    id: 'beat-7',
    shot: 'clack-which-part',
    title: 'An Important Question',
    badge: 'PROLOGUE · SCENE 08',
    speaker: 'SIR CLACK',
    role: 'ANTIQUE TOOLBOX MENTOR',
    words: 'Which part?',
    videoSrc: '/cinematics/prologue-06-clack-which-part.mp4',
    posterSrc: '/cinematics/prologue-06-clack-which-part-poster.jpg',
  },
  {
    id: 'beat-8',
    shot: 'pipkin-yes',
    title: 'The Shortest Answer',
    badge: 'PROLOGUE · SCENE 09',
    speaker: 'PIPKIN',
    role: 'SPECIAL EDITION SWIFT',
    words: 'YES.',
    videoSrc: '/cinematics/prologue-07-pipkin-yes.mp4',
    posterSrc: '/cinematics/prologue-07-pipkin-yes-poster.jpg',
  },
];

export function WorkshopComic({
  beat,
  awake,
  onBell,
  onNext,
  isMuted = true,
  onToggleMute,
}: WorkshopComicProps) {
  // Determine current beat index (0..8)
  const activeBeatIdx = !awake ? (beat === 0 ? 0 : 1) : Math.min(Math.max(beat + 1, 1), WORKSHOP_BEATS.length - 1);
  const currentBeat = WORKSHOP_BEATS[activeBeatIdx];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Synchronize audio muted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Reset video playback state on beat change
  useEffect(() => {
    setVideoError(false);

    if (currentBeat.videoSrc && videoRef.current && !prefersReducedMotion) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise) {
        playPromise.catch(() => {
          // Autoplay policy fallback: video remains ready on poster
        });
      }
    }
  }, [activeBeatIdx, currentBeat.videoSrc, prefersReducedMotion]);

  const handleAdvance = useCallback(() => {
    onNext();
  }, [onNext]);

  // Avatar lookup
  const getAvatar = (speaker?: string) => {
    if (speaker === 'MORROW') return '/characters/morrow-talking.png';
    if (speaker === 'SIR CLACK') return '/characters/clack-talking.png';
    if (speaker === 'PIPKIN') return '/characters/pipkin-talking.png';
    return undefined;
  };

  // Authoritative fallback stage when videos encounter errors or for reduced-motion environments
  const renderFallbackScene = (shot: string) => {
    switch (shot) {
      case 'giant-entry':
        return <Panel3Reaction />;
      case 'clack-visitor':
        return <Panel5TwoShot />;
      case 'morrow-hello':
        return <Panel6Hello />;
      case 'pipkin-emergency':
        return <Panel7Pipkin />;
      case 'clack-which-part':
        return <Panel8Pause />;
      case 'pipkin-yes':
        return <Panel9Exit />;
      default:
        return null;
    }
  };

  return (
    <section className="workshop-cinematic-container" aria-label="Prologue: The Workshop">
      <CinematicStage
        id="workshop-cinematic-stage"
        title={currentBeat.title}
        badge={currentBeat.badge}
        aspectRatio="16/9"
        backgroundSrc="/environments/workshop-bg.webp"
        backgroundAlt="Handcrafted stop-motion workshop interior"
        className="workshop-main-stage"
      >
        {/* Active Beat Visual Plane */}
        <div className="workshop-visual-viewport">
          {currentBeat.videoSrc && currentBeat.posterSrc && !videoError && !prefersReducedMotion ? (
            <div className="workshop-video-frame">
              <video
                ref={videoRef}
                src={currentBeat.videoSrc}
                poster={currentBeat.posterSrc}
                playsInline
                autoPlay
                muted={isMuted}
                onError={() => {
                  setVideoError(true);
                }}
                className="workshop-stage-video"
                aria-label={`${currentBeat.title} cinematic clip`}
              />
              {/* Audio mute toggle pill on video */}
              {onToggleMute && (
                <button
                  type="button"
                  onClick={onToggleMute}
                  className="cinematic-mute-pill"
                  aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  <span>{isMuted ? 'Muted' : 'Sound On'}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="workshop-stage-art">
              {currentBeat.shot === 'establish' && <Panel1Establish />}
              {currentBeat.shot === 'bell' && (
                <div className="workshop-interactive-bell-stage">
                  <Panel2Bell />
                  {!awake && (
                    <div className="workshop-bell-callout">
                      <button
                        type="button"
                        onClick={onBell}
                        className="storybook-action workshop-bell-btn pulse-glow"
                        aria-label="Ring the counter bell to wake the workshop"
                      >
                        <Bell size={22} aria-hidden="true" />
                        <span>Ring the Bell to Open Shop</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
              {currentBeat.shot === 'giant-pov' && (
                <div className="workshop-giant-pov-stage">
                  <Panel4GiantPOV />
                </div>
              )}
              {renderFallbackScene(currentBeat.shot)}
            </div>
          )}
        </div>

        {/* Integrated Dialogue / Narration Overlay */}
        {(currentBeat.words || currentBeat.narrator) && (
          <DialogueOverlay
            speaker={currentBeat.speaker}
            speakerRole={currentBeat.role}
            avatarSrc={getAvatar(currentBeat.speaker)}
            position="bottom"
            className="workshop-scene-dialogue"
          >
            {currentBeat.words ? (
              <p className="dialogue-speech-text">{currentBeat.words}</p>
            ) : (
              <p className="dialogue-narrative-text">{currentBeat.narrator}</p>
            )}
          </DialogueOverlay>
        )}
      </CinematicStage>

      {/* Cinematic Navigation & Story Controls */}
      <footer className="workshop-navigation-bar">
        {!awake ? (
          <div className="workshop-awaiting-bell">
            <button
              type="button"
              onClick={onBell}
              className="storybook-action workshop-bell-advance"
              aria-label="Ring the bell to wake the workshop"
            >
              <Bell size={18} aria-hidden="true" /> Ring the bell
            </button>
          </div>
        ) : (
          <StoryControls
            forwardLabel={
              activeBeatIdx >= WORKSHOP_BEATS.length - 1
                ? 'Step into the next chapter'
                : currentBeat.shot === 'clack-which-part'
                ? 'Continue Story (Wait for Pipkin…)'
                : 'Continue Story'
            }
            forwardDisabled={!awake}
            onForward={handleAdvance}
            stepIndicator={`BEAT ${activeBeatIdx + 1} OF ${WORKSHOP_BEATS.length}`}
          />
        )}
      </footer>
    </section>
  );
}
