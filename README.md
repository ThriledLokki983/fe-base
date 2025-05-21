# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Docker Support

This project includes Docker and Docker Compose configurations for both development and production environments. See [DOCKER.md](./DOCKER.md) for detailed instructions.

```bash
# Quick start - development mode
docker-compose up -d frontend-dev

# Quick start - production mode
docker-compose up -d frontend
```

## GitHub Actions

This project includes several GitHub Actions workflows for continuous integration and deployment. See [GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md) for detailed information.

## Makefile Support

A Makefile is provided for convenient shortcuts to common commands:

```bash
# Start development environment
make start-dev

# Start staging environment
make start-staging

# Start production environment
make start-prod

# View all available commands
make help
```

## Environment Configuration

The project supports multiple environments through .env files:

- `.env.development` - Development environment settings
- `.env.staging` - Staging environment settings
- `.env.production` - Production environment settings
- `.env` - Local overrides (not committed to git)

Environment variables are prefixed with `VITE_` to make them accessible in the client-side code:

```
# Example .env.development
VITE_PORT=3000
VITE_API_URL=http://localhost:8080/api
VITE_NODE_ENV=development
```

To start the application with a specific environment:

```bash
# Development environment
make start-dev

# Staging environment
make start-staging

# Production environment
make start-prod
```

You can also use npm scripts:

```bash
# Development environment
npm run start:dev

# Staging environment 
npm run start:staging

# Production environment
npm run start:prod
```

Environment variables can be accessed in your code through the config utility:

```typescript
import env, { isDev, isProd } from '@/config/env';

// Use environment variables
console.log(`API URL: ${env.API_URL}`);

// Conditional logic based on environment
if (isDev) {
  console.log('Running in development mode');
}
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## Code Style Guidelines

This project follows a consistent code style enforced by ESLint. Some key style rules include:

- **Semicolons**: Required at the end of all statements, including imports
- **Quotes**: Single quotes for strings
- **Indentation**: 2 spaces

To automatically fix any code style issues, run:

```bash
npm run lint:fix
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
