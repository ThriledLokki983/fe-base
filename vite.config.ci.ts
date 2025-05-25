// Vite config for CI environments
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// Use this config for CI environments to avoid native module issues
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: resolve(__dirname, 'src/assets'),
      components: resolve(__dirname, 'src/components'),
      configs: resolve(__dirname, 'src/configs'),
      contexts: resolve(__dirname, 'src/contexts'),
      data: resolve(__dirname, 'src/data'),
      helpers: resolve(__dirname, 'src/helpers'),
      hooks: resolve(__dirname, 'src/hooks'),
      hocs: resolve(__dirname, 'src/hocs'),
      pages: resolve(__dirname, 'src/pages'),
      styles: resolve(__dirname, 'src/styles'),
    },
  },
  build: {
    // Minimize dependencies on native modules
    rollupOptions: {
      external: [
        /node:*/, // Exclude Node.js built-in modules
      ],
      // Disable treeshaking and optimizations that might require native modules
      treeshake: false,
      // Simplify the build process
      output: {
        manualChunks: undefined,
      },
    },
    // Disable source maps in CI to speed up build
    sourcemap: false,
    // Empty outDir before building
    emptyOutDir: true,
  },
});
