// #region --- GetJobByFilters
export type SearchJobsFilter = {
  city: string;
  companyName: string;
  companySector: string;
  contract: string;
  jobTitle: string;
  minSalary: string;
};

export type GetJobsByFiltersResponse = {
    currentPage: number;
    data: {
        older?: GetJobsByFiltersResponseItem[];
        thisMonth?: GetJobsByFiltersResponseItem[];
        thisWeek?: GetJobsByFiltersResponseItem[];
        today?: GetJobsByFiltersResponseItem[];
    }
    maxItems: number;
    maxPages: number;
}

export type GetJobsByFiltersResponseItem = {
  __id: number;
  _companyId: number;
  city: string;
  companyLogo: string;
  companyName: string;
  contract: string;
  publishedAt: string;
  salaryMaxInYear: number;
  salaryMinInYear: number;
  title: string;
};
// #endregion

// #region --- GetJobById
export type GetJobByIdResponse = {
  __id: number;
  _companyId: number;
  city: string;
  companyAdvantages: string[];
  companyDescription: string
  companyLogo: string;
  companyName: string;
  companyNumberOfEmployees: number;
  companySector: string;
  contract: string;
  dayOfRemoteWork: number
  description: string;
  expectationDescription: string;
  experienceMinInYear: number;
  hardSkills: string[];
  jobDescription: string;
  maxDiploma: string;
  publishedAt: string;
  recruitmentSteps: {
      name: string;
      timeInMinute: number;
  }[];
  salaryMaxInYear: number;
  salaryMinInYear: number;
  softSkills: string[];
  teamMembers: {
      firstName: string;
      lastName: string;
      role: string;
  }[];
  title: string;
};
// #endregion
