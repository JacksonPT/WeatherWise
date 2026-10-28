# WeatherWise — Weather Forecasting App

A responsive single-page weather forecasting application built for the **CS 555 / SSW 555 Agile Methods Scrum Simulation Project**.

## Features (Sprints 1–2)
- Search weather by city name
- Current conditions: temperature, feels-like, humidity, wind, condition icon
- °C / °F unit toggle (persisted)
- 5-day forecast (high/low + icons)
- "Use my location" via browser geolocation
- Save up to 5 favorite cities (persisted in localStorage)
- Light / dark theme toggle (persisted)
- Loading spinner & friendly error states
- Mobile-first responsive design

## Tech Stack
- HTML5 (semantic, ARIA accessible)
- CSS3 (CSS variables, light/dark themes, responsive grid)
- Vanilla JavaScript (ES6+, no build step)
- OpenWeatherMap API (Current Weather + 5-Day / 3-Hour Forecast)

## Getting Started

1. Clone or download this folder.
2. Sign up for a free OpenWeatherMap API key: https://home.openweathermap.org/api_keys
3. Copy `.env.example` to `.env`.
4. Open `.env` and replace `YOUR_OPENWEATHERMAP_API_KEY_HERE` with your key. The local `.env` file is gitignored; never commit a real key.
5. Generate the browser configuration:

   ```bash
   python3 scripts/generate-config.py
   ```

6. Serve the folder with a static server, then open the displayed URL:

   ```bash
   python3 -m http.server 8000
   ```

   Visit http://localhost:8000 in your browser.

No build step or package installation is required. A static server is recommended because browser security policies can block API requests when `index.html` is opened directly from `file://`.

## Project Structure
```
WeatherWise/
├── index.html      # App shell (semantic, ARIA)
├── style.css       # Design system, light/dark themes, responsive
├── app.js          # App logic (API, geolocation, favorites, units, theme)
├── .env.example     # Safe environment-variable template
├── .env             # Local API key and settings (gitignored)
├── scripts/
│   └── generate-config.py # Generates ignored config.js from .env
├── config.js        # Generated browser configuration (gitignored)
├── README.md       # This file
├── ROADMAP.md      # Product roadmap
├── SPRINT_1.md     # Sprint 1 backlog & tasks
├── SPRINT_2.md     # Sprint 2 backlog & tasks
└── REPORT.md       # First Scrum report (Sprints 1–2)
```

## Scrum Artifacts
See `REPORT.md` for the first report covering Sprints 1 and 2, including the Product Backlog, Sprint Backlogs, burndown data, Kanban board, sprint reviews, retrospectives, and challenges.

## License
Student project — educational use only.
