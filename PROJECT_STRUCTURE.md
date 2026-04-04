# Triathlon Tracker - Project Structure

```
triathlon-tracker/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── TopBar.jsx
│   │   ├── dashboard/
│   │   │   ├── CountdownWidget.jsx
│   │   │   ├── WeeklyVolumeChart.jsx
│   │   │   ├── DisciplineBreakdown.jsx
│   │   │   ├── PaceTrendChart.jsx
│   │   │   ├── ConsistencyHeatmap.jsx
│   │   │   └── StatCard.jsx
│   │   ├── workouts/
│   │   │   ├── WorkoutLogger.jsx
│   │   │   ├── WorkoutCard.jsx
│   │   │   └── WorkoutList.jsx
│   │   ├── calendar/
│   │   │   └── TrainingCalendar.jsx
│   │   ├── plan/
│   │   │   └── TrainingPlan.jsx
│   │   └── ui/
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Modal.jsx
│   │       └── ProgressRing.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Workouts.jsx
│   │   ├── Calendar.jsx
│   │   ├── Plan.jsx
│   │   └── Auth.jsx
│   ├── lib/
│   │   ├── supabase.js
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── hooks/
│   │   ├── useWorkouts.js
│   │   ├── useTrainingPlan.js
│   │   └── useAuth.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── schema.sql
├── .env.example
├── .gitignore
├── index.html
├── vite.config.js
├── package.json
└── README.md
```
