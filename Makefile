# Makefile for fe-base Frontend Application

# Variables (with .env file support)
include .env
export

# Default target
.PHONY: help
help:
	@echo "Available commands:"
	@echo ""
	@echo "Docker commands:"
	@echo "  make start-dev        	- Start development environment using .env.development"
	@echo "  make start-staging    	- Start staging environment using .env.staging"
	@echo "  make start-prod       	- Start production environment using .env.production"
	@echo "  make stop            	- Stop all containers"
	@echo "  make restart-dev     	- Restart dev environment"
	@echo "  make restart-staging 	- Restart staging environment"
	@echo "  make restart-prod    	- Restart production environment"
	@echo "  make logs-dev        	- View development logs"
	@echo "  make logs-staging    	- View staging logs"
	@echo "  make logs-prod       	- View production logs"
	@echo "  make rebuild         	- Rebuild all containers"
	@echo "  make clean           	- Remove all containers and volumes"
	@echo ""
	@echo "Development commands:"
	@echo "  make install         	- Install dependencies locally"
	@echo "  make install-clean   	- Clean install (removes node_modules and package-lock.json first)"
	@echo "  make build           	- Build the application locally"
	@echo "  make build-safe      	- Build with workarounds for Rollup issues"
	@echo "  make build-ci        	- Build using the same script as CI workflow"
	@echo "  make lint            	- Run linter"
	@echo "  make test            	- Run tests"
	@echo "  make dev             	- Run development server locally"
	@echo ""
	@echo "  make generate-lockfile - Generate package-lock.json file"
	@echo ""
	@echo "GitHub Actions commands:"
	@echo "  make act-test        	- Test GitHub Actions workflows locally using nektos/act"
	@echo ""
	@echo "Utility commands:"
	@echo "  make status          	- Check status of containers"
	@echo "  make prune           	- Remove unused Docker resources"
	@echo "  make shell-dev       	- Open shell in development container"
	@echo "  make shell-prod      	- Open shell in production container"
	@echo "  make setup           	- First time setup (generates package-lock.json and starts dev environment)"

# Docker commands
.PHONY: start-dev start-staging start-prod stop restart-dev restart-staging restart-prod logs-dev logs-prod rebuild clean status prune shell-dev shell-prod

start-dev:
	@echo "Starting development environment..."
	@cp .env.development .env
	docker compose up -d frontend-dev
	@echo "Development server running at http://localhost:$$(grep VITE_PORT .env.development | cut -d= -f2)"

start-staging:
	@echo "Starting staging environment..."
	@cp .env.staging .env
	docker compose up -d frontend-dev
	@echo "Staging server running at http://localhost:$$(grep VITE_PORT .env.staging | cut -d= -f2)"

start-prod:
	@echo "Starting production environment..."
	@cp .env.production .env
	docker compose up -d frontend
	@echo "Production server running at http://localhost:$$(grep VITE_PORT .env.production | cut -d= -f2)"

stop:
	@echo "Stopping all containers..."
	docker compose down

restart-dev: stop start-dev

restart-staging: stop start-staging

restart-prod: stop start-prod

logs-dev:
	docker compose logs -f frontend-dev

logs-staging:
	docker compose logs -f frontend-dev

logs-prod:
	docker compose logs -f frontend

rebuild:
	@echo "Rebuilding containers..."
	docker compose build --no-cache

clean:
	@echo "Removing all containers and volumes..."
	docker compose down -v
	@echo "Containers and volumes removed."

status:
	docker compose ps

prune:
	@echo "Removing unused Docker resources..."
	docker system prune -f

shell-dev:
	docker compose exec frontend-dev /bin/sh

shell-prod:
	docker compose exec frontend /bin/sh

# Local development commands
.PHONY: install install-clean build build-safe build-ci lint test dev generate-lockfile open-app

install:
	npm install

install-clean:
	@echo "Cleaning node_modules and package-lock.json before install..."
	rm -rf node_modules package-lock.json
	npm install --no-optional

build:
	npm run build
	
build-safe:
	npm run build:safe
	
build-ci:
	npm run build:ci

lint:
	npm run lint

test:
	npm run test

dev:
	npm run start
	
generate-lockfile:
	@echo "Updating package-lock.json file with all dependencies..."
	npm install
	@echo "Installing development dependencies for testing and build..."
	npm install vitest @vitest/ui @vitest/coverage-v8 jsdom vite-plugin-svgr lucide-react
	@echo "package-lock.json file has been generated with all dependencies."

open-app:
	@echo "Opening app in browser..."
	@PORT=$$(grep VITE_PORT .env | cut -d= -f2); \
	if [ $$(uname) = "Darwin" ]; then \
		open http://localhost:$$PORT; \
	elif [ $$(uname) = "Linux" ]; then \
		xdg-open http://localhost:$$PORT; \
	else \
		start http://localhost:$$PORT; \
	fi

# Build and tag Docker images
.PHONY: build-dev-image build-prod-image

build-dev-image:
	docker build -f Dockerfile.dev -t fe-base:dev .

build-prod-image:
	docker build -t fe-base:latest .

# Custom composite commands
.PHONY: full-rebuild deploy-prod setup act-test

full-rebuild: clean rebuild start-dev
	@echo "Full rebuild completed and development environment started."

deploy-prod: build-prod-image start-prod
	@echo "Production image built and deployed."
	
setup: generate-lockfile
	@echo "Setting up the project for first time use..."
	@echo "Generating package-lock.json..."
	make generate-lockfile
	@echo "Setting up environment files..."
	@cp .env.development .env
	@echo "Starting development environment..."
	make start-dev
	@echo "Setup complete! The application is now running at http://localhost:$$(grep VITE_PORT .env.development | cut -d= -f2)"

# GitHub Actions local testing with nektos/act
act-test:
	@echo "Testing GitHub Actions workflows locally with nektos/act..."
	@if ! command -v act > /dev/null; then \
		echo "nektos/act is not installed. Please install it from https://github.com/nektos/act"; \
		exit 1; \
	fi
	@echo "Running CI workflow..."
	act -j build-and-test
