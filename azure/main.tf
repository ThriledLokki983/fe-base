# Azure Infrastructure Configuration

provider "azurerm" {
  features {}
}

# Resource Group
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
  tags     = var.tags
}

# Azure Container Registry
resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = var.acr_sku
  admin_enabled       = true
  tags                = var.tags
}

# App Service Plan
resource "azurerm_service_plan" "main" {
  name                = var.app_service_plan_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku
  tags                = var.tags
}

# App Service
resource "azurerm_linux_web_app" "main" {
  name                = var.app_service_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  service_plan_id     = azurerm_service_plan.main.id
  
  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "DOCKER_REGISTRY_SERVER_URL"          = "https://${azurerm_container_registry.acr.login_server}"
    "DOCKER_REGISTRY_SERVER_USERNAME"     = azurerm_container_registry.acr.admin_username
    "DOCKER_REGISTRY_SERVER_PASSWORD"     = azurerm_container_registry.acr.admin_password
    "WEBSITES_PORT"                       = "80"
  }

  site_config {
    always_on                  = true
    health_check_path          = "/"
    container_registry_use_managed_identity = false
    
    application_stack {
      docker_image_name   = "${azurerm_container_registry.acr.login_server}/fe-base:latest"
    }
  }

  tags = var.tags
}

# Front Door (Optional)
resource "azurerm_frontdoor" "main" {
  count               = var.enable_front_door ? 1 : 0
  name                = var.front_door_name
  resource_group_name = azurerm_resource_group.main.name
  tags                = var.tags

  routing_rule {
    name               = "default-routing-rule"
    accepted_protocols = ["Http", "Https"]
    patterns_to_match  = ["/*"]
    frontend_endpoints = ["default-frontend-endpoint"]
    forwarding_configuration {
      forwarding_protocol = "HttpsOnly"
      backend_pool_name   = "default-backend-pool"
    }
  }

  backend_pool {
    name = "default-backend-pool"
    backend {
      host_header = azurerm_linux_web_app.main.default_hostname
      address     = azurerm_linux_web_app.main.default_hostname
      http_port   = 80
      https_port  = 443
    }

    load_balancing_name = "default-load-balancing"
    health_probe_name   = "default-health-probe"
  }

  backend_pool_load_balancing {
    name = "default-load-balancing"
  }

  backend_pool_health_probe {
    name                = "default-health-probe"
    path                = "/"
    protocol            = "Http"
    interval_in_seconds = 30
  }

  frontend_endpoint {
    name                              = "default-frontend-endpoint"
    host_name                         = "${var.front_door_name}.azurefd.net"
    custom_https_provisioning_enabled = false
  }
}

# Outputs
output "app_service_url" {
  value = azurerm_linux_web_app.main.default_hostname
}

output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "front_door_url" {
  value = var.enable_front_door ? "${var.front_door_name}.azurefd.net" : "Front Door not enabled"
}
