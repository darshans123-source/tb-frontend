import { useState } from 'react';
import { Volume2, VolumeX, Music, Mic, Vibrate, X, Sliders } from 'lucide-react';
import { soundService } from '../services/soundService';

interface AudioSettingsModalProps {
  onClose: () => void;
}

export default function AudioSettingsModal({ onClose }: AudioSettingsModalProps) {
  const [masterVol, setMasterVol] = useState(80);
  const [sfxVol, setSfxVol] = useState(80);
  const [musicVol, setMusicVol] = useState(40);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const handleUpdate = (master: number, sfx: number, music: number) => {
    soundService.setVolumes(master / 100, sfx / 100, music / 100);
    soundService.playClick();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-cyan-500/50 w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-white space-y-4 sm:space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 bg-cyan-950 border border-cyan-500/40 rounded-xl sm:rounded-2xl text-cyan-400">
              <Sliders size={20} className="sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold">Audio & Sound Settings</h2>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono">Customized Clinical Audio Experience</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl">
            <X size={18} />
          </button>
        </div>

        {/* Mute Toggle */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-3">
            {isMuted ? <VolumeX size={18} className="text-rose-400 shrink-0" /> : <Volume2 size={18} className="text-cyan-400 shrink-0" />}
            <div>
              <p className="font-semibold text-xs sm:text-sm">Mute All Sounds</p>
              <p className="text-[10px] sm:text-xs text-slate-400">Silence all sound effects and music</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={isMuted}
            onChange={(e) => {
              const muted = e.target.checked;
              setIsMuted(muted);
              soundService.toggleMute(muted);
            }}
            className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer shrink-0"
          />
        </div>

        {/* Sliders */}
        <div className="space-y-4 p-3 sm:p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
          <div>
            <div className="flex justify-between text-[11px] sm:text-xs font-mono text-slate-300 mb-1">
              <span>Master Volume</span>
              <span className="text-cyan-400">{masterVol}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={masterVol}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMasterVol(val);
                handleUpdate(val, sfxVol, musicVol);
              }}
              className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] sm:text-xs font-mono text-slate-300 mb-1">
              <span>Effects (SFX) Volume</span>
              <span className="text-cyan-400">{sfxVol}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sfxVol}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSfxVol(val);
                handleUpdate(masterVol, val, musicVol);
              }}
              className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] sm:text-xs font-mono text-slate-300 mb-1">
              <span className="flex items-center gap-1.5"><Music size={14} /> Ambient Soundtrack Volume</span>
              <span className="text-cyan-400">{musicVol}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={musicVol}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMusicVol(val);
                handleUpdate(masterVol, sfxVol, val);
                if (val > 0) {
                  soundService.startAmbientMusic();
                } else {
                  soundService.stopAmbientMusic();
                }
              }}
              className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-between p-3 sm:p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <Mic size={16} className="text-purple-400 shrink-0" />
              <span>Voice Feedback (TTS)</span>
            </div>
            <input
              type="checkbox"
              checked={voiceEnabled}
              onChange={(e) => {
                const val = e.target.checked;
                setVoiceEnabled(val);
                soundService.setVoiceEnabled(val);
                soundService.playClick();
              }}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-cyan-500 cursor-pointer shrink-0"
            />
          </div>

          <div className="flex items-center justify-between p-3 sm:p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <Vibrate size={16} className="text-emerald-400 shrink-0" />
              <span>Haptic Feedback (Vibration)</span>
            </div>
            <input
              type="checkbox"
              checked={vibrationEnabled}
              onChange={(e) => {
                const val = e.target.checked;
                setVibrationEnabled(val);
                soundService.setVibrationEnabled(val);
                soundService.playClick();
              }}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-cyan-500 cursor-pointer shrink-0"
            />
          </div>
        </div>

        <button
          onClick={() => {
            soundService.playTrophy();
            onClose();
          }}
          className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
        >
          Save & Apply Audio Settings
        </button>

      </div>
    </div>
  );
}
