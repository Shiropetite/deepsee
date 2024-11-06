import i18n from 'src/i18n';

export const contractTypesOptions = [
    {
        label: i18n.global.t('contractType.all'),
        value: '',
    },
    {
        label: i18n.global.t('contractType.permanent'),
        value: 'CDI',
    },
    {
        label: i18n.global.t('contractType.fixedTerm'),
        value: 'CDD',
    },
    {
        label: i18n.global.t('contractType.workStudy'),
        value: 'Alternance',
    },
    {
        label: i18n.global.t('contractType.internship'),
        value: 'Stage',
    },
    {
        label: i18n.global.t('contractType.freelance'),
        value: 'Freelance',
    },
    {
        label: i18n.global.t('contractType.temporary'),
        value: 'Intérim',
    },
];

export const minSalaryOptions = [
    {
        label: i18n.global.t('minSalaryOptions.none'),
        value: '',
    },
    {
        label: i18n.global.t('salary.minByYear', { salary: 20000 }),
        value: 20000,
    },
    {
        label: i18n.global.t('salary.minByYear', { salary: 30000 }),
        value: 30000,
    },
    {
        label: i18n.global.t('salary.minByYear', { salary: 40000 }),
        value: 40000,
    },
    {
        label: i18n.global.t('salary.minByYear', { salary: 50000 }),
        value: 50000,
    },
    {
        label: i18n.global.t('salary.minByYear', { salary: 60000 }),
        value: 60000,
    },
    {
        label: i18n.global.t('salary.minByYear', { salary: 70000 }),
        value: 70000,
    },
    {
        label: i18n.global.t('salary.minByYear', { salary: 90000 }),
        value: 90000,
    },
];
