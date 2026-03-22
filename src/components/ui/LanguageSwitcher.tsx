import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '~/config/translations';

function LanguageSwitcher({ className = '' }: { className?: string }) {
    const { i18n } = useTranslation();

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {LANGUAGES.map((lang, index) => (
                <span key={lang} className="flex items-center gap-2">
                    <button
                        onClick={() => i18n.changeLanguage(lang)}
                        className={`font-34 cursor-pointer transition-opacity ${
                            i18n.language === lang ? 'opacity-100' : 'opacity-30 hover:opacity-60'
                        }`}
                    >
                        {lang}
                    </button>
                    {index < LANGUAGES.length - 1 && <span className="opacity-30">|</span>}
                </span>
            ))}
        </div>
    );
}

export default LanguageSwitcher;
