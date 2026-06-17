import { BarChart3, BookOpen, LayoutDashboard, Menu, Moon, Plus, Search, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/Button';
import lightLogo from '../assets/LightThemeLogo.png';
import darkLogo from '../assets/DarkThemeLogo.png';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Subjects', icon: BookOpen },
  { label: 'Analytics', icon: BarChart3 },
] as const;

export function Navbar({ onAddSubject, onSearchClick }: { onAddSubject: () => void; onSearchClick: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const Links = () => (
    <>
      {navItems.map(({ label, icon: Icon }, index) => (
        <a
          className={`focus-ring flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
            index === 1
              ? 'bg-clay-blue text-clay-blue-text shadow-inner dark:bg-white dark:text-black dark:shadow-md'
              : 'text-slate-500 hover:bg-slate-200/40 dark:text-zinc-400 dark:hover:bg-zinc-900/60'
          }`}
          href={`#${label.toLowerCase()}`}
          key={label}
          onClick={() => setOpen(false)}
        >
          <Icon size={16} />
          {label}
        </a>
      ))}
    </>
  );

  return (
    <>
      <header className="sticky top-4 z-40 mx-auto w-[calc(100%-2rem)] max-w-7xl">
        <nav className="clay-card flex items-center justify-between gap-3 px-3.5 py-2.5 shadow-md border-none">
          <a className="focus-ring flex items-center gap-3 rounded-full pl-1 pr-3" href="#">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-clay-blue/30 border border-clay-blue/30 dark:bg-white/10 dark:border-zinc-800/85 shadow-inner overflow-hidden">
              <img
                src={theme === 'dark' ? darkLogo : lightLogo}
                alt="Attendly Logo"
                className="h-8 w-8 object-contain"
              />
            </span>
            <span>
              <span className="block font-display text-2xl font-black tracking-tight text-slate-800 dark:text-zinc-100 leading-none">Attendly</span>
              <span className="hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 sm:block mt-1">Track classes</span>
            </span>
          </a>

          <div className="hidden items-center gap-3 md:flex">
            <Links />
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="focus-ring flex rounded-full p-2.5 text-slate-500 transition hover:bg-slate-200/40 dark:text-zinc-400 dark:hover:bg-zinc-900/60"
              onClick={onSearchClick}
            >
              <Search size={18} />
            </button>
            <button
              aria-label="Toggle theme"
              className="focus-ring rounded-full p-2.5 text-slate-500 transition hover:bg-slate-200/40 dark:text-zinc-400 dark:hover:bg-zinc-900/60"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button className="hidden sm:inline-flex" icon={<Plus size={17} />} onClick={onAddSubject}>
              Add Subject
            </Button>
            <button
              aria-label="Open menu"
              className="focus-ring rounded-full p-2.5 text-slate-500 transition hover:bg-slate-200/40 dark:text-zinc-400 md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      <div className={`fixed inset-0 z-50 bg-black/55 backdrop-blur-md transition-opacity duration-300 md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <aside className={`clay-card ml-auto h-full w-80 max-w-[86vw] p-6 transition-transform duration-300 flex flex-col justify-between border-none rounded-none rounded-l-[2rem] ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div>
            <div className="mb-8 flex items-center justify-between">
              <p className="font-display text-2xl font-extrabold text-slate-800 dark:text-zinc-100">Attendly</p>
              <button aria-label="Close menu" className="focus-ring rounded-full p-2 text-slate-500 hover:bg-slate-200/40 dark:text-zinc-400" onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="grid gap-3">
              <Links />
            </div>
          </div>
          <div>
            <Button className="w-full" icon={<Plus size={17} />} onClick={() => { onAddSubject(); setOpen(false); }}>
              Add Subject
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
}
