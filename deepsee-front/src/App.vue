<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

import alertComponent from './components/alert/alert-component.vue';
import { getUser } from './services/auth/auth-service';
import { useAuthStore } from './stores/auth-store';

const authStore = useAuthStore();

const isLoading = ref(true);

onMounted(async () => {
    const token = localStorage.getItem('token');
    // Si utilisateur est connecté, on l'identifie
    if (token) {
        authStore.setToken(token);
        try {
            await getUser();
        }
        catch {
            // Si le token a expiré, on le supprime
            authStore.signOut();
        }
    }
    isLoading.value = false;
});

</script>

<template>
    <alert-component />
    <router-view v-if="!isLoading" />
</template>
