// #region getJobsByFilter
export type getJobsByFilterQuery = {
  city: string;
  companyName: string;
  companySector: string;
  contract: string;
  jobTitle: string;
  minSalary: string;
};

export type getJobsByFilterResponse = {
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
}[];
// #endregion

// #region getJobById
export type getJobByIdResponse = {
  __id: number;
  _companyId: number;
  city: string;
  companyAdvantages: string[];
  companyDescription: string;
  companyLogo: string;
  companyName: string;
  companyNumberOfEmployees: number;
  companySector: string;
  contract: string;
  dayOfRemoteWork: number;
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
