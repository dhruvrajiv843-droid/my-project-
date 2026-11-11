import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Calendar, CheckCircle2, RotateCcw } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToTrial: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onSwitchToTrial }) => {
  const [activeTab, setActiveTab] = useState<'tour' | 'book'>('tour');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(35);

  // Booking form states
  const [bookName, setBookName] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookDate, setBookDate] = useState('Tomorrow, 2:00 PM EST');
  const [bookSuccess, setBookSuccess] = useState(false);

  const demoTourSteps = [
    {
      title: 'Kanban Sprint Board',
      duration: '0:45',
      summary: 'Dynamic columns, WIP limits, automated triage, and sub-second drag-and-drop ticket re-ordering.'
    },
    {
      title: 'Real-Time Co-Presence',
      duration: '1:15',
      summary: 'Live cursor indicators, inline comment threads, and async video memos attached directly to deliverables.'
    },
    {
      title: 'Gantt Timeline & Dependencies',
      duration: '1:50',
      summary: 'Auto-adjusting timeline with dependency chains, critical path detection, and resource heatmaps.'
    },
    {
      title: 'No-Code Automation Rules',
      duration: '2:20',
      summary: 'Trigger-based recipes that synchronize pull requests, update customer status, and ping Slack channels.'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Gentle progress update when playing
  useEffect(() => {
    if (!isOpen || !isPlaying || activeTab !== 'tour') return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((s) => (s + 1) % demoTourSteps.length);
          return 0;
        }
        return prev + 10;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, activeTab, demoTourSteps.length]);

  if (!isOpen) return null;

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !bookEmail) return;
    setBookSuccess(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('tour')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'tour'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Product Tour
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('book')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'book'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Book 1-on-1 Demo
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close demo dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {activeTab === 'tour' ? (
          <div className="p-6">
            {/* Simulated Video Player Container */}
            <div className="relative aspect-16/9 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner group">
              <img
                src="/src/assets/images/hero_flowdesk_dashboard_1794399154165.jpg"
                alt="FlowDesk interactive product tour presentation"
                className="w-full h-full object-cover opacity-90 transition-opacity"
              />

              {/* Player Overlay Chrome */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 flex flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white">
                    Step {activeStep + 1} of {demoTourSteps.length}: {demoTourSteps[activeStep].title}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-[10px] font-mono font-bold text-white uppercase">
                    1080p HD
                  </span>
                </div>

                {/* Center Big Play/Pause Button */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all backdrop-blur-xs"
                    aria-label={isPlaying ? 'Pause demo' : 'Play demo'}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-1" />
                    )}
                  </button>
                </div>

                {/* Bottom Scrubber & Controls */}
                <div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setProgress(0);
                          setIsPlaying(true);
                        }}
                        className="hover:text-white flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Replay</span>
                      </button>
                    </div>
                    <span>{demoTourSteps[activeStep].duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tour Step Cards Selector */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {demoTourSteps.map((step, idx) => (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => {
                    setActiveStep(idx);
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    activeStep === idx
                      ? 'border-indigo-600 bg-indigo-50/70'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-[11px] font-bold text-slate-900 truncate">{step.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{step.duration}</p>
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              {demoTourSteps[activeStep].summary}
            </p>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('book')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Want a custom walk-through for your team?
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToTrial();
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        ) : (
          <div className="p-7">
            {bookSuccess ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Demo Scheduled!</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto">
                  Thanks <span className="font-semibold text-slate-900">{bookName}</span>. A calendar invitation has been sent to <span className="font-semibold text-slate-900">{bookEmail}</span> for {bookDate}.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase">
                  <Calendar className="w-4 h-4" />
                  <span>Personalized 20-Minute Session</span>
                </div>
                <h2 id="demo-modal-title" className="text-xl font-bold text-slate-900">
                  Book a live demo with a FlowDesk specialist
                </h2>
                <p className="text-xs text-slate-500">
                  See how FlowDesk maps to your specific engineering, product, or design workflows.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder="Jordan Lee"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={bookEmail}
                    onChange={(e) => setBookEmail(e.target.value)}
                    placeholder="jordan@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="Tomorrow, 10:00 AM EST">Tomorrow, 10:00 AM EST</option>
                    <option value="Tomorrow, 2:00 PM EST">Tomorrow, 2:00 PM EST</option>
                    <option value="Thursday, 11:30 AM EST">Thursday, 11:30 AM EST</option>
                    <option value="Friday, 3:00 PM EST">Friday, 3:00 PM EST</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors shadow-xs"
                >
                  Confirm Demo Booking
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
