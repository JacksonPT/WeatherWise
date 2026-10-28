# WeatherWise — Scrum Simulation Report (Sprints 1 & 2)

**Course:** SSW 555 C / C-U — Agile Methods for Software Development (Fall 2026)  
**Project:** WeatherWise — Weather Forecasting Web App  
**Report:** First Report (Sprint 1 + Sprint 2)  
**Due:** Thursday, October 29, 2026, 6:30 PM  
**Team:** Scrum Team — Product Owner, Scrum Master, Development Team  
**Sprint Length:** 2 weeks per sprint (4 sprints total planned)

---

## 1. Overview of the Scrum Process

The team adopted the Scrum framework to develop WeatherWise, a weather forecasting web application. Work was organized into fixed-length, 2-week sprints. The following Scrum roles, ceremonies, and artifacts were implemented.

### 1.1 Scrum Roles
| Role | Responsibility | Assigned To |
|------|----------------|-------------|
| Product Owner (PO) | Owns and prioritizes the Product Backlog; defines user stories and acceptance criteria; decides what is built next. | Team member 1 |
| Scrum Master (SM) | Facilitates all Scrum ceremonies; removes blockers; ensures Scrum principles are followed. | Team member 2 |
| Development Team (DT) | Designs, builds, tests, and delivers the product increment each sprint. Self-organizing. | Team member 3 (and PO/SM as needed) |

> Note: For this simulation, one developer executed the development work while fulfilling PO/SM facilitation duties. Role boundaries are documented here to reflect a full Scrum team.

### 1.2 Scrum Ceremonies
| Ceremony | Frequency | Timebox | Purpose |
|----------|-----------|---------|---------|
| Sprint Planning | Start of each sprint | 2 hours | Select Product Backlog items for the Sprint Backlog; define the Sprint Goal; break stories into tasks with estimates. |
| Daily Stand-up | Every weekday | 15 minutes | Each member answers: What did I do yesterday? What am I doing today? Any blockers? SM addresses blockers. |
| Sprint Review | End of each sprint | 1 hour | Demo the working increment to stakeholders; gather feedback; PO evaluates whether the Sprint Goal was met. |
| Sprint Retrospective | End of each sprint | 1 hour | Reflect on what went well, what could improve, and agree on action items for the next sprint. |

### 1.3 Scrum Artifacts
- **Product Backlog** — prioritized list of user stories (Section 2).
- **Sprint Backlog** — user stories + tasks selected for a sprint, with Fibonacci story-point estimates (Sections 3.1–3.2).
- **Increment** — working, demonstrable software at the end of each sprint (`index.html`, `style.css`, `app.js`, `config.js`).
- **Burndown Chart** — visual of remaining work over the sprint (Section 4).
- **Kanban Board** — visual of task workflow across To Do / In Progress / Review / Done (Section 5).

---

## 2. Product Backlog

The Product Backlog contains **13 prioritized user stories** in the format *"As a [user], I want [goal] so that [reason]."* Stories are ordered by business value (High → Medium → Low) and estimated in Fibonacci story points (1, 2, 3, 5, 8, 13).

| ID | User Story | Priority | Story Points | Sprint |
|----|------------|----------|--------------|--------|
| PBI-01 | As a developer, I want to set up the project repo and folder structure so that the team has a clean starting point. | High | 3 | 1 |
| PBI-02 | As a user, I want to search for a city and see its current weather so that I can plan my day. | High | 8 | 1 |
| PBI-03 | As a user, I want to toggle between °C and °F so that I can read temperatures in my preferred unit. | High | 3 | 1 |
| PBI-04 | As a user, I want clear error messages when a city isn't found or the API fails so that I know what went wrong. | Medium | 3 | 1 |
| PBI-05 | As a user, I want a loading indicator while data fetches so that I know the app is working. | Medium | 2 | 1 |
| PBI-06 | As a user, I want a clean, responsive UI that works on mobile and desktop so that I can use it on any device. | High | 5 | 1 |
| PBI-07 | As a user, I want to view a 5-day forecast for my searched city so that I can plan the week ahead. | High | 8 | 2 |
| PBI-08 | As a user, I want to get weather for my current location so that I don't have to type a city. | High | 5 | 2 |
| PBI-09 | As a user, I want to save favorite cities so that I can quickly check them later. | Medium | 5 | 2 |
| PBI-10 | As a user, I want to toggle dark/light mode so that the app is comfortable at night. | Medium | 3 | 2 |
| PBI-11 | As a user, I want a polished, accessible UI (ARIA, focus states, contrast) so that everyone can use it. | Medium | 3 | 2 |
| PBI-12 | As a user, I want severe weather alerts for saved locations so that I can stay safe. | Low | 5 | 3 (backlog) |
| PBI-13 | As a user, I want the app to work offline / be installable (PWA) so that I can use it without a connection. | Low | 8 | 4 (backlog) |

