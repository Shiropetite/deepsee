<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    label?: string;
    modelValue: string;
    placeholder?: string;
    rules?: ((value: string) => boolean | string)[];
    type?: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', val: string): void;
}>();

const { t } = useI18n();

const errorMessage = ref<string | null>(null);

const validate = (
    { displayError = true, value }: { displayError?: boolean, value: string },
): boolean => {
    if (!props.rules) return true;

    for (const rule of props.rules) {
        const result = rule(value);
        // Les fonctions d'erreur renvoie true si l'input est correct
        // Et une string si l'input est incorrect (qui correspond à la clé du message d'erreur)
        if (result !== true) {
            if (displayError) {
                errorMessage.value = result as string;
            }
            return false;
        }
    }

    if (displayError) {
        errorMessage.value = null;
    }
    return true;
};

const onChange = (event: Event) => {
    const newValue = (event.target as HTMLInputElement).value;
    emit('update:modelValue', newValue);
    validate({ value: newValue });
};

const clear = () => {
    emit('update:modelValue', '');
    validate({ value: '' });
};

defineExpose({ validate });
</script>

<template>
    <div
        v-if="label"
        class="label"
    >
        <label :for="label ?? placeholder">{{ label }}</label>
    </div>

    <div
        class="text-input row justify-between gap-8"
        :class="{ error: errorMessage }"
    >
        <input
            :id="label ?? placeholder"
            :value="modelValue"
            :placeholder="placeholder"
            :type="type ?? 'text'"
            @input="onChange"
        >

        <button
            v-if="modelValue.length > 0"
            class="button border round icon small"
            :aria-label="t('clear')"
            @click="clear()"
        >
            <img
                alt="close-icon"
                src="/icons/close-icon.svg"
                width="18"
            >
        </button>
    </div>

    <div
        v-if="errorMessage"
        class="error"
    >
        {{ t(errorMessage) }}
    </div>
</template>

<style lang="scss" scoped>
.label {
    margin-bottom: 2px;
    font-weight: 600;
}

.error {
    color: var(--red);
    font-size: 12px;
    font-weight: 600;
    margin-top: 2px;
}

.text-input.error {
    width: 100%;
    box-sizing: border-box;
    border: solid 2px var(--red);
}

input {
    border: none;
    font-family: 'Montserrat', sans-serif;
    height: 24px;
    width: 100%;
}

input[type="password"] {
    letter-spacing: 2px;
    font-family: sans-serif;
    font-size: 18px;
}

button {
  border-width: 1px !important;
}
</style>
