import { useState, useEffect } from 'react';
import { UserRole, CaseType, LeaderboardEntry, CertificateData } from './types';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';
import Login from './pages/Login';
import StudentDashboard from './components/StudentDashboard';
import CaseSelection from './components/CaseSelection';
import CaseEngine from './components/CaseEngine';
import AlgorithmFlowchart from './components/AlgorithmFlowchart';
import FacultyDashboard from './components/FacultyDashboard';
import AdminDashboard from './components/AdminDashboard';
import AITutor from './components/AITutor';
import LeaderboardModal from './components/LeaderboardModal';
import ProgressReportModal from './components/ProgressReportModal';
import CertificateModal from './components/CertificateModal';
import AudioSettingsModal from './components/AudioSettingsModal';
import DashboardLayout from './layouts/DashboardLayout';
import Profile from './pages/Profile';
import LevelUpCelebration from './components/LevelUpCelebration';
import LearningModules from './components/LearningModules';
import Analytics from './components/Analytics';
import VoiceAssistant from './components/VoiceAssistant';
import { authService } from './services/authService';
import { supabaseData } from './services/supabaseData';
import { supabase } from './services/supabase';

export default function App() {
  const [appStage, setAppStage] = useState<'splash' | 'onboarding' | 'login' | 'app'>('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    level: 1,
    xp: 0,
    accuracy: 0,
    streak: 0,
    completedCases: 0
  });
  
  // Navigation & Tabs
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'cases' | 'flowcharts' | 'ai-tutor' | 'modules' | 'leaderboard' | 'analytics' | 'certificate' | 'profile'>('dashboard');
  const [subView, setSubView] = useState<'none' | 'case-select' | 'case-engine'>('none');
  const [selectedCaseType, setSelectedCaseType] = useState<CaseType>('pulmonary');

  // Gamification state (Loaded strictly per-user from Supabase)
  const [badges, setBadges] = useState<string[]>([]);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [bookmarkedCases, setBookmarkedCases] = useState<string[]>([]);

  const toggleBookmark = async (caseId: string) => {
    if (!currentUserId) return;
    const isBookmarked = bookmarkedCases.includes(caseId);

    if (isBookmarked) {
      setBookmarkedCases(prev => prev.filter(c => c !== caseId));
      await supabaseData.removeBookmark(currentUserId, caseId);
    } else {
      setBookmarkedCases(prev => [...prev, caseId]);
      await supabaseData.addBookmark(currentUserId, caseId);
    }
  };

  // Helper to load user-isolated state from Supabase
  const loadUserDataFromSupabase = async (userId: string) => {
    const aggregate = await supabaseData.fetchUserData(userId);
    
    if (aggregate.profile) {
      setUserData({
        name: aggregate.profile.name || 'Student Doctor',
        email: aggregate.profile.email || '',
        level: aggregate.profile.level ?? 1,
        xp: aggregate.profile.xp ?? 0,
        accuracy: aggregate.profile.accuracy ?? 0,
        streak: aggregate.profile.streak ?? 0,
        completedCases: aggregate.profile.completed_cases ?? 0
      });
    }

    setBadges(aggregate.achievements || []);
    setBookmarkedCases(aggregate.bookmarks || []);

    const leaderboard = await supabaseData.fetchLeaderboard();
    setLeaderboardEntries(leaderboard);
  };

  // Session Restore & Auto-Login on Refresh / OAuth Callback
  useEffect(() => {
    async function restoreSession() {
      const authUser = await authService.getMe();
      if (authUser) {
        setCurrentUserId(authUser.id);
        setUserRole(authUser.role);
        setUserData({
          name: authUser.name,
          email: authUser.email,
          level: authUser.level ?? 1,
          xp: authUser.xp ?? 0,
          accuracy: authUser.accuracy ?? 0,
          streak: authUser.streak ?? 0,
          completedCases: authUser.completedCases ?? 0
        });

        await loadUserDataFromSupabase(authUser.id);

        setIsAuthenticated(true);
        setAppStage('app');
      }
    }

    restoreSession();

    // Subscribe to Supabase auth state changes (OAuth redirects / session changes)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        restoreSession();
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setAppStage('login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Modal states
  const [showProgressReport, setShowProgressReport] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showAudioSettings, setShowAudioSettings] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleLogin = async (role: UserRole, email: string, name: string) => {
    const authUser = await authService.getMe();
    if (authUser) {
      setCurrentUserId(authUser.id);
      setUserRole(authUser.role || role);
      setUserData({
        name: authUser.name || name || 'Student Doctor',
        email: authUser.email || email,
        level: authUser.level ?? 1,
        xp: authUser.xp ?? 0,
        accuracy: authUser.accuracy ?? 0,
        streak: authUser.streak ?? 0,
        completedCases: authUser.completedCases ?? 0
      });
      await loadUserDataFromSupabase(authUser.id);
    } else {
      setUserRole(role);
      setUserData(prev => ({ ...prev, email, name: name || 'Student Doctor' }));
    }

    setIsAuthenticated(true);
    setAppStage('app');
    setCurrentTab('dashboard');
    setSubView('none');
  };

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUserId(null);
    setIsAuthenticated(false);
    setUserData({
      name: '',
      email: '',
      level: 1,
      xp: 0,
      accuracy: 0,
      streak: 0,
      completedCases: 0
    });
    setBadges([]);
    setBookmarkedCases([]);
    setLeaderboardEntries([]);
    setAppStage('login');
  };

  const handleFinishCase = async (score: number, gainedXp: number, newBadge?: string) => {
    const updatedXp = userData.xp + gainedXp;
    const oldLevel = userData.level;
    const newLevel = Math.floor(updatedXp / 500) + 1;
    const updatedCompletedCases = userData.completedCases + 1;
    const updatedAccuracy = Math.min(100, Math.round(((userData.accuracy * userData.completedCases) + score) / updatedCompletedCases));

    if (newLevel > oldLevel) {
      setShowCelebration(true);
    }
    
    setUserData(prev => ({
      ...prev,
      xp: updatedXp,
      level: newLevel,
      accuracy: updatedAccuracy,
      completedCases: updatedCompletedCases
    }));

    if (currentUserId) {
      // Save user progress strictly to Supabase
      await supabaseData.updateUserProfile(currentUserId, {
        xp: updatedXp,
        level: newLevel,
        accuracy: updatedAccuracy,
        completed_cases: updatedCompletedCases
      });

      await supabaseData.saveQuizResult(currentUserId, selectedCaseType, score, gainedXp, 120);

      if (newBadge && !badges.includes(newBadge)) {
        setBadges(prev => [...prev, newBadge]);
        await supabaseData.saveAchievement(currentUserId, newBadge);
      }

      const leaderboard = await supabaseData.fetchLeaderboard();
      setLeaderboardEntries(leaderboard);
    }
  };

  const certificateData: CertificateData = {
    studentName: userData.name || 'Student Doctor',
    issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    certificateId: `NMC-TBQ-${Math.floor(100000 + Math.random() * 900000)}`,
    totalXp: userData.xp,
    casesMastered: userData.completedCases,
    accuracy: userData.accuracy,
    institution: 'Navodaya Medical College, Raichur'
  };

  // Render Splash or Onboarding
  if (appStage === 'splash') {
    return <SplashScreen onFinish={() => setAppStage('onboarding')} />;
  }

  if (appStage === 'onboarding') {
    return <Onboarding onComplete={() => setAppStage('login')} />;
  }

  if (appStage === 'login' || !isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout 
      currentTab={currentTab} 
      setCurrentTab={setCurrentTab} 
      userData={userData} 
      onLogout={handleLogout}
    >
      {userRole === 'faculty' ? (
        <FacultyDashboard />
      ) : userRole === 'admin' ? (
        <AdminDashboard />
      ) : (
        <>
          {subView === 'case-engine' ? (
            <CaseEngine
              caseType={selectedCaseType}
              onFinishCase={handleFinishCase}
              onBack={() => setSubView('none')}
            />
          ) : subView === 'case-select' ? (
            <CaseSelection
              onSelectCase={(type) => {
                setSelectedCaseType(type);
                setSubView('case-engine');
              }}
              onBack={() => setSubView('none')}
              bookmarkedCases={bookmarkedCases}
              onToggleBookmark={toggleBookmark}
            />
          ) : (
            <>
              {currentTab === 'dashboard' && (
                <StudentDashboard
                  onStartCase={() => setSubView('case-select')}
                  onOpenAITutor={() => setCurrentTab('ai-tutor')}
                  onOpenLeaderboard={() => setCurrentTab('leaderboard')}
                  onOpenProgressReport={() => setShowProgressReport(true)}
                  onOpenAudioSettings={() => setShowAudioSettings(true)}
                  userName={userData.name}
                  userLevel={userData.level}
                  userProgress={Math.min(100, Math.round((userData.completedCases / 10) * 100))}
                  xp={userData.xp}
                  badgesCount={badges.length}
                  streak={userData.streak}
                  completedCases={userData.completedCases}
                  accuracy={userData.accuracy}
                  onLogout={handleLogout}
                />
              )}

              {currentTab === 'cases' && (
                <CaseSelection
                  onSelectCase={(type) => {
                    setSelectedCaseType(type);
                    setSubView('case-engine');
                  }}
                  onBack={() => setCurrentTab('dashboard')}
                  bookmarkedCases={bookmarkedCases}
                  onToggleBookmark={toggleBookmark}
                />
              )}

              {currentTab === 'flowcharts' && (
                <div className="p-4">
                  <AlgorithmFlowchart interactiveMode={true} />
                </div>
              )}

              {currentTab === 'ai-tutor' && (
                <div className="p-4">
                  <AITutor onClose={() => setCurrentTab('dashboard')} />
                </div>
              )}

              {currentTab === 'modules' && (
                <LearningModules currentUserId={currentUserId} />
              )}

              {currentTab === 'leaderboard' && (
                <div className="p-4">
                  <LeaderboardModal onClose={() => setCurrentTab('dashboard')} entries={leaderboardEntries} badges={badges} onChallenge={(name) => alert(`Challenge sent to ${name}!`)} />
                </div>
              )}

              {currentTab === 'analytics' && (
                <div className="p-4">
                  <Analytics />
                </div>
              )}

              {currentTab === 'certificate' && (
                <div className="p-4 text-center space-y-6">
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold rounded-2xl text-base shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all"
                  >
                    Generate & View "TB Diagnostic Expert" Institutional Certificate
                  </button>
                  <CertificateModal certificateData={certificateData} onClose={() => setCurrentTab('dashboard')} />
                </div>
              )}

              {currentTab === 'profile' && (
                <Profile
                  userName={userData.name}
                  userEmail={userData.email}
                  userLevel={userData.level}
                  xp={userData.xp}
                  badgesCount={badges.length}
                  streak={userData.streak}
                  onLogout={handleLogout}
                  onOpenProgressReport={() => setShowProgressReport(true)}
                />
              )}
            </>
          )}
        </>
      )}

      {/* Floating Voice Assistant */}
      <VoiceAssistant onNavigate={(tab) => {
        if (tab === 'cases-select') {
          setSubView('case-select');
        } else {
          setSubView('none');
          setCurrentTab(tab as any);
        }
      }} />

      {/* Modals */}
      {showProgressReport && (
        <ProgressReportModal
          onClose={() => setShowProgressReport(false)}
          userName={userData.name}
          userLevel={userData.level}
          xp={userData.xp}
          completedCases={userData.completedCases}
          streak={userData.streak}
          badges={badges}
          accuracy={userData.accuracy}
        />
      )}
      {showCertificate && (
        <CertificateModal
          certificateData={certificateData}
          onClose={() => setShowCertificate(false)}
        />
      )}
      {showAudioSettings && (
        <AudioSettingsModal onClose={() => setShowAudioSettings(false)} />
      )}
      {showCelebration && (
        <LevelUpCelebration onComplete={() => setShowCelebration(false)} />
      )}
    </DashboardLayout>
  );
}
