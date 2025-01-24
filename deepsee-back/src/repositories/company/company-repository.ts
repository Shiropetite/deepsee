import { client } from '../../database';
import { Company } from '../../models/company-model';

import { parseCompany, parseCompanyAdvantages } from './company-parser';

/**
 * Récupère une entreprise en BDD en fonction de son id
 * @param companyId - Id de l'entreprise
 * @returns L'entreprise en BDD
 */
export const fetchCompanyById = async (
    { companyId }: { companyId: number },
): Promise<Company | undefined> => {
    const queryResult = (await client.query('SELECT * FROM company WHERE id = $1', [companyId])).rows[0];

    return queryResult ? parseCompany({ queryResult }) : undefined;
};

/**
 * Récupère les avantages de l'entreprise en BDD en fonction de son id
 * @param companyId - Id de l'entreprise
 * @returns Les avantages de l'entreprise en BDD
 */
export const fetchCompanyAdvantages = async (
    { companyId }: { companyId: number },
): Promise<string[]> => {
    const queryResult = await client.query(
        'SELECT * FROM company_avantage WHERE company_id = $1',
        [companyId],
    );

    return queryResult.rows.map((row) => parseCompanyAdvantages({ queryResult: row }));
};

/**
 * Construit l'url du logo de l'entreprise
 * @param companyName - Nom de l'entreprise
 * @returns L'url du logo de l'entreprise
 */
export const fetchCompanyLogo = ({ companyName }: { companyName: string }) => {
    return `${
        process.env.ENV === 'local' ?
            'http://localhost:3000' :
            process.env.DOMAIN }/api/files/${companyName.toLowerCase().split(' ').join('_')}.png`;
};
