import { client } from '../database';
import { Company, CompanyDB } from '../models/company-model';

export const fetchCompanyById = async (
    { companyId }: { companyId: number }
): Promise<Company | undefined> => {
    const queryResult = (await client.query('SELECT * FROM company WHERE id = $1', [companyId])).rows[0];

    return queryResult ? parseCompany({ queryResult }) : undefined;
};

const parseCompany = ({ queryResult }: { queryResult: CompanyDB }): Company => ({
    __id: queryResult.id,
    logo: queryResult.logo,
    name: queryResult.name,
});
