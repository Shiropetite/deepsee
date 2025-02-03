<script lang="ts" setup>
import { onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  isOpen?: boolean;
  maxWidth?: number;
  title?: string;
  animation?: 'slide' | 'fade';
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const { t } = useI18n();

const show = ref(false);
const hide = ref(true);
const appear = ref(false);
const disapear = ref(false);

watch(
    () => props.isOpen,
    (isOpen) => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            hide.value = false;
            appear.value = true;
            setTimeout(() => {
                appear.value = false;
                show.value = true;
            }, 450);
        } else {
            document.body.style.overflow = 'auto';
            show.value = false;
            disapear.value = true;
            setTimeout(() => {
                disapear.value = false;
                hide.value = true;
            }, 450);
        }
    },
);

const closePopup = (e: Event) => {
    const element = e.target as HTMLElement;
    if (element.id === 'popup-container') {
        emit('close');
    }
};

onUnmounted(() => {
    document.body.style.overflow = 'auto';
});
</script>

<template>
    <div
        id="popup-container"
        class="popup-container"
        :class="[
          { show, hide, appear, disapear },
          props.animation,
        ]"
        @click="closePopup"
    >
        <div
            class="popup"
            :style="`max-width: ${maxWidth}px`"
        >
            <div class="popup-header row align-center justify-between">
                <h2>{{ title }}</h2>

                <button
                    class="button icon small"
                    :aria-label="t('close')"
                    @click="emit('close')"
                >
                    <img
                        class="close-icon"
                        alt="close-icon"
                        src="/icons/close-icon.svg"
                    >
                </button>
            </div>
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-header {
    padding: 18px;
    border-bottom: solid 1px var(--grey);
}

.close-icon {
    width: 32px;
    height: 32px;
}

.popup {
  position: fixed;
  background-color: white;
  width: 100%;
  border-radius: 12px;
  z-index: 20;

  @media (max-width: 900px) {
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 8px 8px 0 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slide-in {
  from {
    top: 100%;
  }
  to {
    top: 40px;
  }
}

@keyframes slide-out {
  from {
    top: 40px;
  }
  to {
    top: 100%;
  }
}

.hide {
  display: none !important;
}

// ---- Fade animation ----
.appear.fade {
  animation-name: fade-in;
  animation-duration: 0.5s;

  .popup {
    animation: none; // Pas de mouvement
  }
}

.disapear.fade {
  animation-name: fade-out;
  animation-duration: 0.5s;

  .popup {
    animation: none;
  }
}

// ---- Slide animation ----
.appear.slide {
  animation: none;

  .popup {
    animation-name: slide-in;
    animation-duration: 0.5s;
  }
}

.disapear.slide {
  animation: none;

  .popup {
    animation-name: slide-out;
    animation-duration: 0.5s;
  }
}
</style>
