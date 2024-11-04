<script lang="ts" setup>
import { GetJobByIdResponse } from 'src/services/job-type';
import { formatSalary } from 'src/utils/salary-utils';
import { formatTimeElapsedSince } from 'src/utils/time-utils';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const companyDescriptionSeeMore = ref(false);
const jobDescriptionSeeMore = ref(false);
const expectationDescriptionSeeMore = ref(false);

defineProps<{
    goToSearch: () => void;
    isLoading: boolean
    job: GetJobByIdResponse;
}>();

watch(() => route.fullPath, async () => {
    companyDescriptionSeeMore.value = false;
    jobDescriptionSeeMore.value = false;
    expectationDescriptionSeeMore.value = false;
});
</script>

<template>
    <skeleton-card
        v-if="isLoading || !job"
        class="skeleton"
        height="100vh"
        width="100%"
    />

    <div
        v-else
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
                        {{ formatTimeElapsedSince(job.publishedAt) }}
                    </div>
                </div>

                <div class="row justify-between mb-18">
                    <div class="row gap-28 align-center">
                        <img
                            class="logo"
                            :src="job.companyLogo"
                        >

                        <div>
                            <h2 class="mb-2">
                                {{ job.title }}
                            </h2>

                            <div>
                                {{ job.companyName }}
                            </div>
                        </div>
                    </div>

                    <div class="laptop">
                        {{ formatTimeElapsedSince(job.publishedAt) }}
                    </div>
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
                        {{ job.contract }}
                    </div>

                    <div class="chip border grey">
                        {{ job.city }}
                    </div>

                    <div class="chip border grey">
                        {{ formatSalary(job) }}
                    </div>

                    <div class="chip border grey">
                        {{ job.dayOfRemoteWork }} jours de télétravail / semaine
                    </div>

                    <div class="chip border grey">
                        {{ job.experienceMinInYear }} an d'expérience
                    </div>

                    <div class="chip border grey">
                        {{ job.maxDiploma }}
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
                    {{ job.companyDescription }}
                </div>

                <div class="row wrap gap-8 mb-12">
                    <div class="chip border grey">
                        {{ job.companySector }}
                    </div>

                    <div class="chip border grey">
                        {{ job.companyNumberOfEmployees }} employées
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
                    {{ job.jobDescription }}
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
                        v-for="skill in job.hardSkills"
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
                    {{ job.expectationDescription }}
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
                        v-for="skill in job.softSkills"
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
                        v-for="step in job.recruitmentSteps"
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
                        v-for="member in job.teamMembers"
                        :key="member.lastName"
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
                        v-for="advantage in job.companyAdvantages"
                        :key="advantage"
                        class="chip border grey"
                    >
                        {{ advantage }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media (max-width: 900px) {
    .detail-header-container {
        padding-top: 56px !important;
    }

    .detail-body {
        padding: 18px !important;
    }

    .team {
        flex: 1 1 100% !important;
    }
}

.skeleton {
    margin-top: 160px;
}

.logo {
    border: solid 1px #BECCEB;
    border-radius: 100px;
    object-fit: cover;
    height: 78px;
    width: 78px;
}

.detail {
    width: 100%;
}

.detail-header-container {
    background-color: white;
    padding-top: 160px;
    position: sticky;
    top: 0px;
    transition: padding 0.2s
}

.detail-header {
    background-color: white;
    border: solid 1px #BECCEB;
    border-radius: 8px 8px 0 0;
    padding: 28px;
    z-index: 10;
}

.detail-body {
    background-color: white;
    border: solid 1px #BECCEB;
    border-radius: 0 0 8px 8px ;
    padding: 28px;
}

.description {
    display: -webkit-box;
    line-clamp: 5;
    overflow: hidden;
    text-align: justify;
    text-overflow: ellipsis;
    white-space: pre-line;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
}

.all {
    line-clamp: unset;
    -webkit-line-clamp: unset;
}

.avatar {
    background-color: var(--accent-1);
    border-radius: 100px;
    height: 42px;
    object-fit: cover;
    width: 42px;
}

.team {
    flex: 0 1 calc(50% - 8px);
}
</style>
