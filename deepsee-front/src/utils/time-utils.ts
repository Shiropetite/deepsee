import i18n from 'src/config/i18n';

/**
 * Formate le temps écoulé entre aujourd'hui et une date donnée
 * @param dateSince - la date depuis laquelle on veut calculer le temps écoulé
 * @returns Le temps écoulé formaté
 */
export const formatTimeElapsedSince = (dateSince: string): string => {
    const now = new Date();
    const past = new Date(dateSince);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    let count = Math.floor(seconds / 31536000);
    if (count >= 1) {
        return i18n.global.t('time.yearAgo', { count }).toString();
    }

    count = Math.floor(seconds / 2592000);
    if (count >= 1) {
        return i18n.global.t('time.monthAgo', { count }).toString();
    }

    count = Math.floor(seconds / 86400);
    if (count >= 1) {
        return i18n.global.t('time.dayAgo', { count }).toString();
    }

    count = Math.floor(seconds / 3600);
    if (count >= 1) {
        return i18n.global.t('time.hourAgo', { count }).toString();
    }

    count = Math.floor(seconds / 60);
    if (count >= 1) {
        return i18n.global.t('time.minuteAgo', { count }).toString();
    }

    return 'à l\'instant';
};
