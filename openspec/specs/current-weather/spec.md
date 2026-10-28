# Current Weather

## Purpose

The current-weather capability gives users a fast, understandable way to search for a city and view its current conditions, even when requests are delayed or fail. It establishes the observable MVP contract for later weather features.

## Requirements

### Requirement: City search returns current weather

The system SHALL allow a user to submit a non-empty city name and request the current weather for that city from the configured weather service.

#### Scenario: Search for a valid city

- **WHEN** the user enters a valid city name and submits the search form
- **THEN** the system requests weather for that city and displays the returned current conditions

#### Scenario: Submit an empty search

- **WHEN** the user submits the search form without a city name
- **THEN** the system SHALL NOT make a weather request and SHALL leave the current result unchanged

### Requirement: Current conditions show essential weather details

For a successful search, the system SHALL display the city and country, current temperature, feels-like temperature, weather description, humidity, wind speed, and a condition icon with meaningful alternative text.

#### Scenario: Render a successful weather response

- **WHEN** the weather service returns valid current conditions
- **THEN** the system displays all essential details for the selected city and makes the result visible

### Requirement: Temperature units are selectable and persistent

The system SHALL let the user switch displayed temperatures between Celsius and Fahrenheit, update the unit label and related wind units, and persist the selected unit for later page loads.

#### Scenario: Switch from Celsius to Fahrenheit

- **WHEN** the user selects Fahrenheit
- **THEN** current temperature values are converted and displayed in °F, and wind speed uses the corresponding imperial unit

#### Scenario: Restore the saved unit

- **WHEN** the user reloads the application after selecting a unit
- **THEN** the application initializes with that unit selected

### Requirement: Weather requests provide progress feedback

The system SHALL show a loading indicator while a weather request is in progress and SHALL hide it when the request succeeds or fails.

#### Scenario: Request is in progress

- **WHEN** the user submits a valid city search and the response has not completed
- **THEN** the system shows a visible loading indicator and status text

#### Scenario: Request completes

- **WHEN** the weather request succeeds or fails
- **THEN** the system hides the loading indicator

### Requirement: Weather failures are actionable

The system SHALL communicate whether a city cannot be found or a weather request fails, without exposing raw service errors, and SHALL provide a way to dismiss the message and retry by submitting a search again.

#### Scenario: City is not found

- **WHEN** the weather service reports that the requested city does not exist
- **THEN** the system shows a clear not-found message and keeps the search controls usable

#### Scenario: Service or network failure

- **WHEN** the weather request fails because of a network or service problem
- **THEN** the system shows a friendly failure message, keeps the search controls usable, and provides a dismiss action

### Requirement: Weather search is usable across screen sizes

The system SHALL present semantic, keyboard-operable search and result controls in a responsive layout that remains readable and usable on a 375px-wide mobile viewport and on desktop screens.

#### Scenario: Use the application on a phone

- **WHEN** the application is viewed at a 375px viewport width
- **THEN** the search form, loading state, error state, and current-weather details fit within the viewport without requiring horizontal scrolling

#### Scenario: Submit with the keyboard

- **WHEN** the city input has focus and the user presses Enter
- **THEN** the system submits the search form using the same behavior as activating the search button
