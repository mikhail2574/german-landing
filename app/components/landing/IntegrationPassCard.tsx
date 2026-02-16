"use client";

import type { LandingModel, ScarcityModel } from "../../../content/landing";
import { m, useReducedMotion } from "framer-motion";
import ScarcityStamp from "./ScarcityStamp";
import { motionTokens } from "./animation-tokens";

type IntegrationPassCardProps = {
  content: LandingModel["pass"];
  scarcity: ScarcityModel;
};

export default function IntegrationPassCard({ content, scarcity }: IntegrationPassCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <article className="integration-pass-card relative overflow-hidden rounded-[1.75rem] border border-slate-300/70 bg-white p-5 shadow-[0_20px_60px_-35px_rgba(11,31,64,0.45)] md:p-6">
      {!reducedMotion ? (
        <m.div
          aria-hidden
          className="integration-pass-card__scanline"
          initial={{ x: "-140%", opacity: 0 }}
          animate={{ x: "220%", opacity: [0, 1, 0] }}
          transition={{ duration: motionTokens.duration.scan, ease: motionTokens.ease.smooth, delay: 0.18 }}
        />
      ) : null}

      <div className="relative z-[2]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">{content.label}</p>
          {content.stamp ? (
            <span className="rounded-full border border-rose-300 bg-rose-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-800">
              {content.stamp}
            </span>
          ) : null}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="pass-row">
            <p className="pass-row__label">{content.startLabel}</p>
            <p className="pass-row__value">{scarcity.startDate}</p>
          </div>
          <div className="pass-row">
            <p className="pass-row__label">{content.scheduleLabel}</p>
            <p className="pass-row__value pass-row__value--sm">{content.schedule}</p>
          </div>
          <div className="pass-row sm:col-span-2">
            <p className="pass-row__label">{content.formatLabel}</p>
            <p className="pass-row__value pass-row__value--sm">{content.format}</p>
          </div>
        </div>

        <ScarcityStamp label={scarcity.label} seatsLeft={scarcity.seatsLeft} totalSeats={scarcity.totalSeats} className="mt-5" />

        <div className="mt-4 rounded-2xl border border-rose-200/80 bg-rose-50/60 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-700">{content.pricing.promoLabel}</p>
          <p className="mt-1 text-base font-semibold text-slate-900">
            <span className="mr-2 text-slate-500 line-through">{content.pricing.oldPrice}</span>
            <span className="text-rose-700">{content.pricing.newPrice}</span>
            <span className="ml-1 text-sm font-medium text-slate-700">{content.pricing.moduleLabel}</span>
          </p>
          <p className="mt-1 text-sm text-slate-600">{content.pricing.onlinePrice}</p>
        </div>

        <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{content.statusLine}</p>
      </div>
    </article>
  );
}
