# Deployment Guide

## Pre-deployment Checklist

### Security
- [ ] Generate strong JWT secret
- [ ] Remove all `.env` files from version control
- [ ] Update `.env.example` with production variables
- [ ] Audit all dependencies for vulnerabilities
- [ ] Review security headers configuration

### Configuration
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database connection
- [ ] Set up proper CORS for production domain
- [ ] Configure HTTPS/SSL certificates
- [ ] Set up proper logging configuration

### Performance
- [ ] Enable production optimizations
- [ ] Configure caching strategies
- [ ] Set up CDN if needed
- [ ] Optimize database queries
- [ ] Implement proper error handling

## Production Environment Setup

### 1. Server Requirements
- Node.js 16+ LTS
- PostgreSQL 12+
- Nginx/Apache (reverse proxy)
- SSL certificate

### 2. Environment Variables
Create production `.env` file:

```env
# Database
DB_HOST=your-production-db-host
DB_PORT=5432
DB_USERNAME=production_db_user
DB_PASSWORD=strong_production_password
DB_NAME=tech_services_production

# Security
JWT_SECRET=your_very_strong_production_jwt_secret
NODE_ENV=production

# Server
PORT=3000
FRONTEND_URL=https://yourdomain.com

# Optional - Logging
LOG_LEVEL=error
```

### 3. Database Setup
```bash
# Create production database
createdb tech_services_production

# Run database schema
psql -U production_db_user -d tech_services_production -f database.sql
```

### 4. Build Process
```bash
# Backend build
cd backend
npm run build

# Frontend build
cd ../frontend
npm run build
```

### 5. Process Management
Use PM2 or similar for process management:

```bash
# Install PM2 globally
npm install -g pm2

# Start backend
pm2 start dist/main.js --name "tech-backend"

# Configure PM2 for frontend (if serving with Node)
pm2 start npm --name "tech-frontend" -- run start
```

### 6. Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Frontend
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 7. Monitoring and Logging
- Set up application monitoring (New Relic, Datadog, etc.)
- Configure error tracking (Sentry, etc.)
- Set up log rotation
- Configure alerts for critical errors

## Post-deployment

### Verification
- [ ] Application loads correctly
- [ ] Authentication works
- [ ] Database connections are successful
- [ ] API endpoints respond properly
- [ ] Frontend assets load correctly
- [ ] SSL certificate is valid

### Ongoing Maintenance
- [ ] Regular security updates
- [ ] Database backups
- [ ] Monitor application performance
- [ ] Review logs regularly
- [ ] Update dependencies
- [ ] Security audits

## Backup Strategy

### Database Backup
```bash
# Daily database backup
pg_dump tech_services_production > backup_$(date +%Y%m%d).sql

# Restore backup
psql -U production_db_user -d tech_services_production -f backup_file.sql
```

### Code Backup
- Use version control (Git)
- Regular repository backups
- Store backups in multiple locations

## Scaling Considerations

For high-traffic applications:
- Load balancing
- Database replication
- CDN implementation
- Caching layers
- Microservices architecture
- Container orchestration (Docker/Kubernetes)