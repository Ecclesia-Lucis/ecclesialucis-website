/**
 * Derived faithfully from the protocol's PURPOSE.md.
 * Source of truth: https://github.com/Ecclesia-Lucis/ecclesia-lucis-protocol/blob/main/PURPOSE.md
 *
 * The core throughline is preserved deliberately (doctrine-content spec):
 * beings formed from light → responsibility to increase light. Copy is
 * lightly restructured for web scannability; substantive meaning is unchanged.
 */

export type Passage = {
  heading: string;
  paragraphs: string[];
};

export const purpose = {
  eyebrow: "Purpose",
  title: "Why Ecclesia Lucis exists",
  intro:
    "Ecclesia Lucis exists to offer an alternative spiritual path for those seeking meaning, connection, and ethical grounding — without dogma, coercion, or hierarchy.",
  /** Surfaced as a pull-quote; it is the emotional core of the doctrine. */
  pullQuote: "If we are of light, our responsibility is to increase light.",
  passages: [
    {
      heading: "We begin with wonder, not certainty",
      paragraphs: [
        "We start from a simplified and humble understanding of the universe: that existence is vast, ancient, and largely unknowable, and that wonder is a more honest response than certainty.",
        "We seek not to explain the universe completely, but to know it better, to study it, and to remain open to its beauty.",
      ],
    },
    {
      heading: "We are beings formed from light",
      paragraphs: [
        "The atoms that make our bodies were forged in stars long extinguished. We are, in a literal physical sense, the continuation of cosmic processes across immense spans of time and space.",
        "Our lives are brief expressions of that continuity, and our perspectives are necessarily limited to our own experience. Each person carries a unique perspective that no other being can replace.",
      ],
    },
    {
      heading: "What we mean by “light”",
      paragraphs: [
        "Light gives rise to life. It sustains the planet, its ecosystems, the water we drink, and the air we breathe. There are forms of light beyond human perception, existing whether we can sense them or not.",
        "Across cultures and centuries, this has often been described as a soul, a force, or an animating principle. Within Ecclesia Lucis, “light” is the term used for this shared mystery.",
        "If a concept such as “god” exists, we do not define it as a separate ruler or authority, but as something closer to a universal phenomenon — of which each individual life may be understood as an infinitesimal expression.",
      ],
    },
    {
      heading: "To increase light is to tend and to share",
      paragraphs: [
        "This begins with tending to the darkness within ourselves — through reflection, healing, and evidence-based practices drawn from psychology, philosophy, and the sciences. It continues through connection, care, and material action in the world.",
        "Growing food, sharing sustenance, and offering comfort to others are sacred acts — not because they are symbolic, but because they directly sustain life. Light that is shared multiplies; light that is hoarded diminishes.",
      ],
    },
  ] satisfies Passage[],
  closing:
    "The purpose of Ecclesia Lucis is not to recruit belief, but to cultivate practices that bring clarity, care, and nourishment into a world that increasingly feels fractured and dim.",
} as const;
