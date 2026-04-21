import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/features/auth/store/authStore';
import { PlayerProvider } from '@/features/player/store/playerStore';
import { PlaylistProvider } from '@/features/playlists/store/playlistStore';
import { ToastProvider } from '@/shared/components/Toast/ToastContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <PlayerProvider>
            <PlaylistProvider>
              <App />
            </PlaylistProvider>
          </PlayerProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
