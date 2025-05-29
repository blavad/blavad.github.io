import { create } from 'zustand';
import { MENU_ANIMATION_DURATION } from '~/config/global';

type MenuState = {
    isOpen: boolean;
    variant: 'default' | 'hero';
    close: () => Promise<void>;
    open: (variant?: 'default' | 'hero') => Promise<void>;
};

export const useMenu = create<MenuState>((set) => ({
    isOpen: false,
    variant: 'default',
    close: async () => {
        set({ isOpen: false, variant: 'default' });
        await new Promise((resolve) => setTimeout(resolve, MENU_ANIMATION_DURATION));
    },
    open: async (variant: 'default' | 'hero' = 'default') => {
        if (variant == 'hero') {
            set({ isOpen: true, variant });
        } else {
            set({ isOpen: true });
            await new Promise((resolve) => setTimeout(resolve, MENU_ANIMATION_DURATION));
        }
    },
}));
