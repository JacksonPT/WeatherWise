# Sprint 1 — Foundation & Current Weather

**Sprint Goal:** Deliver a working MVP that lets a user search for any city and view its current weather, with unit toggle and basic error handling.

**Duration:** 2 weeks  
**Sprint Length:** 2 weeks (per assignment)  
**Estimated Velocity:** ~24 story points  
**Roles:** Product Owner (prioritizes backlog), Scrum Master (facilitates ceremonies, removes blockers), Development Team (builds)

---

## Sprint Backlog — Selected User Stories

| ID | User Story (As a… I want… So that…) | Priority | Story Points |
|----|-------------------------------------|----------|--------------|
| PBI-01 | As a developer, I want to set up the project repo and folder structure so that the team has a clean starting point. | High | 3 |
| PBI-02 | As a user, I want to search for a city and see its current weather so that I can plan my day. | High | 8 |
| PBI-03 | As a user, I want to toggle between °C and °F so that I can read temperatures in my preferred unit. | High | 3 |
| PBI-04 | As a user, I want clear error messages when a city isn't found or the API fails so that I know what went wrong. | Medium | 3 |
| PBI-05 | As a user, I want a loading indicator while data fetches so that I know the app is working. | Medium | 2 |
| PBI-06 | As a user, I want a clean, responsive UI that works on mobile and desktop so that I can use it on any device. | High | 5 |

**Sprint 1 Total Committed: 24 story points**

---

## Task Breakdown & Estimates (Fibonacci)

| Task | Linked PBI | Estimate (pts) | Owner | Status |
|------|------------|----------------|-------|--------|
| T1.1 Initialize git repo, .gitignore, README, folder structure (/css, /js, /assets) | PBI-01 | 3 | Dev | Done |
| T1.2 Write semantic index.html shell (header, search, current-weather card, footer) | PBI-01, PBI-06 | 3 | Dev | Done |
| T1.3 Sign up for OpenWeatherMap API key; create config.js (gitignored) | PBI-02 | 2 | Dev | Done |
| T1.4 Implement fetchWeather(city) calling Current Weather API | PBI-02 | 5 | Dev | Done |
| T1.5 Wire search form: input + button, submit & Enter key triggers | PBI-02 | 2 | Dev | Done |
| T1.6 Render current weather: temp, condition, humidity, wind, feels-like, icon | PBI-02 | 5 | Dev | Done |
| T1.7 Add unit toggle (°C/°F) with localStorage persistence | PBI-03 | 3 | Dev | Done |
| T1.8 Convert temperature display based on selected unit | PBI-03 | 2 | Dev | Done |
| T1.9 Add loading spinner + show/hide during fetch | PBI-05 | 2 | Dev | Done |
| T1.10 Add error states: "City not found", "Network error", retry/dismiss | PBI-04 | 3 | Dev | Done |
| T1.11 Responsive CSS: mobile-first, max-width container, readable fonts | PBI-06 | 5 | Dev | Done |
| T1.12 Manual testing: 5+ cities, invalid input, offline simulation | PBI-04, PBI-05 | 3 | Dev | Done |
| T1.13 Sprint review demo + retrospective notes | — | 2 | Team | Done |

**Total Estimated: 40 pts** (includes carry-over testing/polish; committed backlog = 24 pts)

---

## Definition of Done (DoD)
- [ ] Code committed to main branch
- [ ] App loads in browser without console errors
- [ ] Search returns correct weather for a valid city
- [ ] Unit toggle switches and persists across reload
- [ ] Error message shows for invalid city / API failure
- [ ] Layout usable on a phone (375px width)
- [ ] Demoed to Product Owner

---

## Sprint 1 Daily Stand-up Summary (representative)
- Day 1: Repo + HTML shell set up. No blockers.
- Day 3: API integration complete; fetching live data. Blocker: API key placeholder — resolved by adding config.js instructions.
- Day 6: Unit toggle + localStorage working. No blockers.
- Day 8: Error/loading states added. Testing invalid cities. No blockers.
- Day 10: Responsive CSS complete. Ready for review.

---

## Sprint 1 Review Outcomes
- Demoed current-weather search for 5+ cities.
- Stakeholder feedback: add a "Use my location" button → moved to Sprint 2 backlog.
- All PBI acceptance criteria met. Sprint goal achieved.

---

## Sprint 1 Retrospective
- What went well: Repo setup was fast; API integration smooth; mobile-first CSS worked on first pass.
- What could improve: Error messages could be more specific; need a geolocation feature.
- Action items: Add geolocation button to Sprint 2; add 5-day forecast to Sprint 2.
