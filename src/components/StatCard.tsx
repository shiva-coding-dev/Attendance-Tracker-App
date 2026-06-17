import type { ReactNode } from 'react';

export function StatCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="clay-card p-6 transition-all duration-350 hover:scale-[1.01]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-clay-blue/20 text-clay-blue-text dark:bg-zinc-900 dark:text-zinc-400 border border-clay-blue/35 dark:border-zinc-800 shadow-inner">
        {icon}
      </div>
      <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500">{label}</p>
      <p className="mt-2.5 font-display text-3xl font-black text-slate-800 dark:text-zinc-100 leading-none tracking-tight">{value}</p>
      <p className="mt-3.5 text-xs font-semibold text-slate-400 dark:text-zinc-500 leading-none">{detail}</p>
    </div>
  );
}
