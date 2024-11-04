<script lang="ts" setup>
defineProps<{
    height: string;
    width: string;
}>();
</script>

<template>
    <div
        class="skeleton"
        :style="{ height, width }"
    />
</template>

<style lang="scss" scoped>
.skeleton {
  background-color: #e0e0e0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

/* Animation de brillance */
.skeleton::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(90deg, rgba(168, 173, 214, 0.1), rgba(168, 173, 214, 0.4), rgba(168, 173, 214, 0.1));
  animation: shimmer 1.5s infinite;
}

/* Animation */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
