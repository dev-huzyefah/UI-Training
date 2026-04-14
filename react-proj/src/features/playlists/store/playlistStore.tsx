import { createContext, useCallback, useState, useEffect, type ReactNode } from 'react';
import type { Playlist } from '@/shared/types/types';
import { playlistAPI } from '@/shared/services/api';
import { useAuth } from '@/features/auth/hooks/useAuth';

export interface PlaylistStore {
  playlists: Playlist[];
  isLoading: boolean;
  error: string | null;
  createPlaylist: (name: string, description?: string) => Promise<Playlist>;
  deletePlaylist: (id: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, songId: string) => Promise<void>;
  removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>;
  getPlaylist: (id: string) => Playlist | undefined;
}

export const PlaylistContext = createContext<PlaylistStore | null>(null);

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch playlists from server when user is authenticated
  useEffect(() => {
    if (!auth.user?.id) return;

    const fetchPlaylists = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await playlistAPI.getPlaylists(auth.user!.id);
        setPlaylists(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch playlists');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [auth.user?.id]);

  const createPlaylist = useCallback(async (name: string, description = ''): Promise<Playlist> => {
    if (!auth.user?.id) throw new Error('User not authenticated');
    
    try {
      const newPlaylist = await playlistAPI.createPlaylist(auth.user.id, name, description);
      setPlaylists(prev => [...prev, newPlaylist]);
      return newPlaylist;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create playlist';
      setError(errorMsg);
      throw err;
    }
  }, [auth.user?.id]);

  const deletePlaylist = useCallback(async (id: string): Promise<void> => {
    try {
      await playlistAPI.deletePlaylist(id);
      setPlaylists(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete playlist';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const addSongToPlaylist = useCallback(async (playlistId: string, songId: string): Promise<void> => {
    try {
      const updated = await playlistAPI.addSongToPlaylist(playlistId, songId);
      setPlaylists(prev => prev.map(p => p.id === playlistId ? updated : p));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to add song to playlist';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const removeSongFromPlaylist = useCallback(async (playlistId: string, songId: string): Promise<void> => {
    try {
      const updated = await playlistAPI.removeSongFromPlaylist(playlistId, songId);
      setPlaylists(prev => prev.map(p => p.id === playlistId ? updated : p));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to remove song from playlist';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const getPlaylist = useCallback((id: string) => {
    return playlists.find(p => p.id === id);
  }, [playlists]);

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        isLoading,
        error,
        createPlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        getPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
