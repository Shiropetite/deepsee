import { client } from '../database';

export const getAllJobOffersFromDB = async (): Promise<any[]> => {
    return await Promise.all((await client.query(
        'SELECT * FROM job_offer;',
    )).rows.map((queryResult: any) => parseJobOffer({ queryResult })));
};

const parseJobOffer = ({ queryResult }: { queryResult: any }): any => ({
    __id: queryResult.id,
    companyLogo: queryResult.company_logo,
    companyName: queryResult.company_name,
    contract: queryResult.contract,
    date: queryResult.date,
    location: queryResult.location,
    salary: queryResult.salary,
    title: queryResult.title,
});
