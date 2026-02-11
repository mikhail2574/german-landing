import type { LandingContent } from "../../data/landing-content";
import SectionHeader from "./SectionHeader";
import { LandingIcon } from "./icons";

type HowItWorksProps = {
  content: LandingContent["howItWorks"];
};

export default function HowItWorks({ content }: HowItWorksProps) {
  return (
    <section id="format" className="section-shell fade-up" style={{ animationDelay: "0.11s" }}>
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {content.cards.map((card) => (
          <article key={card.title} className="card-primary h-full">
            <div className="rounded-lg bg-white p-2 text-blue-700 shadow-sm w-fit">
              <LandingIcon name={card.icon} className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-base font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-1.5 text-sm text-slate-600">{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
