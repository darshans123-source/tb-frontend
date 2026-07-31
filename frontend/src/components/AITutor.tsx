import { useState, FormEvent } from 'react';
import { Sparkles, Send, Bot, User, X, Volume2, Lightbulb } from 'lucide-react';
import { soundService } from '../services/soundService';
import { aiService } from '../services/aiService';

interface AITutorProps {
  onClose: () => void;
}

export default function AITutor({ onClose }: AITutorProps) {
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string; source?: string }[]>([
    {
      sender: 'ai',
      text: "Hello Dr. Student! I am your AI clinical mentor at Navodaya Medical College. Ask me anything about TB diagnostic algorithms, CBNAAT interpretation, pediatric scoring, HIV-TB co-infection, or MDR management."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "Explain the CBNAAT Rifampicin Indeterminate repeat rule",
    "How is Pediatric TB Score calculated?",
    "When should ART be started in HIV-TB co-infection?",
    "What are the high-risk PMDT criteria for MDR-TB?"
  ];

  const handleSendPrompt = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      // First try local AI service (which guarantees instant high quality answer without API dependency)
      const data = await aiService.askChat(text);
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply, source: data.source }]);
      soundService.speak(data.reply);
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: "Based on national NTEP guidelines, presumptive pulmonary TB requires rapid molecular testing (CBNAAT) and sputum smear microscopy. If smear is negative but clinical suspicion remains high, CBNAAT is mandatory.",
        source: 'NTEP Guideline Standard'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendPrompt(input);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/40 w-full max-w-3xl h-[650px] rounded-3xl flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-950 border border-cyan-500/30 rounded-2xl text-cyan-400">
              <Bot size={26} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                TB Quest AI Clinical Tutor <Sparkles size={18} className="text-amber-400" />
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Powered by Clinical Reasoning Engine • Navodaya Medical College
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <Lightbulb size={14} className="text-amber-400 shrink-0" />
          <span className="text-slate-400 shrink-0">High-Yield Questions:</span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(q)}
              className="px-3 py-1 bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 rounded-full text-[11px] text-slate-300 shrink-0 transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'ai' && (
                <div className="w-9 h-9 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot size={18} />
                </div>
              )}
              <div className={`max-w-[82%] p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md font-medium'
                  : 'bg-slate-800/90 border border-slate-700 text-slate-200 rounded-tl-none shadow-sm'
              }`}>
                <p>{m.text}</p>
                {m.sender === 'ai' && (
                  <div className="flex justify-between items-center pt-2 border-t border-slate-700/50 text-[10px] text-slate-400 font-mono">
                    <span>Source: {m.source || 'NTEP Clinical Guidelines'}</span>
                    <button
                      onClick={() => soundService.speak(m.text)}
                      className="hover:text-cyan-300 flex items-center gap-1"
                      title="Read aloud"
                    >
                      <Volume2 size={12} /> Read Aloud
                    </button>
                  </div>
                )}
              </div>
              {m.sender === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs italic font-mono">
              <Bot size={18} className="animate-spin text-cyan-400" />
              <span>AI Tutor is analyzing clinical knowledge base...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI tutor about TB algorithms, CBNAAT, pediatric scores, MDR..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs font-medium"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] text-xs"
          >
            <Send size={16} /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
