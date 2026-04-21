import { useContext } from 'react';
import { PlaylistContext, type PlaylistStore } from '../store/playlistStore';

export function usePlaylist(): PlaylistStore {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
}
