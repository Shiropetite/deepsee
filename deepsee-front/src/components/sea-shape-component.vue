<script lang="ts" setup>
defineProps<{
    fillImage?: string;
    laptopHeight?: string;
    mobileHeight?: string;
    oneWaveLaptop?: boolean;
}>();
</script>

<template>
    <svg
        v-if="!oneWaveLaptop"
        class="sea-laptop"
        :width="'100%'"
        :height="laptopHeight ?? '500px'"
        viewBox="0 0 860 490"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMax slice"
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
                    width="860"
                    height="490"
                    preserveAspectRatio="xMidYMid slice"
                />
            </pattern>
        </defs>

        <path
            d="M0 0H860V427.976L814.83 458.264C775.404 484.699 727.959 488.743 685.716 469.27C659.123 457.011
             630.117 453.932 602.094 460.391L516.453 480.13C459.358 493.29 400.642 493.29 343.547 480.13L257.906
             460.391C229.883 453.932 200.877 457.011 174.284 469.27C132.041 488.743 84.5962 484.699
             45.1702 458.264L0 427.976V0Z"
            :fill="fillImage ? 'url(#imageFill)' : '#091C42'"
        />
    </svg>

    <svg
        v-if="oneWaveLaptop"
        class="sea-laptop"
        :width="'100%'"
        :height="laptopHeight ?? '500px'"
        viewBox="0 0 412 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMax slice"
    >
        <path
            d="M0 0H412V110C276.209 120 135.791 120 0 110V0Z"
            fill="#091C42"
        />
    </svg>

    <svg
        class="sea-mobile"
        :width="'100%'"
        :height="mobileHeight ?? '128px'"
        viewBox="0 0 412 142"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMax slice"
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
