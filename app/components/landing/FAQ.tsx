import type { LandingContent } from "../../data/landing-content";
import SectionHeader from "./SectionHeader";
import { LandingIcon } from "./icons";

type FaqProps = {
  content: LandingContent["faq"];
};

export default function FAQ({ content }: FaqProps) {
  return (
    <section id="faq" className="section-shell fade-up" style={{ animationDelay: "0.26s" }}>
      <SectionHeader label={content.label} title={content.title} />
      <div className="mt-7 space-y-3">
        {content.items.map((item) => (
          <details key={item.q} className="card-neutral group p-0">
            <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 text-base font-semibold text-slate-900">
              <span className="rounded-md bg-blue-50 p-1 text-blue-700">
                <LandingIcon name="badgeCheck" className="h-4 w-4" />
              </span>
              {item.q}
            </summary>
            <p className="px-5 pb-5 text-sm text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
