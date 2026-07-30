import { supabase } from '../lib/supabase';
import { UserRole } from '../types';
import { supabaseData } from './supabaseData';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  level: number;
  xp: number;
  accuracy: number;
  streak: number;
  completedCases: number;
}

const TOKEN_KEY = 'tb_quest_jwt_token';

class AuthService {
  /**
   * Supabase Real Auth Sign In
   */
  async login(email: string, password: string, role?: UserRole): Promise<{ token: string; user: AuthUser }> {
    // 1. Attempt Supabase Auth Login
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (!error && data.user) {
        const sessionToken = data.session?.access_token || 'sb_session_active';
        localStorage.setItem(TOKEN_KEY, sessionToken);

        // Fetch or create profile with 0% initial progress if first login
        let profile = await supabaseData.fetchUserProfile(data.user.id);
        if (!profile) {
          profile = await supabaseData.updateUserProfile(data.user.id, {
            name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || email.split('@')[0],
            email: data.user.email,
            role: role || 'student',
            level: 1,
            xp: 0,
            accuracy: 0,
            streak: 0,
            completed_cases: 0
          });
        }

        const authUser: AuthUser = {
          id: data.user.id,
          name: profile?.name || data.user.user_metadata?.full_name || data.user.user_metadata?.name || 'New User',
          email: data.user.email || email,
          role: profile?.role || role || 'student',
          level: profile?.level ?? 1,
          xp: profile?.xp ?? 0,
          accuracy: profile?.accuracy ?? 0,
          streak: profile?.streak ?? 0,
          completedCases: profile?.completed_cases ?? 0
        };

        return { token: sessionToken, user: authUser };
      }
    } catch (e) {
      console.warn('Supabase auth login note:', e);
    }

    // 2. Local Backend Endpoint API Fallback
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Authentication failed. Please check your credentials.');
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  }

  /**
   * Supabase OAuth Sign In with Google
   */
  async loginWithGoogle(): Promise<void> {
    const redirectTo = window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });

    if (error) {
      throw new Error(error.message || 'Google Sign-In failed. Please try again.');
    }
  }

  /**
   * Supabase Real Auth Registration
   */
  async register(name: string, email: string, password: string, role: UserRole): Promise<{ token: string; user: AuthUser }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { name: name.trim(), role }
        }
      });

      if (!error && data.user) {
        const sessionToken = data.session?.access_token || 'sb_session_active';
        localStorage.setItem(TOKEN_KEY, sessionToken);

        const profile = await supabaseData.updateUserProfile(data.user.id, {
          name: name.trim(),
          email: email.trim(),
          role,
          level: 1,
          xp: 0,
          accuracy: 0,
          streak: 0,
          completed_cases: 0
        });

        const authUser: AuthUser = {
          id: data.user.id,
          name: name.trim(),
          email: email.trim(),
          role,
          level: 1,
          xp: 0,
          accuracy: 0,
          streak: 0,
          completedCases: 0
        };

        return { token: sessionToken, user: authUser };
      }
    } catch (e) {
      console.warn('Supabase register note:', e);
    }

    // Fallback to local server API
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed. Please try again.');
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  }

  /**
   * Session Restore via Supabase Auth or Backend API
   */
  async getMe(): Promise<AuthUser | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        let profile = await supabaseData.fetchUserProfile(session.user.id);
        
        // If first Google login, create fresh profile with 0 progress
        if (!profile) {
          const defaultName = session.user.user_metadata?.full_name || 
                              session.user.user_metadata?.name || 
                              session.user.email?.split('@')[0] || 
                              'New User';

          profile = await supabaseData.updateUserProfile(session.user.id, {
            name: defaultName,
            email: session.user.email,
            avatar_url: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || '',
            role: session.user.user_metadata?.role || 'student',
            level: 1,
            xp: 0,
            accuracy: 0,
            streak: 0,
            completed_cases: 0
          });
        }

        return {
          id: session.user.id,
          name: profile?.name || session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'New User',
          email: session.user.email || '',
          role: profile?.role || session.user.user_metadata?.role || 'student',
          level: profile?.level ?? 1,
          xp: profile?.xp ?? 0,
          accuracy: profile?.accuracy ?? 0,
          streak: profile?.streak ?? 0,
          completedCases: profile?.completed_cases ?? 0
        };
      }
    } catch (e) {}

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }

      const data = await res.json();
      return data.user;
    } catch (e) {
      return null;
    }
  }

  /**
   * Supabase Forgot Password
   */
  async forgotPassword(email: string): Promise<string> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
      if (!error) {
        return `Password reset link sent to ${email}. Check your inbox.`;
      }
    } catch (e) {}

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to send password reset request.');
    }
    return data.message;
  }

  /**
   * Supabase Sign Out
   */
  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (e) {}

    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (e) {}
    }
    localStorage.removeItem(TOKEN_KEY);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }
}

export const authService = new AuthService();
