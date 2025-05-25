/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/tests/setup.ts'],
    },
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
      '@components': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/components'),
      '@utils': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/utils'),
      '@pages': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/pages'),
      '@hooks': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/hooks'),
      '@config': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/config'),
    },
  },
});
