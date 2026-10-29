# WeatherWise — Weather Forecasting App

A responsive single-page weather forecasting application built for the **CS 555 / SSW 555 Agile Methods Scrum Simulation Project**. This `test/demo` branch is a no-key demo for GitHub Pages.

## Demo Features
- Fixed sample current conditions and a five-day forecast for New York
- Search and location controls show a red “API key required — this is only a demo.” message; they never make API requests
- °C / °F unit toggle and light / dark theme toggle (persisted)
- Responsive, accessible interface with keyboard focus and live feedback

The displayed weather is sample data, not live conditions. This branch is intended for demonstration and does not need an API key.

## Run Locally

Serve this folder with any static server, then open the displayed URL:

```bash
python3 -m http.server 8000
```

Visit http://localhost:8000 in your browser.

## Publish with GitHub Pages

Push this branch to GitHub, then select **Settings → Pages → Deploy from a branch**, choose `test/demo` and the root (`/`) folder, and save. GitHub will display the Pages URL when deployment is ready.

## Original Application Features
- Search weather by city name (requires an API key outside demo mode)
- Current conditions: temperature, feels-like, humidity, wind, condition icon
- °C / °F unit toggle (persisted)
- 5-day forecast with daily highs/lows aggregated from 3-hour data
- "Use my location" via browser geolocation, with city-search fallback
- Explicitly save, revisit, and remove up to 5 favorite cities (persisted in localStorage)
- Light / dark theme toggle (persisted)
- Loading spinner & friendly error states
- Accessible, mobile-first responsive design with keyboard focus and live feedback

## Tech Stack
- HTML5 (semantic, ARIA accessible)
- CSS3 (CSS variables, light/dark themes, responsive grid)
- Vanilla JavaScript (ES6+, no build step)
- Fixed sample New York weather data (this branch makes no live API calls)
- Node.js built-in test runner for dependency-free regression tests (development only)

No build step or package installation is required. A static server is recommended because browser security policies can block scripts when `index.html` is opened directly from `file://`.

## Tests and Browser Acceptance

Run the dependency-free behavior suite with Node.js:

```bash
node --test
```

The suite uses mocked weather and browser APIs; it does not require an API key or call the live service. Use [`tests/acceptance-checklist.md`](tests/acceptance-checklist.md) for manual browser, keyboard, theme, and 375px/1200px viewport checks.

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
├── tests/
│   ├── app.test.js   # Mocked browser behavior regression suite
│   └── acceptance-checklist.md # Real-browser and viewport checks
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
