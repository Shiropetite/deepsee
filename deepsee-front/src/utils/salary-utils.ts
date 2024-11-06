import i18n from 'src/i18n';

/**
 * Formate le salaire en fonction du type de contrat
 * @param job - le job dont on veut formater le salaire
 * @returns le salaire formaté
 */
export const formatSalary = (job: {
    contract: string;
    salaryMaxInYear: number;
    salaryMinInYear: number;
}) => {
    // Par jour
    if (['Freelance', 'Intérim'].includes(job.contract)) {
        const salaryMinInDay = job.salaryMinInYear / 218;
        if (job.salaryMaxInYear) {
            const salaryMaxInDay = job.salaryMaxInYear / 218;
            return i18n.global.t('salary.rangeByDay', {
                max: salaryMaxInDay.toFixed(0),
                min: salaryMinInDay.toFixed(0),
            });
        }

        return i18n.global.t('salary.minByDay', {
            salary: salaryMinInDay.toFixed(0),
        });
    }

    // Par an
    if (job.salaryMaxInYear) {
        return i18n.global.t('salary.rangeByYear', {
            max: job.salaryMaxInYear / 1000,
            min: job.salaryMinInYear / 1000,
        });
    }

    return i18n.global.t('salary.minByYear', {
        salary: job.salaryMinInYear / 1000,
    });
};
