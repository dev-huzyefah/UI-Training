import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiMusicNotesBold } from 'react-icons/pi';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { usePlaylist } from '@/features/playlists/hooks/usePlaylist';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { SongRow } from '@/shared/components/SongRow';
import { PlaylistCard } from '@/shared/components/PlaylistCard';
import { EmptyState } from '@/shared/components/EmptyState';
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
  const [addingPlaylistFor, setAddingPlaylistFor] = useState<string | null>(null);
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
    setAddingPlaylistFor(songId);
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

      {/* Quick Add to Playlist overlay */}
      {addingPlaylistFor && (
        <div
          className="add-to-playlist-overlay"
          onClick={() => setAddingPlaylistFor(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              minWidth: '280px',
              maxWidth: '360px',
              boxShadow: 'var(--shadow-lg)',
              animation: 'scaleIn var(--transition-base) ease-out',
            }}
          >
            <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
              Add to Playlist
            </h3>
            {playlists.length === 0 ? (
              <EmptyState
                icon={<PiMusicNotesBold />}
                title="No playlists yet"
                message="Create your first playlist to start organizing your music."
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {playlists.map(pl => (
                  <button
                    key={pl.id}
                    onClick={() => {
                      addSongToPlaylist(pl.id, addingPlaylistFor);
                      setAddingPlaylistFor(null);
                    }}
                    style={{
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'left',
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-text-primary)',
                      transition: 'background var(--transition-fast)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {pl.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
