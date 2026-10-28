# Design

## Context

WeatherWise is a static browser application with `index.html`, `style.css`, `app.js`, and a small `config.js` file for the OpenWeatherMap endpoint and API key. It has no server, build step, or dependency manager, so the MVP must run from a browser using standard web APIs. See `proposal.md` for the motivation and `specs/current-weather/spec.md` for the behavior contract.

## Goals / Non-Goals

**Goals:**

- Keep the MVP deployable as static files with no build or server requirement.
- Separate the semantic page structure, visual presentation, configuration, and client-side behavior across the existing project files.
- Normalize request states so loading, success, and failure produce predictable UI transitions.
- Keep temperatures in a single canonical form internally so unit switching does not require another network request.
- Preserve keyboard access, responsive layout, and meaningful status/error announcements.

**Non-Goals:**

- Adding user accounts, a backend proxy, or server-side API-key protection in this sprint.
- Adding forecasts, geolocation, favorites, themes, or other Sprint 2 behavior to the Sprint 1 contract.
- Introducing a framework, bundler, test runner, or runtime dependency.

## Decisions

### Use the OpenWeatherMap current-weather endpoint from the browser

The client will build a request from the configured base URL, API key, city query, and metric units. The API response is mapped to the small set of fields required by the current-weather spec. A backend proxy would better protect the key, but would violate the static/no-server constraint for this student MVP; the configuration file and setup documentation make that trade-off explicit.

### Keep Celsius as the canonical fetched unit

Requests will retrieve metric values once, then the client will convert temperature and wind values for display when Fahrenheit is selected. This avoids duplicate requests when a user toggles units and keeps the preference independent of the API response.

### Model the UI around explicit request states

The page will transition through idle, loading, success, and error states. Starting a request shows the loader and clears stale errors; a successful response hides the loader and reveals current conditions; failures hide the loader and show a friendly message. The existing result remains available unless a later product decision requires clearing it.

### Use native form semantics and accessible status regions

The search interaction will remain a real HTML form so Enter submits naturally. Loading text will use a live status region, and failures will use an alert region with a dedicated dismiss control. Weather icons will receive descriptive alternative text, while CSS media rules provide the mobile-first layout.

### Keep configuration explicit and documented

The API key and endpoint remain in `config.js` for the current static project. The README will document the placeholder and warn that a production deployment should use environment variables and a backend proxy. A future change can introduce a safer deployment model without changing the user-facing weather contract.

## Risks / Trade-offs

- **[Exposed browser API key]** → Keep the key out of source control when it is real, document the limitation, and move to a backend proxy before production use.
- **[Third-party API availability or rate limits]** → Translate non-success responses into friendly errors, keep retry possible, and avoid unnecessary requests during unit changes.
- **[Opening files directly may restrict browser requests]** → Document serving through a simple local static server as an alternative to opening `index.html` directly.
- **[Display-only conversion can drift if values are reparsed]** → Retain canonical numeric values for rendering rather than treating formatted labels as the source of truth.

## Migration Plan

1. Ensure the static shell, configuration placeholder, API request path, rendering, and responsive styles are present.
2. Verify the browser flow with valid cities, an invalid city, a failed request, unit changes, keyboard submission, and a 375px viewport.
3. Commit the completed MVP to `main`.
4. Roll back by reverting the MVP commit; no data migration or server deployment rollback is required.