**Total Product Backlog: 62 story points**  
**Completed after Sprints 1–2: 35 of 62 points** (PBI-01 through PBI-11)

---

## 3. Sprint Backlogs

### 3.1 Sprint 1 — Foundation & Current Weather

**Sprint Goal:** Deliver a working MVP that lets a user search for any city and view its current weather, with unit toggle and basic error handling.

**Committed: 24 story points | Completed: 24 story points (100%)**

User stories: PBI-01, PBI-02, PBI-03, PBI-04, PBI-05, PBI-06

**Task breakdown (Fibonacci estimates):**

| Task | PBI | Estimate (pts) | Status |
|------|-----|----------------|--------|
| T1.1 Initialize git repo, .gitignore, README, folder structure | PBI-01 | 3 | Done |
| T1.2 Write semantic index.html shell | PBI-01, PBI-06 | 3 | Done |
| T1.3 OpenWeatherMap API key + config.js (gitignored) | PBI-02 | 2 | Done |
| T1.4 Implement fetchWeather(city) calling Current Weather API | PBI-02 | 5 | Done |
| T1.5 Wire search form (submit + Enter key) | PBI-02 | 2 | Done |
| T1.6 Render current weather (temp, condition, humidity, wind, feels-like, icon) | PBI-02 | 5 | Done |
| T1.7 Add unit toggle (°C/°F) with localStorage persistence | PBI-03 | 3 | Done |
| T1.8 Convert temperature display based on selected unit | PBI-03 | 2 | Done |
| T1.9 Add loading spinner + show/hide during fetch | PBI-05 | 2 | Done |
| T1.10 Add error states (city not found, network error, dismiss/retry) | PBI-04 | 3 | Done |
| T1.11 Responsive CSS: mobile-first layout | PBI-06 | 5 | Done |
| T1.12 Manual testing: 5+ cities, invalid input, offline | PBI-04, PBI-05 | 3 | Done |
| T1.13 Sprint review demo + retrospective | — | 2 | Done |

---

### 3.2 Sprint 2 — 5-Day Forecast, Geolocation & Polish

**Sprint Goal:** Extend the MVP into a full forecasting app: 5-day outlook, geolocation, saved favorites, and polished UI with dark mode.

**Committed: 27 story points | Completed: 27 story points (100%)**

User stories: PBI-07, PBI-08, PBI-09, PBI-10, PBI-11, PBI-12

**Task breakdown (Fibonacci estimates):**

| Task | PBI | Estimate (pts) | Status |
|------|-----|----------------|--------|
| T2.1 Integrate 5-Day / 3-Hour Forecast API | PBI-07 | 5 | Done |
| T2.2 Build forecast card list (date, high/low, icon, description) | PBI-07 | 5 | Done |
| T2.3 Group 3-hourly entries into daily min/max | PBI-07 | 3 | Done |
| T2.4 Add "Use my location" button + navigator.geolocation | PBI-08 | 5 | Done |
| T2.5 Handle geolocation denial/error + manual fallback | PBI-08 | 3 | Done |
| T2.6 Build favorites: add/remove up to 5 cities as chips | PBI-09 | 5 | Done |
| T2.7 Persist favorites to localStorage; restore on load | PBI-09 | 3 | Done |
| T2.8 Add dark/light mode toggle with CSS variables; persist | PBI-10 | 3 | Done |
| T2.9 Accessibility pass (ARIA, keyboard nav, focus, contrast) | PBI-11 | 3 | Done |
| T2.10 Fix Sprint 1 bugs (API edge cases, empty states, units) | PBI-12 | 3 | Done |
| T2.11 Full regression test (search, forecast, location, favs, theme, mobile) | PBI-12 | 3 | Done |
| T2.12 Sprint review demo + retrospective + report prep | — | 2 | Done |

---

### 3.3 Velocity
| Sprint | Committed | Completed | Velocity |
|--------|-----------|-----------|----------|
| Sprint 1 | 24 pts | 24 pts | 24 |
| Sprint 2 | 27 pts | 27 pts | 27 |

**Average velocity: 25.5 story points / sprint.**  
**Sprint predictability: 100%** (every committed story point delivered).

---

## 4. Burndown Chart

The burndown chart shows remaining story points across the two sprints (ideal vs. actual). Story points are burned down as tasks reach "Done."

### 4.1 Sprint 1 Burndown (data)
Working days = 10 (2-week sprint). Total = 24 pts.

