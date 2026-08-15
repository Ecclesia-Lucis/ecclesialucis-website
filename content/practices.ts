/**
 * Derived faithfully from the protocol's PRACTICES.md.
 * Source of truth: https://github.com/Ecclesia-Lucis/ecclesia-lucis-protocol/blob/main/PRACTICES.md
 *
 * The "not requirements... tools, not tests" framing is kept prominent in the
 * intro, before the list (docs/CONTENT_STRATEGY.md). All 8 practices preserved.
 */

export type Practice = {
  number: number;
  name: string;
  optional?: boolean;
  summary: string;
  items?: string[];
  note?: string;
};

export const practices = {
  eyebrow: "Practices",
  title: "Tools, not tests",
  intro: [
    "These are optional practices associated with the Ecclesia Lucis Protocol.",
    "Practices are not requirements. They are tools, not tests. They exist to help individuals and communities tend to light in themselves, in others, and in the material world.",
  ],
  /** Surfaced prominently near the top so status/authority framing is unmistakable. */
  framing: [
    "No practice confers status.",
    "No practice establishes authority.",
    "Participation is voluntary, contextual, and revisable.",
  ],
  items: [
    {
      number: 1,
      name: "Reflection",
      summary:
        "Attending to one’s own experience with honesty and humility. The aim is not certainty, but clarity — asking what you feel, what you avoid, where you cause harm, and where you are capable of repair.",
      items: [
        "Quiet contemplation",
        "Journaling or written inquiry",
        "Dialogue with trusted others",
        "Study of philosophy, science, and history",
      ],
      note: "No interpretation is privileged over another.",
    },
    {
      number: 2,
      name: "Repair",
      summary:
        "Addressing harm — internal, relational, or material — rather than denying or spiritualizing it. Repair is a sacred act because it increases light by reducing unnecessary suffering.",
      items: [
        "Apology without expectation of forgiveness",
        "Reconciliation where safe and consensual",
        "Setting boundaries where reconciliation is not possible",
        "Therapy, counseling, or other professional support",
        "Restoring land, tools, or shared resources",
      ],
    },
    {
      number: 3,
      name: "Sustenance",
      summary:
        "Supporting life directly and materially. Food grown or shared in excess of personal need is understood as light meant to circulate, not accumulate. Sustenance is prioritized over symbolism.",
      items: [
        "Growing food",
        "Sharing meals",
        "Feeding those in need without qualification or shame",
        "Supporting access to clean water, shelter, and care",
      ],
    },
    {
      number: 4,
      name: "Attention",
      summary:
        "Choosing what one allows to shape the mind. Attention is treated as a finite resource and a moral choice.",
      items: [
        "Limiting exposure to media that thrives on fear, outrage, or dehumanization",
        "Cultivating curiosity rather than doom consumption",
        "Engaging with information deliberately, not compulsively",
      ],
    },
    {
      number: 5,
      name: "Rest",
      summary:
        "Honoring physical and mental limits. Rest is not laziness — it is maintenance of the light-bearing system.",
      items: [
        "Sleep",
        "Stillness",
        "Time without productivity or performance",
        "Periodic withdrawal from noise, work, or obligation",
      ],
    },
    {
      number: 6,
      name: "Gathering",
      optional: true,
      summary:
        "People choosing to be present with one another in shared reflection or service. Gatherings are not sermons; no individual speaks with spiritual authority over others.",
      items: ["Conversation", "Silence", "Shared meals", "Collaborative labor — gardening, repair, service"],
    },
    {
      number: 7,
      name: "Ceremonial Moments",
      optional: true,
      summary:
        "Certain moments in life — birth, partnership, death — benefit from intentional marking. Ceremonies are witnesses, not validations; expressions of meaning, not control. No ceremony binds belief or allegiance.",
      items: [
        "Consensual by all involved",
        "Free of gender, familial, or hierarchical coercion",
        "Open to reinterpretation by those involved",
      ],
    },
    {
      number: 8,
      name: "Stewardship of Assets",
      summary:
        "Where land, property, or assets are held in service of Ecclesia Lucis, they are shared responsibilities rather than sources of personal power. Accumulation without purpose is discouraged; sustainability without exploitation is the goal.",
      items: [
        "Transparency in use and finances",
        "Prioritizing self-sustainability over extraction",
        "Using assets to support food growth, shelter, and community resilience",
      ],
    },
  ] satisfies Practice[],
  closing: [
    "Practices evolve. They may be adopted, adapted, or abandoned.",
    "What matters is not adherence, but intention: to reduce darkness where possible, and to increase light where it can be shared.",
  ],
} as const;
