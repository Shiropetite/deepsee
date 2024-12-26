<script lang="ts" setup>
import seaShapeComponent from 'src/components/sea-shape-component.vue';

import footerComponent from './footer-component.vue';
import headerComponent from './header-component.vue';
import mobileMenu from './mobile-menu-component.vue';
</script>

<template>
    <header-component />

    <div class="sea">
        <sea-shape-component />
    </div>

    <div class="row">
        <img
            class="image"
            src="/sea-background.png"
        >

        <div class="card-container width-100 row justify-center align-center">
            <div class="content column gap-28">
                <router-view />
            </div>
        </div>
    </div>

    <mobile-menu />

    <footer-component />
</template>

<style lang="scss" scoped>
.image {
    width: 30%;
    height: 100vh;
    object-fit: cover;
}

.content {
    width: 100%;
    max-width: 580px;
}

.sea {
    display: none;
}

@media (max-width: 900px) {
    .image {
        display: none;
    }

    .card-container {
        height: 100vh;
    }

    .content {
        padding: 28px;
    }

    .sea {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
}
</style>
