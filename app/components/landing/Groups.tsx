import type { LandingContent } from "../../data/landing-content";
import IntegrationPass from "./IntegrationPass";
import SectionHeader from "./SectionHeader";
import { LandingIcon } from "./icons";

type GroupsProps = {
  content: LandingContent["groups"];
  pass: LandingContent["pass"];
};

export default function Groups({ content, pass }: GroupsProps) {
  return (
    <section id="groups" className="section-shell fade-up" style={{ animationDelay: "0.2s" }}>
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <IntegrationPass {...pass} compact />

        <div className="grid gap-3 sm:grid-cols-2">
          {content.proofs.map((proof) => (
            <article key={proof} className="card-primary h-full">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-blue-800">
                <LandingIcon name="users" className="h-4 w-4" />
                {proof}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {content.cards.map((group) => (
          <article key={`${group.level}-${group.start}`} className="card-neutral">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] ${
                  group.urgent ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"
                }`}
              >
                {group.status}
              </span>
              <span className="text-sm font-semibold text-slate-700">{group.level}</span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <p className="flex items-center gap-2">
                <LandingIcon name="calendar" className="h-4 w-4 text-blue-700" />
                {group.start}
              </p>
              <p className="flex items-center gap-2">
                <LandingIcon name="clock" className="h-4 w-4 text-blue-700" />
                {group.schedule}
              </p>
              <p className="flex items-center gap-2">
                <LandingIcon name="monitor" className="h-4 w-4 text-blue-700" />
                {group.format}
              </p>
            </div>

            <p
              className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${
                group.urgent ? "bg-rose-100 text-rose-800" : "bg-blue-100 text-blue-800"
              }`}
            >
              {group.seats}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
