import { useCallback } from 'react';
import {
  PiSpeakerHighBold,
  PiSpeakerLowBold,
  PiSpeakerXBold,
} from 'react-icons/pi';
import './VolumeControl.css';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

export function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}: VolumeControlProps) {
  const handleVolumeClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      onVolumeChange(Math.max(0, Math.min(1, pct)));
    },
    [onVolumeChange]
  );

  const volumePct = isMuted ? 0 : volume * 100;

  const VolumeIcon = isMuted || volume === 0
    ? PiSpeakerXBold
    : volume < 0.5
      ? PiSpeakerLowBold
      : PiSpeakerHighBold;

  return (
    <div className="volume-control">
      <button
        className="volume-control__btn"
        onClick={onToggleMute}
        title={isMuted ? 'Unmute' : 'Mute'}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        id="volume-mute-toggle"
      >
        <VolumeIcon size={20} />
      </button>
      <div
        className="volume-control__track"
        onClick={handleVolumeClick}
        role="slider"
        aria-label="Volume"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={volumePct}
        id="volume-track"
      >
        <div
          className="volume-control__fill"
          style={{ width: `${volumePct}%` }}
        />
      </div>
    </div>
  );
}
