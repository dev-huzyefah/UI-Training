import { useContext } from 'react';
import { PlayerContext, type PlayerStore } from '../store/playerStore';

export function usePlayer(): PlayerStore {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
