# Demo Mode

## ADDED Requirements

### Requirement: Demo shows sample New York weather without setup

The system SHALL show sample current conditions for New York and a five-day
forecast when the demo page loads, without requiring API configuration or
making a weather-service request.

#### Scenario: Open the static demo

- **WHEN** a visitor opens the demo page on a static host
- **THEN** the page displays New York sample conditions and five forecast days
- **AND** the page makes no weather-service request

### Requirement: Live weather actions explain the demo limitation

The system SHALL prevent weather requests in demo mode and show the red message
“API key required — this is only a demo.” when a visitor submits a city search,
requests geolocation, or opens a saved location.

#### Scenario: Search for another city

- **WHEN** a visitor submits a non-empty city search
- **THEN** the system displays the red API-key-required demo message
- **AND** the system makes no weather-service request

#### Scenario: Request another location

- **WHEN** a visitor activates geolocation or a saved-location control
- **THEN** the system displays the red API-key-required demo message
- **AND** the system makes no weather-service request or geolocation prompt
