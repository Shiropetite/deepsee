<script lang="ts" setup>
import seaShapeComponent from 'src/components/sea-shape-component.vue';
import footerComponent from 'src/layouts/footer-component.vue';
import mobileMenu from 'src/layouts/mobile-menu-component.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <div class="sea mb-28">
        <sea-shape-component
            fill-image="/sea-background.png"
            mobile-height="460px"
        />
    </div>

    <div class="content column align-center gap-28">
        <div class="text-center">
            <h1 class="mb-12">
                {{ t('oops') }}
            </h1>
            <div>
                {{ t('pageNotFound') }}
            </div>
        </div>

        <router-link
            class="button primary"
            to="/"
        >
            {{ t('backHome') }}
        </router-link>
    </div>

    <mobile-menu />

    <footer-component />
</template>

<style lang="scss" scoped>
@media (max-width: 900px) {
    .sea {
        height: calc(100vh - 320px) !important;
    }
}

.sea {
    height: calc(100vh - 108px);
}

.content {
    position: absolute;
    top: 180px;
    left: 50%;
    color: white;
    transform: translateX(-50%);
}
</style>
