<script lang="ts" setup>
import jobCard from 'src/components/job-card-component.vue';
import seaShapeComponent from 'src/components/sea-shape-component.vue';
import { getJobsByFilters } from 'src/services/job-service';
import { GetJobsByFiltersResponse, SearchJobsFilter } from 'src/services/job-type';
import { onMounted, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const contractTypesOptions = [
    {
        label: 'Tous les contrats',
        value: '',
    },
    { label: 'CDD', value: 'CDD' },
    { label: 'CDI', value: 'CDI' },
    { label: 'Alternance', value: 'Alternance' },
    { label: 'Stage', value: 'Stage' },
    { label: 'Freelance', value: 'Freelance' },
    { label: 'Intérim', value: 'Intérim' },
];

const searchFilters: Ref<SearchJobsFilter> = ref({
    city: '',
    companyName: '',
    companySector: '',
    contract: '',
    jobTitle: '',
    minSalary: '',
});

const jobs: Ref<GetJobsByFiltersResponse[]> = ref([]);

const searchJobs = async () => {
    jobs.value = await getJobsByFilters({ searchFilters: searchFilters.value });
};

const goToSelectedJob = (id: number) => {
    router.push({ name: 'job-detail', params: { id } });
};

onMounted(async () => {
    await searchJobs();
});
</script>

<template>
    <div class="sea">
        <sea-shape-component
            fill-image="/sea-background.png"
            height="580px"
        />
    </div>

    <div class="laptop search-container">
        <div class="search-content">
            <h1 class="text-center text-white mb-28">
                Rechercher votre job idéal
            </h1>

            <div class="search row gap-18 mb-12">
                <div class="column gap-12 width-100">
                    <input
                        v-model="searchFilters.jobTitle"
                        placeholder="Rechercher un job"
                        type="text"
                    >

                    <div class="row gap-12">
                        <input
                            v-model="searchFilters.city"
                            placeholder="Ville"
                            type="text"
                        >

                        <select-input
                            v-model="searchFilters.contract"
                            :options="contractTypesOptions"
                            style="min-width: 180px;"
                        />

                        <input
                            v-model="searchFilters.companyName"
                            placeholder="Entreprise"
                            type="text"
                        >

                        <input
                            v-model="searchFilters.companySector"
                            placeholder="Secteur"
                            type="text"
                        >

                        <input
                            v-model="searchFilters.minSalary"
                            placeholder="Salaire minimum"
                            type="text"
                        >
                    </div>
                </div>

                <button
                    class="primary bubble"
                    @click="searchJobs"
                >
                    <search-icon
                        :height="32"
                        :width="32"
                        color="white"
                    />
                </button>
            </div>

            <div class="row justify-end text-white mr-52">
                147 jobs trouvés
            </div>
        </div>
    </div>

    <div class="mobile mobile-search-container">
        <div class="mobile-search mb-8">
            <input
                v-model="searchFilters.jobTitle"
                placeholder="Rechercher un job"
                type="text"
            >
        </div>

        <div class="row justify-end text-white mr-28">
            147 jobs trouvés
        </div>
    </div>

    <div class="row justify-center">
        <div class="list">
            <h2 class="mb-18">
                Aujourd'hui
            </h2>

            <div class="list-job">
                <job-card
                    v-for="job in jobs"
                    :key="job.__id"
                    :job="job"
                    @click="goToSelectedJob(job.__id)"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media (max-width: 900px) {
    .list {
        margin: 28px !important;
        padding-top: 120px;
    }

    .list-job {
        grid-template-columns: repeat(1, 1fr) !important;
    }

    .sea {
        position: fixed;
        width: 100%;
    }
}

@media (min-width: 900px) and (max-width: 1200px) {
    .list-job {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}

.mobile-search-container {
    margin: 18px;
    left: 0;
    position: fixed;
    top: 0;
    width: calc(100% - 36px);
}

.mobile-search {
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 8px 12px;
}

.search-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 80px;
    position: absolute;
    top: 180px;
    width: calc(100% - 160px);
}

.search-content {
    max-width: 1200px;
    width: 100%;
}

.search {
    background-color: white;
    border-radius: 100px;
    padding: 18px 18px 18px 38px;
}

button.bubble {
    height: 84px;
    width: 84px;
}

.list {
    margin: 28px 80px;
    max-width: 1200px;
    width: 100%;
}

.list-job {
    display: grid;
    gap: 28px;
    grid-template-columns: repeat(3, 1fr);
}
</style>
