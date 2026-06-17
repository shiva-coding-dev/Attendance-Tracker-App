import type { Subject } from '../types';

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const totalClasses = (subject: Pick<Subject, 'attended' | 'missed'>) => subject.attended + subject.missed;

export const attendancePercent = (subject: Pick<Subject, 'attended' | 'missed'>) => {
  const total = totalClasses(subject);
  return total === 0 ? 0 : (subject.attended / total) * 100;
};

export const classesToTarget = (subject: Subject) => {
  const total = totalClasses(subject);
  const targetRatio = subject.target / 100;
  const current = attendancePercent(subject);

  if (total === 0) return 0;
  if (current >= subject.target) return 0;

  return Math.ceil((targetRatio * total - subject.attended) / (1 - targetRatio));
};

export const skippableClasses = (subject: Subject) => {
  const total = totalClasses(subject);
  const targetRatio = subject.target / 100;

  if (total === 0 || attendancePercent(subject) < subject.target) return 0;

  return Math.max(0, Math.floor((subject.attended - targetRatio * total) / targetRatio));
};

export const subjectStatus = (subject: Subject) => {
  const needed = classesToTarget(subject);
  if (needed > 0) return `Attend ${needed} more ${needed === 1 ? 'class' : 'classes'} to reach ${subject.target}%`;

  const skippable = skippableClasses(subject);
  if (skippable === 0) return `Right on target at ${subject.target}%`;
  return `Can skip up to ${skippable} more ${skippable === 1 ? 'class' : 'classes'}`;
};

export const uid = () => {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};
