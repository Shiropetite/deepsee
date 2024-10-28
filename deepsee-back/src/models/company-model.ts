export type Company = {
    __id: number;
    advantages: string[];
    description: string;
    logo: string;
    name: string;
    numberOfEmployee: number;
    sector: string;
};

export type CompanyDB = {
    description: string;
    id: number;
    logo: string;
    name: string;
    number_of_employee: number;
    sector: string;
};

export type CompanyAdvantageDB = {
    company_id: number;
    name: string;
};
