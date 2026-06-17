import { clamp } from '../utils/attendance';

export function ProgressRing({
  value,
  target,
  size = 88,
  stroke = 9,
}: {
  value: number;
  target: number;
  size?: number;
  stroke?: number;
}) {
  const normalized = clamp(value, 0, 100);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalized / 100) * circumference;
  const isHealthy = normalized >= target;

  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg aria-hidden="true" width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className={`fill-none transition-all duration-700 ${
            isHealthy ? 'stroke-emerald-500/15 dark:stroke-zinc-800' : 'stroke-rose-500/15 dark:stroke-zinc-800'
          }`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`fill-none transition-all duration-700 ${
            isHealthy ? 'stroke-emerald-500 dark:stroke-emerald-400' : 'stroke-rose-500 dark:stroke-rose-400'
          }`}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-base font-display font-extrabold text-slate-800 dark:text-zinc-100">{normalized.toFixed(1)}%</p>
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">req {target}%</p>
      </div>
    </div>
  );
}