| Day | Ideal Remaining | Actual Remaining |
|-----|-----------------|------------------|
| 0 | 24 | 24 |
| 1 | 21.6 | 21 |
| 2 | 19.2 | 19 |
| 3 | 16.8 | 16 |
| 4 | 14.4 | 14 |
| 5 | 12.0 | 11 |
| 6 | 9.6 | 8 |
| 7 | 7.2 | 6 |
| 8 | 4.8 | 3 |
| 9 | 2.4 | 1 |
| 10 | 0 | 0 |

**Interpretation:** Actual closely tracks ideal; the team finished on time with all 24 points completed.

### 4.2 Sprint 2 Burndown (data)
Total = 27 pts.

| Day | Ideal Remaining | Actual Remaining |
|-----|-----------------|------------------|
| 0 | 27 | 27 |
| 1 | 24.3 | 25 |
| 2 | 21.6 | 23 |
| 3 | 18.9 | 20 |
| 4 | 16.2 | 17 |
| 5 | 13.5 | 14 |
| 6 | 10.8 | 10 |
| 7 | 8.1 | 7 |
| 8 | 5.4 | 4 |
| 9 | 2.7 | 1 |
| 10 | 0 | 0 |

**Interpretation:** Slightly above ideal early (days 1–3) while geolocation API grouping was investigated, then recovered and finished at 0 by day 10.

### 4.3 Burndown Chart (ASCII)

```
Story Points Remaining
28 |                         ● S2 start
26 |                       ●
24 |   ● S1 start          ●
22 |   |                   |
20 |   |                   ●
18 |   |                   |
16 |   ●                   ●
14 |   |                   |
12 |   ●                   ●
10 |   |                   |
 8 |   ●                   ●
 6 |   |                   |
 4 |   ●                   ●
 2 |   |                   |
 0 |   ●___________________●________
    0  2  4  6  8  10   0  2  4  6  8  10
          Sprint 1 days          Sprint 2 days
```

> For submission, this data should be rendered as a line chart (Excel/Google Sheets/Google Charts) with two lines: Ideal Remaining and Actual Remaining, for each sprint.

---

## 5. Kanban Board

Tasks move across columns: **To Do → In Progress → Review → Done**. Below is the board state at the end of Sprint 2 (all tasks Done).

### To Do
(Empty — all items pulled into sprints)

### In Progress
(Empty — WIP limit respected; nothing left in flight)

### Review
| Card | Story Points | Sprint |
|------|--------------|--------|
| T2.11 Full regression test | 3 | 2 |

### Done (Sprints 1–2)
| Card | Points | Sprint |
|------|--------|--------|
| T1.1 Repo + folder structure | 3 | 1 |
| T1.2 Semantic HTML shell | 3 | 1 |
| T1.3 API key + config.js | 2 | 1 |
| T1.4 fetchWeather Current API | 5 | 1 |
| T1.5 Search form wiring | 2 | 1 |
| T1.6 Render current weather | 5 | 1 |
| T1.7 Unit toggle + localStorage | 3 | 1 |
| T1.8 Unit conversion display | 2 | 1 |
| T1.9 Loading spinner | 2 | 1 |
| T1.10 Error states | 3 | 1 |
| T1.11 Responsive CSS | 5 | 1 |
| T1.12 Manual testing | 3 | 1 |
| T1.13 Review + retro | 2 | 1 |
| T2.1 Forecast API integration | 5 | 2 |
| T2.2 Forecast card list | 5 | 2 |
| T2.3 Daily grouping logic | 3 | 2 |
| T2.4 Geolocation button | 5 | 2 |
| T2.5 Geolocation error handling | 3 | 2 |
| T2.6 Favorites chips | 5 | 2 |
| T2.7 Favorites localStorage | 3 | 2 |
| T2.8 Dark/light mode | 3 | 2 |
| T2.9 Accessibility pass | 3 | 2 |
| T2.10 Sprint 1 bug fixes | 3 | 2 |
| T2.11 Regression testing | 3 | 2 |
| T2.12 Review + retro + report | 2 | 2 |

**Kanban WIP limit:** 3 items in progress at once (respected throughout).

> For submission, recreate this board in Trello, Jira, GitHub Projects, or a physical board with sticky notes; include a screenshot in the report.

---

## 6. Sprint Reviews

### Sprint 1 Review
- **Date:** End of Week 2 (Sprint 1)
- **Demoed:** City search returns current weather (temp, condition, humidity, wind, feels-like, icon); °C/°F toggle persists; loading spinner; friendly error messages.
- **Stakeholder feedback:** Add a "Use my location" button so users don't have to type. → Added to Sprint 2 backlog (PBI-08).
- **Outcome:** Sprint Goal met. All PBI acceptance criteria passed. PO accepted the increment.

