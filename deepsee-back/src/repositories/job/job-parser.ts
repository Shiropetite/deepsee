import {
    Job,
    JobDB,
    JobHardSkillDB,
    JobRecruitmentStep,
    JobRecruitmentStepDB,
    JobSoftSkillDB,
    JobTeamMember,
    JobTeamMemberDB,
} from '../../models/job-model';

/**
 * Parse un JobDB en Job
 * @param queryResult - JobDB
 * @returns Job
 */
export const parseJob = (
    { queryResult }: { queryResult: JobDB & { date_range?: string } },
): Job & { dateRange?: string } => ({
    __id: queryResult.id,
    _companyId: queryResult.company_id,
    city: queryResult.city,
    contract: queryResult.contract,
    dateRange: queryResult.date_range,
    dayOfRemoteWork: queryResult.day_of_remote_work,
    expectationDescription: queryResult.expectation_description,
    experienceMinInYear: queryResult.experience_min_in_year,
    jobDescription: queryResult.job_description,
    maxDiploma: queryResult.max_diploma,
    publishedAt: queryResult.published_at,
    salaryMaxInYear: queryResult.salary_max_by_year,
    salaryMinInYear: queryResult.salary_min_by_year,
    title: queryResult.title,
});

/**
 * Parse un JobHardSkillDB en string
 * @param queryResult - JobHardSkillDB
 * @returns string
 */
export const parseJobHardSkills = ({ queryResult }: { queryResult: JobHardSkillDB }): string => queryResult.name;

/**
 * Parse un JobSoftSkillDB en string
 * @param queryResult - JobSoftSkillDB
 * @returns string
 */
export const parseJobSoftSkills = ({ queryResult }: { queryResult: JobSoftSkillDB }): string => queryResult.name;

/**
 * Parse un JobRecruitmentStepDB en JobRecruitmentStep
 * @param queryResult - JobRecruitmentStepDB
 * @returns JobRecruitmentStep
 */
export const parseJobRecruitmentStep = (
    { queryResult }: { queryResult: JobRecruitmentStepDB },
): JobRecruitmentStep => ({
    name: queryResult.name,
    timeInMinute: queryResult.time_in_minute,
});

/**
 * Parse un JobTeamMemberDB en JobTeamMember
 * @param queryResult - JobTeamMemberDB
 * @returns JobTeamMember
 */
export const parseJobTeamMember = ({ queryResult }: { queryResult: JobTeamMemberDB }): JobTeamMember => ({
    firstName: queryResult.first_name,
    lastName: queryResult.last_name,
    role: queryResult.role,
});
