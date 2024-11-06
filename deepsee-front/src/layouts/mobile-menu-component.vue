<template>
    <div class="mobile mobile-menu-container">
        <div class="mobile-menu row">
            <button class="active width-100">
                {{ $t("job") }}
            </button>

            <button class="width-100">
                {{ $t("company") }}
            </button>

            <button class="width-100">
                {{ $t("company") }}
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mobile-menu-container {
    background: linear-gradient(0, var(--secondary) 0%, rgba(255, 255, 255, 0) 100%);
    bottom: 0;
    display: flex;
    width: 100%;
    left: 0;
    position: fixed;
    z-index: 9999;
}

.mobile-menu {
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 18px;
    padding: 6px;
    width: 100%;
}
</style>
