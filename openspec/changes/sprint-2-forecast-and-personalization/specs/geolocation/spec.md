# Spec Delta

## Purpose

The geolocation capability lets users request local weather without entering a city while keeping location permission under the user's control and preserving city search as a fallback.

## ADDED Requirements

### Requirement: Load weather for the user's current location

The system SHALL let the user initiate a location-based weather lookup through the browser's geolocation permission flow and SHALL use the returned coordinates to request current conditions and forecast data.

#### Scenario: Location permission is granted
- **WHEN** the user activates the current-location control and grants access
- **THEN** the system requests weather for the returned coordinates and displays the resolved location's current conditions and available forecast

#### Scenario: Location is not persisted
- **WHEN** a location-based weather lookup completes
- **THEN** the system does not save the user's coordinates to browser storage

### Requirement: Handle unavailable or denied geolocation

The system SHALL provide a friendly explanation when geolocation is unsupported, denied, unavailable, or times out, and SHALL keep manual city search usable.

#### Scenario: Permission is denied
- **WHEN** the browser reports that location permission was denied
- **THEN** the system explains that access was denied and indicates that the user can search by city instead

#### Scenario: Location cannot be determined
- **WHEN** geolocation is unsupported, unavailable, or times out
- **THEN** the system shows an appropriate non-technical message, ends the loading state, and leaves manual city search usable
