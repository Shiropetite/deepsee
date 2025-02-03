<script lang="ts" setup>
import { getFavoriteJobs } from 'src/services/job/job-service';
import { onMounted, Ref, ref } from 'vue';

const candidacies: Ref<any> = ref({});
const kanbanColumns = [
    {
        color: '#ff2991',
        name: 'Favoris',
        status: 'FAVORITES',
    },
    {
        color: '#869aff',
        name: 'Envoyées',
        status: 'SENDED',
    },
    {
        color: '#5cbbff',
        name: 'En cours',
        status: 'IN_PROGRESS',
    },
    {
        color: '#00b487',
        name: 'Acceptées',
        status: 'ACCEPTED',
    },
    {
        color: '#ff3030',
        name: 'Refusées',
        status: 'REFUSED',
    },
];

onMounted(async () => {
    const response = await getFavoriteJobs();
    candidacies.value = response;
});
</script>

<template>
    <div class="page">
        <h2 class="mb-18">Candidatures</h2>

        <div
            v-if="candidacies"
            class="kanban row"
        >
            <div
                v-for="column of kanbanColumns"
                :key="column.status"
                class="kanban-column-container row width-100"
            >
                <div
                    class="line"
                    :style="{ 'background-color': column.color }"
                />
                <div class="kanban-column column gap-8">
                    <div
                        class="chip"
                        :style="{ 'background-color': column.color }"
                    >
                        {{ column.name }}
                    </div>

                    <div
                        v-for="candidacy of candidacies[column.status]"
                        :key="candidacy.__id"
                        class="kanban-card column gap-8"
                    >
                        <router-link
                            :to="{ name: 'job-detail', params: { id: candidacy.__id } }"
                            class="row gap-8"
                        >
                            <img
                                v-if="candidacy.companyLogo"
                                height="38"
                                width="38"
                                :src="candidacy.companyLogo"
                            >
                            <div
                                v-else
                                class="no-avatar"
                                style="height: 38px; width: 38px"
                            >
                                {{ candidacy.companyName[0].toUpperCase() }}
                            </div>

                            <div>
                                <div class="subtitle">
                                    {{ candidacy.title }}
                                </div>
                                <div>{{ candidacy.companyName }}</div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.kanban {
    padding: 18px;
    background-color: #e9ecf0;
    overflow-x: auto;
    height: calc(100vh - 220px);
    border-radius: 8px;
}

.kanban-column-container {
    min-width: 360px;
    width: 100%;
}

.kanban .line {
    border-radius: 8px;
    height: 100%;
    margin-bottom: 8px;
    width: 4px;
}

.kanban-card {
    background-color: white;
    border: solid 2px var(--light-grey);
    border-radius: 0 30px 30px 30px;
    padding: 8px;
    cursor: pointer;
    transition: all 0.2s;

    img {
        border-radius: 30px;
    }
}

.kanban-card:hover {
    background-color: #eaecee;
}

.kanban .chip {
    color: white;
    border-radius: 0 8px 8px 8px;
}

.kanban-column {
    width: 100%;
    padding: 0 8px;
}

.kanban a {
    text-decoration: none;
    color: inherit;
    font-weight: inherit;
}
</style>
