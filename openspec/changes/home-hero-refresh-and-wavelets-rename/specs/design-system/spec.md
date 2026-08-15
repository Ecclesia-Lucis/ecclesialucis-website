## ADDED Requirements

### Requirement: Hero light-source visual treatment
The design system SHALL define a reusable light-source visual treatment (an image, graphic, or animation evoking light against a dark backdrop) suitable for use behind a page's primary identity statement, implemented as a token-driven or component-level pattern rather than a one-off inline effect.

#### Scenario: Light-source treatment reused across pages
- **WHEN** a page needs a light-source visual backing (e.g., the homepage hero)
- **THEN** it uses the shared light-source treatment rather than a page-specific one-off implementation

#### Scenario: Light-source animation respects reduced motion
- **WHEN** the light-source treatment includes any animated component and a visitor has `prefers-reduced-motion: reduce` set
- **THEN** the animated component is disabled or reduced to a static equivalent, per the "Motion respects reduced-motion preference" requirement

### Requirement: Iconography and visual motifs
The design system SHALL define a set of reusable iconography and visual motifs (icons, imagery, or illustrative graphics) available to pages beyond typography and color, so pages can convey meaning and visual interest without introducing one-off, inconsistent imagery per page.

#### Scenario: Shared icon set available to pages
- **WHEN** a page needs an icon or visual motif to accompany a section (e.g., a doctrine teaser, a practice card)
- **THEN** it draws from the shared iconography/visual-motif set rather than a page-specific one-off asset
