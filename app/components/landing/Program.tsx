import type { LandingContent } from "../../data/landing-content";
import SectionHeader from "./SectionHeader";

type ProgramProps = {
  content: LandingContent["program"];
};

export default function Program({ content }: ProgramProps) {
  return (
    <section id="program" className="section-shell fade-up" style={{ animationDelay: "0.17s" }}>
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        <article className="card-neutral">
          <p className="text-sm font-semibold uppercase tracking-[0.11em] text-blue-700">{content.lessonFlowTitle}</p>
          <ul className="mt-4 space-y-3">
            {content.lessonFlow.map((item) => (
              <li key={item.time} className="flex gap-3">
                <span className="mt-0.5 inline-flex min-w-[74px] justify-center rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-800">
                  {item.time}
                </span>
                <span className="text-sm text-slate-700">{item.text}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="card-highlight">
          <p className="text-sm font-semibold uppercase tracking-[0.11em] text-amber-900">{content.levelsTitle}</p>
          <p className="mt-2 text-sm text-amber-900/90">A1 &rarr; A2 &rarr; B1 (DTZ)</p>
        </article>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {content.levels.map((level) => (
          <article key={level.level} className="card-neutral">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-slate-900">{level.level}</h3>
              <p className="text-sm text-slate-500">{level.duration}</p>
            </div>
            {level.ribbon ? <p className="mt-3 rounded-lg bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-900">{level.ribbon}</p> : null}

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{content.topicsLabel}</p>
            <ul className="mt-2 space-y-2">
              {level.topics.map((topic) => (
                <li key={topic} className="flex gap-2 text-sm text-slate-700">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{content.outcomesLabel}</p>
            <ul className="mt-2 space-y-2">
              {level.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-2 text-sm text-slate-700">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-700" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
