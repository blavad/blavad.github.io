import { create } from 'zustand';

type MenuState = {
    isOpen: boolean;
    isMenuOpen: boolean;
    close: () => void;
    closeMenu: () => void;
    open: () => void;
    openMenu: () => void;
};

export const useMenu = create<MenuState>((set) => ({
    isOpen: false,
    isMenuOpen: false,
    close: () => set({ isOpen: false }),
    closeMenu: () => set({ isOpen: false, isMenuOpen: false }),
    open: () => set({ isOpen: true }),
    openMenu: () => set({ isOpen: true, isMenuOpen: true }),
}));
