import { Request, Response } from 'express';

import {
    fetchCompanyAdvantages,
    fetchCompanyById,
    fetchCompanyLogo,
} from '../../repositories/company/company-repository';
import {
    countFetchedJobsByFilters,
    fetchJobById,
    fetchJobsByFilters,
    fetchJobHardSkills,
    fetchJobRecruitmentSteps,
    fetchJobSoftSkills,
    fetchJobTeamMembers,
    createFavoriteJob,
    deleteFavoriteJob,
    fetchFavoriteJob,
    fetchFavoriteJobsFromUser,
} from '../../repositories/job/job-repository';

import { getJobByIdResponse, getJobsByFilterQuery, getJobsByFilterResponse } from './job-types';

/**
 * Récupères les offres d'emplois en fonction des filtres.
 * @param req - Requête.
 * @param res - Réponse.
 */
export const getJobsByFilters = async (req: Request, res: Response): Promise<void> => {
    const { page = '1', limit = 20 } = req.query as { limit?: number, page?: string };
    const currentPage = parseInt(page, 10);
    const searchFilters = req.query as getJobsByFilterQuery;

    const maxItems = await countFetchedJobsByFilters({
        searchFilters,
    });

    const jobs = await fetchJobsByFilters({
        limit,
        page: currentPage,
        searchFilters,
    });

    const jobsWithCompanies = await Promise.all(jobs.map(async (job) => {
        const company = await fetchCompanyById({ companyId: job._companyId });

        if (!company) {
            return job;
        }

        return {
            ...job,
            companyLogo: fetchCompanyLogo({ companyName: company.name }),
            companyName: company.name,
        };
    }));

    if (req.user) {
        const favoritesJobs = await fetchFavoriteJobsFromUser({ userId: req.user.id });

        jobsWithCompanies.forEach((job) => {
            const favoriteJob = favoritesJobs.find((favoriteJob) => favoriteJob._jobId === job.__id);
            if (favoriteJob) {
                job.isFavorite = true;
            }
        });
    }

    const response = jobsWithCompanies.reduce((acc: any, job: any) => {
        (acc[job.dateRange] = acc[job.dateRange] || []).push({
            ...job,
            dateRange: undefined,
        });
        return acc;
    }, {}) as getJobsByFilterResponse;

    res.json({
        currentPage: currentPage,
        data: response,
        maxItems,
        maxPages: Math.ceil(maxItems / limit),
    });
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

    // Si l'utilisateur est connecté, verifie si l'offre est dans ses favoris
    let isFavorite = false;
    if (req.user) {
        isFavorite = !!(await fetchFavoriteJob({ jobId, userId: req.user.id }));
    }

    res.json({
        ...job,
        companyAdvantages: await fetchCompanyAdvantages({ companyId: company.__id }),
        companyDescription: company.description,
        companyLogo: fetchCompanyLogo({ companyName: company.name }),
        companyName: company.name,
        companyNumberOfEmployees: company.numberOfEmployee,
        companySector: company.sector,
        hardSkills: await fetchJobHardSkills({ jobId: job.__id }),
        isFavorite,
        recruitmentSteps: await fetchJobRecruitmentSteps({ jobId: job.__id }),
        softSkills: await fetchJobSoftSkills({ jobId: job.__id }),
        teamMembers: await fetchJobTeamMembers({ jobId: job.__id }),
    } as getJobByIdResponse);
};

export const getBoard = async (req: Request, res: Response): Promise<void> => {
    const token = req.user;
    if (!(token)) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const favorite = await fetchFavoriteJobsFromUser({ userId: token.id });

    const jobs = await Promise.all(favorite.map(async (job) => {
        return await fetchJobById({ jobId: job._jobId });
    }));

    const jobsWithCompanies = await Promise.all(jobs.map(async (job) => {
        if (!job) { return job; }

        const company = await fetchCompanyById({ companyId: job._companyId });

        if (!company) {
            return job;
        }

        return {
            ...job,
            companyLogo: fetchCompanyLogo({ companyName: company.name }),
            companyName: company.name,
        };
    }));

    res.json({
        FAVORITES: jobsWithCompanies,
    });
};

/**
 * Ajoute une offre d'emploi aux favoris d'un utilisateur
 * @param req - Requête.
 * @param res - Réponse.
 */
export const postJobToFavorite = async (req: Request, res: Response): Promise<void> => {
    const token = req.user;
    if (!(token)) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const userId = token.id;
    const jobId = parseInt(req.body.jobId, 10);

    const favorite = createFavoriteJob({ jobId, userId });
    if (!favorite) {
        res.status(500).json({ error: 'Internal server error' });
        return;
    }

    res.json(favorite);
};

/**
 * Enleve une offre d'emploi aux favoris d'un utilisateur
 * @param req - Requête.
 * @param res - Réponse.
 */
export const deleteJobToFavorite = async (req: Request, res: Response): Promise<void> => {
    const token = req.user;
    if (!(token)) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const userId = token.id;
    const jobId = parseInt(req.params.jobId, 10);

    const favorite = deleteFavoriteJob({ jobId, userId });
    if (!favorite) {
        res.status(500).json({ error: 'Internal server error' });
        return;
    }

    res.json(favorite);
};
