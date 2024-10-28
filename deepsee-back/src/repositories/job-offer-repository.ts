import { getJobOffersByFiltersParams } from '../controllers/job-offer-controller';
import { client } from '../database';
import { JobOffer, JobOfferDB } from '../models/job-offer-model';

const parseJobOffer = ({ queryResult }: { queryResult: JobOfferDB }): JobOffer => ({
    __id: queryResult.id,
    _companyId: queryResult.company_id,
    city: queryResult.city,
    contract: queryResult.contract,
    dayOfRemoteWork: queryResult.day_of_remote_work,
    expectationDescription: queryResult.expectation_description,
    experienceMinInYear: queryResult.experience_min_in_year,
    hardSkills: [],
    jobDescription: queryResult.job_description,
    maxDiploma: queryResult.max_diploma,
    publishedAt: queryResult.published_at,
    recruitmentSteps: [],
    salaryMaxInYear: queryResult.salary_max_by_year,
    salaryMinInYear: queryResult.salary_min_by_year,
    softSkills: [],
    teamMembers: [],
    title: queryResult.title,
});

export const fetchJobOffersByFilters = async (
    { searchFilters }: { searchFilters: getJobOffersByFiltersParams }
): Promise<JobOffer[]> => {
    const queryList = ['SELECT * FROM job_offer'];
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

    query += ' order by published_at desc';

    return await Promise.all((await client.query(
        query,
    )).rows.map((queryResult: JobOfferDB) => parseJobOffer({ queryResult })));
};

export const fetchJobOfferById = async ({ id }: { id: number }): Promise<JobOffer | undefined> => {
    const queryResult = (await client.query(
        'SELECT * FROM job_offer WHERE id = $1',
        [id],
    )).rows[0];

    return queryResult ? parseJobOffer({ queryResult }) : undefined;
};

export const getJobOfferHardSkills = async ({ jobOfferId }: { jobOfferId: number }): Promise<string[]> => {
    const queryResult = await client.query(
        'SELECT * FROM job_hard_skill WHERE job_offer_id = $1',
        [jobOfferId],
    );

    return queryResult.rows.map((row) => row.name);
};

export const getJobSoftSkills = async ({ jobId }: { jobId: number }): Promise<string[]> => {
    const queryResult = await client.query(
        'SELECT * FROM job_soft_skill WHERE job_offer_id = $1',
        [jobId],
    );

    return queryResult.rows.map((row) => row.name);
};

export const getJobRecruitmentSteps = async ({ jobId }: { jobId: number }): Promise<any[]> => {
    const queryResult = await client.query(
        'SELECT * FROM job_recruitment_step WHERE job_offer_id = $1',
        [jobId],
    );

    return queryResult.rows.map((row) => ({
        name: row.name,
        timeInMinute: row.time_in_minute,
    }));
};

export const getJobTeamMembers = async ({ jobId }: { jobId: number }): Promise<any[]> => {
    const queryResult = await client.query(
        'SELECT * FROM job_team_member WHERE job_offer_id = $1',
        [jobId],
    );

    return queryResult.rows.map((row) => ({
        firstName: row.first_name,
        lastName: row.last_name,
        logo: row.logo,
        role: row.role,
    }));
};
