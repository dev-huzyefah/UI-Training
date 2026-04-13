export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // seconds
  coverUrl: string;
  audioUrl: string;
  genre: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songIds: string[];
  createdAt: string;
  isFeatured?: boolean;
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
