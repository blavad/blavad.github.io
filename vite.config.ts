import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import viteCompression from 'vite-plugin-compression';
import vitePrerender from 'vite-plugin-prerender';

const PuppeteerRenderer = vitePrerender.PuppeteerRenderer;
const distDir = fileURLToPath(new URL('./dist', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        assetsDir: 'web-assets',
    },
    plugins: [
        react(),
        tailwindcss(),
        viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
        viteCompression({ algorithm: 'gzip', ext: '.gz' }),
        vitePrerender({
            staticDir: distDir,
            routes: ['/', '/tech', '/teaching'],
            renderer: new PuppeteerRenderer({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                renderAfterTime: 2000,
            }),
        }),
    ],
    resolve: {
        alias: [
            {
                find: '~',
                replacement: fileURLToPath(new URL('./src', import.meta.url)),
            },
        ],
    },
});
