# Docker Setup for Loyalty E-Insurance Platform

This document provides instructions for running the Loyalty E-Insurance Platform using Docker in production.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

To run the application:

```bash
# Using the deployment script (recommended)
./deploy.sh

# Or using npm scripts
pnpm run docker:up

# Or using docker-compose directly
docker-compose up --build -d
```

The application will be available at `http://localhost:3000`

## Available Scripts

The following Docker-related scripts are available in `package.json`:

- `pnpm run deploy` - Deploy using the automated script
- `pnpm run docker:up` - Start the application
- `pnpm run docker:down` - Stop the application
- `pnpm run docker:logs` - View application logs
- `pnpm run docker:clean` - Stop containers and clean up Docker resources

## Architecture

### Multi-Stage Dockerfile

The Dockerfile uses a multi-stage build approach:

1. **Base Stage**: Sets up Node.js environment and installs dependencies using PNPM
2. **Build Stage**: Builds the React application for production
3. **Production Stage**: Uses Nginx to serve the built application

### Service

The `docker-compose.yml` defines a single production-ready service:

- **app**: Production environment with Nginx serving the built React application

## Environment Variables

Make sure to create a `.env` file in the project root with the necessary environment variables:

```env
VITE_GENOVA_BASE_API_URL=your_api_url_here
# Add other environment variables as needed
```

## Volumes

In development mode, the source code is mounted as a volume to enable hot reloading:

- `.:/app` - Source code
- `/app/node_modules` - Node modules (anonymous volume to prevent conflicts)

## Ports

- **Development**: Port 5173 (Vite default)
- **Production**: Port 80 (Nginx default)

## Nginx Configuration

The production build uses a custom Nginx configuration (`nginx.conf`) that:

- Serves the React SPA with proper client-side routing support
- Enables gzip compression
- Sets appropriate cache headers for static assets
- Includes security headers
- Provides a health check endpoint at `/health`

## Troubleshooting

### Common Issues

1. **Port conflicts**: If ports 5173 or 80 are already in use, modify the port mappings in `docker-compose.yml`

2. **Permission issues**: On Linux/macOS, you might need to adjust file permissions:
   ```bash
   sudo chown -R $USER:$USER .
   ```

3. **Build failures**: Clear Docker cache and rebuild:
   ```bash
   pnpm run docker:clean
   docker system prune -a
   pnpm run docker:dev
   ```

### Logs

To view container logs:

```bash
# View logs for development container
docker-compose --profile dev logs -f app-dev

# View logs for production container
docker-compose --profile prod logs -f app-prod
```

## Production Deployment

### Deployment with Existing Nginx Proxy

This application is configured to work with your existing nginx proxy setup on `einsurance.loyaltyinsurancegh.com`. The Docker container exposes port 3000 to match your current nginx configuration.

#### Quick Deployment

Use the provided deployment script:

```bash
./deploy.sh
```

Or manually deploy:

```bash
# Deploy using docker-compose
docker-compose up --build -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

#### Nginx Configuration Compatibility

Your existing nginx configuration at `/etc/nginx/sites-available/einsurance.loyaltyinsurancegh.com` is already set up correctly:

```nginx
location / {
    proxy_pass http://localhost:3000;  # ✅ Matches Docker container port
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

#### Deployment Steps on Server

1. **Clone/Update the repository** on your server
2. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```
3. **Reload nginx** (if needed):
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

#### Health Monitoring

The production container includes health checks accessible at:
- Container health: `http://localhost:3000/health`
- Through nginx: `https://einsurance.loyaltyinsurancegh.com/health`

#### Container Management

```bash
# Stop the application
docker-compose down

# Update and restart
./deploy.sh

# View container stats
docker stats

# Access container logs
docker-compose logs -f app
```

### General Production Considerations

For production deployment, the setup includes:

1. ✅ **Reverse proxy compatibility** (nginx on host machine)
2. ✅ **SSL/TLS certificates** (managed by Certbot)
3. ✅ **Health checks and monitoring**
4. ✅ **Resource limits and security options**
5. ✅ **Proper logging configuration**

## CI/CD Integration

The build service can be used in CI/CD pipelines:

```bash
# Build and extract artifacts
docker-compose --profile build up --build
# The built files will be available in ./dist
```