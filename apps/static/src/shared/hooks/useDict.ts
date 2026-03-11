import {useLangStore} from "@/shared/config/lang";
import en from '@/locales/en.json';
import de from '@/locales/de.json';
import ge from '@/locales/ge.json';
import {Dictionary} from "@/shared/lib/@types";

const dictionaries: Record<'EN' | 'DE' | 'GE', Dictionary> = {
    EN: en,
    DE: de,
    GE: ge
};

export const useDict = (): Dictionary => {
    const lang = useLangStore((state) => state.lang);
    return dictionaries[lang] || dictionaries.EN;
};