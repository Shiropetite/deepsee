import { GetJobByIdResponse } from 'src/services/job-type';

/**
 * Formate le salaire en fonction du type de contrat
 * @param job - le job dont on veut formater le salaire
 * @returns le salaire formaté
 */
export const formatSalary = (job: GetJobByIdResponse) => {
    let salary = '';

    if (['Freelance', 'Intérim'].includes(job.contract)) {
        const salaryMinInDay = job.salaryMinInYear / 218;
        if (job.salaryMaxInYear) {
            const salaryMaxInDay = job.salaryMaxInYear / 218;
            salary += `${ salaryMinInDay.toFixed(0) } - ${ salaryMaxInDay.toFixed(0) }`;
        }
        else {
            salary += `> ${ salaryMinInDay.toFixed(0) }`;
        }
        salary += ' € / jour';
    }
    else {
        if (job.salaryMaxInYear) {
            salary += `${job.salaryMinInYear / 1000}K - ${ job.salaryMaxInYear / 1000 }K`;
        }
        else {
            salary += `> ${ job.salaryMinInYear / 1000 }K`;
        }
        salary += ' € / an';
    }
    return salary;
};
