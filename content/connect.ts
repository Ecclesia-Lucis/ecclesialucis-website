/**
 * Community and Contact copy. Low-pressure framing per docs/CONTENT_STRATEGY.md
 * — describe what to expect, never pressure immediate action. No urgency,
 * scarcity, or guilt language (REQ-CTA-002).
 */

export const community = {
  eyebrow: "Community",
  title: "A community of wavelets",
  intro: [
    "Ecclesia Lucis gathers on Discord — an open space for reflection, conversation, and shared service among people exploring this path.",
    "There is no membership to apply for and nothing to prove. You are welcome to read quietly for as long as you like, or to take part whenever it feels right.",
  ],
  expectations: {
    title: "What to expect",
    items: [
      "Unhurried conversation about the tenets, the practices, and everyday life",
      "People who are skeptical, curious, and kind — no one speaking with authority over anyone else",
      "Space to simply observe; participation is always voluntary and revisable",
      "No pressure, no sales, no requirement of belief to belong",
    ],
  },
  /** Explicit reassurance in place of any urgency/scarcity framing. */
  reassurance:
    "Take the doctrine at your own pace. Read the Purpose, Tenets, Practices, and Covenant first if you’d like — the door stays open, and there’s no rush.",
} as const;

export const contact = {
  eyebrow: "Contact",
  title: "Reach the stewards",
  intro: [
    "Have a question, a concern, or something to share? You can reach the people tending this project directly by email — no account, no form, no sign-up required.",
    "For open conversation with the wider community, the Discord is usually the livelier place. For anything private, email is best.",
  ],
} as const;
