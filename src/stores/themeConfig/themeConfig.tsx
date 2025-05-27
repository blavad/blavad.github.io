import { create } from 'zustand';

type ThemeConfigState = {
    dark: boolean;
    showQR: boolean;
    toggleDark: () => void;
    toggleQR: () => void;
    isDarkMode: () => boolean;
};

export const useThemeConfig = create<ThemeConfigState>((set, get) => ({
    dark: false,
    showQR: false,
    toggleDark: () => set((state) => ({ dark: !state.dark })),
    toggleQR: () => set((state) => ({ showQR: !state.showQR })),
    isDarkMode: () => get().dark,
}));
