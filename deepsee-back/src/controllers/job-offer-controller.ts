import { Request, Response } from 'express';

import { fetchCompanyAdvantages, fetchCompanyById, fetchCompanyLogo } from '../repositories/company-repository';
import {
    fetchJobOfferById,
    fetchJobOffersByFilters,
    getJobOfferHardSkills,
    getJobRecruitmentSteps,
    getJobSoftSkills,
    getJobTeamMembers,
} from '../repositories/job-offer-repository';

export type getJobOffersByFiltersParams = {
    city: string;
    companyName: string;
    companySector: string;
    contract: string;
    jobTitle: string;
    minSalary: string;
};

export type getJobOffersByFiltersResponse = {
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
            companyLogo: fetchCompanyLogo({ companyName: company.name }),
            companyName: company.name,
        };
    })) as getJobOffersByFiltersResponse;

    res.json(jobOffersWithCompany);
};

export const getJobOfferById = async (req: Request, res: Response): Promise<void> => {
    const jobId = parseInt(req.params.id, 10);
    const jobOffer = await fetchJobOfferById({ id: jobId });

    if (!jobOffer) {
        res.status(404).json({ error: 'Job offer not found' });
        return;
    }

    const company = await fetchCompanyById({ companyId: jobOffer._companyId });

    if (!company) {
        res.status(404).json({ error: 'Company not found' });
        return;
    }

    res.json({
        ...jobOffer,
        companyAdvantages: await fetchCompanyAdvantages({ companyId: company.__id }),
        companyDescription: company.description,
        companyLogo: fetchCompanyLogo({ companyName: company.name }),
        companyName: company.name,
        companyNumberOfEmployees: company.numberOfEmployee,
        companySector: company.sector,
        hardSkills: await getJobOfferHardSkills({ jobOfferId: jobOffer.__id }),
        recruitmentSteps: await getJobRecruitmentSteps({ jobId: jobOffer.__id }),
        softSkills: await getJobSoftSkills({ jobId: jobOffer.__id }),
        teamMembers: await getJobTeamMembers({ jobId: jobOffer.__id }),
    });
};

