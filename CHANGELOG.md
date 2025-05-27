# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.7] - 2025-05-27

## [1.0.6] - 2025-05-28

### Fixed
- Version bump to resolve npm publishing conflict
- All features and fixes from v1.0.5 included

### Technical Details
- Automated publishing workflow now properly handles version conflicts
- Package ready for distribution with fixed binary configuration

## [1.0.5] - 2025-05-28

### Fixed
- Added main binary entry `fe-base-react-template` to package.json for proper npx execution
- Fixed npm binary resolution issue when using `npx fe-base-react-template`

### Technical Details
- Package now properly responds to `npx fe-base-react-template <project-name>`
- Binary name now matches package name for consistent user experience

## [1.0.4] - 2025-05-28

### Added
- Successfully published to npm registry as `fe-base-react-template`

### Changed
- **BREAKING**: Renamed package from `@gnimoh001/fe-base` to `fe-base-react-template`
- Updated all CLI tool references to use new package name
- Updated documentation and examples with new package name
- Resolved scoped package authentication issues

### Fixed
- Updated Docker workflow to use correct secret names (`DOCKER_USERNAME`/`DOCKER_PASSWORD`)
- Fixed GitHub release creation in publish workflow to use proper token (`DEPENDABOT_TOKEN`)
- Enhanced Dependabot auto-merge workflow configuration
- Improved CI/CD pipeline reliability

### Technical Details
- Package now available as unscoped npm package for easier installation
- All CLI commands updated to reflect new package name:
  - `npx fe-base-react-template my-project`
  - `npm create fe-base-react-template my-project`
- Standardized GitHub Actions secret naming conventions
- Enhanced workflow security and reliability

## [1.0.3] - 2025-05-28

### Changed
- **BREAKING**: Upgraded minimum Node.js requirement from 18+ to 20+
- Updated CI matrix to test Node.js [20, 22] only (removed Node.js 18)
- Enhanced CLI tool with strict Node.js 20+ validation and upgrade instructions
- Updated template engines requirement to `>=20.0.0`
- Updated README.md prerequisites to reflect Node.js 20+ requirement

### Fixed
- Ensured full compatibility with react-router-dom v7.6.1 and other modern packages
- Resolved potential compatibility issues with older Node.js versions

### Technical Details
- react-router-dom v7 requires Node.js 20+ for optimal performance
- Modern package ecosystem increasingly requires Node.js 20+
- CLI now provides helpful upgrade instructions for users with older Node.js versions

## [1.0.2] - 2025-05-27

## [1.0.1] - 2025-05-27

### Added
- Initial npm package setup
- CLI tools for project generation
- Automated CI/CD workflows
- Docker publishing support

### Changed
- Restructured project as npm package
- Separated root and template package.json files

### Fixed
- Build script path resolution
- Template validation logic

## [1.0.0] - 2025-05-27

### Added
- Initial release of Fe-Base as npm package
- Modern React 19 + TypeScript template
- Vite build system with hot reload
- SCSS styling with CSS modules
- Comprehensive component library
- Testing setup with Vitest
- ESLint + Prettier configuration
- React Query for server state management
- Zustand for client state management
- Framer Motion for animations
- React Aria for accessibility
- Docker support with multi-stage builds
- GitHub Actions workflows
- Dependabot configuration

### Features
- ⚡ **Vite** - Lightning fast build tool
- ⚛️ **React 19** - Latest React with modern features
- 🔷 **TypeScript** - Type safety and better DX
- 🎨 **SCSS** - Enhanced styling capabilities
- 🧪 **Vitest** - Fast unit testing
- 📏 **ESLint** - Code linting and formatting
- 🔄 **React Query** - Server state management
- 🐻 **Zustand** - Client state management
- 🎭 **Framer Motion** - Smooth animations
- 🎯 **React Aria** - Accessible components
- 🐳 **Docker** - Containerization support

[Unreleased]: https://github.com/ThriledLokki983/fe-base/compare/v1.0.7...HEAD
[1.0.7]: https://github.com/ThriledLokki983/fe-base/compare/v1.0.6...v1.0.7
[1.0.6]: https://github.com/ThriledLokki983/fe-base/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/ThriledLokki983/fe-base/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/ThriledLokki983/fe-base/compare/v1.0.2...v1.0.4
[1.0.2]: https://github.com/ThriledLokki983/fe-base/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/ThriledLokki983/fe-base/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/ThriledLokki983/fe-base/releases/tag/v1.0.0
