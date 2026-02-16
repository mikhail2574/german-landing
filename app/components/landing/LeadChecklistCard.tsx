"use client";

import type { LandingModel } from "../../../content/landing";
import { useState, type FormEvent } from "react";

type LeadChecklistCardProps = {
  content: LandingModel["checklist"];
};

export default function LeadChecklistCard({ content }: LeadChecklistCardProps) {
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const cleanEmail = email.trim();
    const cleanTelegram = telegram.trim();

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
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-checklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          telegram: cleanTelegram || undefined,
          locale: document.documentElement.lang,
          sourceUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit checklist");
      }

      setSuccess(true);
      setIsDeliveryModalOpen(true);
      setIsSubmitting(false);
      setEmail("");
      setTelegram("");
    } catch {
      setIsSubmitting(false);
      setSuccess(false);
      setError(content.submitError);
    }
  };

  return (
    <>
      <article id="checklist" className="checklist-card scroll-mt-28">
        <h3 className="text-2xl font-semibold text-slate-950">{content.title}</h3>
        <p className="mt-3 text-sm text-slate-700">{content.subtitle}</p>

        <ul className="mt-4 grid gap-2">
          {content.benefits.map((benefit) => (
            <li key={benefit} className="checklist-benefit">
              <span className="checklist-benefit__dot" aria-hidden />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {success ? (
          <p className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">{content.success}</p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-4">
            <label className="input-shell">
              <span>{content.emailLabel}</span>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) {
                    setError("");
                  }
                }}
                placeholder="name@example.com"
                className="input-control"
                aria-invalid={Boolean(error)}
                required
                aria-describedby="checklist-error"
              />
            </label>

            <label className="input-shell">
              <span>{content.telegramLabel}</span>
              <input
                type="text"
                value={telegram}
                onChange={(event) => {
                  setTelegram(event.target.value);
                  if (error) {
                    setError("");
                  }
                }}
                placeholder="@username"
                className="input-control"
              />
            </label>

            {error ? (
              <p id="checklist-error" className="text-sm font-medium text-rose-700" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-75">
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-white" aria-hidden />
                  {content.submitting}
                </span>
              ) : (
                content.submit
              )}
            </button>

            <p className="text-xs text-slate-600">{content.buttonHint}</p>
          </form>
        )}
      </article>

      {isDeliveryModalOpen ? (
        <div className="delivery-modal-backdrop" onClick={() => setIsDeliveryModalOpen(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-label={content.channelModalTitle}
            className="delivery-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="btn-icon ml-auto"
              onClick={() => setIsDeliveryModalOpen(false)}
              aria-label={content.channelModalClose}
            >
              ×
            </button>
            <h4 className="mt-2 text-xl font-semibold text-slate-900">{content.channelModalTitle}</h4>
            <p className="mt-3 text-sm text-slate-700">{content.channelModalText}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={content.channelUrl} target="_blank" rel="noreferrer" className="btn-primary">
                {content.channelModalCta}
              </a>
              <button type="button" className="btn-secondary" onClick={() => setIsDeliveryModalOpen(false)}>
                {content.channelModalClose}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
