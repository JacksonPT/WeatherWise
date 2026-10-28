# Spec Delta

## Purpose

The favorites capability gives users direct control over a short list of places they want to revisit, without automatically saving every city they search.

## ADDED Requirements

### Requirement: Explicitly save up to five favorite cities

The system SHALL let the user explicitly save the currently displayed city, SHALL prevent duplicate favorites, and SHALL limit the saved list to five cities.

#### Scenario: Save the current city
- **WHEN** the user chooses to save a city whose current weather is displayed
- **THEN** the system adds that city to the saved locations and makes it available for later selection

#### Scenario: Prevent duplicates and enforce the limit
- **WHEN** the user saves a city that is already saved or attempts to save a sixth city
- **THEN** the system does not add a duplicate or exceed five saved cities and communicates when the limit has been reached

### Requirement: Revisit and remove saved cities

The system SHALL provide separate, clearly named controls to load each saved city and to remove it from the saved list.

#### Scenario: Load a saved city
- **WHEN** the user activates a saved city's view control
- **THEN** the system requests and displays weather for that city

#### Scenario: Remove a saved city
- **WHEN** the user activates a saved city's remove control
- **THEN** the system removes only that city from the saved list and updates the displayed list

### Requirement: Persist favorites safely

The system SHALL restore valid favorites after reload and SHALL remain usable if saved data is malformed or browser storage is unavailable.

#### Scenario: Restore saved favorites
- **WHEN** the application starts with valid saved favorites
- **THEN** the system restores and displays at most five unique city names

#### Scenario: Ignore invalid or unavailable storage
- **WHEN** saved favorite data is malformed or browser storage cannot be read or written
- **THEN** the system does not crash, ignores invalid stored data, and keeps the in-memory favorites controls usable
