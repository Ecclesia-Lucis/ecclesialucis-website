## Purpose

Structured, faithful, web-scannable content derived from the protocol's doctrine source documents, kept separate from layout/component code so future doctrine updates don't require touching React code (`docs/PRD.md` REQ-CONTENT-001/002, US-7).

## ADDED Requirements

### Requirement: Faithful content extraction
Doctrine content on the site SHALL preserve the substantive meaning of the source documents (`../../PURPOSE.md`, `../../TENANTS.md`, `../../PRACTICES.md`, `../../COVENANT.md`, `../../ceremonies/GOVERNANCE.md`). Copy edits for web readability are permitted; substantive meaning changes are not (REQ-CONTENT-001).

#### Scenario: Purpose page preserves core throughline
- **WHEN** the Purpose page renders content derived from `PURPOSE.md`
- **THEN** the "beings formed from light... responsibility to increase light" throughline is present, not flattened into generic wellness copy

#### Scenario: Tenets marked provisional
- **WHEN** the Tenets page renders content derived from `TENANTS.md`
- **THEN** the "provisional and open to revision" framing is visibly present, not presented as fixed commandments

### Requirement: Content stored separately from layout code
Doctrine content SHALL be stored in structured content files (MDX or JSON under a `content/` directory) rather than inlined as literal strings inside page/component files (REQ-CONTENT-001, `docs/PRD.md` §5.5).

#### Scenario: Content edit doesn't require component changes
- **WHEN** doctrine text needs a wording update
- **THEN** the change can be made by editing a file under `content/` without modifying `.tsx` component files

### Requirement: Scannable presentation, not walls of text
Doctrine pages SHALL use headings, short paragraphs, and pull-quotes rather than long unbroken prose blocks (REQ-CONTENT-002).

#### Scenario: Tenets rendered as scannable units
- **WHEN** the Tenets page renders the versioned tenets from `TENANTS.md`
- **THEN** each tenet is presented as a distinct scannable card/section rather than one continuous prose block

### Requirement: Vocabulary rules enforced
Content SHALL avoid the words-to-avoid list in `docs/CONTENT_STRATEGY.md` (leader, follow(ers), obey, must believe, sin, salvation, convert-a-soul, join now/limited time/act fast) and SHALL prefer the active-vocabulary list (light-bearer, practice, explore, tend, reflect, repair, steward, provisional, forkable, commons).

#### Scenario: No authority language anywhere
- **WHEN** any doctrine or marketing copy is generated for this change
- **THEN** it contains none of the words-to-avoid list
