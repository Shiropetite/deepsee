<script lang="ts" setup>
import { SearchJobsFilter } from 'src/services/job-type';

import { contractTypesOptions, minSalaryOptions } from '.';

defineProps<{
    modelValue: SearchJobsFilter
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', val: SearchJobsFilter): void;
}>();
</script>

<template>
    <div class="popup-content column gap-18">
        <text-input
            :model-value="modelValue.jobTitle"
            placeholder="Rechercher un job"
            @update:model-value="($event) => emit('update:modelValue', { ...modelValue, jobTitle: $event })"
        />

        <text-input
            :model-value="modelValue.city"
            placeholder="Ville"
            @update:model-value="($event) => emit('update:modelValue', { ...modelValue, city: $event })"
        />

        <select-input
            :model-value="modelValue.contract"
            :options="contractTypesOptions"
            @update:model-value="($event) => emit('update:modelValue', { ...modelValue, contract: $event })"
        />

        <text-input
            :model-value="modelValue.companyName"
            placeholder="Entreprise"
            @update:model-value="($event) => emit('update:modelValue', { ...modelValue, companyName: $event })"
        />

        <text-input
            :model-value="modelValue.companySector"
            placeholder="Secteur"
            @update:model-value="($event) => emit('update:modelValue', { ...modelValue, companySector: $event })"
        />

        <select-input
            :model-value="modelValue.minSalary"
            :options="minSalaryOptions"
            @update:model-value="($event) => emit('update:modelValue', { ...modelValue, minSalary: $event })"
        />
    </div>
</template>

<style lang="scss" scoped>
.popup-content {
    padding: 18px;
}
</style>
