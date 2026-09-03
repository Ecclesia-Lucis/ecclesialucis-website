import { Chamber } from "@/components/Chamber";
import { CtaBanner } from "@/components/CtaBanner";
import { Hero } from "@/components/Hero";
import { ThresholdReveal } from "@/components/ThresholdReveal";
import { covenant } from "@/content/covenant";
import { practices } from "@/content/practices";
import { purpose } from "@/content/purpose";
import { tenets } from "@/content/tenets";

/**
 * Homepage (marketing-pages spec: "Homepage presented as an alternating
 * threshold/chamber sequence"). Hero, then four alternating threshold/
 * chamber pairs — one per doctrine pillar, in Purpose/Tenets/Practices/
 * Covenant order — ending with the existing CtaBanner, unchanged in
 * position (doctrine-before-conversion IA, CLAUDE.md content rule #3).
 *
 * The hero renders on the void tone (against the dark hero image); each
 * threshold flips the page's tone, and each chamber that follows inherits
 * whichever tone its threshold just flipped into — void, paper, void, paper
 * — so the sequence ends back on paper, matching the site's fixed chrome
 * (nav, footer) before the CTA.
 *
 * Every chamber's heading/body/motes are pulled verbatim from the existing
 * doctrine content files (content/purpose.ts etc.) — no doctrine copy is
 * introduced or altered here, only its presentation (design.md's
 * Non-Goals). Threshold labels are a single doctrine-pillar word, so no
 * content is duplicated between a threshold and the chamber that follows it
 * (design-system spec: "Threshold reveal shows only a label, not the
 * chamber's full content").
 */
export default function HomePage() {
  return (
    <div className="relative">
      <Hero />

      <ThresholdReveal label="Purpose" from="void" to="paper" />
      <Chamber
        tone="paper"
        eyebrow="Purpose"
        heading={purpose.pullQuote}
        body={purpose.intro}
        motes={purpose.passages.map((passage) => passage.heading)}
      />

      <ThresholdReveal label="Tenets" from="paper" to="void" />
      <Chamber
        tone="void"
        eyebrow="Tenets"
        heading={tenets.title}
        body={tenets.provisionalNote}
        motes={tenets.items.map((tenet) => tenet.name)}
      />

      <ThresholdReveal label="Practices" from="void" to="paper" />
      <Chamber
        tone="paper"
        eyebrow="Practices"
        heading={practices.title}
        body={practices.intro[1]}
        motes={practices.items.map((practice) => practice.name)}
      />

      <ThresholdReveal label="Covenant" from="paper" to="void" />
      <Chamber
        tone="void"
        eyebrow="Covenant"
        heading={covenant.pullQuote}
        body={covenant.intro[0]}
        motes={covenant.principles.map((principle) => principle.title)}
      />

      {/* CTA — still arrives only after every doctrine chamber above
          (doctrine-before-conversion IA), unchanged in position and copy.
          The preceding Covenant chamber ends on the void tone; CtaBanner
          itself isn't tone-scoped, so it renders on the site's fixed paper
          chrome like the footer that follows it. */}
      <CtaBanner />
    </div>
  );
}
