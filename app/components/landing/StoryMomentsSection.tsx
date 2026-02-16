"use client";

import type { LandingModel } from "../../../content/landing";
import { m } from "framer-motion";
import { cardReveal, sectionReveal, staggerChildren } from "./animation-tokens";

type StoryMomentsSectionProps = {
  content: LandingModel["story"];
};

export default function StoryMomentsSection({
  content,
}: StoryMomentsSectionProps) {
  return (
    <section id="story" className="section-surface scroll-mt-28">
      <m.div
        variants={sectionReveal()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className="section-kicker">{content.label}</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">
          {content.title}
        </h2>
        <p className="mt-3 text-base text-slate-600 md:text-lg">
          {content.subtitle}
        </p>
      </m.div>

      <m.div
        className="mt-7 grid gap-4 md:grid-cols-3"
        variants={{ hidden: {}, visible: { transition: staggerChildren } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {content.moments.map((item) => (
          <m.article
            key={item.title}
            variants={cardReveal}
            className="story-card"
          >
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <strong>{item.action}</strong>
          </m.article>
        ))}
      </m.div>
    </section>
  );
}
