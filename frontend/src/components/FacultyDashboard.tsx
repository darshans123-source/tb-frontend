import { BarChart3, Users, FileText, Download, CheckCircle, AlertTriangle } from 'lucide-react';

export default function FacultyDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-center pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Faculty Dashboard
          </h1>
          <p className="text-slate-400 font-mono">Navodaya Medical College • Department of Microbiology</p>
        </div>
        <button
          onClick={() => alert("Exporting student analytics PDF report...")}
          className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-white font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
        >
          <Download size={18} />
          <span>Export Analytics PDF</span>
        </button>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-3 text-cyan-400 mb-2">
            <Users size={20} />
            <span className="text-xs uppercase font-mono text-slate-400">Enrolled Students</span>
          </div>
          <p className="text-3xl font-extbold font-mono">142</p>
          <p className="text-xs text-emerald-400 mt-1">↑ 12% active this week</p>
        </div>

        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <CheckCircle size={20} />
            <span className="text-xs uppercase font-mono text-slate-400">Average Accuracy</span>
          </div>
          <p className="text-3xl font-extbold font-mono">84.2%</p>
          <p className="text-xs text-emerald-400 mt-1">Pulmonary & Pediatric</p>
        </div>

        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <BarChart3 size={20} />
            <span className="text-xs uppercase font-mono text-slate-400">Cases Completed</span>
          </div>
          <p className="text-3xl font-extbold font-mono">890</p>
          <p className="text-xs text-slate-400 mt-1">Across 4 modules</p>
        </div>

        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-3 text-rose-400 mb-2">
            <AlertTriangle size={20} />
            <span className="text-xs uppercase font-mono text-slate-400">Weak Area Flag</span>
          </div>
          <p className="text-3xl font-extbold font-mono">MDR-DST</p>
          <p className="text-xs text-rose-400 mt-1">Requires review in lecture</p>
        </div>
      </div>

      {/* Recent Student Submissions Table */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <FileText className="text-cyan-400" /> Student Performance & Weak Topics
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-xs uppercase">
                <th className="pb-3">Student Name</th>
                <th className="pb-3">Module</th>
                <th className="pb-3">Score</th>
                <th className="pb-3">Accuracy</th>
                <th className="pb-3">Time Taken</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-4 font-medium text-white">Ananya Sharma</td>
                <td className="py-4 text-slate-300">Pulmonary TB</td>
                <td className="py-4 font-mono text-cyan-400">950 XP</td>
                <td className="py-4 text-emerald-400 font-mono">100%</td>
                <td className="py-4 font-mono text-slate-400">42s</td>
                <td className="py-4"><span className="px-3 py-1 bg-emerald-950 text-emerald-400 rounded-full text-xs font-semibold">Mastered</span></td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">Rahul Verma</td>
                <td className="py-4 text-slate-300">Pediatric TB</td>
                <td className="py-4 font-mono text-cyan-400">720 XP</td>
                <td className="py-4 text-amber-400 font-mono">75%</td>
                <td className="py-4 font-mono text-slate-400">68s</td>
                <td className="py-4"><span className="px-3 py-1 bg-amber-950 text-amber-400 rounded-full text-xs font-semibold">Review Needed</span></td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-white">Priya Patel</td>
                <td className="py-4 text-slate-300">MDR-TB Case</td>
                <td className="py-4 font-mono text-cyan-400">880 XP</td>
                <td className="py-4 text-emerald-400 font-mono">90%</td>
                <td className="py-4 font-mono text-slate-400">51s</td>
                <td className="py-4"><span className="px-3 py-1 bg-emerald-950 text-emerald-400 rounded-full text-xs font-semibold">Mastered</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
