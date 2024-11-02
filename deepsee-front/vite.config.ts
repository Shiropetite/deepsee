import { fileURLToPath } from 'url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // or "modern"
            },
        },
    },
    plugins: [vue()],
    resolve: {
        alias: {
            'src': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
