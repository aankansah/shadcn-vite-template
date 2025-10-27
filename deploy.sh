#!/bin/bash

# Deployment script for Loyalty E-Insurance Platform
# This script deploys the application using Docker Compose

set -e

echo "🚀 Starting deployment of Loyalty E-Insurance Platform..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install it and try again."
    exit 1
fi

# Pull latest changes (if this is a git repository)
if [ -d ".git" ]; then
    echo "📥 Pulling latest changes..."
    git pull origin main || git pull origin master || echo "⚠️  Could not pull latest changes"
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down || true

# Remove old images (optional - uncomment if you want to force rebuild)
# echo "🗑️  Removing old images..."
# docker image prune -f

# Build and start the application
echo "🔨 Building and starting the application..."
docker-compose up --build -d

# Wait for the application to be healthy
echo "⏳ Waiting for application to be healthy..."
sleep 10

# Check if the container is running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Application deployed successfully!"
    echo "🌐 Application is running on http://localhost:3000"
    echo "📊 Check container status: docker-compose ps"
    echo "📋 View logs: docker-compose logs -f"
else
    echo "❌ Deployment failed. Check logs with: docker-compose logs"
    exit 1
fi