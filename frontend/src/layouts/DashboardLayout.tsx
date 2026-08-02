import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ children, currentTab, setCurrentTab, userData, onLogout }: any) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex overflow-x-hidden">
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onLogout={onLogout}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />
      <div className="flex-1 ml-0 lg:ml-72 w-full min-w-0 transition-all duration-300">
        <Header
          userData={userData}
          onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
        />
        <main className="p-4 sm:p-6 md:p-8 pt-20 sm:pt-24 min-h-screen max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
