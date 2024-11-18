<script lang="ts" setup>

</script>

<template>
    <div class="laptop header-container row justify-between">
        <div class="header row align-center gap-8">
            <router-link
                class="button logo"
                aria-label="Go to home page"
                to="/"
            >
                <img
                    alt="deepsee-logo"
                    src="/logo.svg"
                >
            </router-link>

            <div class="separator" />

            <button class="button active">
                {{ $t("searchJob") }}
            </button>

            <div class="separator" />

            <button class="button">
                {{ $t("searchCompany") }}
            </button>
        </div>

        <div class="header row align-center gap-8">
            <button class="button">
                {{ $t("signUp") }}
            </button>

            <div class="separator" />

            <button class="button primary">
                {{ $t("signIn") }}
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header-container {
    background: linear-gradient(0, rgba(255, 255, 255, 0) 0%, var(--secondary) 100%);
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
}

.header {
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 18px;
    padding: 6px;
}

.header .separator {
    background-color: var(--light-grey);
    border-radius: 30px;
    height: 28px;
    width: 1px;
}

.button.logo {
    padding: 3px 12px 3px 3px;
}
</style>
