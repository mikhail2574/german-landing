import Image from "next/image";
import type { LandingContent } from "../../data/landing-content";
import SectionHeader from "./SectionHeader";
import { LandingIcon } from "./icons";

type FounderProps = {
  content: LandingContent["founder"];
};

export default function Founder({ content }: FounderProps) {
  return (
    <section className="section-shell fade-up" style={{ animationDelay: "0.23s" }}>
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="overflow-hidden rounded-3xl border border-blue-100 bg-blue-50/35">
          <Image
            src="/images/founder-portrait.svg"
            alt={content.profileName}
            width={960}
            height={1024}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority={false}
          />
        </article>

        <div>
          <SectionHeader label={content.label} title={content.title} />
          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
            <p className="font-semibold text-slate-900">{content.profileName}</p>
            <p className="text-sm text-slate-600">{content.profileRole}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-800">
              <LandingIcon name="mapPin" className="h-3.5 w-3.5" />
              {content.trustLine}
            </p>
          </div>
          <p className="mt-4 text-slate-700">{content.text}</p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {content.bullets.map((bullet) => (
              <article key={bullet.title} className="card-primary h-full">
                <p className="text-sm font-semibold text-slate-900">{bullet.title}</p>
                <p className="mt-1.5 text-sm text-slate-600">{bullet.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
