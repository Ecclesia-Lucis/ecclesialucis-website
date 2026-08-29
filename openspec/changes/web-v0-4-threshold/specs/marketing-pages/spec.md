## REMOVED Requirements

### Requirement: Homepage presented as a sequence of distinctly-composed chapters
**Reason**: Superseded by the Threshold homepage structure — alternating pinned iris-reveal sections and mote-content chambers — which replaces the card/chapter layout entirely rather than adding another chapter treatment to the rotation.
**Migration**: See "Homepage presented as an alternating threshold/chamber sequence" below.

## MODIFIED Requirements

### Requirement: Doctrine readable before conversion ask
The information architecture SHALL let a visitor read Purpose, Tenets, Practices, and Covenant before encountering a call-to-action to join the community — doctrine SHALL NOT be gated behind a signup (`CLAUDE.md` content rule #3). On the homepage specifically, the four doctrine pillars (Purpose, Tenets, Practices, Covenant, per the "Homepage presented as an alternating threshold/chamber sequence" requirement) SHALL all appear before the closing community call-to-action.

#### Scenario: Doctrine pages accessible with no gate
- **WHEN** a visitor navigates directly to any doctrine page (Purpose, Tenets, Practices, Covenant) without having visited Community first
- **THEN** the full content renders with no signup wall or gate

#### Scenario: Homepage CTA arrives only after every doctrine chapter
- **WHEN** a visitor scrolls the homepage from top to bottom
- **THEN** the Purpose, Tenets, Practices, and Covenant chambers all appear, in that order, before the closing community call-to-action banner

## ADDED Requirements

### Requirement: Homepage presented as an alternating threshold/chamber sequence
The homepage SHALL open with a near-silent hero (per `design-system`'s "Threshold hero load-in sequence") with no content visible beyond the wordmark, tagline, and scroll affordance until the visitor scrolls. Below the hero, the page SHALL present a sequence of alternating threshold sections (per `design-system`'s "Iris threshold-reveal mechanism") and chambers, one chamber per doctrine pillar (Purpose, Tenets, Practices, Covenant), each chamber presenting its content as scattered motes (per `design-system`'s "Content presented as scattered motes") rather than in a card or grid layout.

#### Scenario: Hero shows nothing beyond wordmark, tagline, and scroll affordance
- **WHEN** a visitor loads `/` and has not yet scrolled
- **THEN** only the hero image, wordmark, tagline, and scroll affordance are visible — no doctrine content, disclaimer, or call-to-action

#### Scenario: Each doctrine pillar gets its own chamber
- **WHEN** the homepage renders its doctrine content
- **THEN** Purpose, Tenets, Practices, and Covenant each appear as a distinct chamber reached via its own threshold transition, in that order

#### Scenario: Chamber content is not duplicated in the preceding threshold
- **WHEN** a visitor scrolls from a threshold into its following chamber
- **THEN** the chamber's heading, body text, and motes appear for the first time in the chamber — none of that content was already fully shown during the threshold's reveal

### Requirement: Interior pages inherit the visual system without the pinned-scroll treatment
Interior routes (`/purpose`, `/tenets`, `/practices`, `/covenant`, `/about`, `/community`) SHALL use the Threshold palette, typography, and mote content pattern, but SHALL NOT implement the homepage's pinned hero-and-iris-reveal scroll sequence — a visitor arriving directly at an interior page SHALL see its content immediately, without a scroll gate.

#### Scenario: Interior page content visible without scrolling past a gate
- **WHEN** a visitor navigates directly to any interior route (e.g., from a search result or shared link)
- **THEN** that page's primary content is reachable without first scrolling through a pinned hero or threshold-reveal sequence

#### Scenario: Interior pages still use the Threshold visual system
- **WHEN** an interior page renders
- **THEN** it uses the paper/void/accent palette, the display/body typography pairing, and the scattered-mote content pattern defined in `design-system`
