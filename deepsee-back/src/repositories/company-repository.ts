import { client } from '../database';
import { Company, CompanyDB } from '../models/company-model';

const parseCompany = ({ queryResult }: { queryResult: CompanyDB }): Company => ({
    __id: queryResult.id,
    advantages: [],
    description: queryResult.description,
    logo: queryResult.logo,
    name: queryResult.name,
    numberOfEmployee: queryResult.number_of_employee,
    sector: queryResult.sector,
});

export const fetchCompanyById = async (
    { companyId }: { companyId: number }
): Promise<Company | undefined> => {
    const queryResult = (await client.query('SELECT * FROM company WHERE id = $1', [companyId])).rows[0];

    return queryResult ? parseCompany({ queryResult }) : undefined;
};

export const fetchCompanyAdvantages = async (
    { companyId }: { companyId: number }
): Promise<string[]> => {
    const queryResult = await client.query(
        'SELECT * FROM company_avantage WHERE company_id = $1',
        [companyId],
    );

    return queryResult.rows.map((row) => row.name);
};

export const fetchCompanyLogo = ({ companyName }: { companyName: string }) => {
    return `${
        process.env.ENV === 'local' ?
            'http://localhost:3000' :
            process.env.DOMAIN }/api/files/${companyName.toLowerCase().split(' ').join('_')}.png`;
};
