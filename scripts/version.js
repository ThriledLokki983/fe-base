#!/usr/bin/env node

/**
 * Version management script for Fe-Base package
 * Handles version bumping, changelog updates, and release preparation
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const projectRoot = resolve(__dirname, '..');

const PACKAGE_JSON = join(projectRoot, 'package.json');
const CHANGELOG_PATH = join(projectRoot, 'CHANGELOG.md');

function getCurrentVersion() {
  const pkg = JSON.parse(readFileSync(PACKAGE_JSON, 'utf8'));
  return pkg.version;
}

function updateVersion(newVersion) {
  const pkg = JSON.parse(readFileSync(PACKAGE_JSON, 'utf8'));
  pkg.version = newVersion;
  writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 2));
  console.log(`✅ Updated package.json to version ${newVersion}`);
}

function updateChangelog(version) {
  try {
    let changelog = readFileSync(CHANGELOG_PATH, 'utf8');
    const date = new Date().toISOString().split('T')[0];
    
    // Replace [Unreleased] with the new version
    changelog = changelog.replace(
      '## [Unreleased]',
      `## [Unreleased]\n\n## [${version}] - ${date}`
    );
    
    // Update comparison links at the bottom
    const oldVersionMatch = changelog.match(/\[(\d+\.\d+\.\d+)\]: /g);
    if (oldVersionMatch) {
      const previousVersion = oldVersionMatch[0].match(/\[(\d+\.\d+\.\d+)\]/)[1];
      changelog = changelog.replace(
        `[Unreleased]: https://github.com/ThriledLokki983/fe-base/compare/v${previousVersion}...HEAD`,
        `[Unreleased]: https://github.com/ThriledLokki983/fe-base/compare/v${version}...HEAD\n[${version}]: https://github.com/ThriledLokki983/fe-base/compare/v${previousVersion}...v${version}`
      );
    }
    
    writeFileSync(CHANGELOG_PATH, changelog);
    console.log(`✅ Updated CHANGELOG.md for version ${version}`);
  } catch (error) {
    console.warn(`⚠️  Could not update changelog: ${error.message}`);
  }
}

function createGitTag(version) {
  try {
    execSync(`git add -A`, { stdio: 'inherit' });
    execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' });
    execSync(`git tag v${version}`, { stdio: 'inherit' });
    console.log(`✅ Created git tag v${version}`);
  } catch (error) {
    console.warn(`⚠️  Could not create git tag: ${error.message}`);
  }
}

function validateWorkingDirectory() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim() && !process.argv.includes('--force')) {
      throw new Error('Working directory not clean. Use --force to override.');
    }
  } catch (error) {
    console.warn(`⚠️  Git validation: ${error.message}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const versionType = args[0] || 'patch';
  
  if (!['patch', 'minor', 'major'].includes(versionType) && !versionType.match(/^\d+\.\d+\.\d+$/)) {
    console.error('Usage: node scripts/version.js [patch|minor|major|x.y.z] [--force]');
    console.error('Examples:');
    console.error('  node scripts/version.js patch');
    console.error('  node scripts/version.js minor');
    console.error('  node scripts/version.js major');
    console.error('  node scripts/version.js 2.0.0');
    process.exit(1);
  }
  
  try {
    console.log('🚀 Preparing Fe-Base release...');
    
    // Validate working directory
    validateWorkingDirectory();
    
    const currentVersion = getCurrentVersion();
    console.log(`📍 Current version: ${currentVersion}`);
    
    // Calculate new version
    let newVersion;
    if (versionType.match(/^\d+\.\d+\.\d+$/)) {
      newVersion = versionType;
    } else {
      const [major, minor, patch] = currentVersion.split('.').map(Number);
      switch (versionType) {
        case 'major':
          newVersion = `${major + 1}.0.0`;
          break;
        case 'minor':
          newVersion = `${major}.${minor + 1}.0`;
          break;
        case 'patch':
          newVersion = `${major}.${minor}.${patch + 1}`;
          break;
      }
    }
    
    console.log(`🎯 New version: ${newVersion}`);
    
    // Update version in package.json
    updateVersion(newVersion);
    
    // Update changelog
    updateChangelog(newVersion);
    
    // Build package
    console.log('🛠️  Building package...');
    execSync('npm run build:package', { stdio: 'inherit' });
    
    // Create git tag
    if (!args.includes('--no-git')) {
      createGitTag(newVersion);
    }
    
    console.log(`✅ Release v${newVersion} prepared successfully!`);
    console.log(`\nNext steps:`);
    console.log(`  git push origin main --tags`);
    console.log(`  # This will trigger automated publishing to npm`);
    
  } catch (error) {
    console.error(`❌ Release preparation failed: ${error.message}`);
    process.exit(1);
  }
}

main();
