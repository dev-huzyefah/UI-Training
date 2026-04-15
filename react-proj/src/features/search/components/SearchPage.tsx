import { useState, useMemo, useEffect } from 'react';
import { PiMagnifyingGlassBold, PiMusicNotesBold } from 'react-icons/pi';
import { SongRow } from '@/shared/components/SongRow';
import { EmptyState } from '@/shared/components/EmptyState';
import { songAPI } from '@/shared/services/api';
import type { Song } from '@/shared/types/types';
import './SearchPage.css';

type FilterType = 'all' | 'title' | 'artist' | 'album';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

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
                <SongRow key={song.id} song={song} index={i} queue={results} />
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
