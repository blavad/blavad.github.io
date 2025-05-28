import { create } from 'zustand';

type LoadingState = {
    loading: boolean;
    initialLoading: boolean;
    loadingMessage: string;
    setLoading: (loading: boolean) => void;
    setInitialLoading: (initialLoading: boolean) => void;
    openLoading: () => Promise<void>;
};

export const useLoading = create<LoadingState>((set) => ({
    loading: true,
    initialLoading: true,
    loadingMessage: 'Loading...',
    setLoading: (loading: boolean) => set({ loading }),
    setInitialLoading: (initialLoading: boolean) => set({ initialLoading }),
    openLoading: async () => {
        set({ loading: true });
        await new Promise((resolve) => setTimeout(resolve, 400));
    },
}));
