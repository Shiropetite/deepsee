<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';

import jobCard from '../components/job-card-component.vue';
import seaShapeComponent from '../components/sea-shape-component.vue';
import { getJobOffersByFilters, JobOffersByFilters, SearchJobOffersFilter } from '../services/job-offers-service';

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

const searchFilters: Ref<SearchJobOffersFilter> = ref({
    city: '',
    companyName: '',
    companySector: '',
    contract: '',
    jobTitle: '',
    minSalary: '',
});

const jobOffers: Ref<JobOffersByFilters> = ref([]);

const searchJobOffers = async () => {
    jobOffers.value = await getJobOffersByFilters({ searchFilters: searchFilters.value });

};

const goToJobOffer = (id: number) => {
    router.push({ name: 'job-detail', params: { id } });
};

onMounted(async () => {
    await searchJobOffers();
});
</script>

<template>
    <div class="sea">
        <sea-shape-component
            fill-image="/sea-background.png"
            height="580px"
        />
    </div>

    <div class="search-container">
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
                    @click="searchJobOffers"
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

    <div class="mobile-search-container">
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
                    v-for="job in jobOffers"
                    :key="job.__id"
                    :job="job"
                    @click="goToJobOffer(job.__id)"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media (max-width: 900px) {
    .search-container {
        display: none !important;
    }

    .mobile-search-container {
        display: block !important;
    }

    .list {
        padding-top: 120px;
        margin: 28px !important;
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
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 36px);
    margin: 18px;
}

.mobile-search {
    background-color: white;
    border-radius: 30px;
    padding: 8px 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-container {
    position: absolute;
    top: 180px;
    width: calc(100% - 160px);
    margin: 0 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.search-content {
    max-width: 1200px;
    width: 100%;
}

.search {
    background-color: white;
    padding: 18px 18px 18px 38px;
    border-radius: 100px;
}

button.bubble {
    width: 84px;
    height: 84px;
}

.list {
    max-width: 1200px;
    width: 100%;
    margin: 28px 80px;
}

.list-job {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
}

.card {
    box-sizing: border-box;
}

.card:hover {
    background-color: #e3e7ef;
}
</style>
