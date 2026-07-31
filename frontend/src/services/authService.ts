import { supabase } from './supabase';
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
   * Supabase OAuth Sign In with Google
   */
  async loginWithGoogle(): Promise<void> {
    const redirectTo = window.location.origin.includes('localhost')
      ? window.location.origin
      : 'https://tb-frontend-flame.vercel.app';

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
   * Supabase Real Auth Email & Password Sign In
   */
  async login(email: string, password: string, role?: UserRole): Promise<{ token: string; user: AuthUser }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error || !data.user) {
      throw new Error(error?.message || 'Authentication failed. Please check your credentials.');
    }

    const sessionToken = data.session?.access_token || 'sb_session_active';
    localStorage.setItem(TOKEN_KEY, sessionToken);

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

  /**
   * Supabase Real Auth Registration
   */
  async register(name: string, email: string, password: string, role: UserRole): Promise<{ token: string; user: AuthUser }> {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { name: name.trim(), role }
      }
    });

    if (error || !data.user) {
      throw new Error(error?.message || 'Registration failed. Please try again.');
    }

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

  /**
   * Session Restore via Supabase Auth
   */
  async getMe(): Promise<AuthUser | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        let profile = await supabaseData.fetchUserProfile(session.user.id);
        
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

        const sessionToken = session.access_token || 'sb_session_active';
        localStorage.setItem(TOKEN_KEY, sessionToken);

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
    } catch (e) {
      console.warn('Supabase getSession note:', e);
    }

    localStorage.removeItem(TOKEN_KEY);
    return null;
  }

  /**
   * Supabase Reset Password
   */
  async forgotPassword(email: string): Promise<string> {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
    if (error) {
      throw new Error(error.message || 'Failed to send password reset request.');
    }
    return `Password reset link sent to ${email}. Check your inbox.`;
  }

  /**
   * Supabase Sign Out
   */
  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signOut note:', e);
    }
    localStorage.removeItem(TOKEN_KEY);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }
}

export const authService = new AuthService();
