import { createClient } from '@supabase/supabase-js';

// Safely access environment variables across Vite & Node
const env = (import.meta as any).env || (typeof process !== 'undefined' ? process.env : {}) || {};

const supabaseUrl = env.VITE_SUPABASE_URL || 'https://ulhpwvoehhuecddbjohs.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Rf3z8gCm1vpYRoKXxerCyQ__3UyWAJg';

// Export Centralized Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Database Types for Supabase Tables
export interface ProfileTable {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  level: number;
  xp: number;
  accuracy: number;
  streak: number;
  completed_cases: number;
  created_at: string;
}

export interface QuizResultTable {
  id: string;
  user_id: string;
  case_type: string;
  score: number;
  xp_gained: number;
  accuracy: number;
  duration_seconds: number;
  created_at: string;
}

export interface AchievementTable {
  id: string;
  user_id: string;
  badge_title: string;
  description: string;
  unlocked_at: string;
}

export interface BookmarkTable {
  id: string;
  user_id: string;
  case_id: string;
  created_at: string;
}

export interface CertificateTable {
  id: string;
  user_id: string;
  certificate_id: string;
  student_name: string;
  total_xp: number;
  cases_mastered: number;
  accuracy: number;
  issue_date: string;
  created_at: string;
}
