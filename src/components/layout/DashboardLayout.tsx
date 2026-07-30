import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ children, currentTab, setCurrentTab, userData, onLogout }: any) {
  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} onLogout={onLogout} />
      <div className="flex-1 ml-64">
        <Header userData={userData} />
        <main className="p-8 pt-24 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
