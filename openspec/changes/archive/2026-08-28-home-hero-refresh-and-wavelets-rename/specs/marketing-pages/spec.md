## ADDED Requirements

### Requirement: Homepage hero centered identity sequence
The homepage hero SHALL present, in a centered vertical sequence above any other hero content, the site name ("Ecclesia Lucis"), the tagline explaining its meaning ("Church of Light") in a visually larger treatment than the name, and the phrase "A faith of equals" as the singular focal statement of the sequence.

#### Scenario: Hero sequence order and prominence
- **WHEN** a visitor loads `/`
- **THEN** "Ecclesia Lucis" appears first in the hero, "Church of Light" appears immediately below it at a larger type size than the name, and "A faith of equals" appears immediately below that, all horizontally centered

### Requirement: Homepage hero light-source visual backing
The homepage hero SHALL render a decorative light-source visual (image, graphic, or animation) behind the centered identity sequence, subject to the design-system's iconography and reduced-motion requirements.

#### Scenario: Light visual present and accessible
- **WHEN** a visitor loads `/` with no reduced-motion preference set
- **THEN** a decorative light-source visual renders behind the hero's centered identity sequence and does not obscure the text's legibility

#### Scenario: Reduced motion respected in hero
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** any animated component of the hero's light-source visual is disabled or replaced with a static equivalent

### Requirement: Explorer statement and doctrine teasers in their own section
The "each an explorer on their own journey" statement and the doctrine teasers (Purpose, Tenets, Practices, Covenant) SHALL render in a section below the hero, distinct from the centered identity sequence, continuing into the existing community call-to-action.

#### Scenario: Explorer section follows hero
- **WHEN** a visitor loads `/` and scrolls past the hero
- **THEN** the next section presents the "each an explorer on their own journey" statement followed by links/teasers to Purpose, Tenets, Practices, and Covenant, before any different topic

### Requirement: Community page avoids light-bearer terminology
The Community page SHALL refer to community members as "wavelet(s)," not "light-bearer(s)," consistent with the site-wide vocabulary rule in `doctrine-content`.

#### Scenario: No light-bearer language on Community page
- **WHEN** the Community page renders
- **THEN** its copy contains "wavelet" (or "wavelets") wherever community members are referenced, and does not contain "light-bearer" or "light-bearers"
