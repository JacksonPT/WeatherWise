# Design

## Context

See `proposal.md` for motivation and `specs/` for the user-visible contracts. The application is a static HTML/CSS/vanilla-JavaScript page. It already calls OpenWeatherMap's current-weather and five-day/three-hour endpoints, uses metric API responses for display conversion, and stores preferences in `localStorage`; this change completes and hardens those flows without adding a dependency or build step.

## Goals / Non-Goals

**Goals:**
- Keep current conditions usable when the separate forecast request fails.
- Derive daily forecast ranges and representative conditions from the source entries.
- Make saved cities an explicit user choice and make client preferences resilient to malformed or unavailable storage.
- Add no-build regression coverage for the key browser interactions.

**Non-Goals:**
- Server-side storage, accounts, or synchronization across devices.
- Persisting geolocation coordinates or automatically loading a location at startup.
- Weather alerts, offline/PWA support, or replacing the OpenWeatherMap provider.

## Decisions

### Keep API data canonical and group forecast entries by location-local day

Continue requesting metric data and convert only when rendering. Group three-hour entries by the date obtained after applying the forecast response's timezone offset, calculate each day's high as the maximum `temp_max` and low as the minimum `temp_min`, and select the condition entry nearest local noon. Keep the raw entries so a unit toggle only rerenders data and does not issue another request.

**Alternative considered:** Render the first entry for each date. This is simpler but does not produce daily highs/lows and makes results dependent on request time.

### Treat current and forecast requests as independently useful results

Request both endpoints concurrently, but handle their outcomes independently. A current-weather failure continues to use the established actionable error state; a forecast-only failure leaves current conditions visible and renders a forecast-specific retry message. Retrying is available by submitting the city search again.

**Alternative considered:** Keep `Promise.all` and fail the whole page if either endpoint fails. This hides valid current conditions because of a partial forecast outage.

### Use explicit, separate favorite controls and validated storage

Add the current displayed city only when the user activates a save control. Render saved locations as list items with separate native view and remove buttons, not nested buttons. Validate stored values as unique non-empty city strings and cap restored data at five. Wrap storage reads and writes so in-memory controls continue to work if storage is malformed or unavailable.

**Alternative considered:** Automatically favorite every successful search. That creates surprising saved data and does not give users control over which places are retained.

### Keep location transient and theme state accessible

Use the browser's geolocation callback to build a coordinate query, but never write coordinates to storage. Use native buttons for location, theme, and favorite actions; expose theme state with `aria-pressed`, and use status text for save/limit feedback.

**Alternative considered:** Store the last coordinates for automatic startup. This is unnecessary for the requested flow and retains more sensitive data than needed.

### Add dependency-free regression tests

Use Node's built-in test runner with a small DOM/storage/geolocation mock around the existing browser script. Cover pure forecast aggregation and interaction outcomes without adding a package manager, build system, or runtime test dependency; retain a documented real-browser viewport/API-mock acceptance checklist for layout and assistive semantics.

**Alternative considered:** Add a browser automation dependency. It would increase setup and dependency footprint for this static educational project.

## Risks / Trade-offs

- [The five-day API can include a partial current day or fewer dates near the end of its horizon] → Render only distinct dates actually returned and never fabricate missing data.
- [Browser storage can be blocked or contain old/untrusted values] → Validate on read, bound the list, and keep persistence failures from blocking in-memory behavior.
- [A mocked DOM cannot prove visual contrast or actual screen-reader behavior] → Keep those checks in the documented browser acceptance pass at 375px and desktop width.

## Migration Plan

No server migration is required. Existing `ww_isMetric` and `ww_isDark` preferences remain readable. Existing `ww_favorites` arrays of city strings are validated and capped at five; invalid entries are ignored. Rollback is a static-file rollback and does not require clearing user storage.
