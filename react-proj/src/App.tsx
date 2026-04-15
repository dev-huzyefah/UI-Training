import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/shared/components/Layout';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { SignupForm } from '@/features/auth/components/SignupForm';
import { HomePage } from '@/features/home/components/HomePage';
import { SearchPage } from '@/features/search/components/SearchPage';
import { PlaylistPage } from '@/features/playlists/components/PlaylistPage';
import { CreatePlaylistPage } from '@/features/playlists/components/CreatePlaylistPage';

function App() {
  return (
    <Routes>
      {/* Auth routes — no layout */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />

      {/* Protected app routes — with layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/playlists/new" element={<CreatePlaylistPage />} />
        <Route path="/playlists/:id" element={<PlaylistPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
