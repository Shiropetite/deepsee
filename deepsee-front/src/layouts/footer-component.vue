<template>
    <div class="laptop footer row justify-between">
        <img src="/logo-footer.svg">

        <div class="row gap-8">
            <button class="secondary">
                {{ $t("legalNotice") }}
            </button>
            <button class="secondary">
                {{ $t("privacyPolicy") }}
            </button>
            <button class="secondary">
                {{ $t("termOfUse") }}
            </button>
            <button class="secondary">
                {{ $t("contact") }}
            </button>
        </div>
    </div>

    <div class="mobile footer footer-mobile">
        <div class="column">
            <button class="secondary small">
                {{ $t("legalNotice") }}
            </button>
            <button class="secondary small">
                {{ $t("privacyPolicy") }}
            </button>
            <button class="secondary small">
                {{ $t("termOfUse") }}
            </button>
            <button class="secondary small">
                {{ $t("contact") }}
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
