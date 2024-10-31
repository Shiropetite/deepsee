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

    <div class="mobile-menu-container">
        <div class="mobile-menu row">
            <button class="active width-100">
                Job
            </button>

            <button class="width-100">
                Entreprise
            </button>

            <button class="width-100">
                Compte
            </button>
        </div>
    </div>

    <div class="footer row justify-between">
        <img src="/logo-footer.svg">

        <div class="row gap-8">
            <button class="secondary">
                Mentions légales
            </button>
            <button class="secondary">
                Politique de confidentialité
            </button>
            <button class="secondary">
                CGU
            </button>
            <button class="secondary">
                Contact
            </button>
        </div>
    </div>

    <div class="footer-mobile">
        <div class="column">
            <button class="secondary small">
                Mentions légales
            </button>
            <button class="secondary small">
                Politique de confidentialité
            </button>
            <button class="secondary small">
                CGU
            </button>
            <button class="secondary small">
                Contact
            </button>
        </div>

        <div class="row justify-center">
            <img src="/logo-footer.svg">
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media (max-width: 900px) {
    .header-container {
        display: none;
    }

    .mobile-menu-container {
        display: block !important;
    }

    .footer {
        display: none;
    }

    .footer-mobile {
        display: block !important;
    }
}

.mobile-menu-container {
    display: none;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background: linear-gradient(0, #091C42 0%, rgba(255, 255, 255, 0) 100%);
}

.mobile-menu {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 18px;
    padding: 6px;
    border-radius: 30px;
}

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

.footer {
    padding: 18px;
    background-color: #091C42;
}

.footer-mobile {
    display: none;
    padding: 18px;
    padding-bottom: 90px;
    background-color: #091C42;
}

.footer-mobile button {
    font-size: 14px;
}
</style>
