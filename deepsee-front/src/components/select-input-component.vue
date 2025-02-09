<script lang="ts" setup>
import { ref } from 'vue';

type Options = {
    icon: string;
    label: string;
    value: string;
}

const props = defineProps<{
    label?: string;
    modelValue: string;
    options: Options[];
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', val: string): void;
}>();

const isOptionOpen = ref(false);

const selectOption = (option: string) => {
    emit('update:modelValue', option);
    isOptionOpen.value = false;
};

const clickOnInput = () => {
    isOptionOpen.value = !(isOptionOpen.value);
};

const onBlur = () => {
    isOptionOpen.value = false;
};

const getLabel = (value: string) => {
    const option = props.options.find((option) => option.value === value);
    return option ? option.label : '';
};
</script>

<template>
    <div class="select input">
        <div
            v-if="label"
            class="label"
        >
            {{ label }}
        </div>

        <button
            class="select-input row align-center justify-between"
            :aria-label="getLabel(modelValue)"
            @click="clickOnInput()"
            @focusout="onBlur()"
        >
            <div>
                {{ getLabel(modelValue) }}
            </div>

            <img
                alt="arrow-down-icon"
                src="/icons/arrow-down-icon.svg"
            >
        </button>

        <div
            v-if="isOptionOpen"
            class="options"
        >
            <div
                v-for="option in options"
                :key="option.label"
                class="item"
                @click="selectOption(option.value)"
                @mousedown.prevent
            >
                <div class="row align-center gap-8">
                    <img
                        v-if="option.icon"
                        :alt="option.icon"
                        :src="option.icon"
                        height="16"
                        width="16"
                    >
                    <div>{{ option.label }}</div>
                </div>
            </div>

            <div
                v-if="options.length === 0"
                class="no-result"
            >
                Pas de résultat
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.select {
    position: relative;
    width: 100%;
}

.select-input {
    background-color: white;
    font-weight: 400;
    height: 44px;
    text-align: left;
    width: 100%;
}

.item {
    cursor: pointer;
    padding: 8px 12px;
}

.disabled {
    cursor: pointer;
}

.item:hover {
    background-color: #eff4f9;
}

.no-result {
    color: #afb9c1;
    font-weight: 500;
    padding: 8px 12px;
}

.options {
    background-color: white;
    border: solid 1px white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    left: 0;
    margin-top: 2px;
    max-height: 120px;
    overflow: auto;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 1000;
}
</style>
