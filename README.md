# jaysintakevsoutakevsgoals - Complete Production & Analytics System

> Enterprise-grade custom framing business management platform with AI-powered analytics, production tracking, and goal optimization.

## 🎯 System Overview

This is a comprehensive business management system designed specifically for Jay’s Frames in Houston Heights. It combines production tracking, order management, customer communications, and AI-powered business intelligence to optimize operations and profitability.

### Core Capabilities

- **📊 Production Analytics** - Real-time tracking of order intake vs. completion
- **🎯 Goal Management** - Set and track sales, profit, and efficiency goals
- **🤖 AI Recommendations** - Intelligent suggestions for pricing, staffing, and operations
- **📦 Order Management** - Complete lifecycle tracking from intake to delivery
- **💰 Profitability Analysis** - Per-order profit margins and ROI calculations
- **🔔 Automated Notifications** - SMS/Email updates for customers and staff
- **📈 Business Intelligence** - Predictive analytics and trend analysis

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+ (or Railway PostgreSQL)
- Anthropic API key (for AI features)
- Twilio account (for SMS notifications)

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/jays-frames-system.git
cd jays-frames-system

# Install dependencies for both frontend and backend
npm run install:all

# Set up environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your credentials

# Start development servers (both frontend and backend)
npm run dev

# Or start them separately:
npm run dev:backend  # Starts on port 3001
npm run dev:frontend # Starts on port 3000
```

### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Add PostgreSQL
railway add postgresql

# Deploy backend
cd backend
railway up

# Deploy frontend
cd ../frontend
railway up

# Link services and set environment variables via Railway dashboard
```

## 📁 Repository Structure

```
jays-frames-system/
├── frontend/                    # React application
│   ├── public/
│   │   ├── index.html
│   │   └── data/
│   │       └── frame-data.csv  # Sample order data
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── MetricCard.jsx
│   │   │   │   ├── ProductionChart.jsx
│   │   │   │   ├── GoalProgressBar.jsx
│   │   │   │   └── RecommendationPanel.jsx
│   │   │   ├── orders/
│   │   │   │   ├── OrderIntakeForm.jsx
│   │   │   │   ├── OrderList.jsx
│   │   │   │   ├── OrderCard.jsx
│   │   │   │   └── ProductionKanban.jsx
│   │   │   └── analytics/
│   │   │       ├── ProfitabilityChart.jsx
│   │   │       ├── TrendAnalysis.jsx
│   │   │       └── ReportGenerator.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── OrderIntake.jsx
│   │   │   ├── ProductionTracking.jsx
│   │   │   ├── GoalManagement.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── Settings.jsx
│   │   ├── contexts/
│   │   │   └── AppContext.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   ├── calculations.js
│   │   │   └── formatters.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── Dashboard.css
│   │   │   └── components.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── railway.json
├── backend/                     # Express.js API
│   ├── src/
│   │   ├── routes/
│   │   │   ├── orders.js
│   │   │   ├── analytics.js
│   │   │   ├── goals.js
│   │   │   └── notifications.js
│   │   ├── controllers/
│   │   │   ├── orderController.js
│   │   │   ├── analyticsController.js
│   │   │   └── aiController.js
│   │   ├── services/
│   │   │   ├── analyticsEngine.js
│   │   │   ├── aiService.js
│   │   │   ├── notificationService.js
│   │   │   └── calculationService.js
│   │   ├── models/
│   │   │   ├── Order.js
│   │   │   ├── Goal.js
│   │   │   └── Customer.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   └── utils/
│   │       ├── database.js
│   │       └── logger.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── railway.json
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── AI_FEATURES.md
├── scripts/
│   ├── migrate.js
│   ├── seed.js
│   └── backup.js
├── .gitignore
├── package.json             # Root package.json for scripts
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

```env
# Server
PORT=3001
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@host:5432/jaysframes

# API Keys
ANTHROPIC_API_KEY=your_anthropic_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# JWT
JWT_SECRET=your-super-secret-key-change-this-in-production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend.railway.app

