'use client';

import { ReactNode, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { TRANSLATIONS, DEFAULT_LANGUAGE } from '~/config/translations/translations';

if (!i18n.isInitialized) {
    i18n.use(initReactI18next)
        .use(LanguageDetector)
        .init({
            resources: TRANSLATIONS,
            fallbackLng: DEFAULT_LANGUAGE,
            interpolation: {
                escapeValue: false,
            },
        });
}

export default function Providers({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Restore real URL from GitHub Pages 404 redirect
        const realPath = window.location.search.slice(1);
        if (realPath) window.history.replaceState({}, '', realPath);
    }, []);

    return <HelmetProvider>{children}</HelmetProvider>;
}
