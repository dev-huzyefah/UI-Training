import { useState, useMemo, useEffect } from 'react';
import { PiMagnifyingGlassBold, PiMusicNotesBold } from 'react-icons/pi';
import { SongRow } from '@/shared/components/SongRow';
import { EmptyState } from '@/shared/components/EmptyState';
import { usePlaylist } from '@/features/playlists/hooks/usePlaylist';
import { songAPI } from '@/shared/services/api';
import type { Song } from '@/shared/types/types';
import './SearchPage.css';

type FilterType = 'all' | 'title' | 'artist' | 'album';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [_, setLoading] = useState(true);
  
  const { playlists, addSongToPlaylist } = usePlaylist();

  // Fetch songs on mount
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await songAPI.getAllSongs();
        setAllSongs(songs);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return allSongs.filter(song => {
      switch (filter) {
        case 'title':
          return song.title.toLowerCase().includes(q);
        case 'artist':
          return song.artist.toLowerCase().includes(q);
        case 'album':
          return song.album.toLowerCase().includes(q);
        default:
          return (
            song.title.toLowerCase().includes(q) ||
            song.artist.toLowerCase().includes(q) ||
            song.album.toLowerCase().includes(q)
          );
      }
    });
  }, [query, filter]);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Title', value: 'title' },
    { label: 'Artist', value: 'artist' },
    { label: 'Album', value: 'album' },
  ];

  return (
    <div className="search-page" id="search-page">
      <div className="search-page__header">
        <h1 className="search-page__title">Search</h1>
        <div className="search-page__input-wrapper">
          <PiMagnifyingGlassBold className="search-page__input-icon" size={18} />
          <input
            className="search-page__input"
            type="text"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={e => setQuery(e.target.value)}
            id="search-input"
            autoFocus
          />
        </div>
      </div>

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

      {query.trim() && (
        <>
          <div className="search-page__filters">
            {filters.map(f => (
              <button
                key={f.value}
                className={`search-page__chip ${filter === f.value ? 'search-page__chip--active' : ''}`}
                onClick={() => setFilter(f.value)}
                id={`filter-${f.value}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="search-page__results-count">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </p>

          {results.length > 0 ? (
            <div className="search-page__results">
              {results.map((song, i) => (
                <SongRow 
                  key={song.id} 
                  song={song} 
                  index={i} 
                  queue={results} 
                  onAddToPlaylist={() => setSelectedSong(song)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<PiMusicNotesBold />}
              title="No results"
              message={`We couldn't find anything matching "${query}". Try a different search term.`}
            />
          )}
        </>
      )}

      {!query.trim() && (
        <EmptyState
          icon={<PiMagnifyingGlassBold />}
          title="Find your music"
          message="Search by song title, artist name, or album to discover tracks."
        />
      )}
    </div>
  );
}
