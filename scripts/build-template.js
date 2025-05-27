#!/usr/bin/env node

/**
 * This script validates and prepares the template directory for npm packaging
 * It ensures the template is ready for distribution without modifying the existing structure
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const projectRoot = resolve(__dirname, '..');

const TEMPLATE_DIR = join(projectRoot, 'template');
const ROOT_PACKAGE_JSON = join(projectRoot, 'package.json');
const TEMPLATE_PACKAGE_JSON = join(TEMPLATE_DIR, 'package.json');

function validateTemplate() {
  console.log('🔍 Validating template structure...');
  
  // Check if template directory exists
  if (!existsSync(TEMPLATE_DIR)) {
    throw new Error('Template directory not found! The template should exist at ./template/');
  }
  
  // Check if template package.json exists
  if (!existsSync(TEMPLATE_PACKAGE_JSON)) {
    throw new Error('Template package.json not found!');
  }
  
  // Validate essential template files
  const requiredFiles = [
    'src/App.tsx',
    'src/main.tsx',
    'index.html',
    'vite.config.ts',
    'tsconfig.json',
    'eslint.config.js'
  ];
  
  const missingFiles = requiredFiles.filter(file => !existsSync(join(TEMPLATE_DIR, file)));
  
  if (missingFiles.length > 0) {
    throw new Error(`Missing required template files: ${missingFiles.join(', ')}`);
  }
  
  console.log('✅ Template structure is valid');
}

function syncVersions() {
  console.log('🔄 Syncing version numbers...');
  
  try {
    const rootPackage = JSON.parse(readFileSync(ROOT_PACKAGE_JSON, 'utf8'));
    const templatePackage = JSON.parse(readFileSync(TEMPLATE_PACKAGE_JSON, 'utf8'));
    
    // Update template package.json with root version
    templatePackage.version = rootPackage.version;
    
    writeFileSync(TEMPLATE_PACKAGE_JSON, JSON.stringify(templatePackage, null, 2));
    console.log(`✅ Synced template version to ${rootPackage.version}`);
    
  } catch (error) {
    console.error('⚠️  Failed to sync versions:', error.message);
    // Don't throw - this is not critical for the build
  }
}

function createTemplateMetadata() {
  console.log('📝 Creating template metadata...');
  
  const metadata = {
    name: 'fe-base',
    description: 'A modern React application template with TypeScript, Vite, and comprehensive tooling',
    version: JSON.parse(readFileSync(ROOT_PACKAGE_JSON, 'utf8')).version,
    generator: '@thriledlokkie983/fe-base',
    generated: new Date().toISOString(),
    features: [
      'React 19',
      'TypeScript',
      'Vite',
      'SCSS',
      'Vitest',
      'ESLint',
      'React Query',
      'Zustand',
      'Framer Motion',
      'React Aria',
      'Docker support'
    ]
  };
  
  writeFileSync(
    join(TEMPLATE_DIR, '.template-metadata.json'),
    JSON.stringify(metadata, null, 2)
  );
  
  console.log('✅ Template metadata created');
}

function main() {
  try {
    console.log('🛠️  Building Fe-Base template package...');
    
    validateTemplate();
    syncVersions();
    createTemplateMetadata();
    
    console.log('✅ Template package built successfully!');
    console.log(`📍 Template location: ${TEMPLATE_DIR}`);
    console.log('🚀 Ready for npm publishing!');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();