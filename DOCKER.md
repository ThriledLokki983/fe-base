# Docker Setup for FE-Base

This document provides instructions for running the frontend application using Docker.

## Prerequisites

- Docker and Docker Compose installed on your system
- Git (to clone the repository)

## Available Docker Configurations

This project includes multiple Docker configurations:

1. **Production Build**: Optimized for deployment with Nginx
2. **Development Environment**: Configured with hot-reloading for development

## Quick Start

### First Time Setup

If this is your first time running the project, use the setup command to generate a package-lock.json and start the development environment:

```bash
# Generate package-lock.json and start development environment
make setup
```

### Environment Variables

The application uses environment variables to configure different settings. Three environment files are provided:

- `.env.development` - Development configuration
- `.env.staging` - Staging/testing configuration
- `.env.production` - Production configuration

You can switch between environments using the Makefile:

```bash
# Start with development environment
make start-dev

# Start with staging environment
make start-staging

# Start with production environment
make start-prod
```

The environment files contain settings like:
- `PORT` - The port number to run the server on
- `NODE_ENV` - The environment name
- `VITE_API_URL` - The API endpoint URL

### For Production

To build and run the production version:

```bash
# Build and start the container
docker-compose up -d frontend

# View logs if needed
docker-compose logs -f frontend
```

The application will be available at http://localhost:80

### For Development

To start the development environment with hot-reloading:

```bash
# Build and start the dev container
docker-compose up -d frontend-dev

# View logs (recommended during development)
docker-compose logs -f frontend-dev
```

The application will be available at http://localhost:3000 with hot-reloading enabled.

### Using the Makefile

This project includes a Makefile that provides convenient shortcuts for common Docker commands:

```bash
# Start development environment
make start-dev

# Start production environment
make start-prod

# View development logs
make logs-dev

# Stop all containers
make stop

# View all available commands
make help
```

## Custom Commands

```bash
# Stop all containers
docker-compose down

# Rebuild containers after making changes to Dockerfile
docker-compose build

# Remove all containers and volumes (clean start)
docker-compose down -v
```

## Configuration Files

- `Dockerfile`: Multi-stage build for production
- `Dockerfile.dev`: Development-specific configuration
- `docker-compose.yml`: Services configuration
- `nginx.conf`: Nginx settings for production

## Volumes

Development mode uses volumes to enable hot-reloading:
- Your local directory is mounted to `/app` in the container
- `node_modules` has its own volume to preserve installed dependencies

## Troubleshooting

If you encounter issues:

1. Make sure Docker is running
2. Check container logs: `docker-compose logs -f <service-name>`
3. Try rebuilding: `docker-compose build --no-cache`
4. Verify port availability: other services might be using ports 80 or 3000

### Common Issues

1. **Missing package-lock.json**
   
   If you encounter an error related to missing package-lock.json:
   ```
   npm error The `npm ci` command can only install with an existing package-lock.json
   ```
   
   Run the following command to generate it:
   ```bash
   make generate-lockfile
   ```
   
   Then try rebuilding and starting the containers again:
   ```bash
   make rebuild
   make start-dev
   ```
