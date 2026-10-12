import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../button';
import { useThemeConfig } from '~/stores/useThemeConfig';

/** Active ou désactive le mode obscure (ciel découpé en matin, soir et nuit) */
export default function DarkModeButton({ className }: { className?: string }) {
    const { dark, toggleDark } = useThemeConfig();
    const { t } = useTranslation();

    return (
        <Button
            className={className}
            variant="outline"
            size="icon"
            onClick={toggleDark}
            aria-pressed={dark}
            aria-label={t('nav.darkMode')}
            title={t('nav.darkMode')}
        >
            {dark ? <Sun strokeWidth={2.5} /> : <Moon strokeWidth={2.5} />}
        </Button>
    );
}
