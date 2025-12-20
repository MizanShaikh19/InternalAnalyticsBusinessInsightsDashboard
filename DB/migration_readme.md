# Database Migration Guide
## Analytics Dashboard - Supabase Setup

---

## 📋 Files Overview

You have **5 SQL migration files** to run in order:

1. **`01_create_tables.sql`** - Creates the main `business_records` table
2. **`02_enable_rls.sql`** - Enables Row Level Security (RLS) policies
3. **`03_seed_data.sql`** - Adds ~150 sample records (90 days of data)
4. **`04_helper_functions.sql`** - Creates helper functions for KPI calculations (RECOMMENDED)
5. **`05_create_views.sql`** - Creates convenience views (OPTIONAL)

---

## 🚀 Quick Start Guide

### Step 1: Access Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"** button

---

### Step 2: Run Migrations in Order

#### **Migration 1: Create Tables**
- Open `01_create_tables.sql`
- Copy entire contents
- Paste into Supabase SQL Editor
- Click **"RUN"**
- ✅ Success message: "Success. No rows returned"

#### **Migration 2: Enable RLS**
- Create new query
- Open `02_enable_rls.sql`
- Copy, paste, and **RUN**
- ✅ Success message: "Success. No rows returned"

#### **Migration 3: Seed Data**
- Create new query
- Open `03_seed_data.sql`
- Copy, paste, and **RUN**
- ✅ Success message: "Success. X rows affected" (where X is ~150+)

#### **Migration 4: Helper Functions** (RECOMMENDED)
- Create new query
- Open `04_helper_functions.sql`
- Copy, paste, and **RUN**
- ✅ Success message: "Success. No rows returned"

#### **Migration 5: Create Views** (OPTIONAL)
- Create new query
- Open `05_create_views.sql`
- Copy, paste, and **RUN**
- ✅ Success message: "Success. No rows returned"

---

## ✅ Verification Steps

After running all migrations, verify everything works:

### Check Table Exists
```sql
SELECT COUNT(*) as total_records 
FROM public.business_records;
```
**Expected:** ~150 records

### Check Data Range
```sql
SELECT 
  MIN(record_date) as earliest_date,
  MAX(record_date) as latest_date,
  COUNT(DISTINCT category) as categories
FROM public.business_records;
```
**Expected:**
- earliest_date: ~90 days ago
- latest_date: today
- categories: 5

### Test Helper Function
```sql
SELECT * FROM get_kpi_metrics(
  CURRENT_DATE - 30,
  CURRENT_DATE,
  'all'
);
```
**Expected:** Returns revenue, orders, avg_order_value

### Test View (if you created it)
```sql
SELECT * FROM recent_30_days_summary;
```
**Expected:** Returns category breakdown

---

## 🔑 Get Your Supabase Credentials

After migrations are complete, you need these for your frontend:

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these values:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Save these - you'll need them for the frontend `.env` file!

---

## 📊 What You Just Created

### Database Schema
- ✅ `business_records` table with indexes
- ✅ Auto-updating timestamps
- ✅ Security policies (RLS)
- ✅ 150+ sample records
- ✅ 5 categories: Sales, Service, Product, Subscription, Consulting

### Helper Functions
- ✅ `get_kpi_metrics()` - Calculate revenue, orders, averages
- ✅ `get_growth_rate()` - Period-over-period comparison
- ✅ `get_category_breakdown()` - Category analysis

### Views (if created)
- ✅ `recent_30_days_summary` - Quick 30-day snapshot
- ✅ `daily_revenue_trend` - Daily performance
- ✅ `current_month_by_category` - Monthly breakdown

---

## 🎯 Next Steps

Now that your database is ready:

1. ✅ **Frontend setup** - Create React/Vite project
2. ✅ **Install Supabase client** - `npm install @supabase/supabase-js`
3. ✅ **Configure authentication** - Set up login page
4. ✅ **Build dashboard** - Create KPI cards and data table
5. ✅ **Deploy** - Push to Netlify/Vercel

---

## 🔧 Troubleshooting

### Error: "relation does not exist"
**Solution:** Run migrations in order. Each file depends on previous ones.

### Error: "permission denied"
**Solution:** Make sure you're logged into Supabase and have admin access.

### No data showing up
**Solution:** Re-run `03_seed_data.sql` to generate sample data.

### Function not found
**Solution:** Re-run `04_helper_functions.sql` and check GRANT statements.

---

## 🔄 Reset Database (If Needed)

If you want to start over:

```sql
-- Run this to delete everything
DROP VIEW IF EXISTS recent_30_days_summary CASCADE;
DROP VIEW IF EXISTS daily_revenue_trend CASCADE;
DROP VIEW IF EXISTS current_month_by_category CASCADE;
DROP FUNCTION IF EXISTS get_kpi_metrics(DATE, DATE, TEXT) CASCADE;
DROP FUNCTION IF EXISTS get_growth_rate(DATE, DATE, TEXT) CASCADE;
DROP FUNCTION IF EXISTS get_category_breakdown(DATE, DATE) CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP TABLE IF EXISTS public.business_records CASCADE;
```

Then re-run all migrations from the beginning.

---

## 📝 Notes

- **RLS is enabled** - Only authenticated users can access data
- **Sample data is random** - Each run generates different amounts
- **Helper functions are optional** - But they save you 90% of frontend query code
- **Views are optional** - Useful for quick queries but not required

---

## 🎉 You're Ready!

Your database is now:
- ✅ Secure with RLS
- ✅ Populated with realistic data
- ✅ Optimized with indexes
- ✅ Ready for production

**Time to build the frontend!** 🚀

---

## 📞 Support

If you encounter any issues:
1. Check the verification queries in each file
2. Review error messages carefully
3. Ensure you ran files in correct order
4. Try the troubleshooting section above

Happy coding! 💻