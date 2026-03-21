# 🚀 Quick Start Guide - Render Database

## ✅ What's Been Done

Your `.env` file has been updated with your Render PostgreSQL database credentials:
- **Database**: `portfolio_o890`
- **Host**: `dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com`
- **User**: `portfolio_user`

---

## 🎯 How to Use (Choose One Method)

### **Method 1: Automated Setup (Easiest)** ⭐ Recommended

Just run the setup script:
```bash
setup-database.bat
```

This will:
1. Build your backend
2. Run all database migrations
3. Start your server

---

### **Method 2: Manual Setup**

#### Step 1: Build Backend
```bash
npm run build
```

#### Step 2: Run Migrations
```bash
npm run migration:run
```

#### Step 3: Start Server
```bash
npm run start:dev
```

---

## 🔍 Verify It Works

1. **Check Server**: Open http://localhost:3000
2. **Test API**: Visit http://localhost:3000/api (Swagger docs)
3. **Health Check**: http://localhost:3000/health

---

## 📊 Connect to Your Database

### Using psql (PowerShell):
```powershell
$env:PGPASSWORD="7HLt1wFi2GuvIQ5t02oKZ0stWdCcI90a"; psql -h dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com -U portfolio_user -d portfolio_o890
```

### Using GUI Tools (DBeaver/pgAdmin):
- Host: `dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com`
- Port: `5432`
- Database: `portfolio_o890`
- Username: `portfolio_user`
- Password: `7HLt1wFi2GuvIQ5t02oKZ0stWdCcI90a`
- SSL: `require`

---

## 📖 Full Documentation

See `RENDER_DATABASE_GUIDE.md` for detailed instructions on:
- Database operations
- Troubleshooting
- Deployment to Render
- Security best practices

---

## 🆘 Troubleshooting

**Connection Error?**
- Make sure you're online
- Check if Render database is active
- Verify credentials in `.env`

**Migration Already Run?**
- This is normal if you've connected before
- The database is ready to use!

**Need Help?**
- Read the full guide: `RENDER_DATABASE_GUIDE.md`
- Check Render dashboard for database status

---

**🎉 You're all set! Run `setup-database.bat` to get started!**
