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
        >
          <div 
            className="add-to-playlist-modal"
            onClick={e => e.stopPropagation()}
          >
            <h2>Add to Playlist</h2>
            <p className="add-to-playlist-modal__description">
              Choose a playlist for "{selectedSong.title}"
            </p>
            
            <div className="add-to-playlist-modal__list">
              {playlists.length === 0 ? (
                <p className="add-to-playlist-modal__empty">
                  You haven't created any playlists yet.
                </p>
              ) : (
                playlists.map(playlist => (
                  <button
                    key={playlist.id}
                    className="add-to-playlist-modal__item"
                    onClick={async () => {
                      await addSongToPlaylist(playlist.id, selectedSong.id);
                      setSelectedSong(null);
                    }}
                  >
                    <img 
                      src={playlist.coverUrl} 
                      alt={playlist.name} 
                      className="add-to-playlist-modal__item-img"
                    />
                    <span className="add-to-playlist-modal__item-name">{playlist.name}</span>
                  </button>
                ))
              )}
            </div>
            
            <button 
              className="add-to-playlist-modal__cancel"
              onClick={() => setSelectedSong(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