# Email (optional)
SENDGRID_API_KEY=your_sendgrid_key
FROM_EMAIL=hello@jaysframes.com
```

#### Frontend (.env)

```env
REACT_APP_API_URL=https://your-backend.railway.app
REACT_APP_ENVIRONMENT=production
```

## 🎨 Features In Detail

### 1. Production Analytics Dashboard

**What it does:**

- Tracks order intake rate (orders/week)
- Monitors completion rate
- Calculates capacity utilization
- Identifies bottlenecks in production

**Key Metrics:**

- Orders in pipeline
- Average completion time
- Revenue per order
- Profit margins

### 2. Goal Management System

**Set goals for:**

- Monthly revenue targets
- Order completion quotas
- Profit margin objectives
- Customer satisfaction scores

**AI-Powered Insights:**

- Pace analysis (on track / behind / ahead)
- Required daily performance
- Recommended adjustments

### 3. AI Business Coach

**Capabilities:**

- Pricing recommendations based on complexity
- Staffing level suggestions
- Production scheduling optimization
- Customer communication templates

**Example Insights:**

- “Increase prices 15% on complex multi-mat orders”
- “You need 2 additional orders/day to hit monthly goal”
- “Bottleneck detected at mat cutting station”

### 4. Order Management

**Full Lifecycle Tracking:**

1. Intake → Record customer details, artwork, specifications
1. Design → Frame/mat selection, pricing
1. Materials → Order from Larson Juhl
1. Production → Track through 16 stations
1. Quality Check → Final inspection
1. Delivery → Customer notification and pickup

### 5. Automated Communications

**Customer Notifications:**

- Order received confirmation
- Production started
- Quality check complete
- Ready for pickup

**Internal Alerts:**

- Low inventory warnings
- Overdue order alerts
- Goal milestone notifications

## 🤖 AI Features

### Powered by Claude (Anthropic)

1. **Business Strategy Assistant**
- Analyzes your business data
- Provides actionable recommendations
- Answers specific business questions
1. **Dynamic Pricing Engine**
- Calculates optimal prices per order
- Factors in: complexity, materials, time, competition
1. **Production Optimizer**
- Suggests daily production schedule
- Identifies efficiency improvements
- Predicts completion times
1. **Customer Communication**
- Generates professional response templates
- Handles common inquiries via chatbot
- Sentiment analysis on feedback

## 📊 Analytics & Reporting

### Real-Time Dashboards

- Revenue tracking
- Profitability by order type
- Customer acquisition trends
- Production efficiency metrics

### Custom Reports

- Weekly performance summary
- Monthly financial analysis
- Year-over-year comparisons
- Customer lifetime value

### Predictive Analytics

- Revenue forecasting
- Demand prediction
- Capacity planning
- Churn risk analysis

## 🔐 Security

- JWT authentication for API endpoints
- Role-based access control (Owner, Manager, Staff)
- Encrypted database connections
- Secure API key storage
- CORS protection
- Rate limiting on public endpoints

## 🧪 Testing

```bash
# Run all tests
npm test

# Backend tests only
npm run test:backend

# Frontend tests only
npm run test:frontend

# E2E tests
npm run test:e2e
```

## 📚 Documentation

Detailed documentation available in `/docs`:

- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [AI Features Guide](docs/AI_FEATURES.md)

## 🤝 Support

**Business Owner:** Jay Johnson  
**Location:** Houston Heights, TX  
**Email:** hello@jaysframes.com  
**Phone:** (713) 555-FRAME

## 📝 License

Proprietary - © 2025 Jay’s Frames. All rights reserved.

## 🎯 Roadmap

### Phase 1 - Core System (Current)

- [x] Production analytics
- [x] Order management
- [x] Goal tracking
- [x] AI recommendations

### Phase 2 - Advanced Features (Q2 2025)

- [ ] Mobile app (iOS/Android)
- [ ] Customer self-service portal
- [ ] Larson Juhl API integration
- [ ] Automated accounting sync (QuickBooks)

### Phase 3 - Scale (Q3 2025)

- [ ] Multi-location support
- [ ] Franchise management tools
- [ ] Advanced inventory forecasting
- [ ] Industry benchmarking

-----

**Built with ❤️ for custom framers who want to work smarter, not harder.**
