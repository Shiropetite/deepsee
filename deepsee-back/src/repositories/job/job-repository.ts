import { getJobsByFilterQuery } from '../../controllers/job/job-types';
import { client } from '../../database';
import { FavoriteJob, Job, JobDB, JobRecruitmentStep, JobTeamMember } from '../../models/job-model';

import {
    parseFavoriteJob,
    parseJob, parseJobHardSkills, parseJobRecruitmentStep, parseJobSoftSkills, parseJobTeamMember } from './job-parser';

/**
 * Récupères les offres d'emplois en BDD en fonction des filtres
 * @param searchFilters - Filtres de recherche
 * @param offset - Page a laquelle on veut commencer
 * @param limit - Nombre d'offres d'emplois a récupérer
 * @returns Les offres d'emplois en BDD
 */
export const fetchJobsByFilters = async (
    {
        limit,
        page,
        searchFilters,
    }: {
        limit: number,
        page: number,
        searchFilters: getJobsByFilterQuery,
    },
): Promise<Job[]> => {
    const queryList = [`
        SELECT
         city,
         company_id,
         contract,
         id,
         published_at,
         salary_max_by_year,
         salary_min_by_year,
         title,
         CASE 
            WHEN published_at >= NOW() - INTERVAL '1 day' THEN 'today'
            WHEN published_at >= NOW() - INTERVAL '1 week' THEN 'thisWeek'
            WHEN published_at >= NOW() - INTERVAL '1 month' THEN 'thisMonth'
            ELSE 'older'
        END AS date_range 
        FROM job_offer
    `];
    const whereList = [];

    if (searchFilters.city) {
        whereList.push(`unaccent(city) ILIKE unaccent('%${searchFilters.city}%')`);
    }

    if (searchFilters.companyName) {
        queryList.push('JOIN company ON job_offer.company_id = company.id');
        whereList.push(`unaccent(company.name) ILIKE unaccent('%${searchFilters.companyName}%')`);
    }

    if (searchFilters.companySector) {
        queryList.push('JOIN company ON job_offer.company_id = company.id');
        whereList.push(`unaccent(company.sector) ILIKE unaccent('%${searchFilters.companySector}%')`);
    }

    if (searchFilters.contract) {
        whereList.push(`contract = '${searchFilters.contract}'`);
    }

    if (searchFilters.minSalary) {
        whereList.push(`salary_min_by_year >= '${searchFilters.minSalary}'`);
    }

    if (searchFilters.jobTitle) {
        whereList.push(`unaccent(title) ILIKE unaccent('%${searchFilters.jobTitle}%')`);
    }

    let query = queryList.join(' ');
    if (whereList.length > 0) {
        query += ` WHERE ${whereList.join(' AND ')}`;
    }

    query += ` order by published_at DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`;

    return await Promise.all((await client.query(
        query,
    )).rows.map((queryResult: JobDB) => parseJob({ queryResult })));
};

/**
 * Récupères les offres d'emplois en BDD en fonction des filtres
 * @param searchFilters - Filtres de recherche
 * @param offset - Page a laquelle on veut commencer
 * @param limit - Nombre d'offres d'emplois a récupérer
 * @returns Les offres d'emplois en BDD
 */
export const countFetchedJobsByFilters = async (
    { searchFilters }: { searchFilters: getJobsByFilterQuery },
): Promise<number> => {
    const queryList = [`
        SELECT COUNT(*) as total
        FROM job_offer
    `];
    const whereList = [];

    if (searchFilters.city) {
        whereList.push(`unaccent(city) ILIKE unaccent('%${searchFilters.city}%')`);
    }

    if (searchFilters.companyName) {
        queryList.push('JOIN company ON job_offer.company_id = company.id');
        whereList.push(`unaccent(company.name) ILIKE unaccent('%${searchFilters.companyName}%')`);
    }

    if (searchFilters.companySector) {
        queryList.push('JOIN company ON job_offer.company_id = company.id');
        whereList.push(`unaccent(company.sector) ILIKE unaccent('%${searchFilters.companySector}%')`);
    }

    if (searchFilters.contract) {
        whereList.push(`contract = '${searchFilters.contract}'`);
    }

    if (searchFilters.minSalary) {
        whereList.push(`salary_min_by_year >= '${searchFilters.minSalary}'`);
    }

    if (searchFilters.jobTitle) {
        whereList.push(`unaccent(title) ILIKE unaccent('%${searchFilters.jobTitle}%')`);
    }

    let query = queryList.join(' ');
    if (whereList.length > 0) {
        query += ` WHERE ${whereList.join(' AND ')}`;
    }

    return parseInt((await client.query(
        query,
    )).rows[0].total);
};

/**
 * Récupère une offre d'emploi en BDD par son identifiant.
 * @param jobId - Identifiant de l'offre d'emploi
 * @returns L'offre d'emploi en BDD
 */
