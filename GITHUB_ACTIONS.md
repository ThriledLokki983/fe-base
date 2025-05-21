# GitHub Actions

This project includes several GitHub Actions workflows to automate testing, building, and deployment.

## Workflows

### CI (Continuous Integration)

The CI workflow runs on every push to the `main` branch and on pull requests. It performs the following tasks:

- Runs on multiple Node.js versions (18.x and 20.x)
- Installs dependencies
- Runs linters (with continue-on-error enabled for initial setup)
- Runs tests (with continue-on-error enabled for initial setup)
- Builds the project
- Uploads build artifacts

The workflow is configured with `fail-fast: false` to ensure that if one matrix job fails (e.g., the Node.js 18.x build), the other jobs will still run to completion (e.g., the Node.js 20.x build).

### CD (Continuous Deployment)

The CD workflow runs after a successful CI workflow on the `main` branch or can be manually triggered. It performs the following tasks:

- Builds the application for the specified environment
- Creates Docker images
- Pushes Docker images to Docker Hub
- Deploys to the specified environment

### Dependabot Auto-merge

This workflow automatically merges Dependabot pull requests for minor and patch updates.

### Cache Cleanup

This workflow runs weekly to clean up old GitHub Actions caches to prevent storage issues.

### CodeQL Analysis

This workflow runs security scanning using GitHub's CodeQL analysis tool to identify potential security vulnerabilities in your code. It runs on:
- Every push to the main branch
- Pull requests
- Weekly schedule
- Manual trigger

## Usage

### Manual Deployment

You can manually trigger a deployment by:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "CD" workflow
3. Click "Run workflow"
4. Select the environment (development, staging, or production)
5. Click "Run workflow"

### Secrets Required

For the workflows to function properly, you need to add the following secrets to your GitHub repository:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password or access token
