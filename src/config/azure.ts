/**
 * Azure Configuration Utility
 * 
 * This module provides a centralized access point for all Azure-related
 * configuration settings. It reads environment variables and provides
 * a consistent interface for accessing them throughout the application.
 */

// Import environment utility to ensure consistent handling
import { getEnv } from './env';

/**
 * Azure configuration settings
 */
export const azureConfig = {
  /**
   * Azure Resource Group name where all resources are deployed
   */
  resourceGroup: getEnv('VITE_AZURE_RESOURCE_GROUP'),
  
  /**
   * Azure Container Registry name where Docker images are stored
   */
  containerRegistryName: getEnv('VITE_AZURE_CONTAINER_REGISTRY_NAME'),
  
  /**
   * Full ACR URL for accessing the registry
   */
  get containerRegistryUrl(): string {
    return `${this.containerRegistryName}.azurecr.io`;
  },
  
  /**
   * Azure App Service name where the application is deployed
   */
  appServiceName: getEnv('VITE_AZURE_APP_SERVICE_NAME'),
  
  /**
   * Environment-specific web app URL
   */
  get webAppUrl(): string {
    return `https://${this.appServiceName}.azurewebsites.net`;
  },
  
  /**
   * Check if the current environment is deployed to Azure
   */
  isAzureDeployment: getEnv('VITE_NODE_ENV') !== 'development',
};

export default azureConfig;
