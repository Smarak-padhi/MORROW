import React, { useState, useEffect } from 'react';

export type ActorId =
  | 'morrow'
  | 'clack'
  | 'pipkin'
  | 'frog'
  | 'duck'
  | 'professor'
  | 'unfinished';

export type ActorState =
  | 'idle'
  | 'talking'
  | 'surprised'
  | 'happy'
  | 'worried'
  | 'action';

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

  // Resolve potential sprite source
  // In future production batches, /characters/${character}-${effectiveState}.webp will be loaded.
  // Currently, character images without transparent alpha are gated to avoid rectangular artifacts.
  const spriteSrc = `/characters/${character}-${effectiveState}.png`;

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
      {!imageError ? (
        <img
          src={spriteSrc}
          alt={alt || `${character}`}
          className="stop-motion-sprite-img"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      ) : null}

      {/* Handcrafted Stop-Motion Visual (Authoritative Fallback until image is loaded or if error) */}
      {(!imageLoaded || imageError) && (
        <div className="stop-motion-fallback-container">
          {fallbackSvg}
        </div>
      )}
    </div>
  );
};
