/**
 * Derived faithfully from the protocol's TENANTS.md.
 * Source of truth: https://github.com/Ecclesia-Lucis/ecclesia-lucis-protocol/blob/main/TENANTS.md
 *
 * The "provisional and open to revision" framing is kept visibly present
 * (doctrine-content spec) — these are not fixed commandments. Version labels
 * (v0.0–v0.10) are preserved. The site uses "tenets" as the reader-facing
 * spelling per docs/CONTENT_STRATEGY.md; the source titles them "tenants."
 */

export type Tenet = {
  version: string;
  name: string;
  body: string;
};

export const tenets = {
  eyebrow: "Tenets",
  title: "Principles offered as guidance",
  intro: [
    "Ecclesia Lucis affirms tenets rather than dogma.",
    "Language is an imperfect tool for expressing meaning, and no written text can capture truth in its entirety. These tenets are not commandments or requirements of belief, but shared principles offered as guidance.",
  ],
  /** Kept prominent so tenets never read as fixed commandments. */
  provisionalNote: "All tenets are provisional and open to revision.",
  items: [
    {
      version: "v0.0",
      name: "No Authority",
      body: "No individual, council, or institution may claim exclusive authority to interpret, enforce, or speak on behalf of these tenets for others.",
    },
    {
      version: "v0.1",
      name: "Truth",
      body: "Seek understanding through the best available evidence while recognizing that all knowledge is provisional. Favor inquiry, skepticism, and revision over certainty, and treat the scientific method as a powerful — but not exclusive — tool for understanding reality.",
    },
    {
      version: "v0.2",
      name: "Ecology",
      body: "Honor and actively preserve the health of Earth’s interconnected ecosystems, recognizing them as the material foundation for all life.",
    },
    {
      version: "v0.3",
      name: "Empathy",
      body: "Strive to understand the experiences, needs, and suffering of others. Choose actions that reduce unnecessary harm and support the well-being of sentient life.",
    },
    {
      version: "v0.4",
      name: "Body",
      body: "Respect the inherent right of each individual to bodily autonomy and freedom of consciousness, so long as the exercise of this freedom does not violate the same right in others.",
    },
    {
      version: "v0.5",
      name: "Growth",
      body: "Value lifelong learning and the cultivation of critical thinking, curiosity, and discernment.",
    },
    {
      version: "v0.6",
      name: "Health",
      body: "Support practices and knowledge that promote physical and mental well-being and reduce preventable suffering.",
    },
    {
      version: "v0.7",
      name: "Stewardship",
      body: "Treat finite resources with care and restraint, recognizing responsibility to future generations.",
    },
    {
      version: "v0.8",
      name: "Unity",
      body: "Affirm the equal dignity and worth of all people. Resist ideologies and structures that divide or dehumanize.",
    },
    {
      version: "v0.9",
      name: "Restraint",
      body: "Approach conflict with patience, dialogue, and proportionality. Regard force as a failure of understanding, used only to prevent greater harm.",
    },
    {
      version: "v0.10",
      name: "Care for the Future",
      body: "Act with responsibility toward generations yet unborn, recognizing that today’s choices shape the long arc of human possibility.",
    },
  ] satisfies Tenet[],
} as const;
