<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div class="page">
        <h1 class="mb-28">
            {{ t('privacyPolicy') }}
        </h1>

        <div>
            {{ t('privacyPolicyPage.content') }}
        </div>
    </div>
</template>
