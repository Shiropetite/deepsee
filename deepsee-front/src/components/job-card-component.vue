<script lang="ts" setup>
import { formatSalary } from 'src/utils/salary-utils';

type JobInfo = {
    city: string;
    companyLogo: string;
    companyName: string;
    contract: string;
    salaryMaxInYear: number;
    salaryMinInYear: number;
    title: string;
}

defineProps<{
    job: JobInfo;
}>();
</script>

<template>
    <button
        class="card bubble"
        :aria-label="$t('jobName', { name: job.title })"
    >
        <div class="row align-center gap-18 mb-18">
            <img
                class="logo"
                :alt="'logo ' + job.companyName"
                :src="job.companyLogo"
            >
            <div>
                <div class="title mb-2">
                    {{ job.title }}
                </div>
                <div>{{ job.companyName }}</div>
            </div>
        </div>

        <div class="column gap-8">
            <div class="chip accent-1">
                {{ job.contract }}
            </div>

            <div class="chip accent-2">
                {{ job.city }}
            </div>

            <div class="chip accent-3">
                {{ formatSalary(job) }}
            </div>
        </div>
    </button>
</template>

<style lang="scss">
.card {
    border: solid 3px var(--light-grey);
    box-sizing: border-box;
    cursor: pointer;
    padding: 18px;
    transition: all linear 0.2s;
}

.card .logo {
    border: solid 1px var(--light-grey);
    border-radius: 100px;
    height: 64px;
    width: 64px;
}

.card.active {
    border: solid 3px var(--primary);
}
</style>
