import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '@/shared/components/Toast/ToastContext';
import { ROUTES } from '@/shared/constants';
import './Auth.css';

export function LoginForm() {
  const { login, isAuthenticated, error, clearError } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
      clearError();
    }
  }, [error, showToast, clearError]);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const handleSubmit = async  (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login({ email, password });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">
          <div className="auth-card__logo-icon">
            <img src="/spotify.svg" alt="Spotify" />
          </div>
          <span className="auth-card__logo-text">Spotify</span>
        </div>

        <h1 className="auth-card__title">Welcome back</h1>
        <p className="auth-card__subtitle">Sign in</p>

        <form className="auth-form" onSubmit={handleSubmit} id="login-form">

          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="login-email">Email</label>
            <input
              className="auth-form__input"
              id="login-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="login-password">Password</label>
            <input
              className="auth-form__input"
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="auth-form__submit" id="login-submit">
            Sign In
          </button>
        </form>

        <p className="auth-card__footer">
          Don't have an account? <Link to={ROUTES.SIGNUP}>Create one</Link>
        </p>
      </div>
    </div>
  );
}
