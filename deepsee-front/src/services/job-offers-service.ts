import api from '../axios';

export type SearchJobOffersFilter = {
    city: string;
    companyName: string;
    contract: string;
    jobTitle: string;
};

export type JobOffersByFilters = {
    __id: number;
    _companyId: number;
    city: string;
    companyLogo: string;
    companyName: string;
    contract: string;
    publishedAt: string;
    salary: string;
    title: string;
}[];

export const getJobOffersByFilters = async (
    { searchFilters }: { searchFilters: SearchJobOffersFilter },
): Promise<JobOffersByFilters> => {
    const response = await api.get('/job-offers', { params: searchFilters });
    return response.data;
};
