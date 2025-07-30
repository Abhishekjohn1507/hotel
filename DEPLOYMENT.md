# Deployment Guide

This guide will help you deploy the Hotel Management System to various platforms.

## Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd hotel-management-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

## Production Deployment Options

### Option 1: Docker Deployment

1. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

2. **Or build manually**
```bash
docker build -t hotel-management .
docker run -p 5000:5000 hotel-management
```

### Option 2: Vercel Deployment

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

3. **Create `vercel.json` configuration:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ]
}
```

### Option 3: Railway Deployment

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login and deploy**
```bash
railway login
railway init
railway up
```

3. **Add environment variables in Railway dashboard**

### Option 4: DigitalOcean App Platform

1. **Create app.yaml**
```yaml
name: hotel-management
services:
- name: web
  source_dir: /
  github:
    repo: your-username/hotel-management
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
```

## Database Setup for Production

### Using Neon Database (Recommended)

1. **Create account at neon.tech**
2. **Create new project**
3. **Copy connection string**
4. **Set DATABASE_URL environment variable**

### Using PostgreSQL

1. **Set up PostgreSQL server**
2. **Create database**
```sql
CREATE DATABASE hotel_management;
CREATE USER hotel_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE hotel_management TO hotel_user;
```

3. **Run migrations**
```bash
npm run db:push
```

## Environment Variables

Create `.env` file with:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/hotel_management
NODE_ENV=production
PORT=5000
```

## Build Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Production**: `npm start`
- **Type Check**: `npm run check`
- **Database Push**: `npm run db:push`

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change PORT in environment variables
   - Kill existing processes: `pkill -f node`

2. **Database connection fails**
   - Verify DATABASE_URL format
   - Check database server is running
   - Ensure user has proper permissions

3. **Build fails**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear build cache: `npm run clean && npm run build`

### Performance Optimization

1. **Enable gzip compression**
2. **Use CDN for static assets**
3. **Implement database connection pooling**
4. **Add Redis for session management**

## Monitoring and Logs

- Use `pm2` for process management in production
- Implement proper logging with Winston
- Set up health checks for uptime monitoring
- Use error tracking services like Sentry

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure environment variables
- [ ] Implement rate limiting
- [ ] Add CORS configuration
- [ ] Use helmet.js for security headers
- [ ] Validate all user inputs
- [ ] Implement proper authentication