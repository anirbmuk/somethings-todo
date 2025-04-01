import { defineConfig } from 'cypress';
import * as data from './cypress/fixtures/data.json';

export default defineConfig({
  e2e: {
    baseUrl: data.baseUrl,
    viewportWidth: 1024,
    viewportHeight: 768,
    video: false,
    screenshotOnRunFailure: false,
  },
  component: {
    specPattern: 'src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
});
