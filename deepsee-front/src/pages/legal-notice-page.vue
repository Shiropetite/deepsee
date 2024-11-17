<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const getHostUrl = () => {
    return t('legalNoticePage.host', {
        link: `<a href="${ t('legalNoticePage.hostUrl') }">${ t('legalNoticePage.hostUrl') }</a>`,
    });
};
</script>

<template>
    <div class="page column gap-28">
        <h1>
            {{ $t('legalNotice') }}
        </h1>

        <div>
            <h2 class="mb-12">
                {{ $t("editor") }}
            </h2>

            <div class="column gap-2">
                <div>
                    {{ $t("legalNoticePage.owner") }}
                </div>
                <div>
                    {{ $t("legalNoticePage.contact", { email: $t('contactInfo.email') }) }}
                </div>
            </div>
        </div>

        <div>
            <h2 class="mb-12">
                {{ $t("host") }}
            </h2>

            <div class="column gap-2">
                <div
                    v-html="getHostUrl()"
                />
                <div>
                    {{ $t("legalNoticePage.hostInfo") }}
                </div>
                <div>
                    {{ $t("legalNoticePage.hostAdress") }}
                </div>
            </div>
        </div>
    </div>
</template>
