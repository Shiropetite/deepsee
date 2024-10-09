import { Request, Response } from 'express';

import { fetchCompanyById } from '../repositories/company-repository';
import { fetchJobOffersByFilters } from '../repositories/job-offer-repository';

export type getJobOffersByFiltersParams = {
    city: string;
    companyName: string;
    contract: string;
    jobTitle: string;
};

export type getJobOffersByFiltersResponse = {
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

export const getJobOffersByFilters = async (req: Request, res: Response): Promise<void> => {
    const searchFilters = req.query as getJobOffersByFiltersParams;

    const jobOffers = await fetchJobOffersByFilters({ searchFilters });
    const jobOffersWithCompany = await Promise.all(jobOffers.map(async (jobOffer) => {
        const company = await fetchCompanyById({ companyId: jobOffer._companyId });

        if (!company) {
            return jobOffer;
        }

        return {
            ...jobOffer,
            companyLogo: company.logo,
            companyName: company.name,
        };
    })) as getJobOffersByFiltersResponse;

    res.json(jobOffersWithCompany);
};
