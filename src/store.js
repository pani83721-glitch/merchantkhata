import { create } from 'zustand';

export const useStore = create((set) => ({
    theme: 'light',
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    setTheme: (theme) => set({ theme }),

    user: null,
    token: localStorage.getItem('merchantiq_token') || null,
    setUser: (user, token) => {
        if (token) localStorage.setItem('merchantiq_token', token);
        else localStorage.removeItem('merchantiq_token');
        set({ user, token, isAuthenticated: !!user });
    },
    logout: () => {
        localStorage.removeItem('merchantiq_token');
        set({ user: null, token: null, isAuthenticated: false });
    },
    isAuthenticated: !!localStorage.getItem('merchantiq_token'),

    isDrawerOpen: false,
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));
