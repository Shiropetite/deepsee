<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';

import { getJobOffersByFilters, SearchJobOffersFilter, JobOffersByFilters } from '../services/job-offers-service';
import { formatTimeElapsedSince } from '../utils/time-utils';

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
    contract: '',
    jobTitle: '',
});

const jobOffers: Ref<JobOffersByFilters> = ref([]);

const searchJobOffers = async () => {
    jobOffers.value = await getJobOffersByFilters({ searchFilters: searchFilters.value });
};

onMounted(async () => {
    await searchJobOffers();
});

</script>

<template>
    <div>
        <div class="search row gap-18">
            <div class="column gap-12 width-100">
                <input
                    v-model="searchFilters.jobTitle"
                    placeholder="Rechercher une offre d'emploi"
                    type="text"
                >

                <div class="row gap-12">
                    <select-input
                        v-model="searchFilters.contract"
                        :options="contractTypesOptions"
                        style="min-width: 180px;"
                    />

                    <input
                        v-model="searchFilters.city"
                        placeholder="Ville"
                        type="text"
                    >

                    <input
                        v-model="searchFilters.companyName"
                        placeholder="Entreprise"
                        type="text"
                    >
                </div>
            </div>

            <button class="primary bubble">
                <search-icon
                    :height="32"
                    :width="32"
                    color="white"
                    @click="searchJobOffers"
                />
            </button>
        </div>

        <div class="list column gap-24">
            <div
                v-for="jobOffer in jobOffers"
                :key="jobOffer.__id"
                class="card row"
            >
                <img
                    class="logo"
                    :src="jobOffer.companyLogo"
                >

                <div class="content column justify-between">
                    <div class="row gap-12 justify-between">
                        <div>
                            <div class="title mb-2">
                                {{ jobOffer.title }}
                            </div>
                            <div class="caption">
                                {{ jobOffer.companyName }}
                            </div>
                        </div>

                        <div class="caption">
                            {{ formatTimeElapsedSince(jobOffer.publishedAt) }}
                        </div>
                    </div>

                    <div class="row justify-between align-end">
                        <div class="row gap-8">
                            <div class="chip accent-1">
                                {{ jobOffer.contract }}
                            </div>
                            <div class="chip accent-2">
                                {{ jobOffer.city }}
                            </div>
                            <div class="chip accent-3">
                                {{ jobOffer.salary }}
                            </div>
                        </div>

                        <div class="row gap-8">
                            <button class="primary round">
                                <img
                                    src="/icons/favorite-icon.png"
                                >
                            </button>

                            <button class="secondary round">
                                <img
                                    src="/icons/send-icon.png"
                                >
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bubble {
    border-radius: 8px 100px 100px 100px;
    height: 84px;
    width: 84px;
}

.search {
    padding: 28px 80px;
}

.list {
    padding: 48px 80px 28px 80px;
    min-height: calc(100vh - 216px);
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('/search-background.png');
}

.card {
    background-color: white;
    border-radius: 8px;
    border: 6px solid #CCDBEC;
    cursor: pointer;
    transition: all linear 0.2s;

    &:hover {
        transform: scale(1.005);
    }

    .logo {
        width: 180px;
        height: 120px;
        object-fit: cover;
        border-right: solid 6px #CCDBEC;
    }

    .content {
        width: calc(100% - 180px);
        padding: 12px 18px;
    }
}

.chip {
    padding: 6px 12px;
    border-radius: 30px;
    font-weight: 600;
    font-size: 12px;
}

.accent-1 {
    background-color: #EC368D;
    color: white;
}

.accent-2 {
    background-color: #FFA5A5;
    color: white;
}

.accent-3 {
    background-color: #ffc6a7;
    color: white;
}
</style>
