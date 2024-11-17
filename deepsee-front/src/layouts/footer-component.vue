<template>
    <div class="laptop footer row justify-between">
        <img src="/logo-footer.svg">

        <div class="row gap-8">
            <router-link :to="{ name: 'legal-notice' }">
                <button class="secondary">
                    {{ $t("legalNotice") }}
                </button>
            </router-link>

            <router-link :to="{ name: 'privacy-policy' }">
                <button class="secondary">
                    {{ $t("privacyPolicy") }}
                </button>
            </router-link>

            <router-link :to="{ name: 'term-of-use' }">
                <button class="secondary">
                    {{ $t("termOfUse") }}
                </button>
            </router-link>

            <router-link :to="{ name: 'contact' }">
                <button class="secondary">
                    {{ $t("contact") }}
                </button>
            </router-link>
        </div>
    </div>

    <div class="mobile footer footer-mobile">
        <div class="column">
            <router-link :to="{ name: 'legal-notice' }">
                <button class="secondary small">
                    {{ $t("legalNotice") }}
                </button>
            </router-link>

            <router-link :to="{ name: 'privacy-policy' }">
                <button class="secondary small">
                    {{ $t("privacyPolicy") }}
                </button>
            </router-link>

            <router-link :to="{ name: 'term-of-use' }">
                <button class="secondary small">
                    {{ $t("termOfUse") }}
                </button>
            </router-link>

            <router-link :to="{ name: 'contact' }">
                <button class="secondary small">
                    {{ $t("contact") }}
                </button>
            </router-link>
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
