class SoundService {
  private ctx: AudioContext | null = null;
  private masterVolume: number = 0.8;
  private sfxVolume: number = 0.8;
  private musicVolume: number = 0.4;
  private isMuted: boolean = false;
  private isVoiceEnabled: boolean = true;
  private isVibrationEnabled: boolean = true;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  constructor() {
    // AudioContext will be initialized on user interaction
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolumes(master: number, sfx: number, music: number) {
    this.masterVolume = master;
    this.sfxVolume = sfx;
    this.musicVolume = music;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : this.musicVolume * 0.15, this.ctx.currentTime);
    }
  }

  public toggleMute(muted?: boolean) {
    this.isMuted = muted !== undefined ? muted : !this.isMuted;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : this.musicVolume * 0.15, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.isVoiceEnabled = enabled;
  }

  public setVibrationEnabled(enabled: boolean) {
    this.isVibrationEnabled = enabled;
  }

  private vibrate(pattern: number | number[]) {
    if (this.isVibrationEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Ignore
      }
    }
  }

  // UI Button Click
  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    const vol = this.masterVolume * this.sfxVolume * 0.2;
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
    this.vibrate(10);
  }

  // Correct Diagnostic Choice
  public playCorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
    osc1.frequency.setValueAtTime(783.99, now + 0.2); // G5

    osc2.frequency.setValueAtTime(261.63, now);
    osc2.frequency.setValueAtTime(329.63, now + 0.1);
    osc2.frequency.setValueAtTime(392.00, now + 0.2);

    const vol = this.masterVolume * this.sfxVolume * 0.3;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
    this.vibrate([30, 50, 30]);
  }

  // Incorrect Diagnostic Choice
  public playIncorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.setValueAtTime(130, now + 0.15);

    const vol = this.masterVolume * this.sfxVolume * 0.3;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.start(now);
    osc.stop(now + 0.3);
    this.vibrate(70);
  }

  // XP / Level Up / Badge
  public playTrophy() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.50];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      const vol = this.masterVolume * this.sfxVolume * 0.25;
      gain.gain.setValueAtTime(vol, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.15);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.15);
    });
    this.vibrate([40, 40, 40, 40, 80]);
  }

  // Stethoscope / Heartbeat
  public playHeartbeat() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.1);

    const vol = this.masterVolume * this.sfxVolume * 0.4;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.start(now);
    osc.stop(now + 0.15);
    this.vibrate(25);
  }

  // Emergency Alert
  public playAlert() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'square';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.setValueAtTime(659.25, now + 0.15);

    const vol = this.masterVolume * this.sfxVolume * 0.25;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.start(now);
    osc.stop(now + 0.3);
    this.vibrate([60, 60, 60]);
  }

  // Start Ambient Medical Soundtrack
  public startAmbientMusic() {
    if (this.isAmbientPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOsc.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3 drone

      const targetVol = this.isMuted ? 0 : this.musicVolume * 0.15;
      this.ambientGain.gain.setValueAtTime(targetVol, this.ctx.currentTime);

      this.ambientOsc.start();
      this.isAmbientPlaying = true;
    } catch (e) {
      // Ignore
    }
  }

  public stopAmbientMusic() {
    if (this.ambientOsc && this.isAmbientPlaying) {
      try {
        this.ambientOsc.stop();
        this.ambientOsc.disconnect();
      } catch (e) {}
      this.isAmbientPlaying = false;
      this.ambientOsc = null;
    }
  }

  // Text-to-Speech Voice Guidance
  public speak(text: string, onEnd?: () => void) {
    if (!this.isVoiceEnabled || this.isMuted) {
      if (onEnd) onEnd();
      return;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        if (onEnd) onEnd();
      };
      window.speechSynthesis.speak(utterance);
    } else {
      if (onEnd) onEnd();
    }
  }

  public stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundService = new SoundService();
