<script lang="ts" setup>
import { formatSalary } from '../utils/salary-utils';

defineProps<{
    job: any;
}>();
</script>

<template>
    <div
        class="card bubble"
    >
        <div class="row align-center gap-18 mb-18">
            <img
                class="logo"
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
    </div>
</template>

<style lang="scss">
.card {
  border: solid 3px #BECCEB;
  padding: 18px;
  cursor: pointer;
  transition: all linear 0.2s;
}

.card .logo {
  width: 64px;
  height: 64px;
  border-radius: 100px;
  border: solid 1px #BECCEB;
}

.card.active {
    border: solid 4px #00b2ca;
}
</style>
