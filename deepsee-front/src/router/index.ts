import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {

        children: [
            {
                component: () => import('../pages/account-page.vue'),
                name: 'account',
                path: '/account',
            },
            {
                component: () => import('../pages/job-search/job-search-page.vue'),
                name: 'search',
                path: '/',
            },
            {
                component: () => import('../pages/job-detail/job-detail-page.vue'),
                name: 'job-detail',
                path: '/job/:id',
            },
            {
                component: () => import('../pages/legal-notice-page.vue'),
                name: 'legal-notice',
                path: '/legal-notice',
            },
            {
                component: () => import('../pages/privacy-policy-page.vue'),
                name: 'privacy-policy',
                path: '/privacy-policy',
            },
            {
                component: () => import('../pages/term-of-use-page.vue'),
                name: 'term-of-use',
                path: '/term-of-use',
            },
            {
                component: () => import('../pages/contact-page.vue'),
                name: 'contact',
                path: '/contact',
            },
        ],
        component: () => import('../layouts/main-layout.vue'),
        path: '/',
    },
    {

        children: [
            {
                component: () => import('../pages/sign-in-page.vue'),
                name: 'sign-in',
                path: '/sign-in',
            },
            {
                component: () => import('../pages/sign-up-page.vue'),
                name: 'sign-up',
                path: '/sign-up',
            },
        ],
        component: () => import('../layouts/auth-layout.vue'),
        path: '/',
    },
    {
        component: () => import('../pages/not-found-page.vue'),
        path: '/:pathMatch(.*)*',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
