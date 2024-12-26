<script lang="ts" setup>
import { useAuthStore } from 'src/store/auth-store';

const authStore = useAuthStore();
</script>

<template>
    <div class="mobile mobile-menu-container">
        <div class="mobile-menu row">
            <router-link
                :to="{ name: 'search' }"
                :class="{ 'active': $route.name === 'search' }"
                class="button width-100"
            >
                {{ $t("job") }}
            </router-link>

            <button class="button width-100">
                {{ $t("company") }}
            </button>

            <router-link
                v-if="authStore.token"
                :to="{ name: 'account' }"
                :class="{ 'active': $route.name === 'account' }"
                class="button width-100"
            >
                {{ $t("account") }}
            </router-link>

            <router-link
                v-else
                :to="{ name: 'sign-in' }"
                :class="{ 'active': $route.name === 'sign-in' }"
                class="button width-100"
            >
                {{ $t("signInBtn") }}
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mobile-menu-container {
    background: linear-gradient(0, var(--secondary) 0%, rgba(255, 255, 255, 0) 100%);
    bottom: 0;
    display: flex;
    width: 100%;
    left: 0;
    position: fixed;
    z-index: 9999;
}

.mobile-menu {
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 18px;
    padding: 6px;
    width: 100%;
}
</style>
