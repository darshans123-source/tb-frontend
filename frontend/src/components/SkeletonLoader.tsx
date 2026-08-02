import React from 'react';

interface SkeletonProps {
  type?: 'card' | 'table' | 'dashboard' | 'dossier';
  count?: number;
}

export default function SkeletonLoader({ type = 'card', count = 3 }: SkeletonProps) {
  const items = Array.from({ length: count });

  if (type === 'table') {
    return (
      <div className="space-y-3 w-full animate-pulse">
        <div className="h-10 bg-slate-900 border border-slate-800 rounded-xl w-full" />
        {items.map((_, i) => (
          <div key={i} className="h-16 bg-slate-900/60 border border-slate-800 rounded-xl w-full flex items-center px-4 justify-between">
            <div className="h-4 bg-slate-800 rounded w-1/4" />
            <div className="h-4 bg-slate-800 rounded w-1/6" />
            <div className="h-4 bg-slate-800 rounded w-1/5" />
            <div className="h-8 bg-slate-800 rounded-xl w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'dashboard') {
    return (
      <div className="space-y-6 w-full animate-pulse p-4">
        <div className="h-24 bg-slate-900/80 border border-slate-800 rounded-2xl w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-900/80 border border-slate-800 rounded-2xl" />
          ))}
        </div>
        <div className="h-64 bg-slate-900/80 border border-slate-800 rounded-2xl w-full" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full animate-pulse">
      {items.map((_, i) => (
        <div key={i} className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-5 bg-slate-800 rounded w-1/2" />
            <div className="h-5 bg-slate-800 rounded-full w-16" />
          </div>
          <div className="h-4 bg-slate-800/60 rounded w-3/4" />
          <div className="h-4 bg-slate-800/60 rounded w-2/3" />
          <div className="pt-2 flex justify-between items-center">
            <div className="h-4 bg-slate-800 rounded w-1/3" />
            <div className="h-8 bg-slate-800 rounded-xl w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
