# Jay's Frames - Complete Deployment Guide

## 🎯 Overview

This guide will take you from zero to a fully deployed, production-ready system on Railway. Follow each step carefully.

## 📋 Prerequisites Checklist

Before you begin, ensure you have:

- [ ] GitHub account
- [ ] Railway account (free tier works)
- [ ] Anthropic API key (get at console.anthropic.com)
- [ ] Twilio account for SMS (optional but recommended)
- [ ] Node.js 18+ installed locally
- [ ] Git installed locally

## 🚀 Part 1: Local Setup (30 minutes)

### Step 1: Clone and Set Up Repository

```bash
# Create project directory
mkdir jays-frames-system
cd jays-frames-system

# Initialize Git
git init

# Create directory structure
mkdir -p frontend/src/{components/{layout,dashboard,orders,analytics},pages,contexts,utils,styles}
mkdir -p frontend/public/data
mkdir -p backend/src/{routes,controllers,services,models,middleware,utils}
mkdir -p docs scripts

# Copy all the files I've created into their respective locations
# (Download from the artifacts above)
```

### Step 2: Install Dependencies

```bash
# Backend dependencies
cd backend
npm init -y
npm install express cors dotenv pg sequelize @anthropic-ai/sdk twilio nodemailer express-rate-limit helmet morgan winston

# Development dependencies
npm install --save-dev nodemon

# Frontend dependencies
cd ../frontend
npx create-react-app .
npm install react-router-dom recharts lucide-react papaparse lodash axios date-fns

# Return to root
cd ..
```

### Step 3: Configure Environment Variables

```bash
# Backend environment
cd backend
cat > .env << 'EOF'
PORT=3001
NODE_ENV=development

# Database (will be set by Railway)
DATABASE_URL=

# API Keys
ANTHROPIC_API_KEY=your_key_here
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890

# Security
JWT_SECRET=change-this-to-a-random-string

# Frontend URL
FRONTEND_URL=http://localhost:3000
EOF

# Frontend environment
cd ../frontend
cat > .env << 'EOF'
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
EOF
```

### Step 4: Test Locally

```bash
# Terminal 1 - Start backend
cd backend
npm run dev

# Terminal 2 - Start frontend
cd frontend
npm start
```

Visit `http://localhost:3000` - you should see the Jay's Frames dashboard!

## 🌐 Part 2: Deploy to Railway (20 minutes)

### Step 1: Prepare for Deployment

```bash
# Create .gitignore in root
cat > .gitignore << 'EOF'
node_modules/
.env
.env.local
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.vscode/
.idea/
*.swp
*.swo
dist/
build/
EOF

# Create railway.json for backend
cd backend
cat > railway.json << 'EOF'
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "healthcheckPath": "/health",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
EOF

# Create railway.json for frontend
cd ../frontend
cat > railway.json << 'EOF'
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "restartPolicyType": "ON_FAILURE"
  }
}
EOF
```

### Step 2: Push to GitHub

```bash
# Return to root directory
cd ..

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Jay's Frames Production System"

# Create repository on GitHub (via web interface)
# Then connect and push:
git remote add origin https://github.com/yourusername/jays-frames-system.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy Backend to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project
railway init

# Add PostgreSQL database
railway add --database postgresql

# Link to backend service
cd backend
railway up

# Set environment variables in Railway Dashboard:
# 1. Go to railway.app/dashboard
# 2. Select your project
# 3. Click on backend service
# 4. Go to Variables tab
# 5. Add:
#    - ANTHROPIC_API_KEY
#    - TWILIO_ACCOUNT_SID
#    - TWILIO_AUTH_TOKEN
#    - TWILIO_PHONE_NUMBER
#    - JWT_SECRET
#    - FRONTEND_URL (will be your frontend Railway URL)
```

### Step 4: Deploy Frontend to Railway

```bash
# Navigate to frontend
cd ../frontend

# Deploy frontend
railway up

# Get the frontend URL from Railway dashboard
# Update backend FRONTEND_URL variable with this URL
# Update frontend .env with backend URL

# Redeploy both services
cd ../backend
railway up

cd ../frontend
railway up
```

### Step 5: Configure Database

```bash
# Railway automatically sets DATABASE_URL
# Run migrations (we'll create these)
railway run npm run migrate

# Seed initial data
railway run npm run seed
```

## 🔧 Part 3: Configuration & Testing (15 minutes)

### Step 1: Set Up Database Schema

Create `backend/migrations/001_initial_schema.sql`:

