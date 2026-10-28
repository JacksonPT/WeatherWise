# Spec Delta

## Purpose

The theme capability lets users choose a comfortable light or dark appearance and restores that choice on later visits without preventing the application from working when browser storage is unavailable.

## ADDED Requirements

### Requirement: Toggle and persist the appearance theme

The system SHALL provide a keyboard-operable control to switch between light and dark themes, expose its current state accessibly, and persist the selected theme when browser storage is available.

#### Scenario: Toggle the theme
- **WHEN** the user activates the theme control
- **THEN** the application changes between light and dark appearance and exposes the updated state to assistive technology

#### Scenario: Restore the selected theme
- **WHEN** the application starts with a valid saved theme preference
- **THEN** the application applies that theme before the user interacts with the page

#### Scenario: Theme storage is unavailable
- **WHEN** browser storage cannot be read or written
- **THEN** the theme control continues to switch the current page's appearance without an application error
