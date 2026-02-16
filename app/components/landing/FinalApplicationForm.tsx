"use client";

import type { LandingModel, MiniCourse } from "../../../content/landing";
import { useEffect, useMemo, useState, type FormEvent } from "react";

type FinalApplicationFormProps = {
  content: LandingModel["form"];
  contacts: LandingModel["contacts"];
  miniCoursesContent: LandingModel["miniCourses"];
  miniCourses: MiniCourse[];
  selectedAddons: string[];
  utmData: Record<string, string>;
  onToggleAddon: (id: string) => void;
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
      <legend className="form-legend">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              type="button"
              key={option.id}
              onClick={() => onChange(option.id)}
              className={active ? "option-pill option-pill--active" : "option-pill"}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function FinalApplicationForm({
  content,
  contacts,
  miniCoursesContent,
  miniCourses,
  selectedAddons,
  utmData,
  onToggleAddon
}: FinalApplicationFormProps) {
  const [level, setLevel] = useState(content.levelOptions[0]?.id ?? "a1");
  const [format, setFormat] = useState(content.formatOptions[0]?.id ?? "online");
  const [time, setTime] = useState(content.timeOptions[0]?.id ?? "evening");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedAddonLabels = useMemo(() => {
    const selectedSet = new Set(selectedAddons);
    return miniCourses.filter((course) => selectedSet.has(course.id)).map((course) => course.title);
  }, [miniCourses, selectedAddons]);
  const selectedAddonShortLabels = useMemo(() => selectedAddonLabels.map((label) => label.split(":")[0]?.trim() ?? label), [selectedAddonLabels]);

  const levelLabel = content.levelOptions.find((option) => option.id === level)?.label ?? "";
  const formatLabel = content.formatOptions.find((option) => option.id === format)?.label ?? "";
  const timeLabel = content.timeOptions.find((option) => option.id === time)?.label ?? "";
  const cleanEmail = email.trim();
  const cleanTelegram = telegram.trim();
  const hasContact = Boolean(cleanEmail || cleanTelegram);
  const emailValid = !cleanEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);
  const showCityField = format !== "online";
  const addonsEnabled = level !== "a1";
  const canSubmit = consent && hasContact && emailValid && !isSubmitting;

  const utmHiddenFields = Object.entries(utmData).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />);

  useEffect(() => {
    if (!showCityField && city) {
      setCity("");
    }
  }, [showCityField, city]);

  useEffect(() => {
    if (!addonsEnabled && selectedAddons.length > 0) {
      selectedAddons.forEach((id) => onToggleAddon(id));
    }
  }, [addonsEnabled, onToggleAddon, selectedAddons]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

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
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          city: city.trim(),
          email: cleanEmail || undefined,
          telegram: cleanTelegram || undefined,
          level: levelLabel,
          format: formatLabel,
          time: timeLabel,
          consent,
          selectedAddonIds: selectedAddons,
          selectedAddonLabels,
          locale: document.documentElement.lang,
          sourceUrl: window.location.href,
          utmData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setSuccess(true);
      setEmail("");
      setTelegram("");
      setName("");
      setConsent(false);
    } catch {
      setSuccess(false);
      setError(content.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <article className="form-success" role="status" aria-live="polite">
        <h3>{content.successTitle}</h3>
        <p>{content.successText}</p>
        {selectedAddonLabels.length > 0 ? (
          <p>
            {content.addonsSelectedLabel}: <strong>{selectedAddonLabels.join(" • ")}</strong>
          </p>
        ) : null}
      </article>
    );
  }

  return (
    <article className="application-card">
      <h3 className="text-2xl font-semibold text-slate-950">{content.title}</h3>
      <p className="mt-3 text-sm text-slate-700">{content.subtitle}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-7 grid gap-6">
        {utmHiddenFields}
        <input type="hidden" name="selected_level" value={levelLabel} />
        <input type="hidden" name="selected_format" value={formatLabel} />
        <input type="hidden" name="selected_time" value={timeLabel} />
        <input type="hidden" name="selected_city" value={city} />
        <input type="hidden" name="selected_addons" value={selectedAddonLabels.join(" | ")} />
        <input type="hidden" name="selected_addon_ids" value={selectedAddons.join(",")} />

        <section className="form-step">
          <p className="form-step__label">{content.stepLevelFormat}</p>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <OptionGroup label={content.level} options={content.levelOptions} value={level} onChange={setLevel} />
            <OptionGroup label={content.format} options={content.formatOptions} value={format} onChange={setFormat} />
            <OptionGroup label={content.time} options={content.timeOptions} value={time} onChange={setTime} />
          </div>

          <div className={showCityField ? "mt-4 grid gap-4 md:grid-cols-2" : "mt-4 grid gap-4"}>
            <label className="input-shell">
              <span>{content.fields.name}</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={content.placeholders.name}
                className="input-control"
              />
            </label>
            {showCityField ? (
              <label className="input-shell">
                <span>{content.city}</span>
                <input
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder={content.cityPlaceholder}
                  className="input-control"
                />
              </label>
            ) : null}
          </div>
        </section>

        <section className="form-step">
          <p className="form-step__label">{content.stepContacts}</p>
          <p id="application-hint" className="mt-2 text-sm text-slate-700">
            {content.contactHint}
          </p>

          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <label className="input-shell">
              <span>{content.fields.email}</span>
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
                className="input-control"
                aria-invalid={Boolean(error)}
                aria-describedby="application-hint application-error"
              />
            </label>

            <label className="input-shell">
              <span>{content.fields.telegram}</span>
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
                className="input-control"
                aria-invalid={Boolean(error)}
                aria-describedby="application-hint application-error"
              />
            </label>
          </div>
        </section>

        <section className="form-step addon-shell">
          <p className="form-step__label">{content.stepAddons}</p>
          <p className="mt-2 font-semibold text-slate-900">{content.addonsTitle}</p>
          <p className="mt-1 text-sm text-slate-700">{content.addonsHint}</p>

          <div className="mt-3 rounded-xl border border-slate-200 bg-white/70 p-3">
            {selectedAddonLabels.length > 0 ? (
              <>
                <p className="text-sm font-medium text-slate-700">
                  {content.addonsSelectedLabel}: <strong>{selectedAddonLabels.length}</strong>
                </p>
                <p className="mt-1 truncate text-xs text-slate-600" title={selectedAddonShortLabels.join(" • ")}>
                  {selectedAddonShortLabels.join(" • ")}
                </p>
              </>
            ) : (
              <span className="text-sm text-slate-600">{content.noAddons}</span>
            )}
          </div>

          {!addonsEnabled ? <p className="mt-3 text-sm font-medium text-amber-800">{content.addonsDisabledHint}</p> : null}

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {miniCourses.map((course) => {
              const selected = selectedAddons.includes(course.id);
              return (
                <label
                  key={course.id}
                  className={
                    addonsEnabled
                      ? selected
                        ? "addon-option addon-option--active"
                        : "addon-option"
                      : "addon-option addon-option--disabled"
                  }
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    disabled={!addonsEnabled}
                    onChange={() => onToggleAddon(course.id)}
                    className="mt-1 h-4 w-4 accent-slate-900"
                  />
                  <span>
                    <span className="block font-semibold text-slate-900">{course.title}</span>
                    <span className="addon-option__meta">{`${miniCoursesContent.pricing.student} € / ${course.durationWeeks} тижні (1×${course.sessionLengthMin} хв/тиждень)`}</span>
                    <span className="addon-option__meta">{`${miniCoursesContent.pricing.external} € / ${course.durationWeeks} тижні (потрібен рівень ${miniCoursesContent.requiresLevel})`}</span>
                  </span>
                </label>
              );
            })}
          </div>

          <p className="mt-3 text-sm text-slate-700">{content.addonsReviewHint}</p>
        </section>

        <section className="form-step">
          <p className="form-step__label">{content.stepConfirm}</p>
          <label className="mt-2 inline-flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked);
                if (error) {
                  setError("");
                }
              }}
              className="mt-1 h-4 w-4 accent-slate-900"
            />
            <span>{content.consentText}</span>
          </label>
        </section>

        <p className="text-sm text-slate-700">
          E-Mail: <a href={`mailto:${contacts.email}`}>{contacts.email}</a> • Telegram: <a href="https://t.me/deutschfuerleben">{contacts.telegram}</a>
        </p>

        <p className="text-sm text-slate-700">{content.responseSla}</p>

        {error ? (
          <p id="application-error" role="alert" className="text-sm font-medium text-rose-700">
            {error}
          </p>
        ) : null}

        {!canSubmit && !error ? (
          <p className="text-xs text-slate-500">{!hasContact ? content.contactError : !emailValid ? content.invalidEmail : !consent ? content.consentError : ""}</p>
        ) : null}

        <button type="submit" disabled={!canSubmit} className="btn-primary w-full justify-center md:w-auto disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-white" aria-hidden />
              {content.submitting}
            </span>
          ) : (
            content.submit
          )}
        </button>
      </form>
    </article>
  );
}
