<script lang="ts" setup>
import { useAuthStore } from 'src/store/auth-store';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const signOut = () => {
    authStore.signOut();
    router.replace({ name: 'sign-in' });
};
</script>

<template>
    <div class="page">
        <h1 class="mb-28">{{ $t("myAccount") }}</h1>

        <button
            class="button primary"
            @click="signOut"
        >
            {{ $t('signOut') }}
        </button>
    </div>
</template>
