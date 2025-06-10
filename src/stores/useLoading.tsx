import { create } from 'zustand';
import { MENU_ANIMATION_DURATION } from '~/config/global';

type LoadingState = {
    loading: boolean;
    initialLoading: boolean;
    loadingColor: string;
    loadingMessage: string;
    setLoading: (loading: boolean) => void;
    setInitialLoading: (initialLoading: boolean) => void;
    openLoading: (color: string, msg: string) => Promise<void>;
};

export const useLoading = create<LoadingState>((set) => ({
    loading: true,
    initialLoading: true,
    loadingColor: 'green',
    loadingMessage: 'Loading...',
    setLoading: (loading: boolean) => set({ loading }),
    setInitialLoading: (initialLoading: boolean) => set({ initialLoading }),
    openLoading: async (color = 'blue', msg = 'Loading ...') => {
        set({ loading: true, initialLoading: false, loadingColor: color, loadingMessage: msg });
        await new Promise((resolve) => setTimeout(resolve, MENU_ANIMATION_DURATION));
    },
}));
