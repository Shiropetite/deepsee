import { createI18n } from 'vue-i18n';

import fr from './i18n/fr/global.json';

const i18n = createI18n({
    fallbackLocale: 'fr',
    locale: 'fr',
    messages: { fr },
});

export default i18n;
