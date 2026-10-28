# Proposal

## Why

The Sprint 1 MVP reports only current conditions, so users cannot plan ahead or quickly return to places they care about. Sprint 2 extends the app with a usable multi-day forecast and personal location, saved-place, and appearance controls, while correcting gaps in the existing implementation and verifying the complete experience.

## What Changes

- Add a five-day forecast that aggregates 3-hour API entries into daily high/low temperatures and remains synchronized with the selected units.
- Add browser geolocation with clear permission, availability, and timeout feedback plus city-search fallback.
- Let users explicitly save, revisit, and remove up to five favorite cities; persist favorites safely across reloads.
- Add a persistent light/dark theme control.
- Improve semantic and accessible operation across new and existing controls, including keyboard access, visible focus, announcements, and responsive layout.
- Correct forecast aggregation, favorite-control markup and behavior, and persistence edge cases; run a documented regression pass for Sprint 1 and Sprint 2 flows.

## Capabilities

### New Capabilities

- `forecast`: Five-day view grouped from 3-hour forecast data with daily highs/lows, conditions, and selected-unit display.
- `geolocation`: Retrieve weather for the user's location with permission/error handling and manual-search fallback.
- `favorites`: Explicitly save, revisit, and remove up to five cities with persistent storage.
- `theme`: Persistent light/dark appearance selection.
- `accessible-interface`: Accessible interaction and responsive presentation requirements across application features.

### Modified Capabilities

None.

## Impact

- Updates `app.js`, `index.html`, and `style.css` to complete and harden the existing Sprint 2 UI and behavior.
- Adds OpenSpec capabilities for forecast, geolocation, favorites, theme, and cross-cutting accessibility.
- Updates README and contributor/sprint tracking as needed. No new runtime dependencies, server, or build step are introduced; OpenWeatherMap's existing current-weather and 5-day/3-hour API remains the data source.
