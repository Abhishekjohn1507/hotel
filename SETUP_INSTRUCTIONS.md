# Git Repository Setup for Vercel Deployment

Follow these steps to create your Git repository and deploy to Vercel:

## Step 1: Download/Copy All Files

You'll need to copy all these files to your local machine:

### Core Application Files:
```
client/                 # React frontend
server/                 # Express backend  
shared/                 # Shared types
components.json         # UI components config
drizzle.config.ts      # Database config
package.json           # Dependencies
package-lock.json      # Lock file
tailwind.config.ts     # Tailwind config
tsconfig.json          # TypeScript config
vite.config.ts         # Vite config
postcss.config.js      # PostCSS config
```

### Deployment Files:
```
README.md              # Project documentation
DEPLOYMENT.md          # Deployment guide
.gitignore            # Git ignore rules
.env.example          # Environment template
vercel.json           # Vercel configuration
Dockerfile            # Docker setup
docker-compose.yml    # Docker compose
```

## Step 2: Initialize Git Repository Locally

```bash
# Create new folder
mkdir hotel-management-system
cd hotel-management-system

# Copy all files here (use file manager or copy commands)

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Hotel Management System

Features:
- Room booking system with filtering and search  
- Food ordering with cart functionality
- Booking management dashboard
- Responsive React frontend with shadcn/ui
- Express.js backend with TypeScript
- Database ready with Drizzle ORM"
```

## Step 3: Create GitHub Repository

1. Go to GitHub.com
2. Click "New Repository"
3. Name: `hotel-management-system`
4. Make it public or private
5. Don't initialize with README (you already have one)
6. Create repository

## Step 4: Connect and Push

```bash
# Add remote origin (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/hotel-management-system.git

# Push to GitHub
git push -u origin main
```

## Step 5: Deploy to Vercel

### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Option B: Vercel Dashboard
1. Go to vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the settings
5. Click "Deploy"

## Step 6: Environment Variables

In Vercel dashboard, add these environment variables:
```
DATABASE_URL=your_postgresql_url
NODE_ENV=production
```

## Important Notes:

1. **Database**: The app uses in-memory storage for development. For production, you'll need a PostgreSQL database (recommended: Neon, Supabase, or PlanetScale)

2. **Build Command**: Vercel will automatically use the build script from package.json

3. **Output Directory**: Static files will be in `dist/public`

4. **API Routes**: Backend API will be available at `/api/*`

## Vercel Configuration

The `vercel.json` file is already configured:
- Builds both frontend and backend
- Routes API calls to backend
- Serves static files from frontend

## Troubleshooting

- If build fails, check the Vercel build logs
- Ensure all dependencies are in package.json
- Verify TypeScript compilation with `npm run check`
- Test locally with `npm run build && npm start`

Your hotel management system is ready for production deployment!