export const fetchJobById = async ({ jobId }: { jobId: number }): Promise<Job | undefined> => {
    const queryResult = (await client.query(
        'SELECT * FROM job_offer WHERE id = $1',
        [jobId],
    )).rows[0];

    return queryResult ? parseJob({ queryResult }) : undefined;
};

/**
 * Récupère les compétences techniques d'une offre d'emploi en BDD.
 * @param jobId - Identifiant de l'offre d'emploi
 * @returns Les compétences techniques de l'offre d'emploi en BDD
 */
export const fetchJobHardSkills = async ({ jobId }: { jobId: number }): Promise<string[]> => {
    const queryResult = await client.query(
        'SELECT * FROM job_hard_skill WHERE job_offer_id = $1',
        [jobId],
    );

    return queryResult.rows.map((row) => parseJobHardSkills({ queryResult: row }));
};

/**
 * Récupère les compétences comportementales d'une offre d'emploi en BDD.
 * @param jobId - Identifiant de l'offre d'emploi
 * @returns Les compétences comportementales de l'offre d'emploi en BDD
 */
export const fetchJobSoftSkills = async ({ jobId }: { jobId: number }): Promise<string[]> => {
    const queryResult = await client.query(
        'SELECT * FROM job_soft_skill WHERE job_offer_id = $1',
        [jobId],
    );

    return queryResult.rows.map((row) => parseJobSoftSkills({ queryResult: row }));
};

/**
 * Récupère les étapes de recrutement d'une offre d'emploi en BDD.
 * @param jobId - Identifiant de l'offre d'emploi
 * @returns Les compétences comportementales de l'offre d'emploi en BDD
 */
export const fetchJobRecruitmentSteps = async ({ jobId }: { jobId: number }): Promise<JobRecruitmentStep[]> => {
    const queryResult = await client.query(
        'SELECT * FROM job_recruitment_step WHERE job_offer_id = $1',
        [jobId],
    );

    return queryResult.rows.map((row) => parseJobRecruitmentStep({ queryResult: row }));
};

/**
 * Récupère les membres de l'équipe d'une offre d'emploi en BDD.
 * @param jobId - Identifiant de l'offre d'emploi
 * @returns Les membres de l'équipe de l'offre d'emploi en BDD
 */
export const fetchJobTeamMembers = async ({ jobId }: { jobId: number }): Promise<JobTeamMember[]> => {
    const queryResult = await client.query(
        'SELECT * FROM job_team_member WHERE job_offer_id = $1',
        [jobId],
    );

    return queryResult.rows.map((row) => parseJobTeamMember({ queryResult: row }));
};

export const fetchFavoriteJobsFromUser = async ({ userId }: { userId: number }): Promise<FavoriteJob[]> => {
    const queryResult = await client.query(
        'SELECT * FROM favorite_job WHERE user_id = $1',
        [userId],
    );

    return queryResult.rows.map((row) => parseFavoriteJob({ queryResult: row }));
};

/**
 * Récupère le favoris d'un utilisateur pour une offre d'emploi si elle existe.
 * @param jobId - Identifiant de l'offre d'emploi
 * @param userId - Identifiant de l'utilisateur
 * @returns Le favoris
 */
export const fetchFavoriteJob = async (
    { jobId, userId }: { jobId: number, userId: number },
): Promise<FavoriteJob | undefined> => {
    const queryResult = await client.query(
        'SELECT * FROM favorite_job WHERE job_id = $1 AND user_id = $2',
        [jobId, userId],
    );

    return queryResult.rows[0] ? parseFavoriteJob({ queryResult: queryResult.rows[0] }) : undefined;
};

/**
 * Ajouter un job dans la liste des favoris d'un utilisateur
 * @param jobId - Identifiant de l'offre d'emploi
 * @param userId - Identifiant de l'utilisateur
 * @returns Le favoris ajouté
 */
export const createFavoriteJob = async ({ jobId, userId }: { jobId: number, userId: number }) => {
    const queryResult = await client.query(
        'INSERT INTO favorite_job (job_id, user_id) VALUES ($1, $2) RETURNING *',
        [jobId, userId],
    );

    return parseFavoriteJob({ queryResult: queryResult.rows[0] });
};

/**
 * Enlever un job dans la liste des favoris d'un utilisateur
 * @param jobId - Identifiant de l'offre d'emploi
 * @param userId - Identifiant de l'utilisateur
 * @returns Le favoris supprimé
 */
export const deleteFavoriteJob = async ({ jobId, userId }: { jobId: number, userId: number }) => {
    const queryResult = await client.query(
        'DELETE FROM favorite_job WHERE job_id = $1 AND user_id = $2 RETURNING *',
        [jobId, userId],
    );

    return parseFavoriteJob({ queryResult: queryResult.rows[0] });
};
