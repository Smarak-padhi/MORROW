import React from 'react';

export interface CinematicStageProps {
  id?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  aspectRatio?: '16/9' | '4/3' | 'auto';
  backgroundSrc?: string;
  backgroundAlt?: string;
  children: React.ReactNode;
  overlay?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  role?: string;
  'aria-label'?: string;
}

export const CinematicStage: React.FC<CinematicStageProps> = ({
  id,
  title,
  subtitle,
  badge,
  aspectRatio = '16/9',
  backgroundSrc,
  backgroundAlt = 'Cinematic background',
  children,
  overlay,
  className = '',
  style,
  role = 'region',
  'aria-label': ariaLabel,
}) => {
  return (
    <section
      id={id}
      role={role}
      aria-label={ariaLabel || title || 'Cinematic Stage'}
      className={`cinematic-stage ${className}`}
      style={{
        ...style,
      }}
    >
      {(title || badge) && (
        <header className="cinematic-stage-header">
          {badge && <span className="cinematic-stage-badge">{badge}</span>}
          {title && <h2 className="cinematic-stage-title">{title}</h2>}
          {subtitle && <p className="cinematic-stage-subtitle">{subtitle}</p>}
        </header>
      )}

      <div
        className={`cinematic-stage-frame aspect-${aspectRatio.replace('/', '-')}`}
      >
        {backgroundSrc && (
          <div className="cinematic-stage-backdrop-container">
            <img
              src={backgroundSrc}
              alt={backgroundAlt}
              className="cinematic-stage-backdrop-image"
              loading="eager"
            />
            <div className="cinematic-stage-backdrop-vignette" />
          </div>
        )}

        <div className="cinematic-stage-content">
          {children}
        </div>

        {overlay && (
          <div className="cinematic-stage-overlay">
            {overlay}
          </div>
        )}
      </div>
    </section>
  );
};
