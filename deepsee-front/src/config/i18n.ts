import { createI18n } from 'vue-i18n';

import fr from '../i18n/fr';

const i18n = createI18n({
    fallbackLocale: 'fr',
    legacy: false,
    locale: 'fr',
    messages: { fr },
});

export default i18n;
