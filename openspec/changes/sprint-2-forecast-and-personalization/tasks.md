# Tasks

## 1. Regression Test Foundation

- [x] 1.1 Add dependency-free Node built-in tests with mocked browser APIs and verify `node --test` runs without a package install.
- [x] 1.2 Cover current-weather search, empty submission, request states, and unit conversion as regression cases; verify the tests pass against the existing Sprint 1 contract.

## 2. Forecast and Request Resilience

- [x] 2.1 Handle current-weather and forecast request outcomes independently, keep successful current conditions visible on forecast failure, and provide forecast retry feedback; verify success/failure combinations in tests.
- [x] 2.2 Group forecast entries by the location-local date, calculate daily high/low across all entries, and choose the condition closest to local midday; verify dates and aggregate values with representative fixtures.
- [x] 2.3 Rerender forecast temperatures on unit changes without another request and handle partial/empty forecast data; verify displayed values, labels, and request counts.

## 3. Location and Saved Cities

- [x] 3.1 Complete geolocation success, denial, unavailable, unsupported, and timeout flows without persisting coordinates; verify each outcome with mocked geolocation.
- [x] 3.2 Add explicit save-current-city behavior and separate accessible view/remove controls, duplicate prevention, and a five-city limit; verify add, revisit, removal, and limit cases.
- [x] 3.3 Validate and safely persist favorites and existing preferences despite malformed or unavailable storage; verify startup and interaction do not throw.

## 4. Theme and Accessible UI

- [x] 4.1 Make theme switching persistent, keyboard operable, and stateful for assistive technology; verify theme rendering, saved preference restoration, and storage-failure behavior.
- [x] 4.2 Complete accessible names, live feedback, valid control markup, visible focus, contrast, and 375px/desktop responsive styling; verify semantic assertions and stylesheet/layout checks.

## 5. Documentation and Acceptance

- [x] 5.1 Update README, roadmap, and AGENTS.md to match shipped Sprint 2 behavior, the test command, repository map, and active branch/change; verify setup and paths remain accurate.
- [x] 5.2 Run the regression suite and provide a browser acceptance checklist for search, forecast, location, favorites, theme, keyboard access, and 375px/1200px layouts; verify `node --test` passes and clearly record that visual browser checks require a browser not available in this environment.
