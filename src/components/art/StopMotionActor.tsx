import React, { useState, useEffect } from 'react';

export type ActorId =
  | 'morrow'
  | 'clack'
  | 'pipkin'
  | 'frog'
  | 'duck'
  | 'professor'
  | 'baker'
  | 'unfinished';

export type ActorState =
  | 'idle'
  | 'talking'
  | 'surprised'
  | 'happy'
  | 'worried'
  | 'action';

// Explicit mapping of confirmed transparent character PNGs
// Ensures graceful sprite aliasing and prevents 404 console errors for unphotographed poses or fallbacks.
const CHARACTER_SPRITE_MAP: Record<ActorId, Partial<Record<ActorState, string>>> = {
  morrow: {
    idle: 'morrow-idle.png',
    talking: 'morrow-talking.png',
    happy: 'morrow-happy.png',
    action: 'morrow-action.png',
    worried: 'morrow-action.png',
    surprised: 'morrow-talking.png',
  },
  clack: {
    idle: 'clack-idle.png',
    talking: 'clack-talking.png',
    happy: 'clack-talking.png',
    surprised: 'clack-talking.png',
  },
  duck: {
    idle: 'duck-idle.png',
    talking: 'duck-talking.png',
    happy: 'duck-talking.png',
  },
  frog: {
    idle: 'frog-idle.png',
    talking: 'frog-talking.png',
    happy: 'frog-happy.png',
  },
  pipkin: {
    idle: 'pipkin-idle.png',
    talking: 'pipkin-talking.png',
    surprised: 'pipkin-surprised.png',
    happy: 'pipkin-surprised.png',
  },
  professor: {
    idle: 'professor-idle.png',
    talking: 'professor-talking.png',
    happy: 'professor-talking.png',
    surprised: 'professor-talking.png',
    worried: 'professor-idle.png',
  },
  unfinished: {
    idle: 'unfinished-idle.png',
    talking: 'unfinished-action.png',
    happy: 'unfinished-action.png',
    action: 'unfinished-action.png',
    surprised: 'unfinished-idle.png',
    worried: 'unfinished-idle.png',
  },
  // Baker is an authoritative illustrated stop-motion paper-craft fallback (no photographic intake exists)
  baker: {},
};

export interface StopMotionActorProps {
  character: ActorId;
  state?: ActorState;
  expression?: string;
  isSpeaking?: boolean;
  isAction?: boolean;
  flipX?: boolean;
  flipY?: boolean;
  className?: string;
  style?: React.CSSProperties;
  fallbackSvg: React.ReactNode;
  alt?: string;
}

/**
 * Reusable image-based stop-motion actor component.
 * Supports transparent PNG/WebP character sprites with tactile stop-motion
 * animations (breathing, body rocking, talking bounce, surprised startle).
 * Gracefully renders the handcrafted SVG actor as a zero-layout-shift fallback
 * until approved transparent cutouts are loaded.
 */
export const StopMotionActor: React.FC<StopMotionActorProps> = ({
  character,
  state = 'idle',
  isSpeaking = false,
  isAction = false,
  flipX = false,
  flipY = false,
  className = '',
  style = {},
  fallbackSvg,
  alt,
}) => {
  const [imageError, setImageError] = useState(false);

  // Compute effective state (if isSpeaking, force 'talking' unless explicitly overridden)
  const effectiveState: ActorState = isSpeaking ? 'talking' : isAction ? 'action' : state;

  // Resolve sprite source from verified asset inventory
  const spriteFile = CHARACTER_SPRITE_MAP[character]?.[effectiveState];
  const hasSprite = Boolean(spriteFile);
  const spriteSrc = spriteFile ? `/characters/${spriteFile}` : undefined;

  const transformParts: string[] = [];
  if (flipX) transformParts.push('scaleX(-1)');
  if (flipY) transformParts.push('scaleY(-1)');
  const orientationTransform = transformParts.length ? transformParts.join(' ') : undefined;

  const combinedStyle: React.CSSProperties = {
    ...style,
    transform: [style.transform, orientationTransform].filter(Boolean).join(' ') || undefined,
  };

  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset loading and error states whenever character or effective pose changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [character, effectiveState]);

  return (
    <div
      className={`stop-motion-actor actor-${character} actor-state-${effectiveState} ${
        isSpeaking ? 'is-speaking' : ''
      } ${isAction ? 'is-action' : ''} ${className}`}
      style={combinedStyle}
      role="img"
      aria-label={alt || `${character} in ${effectiveState} state`}
    >
      {/* If a transparent sprite exists and hasn't errored, display the real sprite */}
      {hasSprite && spriteSrc && !imageError ? (
        <img
          src={spriteSrc}
          alt={alt || `${character}`}
          className="stop-motion-sprite-img"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      ) : null}

      {/* Handcrafted Stop-Motion Visual (Authoritative Fallback until image is loaded or if no sprite exists) */}
      {(!hasSprite || !imageLoaded || imageError) && (
        <div className="stop-motion-fallback-container">
          {fallbackSvg}
        </div>
      )}
    </div>
  );
};
