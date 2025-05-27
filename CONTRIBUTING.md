# Contributing to Fe-Base

Thank you for your interest in contributing to Fe-Base! This guide will help you get started with development and contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Publishing](#publishing)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+
- Git

### Installation

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/fe-base.git
   cd fe-base
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Install template dependencies:
   ```bash
   cd template
   npm install
   cd ..
   ```

## Project Structure

This repository has a dual structure:

```
fe-base/
├── package.json          # NPM package configuration
├── bin/                  # CLI tools
│   ├── create-fe-base.js # Main project generator
│   └── fe-base.js        # Helper CLI
├── scripts/              # Build and utility scripts
│   └── build-template.js # Template validation
├── template/             # The actual React template
│   ├── package.json      # Template app configuration
│   ├── src/              # Template source code
│   ├── public/           # Template assets
│   └── ...               # Complete React app
└── .github/              # CI/CD workflows
```

### Key Concepts

- **Root Level**: NPM package for CLI tools and template distribution
- **Template Directory**: Complete React application that gets copied to new projects
- **CLI Tools**: Scripts that handle project generation and setup

## Development Workflow

### Working on the Template

To develop the React template:

```bash
# Start the template in development mode
npm run dev:template

# Or work directly in the template directory
cd template
npm run dev
```

### Working on CLI Tools

To test CLI functionality:

```bash
# Test CLI help and version commands
npm run test:cli

# Test project generation
mkdir test-output
cd test-output
node ../bin/create-fe-base.js test-project
```

### Building the Package

```bash
# Validate and prepare the template
npm run build:package

# This will:
# - Validate template structure
# - Sync version numbers
# - Create metadata files
```

## Testing

### Template Tests

```bash
# Run template unit tests
npm run test:template

# Or work directly in template
cd template
npm run test:unit
```

### CLI Tests

```bash
# Test CLI tools
npm run test:cli

# Test project generation end-to-end
mkdir test-output
cd test-output
node ../bin/create-fe-base.js my-test-app
cd my-test-app
npm install
npm run dev
```

### Linting

```bash
# Lint template code
npm run lint:template

# Or work directly in template
cd template
npm run lint
npm run lint:fix
```

## Publishing

### Version Management

Versions are managed at the root level and synced to the template:

```bash
# Update version (will sync to template)
npm version patch  # or minor, major

# Build and validate
npm run build:package

# Publish (automated via GitHub Actions)
git push origin main --tags
```

### Manual Publishing

For testing or emergency releases:

```bash
npm run release        # Production release
npm run release:beta   # Beta release
```

## Code Style

### General Guidelines

- Use TypeScript for all new code
- Follow existing code patterns and conventions
- Write tests for new functionality
- Keep components small and focused
- Use meaningful variable and function names

### Template Code Style

- Use React functional components with hooks
- Prefer SCSS modules for styling
- Follow accessibility best practices
- Use TypeScript interfaces for props
- Keep components in dedicated directories with:
  - `Component.tsx` - Main component
  - `Component.module.scss` - Styles
  - `README.md` - Documentation
  - `index.ts` - Exports

### CLI Code Style

- Use ES modules (import/export)
- Provide helpful error messages
- Include progress indicators for long operations
- Validate user input appropriately
- Use chalk for colored output

## Pull Request Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Keep commits focused and atomic
   - Write clear commit messages
   - Test your changes thoroughly

3. **Update Documentation**
   - Update README.md if needed
   - Add entries to CHANGELOG.md
   - Update component documentation

4. **Test Everything**
   ```bash
   npm run build:package
   npm run test:cli
   npm run test:template
   npm run lint:template
   ```

5. **Submit PR**
   - Provide clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues

### PR Review Criteria

- [ ] Code follows established patterns
- [ ] Tests pass and coverage is maintained
- [ ] Documentation is updated
- [ ] No breaking changes (or properly documented)
- [ ] CLI tools work as expected
- [ ] Template generates correctly

## Common Development Tasks

### Adding a New Component to Template

1. Create component directory in `template/src/components/`
2. Add component files (TSX, SCSS, README, index)
3. Export from appropriate index files
4. Add to component showcase if applicable
5. Write tests

### Updating Dependencies

1. Update in both root and template package.json
2. Test compatibility
3. Update documentation if needed
4. Test CLI generation with new dependencies

### Modifying Build Process

1. Update scripts in `scripts/` directory
2. Test with `npm run build:package`
3. Ensure CI/CD workflows still work
4. Update documentation

## Getting Help

- 📖 Check existing [documentation](https://github.com/ThriledLokki983/fe-base)
- 🐛 Search [existing issues](https://github.com/ThriledLokki983/fe-base/issues)
- 💬 Start a [discussion](https://github.com/ThriledLokki983/fe-base/discussions)
- 📧 Contact maintainers

## Code of Conduct

Please note that this project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

---

Thank you for contributing to Fe-Base! 🚀
