import { useEffect } from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { soundService } from '../services/soundService';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-[#060913] text-white flex flex-col items-center justify-center p-4 sm:p-6 z-50 overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute w-72 sm:w-[500px] h-72 sm:h-[500px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center relative z-10 space-y-4 sm:space-y-6 max-w-full"
      >
        <div className="p-4 sm:p-6 bg-cyan-950/80 border border-cyan-500/40 rounded-3xl text-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.3)] animate-pulse">
          <Shield size={48} className="sm:w-16 sm:h-16" />
        </div>
        
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            TB QUEST
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 font-mono tracking-wide px-2">
            Gamified AI Tuberculosis Diagnostic Platform
          </p>
        </div>

        <div className="w-40 sm:w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-4 sm:mt-6">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 mt-4 font-mono">
          <Sparkles size={14} className="text-cyan-400 shrink-0" />
          <span>Navodaya Institute of Technology</span>
        </div>
      </motion.div>
    </div>
  );
}
