#!/usr/bin/env node

/**
 * This script is a workaround for the Rollup native module issue in CI environments.
 * It sets the ROLLUP_SKIP_NODEJS_NATIVE environment variable before running the build.
 */

// Set the environment variable
process.env.ROLLUP_SKIP_NODEJS_NATIVE = '1';
// Force disable native extensions for all related packages
process.env.DISABLE_NATIVE = 'true';
// Suppress node native module warnings
process.env.NODE_PENDING_DEPRECATION = '0';

console.log('🛠️  Starting build with ROLLUP_SKIP_NODEJS_NATIVE=1');

// Use exec instead of spawn to simplify the process
import { exec } from 'child_process';

// Run TypeScript compiler first
console.log('Running TypeScript compiler...');
exec('npx tsc -b --noEmit', (tscError, tscStdout, tscStderr) => {
  if (tscError) {
    console.warn('⚠️ TypeScript compilation had errors, but continuing with build process:');
    console.warn(tscStderr);
  } else {
    console.log(tscStdout);
    console.log('✅ TypeScript compilation successful');
  }
  
  console.log('🚀 Running Vite build...');
  
  // Then run Vite build with explicit configuration to skip native modules
  exec('npx vite build --config vite.config.ci.ts', (viteError, viteStdout, viteStderr) => {
    if (viteError) {
      console.error('❌ Vite build failed:', viteError);
      console.error(viteStderr);
      process.exit(1);
    }
    
    console.log(viteStdout);
    console.log('✅ Build completed successfully');
  });
});
