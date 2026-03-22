import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import zh from './zh.json';
// import de from './de.json';

export const TRANSLATIONS = {
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    },
    es: {
        translation: es,
    },
    zh: {
        translation: zh,
    },
    // de: {
    //     translation: de,
    // },
};

export const LANGUAGES = Object.keys(TRANSLATIONS);

export const DEFAULT_LANGUAGE = 'fr';
