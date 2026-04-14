import { createContext, useState, useRef, useCallback, useEffect, type ReactNode } from 'react';
import type { Song } from '@/shared/types/types';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

export interface PlayerStore {
  currentSong: Song | null;
  queue: Song[];
  queueIndex: number;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  playSong: (song: Song, queue?: Song[], index?: number) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
}

export const PlayerContext = createContext<PlayerStore | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const [_, setRecentIds] = useLocalStorage<string[]>(auth.user?.id ? `recently_played_${auth.user.id}` : '', []);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.7;
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      // auto-play next
      setQueueIndex(prev => {
        const nextIdx = prev + 1;
        if (nextIdx < queue.length) {
          return nextIdx;
        }
        setIsPlaying(false);
        return prev;
      });
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When queue changes and an ended event bumps queueIndex, auto-play the next song
  useEffect(() => {
    if (queue.length > 0 && queueIndex < queue.length) {
      const song = queue[queueIndex];
      if (song && song.id !== currentSong?.id) {
        setCurrentSong(song);
        if (audioRef.current) {
          audioRef.current.src = song.audioUrl;
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }
    }
  }, [queueIndex, queue, currentSong?.id]);

  const playSong = useCallback((song: Song, newQueue?: Song[], index?: number) => {
    const q = newQueue ?? [song];
    const idx = index ?? 0;
    setQueue(q);
    setQueueIndex(idx);
    setCurrentSong(song);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    // Save to recently played in localStorage (user-specific)
    if (auth.user?.id) {
      setRecentIds(recent => [song.id, ...recent.filter(id => id !== song.id)].slice(0, 20));
      
      // Still emit the specific event for compatibility if any other component expects it
      window.dispatchEvent(new CustomEvent('recentlyPlayedUpdated', {
        detail: { userId: auth.user.id, songId: song.id }
      }));
    }
  }, [auth.user?.id, setRecentIds]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying, currentSong]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    if (!audioRef.current || !currentSong) return;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [currentSong]);

  const nextTrack = useCallback(() => {
    if (queueIndex < queue.length - 1) {
      setQueueIndex(prev => prev + 1);
    }
  }, [queueIndex, queue.length]);

  const prevTrack = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else if (queueIndex > 0) {
      setQueueIndex(prev => prev - 1);
    }
  }, [queueIndex]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    if (clamped > 0 && isMuted) setIsMuted(false);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  }, [isMuted, volume]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        queue,
        queueIndex,
        isPlaying,
        volume,
        currentTime,
        duration,
        isMuted,
        playSong,
        togglePlay,
        pause,
        resume,
        nextTrack,
        prevTrack,
        seek,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
