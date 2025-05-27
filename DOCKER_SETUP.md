# Docker Setup for fe-base-react-template

This document explains how to set up Docker publishing for the fe-base-react-template package.

## Prerequisites

### 1. DockerHub Repository Setup

1. **Create DockerHub Repository**:
   - Go to [DockerHub](https://hub.docker.com/)
   - Sign in to your account (`thriledlokkie983`)
   - Click "Create Repository"
   - Set repository name to: `fe-base-react-template`
   - Set visibility to: Public
   - Add description: "Modern React application template with TypeScript, Vite, and Docker support"

### 2. GitHub Secrets Configuration

The following secrets need to be configured in the GitHub repository settings:

1. **DOCKER_USERNAME**: Your DockerHub username (`thriledlokkie983`)
2. **DOCKER_PASSWORD**: Your DockerHub password or access token

#### Setting up GitHub Secrets:

1. Go to your GitHub repository: `https://github.com/ThriledLokki983/fe-base`
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add the following secrets:
   - Name: `DOCKER_USERNAME`, Value: `thriledlokkie983`
   - Name: `DOCKER_PASSWORD`, Value: `your-dockerhub-password-or-token`

> **Recommendation**: Use a DockerHub Access Token instead of your password:
> 1. Go to DockerHub → Account Settings → Security
> 2. Create a new Access Token with Read, Write, Delete permissions
> 3. Use this token as the `DOCKER_PASSWORD` secret

## Current Configuration

The Docker workflow (`.github/workflows/docker.yml`) is configured to:

- **Repository**: `thriledlokkie983/fe-base-react-template`
- **Trigger**: On git tags (`v*`) and pushes to main branch
- **Platforms**: `linux/amd64`, `linux/arm64`
- **Tags**: Semantic versioning (latest, major, minor, patch versions)

## Troubleshooting

### "insufficient_scope: authorization failed"

This error typically occurs when:

1. **Repository doesn't exist**: Ensure `thriledlokkie983/fe-base-react-template` repository exists on DockerHub
2. **Invalid credentials**: Check that GitHub secrets `DOCKER_USERNAME` and `DOCKER_PASSWORD` are correctly set
3. **Insufficient permissions**: Ensure the credentials have push access to the repository

### Testing Local Docker Build

To test the Docker build locally:

```bash
# Build the image
docker build -t fe-base-react-template:test ./template

# Run the container
docker run -p 5173:5173 fe-base-react-template:test

# Test production build
docker build -t fe-base-react-template:prod --target production ./template
docker run -p 80:80 fe-base-react-template:prod
```

## Manual Docker Publishing

If automated publishing fails, you can publish manually:

```bash
# Navigate to the project root
cd /path/to/fe-base

# Build and tag the image
docker build -t thriledlokkie983/fe-base-react-template:latest ./template
docker build -t thriledlokkie983/fe-base-react-template:1.0.6 ./template

# Login to DockerHub
docker login

# Push the images
docker push thriledlokkie983/fe-base-react-template:latest
docker push thriledlokkie983/fe-base-react-template:1.0.6
```

## Verification

After successful setup, you should be able to:

1. **View the repository**: `https://hub.docker.com/r/thriledlokkie983/fe-base-react-template`
2. **Pull the image**: `docker pull thriledlokkie983/fe-base-react-template:latest`
3. **Use in Docker Compose**: Reference the image in docker-compose files

## Next Steps

Once Docker publishing is working:

1. Update the main README.md to include Docker usage examples
2. Consider adding Docker Compose examples for development
3. Set up automated vulnerability scanning for the Docker images
