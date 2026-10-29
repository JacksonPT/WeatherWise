# Design

## Approach

The page explicitly enables demo mode before loading `app.js`. In that mode,
the app renders fixed New York current conditions and five days of sample
forecast values locally. Forecast dates follow the current date so the sample
remains presentable after the demo is published. Unit and theme preferences
continue to use the existing app behavior.

All weather request entry points short-circuit in demo mode and show the
existing accessible red error region with the message “API key required — this
is only a demo.” This avoids API calls and geolocation prompts while preserving
the searchable interface for demonstration. The page does not load generated
`config.js`, so a static Pages deployment needs no secret or build step.

## Trade-offs

- Weather values are illustrative, not live; the page labels them as sample
  data to avoid misleading visitors.
- This behavior is intentionally enabled by the `test/demo` branch's page
  markup. The main application branch retains its API-backed behavior.
- Weather condition icons continue to use the existing OpenWeatherMap image
  URLs; no weather API endpoint is requested.
