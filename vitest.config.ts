import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import type { UserConfig } from 'vite';
import type { InlineConfig } from 'vitest';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  assetsInclude: ['**/*.svg'],
} as VitestConfigExport);
