<script lang="ts" setup>
import contact from 'src/config/contact';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div class="page column gap-28">
        <h1>
            {{ t('termOfUsePage.title') }}
        </h1>

        <div>
            <h2 class="mb-18">
                {{ t("introduction") }}
            </h2>

            <div>
                {{ t('termOfUsePage.introduction') }}
            </div>
        </div>

        <div>
            <h2 class="mb-18">
                {{ t('termOfUsePage.siteAccessTitle') }}
            </h2>

            <div>
                {{ t('termOfUsePage.siteAccess') }}
            </div>
        </div>

        <div>
            <h2 class="mb-18">
                {{ t('termOfUsePage.intellectualPropertyTitle') }}
            </h2>

            <div>
                {{ t('termOfUsePage.intellectualProperty') }}
            </div>
        </div>

        <div>
            <h2 class="mb-18">
                {{ t('termOfUsePage.siteUseTitle') }}
            </h2>

            <div>
                {{ t('termOfUsePage.siteUse') }}
            </div>
        </div>

        <div>
            <h2 class="mb-18">
                {{ t('termOfUsePage.liabilityTitle') }}
            </h2>

            <div>
                {{ t('termOfUsePage.liability') }}
            </div>
        </div>

        <div>
            <h2 class="mb-18">
                {{ t('termOfUsePage.externalLinksTitle') }}
            </h2>

            <div>
                {{ t('termOfUsePage.externalLinks') }}
            </div>
        </div>

        <div>
            <h2 class="mb-18">
                {{ t('termOfUsePage.amendmentsTitle') }}
            </h2>

            <div>
                {{ t('termOfUsePage.amendments') }}
            </div>
        </div>

        <div>
            <h2 class="mb-18">
                {{ t('termOfUsePage.lawTitle') }}
            </h2>

            <div>
                {{ t('termOfUsePage.law') }}
            </div>
        </div>

        <div>
            <h2 class="mb-18">
                {{ t('contact') }}
            </h2>

            <div>
                {{ t('termOfUsePage.contact', { email: contact.email }) }}
            </div>
        </div>
    </div>
</template>
