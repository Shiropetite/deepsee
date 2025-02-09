import api from '../../config/axios';

import { GetJobByIdResponse, GetJobsByFiltersResponse, SearchJobsFilter } from './job-type';

/**
 * Récupère les offres d'emploi en fonction des filtres de recherche
 * @param searchFilters - Les filtres de recherche
 * @returns Les offres d'emploi
 */
export const getJobsByFilters = async (
    {
        page,
        searchFilters,
    }: {
        page: number,
        searchFilters: SearchJobsFilter,
    },
): Promise<GetJobsByFiltersResponse> => {
    const response = await api.get('/jobs', { params: {
        ...searchFilters,
        limit: 20,
        page,
    } });
    return response.data;
};

/**
 * Récupère une offre d'emploi par son identifiant
 * @param id - L'identifiant de l'offre d'emploi
 * @returns L'offre d'emploi
 */
export const getJobById = async ({ id }: { id: number }): Promise<GetJobByIdResponse> => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
};

export const getFavoriteJobs = async (): Promise<void> => {
    const response = await api.get('/jobs/board');
    return response.data;
};

export const postJobToFavorite = async ({ jobId }: { jobId: number }): Promise<void> => {
    const response = await api.post('/jobs/favorite', { jobId });
    return response.data;
};

export const deleteJobToFavorite = async ({ jobId }: { jobId: number }): Promise<void> => {
    const response = await api.delete(`/jobs/favorite/${jobId}`);
    return response.data;
};
