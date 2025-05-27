# Multi-stage build for frontend application
# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files for efficient layer caching
COPY package.json ./

# Install dependencies - use a conditional command that works with or without package-lock.json
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy the rest of the application
COPY . .

# Set environment variables with defaults
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production

# Copy the built app from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]