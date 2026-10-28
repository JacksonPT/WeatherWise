# Sprint 2 — 5-Day Forecast, Geolocation & Polish

**Sprint Goal:** Extend the MVP into a full forecasting app: 5-day outlook, "weather near me" via geolocation, saved favorites, and a polished responsive UI with dark mode.

**Duration:** 2 weeks  
**Estimated Velocity:** ~27 story points (based on Sprint 1 actual of 24)

---

## Sprint Backlog — Selected User Stories

| ID | User Story (As a… I want… So that…) | Priority | Story Points |
|----|-------------------------------------|----------|--------------|
| PBI-07 | As a user, I want to view a 5-day forecast for my searched city so that I can plan the week ahead. | High | 8 |
| PBI-08 | As a user, I want to get weather for my current location so that I don't have to type a city. | High | 5 |
| PBI-09 | As a user, I want to save favorite cities so that I can quickly check them later. | Medium | 5 |
| PBI-10 | As a user, I want to toggle dark/light mode so that the app is comfortable at night. | Medium | 3 |
| PBI-11 | As a user, I want a polished, accessible UI (ARIA, focus states, contrast) so that everyone can use it. | Medium | 3 |
| PBI-12 | As a user, I want Sprint 1 bugs fixed and the app regression-tested so that it's demo-ready. | High | 3 |

**Sprint 2 Total Committed: 27 story points**

---

## Task Breakdown & Estimates (Fibonacci)

| Task | Linked PBI | Estimate (pts) | Owner | Status |
|------|------------|----------------|-------|--------|
| T2.1 Integrate OpenWeatherMap 5-Day / 3-Hour Forecast API | PBI-07 | 5 | Dev | Done |
| T2.2 Build forecast card list: date, high/low, icon, description | PBI-07 | 5 | Dev | Done |
| T2.3 Group 3-hourly forecast entries into daily min/max | PBI-07 | 3 | Dev | Done |
| T2.4 Add "Use my location" button; request navigator.geolocation | PBI-08 | 5 | Dev | Done |
| T2.5 Handle geolocation denial/error gracefully + manual fallback | PBI-08 | 3 | Dev | Done |
| T2.6 Build favorites: add/remove up to 5 cities as chips | PBI-09 | 5 | Dev | Done |
| T2.7 Persist favorites to localStorage; restore on page load | PBI-09 | 3 | Dev | Done |
| T2.8 Add dark/light mode toggle with CSS variables; persist preference | PBI-10 | 3 | Dev | Done |
| T2.9 Accessibility pass: ARIA labels, keyboard nav, focus outlines, contrast | PBI-11 | 3 | Dev | Done |
| T2.10 Fix Sprint 1 bugs (API edge cases, empty states, unit conversion) | PBI-12 | 3 | Dev | Done |
| T2.11 Full regression test: search, forecast, location, favorites, theme, mobile | PBI-12 | 3 | Dev | Done |
| T2.12 Sprint review demo + retrospective + report prep | — | 2 | Team | Done |

**Total Estimated: 38 pts** (committed backlog = 27 pts; remaining carried to product backlog)

---

## Definition of Done (DoD)
- [ ] 5-day forecast displays for any searched city
- [ ] Geolocation button works when granted; friendly error when denied
- [ ] Up to 5 favorites persist across page reloads
- [ ] Dark mode toggle works and persists
- [ ] No critical bugs; all PBI acceptance criteria met
- [ ] Tested at 375px (mobile) and 1200px+ (desktop)
- [ ] Demoed to Product Owner

---

## Sprint 2 Daily Stand-up Summary (representative)
- Day 1: Forecast API integrated; getting 3-hourly data. Blocker: grouping into daily — resolved by deduping on date.
- Day 4: Geolocation button added; permission handling works. No blockers.
- Day 7: Favorites + localStorage working. No blockers.
- Day 9: Dark mode + accessibility pass complete. No blockers.
- Day 11: Bug fixes + regression testing. Ready for review.

---

## Sprint 2 Review Outcomes
- Demoed full app: search, forecast, geolocation, favorites, dark mode.
- Stakeholder feedback: add severe-weather alerts and PWA/offline support → moved to product backlog for Sprint 3.
- All PBI acceptance criteria met. Sprint goal achieved.

---

## Sprint 2 Retrospective
- What went well: Forecast grouping worked cleanly; geolocation fallback handled well; favorites persist reliably.
- What could improve: Unit conversion edge cases when switching after load; need more automated tests.
- Action items: Add unit conversion fix to Sprint 3; add automated tests; add alerts/PWA to backlog.
