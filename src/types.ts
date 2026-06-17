export type Category = 'Theory' | 'Lab' | 'Tutorial';

export interface Subject {
  id: string;
  name: string;
  category: Category;
  schedule: string;
  attended: number;
  missed: number;
  target: number;
  accent: string;
}

export interface SubjectDraft {
  name: string;
  category: Category;
  schedule: string;
  attended: number;
  missed: number;
  target: number;
  accent: string;
}

export type Theme = 'light' | 'dark';
