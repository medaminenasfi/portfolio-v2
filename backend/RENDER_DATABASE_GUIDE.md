# Render PostgreSQL Database Setup Guide

## ✅ Database Configuration Complete!

Your Render PostgreSQL database has been configured with the following details:

- **Host**: `dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com`
- **Port**: `5432`
- **Database**: `portfolio_o890`
- **Username**: `portfolio_user`
- **Password**: `7HLt1wFi2GuvIQ5t02oKZ0stWdCcI90a`

---

## 🚀 How to Use Your Database

### **Option 1: Run Your NestJS Backend (Recommended)**

Your backend is already configured to use the Render database. Just start your server:

```bash
cd backend
npm run start:dev
```

The application will automatically connect to your Render database using the credentials in the `.env` file.

### **Option 2: Connect Using psql Command Line**

You can connect directly to your database using the psql client:

#### **Windows PowerShell:**
```powershell
$env:PGPASSWORD="7HLt1wFi2GuvIQ5t02oKZ0stWdCcI90a"; psql -h dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com -U portfolio_user -d portfolio_o890
```

#### **Or using the connection string:**
```powershell
psql "postgresql://portfolio_user:7HLt1wFi2GuvIQ5t02oKZ0stWdCcI90a@dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com/portfolio_o890"
```

### **Option 3: Use a GUI Tool**

You can connect using popular database GUI tools:

#### **DBeaver, pgAdmin, or TablePlus:**
- **Host**: `dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com`
- **Port**: `5432`
- **Database**: `portfolio_o890`
- **Username**: `portfolio_user`
- **Password**: `7HLt1wFi2GuvIQ5t02oKZ0stWdCcI90a`
- **SSL Mode**: `require` (Render requires SSL)

---

## 🔧 Running Database Migrations

Since this is a fresh database, you need to run migrations to create tables:

### **Step 1: Build Your Backend**
```bash
cd backend
npm run build
```

### **Step 2: Run Migrations**
```bash
npm run migration:run
```

This will create all necessary tables:
- Users (for authentication)
- Projects
- Testimonials
- Resume & Resume Sections
- Skills
- Certifications
- Languages
- Contact Messages
- Analytics
- Settings

### **Step 3: Seed Initial Data (Optional)**
If you have seed scripts:
```bash
npm run seed:run
```

---

## 📝 Common Database Operations

### **Check Connection**
Test if your database is accessible:
```bash
$env:PGPASSWORD="7HLt1wFi2GuvIQ5t02oKZ0stWdCcI90a"; psql -h dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com -U portfolio_user -d portfolio_o890 -c "SELECT version();"
```

### **View All Tables**
```sql
\dt
```

### **View Sample Data**
```sql
SELECT * FROM users LIMIT 5;
SELECT * FROM projects LIMIT 5;
```

### **Reset Database (if needed)**
To drop all tables and start fresh:
```sql
-- Be careful! This deletes all data
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```
Then run migrations again.

---

## 🔐 Security Best Practices

⚠️ **IMPORTANT**: Your database password is now visible in the `.env` file

### **For Production:**
1. **Never commit `.env` to Git** - It's already in `.gitignore`
2. **Use environment variables** in your deployment platform (Render, Heroku, etc.)
3. **Rotate your password** periodically from Render dashboard

### **For Development:**
- Keep your `.env` file secure
- Don't share credentials publicly

---

## 🌐 Deploying to Render

When deploying your backend to Render:

1. **Add Environment Variables** in Render Dashboard:
   ```
   NODE_ENV=production
   DB_HOST=dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com
   DB_PORT=5432
   DB_USER=portfolio_user
   DB_PASSWORD=7HLt1wFi2GuvIQ5t02oKZ0stWdCcI90a
   DB_NAME=portfolio_o890
   JWT_SECRET=your_secret_here
   ```

2. **Run Migrations on Deploy**:
   Add this to your deploy command:
   ```bash
   npm run build && npm run migration:run
   ```

---

## 🛠️ Troubleshooting

### **Connection Issues?**
1. Check if Render database is active (visit Render dashboard)
2. Verify your IP is allowed (Render allows public access by default)
3. Ensure SSL is enabled in your connection

### **Migration Errors?**
```bash
# Reset migrations table
$env:PGPASSWORD="7HLt1wFi2GuvIQ5t02oKZ0stWdCcI90a"; psql -h dpg-d6pq27v5gffc73dp2us0-a.oregon-postgres.render.com -U portfolio_user -d portfolio_o890 -c "DROP TABLE IF EXISTS migrations;"
```
Then run migrations again.

### **Need Help?**
- Render Docs: https://render.com/docs/databases
- TypeORM Docs: https://typeorm.io/

---

## ✨ Next Steps

1. ✅ Start your backend: `npm run start:dev`
2. ✅ Run migrations: `npm run migration:run`
3. ✅ Test API endpoints (check Swagger at `http://localhost:3000/api`)
4. ✅ Connect your frontend to the backend

---

**🎉 Your Render database is ready to use!**
