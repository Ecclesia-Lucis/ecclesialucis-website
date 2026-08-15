/**
 * Derived faithfully from the protocol's COVENANT.md, folding in
 * ceremonies/GOVERNANCE.md (non-hierarchy / no clergy), per the sitemap in
 * docs/CONTENT_STRATEGY.md — /covenant carries the trust-building work.
 * Sources of truth:
 *   https://github.com/Ecclesia-Lucis/ecclesia-lucis-protocol/blob/main/COVENANT.md
 *   https://github.com/Ecclesia-Lucis/ecclesia-lucis-protocol/blob/main/ceremonies/GOVERNANCE.md
 */

export const covenant = {
  eyebrow: "Covenant",
  title: "How this protects you",
  intro: [
    "This protocol is offered freely and without expectation.",
    "By engaging with Ecclesia Lucis materials, contributors and practitioners agree to a short set of principles — safeguards meant to protect both participants and the integrity of the protocol itself.",
  ],
  /** Trust-building pull-quote near the top (docs/CONTENT_STRATEGY.md). */
  pullQuote: "Interpretation is individual. Practice is voluntary. Departure requires no justification.",
  principles: [
    {
      title: "No claim of spiritual authority over others",
      body: "No one interprets or speaks for these ideas on your behalf.",
    },
    {
      title: "No requirement of belief, participation, or allegiance",
      body: "You are free to engage, adapt, or step away — on your own terms.",
    },
    {
      title: "No monetization of legitimacy or access",
      body: "Standing here is never bought or sold. The materials are free.",
    },
    {
      title: "No coercion, shame, or fear-based persuasion",
      body: "Attraction only ever comes from clarity and genuine value.",
    },
    {
      title: "No substitution for professional care",
      body: "Nothing here replaces professional medical, legal, or mental-health support.",
    },
  ],
  enforcement: {
    title: "When conditions are violated",
    body: "The appropriate response is disengagement — not enforcement. This covenant exists to protect both participants and the integrity of the protocol itself.",
  },
  governance: {
    eyebrow: "Governance",
    title: "There is no one above you here",
    version: "v0.1",
    paragraphs: [
      "Ecclesia Lucis does not maintain a hierarchy, board, clergy, or appointed spiritual authority. There is no structure that confers authority to interpret or enforce belief or behavior.",
      "Decisions about gatherings, resources, or practices are made by those directly involved, on the smallest appropriate scale.",
      "When consensus is not possible, disassociation is permitted. There is no disciplinary mechanism.",
    ],
    note: "This document may expand as needed to prevent the emergence of authority or coercion.",
  },
} as const;
