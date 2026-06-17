import { X } from 'lucide-react';
import type { ReactNode } from 'react';

export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/55 p-3 backdrop-blur-md sm:place-items-center sm:p-6">
      <div className="clay-card w-full max-w-xl animate-floatIn p-6 sm:p-8 shadow-2xl bg-[#fdfcf9] dark:bg-zinc-950 border border-white/60 dark:border-zinc-800">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-graphite-100">{title}</h2>
          <button
            aria-label="Close"
            className="focus-ring rounded-full p-2 text-ink-500 transition hover:bg-brand-500/6 dark:text-graphite-400 dark:hover:bg-white/8"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
