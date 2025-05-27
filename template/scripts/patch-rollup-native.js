// This is a patching script to address the Rollup native module issue
// It replaces the native module loader with a dummy implementation

// Find the Rollup native modules file
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try to find the rollup native.js file
let nativePath;
try {
  // This will resolve to node_modules/rollup/dist/native.js
  nativePath = require.resolve('rollup/dist/native.js');
  console.log(`Found Rollup native module at: ${nativePath}`);

  // Read the file content
  const content = readFileSync(nativePath, 'utf8');

  // Create a patched version that doesn't try to load native modules
  const patchedContent = content.replace(
    /try\s*{[\s\S]*?requireWithFriendlyError[\s\S]*?}\s*catch\s*\(e\)\s*{[\s\S]*?}/g,
    'try { console.log("Skipping native module loading - using JS implementation"); } catch (e) {}'
  );

  // Write the patched file
  writeFileSync(nativePath, patchedContent);
  console.log('✅ Successfully patched Rollup native module file');
} catch (err) {
  console.error('❌ Failed to patch Rollup native module:', err);
}

// Continue with the normal build process
console.log('Continuing with build...');
