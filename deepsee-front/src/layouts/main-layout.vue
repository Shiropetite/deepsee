<script lang="ts" setup>
import footerComponent from './footer-component.vue';
import headerComponent from './header-component.vue';
import mobileMenu from './mobile-menu-component.vue';
</script>

<template>
    <header-component />

    <router-view />

    <mobile-menu />

    <footer-component />
</template>
