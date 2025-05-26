import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';
import * as path from 'path';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on mode
  const env = loadEnv(mode, process.cwd());

  return {
    // Base URL for the application
    plugins: [react(), svgr()],

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Core React dependencies
            vendor: ['react', 'react-dom'],
            // Routing and navigation
            router: ['react-router-dom'],
            // UI components and icons
            ui: ['lucide-react', 'react-aria-components'],
            // State management and utilities
            state: ['@tanstack/react-query'],
            // Animation library
            animation: ['framer-motion'],
            // Utils and helpers
            utils: ['@grrr/utils', 'dompurify'],
          },
          // Better asset naming for caching
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.name || 'asset';
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(fileName)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/i.test(fileName)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
      // Optimize build performance
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: false, // Disable in production for smaller builds
      reportCompressedSize: false, // Skip compression reporting for faster builds
      chunkSizeWarningLimit: 1000,
    },

    // Enable CSS modules
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            /**
             * @TODO: refactor `:root` to `62.5%` and adjust this to `10`?
             */
            rootValue: 16,
            mediaQuery: true,
            propList: ['*'],
          }),
        ],
      },
    },

    // Resolve paths for easier imports
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
        '@components': path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          './src/components'
        ),
        '@utils': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/utils'),
        '@pages': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/pages'),
        '@hooks': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/hooks'),
        '@config': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/config'),
        '@contexts': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/contexts'),
        '@hocs': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/hocs'),
        '@stores': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/stores'),
        '@styles': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/styles'),
        '@assets': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/assets'),
      },
    },

    // Define global constants
    define: {
      // Make environment variables available to the app
      // Note: We prefix with VITE_ to expose to the client
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || mode),
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || ''),
      'process.env.VITE_PORT': JSON.stringify(env.VITE_PORT || '3000'),
      'process.env.VITE_NODE_ENV': JSON.stringify(env.VITE_NODE_ENV || mode),
    },

    // Server configuration
    server: {
      port: parseInt(env.VITE_PORT || '3000'),
      host: true, // Listen on all addresses
    },
  };
});
