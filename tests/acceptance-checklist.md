# Browser Acceptance Checklist

Run after generating `config.js` and starting the documented static server. Use a valid API key or mocked OpenWeatherMap responses so checks do not depend on live weather conditions.

## Functional flows

- [ ] Search a valid city by button and Enter; verify current conditions, loading feedback, and five distinct forecast days.
- [ ] Submit an empty query and an invalid city; verify no empty request, an actionable error, and usable search controls.
- [ ] Simulate forecast-only failure; verify current conditions remain visible and the forecast retry message appears.
- [ ] Switch °C/°F after loading; verify current values and all forecast highs/lows change without another request, then reload and verify the unit persists.
- [ ] Test geolocation success, denial, unavailable position, and timeout; verify city search remains available and coordinates are not stored.
- [ ] Save a city explicitly, revisit it, remove it, reload, and verify persistence; verify duplicates are ignored and a sixth city is rejected.
- [ ] Toggle light/dark appearance, reload, and verify the theme and accessible pressed state are restored.
- [ ] Navigate every control with the keyboard; verify logical order, visible focus, accessible names, and announced loading/error/favorite feedback.

## Viewport and appearance checks

- [ ] At 375px wide, inspect both themes and verify search, current conditions, forecast, favorites, loading, and errors do not cause horizontal scrolling.
- [ ] At 1200px or wider, verify content remains readable and controls remain usable.
- [ ] Check text and control contrast in both themes, including focus indicators.

## Execution note

The Node test suite covers mocked behavior and semantic source assertions. The checklist above requires a real browser for visual layout and assistive-technology confirmation; those checks were not run in environments without a browser binary.
