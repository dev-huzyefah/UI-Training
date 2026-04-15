import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { usePlaylist } from '@/features/playlists/hooks/usePlaylist';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { SongRow } from '@/shared/components/SongRow';
import { PlaylistCard } from '@/shared/components/PlaylistCard';
import { songAPI, playlistsAPI } from '@/shared/services/api';
import type { Song, Playlist } from '@/shared/types/types';
import './HomePage.css';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function HomePage() {
  const { user } = useAuth();
  const { playlists, addSongToPlaylist } = usePlaylist();
  const navigate = useNavigate();
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [featured, setFeatured] = useState<Playlist[]>([]);
  const [_, setLoading] = useState(true);

  const [recentIds] = useLocalStorage<string[]>(user?.id ? `recently_played_${user.id}` : '', []);

  const recentSongs = useMemo(() => {
    if (!user?.id || allSongs.length === 0) return [];
    
    return recentIds
      .map(id => allSongs.find(s => s.id === id))
      .filter((s): s is Song => !!s)
      .slice(0, 6);
  }, [recentIds, allSongs, user?.id]);

  // Fetch songs and featured playlists on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [songs, featuredPlaylists] = await Promise.all([
          songAPI.getAllSongs(),
          playlistsAPI.getFeaturedPlaylists()
        ]);
        setAllSongs(songs);
        setFeatured(featuredPlaylists);
      } catch (error) {
        console.error('Failed to fetch songs or featured playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlaylistClick = (id: string) => {
    // Navigate to playlist view (works for both user and featured playlists)
    navigate(`/playlists/${id}`);
  };

  const handleAddToPlaylist = (songId: string) => {
    if (playlists.length === 0) {
      navigate('/playlists/new');
      return;
    }
    const song = allSongs.find(s => s.id === songId);
    if (song) setSelectedSong(song);
  };

  return (
    <div className="home-page" id="home-page">
      <h1 className="home-page__greeting">
        {getGreeting()}, <span>{user?.displayName ?? 'there'}</span>
      </h1>

      {/* Featured Playlists */}
      <section className="home-page__section">
        <div className="home-page__section-header">
          <h2 className="home-page__section-title">Featured Playlists</h2>
        </div>
        <div className="home-page__grid">
          {featured.map(pl => (
            <PlaylistCard key={pl.id} playlist={pl} onClick={handlePlaylistClick} />
          ))}
        </div>
      </section>

      {/* Recently Played */}
      {recentSongs.length > 0 && (
        <section className="home-page__section">
          <div className="home-page__section-header">
            <h2 className="home-page__section-title">Recently Played</h2>
          </div>
          <div className="home-page__recent-list">
            {recentSongs.map((song, i) => (
              <SongRow
                key={song.id}
                song={song}
                index={i}
                queue={recentSongs}
                onAddToPlaylist={handleAddToPlaylist}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Songs */}
      <section className="home-page__all-songs-section">
        <div className="home-page__section-header">
          <h2 className="home-page__section-title">All Songs</h2>
        </div>
        <div className="home-page__all-songs-header">
          <span>#</span>
          <span></span>
          <span>Title</span>
          <span>Album</span>
          <span>Duration</span>
          <span></span>
        </div>
        <div className="home-page__recent-list">
          {allSongs.map((song, i) => (
            <SongRow
              key={song.id}
              song={song}
              index={i}
              queue={allSongs}
              onAddToPlaylist={handleAddToPlaylist}
            />
          ))}
        </div>
      </section>

      {/* Add to Playlist Modal */}
      {selectedSong && (
        <div 
          className="add-songs-overlay" 
          onClick={() => setSelectedSong(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--space-4)'
          }}
        >
          <div 
            className="add-to-playlist-modal"
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              width: '100%',
              maxWidth: '400px',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <h2 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
              Add to Playlist
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Choose a playlist for "{selectedSong.title}"
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {playlists.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', padding: 'var(--space-4)' }}>
                  You haven't created any playlists yet.
                </p>
              ) : (
                playlists.map(playlist => (
                  <button
                    key={playlist.id}
                    onClick={async () => {
                      await addSongToPlaylist(playlist.id, selectedSong.id);
                      setSelectedSong(null);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-surface-hover)',
                      width: '100%',
                      textAlign: 'left',
                      transition: 'background 0.2s'
                    }}
                  >
                    <img 
                      src={playlist.coverUrl} 
                      alt={playlist.name} 
                      style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                    />
                    <span style={{ fontWeight: 500 }}>{playlist.name}</span>
                  </button>
                ))
              )}
            </div>
            
            <button 
              onClick={() => setSelectedSong(null)}
              style={{
                marginTop: 'var(--space-6)',
                width: '100%',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
                fontWeight: 600
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
