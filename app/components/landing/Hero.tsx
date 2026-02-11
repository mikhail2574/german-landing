import type { HeroVariant } from "../../config/growth";
import type { LandingContent } from "../../data/landing-content";
import IntegrationPass from "./IntegrationPass";

type HeroProps = {
  hero: LandingContent["hero"];
  pass: LandingContent["pass"];
  activeVariant: HeroVariant;
  onCtaClick: (ctaId: string, placement: string) => void;
};

export default function Hero({ hero, pass, activeVariant, onCtaClick }: HeroProps) {
  const variant = hero.variants[activeVariant];

  return (
    <section className="mt-6 grid gap-6 rounded-[2rem] border border-blue-100 bg-white/[0.9] p-6 shadow-lg shadow-blue-200/40 backdrop-blur md:grid-cols-[1.1fr_0.9fr] md:p-10 md:shadow-2xl md:shadow-blue-200/45">
      <div>
        <p className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
          {hero.badge}
        </p>
        <h1 className="mt-6 max-w-[24ch] text-4xl leading-tight text-slate-950 md:text-5xl md:leading-[1.08]">{variant.title}</h1>
        <p className="mt-5 max-w-[68ch] text-lg leading-relaxed text-slate-600 md:text-xl">{variant.subtitle}</p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="#application"
            onClick={() => onCtaClick("hero_primary", "hero")}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 px-7 py-3 text-sm font-semibold text-white transition hover:from-blue-800 hover:to-sky-600"
          >
            {variant.primaryCta}
          </a>
          <a
            href="#checklist"
            onClick={() => onCtaClick("hero_secondary", "hero")}
            className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50"
          >
            {variant.secondaryCta}
          </a>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {hero.trustPills.map((pill) => (
            <span key={pill} className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs text-slate-600">
              {pill}
            </span>
          ))}
        </div>
      </div>

      <IntegrationPass {...pass} />
    </section>
  );
}
