import { BarChart3, BookOpen, GraduationCap, Plus, Search, Target, TrendingUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Navbar } from './components/Navbar';
import { StatCard } from './components/StatCard';
import { SubjectCard } from './components/SubjectCard';
import { SubjectForm } from './components/SubjectForm';
import { Button } from './components/ui/Button';
import { Modal } from './components/ui/Modal';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import lightLogo from './assets/LightThemeLogo.png';
import darkLogo from './assets/DarkThemeLogo.png';
import { categoryOptions, initialSubjects } from './data/subjects';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Category, Subject, SubjectDraft } from './types';
import { attendancePercent, classesToTarget, skippableClasses, uid } from './utils/attendance';

type Filter = 'All' | Category;

function AttendanceApp() {
  const { theme } = useTheme();
  const [subjects, setSubjects] = useLocalStorage<Subject[]>('attendly-subjects', initialSubjects);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const [editing, setEditing] = useState<Subject | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingStage, setLoadingStage] = useState('Connecting workspace...');

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(removeTimer);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const stages = [
      { time: 0, text: 'Connecting workspace...' },
      { time: 500, text: 'Structuring subject cards...' },
      { time: 1000, text: 'Resolving theme configurations...' },
      { time: 1400, text: 'Workspace is ready' },
    ];
    const timers = stages.map((stage) =>
      setTimeout(() => {
        setLoadingStage(stage.text);
      }, stage.time)
    );
    return () => timers.forEach(clearTimeout);
  }, [loading]);

  const totals = useMemo(() => {
    const attended = subjects.reduce((sum, subject) => sum + subject.attended, 0);
    const missed = subjects.reduce((sum, subject) => sum + subject.missed, 0);
    const total = attended + missed;
    const average = total === 0 ? 0 : (attended / total) * 100;
    const recovering = subjects.filter((subject) => classesToTarget(subject) > 0).length;
    const skippable = subjects.reduce((sum, subject) => sum + skippableClasses(subject), 0);
    return { attended, missed, total, average, recovering, skippable };
  }, [subjects]);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesCategory = filter === 'All' || subject.category === filter;
      const matchesSearch = subject.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, query, subjects]);

  const updateSubject = (id: string, updater: (subject: Subject) => Subject) => {
    setSubjects((current) => current.map((subject) => (subject.id === id ? updater(subject) : subject)));
  };

  const saveSubject = (draft: SubjectDraft) => {
    if (editing) {
      setSubjects((current) => current.map((subject) => (subject.id === editing.id ? { ...subject, ...draft } : subject)));
    } else {
      setSubjects((current) => [{ ...draft, id: uid() }, ...current]);
    }
    setEditing(null);
    setFormOpen(false);
  };

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleSearchClick = () => {
    const input = document.getElementById('subjects-search-input');
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        input.focus();
      }, 350);
    }
  };

  const isOverallHealthy = totals.average >= 75;

  if (loading) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-clay-bg dark:bg-carbon-bg transition-all duration-500 ease-out ${fadeOut ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'}`}>
        {/* Light Mode Wavy Background Shapes & Blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden block dark:hidden select-none">
          <svg viewBox="0 0 1440 600" fill="none" className="absolute top-0 left-0 w-full h-[600px] opacity-65">
            <path d="M0,120 C400,240 700,0 1100,160 C1250,220 1350,280 1440,240 L1440,0 L0,0 Z" fill="#ebdfc9" />
          </svg>
          <div className="absolute top-[20%] left-[15%] w-[350px] h-[350px] rounded-full bg-[#ebdcb8]/40 blur-[100px]" />
          <div className="absolute bottom-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-clay-blue/25 blur-[90px]" />
        </div>

        {/* Dark Mode Grid & Glowing Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden dark:block grid-overlay select-none" />
        <div className="absolute top-[20%] left-[15%] h-[350px] w-[350px] bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none hidden dark:block" />
        <div className="absolute bottom-[20%] right-[15%] h-[350px] w-[350px] bg-indigo-950/10 rounded-full blur-[120px] pointer-events-none hidden dark:block" />

        <div className="relative z-10 text-center flex flex-col items-center max-w-sm px-6">
          {/* Animated Logo Formation Wrapper */}
          <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-[2.25rem] bg-surface-strong dark:bg-zinc-900 border border-white/50 dark:border-zinc-800/60 shadow-lg dark:shadow-2xl overflow-hidden animate-logo-formation">
            <img
              src={theme === 'dark' ? darkLogo : lightLogo}
              alt="Attendly Logo"
              className="h-12 w-12 object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
          </div>
          
          <h1 className="font-display text-4xl font-black text-slate-800 dark:text-zinc-100 tracking-tight">
            Attendly
          </h1>
          
          {/* Dynamically switching status messages */}
          <p className="mt-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 min-h-[16px]">
            {loadingStage}
          </p>

          <div className="mt-8 w-44 clay-inset h-1.5 overflow-hidden rounded-full dark:bg-zinc-900/60 dark:border dark:border-zinc-800/80 dark:shadow-none">
            <div className="h-full bg-emerald-500 rounded-full animate-loading-bar" />
          </div>

          {/* Additional detail element: Version & Tech Tag */}
          <div className="mt-16 text-[9px] font-bold text-slate-400 dark:text-zinc-650 uppercase tracking-widest flex items-center gap-1.5">
            <span>Secure Local Cache</span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-zinc-800" />
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-clay-bg text-slate-800 transition-colors duration-300 dark:bg-carbon-bg dark:text-zinc-100 pb-16">
      {/* Light Mode Wavy Background Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden block dark:hidden select-none">
        <svg viewBox="0 0 1440 600" fill="none" className="absolute top-0 left-0 w-full h-[600px] opacity-65">
          <path d="M0,120 C400,240 700,0 1100,160 C1250,220 1350,280 1440,240 L1440,0 L0,0 Z" fill="#ebdfc9" />
        </svg>
        <div className="absolute right-[-10%] bottom-[-5%] w-[45vw] h-[45vw] max-w-[600px] rounded-full bg-[#ebdcb8]/45 blur-3xl opacity-75" />
        <div className="absolute left-[-5%] bottom-[20%] w-[35vw] h-[35vw] max-w-[450px] rounded-full bg-[#ebdcb8]/30 blur-3xl opacity-60" />
      </div>

      {/* Dark Mode Grid & Glowing Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden dark:block grid-overlay select-none" />
      <div className="absolute top-[-10%] left-[-10%] h-[40vw] w-[40vw] max-w-[450px] bg-zinc-800/15 rounded-full blur-[120px] pointer-events-none hidden dark:block" />
      <div className="absolute bottom-[10%] right-[-10%] h-[45vw] w-[45vw] max-w-[500px] bg-zinc-900/20 rounded-full blur-[140px] pointer-events-none hidden dark:block" />

      {/* Glowing Star Decals in Dark Mode Header */}
      <div className="absolute top-36 right-[12%] w-24 h-24 text-zinc-850/60 opacity-60 z-0 pointer-events-none hidden dark:block animate-pulse">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12,0 L15,9 L24,12 L15,15 L12,24 L9,15 L0,12 L9,9 Z" />
        </svg>
      </div>
      <div className="absolute top-72 left-[8%] w-12 h-12 text-zinc-900/50 opacity-40 z-0 pointer-events-none hidden dark:block">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12,0 L15,9 L24,12 L15,15 L12,24 L9,15 L0,12 L9,9 Z" />
        </svg>
      </div>

      <Navbar onAddSubject={openCreate} onSearchClick={handleSearchClick} />

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <section className="grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end" id="overview">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-slate-200/55 dark:bg-zinc-900/50 border border-slate-300/40 dark:border-zinc-800/60 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400">
              Attendance workspace
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-800 dark:text-zinc-100 sm:text-5xl lg:text-6xl">
              Clear attendance tracking for every subject.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-slate-400 dark:text-zinc-500 sm:text-lg">
              Monitor every subject, adjust attendance in one tap, and see exactly what you can skip or need to recover.
            </p>
          </div>

          <div className="clay-card p-6 sm:p-7.5 border-none transition-all duration-300 hover:scale-[1.01]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black tracking-widest text-slate-400 dark:text-zinc-500 uppercase">Overall attendance</p>
                <p className="mt-1.5 font-display text-5xl font-black text-slate-850 dark:text-zinc-100 leading-none">{totals.average.toFixed(1)}%</p>
                <p className="mt-2.5 text-xs font-semibold text-slate-400 dark:text-zinc-500">{totals.total} total classes recorded</p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-clay-blue/20 text-clay-blue-text dark:bg-zinc-900 dark:text-zinc-400 border border-clay-blue/30 dark:border-zinc-800/80 shadow-inner">
                <TrendingUp size={28} />
              </div>
            </div>
            <div className="mt-6 clay-inset h-3 overflow-hidden rounded-full dark:bg-zinc-900 dark:border dark:border-zinc-800/80 dark:shadow-none">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isOverallHealthy ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(totals.average, 100)}%` }}
              />
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 sm:gap-7.5 grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<BookOpen size={20} />} label="Subjects" value={String(subjects.length)} detail="tracked locally" />
          <StatCard icon={<GraduationCap size={20} />} label="Classes" value={String(totals.total)} detail={`${totals.attended} attended, ${totals.missed} missed`} />
          <StatCard icon={<Target size={20} />} label="Recovery" value={String(totals.recovering)} detail="subjects below target" />
          <StatCard icon={<BarChart3 size={20} />} label="Buffer" value={String(totals.skippable)} detail="classes currently skippable" />
        </section>

        <section className="mt-20" id="subjects">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-display text-4xl font-extrabold text-slate-800 dark:text-zinc-100">Subjects</h2>
              <p className="mt-1 text-xs font-bold text-slate-400 dark:text-zinc-500">{filteredSubjects.length} of {subjects.length} subjects shown</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="clay-inset flex min-h-11 items-center gap-2.5 px-4 border-none focus-within:ring-2 focus-within:ring-clay-blue/60 dark:focus-within:ring-zinc-800 transition-all">
                <Search size={18} className="text-slate-400 dark:text-zinc-500" />
                <input
                  id="subjects-search-input"
                  aria-label="Search subjects"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 dark:text-zinc-100 dark:placeholder:text-zinc-650"
                  placeholder="Search subjects"
                />
              </label>
              <Button icon={<Plus size={17} />} onClick={openCreate}>
                Add Subject
              </Button>
            </div>
          </div>

          <div className="mb-6 flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
            {(['All', ...categoryOptions] as Filter[]).map((category) => (
              <button
                className={`focus-ring rounded-full px-5 py-2 text-xs font-bold transition-all duration-200 ${
                  filter === category
                    ? 'bg-clay-blue text-clay-blue-text shadow-inner dark:bg-white dark:text-black dark:shadow-md'
                    : 'clay-btn text-slate-500 hover:bg-slate-200/50 dark:border-zinc-850 dark:bg-transparent dark:text-zinc-400 dark:hover:bg-zinc-900/60'
                }`}
                key={category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredSubjects.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-2" aria-live="polite">
              {filteredSubjects.map((subject, index) => (
                <div className="animate-floatIn" key={subject.id} style={{ animationDelay: `${index * 45}ms` }}>
                  <SubjectCard
                    subject={subject}
                    onAttend={() => updateSubject(subject.id, (current) => ({ ...current, attended: current.attended + 1 }))}
                    onMiss={() => updateSubject(subject.id, (current) => ({ ...current, missed: current.missed + 1 }))}
                    onEdit={() => {
                      setEditing(subject);
                      setFormOpen(true);
                    }}
                    onDelete={() => setSubjects((current) => current.filter((item) => item.id !== subject.id))}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="clay-card grid min-h-80 place-items-center p-8 text-center border-none shadow-md">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-clay-blue/35 text-clay-blue-text dark:bg-white dark:text-black dark:border-none shadow-inner">
                  <BookOpen size={28} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-slate-800 dark:text-zinc-100">No subjects found</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm font-semibold leading-relaxed text-slate-400 dark:text-zinc-500">
                  Add a subject or adjust your filters to bring your attendance view back.
                </p>
                <Button className="mt-6" icon={<Plus size={17} />} onClick={openCreate}>
                  Add Subject
                </Button>
              </div>
            </div>
          )}
        </section>

        <section className="mt-20" id="analytics">
          <div className="clay-card p-5 sm:p-6 border-none transition-all duration-300 hover:scale-[1.01]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-800 dark:text-zinc-100">Analytics</h2>
                <p className="text-sm font-semibold text-slate-400 dark:text-zinc-500">Attendance distribution by subject</p>
              </div>
              <BarChart3 className="text-clay-blue-text dark:text-zinc-400" />
            </div>
            <div className="space-y-5.5">
              {subjects.map((subject) => {
                const percent = attendancePercent(subject);
                const isSubjectHealthy = percent >= subject.target;
                return (
                  <div key={subject.id}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <span className="truncate font-bold text-slate-800 dark:text-zinc-200">{subject.name}</span>
                      <span className={`font-display font-extrabold ${isSubjectHealthy ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {percent.toFixed(1)}% <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium font-sans">/ target {subject.target}%</span>
                      </span>
                    </div>
                    <div className="clay-inset h-2.5 overflow-hidden rounded-full dark:bg-zinc-900 dark:border dark:border-zinc-800/80 dark:shadow-none">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isSubjectHealthy ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mt-auto py-8 text-center text-xs font-semibold text-slate-400 dark:text-zinc-500">
        <p>
          Developed by{' '}
          <a
            href="https://www.linkedin.com/in/shiva-gupta-iit-patna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-800 dark:text-zinc-300 dark:hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-slate-300 dark:decoration-zinc-800"
          >
            Shiva Gupta
          </a>
          {' '}|{' '}
          <a
            href="mailto:shivaiitpatna@gmail.com"
            className="text-slate-600 hover:text-slate-800 dark:text-zinc-300 dark:hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-slate-300 dark:decoration-zinc-800"
          >
            shivaiitpatna@gmail.com
          </a>
        </p>
      </footer>

      {formOpen && (
        <Modal title={editing ? 'Edit subject' : 'Add subject'} onClose={() => setFormOpen(false)}>
          <SubjectForm subject={editing ?? undefined} onSubmit={saveSubject} onCancel={() => setFormOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AttendanceApp />
    </ThemeProvider>
  );
}
