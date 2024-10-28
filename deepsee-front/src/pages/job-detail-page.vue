<script lang="ts" setup>
import { onMounted, ref, Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import jobCard from '../components/job-card-component.vue';
import seaShapeComponent from '../components/sea-shape-component.vue';
import { getJobOfferById, getJobOffersByFilters, JobOffersByFilters } from '../services/job-offers-service';
import { formatSalary } from '../utils/salary-utils';
import { formatTimeElapsedSince } from '../utils/time-utils';

const router = useRouter();
const route = useRoute();

const companyDescriptionSeeMore = ref(false);
const jobDescriptionSeeMore = ref(false);
const expectationDescriptionSeeMore = ref(false);

const jobOffers: Ref<JobOffersByFilters> = ref([]);
const jobOffer = ref(null);

const goToSearch = () => {
    router.push({ name: 'search' });
};

const goToJobOffer = (id: number) => {
    router.push({ name: 'job-detail', params: { id } });
};

const searchJobOffers = async () => {
    jobOffers.value = await getJobOffersByFilters({ searchFilters: {
        city: '',
        companyName: '',
        companySector: '',
        contract: '',
        jobTitle: '',
        minSalary: '',
    } });

};

const getSelectedJob = async () => {
    const jobId = Number(route.params.id);
    jobOffer.value = await getJobOfferById({ id: jobId });
};

onMounted(async () => {
    await searchJobOffers();
    await getSelectedJob();
});

watch(() => route.fullPath, async () => {
    await getSelectedJob();
    companyDescriptionSeeMore.value = false;
    jobDescriptionSeeMore.value = false;
    expectationDescriptionSeeMore.value = false;
});
</script>

<template>
    <sea-shape-component
        class="sea"
        fill-image="/sea-background.png"
        :height="'580px'"
    />

    <div class="row justify-center">
        <div class="detail-container row">
            <div class="list">
                <button
                    class="primary label-icon round mb-18 row gap-8"
                    @click="goToSearch"
                >
                    <img src="/icons/arrow-left-icon.png">
                    <div>Retour</div>
                </button>

                <h2 class="mb-18">
                    Aujourd'hui
                </h2>

                <div class="column gap-28">
                    <job-card
                        v-for="job in jobOffers"
                        :key="job.__id"
                        :class="{ active: job.__id === jobOffer.__id }"
                        :job="job"
                        @click="goToJobOffer(job.__id)"
                    />
                </div>
            </div>

            <div
                v-if="jobOffer"
                class="detail column gap-28"
            >
                <div>
                    <div class="row justify-between">
                        <div class="row gap-28 align-center">
                            <img
                                class="logo"
                                :src="jobOffer.companyLogo"
                            >

                            <div>
                                <h2 class="mb-2">
                                    {{ jobOffer.title }}
                                </h2>

                                <div>
                                    {{ jobOffer.companyName }}
                                </div>
                            </div>
                        </div>

                        <div>{{ formatTimeElapsedSince(jobOffer.publishedAt) }}</div>
                    </div>

                    <div class="row justify-end gap-8 mb-18">
                        <button class="primary round label-icon row gap-8">
                            <img src="/icons/send-icon.png">
                            <div>Postuler</div>
                        </button>

                        <button class="secondary round label-icon row gap-8">
                            <img src="/icons/favorite-icon.png">
                            <div>Favoris</div>
                        </button>
                    </div>

                    <div class="title mb-6">
                        Résumé
                    </div>

                    <div class="row wrap gap-8">
                        <div class="chip border grey">
                            {{ jobOffer.contract }}
                        </div>

                        <div class="chip border grey">
                            {{ jobOffer.city }}
                        </div>

                        <div class="chip border grey">
                            {{ formatSalary(jobOffer) }}
                        </div>

                        <div class="chip border grey">
                            {{ jobOffer.dayOfRemoteWork }} jours de télétravail / semaine
                        </div>

                        <div class="chip border grey">
                            {{ jobOffer.experienceMinInYear }} an d'expérience
                        </div>

                        <div class="chip border grey">
                            {{ jobOffer.maxDiploma }}
                        </div>
                    </div>
                </div>

                <div>
                    <div class="title mb-8">
                        Description de l'entreprise
                    </div>

                    <div
                        class="description mb-12"
                        :class="{ 'all': companyDescriptionSeeMore }"
                    >
                        {{ jobOffer.companyDescription }}
                    </div>

                    <div class="row justify-between align-start">
                        <div class="row wrap gap-8 mb-12">
                            <div class="chip border grey">
                                {{ jobOffer.companySector }}
                            </div>

                            <div class="chip border grey">
                                {{ jobOffer.companyNumberOfEmployees }} employées
                            </div>
                        </div>

                        <button
                            v-if="!companyDescriptionSeeMore"
                            class="secondary small"
                            @click="companyDescriptionSeeMore = true"
                        >
                            Voir plus
                        </button>

                        <button
                            v-if="companyDescriptionSeeMore"
                            class="secondary small"
                            @click="companyDescriptionSeeMore = false"
                        >
                            Rétrécir
                        </button>
                    </div>
                </div>

                <div>
                    <div class="title mb-8">
                        Description de l'offre
                    </div>

                    <div
                        class="description mb-8"
                        :class="{ 'all': jobDescriptionSeeMore }"
                    >
                        {{ jobOffer.jobDescription }}
                    </div>

                    <div class="row justify-end">
                        <button
                            v-if="!jobDescriptionSeeMore"
                            class="secondary small"
                            @click="jobDescriptionSeeMore = true"
                        >
                            Voir plus
                        </button>

                        <button
                            v-if="jobDescriptionSeeMore"
                            class="secondary small"
                            @click="jobDescriptionSeeMore = false"
                        >
                            Rétrécir
                        </button>
                    </div>
                </div>

                <div>
                    <div class="title mb-6">
                        Compétences
                    </div>

                    <div class="row gap-8">
                        <div
                            v-for="skill in jobOffer.hardSkills"
                            :key="skill"
                            class="chip border grey"
                        >
                            {{ skill }}
                        </div>
                    </div>
                </div>

                <div>
                    <div class="title mb-8">
                        Description des attentes
                    </div>

                    <div
                        class="description mb-8"
                        :class="{ 'all': expectationDescriptionSeeMore }"
                    >
                        {{ jobOffer.expectationDescription }}
                    </div>

                    <div class="row justify-end">
                        <button
                            v-if="!expectationDescriptionSeeMore"
                            class="secondary small"
                            @click="expectationDescriptionSeeMore = true"
                        >
                            Voir plus
                        </button>

                        <button
                            v-if="expectationDescriptionSeeMore"
                            class="secondary small"
                            @click="expectationDescriptionSeeMore = false"
                        >
                            Rétrécir
                        </button>
                    </div>
                </div>

                <div>
                    <div class="title mb-6">
                        Traits recherchés
                    </div>

                    <div class="row gap-8">
                        <div
                            v-for="skill in jobOffer.softSkills"
                            :key="skill"
                            class="chip border grey"
                        >
                            {{ skill }}
                        </div>
                    </div>
                </div>

                <div>
                    <div class="title mb-8">
                        Etapes de recrutement
                    </div>

                    <div class="column gap-8">
                        <div
                            v-for="step in jobOffer.recruitmentSteps"
                            :key="step.name"
                        >
                            - {{ step.name }} - {{ step.timeInMinute }}min
                        </div>
                    </div>
                </div>

                <div>
                    <div class="title mb-8">
                        Descriptif de l’équipe
                    </div>

                    <div class="row wrap gap-8">
                        <div
                            v-for="member in jobOffer.teamMembers"
                            :key="member.name"
                            class="team row align-center gap-8"
                        >
                            <div class="avatar" />
                            <div>
                                <div class="bold mb-2">
                                    {{ member.firstName }} {{ member.lastName }}
                                </div>
                                <div class="caption">
                                    {{ member.role }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="title mb-8">
                        Avantages entreprise
                    </div>

                    <div class="row wrap gap-8">
                        <div
                            v-for="advantage in jobOffer.companyAdvantages"
                            :key="advantage"
                            class="chip border grey"
                        >
                            {{ advantage }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.logo {
    border: solid 1px #BECCEB;
    width: 78px;
    height: 78px;
    object-fit: cover;
    border-radius: 100px;
}

.detail-container {
    height: calc(100vh - 120px);
    max-width: 1200px;
    width: 100%;
    margin: 118px 80px 0 80px;
    background-color: white;
    border-radius: 8px;
    border: solid 1px #BECCEB;
}

.list {
    overflow-y: auto;
    padding: 28px;
}

.detail {
    overflow-y: auto;
    width: 100%;
    padding: 28px;
    border-left: solid 1px #BECCEB;
}

.sea {
    position: fixed;
    z-index: -1;
}

.description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-line
}

.all {
    -webkit-line-clamp: unset;
    line-clamp: unset;
}

.avatar {
    height: 42px;
    width: 42px;
    object-fit: cover;
    border-radius: 100px;
    background-color: #EC368D;
}

.team {
    flex: 0 1 calc(50% - 8px);
}
</style>