```sql
-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  description TEXT,
  frame_size VARCHAR(50),
  material VARCHAR(100),
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2),
  total_price DECIMAL(10,2),
  labor_hours DECIMAL(5,2),
  complexity_score INTEGER,
  due_date DATE,
  status VARCHAR(50) DEFAULT 'pending',
  order_progress VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Goals table
CREATE TABLE goals (
  id SERIAL PRIMARY KEY,
  period VARCHAR(20) NOT NULL,
  type VARCHAR(50) NOT NULL,
  target_value DECIMAL(12,2) NOT NULL,
  current_value DECIMAL(12,2) DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Production stations table
CREATE TABLE production_stations (
  id SERIAL PRIMARY KEY,
  station_name VARCHAR(100) NOT NULL,
  station_number INTEGER NOT NULL,
  current_orders INTEGER DEFAULT 0,
  avg_processing_time DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_due_date ON orders(due_date);
CREATE INDEX idx_orders_customer ON orders(customer_name);
CREATE INDEX idx_goals_period ON goals(period);
```

### Step 2: Test API Endpoints

```bash
# Health check
curl https://your-backend-url.railway.app/health

# Test orders endpoint
curl https://your-backend-url.railway.app/api/orders

# Test analytics endpoint
curl https://your-backend-url.railway.app/api/analytics/dashboard
```

### Step 3: Configure Custom Domain (Optional)

In Railway Dashboard:
1. Select frontend service
2. Go to Settings → Domains
3. Add custom domain (e.g., app.jaysframes.com)
4. Update DNS records as instructed
5. Update backend FRONTEND_URL environment variable

## 📊 Part 4: Data Migration (10 minutes)

### Upload Your Existing Order Data

```bash
# Convert your CSV to SQL insert statements
# Use the provided script
node scripts/csv-to-sql.js /path/to/your/frame-data.csv

# Or import via API
curl -X POST https://your-backend-url.railway.app/api/orders/import \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/frame-data.csv"
```

## 🧪 Part 5: Testing Checklist

- [ ] Homepage loads successfully
- [ ] Can view dashboard with analytics
- [ ] Can create new order
- [ ] Order status updates work
- [ ] Goal tracking displays correctly
- [ ] AI recommendations generate
- [ ] SMS notifications send (if configured)
- [ ] Dark/light theme toggle works
- [ ] Mobile responsive design works
- [ ] Data persists after page refresh

## 🔐 Security Checklist

- [ ] Changed default JWT_SECRET
- [ ] API keys stored in Railway environment variables (not in code)
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] HTTPS enabled (automatic with Railway)
- [ ] Database connection encrypted
- [ ] No sensitive data in Git repository

## 📈 Monitoring & Maintenance

### Set Up Monitoring

1. **Railway Metrics**: Check CPU, memory, and request metrics in Railway dashboard
2. **Error Logging**: Logs automatically captured by Railway
3. **Uptime Monitoring**: Use Railway's built-in health checks

### Regular Maintenance Tasks

**Daily:**
- Check production dashboard for anomalies
- Review new orders and their AI recommendations

**Weekly:**
- Review error logs
- Check goal progress
- Backup database (Railway auto-backups available)

**Monthly:**
- Review API usage and costs
- Update dependencies
- Review and optimize slow queries

## 🆘 Troubleshooting

### Common Issues

**Backend won't start:**
```bash
# Check logs
railway logs --service backend

# Common fixes:
# 1. Check DATABASE_URL is set
# 2. Verify all required env variables exist
# 3. Check for syntax errors in code
```

**Frontend can't reach backend:**
```bash
# Verify CORS settings in backend
# Check REACT_APP_API_URL in frontend env
# Ensure both services are deployed
```

**Database connection fails:**
```bash
# Check Railway PostgreSQL service is running
# Verify DATABASE_URL format
# Check firewall rules (Railway handles this)
```

## 💰 Cost Estimates

**Railway Free Tier:**
- $5/month in free credits
- Sufficient for initial launch and testing

**Expected Costs (After Free Tier):**
- Backend: ~$5-10/month
- Frontend: ~$5-10/month
- PostgreSQL: ~$5-10/month
- **Total: ~$15-30/month**

**Anthropic API:**
- ~$0.01-0.05 per AI recommendation
- Estimated: $10-30/month based on usage

**Twilio SMS:**
- $0.0075 per SMS sent
- Estimated: $5-15/month

**Total Monthly Cost: ~$30-75/month**

## 🎓 Training Resources

1. **Video Tutorials**: Record screen recordings of key workflows
2. **User Manual**: Create step-by-step guides for staff
3. **FAQ Document**: Build as questions come up

## 📞 Support

If you get stuck:
1. Check Railway documentation: docs.railway.app
2. Review error logs carefully
3. Test locally first before deploying
4. Ask for help with specific error messages

## ✅ Deployment Complete!

Your Jay's Frames Production System is now live! 

**Next Steps:**
1. Set your first monthly goal
2. Import existing orders
3. Test all features with real data
4. Train staff on the system
5. Start tracking your improved efficiency!

---

**Built with ❤️ for Jay's Frames - Houston Heights Premier Custom Framing**
