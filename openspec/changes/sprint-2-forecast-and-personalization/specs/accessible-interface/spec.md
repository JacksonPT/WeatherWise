# Spec Delta

## Purpose

The accessible-interface capability ensures that weather information and application controls can be understood and operated across assistive technologies, keyboard input, and common mobile and desktop viewport sizes.

## ADDED Requirements

### Requirement: Controls are named and keyboard operable

The system SHALL provide semantic, keyboard-operable controls with accessible names, visible focus indicators, and state announcements for interactive controls and dynamic results.

#### Scenario: Operate application controls with a keyboard
- **WHEN** a user navigates the application without a pointer
- **THEN** search, location, unit, theme, save, view, remove, and dismiss controls can be reached and operated in a logical order with visible focus

#### Scenario: Announce dynamic updates
- **WHEN** weather results, loading feedback, errors, or saved-location status change
- **THEN** the updated information is exposed through appropriate accessible status or alert semantics without requiring focus to move

#### Scenario: Read weather icons
- **WHEN** a weather condition icon conveys information
- **THEN** its alternative text describes the associated weather condition; decorative imagery is hidden from assistive technology

### Requirement: Maintain readable contrast and responsive layout

The system SHALL maintain readable text and control contrast in both themes and SHALL keep the primary application flows usable without horizontal scrolling at 375px and desktop widths of 1200px or greater.

#### Scenario: Use the application on mobile
- **WHEN** the application is displayed at a 375px viewport width in either theme
- **THEN** search, current conditions, forecast, saved locations, loading, and error content fit within the viewport without horizontal scrolling

#### Scenario: Use the application on desktop
- **WHEN** the application is displayed at a viewport width of 1200px or greater
- **THEN** its content remains readable, keyboard focus remains visible, and controls remain usable

#### Scenario: Read text and controls in either theme
- **WHEN** the application is displayed in light or dark theme
- **THEN** normal text meets WCAG AA contrast requirements and interactive boundaries or focus indicators remain distinguishable from adjacent colors
