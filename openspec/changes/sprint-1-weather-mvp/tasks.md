# Tasks

## 1. Project Foundation

- [x] 1.1 Establish the static project structure and feature-branch Git workflow, including `index.html`, `style.css`, `app.js`, `.env.example`, the config generator, and `.gitignore`; verify the expected files are present and no real API key is tracked.
- [x] 1.2 Document `.env` setup, local static serving, config generation, and the no-build startup flow in `README.md`; verify a new contributor can follow the steps to open the app.

## 2. Semantic Application Shell

- [x] 2.1 Build the semantic page shell with a header, city search form, current-weather card, loading region, error alert, and footer; verify the page loads without console errors and the primary controls are keyboard reachable.
- [x] 2.2 Add accessible labels, live status attributes, error dismissal, and weather-icon alternative text; verify loading and error messages are announced with the intended status semantics.

## 3. Current Weather Integration

- [x] 3.1 Add `.env`-based OpenWeatherMap configuration and a generated browser config without committing a real credential; verify the generator rejects placeholders and emits the configuration consumed by the browser.
- [x] 3.2 Implement the current-weather request for a trimmed, non-empty city query and map the response to city, country, temperatures, condition, humidity, wind, and icon data; verify a valid city request returns data and an empty submission makes no request.
- [x] 3.3 Wire form submission for both the Search button and Enter key, then render a successful response into the current-weather card; verify searches for at least five valid cities show all required fields.

## 4. Units and Request States

- [x] 4.1 Store fetched values in a canonical metric form and implement Celsius/Fahrenheit display conversion for temperature, feels-like temperature, and wind; verify toggling units changes displayed values without another weather request.
- [x] 4.2 Persist the selected unit in browser storage and restore it during startup; verify the selected unit and labels remain after a page reload.
- [x] 4.3 Add loading state transitions around weather requests and hide the indicator on success or failure; verify the spinner and status text are visible during a delayed request and absent afterward.
- [x] 4.4 Add friendly not-found, network, and service-failure messages with dismiss and retry behavior; verify invalid-city and offline/API-failure simulations leave search controls usable.

## 5. Responsive Presentation

- [x] 5.1 Implement the mobile-first visual system for the search form, current-weather card, loading state, and error state with a readable desktop max-width layout; verify there is no horizontal scrolling at 375px and the layout remains usable on desktop.
- [x] 5.2 Add visible focus states, readable contrast, and touch-sized controls for the primary interactions; verify keyboard navigation and a 375px browser viewport meet the Sprint 1 definition of done.

## 6. Sprint Verification

- [x] 6.1 Run a browser acceptance pass covering valid-city searches, five or more cities, empty input, unit persistence, invalid city, network failure, loading feedback, keyboard submission, and mobile layout; record any defects before completion.
- [x] 6.2 Confirm the browser console is error-free, the Sprint 1 acceptance criteria are satisfied, and all changes are committed to the active feature branch before merging to `main`; verify the final commit contains no secrets and the MVP can be demonstrated from the documented startup flow.

> Acceptance note: Playwright verified the browser flow with mocked OpenWeatherMap responses. The local `.env` remains a placeholder until a real key is supplied; no live API key was used or committed. Defects found during implementation (hidden result cards, incorrect wind conversion, and missing mobile button sizing) were fixed before this pass.
