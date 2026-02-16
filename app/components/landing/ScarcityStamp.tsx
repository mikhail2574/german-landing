"use client";

import { m, useReducedMotion } from "framer-motion";
import { motionTokens } from "./animation-tokens";

type ScarcityStampProps = {
  label: string;
  seatsLeft: number;
  totalSeats: number;
  compact?: boolean;
  showStamp?: boolean;
  countSuffix?: string;
  className?: string;
  animateOnMount?: boolean;
};

function clampSeats(seatsLeft: number, totalSeats: number) {
  const safeTotal = Math.max(totalSeats, 1);
  const safeLeft = Math.max(Math.min(seatsLeft, safeTotal), 0);
  return { safeTotal, safeLeft };
}

export default function ScarcityStamp({
  label,
  seatsLeft,
  totalSeats,
  compact = false,
  showStamp = true,
  countSuffix = "",
  className = "",
  animateOnMount = true
}: ScarcityStampProps) {
  const reducedMotion = useReducedMotion();
  const { safeTotal, safeLeft } = clampSeats(seatsLeft, totalSeats);
  const segmentCount = Math.min(Math.max(safeTotal, 4), 10);
  const activeSegments = Math.round((safeLeft / safeTotal) * segmentCount);

  return (
    <div className={`scarcity-shell ${compact ? "scarcity-shell--compact" : ""} ${className}`.trim()}>
      {showStamp ? (
        <m.div
          className="scarcity-shell__stamp"
          initial={reducedMotion || !animateOnMount ? false : { opacity: 0, scale: 1.25, rotate: -14 }}
          animate={reducedMotion || !animateOnMount ? undefined : { opacity: 1, scale: 1, rotate: -8 }}
          transition={{ duration: motionTokens.duration.stamp, ease: motionTokens.ease.soft }}
          aria-hidden
        >
          {label}
        </m.div>
      ) : null}

      <div className="scarcity-shell__body">
        {countSuffix ? (
          <p className="scarcity-shell__count">
            <span>{`${safeLeft}/${safeTotal}`}</span>
            <span>{countSuffix}</span>
          </p>
        ) : (
          <p className="scarcity-shell__count">
            <span>{safeLeft}</span>
            <span>/ {safeTotal}</span>
          </p>
        )}
        <div
          className="scarcity-shell__meter"
          role="img"
          aria-label={countSuffix ? `${safeLeft}/${safeTotal} ${countSuffix}` : `${safeLeft} of ${safeTotal} seats left`}
        >
          {Array.from({ length: segmentCount }, (_, index) => {
            const active = index < activeSegments;
            return (
              <span
                key={`${label}-${index}`}
                className={active ? "scarcity-shell__segment scarcity-shell__segment--active" : "scarcity-shell__segment"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
