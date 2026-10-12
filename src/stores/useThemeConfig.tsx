import { create } from 'zustand';
import { recoverConfig, saveConfig } from '~/lib/localStorage';

type ThemeConfigState = {
    dark: boolean;
    showQR: boolean;
    toggleDark: () => void;
    toggleQR: () => void;
    isDarkMode: () => boolean;
};

// Mode obscure désactivé par défaut : seulement activé s'il a été enregistré (ex. `useThemeConfig.getState().toggleDark()`)
const recoverDark = () => {
    try {
        return recoverConfig('dark') === 'true';
    } catch {
        return false;
    }
};

// Assombrit tout le site via la classe `dark` de <html> (déjà posée au chargement par le script de index.html)
const applyDark = (dark: boolean) => document.documentElement.classList.toggle('dark', dark);

export const useThemeConfig = create<ThemeConfigState>((set, get) => ({
    dark: recoverDark(),
    showQR: false,
    toggleDark: () =>
        set((state) => {
            const dark = !state.dark;
            applyDark(dark);
            try {
                saveConfig('dark', dark);
            } catch {
                // Stockage indisponible (navigation privée) : le choix ne vaut que pour la session
            }
            return { dark };
        }),
    toggleQR: () => set((state) => ({ showQR: !state.showQR })),
    isDarkMode: () => get().dark,
}));
