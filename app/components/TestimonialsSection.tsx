"use client";

import { useMemo, useState } from "react";

type Locale = "ua" | "ru";

type TestimonialItem = {
  id: string;
  tag: Record<Locale, string>;
  quote: Record<Locale, string>;
  meta: Record<Locale, string>;
};

type CohortResults = {
  verified: boolean;
  period: string;
  groups: number;
  students: number;
};

type ReviewPayload = {
  name: string;
  contact: string;
  text: string;
  consent: boolean;
};

type TestimonialsSectionProps = {
  locale: Locale;
  label: string;
  title: string;
  subtitle: string;
  sourceHint: string;
  testimonials: TestimonialItem[];
  cohortResults: CohortResults;
  cohortTitle: string;
  cohortPending: string;
  review: {
    enabled: boolean;
    title: string;
    nameLabel: string;
    contactLabel: string;
    textLabel: string;
    consentLabel: string;
    submitLabel: string;
    successLabel: string;
    defaultError: string;
  };
  utmData: Record<string, string>;
  onSubmitReview: (payload: ReviewPayload) => { ok: boolean; error?: string };
};

export default function TestimonialsSection({
  locale,
  label,
  title,
  subtitle,
  sourceHint,
  testimonials,
  cohortResults,
  cohortTitle,
  cohortPending,
  review,
  utmData,
  onSubmitReview
}: TestimonialsSectionProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [text, setText] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const utmHiddenFields = useMemo(
    () => Object.entries(utmData).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />),
    [utmData]
  );

  return (
    <section className="fade-up mt-20 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-blue-50/45 to-white p-6 shadow-xl shadow-blue-100/55 md:p-8" style={{ animationDelay: "0.24s" }}>
      <div className="max-w-[70ch]">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">{label}</p>
        <h2 className="mt-3 text-3xl leading-tight text-slate-900 md:text-4xl">{title}</h2>
        <p className="mt-4 text-lg text-slate-600">{subtitle}</p>
      </div>

      <p className="mt-3 text-sm text-slate-500">{sourceHint}</p>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.id} className="h-full rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{item.tag[locale]}</p>
            <p className="mt-3 text-sm text-slate-700">{item.quote[locale]}</p>
            <p className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
              {item.meta[locale]}
            </p>
          </article>
        ))}
      </div>

      {cohortResults.verified ? (
        <article className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-800">{cohortTitle}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-emerald-700">Period</p>
              <p className="font-semibold text-emerald-950">{cohortResults.period}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-700">Groups</p>
              <p className="font-semibold text-emerald-950">{cohortResults.groups}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-700">Students</p>
              <p className="font-semibold text-emerald-950">{cohortResults.students}</p>
            </div>
          </div>
        </article>
      ) : (
        <article className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-medium text-slate-800">{cohortTitle}</p>
          <p className="mt-1">{cohortPending}</p>
        </article>
      )}

      {review.enabled ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const result = onSubmitReview({
              name,
              contact,
              text,
              consent
            });

            if (!result.ok) {
              setError(result.error ?? review.defaultError);
              setSuccess(false);
              return;
            }

            setError("");
            setSuccess(true);
            setName("");
            setContact("");
            setText("");
            setConsent(false);
          }}
          className="mt-6 rounded-2xl border border-blue-100 bg-white p-5"
        >
          {utmHiddenFields}
          <p className="text-sm font-semibold text-slate-900">{review.title}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label className="text-sm text-slate-700">
              {review.nameLabel}
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-400"
              />
            </label>
            <label className="text-sm text-slate-700">
              {review.contactLabel}
              <input
                type="text"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-400"
              />
            </label>
          </div>
          <label className="mt-3 block text-sm text-slate-700">
            {review.textLabel}
            <textarea
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              rows={4}
              className="mt-1.5 w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-400"
            />
          </label>
          <label className="mt-3 flex items-start gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked);
                if (error) {
                  setError("");
                }
              }}
              className="mt-1 h-4 w-4"
            />
            <span>{review.consentLabel}</span>
          </label>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
          {success ? <p className="mt-2 text-sm text-emerald-700">{review.successLabel}</p> : null}
          <button type="submit" className="mt-4 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white">
            {review.submitLabel}
          </button>
        </form>
      ) : null}
    </section>
  );
}
