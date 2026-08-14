/**
 * About / FAQ content. Directly answers the skeptic's four core questions
 * required by REQ-ABOUT-001: "is this a cult," "do I have to believe in god,"
 * "is this free," and "who runs this." Grounded in PURPOSE.md, COVENANT.md,
 * and ceremonies/GOVERNANCE.md; phrased to avoid all words-to-avoid tokens.
 */

export type Faq = {
  question: string;
  answer: string[];
};

export const about = {
  eyebrow: "About",
  title: "Honest answers to the first questions people ask",
  intro:
    "Skepticism is welcome here — it is one of the tenets. If you arrived wondering whether this is trustworthy, these are the questions worth asking, answered plainly.",
  faqs: [
    {
      question: "Is this a cult?",
      answer: [
        "No — and the structure is deliberately built to make it impossible to become one.",
        "There is no central authority, no required belief, no fee, and no barrier to leaving. No one interprets these ideas on your behalf or speaks for them over others. Departure requires no justification, and the covenant’s own answer to any abuse of power is disengagement, never enforcement.",
      ],
    },
    {
      question: "Do I have to believe in god?",
      answer: [
        "No. Belief is never a requirement of participation.",
        "Ecclesia Lucis does not define “god” as a separate ruler or authority. If such a concept exists, we understand it as something closer to a universal phenomenon — of which each life may be an infinitesimal expression. People who are atheist, agnostic, or rooted in another tradition all practice here without contradiction.",
      ],
    },
    {
      question: "Is this free?",
      answer: [
        "Yes. The materials are offered freely and without expectation.",
        "The protocol is open-source and forkable — you are free to read it, practice it, adapt it, or depart from it entirely. The covenant explicitly forbids any monetization of legitimacy or access. There are no fees and no tithes.",
      ],
    },
    {
      question: "Who runs this?",
      answer: [
        "No one holds authority over anyone else. There is no hierarchy, board, clergy, or appointed spiritual office.",
        "Decisions about gatherings, resources, or practices are made by the people directly involved, on the smallest appropriate scale. The doctrine itself lives in a public, open-source repository that anyone can read, question, adapt, or fork.",
      ],
    },
  ] satisfies Faq[],
} as const;
