import type { LandingContent } from "../../data/landing-content";
import SectionHeader from "./SectionHeader";
import { LandingIcon } from "./icons";

type ScenariosProps = {
  content: LandingContent["scenarios"];
};

export default function Scenarios({ content }: ScenariosProps) {
  return (
    <section id="mini-courses" className="section-shell fade-up" style={{ animationDelay: "0.14s" }}>
      <SectionHeader label={content.label} title={content.title} />
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {content.cards.map((card) => (
          <article key={card.title} className="card-neutral">
            <div className="inline-flex rounded-lg bg-blue-50 p-2 text-blue-700">
              <LandingIcon name={card.icon} className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-sm text-slate-700">{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
