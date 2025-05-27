# Fe-Base

A modern, production-ready React application template with TypeScript, Vite, and comprehensive tooling.

[![npm version](https://badge.fury.io/js/%40gnimoh001%2Ffe-base.svg)](https://badge.fury.io/js/%40gnimoh001%2Ffe-base)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/ThriledLokki983/fe-base/actions/workflows/ci.yml/badge.svg)](https://github.com/ThriledLokki983/fe-base/actions/workflows/ci.yml)

## Quick Start

Create a new React project with Fe-Base in seconds:

```bash
# Using npx (recommended)
npx @gnimoh001/fe-base my-project

# Using npm
npm create @gnimoh001/fe-base my-project

# Using yarn
yarn create @gnimoh001/fe-base my-project

# Using pnpm
pnpm create @gnimoh001/fe-base my-project
```

Then start developing:

```bash
cd my-project
npm install
npm run dev
```

## Prerequisites

- **Node.js**: Version 20+ (20.x, 22+ all supported)
- **Package Manager**: npm, yarn, or pnpm

> **Note**: This template requires Node.js 20+ for react-router-dom v7 and other modern packages. Use `nvm install 20` if you need to upgrade.

## Features

- ⚡ **Vite** - Lightning fast build tool with hot reload
- ⚛️ **React 19** - Latest React with modern features
- 🔷 **TypeScript** - Full type safety and enhanced DX
- 🎨 **SCSS** - Enhanced styling with CSS modules
- 🧪 **Vitest** - Fast and modern testing framework
- 📏 **ESLint + Prettier** - Code quality and formatting
- 🔄 **React Query** - Powerful server state management
- 🐻 **Zustand** - Lightweight client state management
- 🎭 **Framer Motion** - Beautiful animations and transitions
- 🎯 **React Aria** - Accessible component primitives
- 🐳 **Docker** - Complete containerization support

## What's Included

### 🏗️ Modern Development Stack
- **Vite** for ultra-fast development and building
- **TypeScript** with strict configuration
- **React 19** with latest features and hooks
- **SCSS** with CSS modules for scoped styling

### 🧪 Testing & Quality
- **Vitest** for unit and integration testing
- **ESLint** with React and TypeScript rules
- **Prettier** for consistent code formatting
- Pre-configured test utilities and setup

### 🎨 UI & Components
- Pre-built component library with common components
- **React Aria** for accessibility-first components
- **Framer Motion** for smooth animations
- Responsive design patterns and utilities

### 🔄 State Management
- **React Query** for server state and caching
- **Zustand** for client-side state management
- Pre-configured stores and patterns

### 🐳 Production Ready
- **Docker** support with multi-stage builds
- **GitHub Actions** CI/CD workflows
- Production optimization and bundling
- Environment configuration management

## Project Structure

```
my-project/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Application pages/routes
│   ├── hooks/             # Custom React hooks
│   ├── stores/            # State management
│   ├── styles/            # Global styles and themes
│   ├── utils/             # Utility functions
│   └── config/            # App configuration
├── public/                # Static assets
├── scripts/               # Build and utility scripts
├── Dockerfile             # Container configuration
├── docker-compose.yml     # Development containers
└── vite.config.ts         # Vite configuration
```

## Available Scripts

In your generated project, you can run:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run type-check` - Run TypeScript checks

## Docker Support

The template includes complete Docker support:

```bash
# Development with hot reload
docker-compose up dev

# Production build
docker-compose up --build

# Or build manually
docker build -t my-app .
docker run -p 3000:80 my-app
```

## Customization

Fe-Base is designed to be easily customizable:

### 🎨 Styling
- Modify design tokens in `src/styles/design-tokens.scss`
- Update theme configuration
- Customize component styles

### 🔧 Configuration
- Update `vite.config.ts` for build settings
- Modify `tsconfig.json` for TypeScript options
- Customize ESLint rules in `eslint.config.js`

### 📦 Dependencies
- Add new packages with `npm install`
- Update existing packages with `npm update`
- Remove unused dependencies

## CLI Options

```bash
# Show help
npx @gnimoh001/fe-base --help

# Show version
npx @gnimoh001/fe-base --version

# Create project with specific name
npx @gnimoh001/fe-base my-awesome-app
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/ThriledLokki983/fe-base/blob/main/CONTRIBUTING.md) for details.

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ThriledLokki983/fe-base.git
   cd fe-base
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Test the CLI locally:
   ```bash
   npm run test:cli
   ```

4. Build the package:
   ```bash
   npm run build:package
   ```

5. Test template generation:
   ```bash
   npm run dev:template
   ```

## Publishing

This package is automatically published to npm when a new tag is pushed:

```bash
# Create and push a new version
npm version patch  # or minor, major
git push origin main --tags
```

## License

MIT © [Gideon Nimoh](https://github.com/ThriledLokki983)

## Support

- 📖 [Documentation](https://github.com/ThriledLokki983/fe-base)
- 🐛 [Issue Tracker](https://github.com/ThriledLokki983/fe-base/issues)
- 💬 [Discussions](https://github.com/ThriledLokki983/fe-base/discussions)

---

**Built with ❤️ by the Fe-Base team**
