import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {

        children: [
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
        ],
        component: () => import('../layouts/main-layout.vue'),
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
