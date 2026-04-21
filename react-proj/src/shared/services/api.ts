import type { User, Song, Playlist, RecentlyPlayed, UserPlaylist } from '../types/types';



const API_URL = import.meta.env.VITE_API_URL || '/api';


// User API
export const userAPI = {
  async login(email: string, password: string): Promise<User> {
    const response = await fetch(`${API_URL}/users?email=${email}`);
    const users = await response.json() as User[];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  },

  async signup(email: string, password: string, displayName: string): Promise<User> {
    // Check if user already exists
    const checkResponse = await fetch(`${API_URL}/users?email=${email}`);
    const existingUsers = await checkResponse.json() as User[];
    if (existingUsers.length > 0) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      displayName,
      avatarUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 70)}/200/200`
    };

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    if (!response.ok) throw new Error('Failed to create user');
    const { password: _, ...userWithoutPassword } = await response.json() as User;
    return userWithoutPassword as User;
  }
};

// Song API
export const songAPI = {
  async getAllSongs(): Promise<Song[]> {
    const response = await fetch(`${API_URL}/songs`);
    if (!response.ok) throw new Error('Failed to fetch songs');
    return response.json() as Promise<Song[]>;
  },

  async getSongById(id: string): Promise<Song> {
    const response = await fetch(`${API_URL}/songs/${id}`);
    if (!response.ok) throw new Error('Song not found');
    return response.json() as Promise<Song>;
  }
};

// Featured Playlists API
export const playlistsAPI = {
  async getFeaturedPlaylists(): Promise<Playlist[]> {
    const response = await fetch(`${API_URL}/featuredPlaylists`);
    if (!response.ok) throw new Error('Failed to fetch featured playlists');
    return response.json() as Promise<Playlist[]>;
  }
};

// Playlist API
export const playlistAPI = {
  async getPlaylists(userId: string): Promise<UserPlaylist[]> {
    const response = await fetch(`${API_URL}/playlists?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch playlists');
    return response.json() as Promise<UserPlaylist[]>;
  },

  async getPlaylist(id: string): Promise<UserPlaylist> {
    const response = await fetch(`${API_URL}/playlists/${id}`);
    if (!response.ok) throw new Error('Playlist not found');
    return response.json() as Promise<UserPlaylist>;
  },

  async createPlaylist(userId: string, name: string, description: string): Promise<UserPlaylist> {
    const newPlaylist = {
      id: `playlist-${Date.now()}`,
      userId,
      name,
      description,
      coverUrl: `https://picsum.photos/seed/${Date.now()}/300/300`,
      songIds: [],
      createdAt: new Date().toISOString()
    };

    const response = await fetch(`${API_URL}/playlists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlaylist)
    });

    if (!response.ok) throw new Error('Failed to create playlist');
    return response.json() as Promise<UserPlaylist>;
  },

  async updatePlaylist(playlistId: string, updates: Partial<UserPlaylist>): Promise<UserPlaylist> {
    const response = await fetch(`${API_URL}/playlists/${playlistId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    if (!response.ok) throw new Error('Failed to update playlist');
    return response.json() as Promise<UserPlaylist>;
  },

  async deletePlaylist(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/playlists/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete playlist');
  },

  async addSongToPlaylist(playlistId: string, songId: string): Promise<UserPlaylist> {
    const playlist = await this.getPlaylist(playlistId);
    if (!playlist.songIds.includes(songId)) {
      playlist.songIds.push(songId);
    }
    return this.updatePlaylist(playlistId, { songIds: playlist.songIds });
  },

  async removeSongFromPlaylist(playlistId: string, songId: string): Promise<UserPlaylist> {
    const playlist = await this.getPlaylist(playlistId);
    playlist.songIds = playlist.songIds.filter(id => id !== songId);
    return this.updatePlaylist(playlistId, { songIds: playlist.songIds });
  }
};

// Recently Played API
export const recentlyPlayedAPI = {
  async addToRecentlyPlayed(userId: string, songId: string): Promise<RecentlyPlayed> {
    const newEntry = {
      id: `recent-${Date.now()}`,
      userId,
      songId,
      playedAt: new Date().toISOString()
    };

    const response = await fetch(`${API_URL}/recentlyPlayed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    });

    if (!response.ok) throw new Error('Failed to save recently played');
    return response.json() as Promise<RecentlyPlayed>;
  },

  async getRecentlyPlayed(userId: string): Promise<RecentlyPlayed[]> {
    const response = await fetch(
      `${API_URL}/recentlyPlayed?userId=${userId}&_sort=playedAt&_order=desc`
    );
    if (!response.ok) throw new Error('Failed to fetch recently played');
    return response.json() as Promise<RecentlyPlayed[]>;
  }
};
