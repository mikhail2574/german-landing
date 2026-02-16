"use client";

import type { LandingModel } from "../../../content/landing";
import { m } from "framer-motion";
import ScarcityStamp from "./ScarcityStamp";
import { cardReveal, sectionReveal, staggerChildren } from "./animation-tokens";

type GroupsSectionProps = {
  content: LandingModel["groups"];
  onPrimaryClick?: () => void;
};

export default function GroupsSection({ content, onPrimaryClick }: GroupsSectionProps) {
  return (
    <section id="groups" className="section-surface section-surface--alt scroll-mt-28">
      <m.div variants={sectionReveal()} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
        <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">{content.title}</h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">{content.subtitle}</p>
      </m.div>

      <m.div
        className="mt-7 grid gap-4 lg:grid-cols-3"
        variants={{ hidden: {}, visible: { transition: staggerChildren } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {content.cards.map((group) => (
          <m.article key={group.id} variants={cardReveal} className="group-card">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{group.scarcity.label}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{group.level}</h3>
            </div>

            <dl className="mt-4 grid gap-2 text-sm text-slate-700">
              <div className="group-card__row">
                <dt>{content.startLabel}</dt>
                <dd>{group.scarcity.startDate}</dd>
              </div>
              <div className="group-card__row">
                <dt>{content.scheduleLabel}</dt>
                <dd>{group.schedule}</dd>
              </div>
              <div className="group-card__row">
                <dt>{content.formatLabel}</dt>
                <dd>{group.format}</dd>
              </div>
            </dl>

            <ScarcityStamp
              label={group.scarcity.label}
              seatsLeft={group.scarcity.seatsLeft}
              totalSeats={group.scarcity.totalSeats}
              showStamp={false}
              countSuffix={content.seatsSuffix}
              className="mt-4"
            />

            <p className="mt-3 text-sm text-slate-600">{group.scarcity.note}</p>

            <div className="mt-3 rounded-xl border border-rose-200/75 bg-rose-50/55 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-rose-700">{content.pricing.promoLabel}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                <span className="mr-1.5 text-slate-500 line-through">{content.pricing.oldPrice}</span>
                <span className="text-rose-700">{content.pricing.newPrice}</span>
                <span className="ml-1 text-xs font-medium text-slate-700">{content.pricing.moduleLabel}</span>
              </p>
              <p className="mt-1 text-xs text-slate-600">{content.pricing.onlinePrice}</p>
            </div>
          </m.article>
        ))}
      </m.div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">{content.helper}</p>
        <a href="#application" className="btn-primary" onClick={onPrimaryClick}>
          {content.primaryCta}
        </a>
      </div>
    </section>
  );
}
