import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        component: () => import('../pages/search-page.vue'),
        path: '/',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
