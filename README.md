# 📊 Nexus Analytics

**Nexus Analytics** is a premium, high-performance business intelligence dashboard designed to transform raw data into actionable foresight. Featuring a stunning glassmorphism interface and predictive modeling capabilities, it provides a state-of-the-art experience for data-driven teams.

---

## ✨ Key Features

- 🚀 **Predictive Analytics:** Built-in linear regression to forecast revenue trends over the next 30 days.
- 💎 **Premium UI/UX:** A cohesive, dark-themed experience with glassmorphism, smooth animations, and responsive design.
- 📈 **Real-time Reporting:** Dynamic KPI cards and interactive charts (Trend, Bar, Pie) powered by Recharts.
- 🔒 **Enterprise Security:** Row-Level Security (RLS) and Supabase Auth integration to keep your data protected.
- 📑 **Data Management:** Easily add, filter, sort, and export transaction records to CSV.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Recharts, React Router.
- **Backend:** Supabase (PostgreSQL, Auth, RLS).
- **Styling:** Vanilla CSS (Glassmorphism + Dark Mode).
- **Deployment:** Optimized for Vercel.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- Supabase account & project

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Running Locally
```bash
npm run dev
```

---

## 🏗️ Production & Deployment

To build the project for production:
```bash
npm run build
```

**Deploying to Vercel:**
1. Connect your repository to Vercel.
2. Add your `.env` variables in the Vercel Project Settings.
3. Deploy! The `vercel.json` is already configured for correct routing.

---

## 📂 Project Structure
- `src/`: React source code (Pages, Components, Hooks, Services).
- `DB/`: SQL scripts for database initialization.
- `analytics_dashboard_prd.md`: Comprehensive product requirements.
- `vercel.json`: Deployment configuration.