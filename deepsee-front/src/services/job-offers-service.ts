import api from '../axios';

export type SearchJobOffersFilter = {
    city: string;
    companyName: string;
    companySector: string;
    contract: string;
    jobTitle: string;
    minSalary: string;
};

export type JobOffersByFilters = {
    __id: number;
    _companyId: number;
    city: string;
    companyLogo: string;
    companyName: string;
    contract: string;
    publishedAt: string;
    salaryMaxInYear: number;
    salaryMinInYear: number;
    title: string;
}[];

export const getJobOffersByFilters = async (
    { searchFilters }: { searchFilters: SearchJobOffersFilter },
): Promise<JobOffersByFilters> => {
    const response = await api.get('/job-offers', { params: searchFilters });
    return response.data;
};

export const getJobOfferById = async ({ id }: { id: number }): Promise<any> => {
    const response = await api.get(`/job-offers/${id}`);
    return response.data;
};
