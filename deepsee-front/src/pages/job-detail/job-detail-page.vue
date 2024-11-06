<script lang="ts" setup>
import jobCard from 'src/components/job-card-component.vue';
import seaShapeComponent from 'src/components/sea-shape-component.vue';
import { getJobById, getJobsByFilters } from 'src/services/job-service';
import { GetJobByIdResponse, GetJobsByFiltersResponse } from 'src/services/job-type';
import { onMounted, ref, Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import jobDetailBodyComponent from './job-detail-body-component.vue';

const router = useRouter();
const route = useRoute();

const listIsLoading = ref(false);
const jobIsLoading = ref(false);
const jobs: Ref<GetJobsByFiltersResponse[]> = ref([]);
const jobSelected: Ref<GetJobByIdResponse | null> = ref(null);

const goToSearch = () => {
    router.push({ name: 'search' });
};

const goToJob = (id: number) => {
    router.push({ name: 'job-detail', params: { id } });
};

const searchJobs = async () => {
    listIsLoading.value = true;
    jobs.value = await getJobsByFilters({ searchFilters: {
        city: '',
        companyName: '',
        companySector: '',
        contract: '',
        jobTitle: '',
        minSalary: '',
    } });
    listIsLoading.value = false;
};

const getSelectedJob = async () => {
    listIsLoading.value = true;
    const jobId = Number(route.params.id);
    jobSelected.value = await getJobById({ id: jobId });
    listIsLoading.value = false;
};

onMounted(async () => {
    await searchJobs();
    await getSelectedJob();
});

watch(() => route.fullPath, async () => {
    await getSelectedJob();
});
</script>

<template>
    <div class="sea">
        <sea-shape-component
            fill-image="/sea-background.png"
            laptop-height="140px"
            mobile-height="40px"
            one-wave-laptop
        />
    </div>

    <div class="row justify-center">
        <div class="detail-container row gap-28">
            <div class="list">
                <div class="list-header">
                    <button
                        class="primary label-icon round row gap-8"
                        @click="goToSearch"
                    >
                        <img src="/icons/arrow-left-icon.png">
                        <div>{{ $t('goBack') }}</div>
                    </button>
                </div>

                <div class="list-body">
                    <h2 class="mb-18">
                        {{ $t("today") }}
                    </h2>

                    <div
                        v-if="listIsLoading"
                        class="column gap-28"
                    >
                        <skeleton-card
                            v-for="index in 8"
                            :key="index"
                            height="260px"
                            width="100%"
                        />
                    </div>

                    <div
                        v-else
                        class="column gap-28"
                    >
                        <job-card
                            v-for="job in jobs"
                            :key="job.__id"
                            :class="{ active: job.__id === jobSelected?.__id }"
                            :job="job"
                            @click="goToJob(job.__id)"
                        />
                    </div>
                </div>
            </div>

            <job-detail-body-component
                :go-to-search="goToSearch"
                :job="jobSelected"
                :is-loading="jobIsLoading"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media (max-width: 900px) {
    .list {
        display: none;
    }

    .detail-header {
        padding: 18px !important;
    }

    .detail-container {
        margin: 0 28px 28px 28px !important;
    }
}

.sea {
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 10;
}

.detail-container {
    margin: 0 80px 28px 80px;
    max-width: 1200px;
    width: 100%;
}

.list {
    min-width: 340px;
}

.list-header {
    background-color: white;
    border: solid 1px #BECCEB;
    border-radius: 8px 8px 0 0;
    padding: 28px;
    position: sticky;
    top: 160px;
    z-index: 10;
}

.list-body {
    background-color: white;
    border: solid 1px #BECCEB;
    max-height: calc(100vh - 360px);
    overflow-y: scroll;
    padding: 28px;
    position: sticky;
    top: 260px;
}
</style>