### Sprint 2 Review
- **Date:** End of Week 4 (Sprint 2)
- **Demoed:** 5-day forecast (high/low + icons per day); geolocation with permission handling + manual fallback; favorites (add/remove up to 5, persisted); dark/light mode; accessibility pass.
- **Stakeholder feedback:** Add severe-weather alerts for saved locations and PWA/offline support. → Added to Product Backlog as PBI-12 and PBI-13 for Sprints 3–4.
- **Outcome:** Sprint Goal met. All PBI acceptance criteria passed. PO accepted the increment.

---

## 7. Sprint Retrospectives

### Sprint 1 Retrospective
- **What went well:** Repo setup was fast; OpenWeatherMap API integration was smooth on the first attempt; mobile-first CSS worked on initial load.
- **What could be improved:** Error messages could be more specific (e.g., distinguish 404 vs. network); no geolocation feature yet.
- **Action items:** Add geolocation button to Sprint 2; add 5-day forecast to Sprint 2.

### Sprint 2 Retrospective
- **What went well:** Forecast grouping (3-hourly → daily) worked cleanly; geolocation fallback handled gracefully; favorites persist reliably across reloads.
- **What could be improved:** Unit conversion edge cases when switching units after data loaded; no automated tests yet.
- **Action items:** Fix unit-conversion edge case in Sprint 3; add automated tests; move alerts/PWA to backlog (PBI-12, PBI-13).

---

## 8. Challenges Faced

| Challenge | Impact | How It Was Overcome |
|-----------|--------|---------------------|
| API key placeholder — cannot commit real keys to repo | Could not run live data immediately | Created `config.js` with a clear placeholder and setup instructions in README; key is gitignored in real repos. |
| Forecast API returns 3-hourly blocks, not daily | Needed daily high/low per day | Deduplicated forecast list by date and selected one entry per day to compute daily min/max (T2.3). |
| Geolocation permission denied by browser | "Use my location" would fail silently | Added explicit error handling for denial/timeout/unavailable with a clear message and manual-search fallback (T2.5). |
| Unit conversion edge cases after loading | °C ↔ °F switch could show stale values | Recomputed display values on toggle change; persisted preference in localStorage (T1.8, T2.8). |
| Slightly above ideal burndown early in Sprint 2 | Risk of not finishing forecast grouping | Timeboxed the grouping investigation; scoped down to one representative entry per day; recovered by day 6. |

---

## 9. Final Product (Increment)

WeatherWise is a responsive, single-page weather forecasting web app delivered across Sprints 1–2.

**Delivered files:**
- `index.html` — semantic, ARIA-labeled app shell
- `style.css` — design system with CSS variables, light/dark themes, mobile-first responsive layout
- `app.js` — vanilla JS: OpenWeatherMap API (current + 5-day forecast), geolocation, favorites (localStorage), unit toggle, theme toggle, loading/error states
- `config.js` — API key configuration (placeholder; insert your OpenWeatherMap key)
- `README.md` — setup and run instructions

**How to run:**
1. Get a free OpenWeatherMap API key at https://home.openweathermap.org/api_keys
2. Replace `YOUR_OPENWEATHERMAP_API_KEY_HERE` in `config.js`
3. Open `index.html` in a browser (no build step or server required)

**Key features delivered:**
- Search any city for current weather
- 5-day forecast with daily high/low and icons
- °C / °F toggle (persisted)
- "Use my location" via browser geolocation
- Save up to 5 favorite cities (persisted)
- Dark / light theme (persisted)
- Loading spinner + friendly error states
- Mobile-first responsive design (works at 375px and 1200px+)

**Planned for Sprints 3–4 (PBI-12, PBI-13):**
- Severe weather alerts for saved locations
- PWA / offline support (installable app)

---

## Appendix: Assignment Traceability

| Assignment Requirement | Where Addressed |
|------------------------|-----------------|
| Scrum roles (PO, SM, DT) | Section 1.1 |
| Ceremonies (planning, stand-up, review, retrospective) | Section 1.2 |
| Artifacts (Product Backlog, Sprint Backlog, increment, burndown, Kanban) | Sections 2–5 |
| Product Backlog: 10–15 prioritized user stories | Section 2 (13 stories) |
| Story format "As a… I want… So that…" | Section 2 |
| Fibonacci story-point estimates | Sections 2, 3.1, 3.2 |
| Sprint Backlog with tasks + estimates | Sections 3.1, 3.2 |
| Burndown Chart | Section 4 |
| Kanban Board | Section 5 |
| Sprint Reviews (outcomes + feedback) | Section 6 |
| Sprint Retrospectives (went well / improve / action items) | Section 7 |
| Challenges faced + resolution | Section 8 |
| Final product (demo/screenshots, docs, code) | Section 9 |
