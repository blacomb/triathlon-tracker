# ⟡ Tri Tracker

A premium triathlon training tracker built with React, Vite, and Supabase.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- [Node.js](https://nodejs.org) v18 or later
- A free [Supabase](https://supabase.com) account

### 2. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/triathlon-tracker.git
cd triathlon-tracker
npm install
```

### 3. Set Up Supabase
1. Go to [supabase.com](https://supabase.com) → New Project
2. Wait for project to initialize (~2 min)
3. Go to **SQL Editor** → paste the contents of `supabase/schema.sql` → Run
4. Go to **Settings → API** and copy:
   - **Project URL**
   - **anon / public key**

### 4. Configure Environment
```bash
cp .env.example .env
```
Open `.env` and fill in:
```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

### 5. Run Locally
```bash
npm run dev
```
Open http://localhost:5173 — create an account and start logging!

---

## ☁️ Deploy to Vercel (Free Hosting)

### Option A — Vercel CLI (Fastest)
```bash
npm install -g vercel
vercel
```
Follow prompts, then add environment variables when asked.

### Option B — GitHub + Vercel Dashboard
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial triathlon tracker"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repository
4. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL` → your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` → your Supabase anon key
5. Click **Deploy** 🚀

Your app will be live at `https://triathlon-tracker-xxx.vercel.app`

---

## 🔧 Supabase Auth Setup

In your Supabase dashboard:
1. Go to **Authentication → URL Configuration**
2. Set **Site URL** to your Vercel URL (e.g. `https://triathlon-tracker.vercel.app`)
3. Add your Vercel URL to **Redirect URLs**

---

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/     # Countdown, charts, stat cards
│   ├── workouts/      # Logger form, workout cards
│   ├── calendar/      # Monthly calendar view
│   ├── plan/          # 12-week training plan
│   ├── layout/        # Sidebar, AppShell
│   └── ui/            # Button, Card, Modal, Badge
├── pages/             # Dashboard, Workouts, Calendar, Plan, Auth
├── hooks/             # useWorkouts (Supabase CRUD)
├── context/           # AuthContext
└── lib/               # supabase.js, constants.js, helpers.js
```

---

## 🎨 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | Frontend framework |
| React Router v6 | Client-side routing |
| Supabase | Auth + PostgreSQL database |
| Recharts | Charts and data visualization |
| date-fns | Date manipulation |
| Lucide React | Icons |

---

## 📅 Training Plan

The built-in 12-week plan auto-calculates based on your June 28 race date:
- **Weeks 1-3**: Base building
- **Week 4**: Recovery
- **Weeks 5-7**: Build phase (threshold work)
- **Week 8**: Recovery
- **Weeks 9-10**: Race simulation
- **Week 11**: Taper begins
- **Week 12**: Race week

---

## 🔮 Future Extensions

The schema is ready for:
- **Nutrition tracking** — add a `nutrition_logs` table
- **Body weight / HRV** — add a `metrics` table
- **Wearable sync** — Garmin/Strava via webhooks, stored in `workouts.source` + `workouts.metadata`
- **Multi-race support** — extend the `races` table
- **Team/coach view** — add `coach_id` to profiles

---

## 🏁 Race Day: June 28, 2025

You've got this. Train smart, taper well, and trust the process. 💪
