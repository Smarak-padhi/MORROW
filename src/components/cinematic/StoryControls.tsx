import React from 'react';

export interface StoryControlsProps {
  onBack?: () => void;
  onForward?: () => void;
  backLabel?: string;
  forwardLabel?: string;
  forwardDisabled?: boolean;
  extraControls?: React.ReactNode;
  stepIndicator?: string;
  className?: string;
}

export const StoryControls: React.FC<StoryControlsProps> = ({
  onBack,
  onForward,
  backLabel = 'Back',
  forwardLabel = 'Continue',
  forwardDisabled = false,
  extraControls,
  stepIndicator,
  className = '',
}) => {
  return (
    <nav
      className={`cinematic-story-controls ${className}`}
      aria-label="Story Navigation Controls"
    >
      <div className="cinematic-controls-left">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="cinematic-control-btn btn-secondary"
            aria-label={backLabel}
          >
            ← {backLabel}
          </button>
        )}
      </div>

      <div className="cinematic-controls-center">
        {stepIndicator && (
          <span className="cinematic-step-indicator">{stepIndicator}</span>
        )}
        {extraControls}
      </div>

      <div className="cinematic-controls-right">
        {onForward && (
          <button
            type="button"
            onClick={onForward}
            disabled={forwardDisabled}
            className="cinematic-control-btn btn-primary"
            aria-label={forwardLabel}
          >
            {forwardLabel} →
          </button>
        )}
      </div>
    </nav>
  );
};
