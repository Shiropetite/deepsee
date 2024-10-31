<script lang="ts" setup>
defineProps<{
    fillColor?: string;
    fillImage?: string;
    laptopHeight?: string;
    mobileHeight?: string;
}>();
</script>

<template>
    <svg
        class="sea-laptop"
        :width="'100%'"
        :height="laptopHeight ?? '500px'"
        viewBox="0 0 1920 500"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
    >
        <defs>
            <pattern
                v-if="fillImage"
                id="imageFill"
                patternUnits="userSpaceOnUse"
                width="100%"
                height="100%"
            >
                <image
                    :href="fillImage"
                    width="1920"
                    height="500"
                    preserveAspectRatio="xMidYMid slice"
                />
            </pattern>
        </defs>

        <path
            d="M0 0H1920V380L1818.43 439.247C1731.24 490.112 1625.25 497.186 1532.06 458.36V458.36C1472.09
            433.371 1405.97 427.09 1342.36 440.341L1153.14 479.763C1025.75 506.303 894.254 506.303 766.865
            479.763L577.639 440.342C514.034 427.09 447.909 433.371 387.936 458.36V458.36C294.754 497.186
            188.763 490.112 101.567 439.247L0 380V0Z"
            :fill="fillImage ? 'url(#imageFill)' : fillColor"
        />
    </svg>

    <svg
        class="sea-mobile"
        :width="'100%'"
        :height="mobileHeight ?? '128px'"
        viewBox="0 0 412 142"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
    >
        <path
            d="M0 0H412V119.846V119.846C276.209 148.952 135.791 148.952 0 119.846V119.846V0Z"
            fill="#091C42"
        />
    </svg>
</template>

<style lang="scss" scoped>
@media (max-width: 900px) {
    .sea-laptop {
        display: none !important;
    }

    .sea-mobile {
        display: block !important;
    }
}

.sea-mobile {
    display: none;
}
</style>
