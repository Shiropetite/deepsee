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
    <div class="sea">
        <sea-shape-component
            fill-image="/sea-background.png"
            laptop-height="120px"
            mobile-height="40px"
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
                        <div>Retour</div>
                    </button>
                </div>

                <div class="list-body">
                    <h2 class="mb-18">
                        Aujourd'hui
                    </h2>

                    <div class="column gap-28">
                        <job-card
                            v-for="job in jobOffers"
                            :key="job.__id"
                            :class="{ active: job.__id === jobOffer?.__id }"
                            :job="job"
                            @click="goToJobOffer(job.__id)"
                        />
                    </div>
                </div>
            </div>

            <div
                v-if="jobOffer"
                class="detail"
            >
                <div class="detail-header-container">
                    <div class="detail-header">
                        <div class="row justify-between align-center gap-8 mb-12">
                            <button
                                class="primary icon round row gap-8 mobile"
                                @click="goToSearch"
                            >
                                <img src="/icons/arrow-left-icon.png">
                            </button>

                            <div class="mobile">
                                {{ formatTimeElapsedSince(jobOffer.publishedAt) }}
                            </div>
                        </div>

                        <div class="row justify-between mb-18">
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

                            <div class="laptop">{{ formatTimeElapsedSince(jobOffer.publishedAt) }}</div>
                        </div>

                        <div class="row justify-end gap-8">
                            <button class="primary round label-icon row gap-8">
                                <img src="/icons/send-icon.png">
                                <div>Postuler</div>
                            </button>

                            <button class="secondary round label-icon row gap-8">
                                <img src="/icons/favorite-icon.png">
                                <div>Favoris</div>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="detail-body column gap-28">
                    <div>
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

                        <div class="row wrap gap-8 mb-12">
                            <div class="chip border grey">
                                {{ jobOffer.companySector }}
                            </div>

                            <div class="chip border grey">
                                {{ jobOffer.companyNumberOfEmployees }} employées
                            </div>
                        </div>

                        <div class="row justify-end">
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
                                Voir moins
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
                                Voir moins
                            </button>
                        </div>
                    </div>

                    <div>
                        <div class="title mb-6">
                            Compétences
                        </div>

                        <div class="row wrap gap-8">
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
                                Voir moins
                            </button>
                        </div>
                    </div>

                    <div>
                        <div class="title mb-6">
                            Traits recherchés
                        </div>

                        <div class="row wrap gap-8">
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
    </div>
</template>

<style lang="scss" scoped>
@media (max-width: 900px) {
    .list {
        display: none;
    }

    .detail-header-container {
        padding-top: 56px !important;
    }

    .detail-header {
        padding: 18px !important;
    }

    .detail-container {
        margin: 0 28px 28px 28px !important;
    }

    .detail-body {
        padding: 18px !important;
    }

    .mobile {
        display: flex !important;
    }

    .team {
        flex: 1 1 100% !important;
    }

    .laptop {
        display: none !important;
    }
}

.mobile {
    display: none;
}

.sea {
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 10;
}

.logo {
    border: solid 1px #BECCEB;
    width: 78px;
    height: 78px;
    object-fit: cover;
    border-radius: 100px;
}

.detail-container {
    max-width: 1200px;
    width: 100%;
    margin: 0 80px 28px 80px;
}

.list {
    min-width: 340px;
}

.list-header {
    padding: 28px;
    background-color: white;
    top: 160px;
    position: sticky;
    border: solid 1px #BECCEB;
    border-radius: 8px 8px 0 0;
    z-index: 10;
}

.list-body {
    top: 260px;
    position: sticky;
    overflow-y: scroll;
    padding: 28px;
    border: solid 1px #BECCEB;
    background-color: white;
    max-height: calc(100vh - 360px);
}

.detail {
    width: 100%;
}

.detail-header-container {
    padding-top: 160px;
    background-color: white;
    top: 0px;
    position: sticky;
    transition: padding 0.2s
}

.detail-header {
    border-radius: 8px 8px 0 0;
    padding: 28px;
    border: solid 1px #BECCEB;
    background-color: white;
    z-index: 10;
}

.detail-body {
    border-radius: 0 0 8px 8px ;
    border: solid 1px #BECCEB;
    padding: 28px;
    background-color: white;
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
