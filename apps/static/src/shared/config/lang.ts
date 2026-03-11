import { create } from 'zustand';

type Lang = 'EN' | 'DE' | 'GE';

interface LangState {
    lang: Lang;
    setLang: (lang: Lang) => void;
}

export const useLangStore = create<LangState>((set) => ({
    lang: 'EN',
    setLang: (lang) => set({ lang }),
}));