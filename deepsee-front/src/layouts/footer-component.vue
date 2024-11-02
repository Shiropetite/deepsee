<template>
    <div class="laptop footer row justify-between">
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

    <div class="mobile footer footer-mobile">
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
.footer {
    background-color: var(--secondary);
    padding: 18px;
}

.footer img {
    width: 146px;
}

.footer-mobile {
    padding-bottom: 90px;
}

.footer-mobile button {
    font-size: 14px;
}
</style>
