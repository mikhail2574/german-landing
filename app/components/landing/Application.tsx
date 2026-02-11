"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import type { HeroVariant } from "../../config/growth";
import type { LandingContent, Locale } from "../../data/landing-content";

type ApplicationProps = {
  locale: Locale;
  content: LandingContent["form"];
  contacts: LandingContent["contacts"];
  utmData: Record<string, string>;
  heroVariant: HeroVariant;
  onTrackEvent: (eventName: string, payload: Record<string, unknown>) => void;
};

function OptionGroup({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: Array<{ id: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-blue-100">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                isActive ? "border-white bg-white text-blue-900" : "border-white/40 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function Application({ locale, content, contacts, utmData, heroVariant, onTrackEvent }: ApplicationProps) {
  const [level, setLevel] = useState(content.levelOptions[0]?.id ?? "a1");
  const [format, setFormat] = useState(content.formatOptions[0]?.id ?? "online");
  const [time, setTime] = useState(content.timeOptions[0]?.id ?? "evening");
  const [city, setCity] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const utmHiddenFields = useMemo(
    () => Object.entries(utmData).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />),
    [utmData]
  );

  const levelLabel = content.levelOptions.find((option) => option.id === level)?.label ?? "";
  const formatLabel = content.formatOptions.find((option) => option.id === format)?.label ?? "";
  const timeLabel = content.timeOptions.find((option) => option.id === time)?.label ?? "";

  const consentJoinWord = locale === "ua" ? "та" : "и";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanEmail = email.trim();
    const cleanTelegram = telegram.trim();

    if (!cleanEmail && !cleanTelegram) {
      setError(content.contactError);
      setSuccess(false);
      return;
    }

    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError(content.invalidEmail);
      setSuccess(false);
      return;
    }

    if (!consent) {
      setError(content.consentError);
      setSuccess(false);
      return;
    }

    setError("");
    setSuccess(true);
    setEmail("");
    setTelegram("");
    setConsent(false);

    onTrackEvent("submit_lead", {
      source: "application",
      level: levelLabel,
      format: formatLabel,
      time: timeLabel,
      city,
      hasEmail: Boolean(cleanEmail),
      hasTelegram: Boolean(cleanTelegram)
    });
  };

  return (
    <article className="rounded-2xl border border-white/25 bg-white/10 p-5 md:p-6">
      {success ? (
        <div className="rounded-xl border border-emerald-200/80 bg-emerald-100/95 p-5 text-emerald-950" role="status" aria-live="polite">
          <p className="text-lg font-bold">{content.successTitle}</p>
          <p className="mt-2 text-sm">{content.successText}</p>
          <p className="mt-2 text-sm">{content.privacy}</p>
          <a
            href="https://t.me/deutschfuerleben"
            className="mt-4 inline-flex rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900"
          >
            {content.successCta}
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="grid gap-4">
          {utmHiddenFields}
          <input type="hidden" name="selected_level" value={levelLabel} />
          <input type="hidden" name="selected_format" value={formatLabel} />
          <input type="hidden" name="selected_time" value={timeLabel} />
          <input type="hidden" name="selected_city" value={city} />
          <input type="hidden" name="hero_variant" value={heroVariant} />

          <div className="grid gap-4 md:grid-cols-3">
            <OptionGroup label={content.level} options={content.levelOptions} value={level} onChange={setLevel} />
            <OptionGroup label={content.format} options={content.formatOptions} value={format} onChange={setFormat} />
            <OptionGroup label={content.time} options={content.timeOptions} value={time} onChange={setTime} />
          </div>

          <label className="text-sm text-blue-100">
            {content.city}
            <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder={content.cityPlaceholder}
              className="mt-2 w-full rounded-xl border border-white/35 bg-white/12 px-4 py-3 text-white outline-none transition placeholder:text-blue-100/85 focus:border-white focus:bg-white/20"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-blue-100">
              {content.fields.telegram}
              <input
                type="text"
                value={telegram}
                onChange={(event) => {
                  setTelegram(event.target.value);
                  if (error) {
                    setError("");
                  }
                }}
                placeholder={content.placeholders.telegram}
                aria-invalid={Boolean(error)}
                aria-describedby="application-contact-hint application-error"
                className="mt-2 w-full rounded-xl border border-white/35 bg-white/12 px-4 py-3 text-white outline-none transition placeholder:text-blue-100/80 focus:border-white focus:bg-white/18"
              />
            </label>

            <label className="text-sm text-blue-100">
              {content.fields.email}
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) {
                    setError("");
                  }
                }}
                placeholder={content.placeholders.email}
                aria-invalid={Boolean(error)}
                aria-describedby="application-contact-hint application-error"
                className="mt-2 w-full rounded-xl border border-white/35 bg-white/12 px-4 py-3 text-white outline-none transition placeholder:text-blue-100/80 focus:border-white focus:bg-white/18"
              />
            </label>
          </div>

          <p id="application-contact-hint" className="text-sm text-blue-100">
            {content.contactHint}
          </p>
          <p className="text-sm text-blue-100">{content.privacy}</p>

          <p className="text-sm text-blue-100">
            E-Mail:{" "}
            <a href={`mailto:${contacts.email}`} className="font-semibold text-white underline underline-offset-2">
              {contacts.email}
            </a>{" "}
            • Telegram:{" "}
            <a href="https://t.me/deutschfuerleben" className="font-semibold text-white underline underline-offset-2">
              {contacts.telegram}
            </a>
          </p>

          <label className="flex items-start gap-3 text-sm text-blue-100">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked);
                if (error) {
                  setError("");
                }
              }}
              className="mt-1 h-4 w-4 rounded border-white/40 bg-white/15"
            />
            <span>
              {content.consentPrefix}{" "}
              <a href="/datenschutz" className="font-semibold text-white underline underline-offset-2">
                {content.consentPrivacy}
              </a>{" "}
              {consentJoinWord}{" "}
              <a href="/impressum" className="font-semibold text-white underline underline-offset-2">
                {content.consentImpressum}
              </a>
              .
            </span>
          </label>

          {error ? (
            <p id="application-error" role="alert" className="text-sm text-rose-100">
              {error}
            </p>
          ) : null}

          <button type="submit" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-50">
            {content.submit}
          </button>
        </form>
      )}
    </article>
  );
}
