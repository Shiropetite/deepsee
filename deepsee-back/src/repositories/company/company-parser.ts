import { Company, CompanyAdvantageDB, CompanyDB } from '../../models/company-model';

/**
 * Parse une CompanyDB en Company
 * @param queryResult - CompanyDB
 * @returns Company
 */
export const parseCompany = ({ queryResult }: { queryResult: CompanyDB }): Company => ({
    __id: queryResult.id,
    description: queryResult.description,
    logo: queryResult.logo,
    name: queryResult.name,
    numberOfEmployee: queryResult.number_of_employee,
    sector: queryResult.sector,
});

/**
 * Parse un CompanyAdvantageDB en string
 * @param queryResult - CompanyAdvantageDB
 * @returns string
 */
export const parseCompanyAdvantages = (
    { queryResult }: { queryResult: CompanyAdvantageDB }
): string => queryResult.name;
