export const formatTimeElapsedSince = (dateSince: string): string => {
    const now = new Date();
    const past = new Date(dateSince);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return `il y a ${interval} ${interval === 1 ? 'année' : 'années'}`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return `il y a ${interval} ${interval === 1 ? 'mois' : 'mois'}`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return `il y a ${interval} ${interval === 1 ? 'jour' : 'jours'}`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return `il y a ${interval} ${interval === 1 ? 'heure' : 'heures'}`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return `il y a ${interval} ${interval === 1 ? 'minute' : 'minutes'}`;
    }

    if (seconds < 5) return 'à l\'instant';

    return `il y a ${Math.floor(seconds)} ${seconds === 1 ? 'seconde' : 'secondes'}`;
};
