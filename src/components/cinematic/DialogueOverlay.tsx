import React from 'react';

export interface DialogueOverlayProps {
  speaker?: string;
  speakerRole?: string;
  avatarSrc?: string;
  children: React.ReactNode;
  position?: 'bottom' | 'top' | 'floating';
  action?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const DialogueOverlay: React.FC<DialogueOverlayProps> = ({
  speaker,
  speakerRole,
  avatarSrc,
  children,
  position = 'bottom',
  action,
  className = '',
  style,
}) => {
  return (
    <div
      className={`cinematic-dialogue-overlay position-${position} ${className}`}
      style={style}
      role="region"
      aria-label="Character Dialogue"
    >
      <div className="cinematic-dialogue-card">
        {speaker && (
          <div className="cinematic-dialogue-header">
            {avatarSrc && (
              <img
                src={avatarSrc}
                alt={speaker}
                className="cinematic-dialogue-avatar"
              />
            )}
            <div className="cinematic-dialogue-meta">
              <span className="cinematic-dialogue-speaker">{speaker}</span>
              {speakerRole && (
                <span className="cinematic-dialogue-role">{speakerRole}</span>
              )}
            </div>
          </div>
        )}

        <div className="cinematic-dialogue-body">
          {children}
        </div>

        {action && (
          <div className="cinematic-dialogue-actions">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
