import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  UserPlus,
  Save,
  Users,
  ChevronRight,
  Quote,
  Heart,
  CheckCircle2,
  Home
} from 'lucide-react';
import prayerSeed from '../data/prayer_seed.json';

type ViewState = 'setup' | 'dashboard' | 'reading' | 'prayer' | 'completion';

const prayerAdvice = [
  'Focus on their health, energy, and physical well-being today.',
  'Pray for their spiritual journey and a deeper connection with God.',
  'Ask for wisdom and clarity in their daily decisions and challenges.',
  'Pray for peace, harmony, and love in their relationships and home.',
  'Lift up their work, influence, and sense of purpose in the world.',
  'Pray for protection, safety, and strength in times of trial.',
  'Ask for a heart full of joy, gratitude, and lasting contentment.'
];

export function PrayerPage() {
  const { user, bypassUsername } = useAuth();
  const currentUsername = user?.email || bypassUsername || 'anonymous';

  const [view, setView] = useState<ViewState>('dashboard');
  const [names, setNames] = useState<string[]>(['', '', '', '', '']);
  const [savedNames, setSavedNames] = useState<string[]>([]);
  const [currentDay, setCurrentDay] = useState(1);

  // Prayer Experience State
  const [personIndex, setPersonIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [adviceIndex, setAdviceIndex] = useState(0);
  const [autoAdvanceTimeLeft, setAutoAdvanceTimeLeft] = useState(5);

  // Load from local storage on mount
  useEffect(() => {
    const key = `prayer_targets_${currentUsername}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setSavedNames(JSON.parse(stored));
      setView('dashboard');
    } else {
      setView('setup');
    }

    const dayKey = `prayer_progress_${currentUsername}`;
    const storedDay = localStorage.getItem(dayKey);
    if (storedDay) {
      setCurrentDay(parseInt(storedDay));
    }
  }, [currentUsername]);

  const nextPerson = () => {
    setAutoAdvanceTimeLeft(5);
    if (personIndex < savedNames.length - 1) {
      setPersonIndex(personIndex + 1);
      setTimeLeft(10);
      setAdviceIndex(0);
    } else {
      setView('completion');
    }
  };

  // Timer and Auto-advance logic
  useEffect(() => {
    if (view !== 'prayer') return;

    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) return 0;
          // Cycle advice every 5 seconds for a 10s timer
          if (prev % 5 === 0) {
            setAdviceIndex((idx) => (idx + 1) % prayerAdvice.length);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    } else {
      const autoTimer = setInterval(() => {
        setAutoAdvanceTimeLeft((prev) => {
          if (prev <= 1) {
            nextPerson();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(autoTimer);
    }
  }, [view, timeLeft === 0, personIndex]);

  const handleSaveNames = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredNames = names.filter((n) => n.trim() !== '');
    if (filteredNames.length === 0) {
      alert('Please enter at least one name.');
      return;
    }
    const key = `prayer_targets_${currentUsername}`;
    localStorage.setItem(key, JSON.stringify(filteredNames));
    setSavedNames(filteredNames);
    setView('dashboard');
  };

  const handleInputChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleResetSetup = () => {
    if (confirm('Are you sure you want to change your prayer list?')) {
      const paddedNames = [...savedNames];
      while (paddedNames.length < 5) paddedNames.push('');
      setNames(paddedNames);
      setView('setup');
    }
  };

  const completeDay = () => {
    const nextDay = currentDay + 1;
    const dayKey = `prayer_progress_${currentUsername}`;
    localStorage.setItem(dayKey, nextDay.toString());
    setCurrentDay(nextDay);
    setView('dashboard');
  };

  const dayContent =
    prayerSeed.content_master.find((c) => c.day_number === currentDay) ||
    prayerSeed.content_master[0];
  const emphasis = prayerSeed.emphases.find(
    (e) => e.id === dayContent.emphasis_id
  );
  const instruction = prayerSeed.instructions.find(
    (i) => i.id === dayContent.instr_id
  );

  const renderView = () => {
    switch (view) {
      case 'setup':
        return (
          <div className='max-w-md mx-auto py-8 px-4'>
            <div className='text-center mb-8'>
              <div className='inline-flex p-3 bg-[#4A7C7C]/10 rounded-full mb-4'>
                <UserPlus className='w-8 h-8 text-[#4A7C7C]' />
              </div>
              <h2 className='text-2xl font-bold text-[#1A3A3A]'>
                Prayer List Setup
              </h2>
              <p className='text-[#4A7C7C] mt-2 font-medium'>
                Enter up to 5 people you want to pray for during this 40-day
                journey.
              </p>
            </div>

            <form
              onSubmit={handleSaveNames}
              className='bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-[#4A7C7C]/20'
            >
              <div className='space-y-4'>
                {names.map((name, i) => (
                  <div key={i} className='flex flex-col gap-1'>
                    <label className='text-xs font-semibold text-[#4A7C7C] uppercase tracking-wider'>
                      Person {i + 1}{' '}
                      {i === 0 && <span className='text-[#1A3A3A]'>*</span>}
                    </label>
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => handleInputChange(i, e.target.value)}
                      placeholder={i === 0 ? 'Required' : 'Optional'}
                      className='w-full bg-white/40 border border-[#4A7C7C]/30 focus:border-[#1A3A3A] focus:ring-2 focus:ring-[#1A3A3A]/20 rounded-xl px-4 py-3 text-[#1A3A3A] placeholder:text-[#4A7C7C]/40 outline-none transition'
                    />
                  </div>
                ))}
              </div>
              <button
                type='submit'
                className='w-full mt-8 bg-[#1A3A3A] hover:bg-[#4A7C7C] text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2'
              >
                <Save className='w-5 h-5' /> Save Prayer List
              </button>
            </form>
          </div>
        );

      case 'dashboard':
        return (
          <div className='max-w-md mx-auto py-8 px-4'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl font-black text-[#1A3A3A]'>
                Day {currentDay}
              </h2>
              <p className='text-[#4A7C7C] font-bold uppercase tracking-[0.2em] mt-2'>
                {emphasis?.label}
              </p>
            </div>

            <div className='bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-[#4A7C7C]/10 mb-8'>
              <h3 className='text-sm font-bold text-[#4A7C7C] mb-6 uppercase tracking-widest text-center'>
                Your Five
              </h3>
              <div className='flex flex-wrap justify-center gap-x-6 gap-y-4'>
                {savedNames.map((name, i) => (
                  <div key={i} className='text-center'>
                    <span className='foil-text text-2xl font-black tracking-tight'>
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <button
                onClick={() => setView('reading')}
                className='group w-full bg-[#1A3A3A] hover:bg-[#4A7C7C] text-white font-black py-6 rounded-2xl shadow-xl shadow-[#1A3A3A]/30 transition-all text-2xl flex items-center justify-center gap-3'
              >
                Begin Day {currentDay}
                <ChevronRight className='w-8 h-8 group-hover:translate-x-1 transition-transform' />
              </button>
              <button
                onClick={handleResetSetup}
                className='flex items-center justify-center gap-2 text-sm text-[#4A7C7C] hover:text-[#1A3A3A] transition-colors font-medium'
              >
                <Users className='w-4 h-4' /> Edit Prayer List
              </button>
            </div>
          </div>
        );

      case 'reading':
        return (
          <div className='max-w-2xl mx-auto py-8 px-4'>
            <div className='mb-10 text-center'>
              <span className='text-[#4A7C7C] font-bold uppercase tracking-widest text-sm'>
                Day {currentDay} • {emphasis?.label}
              </span>
              <h2 className='text-3xl font-black text-[#1A3A3A] mt-2 leading-tight'>
                {dayContent.title}
              </h2>
            </div>

            <div className='space-y-12'>
              <section className='bg-[#1A3A3A] text-white p-6 rounded-2xl shadow-lg border-l-4 border-[#4A7C7C]'>
                <h4 className='text-xs font-bold text-[#E6F0EF]/80 uppercase tracking-widest mb-2'>
                  Guidance
                </h4>
                <p className='text-lg font-medium italic'>{instruction?.text}</p>
              </section>

              <section>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='h-px flex-1 bg-[#4A7C7C]/30' />
                  <span className='text-xs font-bold text-[#4A7C7C] uppercase tracking-widest'>
                    Opening Reading
                  </span>
                  <div className='h-px flex-1 bg-[#4A7C7C]/30' />
                </div>
                <div className='relative p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-[#4A7C7C]/10 shadow-sm italic text-[#1A3A3A] text-xl leading-relaxed text-center'>
                  <Quote className='absolute top-4 left-4 w-8 h-8 text-[#4A7C7C]/20 -scale-x-100' />
                  {dayContent.scripture_1}
                  <Quote className='absolute bottom-4 right-4 w-8 h-8 text-[#4A7C7C]/20' />
                </div>
              </section>

              <section className='prose prose-slate max-w-none'>
                <div
                  className='text-[#1A3A3A] text-lg leading-loose space-y-6'
                  dangerouslySetInnerHTML={{ __html: dayContent.devotional_body }}
                />
              </section>

              <section className='pb-12 text-center'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='h-px flex-1 bg-[#4A7C7C]/30' />
                  <span className='text-xs font-bold text-[#4A7C7C] uppercase tracking-widest'>
                    Reflection
                  </span>
                  <div className='h-px flex-1 bg-[#4A7C7C]/30' />
                </div>
                <p className='text-[#4A7C7C] font-medium italic'>
                  {dayContent.scripture_2}
                </p>
              </section>
            </div>

            <div className='sticky bottom-8 mt-12'>
              <button
                onClick={() => {
                  setView('prayer');
                  setPersonIndex(0);
                  setTimeLeft(10);
                }}
                className='w-full bg-[#1A3A3A] hover:bg-[#4A7C7C] text-white font-black py-6 rounded-2xl shadow-2xl transition-all text-xl flex items-center justify-center gap-3 border-b-4 border-[#4A7C7C]'
              >
                Pray for your {savedNames.length}
                <ChevronRight className='w-6 h-6' />
              </button>
            </div>
          </div>
        );

      case 'prayer':
        const progress = ((10 - timeLeft) / 10) * 100;
        const autoAdvanceProgress = (autoAdvanceTimeLeft / 5) * 100;

        return (
          <div className='max-w-md mx-auto min-h-[90vh] py-12 px-6 flex flex-col items-center justify-center text-center'>
            <div className='mb-8 animate-in fade-in slide-in-from-top-4 duration-1000'>
              <span className='text-[#4A7C7C] font-bold uppercase tracking-[0.2em] text-sm mb-3 block'>
                Prayer for
              </span>
              <h2 className='text-4xl font-black text-[#1A3A3A] leading-tight'>
                Take this moment to lift up{' '}
                <span className='text-[#4A7C7C]'>{savedNames[personIndex]}</span>
              </h2>
            </div>

            {/* Meditative Timer Circle */}
            <div className='relative w-64 h-64 mb-10'>
              <div className='absolute inset-0 bg-[#4A7C7C]/20 rounded-full blur-3xl opacity-30 animate-pulse' />
              <svg className='relative w-full h-full transform -rotate-90'>
                <circle
                  cx='128'
                  cy='128'
                  r='120'
                  stroke='currentColor'
                  strokeWidth='4'
                  fill='transparent'
                  className='text-[#4A7C7C]/10'
                />
                <circle
                  cx='128'
                  cy='128'
                  r='120'
                  stroke='currentColor'
                  strokeWidth='8'
                  fill='transparent'
                  strokeDasharray={754}
                  strokeDashoffset={754 - (754 * progress) / 100}
                  className='text-[#4A7C7C] transition-all duration-1000 ease-linear'
                  strokeLinecap='round'
                />
              </svg>
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <span className='text-5xl font-black text-[#1A3A3A] tabular-nums'>
                  {timeLeft > 0 ? timeLeft : autoAdvanceTimeLeft}s
                </span>
                <Heart
                  className={`w-8 h-8 mt-4 transition-all duration-1000 ${timeLeft % 2 === 0 ? 'scale-110 text-[#4A7C7C]' : 'scale-90 text-[#4A7C7C]/30'}`}
                  fill='currentColor'
                />
              </div>
            </div>

            {/* Cycling Advice */}
            <div className='h-32 flex items-center justify-center mb-10 px-4'>
              <p
                key={`${personIndex}-${adviceIndex}`}
                className='text-[#4A7C7C] italic text-2xl font-light leading-relaxed animate-in fade-in duration-1000'
              >
                {prayerAdvice[adviceIndex]}
              </p>
            </div>

            <div className='w-full max-w-sm'>
              <button
                onClick={nextPerson}
                className={`relative overflow-hidden w-full py-6 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-2 group ${
                  timeLeft === 0
                    ? 'bg-[#4A7C7C] text-white shadow-2xl shadow-[#4A7C7C]/40'
                    : 'bg-white/40 backdrop-blur-sm text-[#4A7C7C] border border-[#4A7C7C]/20 hover:bg-white/60'
                }`}
              >
                {/* Countdown bar overlay */}
                {timeLeft === 0 && (
                  <div
                    className='absolute inset-y-0 left-0 bg-white/20 transition-all duration-1000 ease-linear'
                    style={{ width: `${autoAdvanceProgress}%` }}
                  />
                )}
                <span className='relative z-10 flex items-center gap-2'>
                  {personIndex < savedNames.length - 1
                    ? 'Next Person'
                    : 'Final Prayer'}
                  {timeLeft === 0 && (
                    <span className='text-sm opacity-80 ml-1'>
                      ({autoAdvanceTimeLeft}s)
                    </span>
                  )}
                  <ChevronRight
                    className={`w-6 h-6 transition-transform ${timeLeft === 0 ? 'group-hover:translate-x-1' : ''}`}
                  />
                </span>
              </button>

              <p className='mt-6 text-[#4A7C7C]/60 text-xs font-bold uppercase tracking-widest'>
                Person {personIndex + 1} of {savedNames.length}
              </p>
            </div>
          </div>
        );

      case 'completion':
        return (
          <div className='max-w-md mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[70vh] text-center'>
            <div className='mb-8 p-6 bg-[#4A7C7C]/10 rounded-full'>
              <CheckCircle2 className='w-24 h-24 text-[#4A7C7C]' />
            </div>

            <h2 className='text-4xl font-black text-[#1A3A3A] mb-4'>Amen</h2>
            <p className='text-[#4A7C7C] text-lg mb-12 font-medium'>
              You have completed Day {currentDay} of your 40-day journey. May God
              bless your faithfulness and those you've prayed for today.
            </p>

            <button
              onClick={completeDay}
              className='w-full bg-[#1A3A3A] hover:bg-[#4A7C7C] text-white font-black py-6 rounded-2xl shadow-2xl transition-all text-xl flex items-center justify-center gap-3'
            >
              <Home className='w-6 h-6' />
              Return to Hub
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-[#E6F0EF] text-[#1A3A3A] selection:bg-[#4A7C7C]/30'>
      {renderView()}
    </div>
  );
}
