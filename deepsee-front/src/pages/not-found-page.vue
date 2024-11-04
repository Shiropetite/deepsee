<script lang="ts" setup>
import seaShapeComponent from 'src/components/sea-shape-component.vue';
import footerComponent from 'src/layouts/footer-component.vue';
import mobileMenu from 'src/layouts/mobile-menu-component.vue';
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
                Oups !
            </h1>
            <div>
                Cette page n'existe pas !
            </div>
        </div>

        <router-link to="/">
            <button class="primary">
                Revenir à l'accueil
            </button>
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
