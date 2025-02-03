<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useI18n } from 'vue-i18n';

const authStore = useAuthStore();
const { t } = useI18n();
</script>

<template>
    <div class="laptop header-container row justify-between">
        <div class="header row align-center gap-8">
            <router-link
                class="button logo"
                aria-label="Go to home page"
                to="/"
            >
                <img
                    alt="deepsee-logo"
                    src="/logo.svg"
                >
            </router-link>

            <div class="separator" />

            <button class="button active">
                {{ t("searchJob") }}
            </button>

            <div class="separator" />

            <button class="button">
                {{ t("searchCompany") }}
            </button>
        </div>

        <div
            v-if="authStore.token"
            class="header row align-center gap-8"
        >
            <router-link
                :to="{ name: 'job-board' }"
                class="button"
            >
                {{ t('applications') }}
            </router-link>

            <router-link
                :to="{ name: 'account' }"
                class="button primary border row align-center gap-8"
            >
                <div class="avatar" />
                <div>{{ authStore.user.firstName }}</div>
            </router-link>
        </div>

        <div
            v-else
            class="header row align-center gap-8"
        >
            <router-link
                class="button"
                :to="{ name: 'sign-up' }"
            >
                {{ t("signUp") }}
            </router-link>

            <div class="separator" />

            <router-link
                class="button primary"
                :to="{ name: 'sign-in' }"
            >
                {{ t("signIn") }}
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header-container {
    background: linear-gradient(0, rgba(255, 255, 255, 0) 0%, var(--secondary) 100%);
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
}

.header {
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 18px;
    padding: 6px;
}

.header .separator {
    background-color: var(--light-grey);
    border-radius: 30px;
    height: 28px;
    width: 1px;
}

.button.logo {
    padding: 3px 12px 3px 3px;
}

.button:has(.avatar) {
    padding: 6px 12px 6px 6px;
}

.button .avatar {
    border-radius: 100%;
    height: 28px;
    width: 28px;
    border: solid 1px var(--primary);
    background-color: var(--primary);
    object-fit: cover;
}
</style>
