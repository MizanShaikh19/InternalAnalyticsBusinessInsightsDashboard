# 🚀 Nexus Analytics Deployment Guide

Follow these steps to deploy your premium analytics dashboard to **Vercel** and ensure your **Supabase** backend is production-ready.

---

## 🛰️ 1. Supabase Backend Setup

Before deploying the frontend, ensure your database and security policies are correct:

1.  **Run Migrations:** Go to the SQL Editor in your Supabase Dashboard and run the script in `DB/migration.sql`.
2.  **Toggle RLS:** Ensure Row Level Security is **ON** for the `business_records` table.
3.  **Authentication:** Go to `Authentication > URL Configuration` and set your **Site URL** to your future Vercel URL (e.g., `https://your-project.vercel.app`).
4.  **Magic Links (Optional):** If using Magic Links, ensure your SMTP settings are configured or use the default Supabase testing mailer.

---

## 📦 2. Preparing the Frontend

Verify your local environment:

1.  Ensure you have a `.env` file with:
    ```env
    VITE_SUPABASE_URL=https://your-project-id.supabase.co
    VITE_SUPABASE_ANON_KEY=your-anon-key
    ```
2.  Run a final build check:
    ```bash
    npm run build
    ```

---

## ⚡ 3. Deploying to Vercel

### Option A: Vercel Dashboard (Recommended)

1.  **Push to GitHub:** Push your project to a GitHub repository.
2.  **New Project:** In Vercel, click **"Add New" > "Project"**.
3.  **Import:** Select your repository.
4.  **Configure Framework:** Vercel should auto-detect **Vite**.
5.  **Environment Variables:**
    - Open the "Environment Variables" section.
    - Add `VITE_SUPABASE_URL`.
    - Add `VITE_SUPABASE_ANON_KEY`.
6.  **Deploy:** Click Deploy.

### Option B: Vercel CLI

```bash
# Install CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 🛠️ 4. Post-Deployment Checks

1.  **Routing:** Visit `https://your-app.vercel.app/login` and `.../dashboard`. The `vercel.json` file I created handles the client-side routing automatically.
2.  **API Keys:** Ensure your Supabase URL doesn't have a trailing slash (e.g., use `...supabase.co` not `...supabase.co/`).
3.  **Add a Record:** Try adding a record via the dashboard to verify write permissions.

---

## 💡 Pro Tips

- **Custom Domain:** You can add a professional domain in `Settings > Domains` on Vercel.
- **Analytics:** Enable Vercel Analytics in the dashboard to track your dashboard's own traffic!

**Your Nexus Analytics suite is now ready for the world!** 📈✨
