<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const { t } = useI18n();
const router = useRouter();

const signOut = () => {
    authStore.signOut();
    router.replace({ name: 'sign-in' });
};
</script>

<template>
    <div class="page">
        <h1 class="mb-28">{{ t("myAccount") }}</h1>

        <button
            class="button primary"
            @click="signOut"
        >
            {{ t('signOut') }}
        </button>
    </div>
</template>
