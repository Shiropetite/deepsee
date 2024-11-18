<script lang="ts" setup>
import jobCard from 'src/components/job-card-component.vue';
import seaShapeComponent from 'src/components/sea-shape-component.vue';
import { getJobById, getJobsByFilters } from 'src/services/job-service';
import { GetJobByIdResponse, GetJobsByFiltersResponse, getJobsByFiltersKey, SearchJobsFilter } from 'src/services/job-type';
import { onMounted, ref, Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import jobDetailBodyComponent from './job-detail-body-component.vue';

const router = useRouter();
const route = useRoute();

const currentPage = ref(route.query.page ? parseInt(route.query.page as string) : 1);
const jobsKey = ref(getJobsByFiltersKey);

const listIsLoading = ref(false);
const jobIsLoading = ref(false);
const jobSelected: Ref<GetJobByIdResponse | null> = ref(null);
const jobs: Ref<GetJobsByFiltersResponse> = ref({
    currentPage: 1,
    data: {
        older: [],
        thisMonth: [],
        thisWeek: [],
        today: [],
    },
    maxItems: 0,
    maxPages: 1,
});
const searchFilters: Ref<SearchJobsFilter> = ref({
    city: '',
    companyName: '',
    companySector: '',
    contract: '',
    jobTitle: '',
    minSalary: '',
});

const goToSearch = () => {
    router.push({ name: 'search', query: { ...searchFilters.value, page: 1 } });
};

const goToJob = (id: number) => {
    router.push({ name: 'job-detail', params: { id }, query: { ...searchFilters.value, page: route.query.page } });
};

const searchJobs = async () => {
    listIsLoading.value = true;
    const response = await getJobsByFilters({
        page: currentPage.value,
        searchFilters: searchFilters.value,
    });

    jobs.value = {
        ...jobs.value,
        ...response,
        data: {
            older: [
                ...(jobs.value.data?.older ?? []),
                ...(response.data?.older ?? []),
            ],
            thisMonth: [
                ...(jobs.value.data?.thisMonth ?? []),
                ...(response.data?.thisMonth ?? []),
            ],
            thisWeek: [
                ...(jobs.value.data?.thisWeek ?? []),
                ...(response.data?.thisWeek ?? []),
            ],
            today: [
                ...(jobs.value.data?.today ?? []),
                ...(response.data?.today ?? []),
            ],
        },
    };

    jobsKey.value = getJobsByFiltersKey.filter(
        (key) => Object.keys(jobs.value.data[key] ?? {}).length > 0,
    );

    listIsLoading.value = false;
};

const loadMoreJobs = () => {
    currentPage.value += 1;
    searchJobs();
};

const getSelectedJob = async () => {
    listIsLoading.value = true;
    const jobId = Number(route.params.id);
    jobSelected.value = await getJobById({ id: jobId });
    listIsLoading.value = false;
};

onMounted(async () => {
    if (Object.keys(route.query).length > 0) {
        searchFilters.value = {
            city: route.query.city as string,
            companyName: route.query.companyName as string,
            companySector: route.query.companySector as string,
            contract: route.query.contract as string,
            jobTitle: route.query.jobTitle as string,
            minSalary: route.query.minSalary ? parseInt(route.query.minSalary as string) : '',
        };
    }
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
                        class="button primary label-icon round row gap-8"
                        :aria-label="$t('goBack')"
                        @click="goToSearch"
                    >
                        <img
                            alt="arrow-left-icon"
                            src="/icons/arrow-left-icon.png"
                        >
                        <div>{{ $t('goBack') }}</div>
                    </button>
                </div>

                <div class="list-body">
                    <div v-if="listIsLoading">
                        <h2 class="mb-18">
                            {{ $t('today') }}
                        </h2>

                        <div class="list-job">
                            <skeleton-card
                                v-for="index in 9"
                                :key="index"
                                width="100%"
                                height="280px"
                            />
                        </div>
                    </div>

                    <div
                        v-else
                        class="column gap-28"
                    >
                        <div
                            v-for="label in jobsKey"
                            :key="label"
                        >
                            <h2
                                v-if="jobs.data[label]?.length > 0"
                                class="mb-18"
                            >
                                {{ $t(label) }}
                            </h2>

                            <div class="column gap-18">
                                <job-card
                                    v-for="job in jobs.data[label]"
                                    :key="job.__id"
                                    :job="job"
                                    :class="{ active: jobSelected?.__id === job.__id }"
                                    @click="goToJob(job.__id)"
                                />
                            </div>
                        </div>

                        <div class="row justify-center gap-8">
                            <button
                                v-if="currentPage < jobs.maxPages"
                                class="button primary"
                                :aria-label="$t('getMoreJobs')"
                                @click="loadMoreJobs()"
                            >
                                {{ $t("getMoreJobs") }}
                            </button>
                        </div>
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
