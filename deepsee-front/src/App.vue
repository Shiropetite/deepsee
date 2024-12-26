<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

import { getUser } from './services/auth/auth-service';
import { useAuthStore } from './store/auth-store';

const authStore = useAuthStore();

const isLoading = ref(true);

onMounted(async () => {
    const token = localStorage.getItem('token');
    if (token) {
        authStore.setToken(token);
        await getUser();
    }
    isLoading.value = false;
});

</script>

<template>
    <router-view v-if="!isLoading" />
</template>
