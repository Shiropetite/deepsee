import api from '../../config/axios';

import { useAuthStore } from './../../store/auth-store';

export const getUser = async (): Promise<void> => {
    const response = await api.get('/auth/identify');

    const authStore = useAuthStore();
    authStore.setUser(response.data.user);

    return response.data;
};

export const postSignIn = async (body: any): Promise<void> => {
    const response = await api.post('/auth/sign-in', body);

    const authStore = useAuthStore();
    authStore.setToken(response.data.token);
    authStore.setUser(response.data.user);

    return response.data;
};

export const postSignUp = async (body: any): Promise<void> => {
    const response = await api.post('/auth/sign-up', body);

    const authStore = useAuthStore();
    authStore.setToken(response.data.token);
    authStore.setUser(response.data.user);

    return response.data;
};
