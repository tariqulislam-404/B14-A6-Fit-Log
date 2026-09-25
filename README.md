<div align="center">

<img src="./assets/logo.png" width="72" alt="FitLog Logo" />

# 🏋️ FitLog — Workout Library

**Train with intent. Log every set.**

FitLog is a dark-themed, no-nonsense workout tracking web application where users can browse exercises, build their own daily workout plan, and track their training progress.

</div>

---

## 📖 About the Project

FitLog is a gym companion app that helps users:

- ✅ Browse 12 different exercises/workouts (Bench Press, Squat, Deadlift, Pull Up, etc.)
- ✅ View detailed info for each workout — duration, calories burned, difficulty level, sets/reps, and step-by-step instructions
- ✅ Sort the workout list by Duration, Calories, or Rating
- ✅ Build a personal **"Today's Plan"** (up to 5 workouts at a time)
- ✅ **Save** favorite workouts to revisit later
- ✅ Mark workouts from the plan as **Done**
- ✅ Never lose progress — everything is persisted in `localStorage`

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🏠 **Workout Library** | All workouts displayed in a grid on the home page |
| 🔍 **Sorting** | Instantly sort by Duration / Calories / Rating |
| 📄 **Workout Detail Page** | Each workout has its own dynamic page (`/workout/[id]`) |
| 📝 **My Plan** | Build a daily plan from your favorite workouts |
| 💾 **Save for Later** | Bookmark workouts to check out later |
| 🔔 **Toast Notifications** | Instant feedback for every action |
| 🌐 **API + Fallback Data** | Tries to fetch data from an external API, falls back to built-in data if unavailable — the app never breaks |
| 📱 **Responsive Dark UI** | Fully dark-themed and mobile-friendly design |

---

## 🛠️ Tech Stack

### Frontend Framework
- **[Next.js 14](https://nextjs.org/)** — React framework (using the App Router)
- **[React 18](https://react.dev/)** — For building the UI
- **[TypeScript](https://www.typescriptlang.org/)** — For type-safe code

### Styling
- **Plain CSS** (`globals.css`) — Custom hand-crafted dark theme, no UI library used

### State Management
- **React Context API** (`app-provider.tsx`) — Manages global state (plan, saved items)
- **`localStorage`** — Persists data in the browser

### Design Tools
- **Figma** (`Fit Log.fig`) — UI/UX design file
- **Penpot** (`Fit Log.penpot`) — Open-source design alternative

### Data Layer
- Custom **REST API fetch** (`lib/api.ts`) — fetches workout data from an external endpoint
- **Fallback dataset** — 12 pre-defined workouts used if the API call fails

### Project Structure
```
B14-A6-Fit-Log/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page (Workout Library)
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── my-plan/            # "My Plan" page
│   └── workout/[id]/       # Dynamic workout detail page
├── components/
│   ├── app-provider.tsx    # Global state (Context API)
│   ├── chrome.tsx          # Navbar + Footer
│   ├── home-library.tsx    # Workout grid + sorting logic
│   ├── workout-card.tsx    # Individual workout card
│   └── detail-actions.tsx  # Add/Save/Done buttons
├── lib/
│   ├── api.ts               # Data fetching + fallback logic
│   └── types.ts             # TypeScript types + fallback data
├── assets/                  # Logo, banner images
└── UI/                      # Figma & Penpot design files
```


## 👤 Author

**Tariqul Islam**
GitHub: [@tariqulislam-404](https://github.com/tariqulislam-404)


<div align="center">

Made with 💪 and ☕ by Tariqul

</div>
