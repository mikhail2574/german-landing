"use client";

import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Locale, MiniCourse } from "../content/landing";
import { landingContent, primaryScarcityByLocale } from "../content/landing";
import FinalApplicationForm from "./components/landing/FinalApplicationForm";
import GroupsSection from "./components/landing/GroupsSection";
import IntegrationPassCard from "./components/landing/IntegrationPassCard";
import LeadChecklistCard from "./components/landing/LeadChecklistCard";
import MiniCourseModal from "./components/landing/MiniCourseModal";
import MiniCoursesCarousel from "./components/landing/MiniCoursesCarousel";
import StoryMomentsSection from "./components/landing/StoryMomentsSection";
import TopUrgencyBar from "./components/landing/TopUrgencyBar";
import { cardReveal, sectionReveal, staggerChildren } from "./components/landing/animation-tokens";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const ADDON_STORAGE_KEY = "dfl_addons_v2";

function parseAddonIds(raw: string | null, availableIds: Set<string>): string[] {
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((id) => decodeURIComponent(id.trim()))
    .filter((id) => availableIds.has(id));
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ua");
  const [utmData, setUtmData] = useState<Record<string, string>>({});
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [activeCourse, setActiveCourse] = useState<MiniCourse | null>(null);

  const content = landingContent[locale];
  const primaryScarcity = primaryScarcityByLocale[locale];
  const availableAddonIds = useMemo(() => new Set(content.miniCourses.cards.map((course) => course.id)), [content.miniCourses.cards]);

  useEffect(() => {
    const url = new URL(window.location.href);

    const langParam = url.searchParams.get("lang");
    if (langParam === "ua" || langParam === "ru") {
      setLocale(langParam);
    }

    const collectedUtm: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = url.searchParams.get(key);
      if (value) {
        collectedUtm[key] = value;
      }
    }

    const persistedRaw = window.localStorage.getItem("dfl_utm_v2");
    let persistedUtm: Record<string, string> = {};
    if (persistedRaw) {
      try {
        persistedUtm = JSON.parse(persistedRaw) as Record<string, string>;
      } catch {
        persistedUtm = {};
      }
    }
    const mergedUtm = { ...persistedUtm, ...collectedUtm };
    if (Object.keys(mergedUtm).length > 0) {
      window.localStorage.setItem("dfl_utm_v2", JSON.stringify(mergedUtm));
      setUtmData(mergedUtm);
    }

    const urlAddons = parseAddonIds(url.searchParams.get("addons"), availableAddonIds);
    const storageAddons = parseAddonIds(window.localStorage.getItem(ADDON_STORAGE_KEY), availableAddonIds);
    const startAddons = urlAddons.length > 0 ? urlAddons : storageAddons;

    if (startAddons.length > 0) {
      setSelectedAddons(startAddons);
    }
  }, [availableAddonIds]);

  useEffect(() => {
    document.documentElement.lang = locale === "ua" ? "uk" : "ru";

    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);

    if (selectedAddons.length > 0) {
      const encoded = selectedAddons.map((id) => encodeURIComponent(id)).join(",");
      url.searchParams.set("addons", encoded);
      window.localStorage.setItem(ADDON_STORAGE_KEY, selectedAddons.join(","));
    } else {
      url.searchParams.delete("addons");
      window.localStorage.removeItem(ADDON_STORAGE_KEY);
    }

    window.history.replaceState(null, "", `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
  }, [locale, selectedAddons]);

  useEffect(() => {
    const upsertMeta = (attr: "name" | "property", key: string, value: string) => {
      const selector = `meta[${attr}="${key}"]`;
      const existing = document.head.querySelector(selector);

      if (existing) {
        existing.setAttribute("content", value);
        return;
      }

      const meta = document.createElement("meta");
      meta.setAttribute(attr, key);
      meta.setAttribute("content", value);
      document.head.append(meta);
    };

    document.title = content.meta.title;
    upsertMeta("name", "description", content.meta.description);
    upsertMeta("property", "og:title", content.meta.title);
    upsertMeta("property", "og:description", content.meta.description);
    upsertMeta("property", "og:locale", content.meta.ogLocale);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Deutsch fur Leben");
    upsertMeta("property", "og:image", "/images/leipzig-illustration.svg");
    upsertMeta("property", "og:url", window.location.href);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", content.meta.title);
    upsertMeta("name", "twitter:description", content.meta.description);
    upsertMeta("name", "twitter:image", "/images/leipzig-illustration.svg");
  }, [content.meta]);

  const toggleAddon = useCallback((id: string) => {
    setSelectedAddons((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }, []);

  const faqJsonLd = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: locale === "ua" ? "uk" : "ru",
        mainEntity: content.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a
          }
        }))
      }),
    [content.faq.items, locale]
  );

  return (
    <LazyMotion features={domAnimation}>
      <main className="landing-root pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

        <TopUrgencyBar content={content.topUrgency} scarcity={primaryScarcity} />

        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <header className="pt-4">
            <nav className="landing-nav">
              <div className="flex items-center gap-3">
                <div className="brand-mark">DfL</div>
                <p className="text-sm font-semibold text-slate-900">Deutsch fur Leben</p>
              </div>

              <div className="hidden items-center gap-2 lg:flex">
                <a href="#story" className="nav-link">
                  {content.nav.story}
                </a>
                <a href="#groups" className="nav-link">
                  {content.nav.groups}
                </a>
                <a href="#mini-courses" className="nav-link">
                  {content.nav.miniCourses}
                </a>
                <a href="#faq" className="nav-link">
                  {content.nav.faq}
                </a>
                <a href="#checklist" className="nav-link nav-link--secondary">
                  {content.nav.checklist}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <div className="lang-switch" role="group" aria-label="Language switcher">
                  <button type="button" className={locale === "ua" ? "lang-switch__button lang-switch__button--active" : "lang-switch__button"} onClick={() => setLocale("ua")}>
                    UA
                  </button>
                  <button type="button" className={locale === "ru" ? "lang-switch__button lang-switch__button--active" : "lang-switch__button"} onClick={() => setLocale("ru")}>
                    RU
                  </button>
                </div>
                <a href="#application" className="btn-primary btn-primary--sm">
                  {content.nav.primaryCta}
                </a>
              </div>
            </nav>

            <section className="hero-grid">
              <m.div variants={sectionReveal()} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
                <p className="section-kicker">{content.hero.eyebrow}</p>
                <h1 className="mt-4 max-w-[18ch] text-4xl font-semibold leading-[1.05] text-slate-950 md:text-6xl">{content.hero.title}</h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">{content.hero.subtitle}</p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a href="#application" className="btn-primary">
                    {content.hero.primaryCta}
                  </a>
                  <a href="#checklist" className="btn-secondary">
                    {content.hero.secondaryCta}
                  </a>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {content.hero.trustPills.map((pill) => (
                    <span key={pill} className="trust-pill">
                      {pill}
                    </span>
                  ))}
                </div>
              </m.div>

              <m.div
                variants={sectionReveal(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="hero-grid__pass"
              >
                <IntegrationPassCard content={content.pass} scarcity={primaryScarcity} />
              </m.div>
            </section>
          </header>

          <StoryMomentsSection content={content.story} />
          <GroupsSection content={content.groups} />

          <MiniCoursesCarousel
            content={content.miniCourses}
            selectedIds={selectedAddons}
            forWhomLabel={locale === "ua" ? "Для кого" : "Для кого"}
            outcomeLabel={locale === "ua" ? "Результат" : "Результат"}
            addedLabel={locale === "ua" ? "Додано" : "Добавлено"}
            onOpen={setActiveCourse}
          />

          <section className="section-surface founder-showcase">
            <m.div variants={sectionReveal()} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">{content.founder.title}</h2>
              <p className="mt-2 text-base text-slate-600">{content.founder.role}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5 text-emerald-600">
                  <path
                    d="M8 1.5a6.5 6.5 0 1 1 0 13a6.5 6.5 0 0 1 0-13Zm2.95 4.74a.75.75 0 0 0-1.1-1.02L7.2 8.1L6.1 7a.75.75 0 0 0-1.06 1.06l1.63 1.63a.75.75 0 0 0 1.07-.02l3.2-3.43Z"
                    fill="currentColor"
                  />
                </svg>
                <span>{content.founder.metaLine}</span>
              </p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-700">{content.founder.text}</p>

              <m.ul
                className="mt-6 grid gap-3 md:grid-cols-3"
                variants={{ hidden: {}, visible: { transition: staggerChildren } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {content.founder.bullets.map((bullet) => (
                  <m.li key={bullet} variants={cardReveal} className="founder-bullet">
                    {bullet}
                  </m.li>
                ))}
              </m.ul>
            </m.div>

            <m.div variants={sectionReveal(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <div className="founder-image-wrap">
                <Image
                  src="/images/founder_portrait.png"
                  alt={content.founder.title}
                  width={2048}
                  height={2048}
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="founder-image"
                />
              </div>
            </m.div>
          </section>

          <section id="application" className="section-surface section-surface--application scroll-mt-28">
            <div className="application-grid grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
              <LeadChecklistCard content={content.checklist} />
              <FinalApplicationForm
                content={content.form}
                contacts={content.contacts}
                miniCoursesContent={content.miniCourses}
                miniCourses={content.miniCourses.cards}
                selectedAddons={selectedAddons}
                utmData={utmData}
                onToggleAddon={toggleAddon}
              />
            </div>
          </section>

          <section id="faq" className="section-surface scroll-mt-28">
            <m.div variants={sectionReveal()} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
              <h2 className="text-3xl font-semibold text-slate-950 md:text-4xl">{content.faq.title}</h2>
            </m.div>

            <m.div
              className="mt-6 grid gap-3"
              variants={{ hidden: {}, visible: { transition: staggerChildren } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {content.faq.items.map((item) => (
                <m.details key={item.q} variants={cardReveal} className="faq-item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </m.details>
              ))}
            </m.div>
          </section>

          <footer className="landing-footer">
            <p>{content.footer.legal}</p>
            <p className="mt-1">{content.footer.contactLine}</p>
            <p className="mt-3 text-sm text-slate-600">{content.contacts.location}</p>
            <p className="mt-1 text-sm text-slate-600">{content.contacts.response}</p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <a href="/impressum" className="nav-link">
                {content.footer.links.impressum}
              </a>
              <a href="/datenschutz" className="nav-link">
                {content.footer.links.privacy}
              </a>
              <a href="/kontakt" className="nav-link">
                {content.footer.links.contact}
              </a>
            </div>
          </footer>
        </div>

        <MiniCourseModal
          content={content.miniCourses}
          course={activeCourse}
          selected={activeCourse ? selectedAddons.includes(activeCourse.id) : false}
          addLabel={locale === "ua" ? "Додати модуль" : "Добавить модуль"}
          removeLabel={locale === "ua" ? "Прибрати модуль" : "Убрать модуль"}
          closeLabel={locale === "ua" ? "Закрити" : "Закрыть"}
          jumpLabel={locale === "ua" ? "Перейти до фінальної заявки" : "Перейти к финальной заявке"}
          introLabel={locale === "ua" ? "Модуль" : "Модуль"}
          forWhomLabel={locale === "ua" ? "Для кого" : "Для кого"}
          resultLabel={locale === "ua" ? "Результат після 4 тижнів" : "Результат после 4 недель"}
          insideLabel={locale === "ua" ? "Що всередині" : "Что внутри"}
          deliverablesLabel={locale === "ua" ? "Матеріали, які ви отримаєте" : "Материалы, которые вы получите"}
          notForLabel={locale === "ua" ? "Чесно: кому не підійде" : "Честно: кому не подойдет"}
          onToggle={toggleAddon}
          onClose={() => setActiveCourse(null)}
        />
      </main>
    </LazyMotion>
  );
}
