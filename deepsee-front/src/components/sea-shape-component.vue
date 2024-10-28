<script lang="ts" setup>
defineProps<{
    fillColor?: string;
    fillImage?: string;
    height?: string;
}>();
</script>

<template>
    <svg
        :width="'100%'"
        :height="height"
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
</template>
