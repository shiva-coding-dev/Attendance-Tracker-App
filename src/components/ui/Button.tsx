import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';

const variants: Record<Variant, string> = {
  primary:
    'clay-btn',
  secondary:
    'clay-btn border border-slate-200/50 dark:border-zinc-800 dark:bg-transparent dark:text-zinc-300 dark:hover:bg-zinc-900',
  ghost:
    'text-slate-600 hover:bg-slate-500/10 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200',
  danger:
    'clay-btn-pink dark:bg-rose-600 dark:hover:bg-rose-500 dark:text-white dark:border-none dark:shadow-none dark:hover:shadow-md',
  success:
    'clay-btn-green dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:text-white dark:border-none dark:shadow-none dark:hover:shadow-md',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
}

export function Button({ className = '', variant = 'primary', icon, children, ...props }: ButtonProps) {
  return (
    <button
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
