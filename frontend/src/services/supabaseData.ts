import { supabase } from './supabase';
import { LeaderboardEntry, CertificateData } from '../types';

export interface UserModuleProgressRecord {
  module_id: string;
  completed: boolean;
  score: number;
}

export interface UserDataAggregate {
  profile: any;
  achievements: string[];
  bookmarks: string[];
  moduleProgress: UserModuleProgressRecord[];
  certificates: any[];
  quizResults: any[];
}

class SupabaseDataService {
  /**
   * Fetch User Profile from Supabase `profiles` table
   * Filters strictly by id = userId (which is auth.users.id)
   */
  async fetchUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Supabase fetchUserProfile note:', error.message);
      }
      return data || null;
    } catch (e) {
      console.warn('Supabase profile fetch error:', e);
      return null;
    }
  }

  /**
   * Create or Update User Profile in Supabase
   * Filters strictly by id = userId
   */
  async updateUserProfile(userId: string, updates: Record<string, any>) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) console.warn('Supabase updateUserProfile note:', error.message);
      return data;
    } catch (e) {
      console.warn('Supabase profile update error:', e);
      return null;
    }
  }

  /**
   * Fetch Realtime Leaderboard from Supabase `profiles`
   * Returns empty array if no profiles exist (removes all demo/mock accounts)
   */
  async fetchLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, xp, completed_cases, accuracy')
        .order('xp', { ascending: false })
        .limit(20);

      if (error || !data || data.length === 0) {
        return [];
      }

      return data.map((item, idx) => ({
        rank: idx + 1,
        name: item.name || 'Anonymous Doctor',
        score: item.xp || 0,
        xp: item.xp || 0,
        badges: Math.floor((item.completed_cases || 0) / 3),
        accuracy: item.accuracy || 0,
        institution: 'Navodaya Medical College'
      }));
    } catch (e) {
      return [];
    }
  }

  /**
   * Subscribe to Realtime Leaderboard updates
   */
  subscribeLeaderboard(onUpdate: (entries: LeaderboardEntry[]) => void) {
    const channel = supabase
      .channel('public:profiles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, async () => {
        const updated = await this.fetchLeaderboard();
        onUpdate(updated);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  /**
   * Save Completed Case Result to Supabase `quiz_results`
   * Filters strictly by user_id = userId
   */
  async saveQuizResult(userId: string, caseType: string, score: number, xpGained: number, durationSeconds: number) {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .insert({
          user_id: userId,
          case_type: caseType,
          score,
          xp_gained: xpGained,
          duration_seconds: durationSeconds,
          created_at: new Date().toISOString()
        });

      if (error) console.warn('Supabase saveQuizResult note:', error.message);
      return data;
    } catch (e) {
      console.warn('Supabase saveQuizResult error:', e);
      return null;
    }
  }

  /**
   * Fetch Quiz Results for authenticated user
   */
  async fetchQuizResults(userId: string) {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) return [];
      return data || [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Save Achievement to Supabase `user_achievements`
   */
  async saveAchievement(userId: string, badgeName: string) {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .upsert({
          user_id: userId,
          badge_name: badgeName,
          earned_at: new Date().toISOString()
        });

      if (error) console.warn('Supabase saveAchievement note:', error.message);
      return data;
    } catch (e) {
      return null;
    }
  }

  /**
   * Fetch Achievements for authenticated user
   */
  async fetchAchievements(userId: string): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('badge_name')
        .eq('user_id', userId);

      if (error || !data) return [];
      return data.map((item) => item.badge_name);
    } catch (e) {
      return [];
    }
  }

  /**
   * Fetch Bookmarks for authenticated user
   */
  async fetchBookmarks(userId: string): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('user_bookmarks')
        .select('case_id')
        .eq('user_id', userId);

      if (error || !data) return [];
      return data.map((item) => item.case_id);
    } catch (e) {
      return [];
    }
  }

  /**
   * Add Bookmark for authenticated user
   */
  async addBookmark(userId: string, caseId: string) {
    try {
      await supabase
        .from('user_bookmarks')
        .insert({ user_id: userId, case_id: caseId });
    } catch (e) {}
  }

  /**
   * Remove Bookmark for authenticated user
   */
  async removeBookmark(userId: string, caseId: string) {
    try {
      await supabase
        .from('user_bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('case_id', caseId);
    } catch (e) {}
  }

  /**
   * Fetch User Module Progress for authenticated user
   */
  async fetchModuleProgress(userId: string): Promise<UserModuleProgressRecord[]> {
    try {
      const { data, error } = await supabase
        .from('user_module_progress')
        .select('module_id, completed, score')
        .eq('user_id', userId);

      if (error || !data) return [];
      return data;
    } catch (e) {
      return [];
    }
  }

  /**
   * Save Module Progress for authenticated user
   */
  async saveModuleProgress(userId: string, moduleId: string, completed: boolean, score: number) {
    try {
      const { data, error } = await supabase
        .from('user_module_progress')
        .upsert({
          user_id: userId,
          module_id: moduleId,
          completed,
          score,
          updated_at: new Date().toISOString()
        });

      if (error) console.warn('Supabase saveModuleProgress note:', error.message);
      return data;
    } catch (e) {
      return null;
    }
  }

  /**
   * Save Certificate to Supabase `certificates`
   */
  async saveCertificate(userId: string, cert: CertificateData) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .insert({
          user_id: userId,
          certificate_id: cert.certificateId,
          student_name: cert.studentName,
          total_xp: cert.totalXp,
          cases_mastered: cert.casesMastered,
          accuracy: cert.accuracy,
          issue_date: cert.issueDate,
          created_at: new Date().toISOString()
        });

      if (error) console.warn('Supabase saveCertificate note:', error.message);
      return data;
    } catch (e) {
      return null;
    }
  }

  /**
   * Fetch Certificates for authenticated user
   */
  async fetchCertificates(userId: string) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error || !data) return [];
      return data;
    } catch (e) {
      return [];
    }
  }

  /**
   * Save Voice Settings to Supabase `voice_preferences`
   */
  async saveVoicePreferences(userId: string, settings: Record<string, any>) {
    try {
      const { data, error } = await supabase
        .from('voice_preferences')
        .upsert({
          user_id: userId,
          ...settings,
          updated_at: new Date().toISOString()
        });

      if (error) console.warn('Supabase voice_preferences note:', error.message);
      return data;
    } catch (e) {
      return null;
    }
  }

  /**
   * Save Theme Preference to Supabase `theme_preferences`
   */
  async saveThemePreference(userId: string, mode: 'dark' | 'light') {
    try {
      const { data, error } = await supabase
        .from('theme_preferences')
        .upsert({
          user_id: userId,
          mode,
          updated_at: new Date().toISOString()
        });

      if (error) console.warn('Supabase theme_preferences note:', error.message);
      return data;
    } catch (e) {
      return null;
    }
  }

  /**
   * Aggregate all user data from Supabase for initial load
   */
  async fetchUserData(userId: string): Promise<UserDataAggregate> {
    const [profile, achievements, bookmarks, moduleProgress, certificates, quizResults] = await Promise.all([
      this.fetchUserProfile(userId),
      this.fetchAchievements(userId),
      this.fetchBookmarks(userId),
      this.fetchModuleProgress(userId),
      this.fetchCertificates(userId),
      this.fetchQuizResults(userId)
    ]);

    return {
      profile,
      achievements,
      bookmarks,
      moduleProgress,
      certificates,
      quizResults
    };
  }
}

export const supabaseData = new SupabaseDataService();
