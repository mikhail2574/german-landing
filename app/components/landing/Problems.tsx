import type { LandingContent } from "../../data/landing-content";
import SectionHeader from "./SectionHeader";
import { LandingIcon } from "./icons";

type ProblemsProps = {
  content: LandingContent["problems"];
};

export default function Problems({ content }: ProblemsProps) {
  return (
    <section className="section-shell fade-up" style={{ animationDelay: "0.08s" }}>
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {content.cards.map((card) => (
          <article key={card.title} className="card-neutral transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
                <LandingIcon name={card.icon} className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{card.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
