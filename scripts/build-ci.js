#!/usr/bin/env node

/**
 * This script is a workaround for the Rollup native module issue in CI environments.
 * It sets the ROLLUP_SKIP_NODEJS_NATIVE environment variable before running the build.
 */

// Set the environment variable
process.env.ROLLUP_SKIP_NODEJS_NATIVE = '1';

console.log('🛠️  Starting build with ROLLUP_SKIP_NODEJS_NATIVE=1');

// Use exec instead of spawn to simplify the process
import { exec } from 'child_process';

// Run TypeScript compiler first
console.log('Running TypeScript compiler...');
exec('npx tsc -b', (tscError, tscStdout, tscStderr) => {
  if (tscError) {
    console.error('❌ TypeScript compilation failed:', tscError);
    console.error(tscStderr);
    process.exit(1);
  }
  
  console.log(tscStdout);
  console.log('✅ TypeScript compilation successful');
  console.log('🚀 Running Vite build...');
  
  // Then run Vite build
  exec('npx vite build', (viteError, viteStdout, viteStderr) => {
    if (viteError) {
      console.error('❌ Vite build failed:', viteError);
      console.error(viteStderr);
      process.exit(1);
    }
    
    console.log(viteStdout);
    console.log('✅ Build completed successfully');
  });
});
