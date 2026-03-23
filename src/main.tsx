import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { TRANSLATIONS, DEFAULT_LANGUAGE } from './config/translations/translations';

import App from './App';
import './font.css';
import './index.css';

// Lire la vraie URL depuis le "?" après la redirection
const realPath = window.location.search.slice(1);
if (realPath) window.history.replaceState({}, '', realPath);

i18n.use(XHR)
    .use(initReactI18next)
    .use(LanguageDetector) // passes i18n down to react-i18next
    .init({
        resources: TRANSLATIONS,
        fallbackLng: DEFAULT_LANGUAGE,
        interpolation: {
            escapeValue: false,
        },
    });

ReactDOM.createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
        <App />
    </HelmetProvider>
);
