# Proposal

## Why

The teacher needs a shareable Pages demonstration that does not expose or
depend on a personal OpenWeatherMap API key. The demo should still let them
inspect the application's weather presentation and receive a clear explanation
when they try live functionality.

## What Changes

- Show fixed sample current conditions and a five-day forecast for New York on
  page load.
- Prevent searches, geolocation, and saved-location navigation from making
  weather requests; show a red API-key-required demo message instead.
- Make the branch usable from a static host without generated API config and
  document GitHub Pages setup.

## Capabilities

### New Capabilities

- `demo-mode`: A static, no-key New York weather demonstration with explicit
  feedback when a visitor attempts a live weather request.

### Modified Capabilities

None.

## Impact

- Updates `app.js`, `index.html`, and `style.css` for demo mode.
- Adds mocked demo-mode coverage, acceptance guidance, and GitHub Pages setup
  instructions. No build system or runtime dependency is introduced.
