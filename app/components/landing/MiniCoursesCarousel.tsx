"use client";

import type { LandingModel, MiniCourse } from "../../../content/landing";
import { m, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cardReveal, motionTokens, sectionReveal, staggerChildren } from "./animation-tokens";

type MiniCoursesCarouselProps = {
  content: LandingModel["miniCourses"];
  selectedIds: string[];
  forWhomLabel: string;
  outcomeLabel: string;
  addedLabel: string;
  onOpen: (course: MiniCourse) => void;
};

export default function MiniCoursesCarousel({
  content,
  selectedIds,
  forWhomLabel,
  outcomeLabel,
  addedLabel,
  onOpen
}: MiniCoursesCarouselProps) {
  const reducedMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const courses = content.cards;
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const durationBadge = useMemo(() => content.format.split("·")[0]?.trim() ?? `${courses[0]?.durationWeeks ?? 4}w`, [content.format, courses]);
  const pricingBadge = `${content.pricing.student}/${content.pricing.external} €`;
  const pricingLine = `${content.pricing.student} € ${content.pricingStudentLabel} / ${content.pricing.external} € ${content.pricingExternalLabel}`;

  const updateButtons = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) {
      return;
    }

    const maxScroll = node.scrollWidth - node.clientWidth;
    setCanPrev(node.scrollLeft > 8);
    setCanNext(node.scrollLeft < maxScroll - 8);
  }, []);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const node = scrollerRef.current;
    if (!node) {
      return;
    }

    const firstCard = node.querySelector<HTMLLIElement>("li");
    const cardWidth = firstCard?.offsetWidth ?? 300;
    node.scrollBy({ left: direction * (cardWidth + 16), behavior: "smooth" });
  }, []);

  useEffect(() => {
    updateButtons();
    const node = scrollerRef.current;
    if (!node) {
      return;
    }

    const onScroll = () => updateButtons();
    node.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateButtons);

    return () => {
      node.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  return (
    <section id="mini-courses" className="section-ink scroll-mt-28">
      <m.div
        variants={sectionReveal()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <h2 className="text-3xl font-semibold text-white md:text-4xl">{content.title}</h2>
        <p className="mt-3 max-w-3xl text-base text-slate-200 md:text-lg">{content.subtitle}</p>

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-300">{content.helperText}</p>
          <div className="hidden gap-2 md:flex">
            <button type="button" className="carousel-nav" onClick={() => scrollByCard(-1)} disabled={!canPrev}>
              ←
            </button>
            <button type="button" className="carousel-nav" onClick={() => scrollByCard(1)} disabled={!canNext}>
              →
            </button>
          </div>
        </div>
      </m.div>

      <m.div
        className="mt-6"
        initial={reducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: motionTokens.duration.medium, ease: motionTokens.ease.soft }}
      >
        <m.ul
          ref={scrollerRef}
          className="carousel-track"
          variants={{ hidden: {}, visible: { transition: staggerChildren } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              scrollByCard(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              scrollByCard(-1);
            }
          }}
          aria-label={content.title}
        >
          {courses.map((course) => {
            const selected = selectedSet.has(course.id);
            const topicChips = course.tagChips.filter((chip) => chip.toLowerCase() !== "4w").slice(0, 5);
            return (
              <m.li key={course.id} variants={cardReveal} className="mini-course-card group">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mini-course-pill mini-course-pill--key">{content.requiresLevel}</span>
                  <span className="mini-course-pill mini-course-pill--key">{pricingBadge}</span>
                  <span className="mini-course-pill mini-course-pill--key">{durationBadge}</span>
                  {selected ? <span className="mini-course-pill mini-course-pill--selected">{addedLabel}</span> : null}
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {topicChips.map((tag) => (
                    <span key={`${course.id}-${tag}`} className="mini-course-pill mini-course-pill--ghost">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-4 text-xl font-semibold text-white">{course.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{course.subtitle}</p>

                <dl className="mt-4 grid gap-2 text-sm">
                  <div>
                    <dt className="text-slate-400">{forWhomLabel}</dt>
                    <dd className="text-slate-100">{course.forWhom}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">{outcomeLabel}</dt>
                    <dd className="text-slate-100">{course.outcome}</dd>
                  </div>
                </dl>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-slate-100">{pricingLine}</p>
                  <p className="mt-1 text-sm text-slate-300">
                    {content.entryLabel}: {content.requiresLevel}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{content.diagnosticsNote}</p>
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <button type="button" className="mini-course-cta" onClick={() => onOpen(course)}>
                    {course.cta}
                  </button>
                </div>
              </m.li>
            );
          })}
        </m.ul>
      </m.div>
    </section>
  );
}
