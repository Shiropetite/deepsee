<script lang="ts" setup>

defineProps<{
    modelValue: string;
    placeholder?: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', val: string): void;
}>();

const onChange = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
    <div class="text-input row justify-between gap-8">
        <input
            :value="modelValue"
            :placeholder="placeholder"
            type="text"
            @input="onChange"
        >

        <button
            v-if="modelValue.length > 0"
            class="border round icon small"
            @click="emit('update:modelValue', '')"
        >
            <img
                src="/icons/close-icon.svg"
                width="18"
            >
        </button>
    </div>
</template>

<style lang="scss" scoped>
input {
    border: none;
    font-family: 'Montserrat', sans-serif;
    height: 24px;
    width: 100%;
}

button {
  border-width: 1px !important;
}
</style>
