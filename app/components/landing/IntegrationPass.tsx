import { LandingIcon } from "./icons";

export type IntegrationPassProps = {
  label: string;
  stamp: string;
  startLabel: string;
  seatsLabel: string;
  scheduleLabel: string;
  formatLabel: string;
  startDate: string;
  seatsLeft: number;
  totalSeats: number;
  schedule: string;
  format: string;
  meterLabel: string;
  compact?: boolean;
};

export default function IntegrationPass({
  label,
  stamp,
  startLabel,
  seatsLabel,
  scheduleLabel,
  formatLabel,
  startDate,
  seatsLeft,
  totalSeats,
  schedule,
  format,
  meterLabel,
  compact = false
}: IntegrationPassProps) {
  const cappedTotalSeats = Math.max(totalSeats, 1);
  const cappedSeatsLeft = Math.min(Math.max(seatsLeft, 0), cappedTotalSeats);

  return (
    <article
      role="region"
      aria-label={label}
      className={`integration-pass relative overflow-hidden rounded-[1.4rem] border border-blue-200 bg-gradient-to-br from-white via-blue-50 to-[#eff6ff] p-5 shadow-xl shadow-blue-100/70 ${compact ? "md:p-4" : "md:p-6"}`}
    >
      <div aria-hidden className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#eef4ff] ring-1 ring-blue-200/50" />
      <div aria-hidden className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#eef4ff] ring-1 ring-blue-200/50" />

      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">{label}</p>
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.11em] text-amber-950">
          <LandingIcon name="sparkles" className="h-3.5 w-3.5" />
          {stamp}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <dl className="card-primary rounded-xl p-3">
          <dt className="text-xs uppercase tracking-[0.08em] text-blue-700">{startLabel}</dt>
          <dd className="mt-1 text-xl font-bold text-slate-900">{startDate}</dd>
        </dl>
        <dl className="card-highlight rounded-xl p-3">
          <dt className="text-xs uppercase tracking-[0.08em] text-amber-900">{seatsLabel}</dt>
          <dd className="mt-1 text-xl font-bold text-amber-950">{cappedSeatsLeft}</dd>
        </dl>
      </div>

      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-blue-100 bg-white p-3">
          <dt className="text-xs uppercase tracking-[0.08em] text-slate-500">{scheduleLabel}</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-800">{schedule}</dd>
        </div>
        <div className="rounded-xl border border-blue-100 bg-white p-3">
          <dt className="text-xs uppercase tracking-[0.08em] text-slate-500">{formatLabel}</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-800">{format}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <p className="sr-only">{meterLabel}</p>
        <div aria-hidden className="flex items-center gap-1.5">
          {Array.from({ length: cappedTotalSeats }, (_, index) => {
            const isActive = index < cappedSeatsLeft;
            return (
              <span
                key={index}
                className={`h-2.5 w-6 rounded-full ${isActive ? "bg-rose-500" : "bg-blue-200"}`}
              />
            );
          })}
        </div>
      </div>

      <div aria-hidden className="mt-4 border-t border-dashed border-blue-200" />
      <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
        <LandingIcon name="alarm" className="h-4 w-4 text-rose-500" />
        {meterLabel}
      </p>
    </article>
  );
}
