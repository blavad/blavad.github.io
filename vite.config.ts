import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: [
            {
                find: '~',
                replacement: fileURLToPath(new URL('./src', import.meta.url)),
            },
        ],
    },
});
