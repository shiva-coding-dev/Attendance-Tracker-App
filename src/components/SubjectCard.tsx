import { Edit3, Plus, Trash2 } from 'lucide-react';
import { accentOptions } from '../data/subjects';
import type { Subject } from '../types';
import { attendancePercent, subjectStatus, totalClasses } from '../utils/attendance';
import { ProgressRing } from './ProgressRing';
import { Button } from './ui/Button';

export function SubjectCard({
  subject,
  onAttend,
  onMiss,
  onEdit,
  onDelete,
}: {
  subject: Subject;
  onAttend: () => void;
  onMiss: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const percent = attendancePercent(subject);
  const isHealthy = percent >= subject.target;
  const accent = accentOptions.includes(subject.accent as (typeof accentOptions)[number]) ? subject.accent : accentOptions[0];

  return (
    <article className="clay-card p-6 transition-all duration-300 hover:scale-[1.01] sm:p-7.5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: accent }} />
            <h3 className="truncate font-display text-lg font-bold text-slate-800 dark:text-zinc-100 tracking-tight">{subject.name}</h3>
            <span className="rounded-full border border-clay-blue/30 bg-clay-blue/15 px-2.5 py-0.5 text-[10px] font-bold text-clay-blue-text dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 tracking-wider">
              {subject.category}
            </span>
          </div>
          <p className="mt-1.5 text-xs font-semibold text-slate-400 dark:text-zinc-500 tracking-wide">{subject.schedule}</p>
        </div>
        <ProgressRing value={percent} target={subject.target} />
      </div>

      <div className="mt-6 grid gap-4 sm:gap-5 grid-cols-2">
        <div className="clay-inset p-4 text-center flex flex-col justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">Attended</p>
          <p className="mt-2 font-display text-3xl font-black text-slate-800 dark:text-zinc-100 leading-none tracking-tight">{subject.attended}</p>
          <Button className="mt-4 w-full min-h-9 py-1.5 px-3 text-xs" variant="success" icon={<Plus size={14} />} onClick={onAttend}>
            Add
          </Button>
        </div>
        <div className="clay-inset p-4 text-center flex flex-col justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">Missed</p>
          <p className="mt-2 font-display text-3xl font-black text-slate-800 dark:text-zinc-100 leading-none tracking-tight">{subject.missed}</p>
          <Button className="mt-4 w-full min-h-9 py-1.5 px-3 text-xs" variant="danger" icon={<Plus size={14} />} onClick={onMiss}>
            Add
          </Button>
        </div>
      </div>

      <div
        className={`mt-5 rounded-[1.25rem] px-4 py-2.5 text-center transition-all ${
          isHealthy
            ? 'bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/35 dark:text-emerald-400'
            : 'bg-rose-500/5 border border-rose-500/10 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/35 dark:text-rose-400'
        }`}
      >
        <p className="text-[12px] font-bold tracking-tight">{subjectStatus(subject)}</p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-clay-bg pt-4 text-xs dark:border-zinc-900">
        <p className="font-semibold text-slate-400 dark:text-zinc-500 tracking-wide">{totalClasses(subject)} total classes</p>
        <div className="flex gap-1.5">
          <button
            aria-label={`Edit ${subject.name}`}
            className="focus-ring rounded-full p-2 text-slate-400 transition hover:bg-slate-200/50 hover:text-slate-600 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
            onClick={onEdit}
          >
            <Edit3 size={15} />
          </button>
          <button
            aria-label={`Delete ${subject.name}`}
            className="focus-ring rounded-full p-2 text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-600 dark:text-zinc-500 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
            onClick={onDelete}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
