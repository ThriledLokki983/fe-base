#!/usr/bin/env node

/**
 * This script is a workaround for the Rollup native module issue in CI environments.
 * It sets the ROLLUP_SKIP_NODEJS_NATIVE environment variable before running the build.
 */

const { spawn } = require('child_process');
const path = require('path');

// Set the environment variable
process.env.ROLLUP_SKIP_NODEJS_NATIVE = '1';

console.log('🛠️  Starting build with ROLLUP_SKIP_NODEJS_NATIVE=1');

// Run TypeScript compiler first
const tsc = spawn('npx', ['tsc', '-b'], { 
  stdio: 'inherit',
  env: { ...process.env }
});

tsc.on('close', (tscCode) => {
  if (tscCode !== 0) {
    console.error('❌ TypeScript compilation failed');
    process.exit(tscCode);
  }
  
  console.log('✅ TypeScript compilation successful');
  console.log('🚀 Running Vite build...');
  
  // Then run Vite build
  const vite = spawn('npx', ['vite', 'build'], { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  vite.on('close', (viteCode) => {
    if (viteCode !== 0) {
      console.error('❌ Vite build failed');
      process.exit(viteCode);
    }
    
    console.log('✅ Build completed successfully');
  });
});
