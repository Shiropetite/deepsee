<template>
    <div class="laptop footer row justify-between">
        <img
            src="/logo-footer.svg"
            alt="deepsee-logo"
        >

        <div class="row gap-8">
            <router-link
                class="button secondary"
                :to="{ name: 'legal-notice' }"
            >
                {{ $t("legalNotice") }}
            </router-link>

            <router-link
                class="button secondary"
                :to="{ name: 'privacy-policy' }"
            >
                {{ $t("privacyPolicy") }}
            </router-link>

            <router-link
                class="button secondary"
                :to="{ name: 'term-of-use' }"
            >
                {{ $t("termOfUse") }}
            </router-link>

            <router-link
                class="button secondary"
                :to="{ name: 'contact' }"
            >
                {{ $t("contact") }}
            </router-link>
        </div>
    </div>

    <div class="mobile footer footer-mobile">
        <div class="column">
            <router-link
                class="button secondary small"
                :to="{ name: 'legal-notice' }"
            >
                {{ $t("legalNotice") }}
            </router-link>

            <router-link
                class="button secondary small"
                :to="{ name: 'privacy-policy' }"
            >
                {{ $t("privacyPolicy") }}
            </router-link>

            <router-link
                class="button secondary small"
                :to="{ name: 'term-of-use' }"
            >
                {{ $t("termOfUse") }}
            </router-link>

            <router-link
                class="button secondary small"
                :to="{ name: 'contact' }"
            >
                {{ $t("contact") }}
            </router-link>
        </div>

        <div class="row justify-center">
            <img
                src="/logo-footer.svg"
                alt="deepsee-logo"
            >
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
</style>
