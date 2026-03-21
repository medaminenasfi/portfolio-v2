# 🚀 Render Deployment Guide - Complete Setup

## ⚠️ Issue Identified: Node.js Version Mismatch

Your build logs show **Node 18** is being used, but your dependencies require **Node 20+**. Here's how to fix it and deploy successfully.

---

## ✅ Pre-Deployment Checklist

### 1. Update Your `.env` File for Production

Make sure these environment variables are set in your **Render Dashboard**:

```bash
NODE_ENV=production
DB_HOST=dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com
DB_PORT=5432
DB_USER=portfolio_user
DB_PASSWORD=7HLt1wFi2GuvIQ5t02oKZ0stWdCcI90a
DB_NAME=portfolio_o890
JWT_SECRET=<your-secret-key>
PORT=3000
```

### 2. Configure Render Service Settings

In your **Render Dashboard** → Backend Service:

1. **Runtime**: Node
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npm start`
4. **Node Version**: Add a `.nvmrc` file (see below)

---

## 🔧 Fix Node.js Version Issue

### Create `.nvmrc` File

Create this file in your `backend` folder to force Node 20:

```
20
```

✅ **Done!** I've already created the `.nvmrc` file for you with Node version 20.

---

## 📝 Step-by-Step Deployment Instructions

### Method 1: Using render.yaml (Recommended)

The `render.yaml` file is already configured! Just follow these steps:

#### Step 1: Push to GitHub
```bash
git add backend/.nvmrc
git commit -m "Add .nvmrc for Node 20"
git push origin main
```

#### Step 2: Deploy on Render

1. Go to **Render Dashboard** (https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select the `render.yaml` file
5. Click **"Apply"**

Render will automatically:
- Use Node 20 (from `.nvmrc`)
- Build your backend
- Run migrations
- Start the server

---

### Method 2: Manual Configuration

If you prefer to configure manually:

#### Step 1: Create Web Service

1. **Dashboard** → **New +** → **Web Service**
2. Connect your GitHub repo
3. Configure:
   - **Name**: portfolio-backend
   - **Region**: Choose closest to you
   - **Branch**: main
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

#### Step 2: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**:

```
KEY: NODE_ENV
VALUE: production

KEY: DB_HOST
VALUE: dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com

KEY: DB_PORT
VALUE: 5432

KEY: DB_USER
VALUE: portfolio_user

KEY: DB_PASSWORD
VALUE: 7HLt1wFi2GuvIQ5t02oKZ0stWdCcI90a

KEY: DB_NAME
VALUE: portfolio_o890

KEY: JWT_SECRET
VALUE: <generate-a-new-secret>

KEY: PORT
VALUE: 3000
```

#### Step 3: Connect Database

1. **Dashboard** → **New +** → **PostgreSQL**
2. Name: `portfolio-db`
3. Choose free plan
4. After creation, copy the **Internal Database URL**
5. In your web service, add environment variable:
   ```
   KEY: DATABASE_URL
   VALUE: <paste-internal-db-url-here>
   ```

---

## 🔄 Clear Cache & Force Rebuild

If you're still seeing Node 18 in logs:

### Option 1: Clear Cache in Render Dashboard

1. Go to your service in Render Dashboard
2. Click **"Manual Deploy"**
3. Check **"Clear cache"**
4. Click **"Deploy"**

### Option 2: Force Clean Build via Git

```bash
# Add a commit message that forces rebuild
git commit --allow-empty -m "Force clean build with Node 20"
git push origin main
```

---

## 🗄️ Database Migration on Render

After deployment, run migrations:

### Option 1: Auto-run on Deploy (Recommended)

Update your `package.json` scripts:

```json
{
  "scripts": {
    "postinstall": "npm run build && npm run migration:run"
  }
}
```

⚠️ **Warning**: This runs migrations on every deploy. For production, use a separate migration step.

### Option 2: Manual Migration via SSH

1. In Render Dashboard, click **"Shell"** tab
2. Wait for shell to connect
3. Run:
   ```bash
   npm run migration:run
   ```

### Option 3: Local Migration Script

Create `deploy-migrations.js`:

```javascript
const { exec } = require('child_process');

