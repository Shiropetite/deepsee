<script lang="ts" setup>
import contact from 'src/config/contact';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div class="page">
        <h1 class="mb-28">
            {{ t('contact') }}
        </h1>

        <div class="column gap-18">
            <div>
                {{ t('contactPage.introduction') }}
            </div>

            <div>
                {{ t('contactPage.email', { email: contact.email }) }}
            </div>

            <div>
                {{ t('contactPage.confidentiality') }}
            </div>
        </div>
    </div>
</template>
