# 🚀 Deploy to Render - Complete Guide

## 📋 Prerequisites
- GitHub account with your backend code pushed
- Render account (free tier available)

## 🔧 Step 1: Prepare Your Backend

### Files Created for You:
- ✅ `render.yaml` - Render configuration
- ✅ `Procfile` - Process instructions
- ✅ `.env.example` - Environment variables template
- ✅ Updated `package.json` with `postinstall` script

### Push to GitHub:
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

## 🌐 Step 2: Deploy to Render

### Option A: Using render.yaml (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will auto-detect your `render.yaml`
5. Review and click "Create Blueprint"

### Option B: Manual Setup
1. Go to Render Dashboard
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: portfolio-backend
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

## 🗄️ Step 3: Database Setup

### PostgreSQL Database:
1. In Render, click "New" → "PostgreSQL"
2. **Name**: portfolio-db
3. **Database Name**: portfolio
4. **User**: portfolio_user
5. **Plan**: Free
6. Click "Create Database"

### Connect Database to Backend:
1. Go to your backend service settings
2. Add Environment Variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Copy from database page

## 🔐 Step 4: Environment Variables

Add these to your backend service:

```bash
NODE_ENV=production
APP_NAME=portfolio-api
APP_PORT=10000
JWT_SECRET=generate-secure-random-string
DATABASE_URL=your-render-db-connection-string
```

## 🔄 Step 5: Update Configuration

### Update CORS for Production:
In your `src/main.ts`, update CORS origins:
```typescript
app.enableCors({
  origin: [
    'https://your-frontend-domain.onrender.com',
    'https://portfolio-backend.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

## 📡 Step 6: Access Your Deployed API

### Your API Endpoints:
- **API Base**: `https://portfolio-backend.onrender.com/api`
- **Swagger Docs**: `https://portfolio-backend.onrender.com/docs`
- **Health Check**: `https://portfolio-backend.onrender.com/health`

### Test Your Deployment:
```bash
# Test health endpoint
curl https://portfolio-backend.onrender.com/health

# Test Swagger docs
# Open in browser: https://portfolio-backend.onrender.com/docs
```

## 🛠️ Step 7: Troubleshooting

### Common Issues:

#### 1. Build Fails
- Check `package.json` scripts
- Verify all dependencies are installed
- Check build logs in Render

#### 2. Database Connection
- Verify `DATABASE_URL` is correct
- Check database is running
- Test connection manually

#### 3. Port Issues
- Use port 10000 (Render's default)
- Update `APP_PORT` environment variable

#### 4. CORS Issues
- Add frontend domain to CORS origins
- Check preflight requests

### View Logs:
1. Go to your service in Render
2. Click "Logs" tab
3. Check build and runtime logs

## 🔄 Step 8: Continuous Deployment

### Auto-Deploy on Push:
1. Go to service settings
2. Enable "Auto-Deploy" 
3. Now every push to main branch triggers deployment

### Manual Deploy:
1. Go to service
2. Click "Manual Deploy"
3. Choose branch and deploy

## 📱 Step 9: Frontend Integration

Update frontend API URLs:
```typescript
// Production
const API_BASE_URL = 'https://portfolio-backend.onrender.com/api';

// Development
const API_BASE_URL = 'http://localhost:3000/api';
```

## 🎯 Step 10: Monitor Your App

### Render Features:
- **Metrics**: CPU, memory, response times
- **Logs**: Real-time application logs
- **Alerts**: Get notified on issues
- **Snapshots**: Automatic backups

### Health Monitoring:
```typescript
// Your health endpoint is already configured
GET /health
```

## 💡 Pro Tips

1. **Use Environment Variables**: Never hardcode secrets
2. **Monitor Logs**: Check regularly for issues
3. **Database Backups**: Render handles this automatically
4. **Domain Customization**: Add custom domain later
5. **SSL Certificates**: Auto-provided by Render

## 🎉 You're Live!

Your NestJS backend with Swagger documentation is now deployed on Render! 🚀

### What You Get:
- ✅ **Live API**: `https://your-app.onrender.com/api`
- ✅ **Swagger Docs**: `https://your-app.onrender.com/docs`
- ✅ **Free SSL Certificate**
- ✅ **Auto-deployment**
- ✅ **Database included**
- ✅ **Monitoring tools**

### Next Steps:
1. Deploy your frontend
2. Test the full application
3. Set up custom domain (optional)
4. Monitor performance
