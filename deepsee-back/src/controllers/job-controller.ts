import { Request, Response } from 'express';
import {
    fetchCompanyAdvantages,
    fetchCompanyById,
    fetchCompanyLogo,
} from 'src/repositories/company/company-repository';
import {
    fetchJobById,
    fetchJobsByFilters,
    getJobHardSkills,
    getJobRecruitmentSteps,
    getJobSoftSkills,
    getJobTeamMembers,
} from 'src/repositories/job/job-repository';

import { getJobByIdResponse, getJobsByFilterQuery, getJobsByFilterResponse } from './job-types';

/**
 * Récupères les offres d'emplois en fonction des filtres.
 * @param req - Requête.
 * @param res - Réponse.
 */
export const getJobsByFilters = async (req: Request, res: Response): Promise<void> => {
    const searchFilters = req.query as getJobsByFilterQuery;

    const jobs = await fetchJobsByFilters({ searchFilters });

    const response = await Promise.all(jobs.map(async (job) => {
        const company = await fetchCompanyById({ companyId: job._companyId });

        if (!company) {
            return job;
        }

        return {
            ...job,
            companyLogo: fetchCompanyLogo({ companyName: company.name }),
            companyName: company.name,
        };
    })) as getJobsByFilterResponse;

    res.json(response);
};

/**
 * Récupère une offre d'emploi par son identifiant.
 * @param req - Requête.
 * @param res - Réponse.
 */
export const getJobById = async (req: Request, res: Response): Promise<void> => {
    const jobId = parseInt(req.params.id, 10);
    const job = await fetchJobById({ jobId });

    if (!job) {
        res.status(404).json({ error: 'Job offer not found' });
        return;
    }

    const company = await fetchCompanyById({ companyId: job._companyId });

    if (!company) {
        res.status(404).json({ error: 'Company not found' });
        return;
    }

    res.json({
        ...job,
        companyAdvantages: await fetchCompanyAdvantages({ companyId: company.__id }),
        companyDescription: company.description,
        companyLogo: fetchCompanyLogo({ companyName: company.name }),
        companyName: company.name,
        companyNumberOfEmployees: company.numberOfEmployee,
        companySector: company.sector,
        hardSkills: await getJobHardSkills({ jobId: job.__id }),
        recruitmentSteps: await getJobRecruitmentSteps({ jobId: job.__id }),
        softSkills: await getJobSoftSkills({ jobId: job.__id }),
        teamMembers: await getJobTeamMembers({ jobId: job.__id }),
    } as getJobByIdResponse);
};
