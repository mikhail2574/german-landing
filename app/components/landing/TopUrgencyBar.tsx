"use client";

import type { ScarcityModel } from "../../../content/landing";
import { m, useReducedMotion } from "framer-motion";
import ScarcityStamp from "./ScarcityStamp";
import { motionTokens } from "./animation-tokens";

type TopUrgencyBarProps = {
  content: {
    badge: string;
    text: string;
    cta: string;
  };
  scarcity: ScarcityModel;
  onPrimaryClick?: () => void;
};

export default function TopUrgencyBar({ content, scarcity, onPrimaryClick }: TopUrgencyBarProps) {
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      initial={reducedMotion ? false : { opacity: 0, y: -18 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease.standard }}
      className="sticky top-0 z-[90] border-b border-slate-200/70 bg-white/85 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-amber-400 bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-900">
            {content.badge}
          </span>
          <p className="text-sm font-medium text-slate-700">{content.text}</p>
        </div>

        <div className="flex items-center gap-3">
          <ScarcityStamp
            compact
            label={scarcity.label}
            seatsLeft={scarcity.seatsLeft}
            totalSeats={scarcity.totalSeats}
            className="hidden sm:flex"
          />
          <a href="#application" className="btn-secondary" onClick={onPrimaryClick}>
            {content.cta}
          </a>
        </div>
      </div>
    </m.div>
  );
}
