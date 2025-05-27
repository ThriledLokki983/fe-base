import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import dts from 'vite-plugin-dts';

const __dirname = resolve(fileURLToPath(import.meta.url), '..');

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/components/**/*', 'src/hooks/**/*', 'src/stores/**/*', 'src/utils/**/*'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.stories.{ts,tsx}'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/lib/index.ts'),
        components: resolve(__dirname, 'src/components/index.ts'),
      },
      name: 'FeBase',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'es.js' : 'js'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'framer-motion',
        'lucide-react',
        'zustand',
        'dompurify',
        'react-aria-components',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
          '@tanstack/react-query': 'ReactQuery',
          'framer-motion': 'FramerMotion',
          'lucide-react': 'LucideReact',
          zustand: 'Zustand',
          dompurify: 'DOMPurify',
          'react-aria-components': 'ReactAriaComponents',
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
      '@pages': resolve(__dirname, './src/pages'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@config': resolve(__dirname, './src/config'),
      '@contexts': resolve(__dirname, './src/contexts'),
      '@hocs': resolve(__dirname, './src/hocs'),
      '@stores': resolve(__dirname, './src/stores'),
      '@styles': resolve(__dirname, './src/styles'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
});
