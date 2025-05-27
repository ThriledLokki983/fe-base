#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

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

function showVersion() {
  try {
    const packagePath = join(__dirname, '..', 'package.json');
    const packageContent = JSON.parse(readFileSync(packagePath, 'utf-8'));
    console.log(`${colors.bright}Fe-Base v${packageContent.version}${colors.reset}`);
  } catch (error) {
    console.log(`${colors.red}Unable to determine version${colors.reset}`);
  }
}

function showHelp() {
  console.log(`
${colors.bright}${colors.magenta}Fe-Base${colors.reset} - Modern React Application Template

${colors.bright}Usage:${colors.reset}
  ${colors.cyan}npx fe-base-react-template <project-name>${colors.reset}    Create a new project
  ${colors.cyan}fe-base --version${colors.reset}                       Show version
  ${colors.cyan}fe-base --help${colors.reset}                          Show this help

${colors.bright}Examples:${colors.reset}
  ${colors.green}npx fe-base-react-template my-app${colors.reset}
  ${colors.green}npm create fe-base-react-template my-dashboard${colors.reset}
  ${colors.green}yarn create fe-base-react-template my-website${colors.reset}

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
  📖 Documentation: ${colors.blue}https://github.com/ThriledLokki983/fe-base${colors.reset}
  🐛 Issues: ${colors.blue}https://github.com/ThriledLokki983/fe-base/issues${colors.reset}
  
${colors.bright}Built with ❤️  by Gideon Nimoh${colors.reset}
`);
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showHelp();
    return;
  }

  const command = args[0];

  switch (command) {
    case '--version':
    case '-v':
      showVersion();
      break;
    case '--help':
    case '-h':
      showHelp();
      break;
    default:
      console.log(`${colors.red}Unknown command: ${command}${colors.reset}`);
      console.log(`${colors.yellow}Use 'fe-base --help' for available commands${colors.reset}`);
      process.exit(1);
  }
}

main();
