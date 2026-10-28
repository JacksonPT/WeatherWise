# Spec Delta

## Purpose

The forecast capability helps users plan beyond current conditions by turning the weather service's three-hour forecast entries into a readable five-day outlook with useful daily ranges.

## ADDED Requirements

### Requirement: Show a five-day forecast with daily ranges

When forecast data is available, the system SHALL display up to five distinct forecast days with a weekday/date, condition description and icon, and a daily high and low derived from all entries for that day.

#### Scenario: Aggregate three-hour entries into daily values
- **WHEN** the weather service returns multiple three-hour forecast entries for each date
- **THEN** the system groups entries by the forecast location's calendar date, displays no more than one card per date, and uses the highest reported maximum and lowest reported minimum for that day

#### Scenario: Select a representative daily condition
- **WHEN** a day contains multiple forecast conditions
- **THEN** the system displays the condition and icon from the entry closest to local midday

#### Scenario: Display the available forecast days
- **WHEN** the service returns fewer than five distinct forecast dates
- **THEN** the system displays each available date without duplicating a day or inventing forecast values

### Requirement: Forecast temperatures follow the selected unit

The system SHALL display each forecast high and low in the user's selected temperature unit and SHALL update those values when the unit selection changes without requesting forecast data again.

#### Scenario: Change units after a forecast loads
- **WHEN** the user changes between Celsius and Fahrenheit while forecast data is visible
- **THEN** every displayed daily high and low is converted and labeled in the newly selected unit without another weather request

### Requirement: Forecast failure does not hide current conditions

The system SHALL keep successfully retrieved current conditions visible when forecast data cannot be retrieved and SHALL communicate that the forecast is unavailable with a retry path.

#### Scenario: Current request succeeds but forecast request fails
- **WHEN** the current-weather request succeeds and the forecast request fails
- **THEN** the system displays current conditions, shows a friendly forecast-unavailable message, and leaves city search usable
