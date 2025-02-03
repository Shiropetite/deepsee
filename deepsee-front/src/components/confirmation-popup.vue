<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
<div class="popup-content row justify-center align-center">
   <div class="column gap-18 width-100">
        <div>{{ t('signInRequiredDescription') }}</div>
        <div class="row justify-between gap-18">
            <router-link
                class="button primary border width-100"
                :to="{ name: 'sign-up', query: { redirect: $route.fullPath } }"
            >{{ t('signUp') }}</router-link>
            <router-link
                class="button primary width-100"
                :to="{ name: 'sign-in', query: { redirect: $route.fullPath } }"
            >{{ t('signIn') }}</router-link>
        </div>
   </div>
</div>
</template>

<style lang="scss" scoped>
.popup-content {
    padding: 18px;
}
</style>
