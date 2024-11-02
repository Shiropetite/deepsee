import api from '../axios';

import { GetJobByIdResponse, GetJobsByFiltersResponse, SearchJobsFilter } from './job-type';

/**
 * Récupère les offres d'emploi en fonction des filtres de recherche
 * @param searchFilters - Les filtres de recherche
 * @returns Les offres d'emploi
 */
export const getJobsByFilters = async (
    { searchFilters }: { searchFilters: SearchJobsFilter },
): Promise<GetJobsByFiltersResponse[]> => {
    const response = await api.get('/job-offers', { params: searchFilters });
    return response.data;
};

/**
 * Récupère une offre d'emploi par son identifiant
 * @param id - L'identifiant de l'offre d'emploi
 * @returns L'offre d'emploi
 */
export const getJobById = async ({ id }: { id: number }): Promise<GetJobByIdResponse> => {
    const response = await api.get(`/job-offers/${id}`);
    return response.data;
};
