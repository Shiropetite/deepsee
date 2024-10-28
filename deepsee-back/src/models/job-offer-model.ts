export type JobOffer = {
    __id: number;
    _companyId: number;
    city: string;
    contract: string;
    dayOfRemoteWork: number;
    expectationDescription: string;
    experienceMinInYear: number;
    hardSkills: string[];
    jobDescription: string;
    maxDiploma: string;
    publishedAt: string;
    recruitmentSteps: string[];
    salaryMaxInYear: number;
    salaryMinInYear: number;
    softSkills: string[];
    teamMembers: {
        firstName: string;
        lastName: string;
        logo?: string;
        role: string;
    }[];
    title: string;
};

export type JobOfferDB = {
    city: string;
    company_id: number;
    contract: string;
    day_of_remote_work: number;
    expectation_description: string;
    experience_min_in_year: number;
    id: number;
    job_description: string;
    max_diploma: string;
    published_at: string;
    salary_max_by_year: number;
    salary_min_by_year: number;
    title: string;
};

export type JobHardSkillDB = {
    job_offer_id: number;
    name: string;
};

export type JobSoftSkillDB = {
    job_offer_id: number;
    name: string;
};

export type JobRecruitmentStepDB = {
    job_offer_id: number;
    name: string;
    time_in_minute: number
};

export type JobTeamMemberDB = {
    first_name: string;
    job_offer_id: number;
    last_name: string;
    logo?: string;
    role: string;
};
