export interface VoiceSettings {
  lang: string;
  rate: number;
  pitch: number;
  volume: number;
  voiceURI: string;
  genderPref: 'male' | 'female';
}

const STORAGE_KEY = 'tb_quest_voice_settings';

const DEFAULT_SETTINGS: VoiceSettings = {
  lang: 'en-IN',
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  voiceURI: '',
  genderPref: 'female'
};

class VoiceService {
  private settings: VoiceSettings = DEFAULT_SETTINGS;
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPaused: boolean = false;
  private availableVoices: SpeechSynthesisVoice[] = [];
  private voicesListeners: Array<() => void> = [];

  constructor() {
    this.loadFromStorage();
    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.loadVoices();
          this.notifyVoicesChanged();
        };
      }
    }
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.settings = { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load voice settings from localStorage:', e);
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch (e) {
      console.warn('Failed to save voice settings to localStorage:', e);
    }
  }

  private loadVoices() {
    if (this.synth) {
      this.availableVoices = this.synth.getVoices();
    }
  }

  private notifyVoicesChanged() {
    this.voicesListeners.forEach(listener => listener());
  }

  public subscribeVoicesChanged(callback: () => void): () => void {
    this.voicesListeners.push(callback);
    return () => {
      this.voicesListeners = this.voicesListeners.filter(l => l !== callback);
    };
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (this.availableVoices.length === 0 && this.synth) {
      this.availableVoices = this.synth.getVoices();
    }
    return this.availableVoices;
  }

  public updateSettings(newSettings: Partial<VoiceSettings>): VoiceSettings {
    this.settings = { ...this.settings, ...newSettings };
    this.saveToStorage();
    return this.settings;
  }

  public getSettings(): VoiceSettings {
    return { ...this.settings };
  }

  /**
   * Resolves best matching SpeechSynthesisVoice based on voiceURI, language, and gender preference.
   */
  public resolveVoice(overrides?: Partial<VoiceSettings>): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (voices.length === 0) return null;

    const target = { ...this.settings, ...overrides };

    // 1. Match exact voiceURI if provided
    if (target.voiceURI) {
      const exactVoice = voices.find(v => v.voiceURI === target.voiceURI);
      if (exactVoice) return exactVoice;
    }

    // 2. Match exact language code (e.g. 'en-IN' or 'hi-IN')
    let langVoices = voices.filter(v => v.lang.toLowerCase() === target.lang.toLowerCase());

    // 3. Fallback to language prefix (e.g. 'en' or 'hi')
    if (langVoices.length === 0) {
      const prefix = target.lang.split('-')[0].toLowerCase();
      langVoices = voices.filter(v => v.lang.toLowerCase().startsWith(prefix));
    }

    // 4. Fallback to English if no matching language found
    if (langVoices.length === 0) {
      langVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
    }

    if (langVoices.length === 0) {
      return voices[0]; // System default fallback
    }

    // 5. Gender matching heuristic
    if (target.genderPref) {
      const femaleKeywords = ['female', 'zira', 'susan', 'samantha', 'victoria', 'heera', 'aditi', 'katherine', 'google US english'];
      const maleKeywords = ['male', 'david', 'mark', 'george', 'ravi', 'hemant', 'alex', 'google UK english male'];

      const keywords = target.genderPref === 'female' ? femaleKeywords : maleKeywords;
      const genderMatched = langVoices.find(v =>
        keywords.some(kw => v.name.toLowerCase().includes(kw))
      );
      if (genderMatched) return genderMatched;
    }

    return langVoices[0];
  }

  public speak(text: string, onEnd?: () => void, overrides?: Partial<VoiceSettings>) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    const activeSettings = { ...this.settings, ...overrides };
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = activeSettings.rate;
    utterance.pitch = activeSettings.pitch;
    utterance.volume = activeSettings.volume;

    const matchedVoice = this.resolveVoice(overrides);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
      utterance.lang = matchedVoice.lang;
    } else {
      utterance.lang = activeSettings.lang;
    }

    utterance.onend = () => {
      this.isPaused = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (err) => {
      console.warn('SpeechSynthesis error:', err);
      this.isPaused = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.isPaused = false;
    this.synth.speak(utterance);
  }

  public testVoice(onEnd?: () => void, overrides?: Partial<VoiceSettings>) {
    const sampleText = "Welcome to TB Quest. Your voice assistant is now configured successfully.";
    this.speak(sampleText, onEnd, overrides);
  }

  public pause() {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPaused = false;
      this.currentUtterance = null;
    }
  }

  public getIsSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking);
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }
}

export const voiceService = new VoiceService();
