import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '@/shared/components/Toast/ToastContext';
import { ROUTES } from '@/shared/constants';
import './Auth.css';

export function SignupForm() {
  const { signup, isAuthenticated, error, clearError, isLoading } = useAuth();
  const { showToast } = useToast();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
      // Clear error after showing toast to prevent re-triggering if component re-mounts
      // or to allow showing the same error again if the user submits again
      clearError();
    }
  }, [error, showToast, clearError]);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await signup({ displayName, email, password });
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

        <h1 className="auth-card__title">Start listening</h1>
        <p className="auth-card__subtitle">Create your account to get started</p>

        <form className="auth-form" onSubmit={handleSubmit} id="signup-form">

          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="signup-name">Display Name</label>
            <input
              className="auth-form__input"
              id="signup-name"
              type="text"
              placeholder="What should we call you?"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="signup-email">Email</label>
            <input
              className="auth-form__input"
              id="signup-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="signup-password">Password</label>
            <input
              className="auth-form__input"
              id="signup-password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <button 
            type="submit" 
            className="auth-form__submit" 
            id="signup-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-card__footer">
          Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
