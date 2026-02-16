"use client";

import type { LandingModel, MiniCourse } from "../../../content/landing";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { motionTokens } from "./animation-tokens";

type MiniCourseModalProps = {
  content: LandingModel["miniCourses"];
  course: MiniCourse | null;
  selected: boolean;
  addLabel: string;
  removeLabel: string;
  closeLabel: string;
  jumpLabel: string;
  introLabel: string;
  forWhomLabel: string;
  resultLabel: string;
  insideLabel: string;
  deliverablesLabel: string;
  notForLabel: string;
  onToggle: (id: string) => void;
  onClose: () => void;
};

export default function MiniCourseModal({
  content,
  course,
  selected,
  addLabel,
  removeLabel,
  closeLabel,
  jumpLabel,
  introLabel,
  forWhomLabel,
  resultLabel,
  insideLabel,
  deliverablesLabel,
  notForLabel,
  onToggle,
  onClose
}: MiniCourseModalProps) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {course ? (
        <ModalBody
          content={content}
          course={course}
          selected={selected}
          addLabel={addLabel}
          removeLabel={removeLabel}
          closeLabel={closeLabel}
          jumpLabel={jumpLabel}
          introLabel={introLabel}
          forWhomLabel={forWhomLabel}
          resultLabel={resultLabel}
          insideLabel={insideLabel}
          deliverablesLabel={deliverablesLabel}
          notForLabel={notForLabel}
          onToggle={onToggle}
          onClose={onClose}
          reducedMotion={Boolean(reducedMotion)}
        />
      ) : null}
    </AnimatePresence>
  );
}

function ModalBody({
  content,
  course,
  selected,
  addLabel,
  removeLabel,
  closeLabel,
  jumpLabel,
  introLabel,
  forWhomLabel,
  resultLabel,
  insideLabel,
  deliverablesLabel,
  notForLabel,
  onToggle,
  onClose,
  reducedMotion
}: {
  content: LandingModel["miniCourses"];
  course: MiniCourse;
  selected: boolean;
  addLabel: string;
  removeLabel: string;
  closeLabel: string;
  jumpLabel: string;
  introLabel: string;
  forWhomLabel: string;
  resultLabel: string;
  insideLabel: string;
  deliverablesLabel: string;
  notForLabel: string;
  onToggle: (id: string) => void;
  onClose: () => void;
  reducedMotion: boolean;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const currentOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = currentOverflow;
    };
  }, [onClose]);

  const topicChips = course.tagChips.filter((chip) => chip.toLowerCase() !== "4w").slice(0, 5);
  const pricingChip = `${content.pricing.student}/${content.pricing.external}€`;
  const sessionsChip = `${course.sessionsPerWeek}×${course.sessionLengthMin}`;

  return (
    <m.div
      className="fixed inset-0 z-[120] grid place-items-center bg-slate-950/55 p-4"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={reducedMotion ? undefined : { opacity: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      onClick={onClose}
      aria-hidden
    >
      <m.section
        role="dialog"
        aria-modal="true"
        aria-label={course.title}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_35px_80px_-30px_rgba(15,23,42,0.45)] md:p-8"
        initial={reducedMotion ? false : { opacity: 0, y: 26, scale: 0.97 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease.soft }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{introLabel}</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">{course.title}</h3>
            <p className="mt-2 text-base text-slate-600">{course.subtitle}</p>
          </div>
          <button type="button" onClick={onClose} className="btn-icon" aria-label={closeLabel}>
            ×
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {topicChips.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
          <span className="tag-chip">{course.durationWeeks}w</span>
          <span className="tag-chip">{sessionsChip}</span>
          <span className="tag-chip">{content.requiresLevel}</span>
          <span className="tag-chip">{pricingChip}</span>
        </div>

        <article className="modal-block mt-6">
          <h4>{forWhomLabel}</h4>
          <p>{course.forWhom}</p>
        </article>

        <article className="modal-block mt-4">
          <h4>{resultLabel}</h4>
          <ul>
            {course.outcomePoints.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="modal-block mt-4">
          <h4>{insideLabel}</h4>
          <ul>
            {course.inside.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="modal-block mt-4">
          <h4>{deliverablesLabel}</h4>
          <ul>
            {course.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="modal-block mt-4">
          <h4>{notForLabel}</h4>
          <p>{course.notFor}</p>
        </article>

        <article className="modal-block mt-4">
          <h4>{content.eligibilityTitle}</h4>
          <ul>
            <li>{content.eligibilityStudent}</li>
            <li>{content.eligibilityExternal}</li>
          </ul>
          <p>{content.format}</p>
        </article>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button type="button" className={selected ? "btn-secondary" : "btn-primary"} onClick={() => onToggle(course.id)}>
            {selected ? removeLabel : addLabel}
          </button>
          <a href="#application" onClick={onClose} className="btn-text-link">
            {jumpLabel}
          </a>
        </div>
      </m.section>
    </m.div>
  );
}
