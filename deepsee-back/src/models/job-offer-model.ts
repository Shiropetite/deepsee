export type JobOffer = {
    __id: number;
    _companyId: number;
    city: string;
    contract: string;
    publishedAt: string;
    salary: string;
    title: string;
};

export type JobOfferDB = {
    city: string;
    company_id: number;
    contract: string;
    id: number;
    published_at: string;
    salary: string;
    title: string;
};
