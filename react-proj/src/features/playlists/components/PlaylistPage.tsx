import { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PiPlayFill, PiTrashBold, PiMusicNotesBold, PiPlusBold, PiMinusBold } from 'react-icons/pi';
import { usePlaylist } from '../hooks/usePlaylist';
import { usePlayer } from '@/features/player/hooks/usePlayer';
import { SongRow } from '@/shared/components/SongRow';
import { EmptyState } from '@/shared/components/EmptyState';
import { songAPI, playlistsAPI } from '@/shared/services/api';
import type { Song, Playlist } from '@/shared/types/types';
import './Playlist.css';

export function PlaylistPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPlaylist, deletePlaylist, removeSongFromPlaylist, addSongToPlaylist } = usePlaylist();
  const { playSong } = usePlayer();
  const [showAddSongs, setShowAddSongs] = useState(false);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [featured, setFeatured] = useState<Playlist[]>([]);
  const [_, setLoading] = useState(true);

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

  // Check user playlists first, then featured
  const playlist = useMemo(() => {
    if (!id) return undefined;
    const userPl = getPlaylist(id);
    if (userPl) return { ...userPl, isUserPlaylist: true };
    const featuredPl = featured.find(f => f.id === id);
    if (featuredPl) return { ...featuredPl, isUserPlaylist: false };
    return undefined;
  }, [id, getPlaylist, featured]);

  const songs = useMemo(() => {
    if (!playlist) return [];
    return playlist.songIds
      .map(sid => allSongs.find(s => s.id === sid))
      .filter((s): s is Song => !!s);
  }, [playlist, allSongs]);

  if (!playlist) {
    return (
      <EmptyState
        icon={<PiMusicNotesBold />}
        title="Playlist not found"
        message="This playlist doesn't exist or has been deleted."
      />
    );
  }

  const handlePlayAll = () => {
    if (songs.length > 0) {
      playSong(songs[0], songs, 0);
    }
  };

  const handleDelete = () => {
    if (playlist.isUserPlaylist) {
      deletePlaylist(playlist.id);
      navigate('/');
    }
  };

  const handleRemoveSong = (songId: string) => {
    if (playlist.isUserPlaylist) {
      removeSongFromPlaylist(playlist.id, songId);
    }
  };

  const handleAddSong = (songId: string) => {
    if (playlist.isUserPlaylist) {
      addSongToPlaylist(playlist.id, songId);
    }
  };

  const availableSongs = allSongs.filter(
    song => !playlist.songIds.includes(song.id)
  );

  const totalDuration = songs.reduce((acc, s) => acc + s.duration, 0);
  const hours = Math.floor(totalDuration / 3600);
  const mins = Math.floor((totalDuration % 3600) / 60);
  const durationText = hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;

  return (
    <div className="playlist-page" id="playlist-page">
      <div className="playlist-page__header">
        <img
          className="playlist-page__cover"
          src={playlist.coverUrl}
          alt={playlist.name}
        />
        <div className="playlist-page__info">
          <span className="playlist-page__label">Playlist</span>
          <h1 className="playlist-page__name">{playlist.name}</h1>
          {playlist.description && (
            <p className="playlist-page__description">{playlist.description}</p>
          )}
          <span className="playlist-page__meta">
            {songs.length} song{songs.length !== 1 ? 's' : ''} · {durationText}
          </span>
          <div className="playlist-page__actions">
            <button
              className="playlist-page__play-btn"
              onClick={handlePlayAll}
              disabled={songs.length === 0}
              id="playlist-play-all"
            >
              <PiPlayFill size={16} />
              Play All
            </button>
            {playlist.isUserPlaylist && (
              <>
                <button
                  className="playlist-page__add-btn"
                  onClick={() => setShowAddSongs(true)}
                  id="playlist-add-songs"
                >
                  <PiPlusBold size={16} />
                  Add Songs
                </button>
                <button
                  className="playlist-page__delete-btn"
                  onClick={handleDelete}
                  id="playlist-delete"
                >
                  <PiTrashBold size={16} />
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {songs.length > 0 ? (
        <>
          <div className="playlist-page__songs-header">
            <span>#</span>
            <span></span>
            <span>Title</span>
            <span>Album</span>
            <span>Duration</span>
            <span></span>
          </div>
          {songs.map((song, i) => (
            <SongRow
              key={song.id}
              song={song}
              index={i}
              queue={songs}
              onAddToPlaylist={
                playlist.isUserPlaylist
                  ? () => handleRemoveSong(song.id)
                  : undefined
              }
              actionLabel={playlist.isUserPlaylist ? 'Remove' : undefined}
              actionIcon={playlist.isUserPlaylist ? <PiMinusBold size={16} /> : undefined}
            />
          ))}
        </>
      ) : (
        <EmptyState
          icon={<PiMusicNotesBold />}
          title="Empty playlist"
          message={playlist.isUserPlaylist ? 'Click "Add Songs" to get started.' : 'No songs in this playlist.'}
        />
      )}

      {/* Add Songs Modal */}
      {showAddSongs && playlist.isUserPlaylist && (
        <div
          className="add-songs-overlay"
          onClick={() => setShowAddSongs(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            overflowY: 'auto',
            padding: 'var(--space-4)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              minWidth: '320px',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)',
              animation: 'scaleIn var(--transition-base) ease-out',
            }}
          >
            <h2 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>
              Add Songs to {playlist.name}
            </h2>
            {availableSongs.length === 0 ? (
              <p style={{ color: 'var(--color-text-tertiary)', textAlign: 'center', padding: 'var(--space-4)' }}>
                All songs are already in this playlist.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <div className="playlist-page__songs-header" style={{ marginBottom: 'var(--space-2)' }}>
                  <span>#</span>
                  <span></span>
                  <span>Title</span>
                  <span>Album</span>
                  <span>Duration</span>
                  <span></span>
                </div>
                {availableSongs.map((song, i) => (
                  <SongRow
                    key={song.id}
                    song={song}
                    index={i + 1}
                    onAddToPlaylist={() => handleAddSong(song.id)}
                    actionLabel="Add"
                  />
                ))}
              </div>
            )}
            <button
              onClick={() => setShowAddSongs(false)}
              style={{
                marginTop: 'var(--space-4)',
                padding: 'var(--space-3) var(--space-6)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface-hover)',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                fontSize: 'var(--text-base)',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
