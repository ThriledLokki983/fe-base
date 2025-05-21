#!/usr/bin/env node

/**
 * This is a special build script for GitHub Actions that completely bypasses Rollup's native module loading
 * It uses a more direct approach to build the application with Vite
 */

console.log('Starting GitHub Actions build...');

// Force all environment variables needed to disable native modules
process.env.ROLLUP_SKIP_NODEJS_NATIVE = '1';
process.env.DISABLE_NATIVE = 'true';
process.env.NODE_PENDING_DEPRECATION = '0';

// Use direct imports instead of require
import { exec } from 'child_process';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a temporary Vite config
const tempConfigContent = `
// Temporary Vite config for GitHub Actions
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      external: [/node:*/],
      treeshake: false,
    }
  }
});
`;

const tempConfigPath = resolve(__dirname, '../temp.vite.config.js');
writeFileSync(tempConfigPath, tempConfigContent);

console.log('Created temporary Vite config');
console.log('Running Vite build...');

// Run Vite directly with minimal options
exec('npx vite build --config temp.vite.config.js', (error, stdout, stderr) => {
  if (error) {
    console.error('Build failed:', stderr);
    process.exit(1);
  }
  
  console.log(stdout);
  console.log('Build completed successfully');
  
  // Clean up temp file
  exec(`rm ${tempConfigPath}`, (err) => {
    if (err) console.warn('Failed to remove temp config file');
  });
});
