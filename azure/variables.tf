# Azure Deployment Configuration

# Resource Group
variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure region where resources will be created"
  type        = string
  default     = "eastus"
}

# Container Registry
variable "acr_name" {
  description = "Name of the Azure Container Registry"
  type        = string
}

variable "acr_sku" {
  description = "SKU for Azure Container Registry"
  type        = string
  default     = "Basic"
}

# App Service
variable "app_service_plan_name" {
  description = "Name of the App Service Plan"
  type        = string
}

variable "app_service_name" {
  description = "Name of the App Service"
  type        = string
}

variable "app_service_sku" {
  description = "SKU for App Service Plan"
  type        = string
  default     = "P1v2"
}

# Front Door (optional)
variable "enable_front_door" {
  description = "Whether to enable Azure Front Door"
  type        = bool
  default     = false
}

variable "front_door_name" {
  description = "Name of the Front Door"
  type        = string
  default     = ""
}

# Tags
variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}
