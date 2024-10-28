<template>
    <div class="header-container row justify-between">
        <div class="header row align-center gap-8">
            <router-link to="/">
                <button class="logo">
                    <img src="/logo.svg">
                </button>
            </router-link>

            <div class="separator" />

            <button class="active">
                Chercher un job
            </button>

            <div class="separator" />

            <button>
                Chercher une entreprise
            </button>
        </div>

        <div class="header row align-center gap-8">
            <button>
                S'inscrire
            </button>

            <div class="separator" />

            <button class="primary">
                Se connecter
            </button>
        </div>
    </div>

    <router-view />
</template>

<style lang="scss" scoped>
.header-container {
    width: 100%;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    background: linear-gradient(0, rgba(255, 255, 255, 0) 0%, #091C42 100%);
}

.header {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 18px;
    padding: 6px;
    border-radius: 30px;
}

.header .separator {
    border-radius: 30px;
    width: 1px;
    height: 28px;
    background-color: #BECCEB;
}

button.logo {
    padding: 3px 12px 3px 3px;
}
</style>
