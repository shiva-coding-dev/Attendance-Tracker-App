import { useState } from 'react';
import { Save } from 'lucide-react';
import { accentOptions, categoryOptions } from '../data/subjects';
import type { Subject, SubjectDraft } from '../types';
import { Button } from './ui/Button';

const emptyDraft: SubjectDraft = {
  name: '',
  category: 'Theory',
  schedule: '',
  attended: 0,
  missed: 0,
  target: 75,
  accent: accentOptions[0],
};

export function SubjectForm({
  subject,
  onSubmit,
  onCancel,
}: {
  subject?: Subject;
  onSubmit: (draft: SubjectDraft) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<SubjectDraft>(subject ?? emptyDraft);

  const update = <Key extends keyof SubjectDraft>(key: Key, value: SubjectDraft[Key]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          ...draft,
          name: draft.name.trim(),
          schedule: draft.schedule.trim() || 'Flexible',
          attended: Math.max(0, Math.round(draft.attended)),
          missed: Math.max(0, Math.round(draft.missed)),
          target: Math.min(95, Math.max(40, Math.round(draft.target))),
        });
      }}
    >
      <label className="block">
        <span className="text-sm font-bold text-slate-500 dark:text-zinc-400">Subject name</span>
        <input
          required
          value={draft.name}
          onChange={(event) => update('name', event.target.value)}
          className="clay-inset focus-ring mt-2.5 w-full px-4 py-3 bg-field text-slate-800 placeholder:text-slate-400 dark:text-zinc-100 dark:placeholder:text-zinc-600 transition-all border-none"
          placeholder="Operating Systems"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-slate-500 dark:text-zinc-400">Category</span>
          <select
            value={draft.category}
            onChange={(event) => update('category', event.target.value as SubjectDraft['category'])}
            className="clay-inset focus-ring mt-2.5 w-full px-4 py-3 bg-field text-slate-800 dark:text-zinc-100 transition-all border-none"
          >
            {categoryOptions.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-bold text-slate-500 dark:text-zinc-400">Schedule</span>
          <input
            value={draft.schedule}
            onChange={(event) => update('schedule', event.target.value)}
            className="clay-inset focus-ring mt-2.5 w-full px-4 py-3 bg-field text-slate-800 placeholder:text-slate-400 dark:text-zinc-100 dark:placeholder:text-zinc-600 transition-all border-none"
            placeholder="Mon, Wed, Fri"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {(['attended', 'missed', 'target'] as const).map((field) => (
          <label className="block" key={field}>
            <span className="text-sm font-bold capitalize text-slate-500 dark:text-zinc-400">{field}</span>
            <input
              min={field === 'target' ? 40 : 0}
              max={field === 'target' ? 95 : undefined}
              type="number"
              value={draft[field]}
              onChange={(event) => update(field, Number(event.target.value))}
              className="clay-inset focus-ring mt-2.5 w-full px-4 py-3 bg-field text-slate-800 dark:text-zinc-100 transition-all border-none"
            />
          </label>
        ))}
      </div>

      <fieldset>
        <legend className="text-sm font-bold text-slate-500 dark:text-zinc-400">Accent Color</legend>
        <div className="mt-2.5 flex flex-wrap gap-2.5">
          {accentOptions.map((accent) => (
            <button
              aria-label={`Use accent ${accent}`}
              className={`focus-ring h-8 w-8 rounded-full border-2 transition-all duration-200 hover:scale-105 active:scale-95 ${
                draft.accent === accent
                  ? 'border-slate-800 dark:border-white scale-110 ring-4 ring-slate-400/20 dark:ring-white/10'
                  : 'border-transparent'
              }`}
              key={accent}
              onClick={() => update('accent', accent)}
              style={{ background: accent }}
              type="button"
            />
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col-reverse gap-3 pt-3.5 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button icon={<Save size={17} />} type="submit" disabled={!draft.name.trim()}>
          Save subject
        </Button>
      </div>
    </form>
  );
}