console.log('🚀 Running database migrations...');
exec('npm run migration:run', (error, stdout, stderr) => {
  if (error) {
    console.error(`Migration failed: ${error}`);
    return;
  }
  console.log(`Migrations complete: ${stdout}`);
});
```

---

## 🎯 Post-Deployment Verification

### 1. Check Service Logs

In Render Dashboard:
- Click your service
- Go to **"Logs"** tab
- Look for:
  ```
  [Nest] ... INFO [NestApplication] Application started successfully
  ```

### 2. Test Health Endpoint

Visit: `https://your-app-name.onrender.com/health`

Expected response:
```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" }
  }
}
```

### 3. Test API Endpoints

Visit Swagger docs: `https://your-app-name.onrender.com/api`

Try these endpoints:
- `GET /projects` - List all projects
- `GET /testimonials` - List testimonials
- `GET /resume` - Get resume data

### 4. Verify Database Connection

Check logs for database connection messages:
```
TypeORM has been connected to the database
```

---

## 🛠️ Troubleshooting Common Issues

### ❌ Build Fails with "Unsupported engine"

**Problem**: Still using Node 18

**Solution**:
1. Verify `.nvmrc` file exists with content `20`
2. Clear cache in Render Dashboard
3. Redeploy

### ❌ Database Connection Error

**Problem**: Cannot connect to PostgreSQL

**Solution**:
1. Verify all DB environment variables are set correctly
2. Check if database is active in Render Dashboard
3. Ensure SSL is enabled (Render requires SSL)
4. Test connection string locally:
   ```bash
   $env:PGPASSWORD="7HLt1wFi2GuvIQ5t02oKZ0stWdCcI90a"; 
   psql -h dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com -U portfolio_user -d portfolio_o890
   ```

### ❌ Migrations Fail

**Problem**: Tables not created

**Solution**:
1. Connect via SSH in Render Dashboard
2. Run migrations manually:
   ```bash
   npm run migration:run
   ```
3. Or reset database schema:
   ```sql
   DROP SCHEMA public CASCADE;
   CREATE SCHEMA public;
   ```
   Then run migrations again.

### ❌ Port Binding Error

**Problem**: EADDRINUSE :::3000

**Solution**:
- Render dynamically assigns ports
- Use `process.env.PORT` instead of hardcoded port
- Update `configuration.ts` to use `DATABASE_URL` if available

---

## 🔐 Security Best Practices

### 1. Rotate Database Password

In Render Dashboard:
1. Go to your PostgreSQL database
2. Click **"Settings"**
3. Click **"Reset Password"**
4. Update `DB_PASSWORD` environment variable

### 2. Use Render Secrets

Instead of plain environment variables:
1. Dashboard → **Secrets** → **Add Secret**
2. Store sensitive values (passwords, JWT secret)
3. Reference in your service

### 3. Enable Private Networking

For production:
1. Upgrade to paid plan
2. Enable private networking
3. Restrict database access to your service only

---

## 📊 Monitoring & Maintenance

### View Logs

- **Real-time logs**: Render Dashboard → Logs tab
- **Historical logs**: Click any log entry to expand

### Set Up Alerts

1. Dashboard → **Alerts** → **New Alert**
2. Configure:
   - CPU usage > 80%
   - Memory usage > 80%
   - HTTP errors (5xx) > 10/min

### Automatic Backups

Render automatically backs up your database:
- Daily backups retained for 7 days (free plan)
- Restore from Dashboard → Database → Restore

---

## 🎉 Success Checklist

- ✅ `.nvmrc` file created with Node 20
- ✅ Environment variables configured
- ✅ Database connected
- ✅ Migrations ran successfully
- ✅ Health check passes (`/health`)
- ✅ API endpoints respond
- ✅ No errors in logs
- ✅ Frontend can connect to backend

---

## 📞 Need Help?

### Resources

- **Render Docs**: https://render.com/docs
- **Node.js on Render**: https://render.com/docs/node-version
- **PostgreSQL on Render**: https://render.com/docs/databases
- **Community Forum**: https://community.render.com

### Contact Support

If issues persist:
1. Check service logs for detailed error messages
2. Search community forum for similar issues
3. Contact Render support with logs attached

---

## 🔄 Quick Deploy Commands

### Commit and Push
```bash
cd backend
git add .nvmrc
git commit -m "Fix Node version for Render deployment"
git push origin main
```

### Monitor Deployment
1. Go to Render Dashboard
2. Click your service
3. Watch **Logs** tab for real-time updates

### Rollback if Needed
1. Dashboard → **Deployments**
2. Find last working version
3. Click **"Rollback"**

---

**🎊 Your Render deployment is ready! Push to GitHub and let Render do the rest!**
