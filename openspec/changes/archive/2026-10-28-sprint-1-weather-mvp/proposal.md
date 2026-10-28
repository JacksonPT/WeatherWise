# Proposal

## Why

WeatherWise needs a dependable first release that lets users quickly search for a city and understand its current conditions. Sprint 1 establishes the foundation for future forecast and location features while providing useful behavior on both mobile and desktop.

## What Changes

- Establish the WeatherWise project structure and browser-based MVP entry point.
- Add city search using the OpenWeatherMap current-weather API.
- Display temperature, feels-like temperature, condition, humidity, wind, and a weather icon for the searched city.
- Add a °C/°F preference that persists across page reloads.
- Add loading feedback while requests are in progress.
- Add clear handling for invalid cities, network/API failures, and retry or dismiss actions.
- Provide a semantic, responsive interface suitable for mobile and desktop screens.
- Add setup documentation for configuring the API key and running the static app.

## Capabilities

### New Capabilities

- `current-weather`: Search for a city and display its current weather with unit preferences, loading feedback, and actionable error states.

### Modified Capabilities

<!-- No existing capabilities are defined in this project. -->

## Impact

- Adds the static application shell in `index.html`, styling in `style.css`, and client behavior in `app.js`.
- Adds OpenWeatherMap Current Weather API integration and browser configuration through `config.js`.
- Uses browser `localStorage` for the temperature-unit preference.
- Adds no server, build pipeline, or third-party runtime dependency.
- Establishes the baseline capability that later sprints can extend with geolocation, forecasts, favorites, and themes.
