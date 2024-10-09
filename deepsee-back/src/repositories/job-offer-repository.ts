import { getJobOffersByFiltersParams } from '../controllers/job-offer-controller';
import { client } from '../database';
import { JobOffer, JobOfferDB } from '../models/job-offer-model';

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

    if (searchFilters.contract) {
        whereList.push(`contract = '${searchFilters.contract}'`);
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

const parseJobOffer = ({ queryResult }: { queryResult: JobOfferDB }): JobOffer => ({
    __id: queryResult.id,
    _companyId: queryResult.company_id,
    city: queryResult.city,
    contract: queryResult.contract,
    publishedAt: queryResult.published_at,
    salary: queryResult.salary,
    title: queryResult.title,
});
