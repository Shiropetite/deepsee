// #region --- Models
export type Job = {
    __id: number;
    _companyId: number;
    city: string;
    contract: string;
    dayOfRemoteWork: number;
    expectationDescription: string;
    experienceMinInYear: number;
    hardSkills?: string[];
    jobDescription: string;
    maxDiploma: string;
    publishedAt: string;
    recruitmentSteps?: JobRecruitmentStep[];
    salaryMaxInYear: number;
    salaryMinInYear: number;
    softSkills?: string[];
    teamMembers?: JobTeamMember[];
    title: string;
};

export type JobRecruitmentStep = {
    name: string;
    timeInMinute: number;
};

export type JobTeamMember = {
    firstName: string;
    lastName: string;
    role: string;
};
// #endregion

// #region --- Database models
export type JobDB = {
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
// #endregion
