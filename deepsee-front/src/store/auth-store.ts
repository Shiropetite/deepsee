import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    actions: {
        getUser() {
            return this.user;
        },
        isSignIn() {
            return this.token;
        },
        setToken(token: string | null) {
            this.token = token;
            localStorage.setItem('token', this.token);
        },
        setUser(user: any | null) {
            this.user = user;
        },
        signOut() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
        },
    },
    state: () => ({
        token: null,
        user: null,
    }),
});
