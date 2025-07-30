#!/bin/bash

# Hotel Management System - Git Repository Setup Script

echo "🏨 Setting up Hotel Management System Git Repository..."

# Initialize git repository
echo "📦 Initializing Git repository..."
git init

# Add all files
echo "📝 Adding files to staging..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Hotel Management System

Features:
- Room booking system with filtering and search  
- Food ordering with cart functionality
- Booking management dashboard
- Responsive React frontend with shadcn/ui
- Express.js backend with TypeScript
- In-memory storage for development
- Database ready with Drizzle ORM"

echo "✅ Git repository initialized successfully!"
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub/GitLab"
echo "2. Add remote origin:"
echo "   git remote add origin <your-repo-url>"
echo "3. Push to remote:"
echo "   git push -u origin main"
echo ""
echo "For deployment instructions, see DEPLOYMENT.md"