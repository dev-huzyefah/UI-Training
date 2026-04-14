import { useCallback } from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      onSeek(pct * duration);
    },
    [onSeek, duration]
  );

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="progress-bar">
      <span className="progress-bar__time">{formatTime(currentTime)}</span>
      <div
        className="progress-bar__track"
        onClick={handleProgressClick}
        role="slider"
        aria-label="Song progress"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        id="progress-bar-track"
      >
        <div
          className="progress-bar__fill"
          style={{ width: `${progressPct}%` }}
        />
        <div
          className="progress-bar__thumb"
          style={{ left: `${progressPct}%` }}
        />
      </div>
      <span className="progress-bar__time">{formatTime(duration)}</span>
    </div>
  );
}
