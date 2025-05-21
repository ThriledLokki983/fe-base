# Azure Deployment Guide

This guide describes how to deploy the frontend application to Azure using the provided Azure deployment tools.

## Prerequisites

1. [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
2. [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli) (optional, for infrastructure as code)
3. Docker and Docker Compose installed

## Configuration Files

The Azure deployment configuration consists of:

- **Environment Variables**: `.env.development`, `.env.staging`, and `.env.production` files contain Azure-specific configuration variables.
- **Azure Config Utility**: `src/config/azure.ts` provides a centralized location for all Azure configuration settings.
- **Azure Makefile Commands**: `azure/Makefile.azure` contains commands for managing Azure resources.
- **Terraform Templates**: `azure/main.tf` and `azure/variables.tf` for infrastructure as code deployment.

## Azure Resources

This setup creates and configures the following Azure resources:

1. **Resource Group**: Container for all Azure resources
2. **Azure Container Registry (ACR)**: For storing Docker images
3. **App Service Plan**: For hosting the web application
4. **App Service**: For running the containerized application
5. **Azure Front Door** (optional): For CDN, WAF, and global distribution

## Deployment Methods

### Method 1: Using the Azure Makefile Commands

The simplest way to deploy the application to Azure is using the provided Makefile commands:

```bash
# Initialize Azure resources (one-time setup)
make -f azure/Makefile.azure az-init

# Build and deploy to development environment
make -f azure/Makefile.azure az-deploy-dev

# Build and deploy to staging environment
make -f azure/Makefile.azure az-deploy-staging

# Build and deploy to production environment
make -f azure/Makefile.azure az-deploy-prod
```

### Method 2: Using Terraform (Infrastructure as Code)

For a more automated approach, you can use Terraform:

```bash
# Initialize Terraform
cd azure
terraform init

# Create a plan
terraform plan -out=tfplan -var-file=dev.tfvars

# Apply the plan
terraform apply tfplan
```

## Environment-Specific Deployments

Each environment (development, staging, production) has its own configuration and deployment pipeline:

### Development
- Uses the `.env.development` file
- Deploys to a development App Service
- Container image tag: `dev`

### Staging
- Uses the `.env.staging` file
- Deploys to a staging App Service
- Container image tag: `staging`

### Production
- Uses the `.env.production` file
- Deploys to a production App Service
- Container image tag: `latest`
- Optionally uses Azure Front Door for global distribution

## Useful Commands

```bash
# View the web app URL
make -f azure/Makefile.azure az-get-webapp-url

# Open the web app in a browser
make -f azure/Makefile.azure az-browse-webapp

# View web app logs
make -f azure/Makefile.azure az-logs

# Restart the web app
make -f azure/Makefile.azure az-restart-webapp
```

## Azure Best Practices

1. **Use Azure Container Registry (ACR)** for storing and managing Docker images
2. **Implement a proper CI/CD pipeline** with Azure DevOps or GitHub Actions
3. **Use Azure Key Vault** for managing secrets
4. **Implement proper logging and monitoring** with Azure Monitor and Application Insights
5. **Set up staging slots** for zero-downtime deployments
6. **Use Azure Front Door** for global content delivery and WAF protection
7. **Implement proper backup and disaster recovery** strategies
8. **Follow the least privilege principle** for service identities and access controls
9. **Implement proper security headers** in Nginx configuration
10. **Use Azure CDN** for caching static content

## Troubleshooting

If you encounter issues with the deployment, try the following:

1. Check Azure resource logs: `az webapp log tail --resource-group <group> --name <app-name>`
2. Validate Docker images locally before pushing to ACR
3. Ensure all required environment variables are properly set
4. Verify network configurations and access controls
