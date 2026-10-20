import React from 'react';
import { CHARACTER_SPRITE_MAP, ActorId, ActorState } from '../art/StopMotionActor';

export interface CharacterActorProps {
  characterId: ActorId | 'giant';
  variant?: ActorState;
  scale?: number; // override scale multiplier (defaults to authoritative scale matrix)
  flipHorizontal?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  animateBreathe?: boolean;
}

// Authoritative relative scales relative to Morrow (1.0 = baseline 100%)
const BASE_SCALES: Record<string, number> = {
  morrow: 1.0,
  clack: 1.35,
  pipkin: 0.42,
  duck: 0.82,
  frog: 0.85,
  professor: 1.25,
  unfinished: 1.30,
  giant: 2.2, // framed cropped giant
  baker: 1.1,
};

export const CharacterActor: React.FC<CharacterActorProps> = ({
  characterId,
  variant = 'idle',
  scale,
  flipHorizontal = false,
  className = '',
  style,
  label,
  animateBreathe = true,
}) => {
  const spriteMap = characterId !== 'giant' ? CHARACTER_SPRITE_MAP[characterId as ActorId] : null;
  const fileName = spriteMap ? (spriteMap[variant] || spriteMap.idle) : null;
  const spriteUrl = fileName ? `/characters/${fileName}` : null;
  const baseScale = BASE_SCALES[characterId] || 1.0;
  const effectiveScale = scale !== undefined ? scale : baseScale;

  return (
    <div
      className={`cinematic-character-actor char-${characterId} ${flipHorizontal ? 'flipped' : ''} ${animateBreathe ? 'breathe' : ''} ${className}`}
      style={{
        '--actor-scale': effectiveScale,
        ...style,
      } as React.CSSProperties}
      role="img"
      aria-label={label || `${characterId} (${variant})`}
    >
      {/* Ground Contact Shadow */}
      <div className="cinematic-actor-contact-shadow" />

      {/* High-fidelity stop-motion photographic sprite */}
      {spriteUrl ? (
        <img
          src={spriteUrl}
          alt={label || characterId}
          className="cinematic-actor-sprite"
          loading="eager"
        />
      ) : (
        <div className="cinematic-actor-fallback">
          <span>{characterId}</span>
        </div>
      )}
    </div>
  );
};
