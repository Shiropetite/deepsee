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
    if (token) {
        authStore.setToken(token);
        await getUser();
    }
    isLoading.value = false;
});

</script>

<template>
    <alert-component />
    <router-view v-if="!isLoading" />
</template>
