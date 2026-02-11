"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import type { LandingContent } from "../../data/landing-content";
import { LandingIcon } from "./icons";

type LeadMagnetProps = {
  content: LandingContent["leadMagnet"];
  utmData: Record<string, string>;
  onTrackEvent: (eventName: string, payload: Record<string, unknown>) => void;
  onCtaClick: (ctaId: string, placement: string) => void;
};

export default function LeadMagnet({ content, utmData, onTrackEvent, onCtaClick }: LeadMagnetProps) {
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const utmHiddenFields = useMemo(
    () => Object.entries(utmData).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />),
    [utmData]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError(content.missingEmail);
      setSuccess(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError(content.invalidEmail);
      setSuccess(false);
      return;
    }

    setError("");
    setSuccess(true);
    setEmail("");
    setTelegram("");

    onTrackEvent("submit_checklist", {
      source: "checklist",
      hasTelegram: Boolean(telegram.trim())
    });
  };

  return (
    <article id="checklist" className="card-highlight h-full scroll-mt-32">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-amber-900">{content.label}</p>
      <h3 className="mt-2 text-2xl leading-tight text-slate-900">{content.title}</h3>
      <p className="mt-2 text-sm text-slate-700">{content.subtitle}</p>

      <div className="mt-4 rounded-xl border border-amber-200 bg-white p-3">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
          <LandingIcon name="fileText" className="h-4 w-4 text-amber-700" />
          {content.pdfName}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
        {utmHiddenFields}

        <label className="text-sm font-semibold text-slate-700">
          {content.email}
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) {
                setError("");
              }
            }}
            className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-amber-400"
            placeholder="name@example.com"
            aria-invalid={Boolean(error)}
            aria-describedby="checklist-error"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          {content.telegram}
          <input
            type="text"
            value={telegram}
            onChange={(event) => setTelegram(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-slate-900 outline-none focus:border-amber-400"
            placeholder="@username"
          />
        </label>

        <button type="submit" className="w-full rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-amber-950 transition hover:bg-amber-400">
          {content.submit}
        </button>

        <p className="text-xs text-slate-500">{content.privacy}</p>
        {error ? (
          <p id="checklist-error" role="alert" className="text-sm text-red-600">
            {error}
          </p>
        ) : null}

        {success ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3" role="status" aria-live="polite">
            <p className="text-sm font-semibold text-emerald-900">{content.success}</p>
            <a
              href="#application"
              onClick={() => onCtaClick("checklist_to_application", "checklist_success")}
              className="mt-2 inline-flex text-sm font-semibold text-emerald-900 underline underline-offset-2"
            >
              {content.successCta}
            </a>
          </div>
        ) : null}
      </form>
    </article>
  );
}
