import type { AuthUser, AuthCredentials, SignupData } from '../types/authTypes';
import { userAPI } from '@/shared/services/api';

const SESSION_KEY = 'spotify_session';

export function saveSession(user: AuthUser): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): AuthUser | null {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function signup(data: SignupData): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    const user = await userAPI.signup(data.email, data.password, data.displayName);
    saveSession(user);
    return { success: true, user };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create account'
    };
  }
}

export async function login(creds: AuthCredentials): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    const user = await userAPI.login(creds.email, creds.password);
    saveSession(user);
    return { success: true, user };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Login failed'
    };
  }
}
