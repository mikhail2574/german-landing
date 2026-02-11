import type { ReactNode } from "react";

export default function SectionHeader({
  label,
  title,
  subtitle,
  light = false,
  aside
}: {
  label: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="max-w-[70ch]">
        <p className={`text-xs font-bold uppercase tracking-[0.16em] ${light ? "text-blue-100" : "text-blue-700"}`}>{label}</p>
        <h2 className={`mt-3 text-3xl leading-tight md:text-4xl ${light ? "text-white" : "text-slate-900"}`}>{title}</h2>
        {subtitle ? <p className={`mt-3 text-base md:text-lg ${light ? "text-blue-100" : "text-slate-600"}`}>{subtitle}</p> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
