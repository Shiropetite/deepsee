import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {

        children: [
            {
                component: () => import('../pages/job-search-page.vue'),
                name: 'search',
                path: '/',
            },
            {
                component: () => import('../pages/job-detail-page.vue'),
                name: 'job-detail',
                path: '/job/:id',
            },
        ],
        component: () => import('../layouts/main-layout.vue'),
        path: '/',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
