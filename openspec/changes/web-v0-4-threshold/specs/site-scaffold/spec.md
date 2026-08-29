## REMOVED Requirements

### Requirement: Persistent primary navigation
**Reason**: Founder decision (2026-08-29): navigation should feel like part of the site's exploration rather than fixed chrome. Primary navigation is no longer persistently visible.
**Migration**: See "Context-triggered primary navigation" below.

### Requirement: Light and dark theme support
**Reason**: Threshold replaces the dual-theme (dark-mode-first with an equally-polished light alternative, matched to OS preference) concept entirely with a single fixed theme per `design-system`'s "Threshold palette and typography" — there is no second theme to match system preference against.
**Migration**: See "Fixed single theme, no OS-driven switching" below.

## ADDED Requirements

### Requirement: Fixed single theme, no OS-driven switching
The system SHALL render a single, fixed visual theme (per `design-system`'s "Threshold palette and typography") that does not vary with the visitor's OS-level `prefers-color-scheme` setting.

#### Scenario: Theme is identical regardless of OS preference
- **WHEN** a visitor loads any page, whether their OS/browser is set to `prefers-color-scheme: light`, `dark`, or no preference
- **THEN** the page renders the same fixed theme in every case

### Requirement: Context-triggered primary navigation
The system SHALL provide primary navigation exposing links to Home, Purpose, Tenets, Practices, Covenant, Community, and About, reachable on every page but not persistently visible on screen. Navigation SHALL reveal when the visitor reaches the end of the page's scroll, or when the pointer moves near the top of the viewport, and SHALL otherwise remain hidden. Because pointer-proximity has no equivalent for touch or keyboard-only visitors, the end-of-scroll trigger — which requires no pointer — SHALL be treated as the primary, device-agnostic way to reach navigation, and a keyboard-focusable control reachable early in the page's tab order SHALL also reveal navigation on focus, so no visitor is limited to a pointer-only trigger.

#### Scenario: Navigation reveals at end of scroll
- **WHEN** a visitor scrolls to the end of a page's content
- **THEN** the primary navigation becomes visible

#### Scenario: Navigation reveals on pointer near top of viewport
- **WHEN** a visitor with a fine pointer moves the cursor near the top of the viewport
- **THEN** the primary navigation becomes visible

#### Scenario: Navigation hides outside those triggers
- **WHEN** a visitor is not at the end of the page's scroll and the pointer is not near the top of the viewport (or no fine pointer is present)
- **THEN** the primary navigation is hidden

#### Scenario: Keyboard and touch visitors can reach navigation without a pointer
- **WHEN** a visitor has no fine pointer, or navigates by keyboard
- **THEN** they can reveal primary navigation via a focusable control reachable early in the page's tab order, or by reaching the end of the page's scroll, without needing to move a pointer near the top of the viewport

#### Scenario: Navigation links remain correct
- **WHEN** primary navigation is visible, by any trigger
- **THEN** it exposes links to Home, Purpose, Tenets, Practices, Covenant, Community, and About

#### Scenario: Navigation visibility transition respects reduced motion
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** navigation shows and hides instantly, with no animated slide/fade transition
