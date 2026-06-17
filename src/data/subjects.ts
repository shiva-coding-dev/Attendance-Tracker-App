import type { Subject } from '../types';

export const categoryOptions = ['Theory', 'Lab', 'Tutorial'] as const;

export const accentOptions = [
  '#790000',
  '#CF9683',
  '#4A4A4A',
  '#8B5E52',
  '#B27761',
  '#6F4C45',
] as const;

export const initialSubjects: Subject[] = [
  {
    id: 'chem-lab',
    name: 'Chemistry Lab',
    category: 'Lab',
    schedule: 'Mon, Thu',
    attended: 14,
    missed: 9,
    target: 80,
    accent: '#8b7cf6',
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    category: 'Theory',
    schedule: 'Mon, Tue, Wed',
    attended: 30,
    missed: 2,
    target: 75,
    accent: '#6f9562',
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    category: 'Theory',
    schedule: 'Mon, Wed, Thu',
    attended: 26,
    missed: 4,
    target: 75,
    accent: '#34c3ff',
  },
  {
    id: 'design-tutorial',
    name: 'Design Tutorial',
    category: 'Tutorial',
    schedule: 'Fri',
    attended: 18,
    missed: 6,
    target: 70,
    accent: '#ff9f43',
  },
];
