'use client';

import { create } from 'zustand';

export interface ApplicationDraft {
  grade: 9 | 10;
  applicant: Record<string, string>;
  academic: Record<string, string>;
  guardian: Record<string, string>;
  documents: Array<{ name: string; url: string }>;
}

interface WizardState {
  draft: ApplicationDraft;
  updateDraft: (section: 'applicant' | 'academic' | 'guardian', values: Record<string, string>) => void;
  setDocuments: (documents: ApplicationDraft['documents']) => void;
  setGrade: (grade: 9 | 10) => void;
  reset: () => void;
}

const createDraft = (grade: 9 | 10 = 9): ApplicationDraft => ({
  grade,
  applicant: {},
  academic: {},
  guardian: {},
  documents: [],
});

export const useWizardDraftStore = create<WizardState>((set) => ({
  draft: createDraft(),
  updateDraft: (section, values) =>
    set((state) => ({
      draft: { ...state.draft, [section]: { ...state.draft[section], ...values } },
    })),
  setDocuments: (documents) => set((state) => ({ draft: { ...state.draft, documents } })),
  setGrade: (grade) => set((state) => ({ draft: { ...state.draft, grade } })),
  reset: () => set({ draft: createDraft() }),
}));