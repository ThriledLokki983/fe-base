#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, mkdirSync, cpSync, writeFileSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const log = {
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  step: (msg) => console.log(`${colors.cyan}🚀 ${msg}${colors.reset}`),
  highlight: (msg) => console.log(`${colors.bright}${colors.magenta}${msg}${colors.reset}`),
};

const TEMPLATE_DIR = join(__dirname, '..', 'template');

// Check Node.js version compatibility
function checkNodeVersion() {
  const nodeVersion = process.version;
  const major = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  // Vite 6+ requires Node.js ^18.0.0 || ^20.0.0 || >=22.0.0 (excludes 21.x)
  const isSupported = (major >= 18 && major !== 19 && major !== 21) || major >= 22;
  
  if (!isSupported) {
    log.error(`Node.js ${nodeVersion} is not supported by Vite 6+`);
    log.info('Please use Node.js 18.x, 20.x, or 22+ for best compatibility');
    log.info('You can continue, but you may encounter dependency issues');
    log.warning('Consider using a Node version manager like nvm to switch versions');
    return false;
  }
  
  return true;
}

async function main() {
  const projectName = process.argv[2];

  // Handle help and version flags
  if (!projectName || projectName === '--help' || projectName === '-h') {
    console.log(`
${colors.bright}Fe-Base - Modern React Application Template${colors.reset}

${colors.bright}Usage:${colors.reset}
  npx @gnimoh001/fe-base <project-name>    Create a new project
  fe-base --version                       Show version
  fe-base --help                          Show this help

${colors.bright}Examples:${colors.reset}
  npx @gnimoh001/fe-base my-app
  npm create @gnimoh001/fe-base my-dashboard
  yarn create @gnimoh001/fe-base my-website

${colors.bright}Features:${colors.reset}
  ⚡ Vite - Lightning fast build tool
  ⚛️  React 19 - Latest React features  
  🔷 TypeScript - Full type safety
  🎨 SCSS - Enhanced styling with CSS modules
  🧪 Vitest - Fast and modern testing
  📏 ESLint + Prettier - Code quality
  🔄 React Query - Server state management
  🐻 Zustand - Client state management  
  🎭 Framer Motion - Beautiful animations
  🎯 React Aria - Accessible components
  🐳 Docker - Containerization support

${colors.bright}Links:${colors.reset}
  📖 Documentation: https://github.com/ThriledLokki983/fe-base
  🐛 Issues: https://github.com/ThriledLokki983/fe-base/issues
  
Built with ❤️  by Gideon Nimoh
    `);
    process.exit(0);
  }

  if (projectName === '--version' || projectName === '-v') {
    const packageJson = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));
    console.log(packageJson.version);
    process.exit(0);
  }

  // Validate project name
  if (!/^[a-zA-Z0-9-_]+$/.test(projectName)) {
    log.error('Project name can only contain letters, numbers, hyphens, and underscores');
    process.exit(1);
  }

  if (existsSync(projectName)) {
    log.error(`Directory "${projectName}" already exists`);
    process.exit(1);
  }

  if (!existsSync(TEMPLATE_DIR)) {
    log.error('Template directory not found. Please reinstall the package.');
    process.exit(1);
  }

  // Check Node.js version
  const nodeVersionOk = checkNodeVersion();
  if (!nodeVersionOk) {
    log.warning('Proceeding with potentially incompatible Node.js version...');
  }

  log.highlight(`
╔══════════════════════════════════════════╗
║           🚀 Creating Fe-Base App        ║
║              ${projectName.padEnd(22)}   ║
╚══════════════════════════════════════════╝
  `);

  try {
    // Create project directory
    log.step('Creating project directory...');
    mkdirSync(projectName, { recursive: true });
    
    // Copy template files
    log.step('Copying template files...');
    cpSync(TEMPLATE_DIR, projectName, { recursive: true });

    // Update package.json with project name
    const packageJsonPath = join(projectName, 'package.json');
    if (existsSync(packageJsonPath)) {
      log.step('Configuring package.json...');
      const packageContent = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      packageContent.name = projectName;
      packageContent.private = true;
      packageContent.version = '0.1.0';
      writeFileSync(packageJsonPath, JSON.stringify(packageContent, null, 2));
    }

    // Update README.md with project name
    const readmePath = join(projectName, 'README.md');
    if (existsSync(readmePath)) {
      log.step('Updating README...');
      let readmeContent = readFileSync(readmePath, 'utf-8');
      readmeContent = readmeContent.replace(/fe-base-template/g, projectName);
      readmeContent = readmeContent.replace(/Fe-Base Template/g, projectName);
      writeFileSync(readmePath, readmeContent);
    }

    // Install dependencies
    log.step('Installing dependencies...');
    process.chdir(projectName);
    
    const packageManager = await detectPackageManager();
    log.info(`Using ${packageManager}...`);
    
    await execAsync(`${packageManager} install`);

    // Success message
    log.success('Project created successfully!');
    console.log(`
${colors.bright}🎉 Your Fe-Base project is ready!${colors.reset}

${colors.bright}Next steps:${colors.reset}
  ${colors.cyan}cd ${projectName}${colors.reset}
  ${colors.cyan}${packageManager === 'npm' ? 'npm start' : packageManager === 'yarn' ? 'yarn start' : 'pnpm start'}${colors.reset}

${colors.bright}Available commands:${colors.reset}
  ${colors.green}start${colors.reset}        Start development server
  ${colors.green}build${colors.reset}        Build for production
  ${colors.green}test${colors.reset}         Run tests
  ${colors.green}lint${colors.reset}         Lint code
  ${colors.green}preview${colors.reset}      Preview production build

${colors.bright}What's included:${colors.reset}
  ⚡ Vite - Lightning fast build tool
  ⚛️  React 19 - Latest React features
  🔷 TypeScript - Type safety
  🎨 SCSS - Enhanced styling
  🧪 Vitest - Fast testing
  🔄 React Query - Server state
  🐻 Zustand - Client state
  🎭 Framer Motion - Animations
  🎯 React Aria - Accessibility
  🐳 Docker - Containerization

${colors.bright}Documentation:${colors.reset}
  GitHub: https://github.com/ThriledLokki983/fe-base
  
${colors.bright}Happy coding! 🚀${colors.reset}
    `);

  } catch (error) {
    log.error(`Error creating project: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

async function detectPackageManager() {
  try {
    // Check for yarn
    await execAsync('yarn --version');
    return 'yarn';
  } catch {
    try {
      // Check for pnpm
      await execAsync('pnpm --version');
      return 'pnpm';
    } catch {
      // Default to npm
      return 'npm';
    }
  }
}

main().catch((error) => {
  log.error(`Unexpected error: ${error.message}`);
  console.error(error);
  process.exit(1);
});
