## MODIFIED Requirements

### Requirement: Homepage identity statement above the fold
The homepage SHALL present, above the fold, a one-sentence identity statement and either a one-sentence "what this is not" disclaimer or an immediate link to it (REQ-HOME-001). The hero SHALL render "Ecclesia Lucis," "Church of Light," and "A faith of equals" with "Church of Light" as the visually largest element, "A faith of equals" sized below it, and "Ecclesia Lucis" as the smallest label-scale element — independent of DOM heading level, which follows normal single-`<h1>`, logical-order document structure rather than visual size. The hero SHALL include a one-line pronunciation guide for "Ecclesia Lucis" immediately beneath the name. Deliberate vertical spacing SHALL separate the name/title/statement block from the identity-statement paragraph that follows, so the two do not read as one dense block.

#### Scenario: First-time visitor lands on Home
- **WHEN** a visitor loads `/`
- **THEN** a one-sentence identity statement and a "what this is not" disclaimer or link are both visible without scrolling on a standard desktop viewport

#### Scenario: Visual size hierarchy matches the founder's intended reading order
- **WHEN** the homepage hero renders
- **THEN** "Church of Light" appears at the largest display size, "A faith of equals" at a size smaller than "Church of Light," and "Ecclesia Lucis" at the smallest, label-scale size

#### Scenario: Pronunciation guide present
- **WHEN** the homepage hero renders
- **THEN** a plain-text pronunciation guide for "Ecclesia Lucis" is visible directly beneath the name

#### Scenario: Hero block breathes before the identity statement
- **WHEN** the homepage hero renders
- **THEN** clear vertical spacing separates the name/title/statement block from the identity-statement paragraph, so a visitor perceives them as a beat, not a single wall of text
