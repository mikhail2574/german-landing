"use client";

import { useEffect, useMemo, useState } from "react";
import Application from "./components/landing/Application";
import FAQ from "./components/landing/FAQ";
import Founder from "./components/landing/Founder";
import Groups from "./components/landing/Groups";
import Hero from "./components/landing/Hero";
import HowItWorks from "./components/landing/HowItWorks";
import LeadMagnet from "./components/landing/LeadMagnet";
import Problems from "./components/landing/Problems";
import Program from "./components/landing/Program";
import Scenarios from "./components/landing/Scenarios";
import SectionHeader from "./components/landing/SectionHeader";
import { LandingIcon } from "./components/landing/icons";
import { growthFlags, resolveHeroVariant, utmKeys, type HeroVariant } from "./config/growth";
import { blogPosts } from "./data/blog-posts";
import { landingContent, type Locale } from "./data/landing-content";
import socialProofData from "./data/social-proof.json";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(eventName: string, payload: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: eventName, ...payload });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ua");
  const [heroVariant, setHeroVariant] = useState<HeroVariant>(growthFlags.defaultHeroVariant);
  const [utmData, setUtmData] = useState<Record<string, string>>({});
  const [showMobileSticky, setShowMobileSticky] = useState(false);

  const content = landingContent[locale];
  const activeHeroVariant = growthFlags.enableHeroABTest ? heroVariant : "a";
  const blogTeasers = useMemo(() => blogPosts.slice(0, 3), []);
  const realTestimonials = useMemo(
    () => socialProofData.testimonials.filter((item) => !item.id.startsWith("beta")),
    []
  );
  const showTestimonials = growthFlags.enableTestimonials && realTestimonials.length > 0;

  const trackWithContext = (eventName: string, payload: Record<string, unknown> = {}) => {
    trackEvent(eventName, {
      locale,
      hero_variant: activeHeroVariant,
      ...payload,
      ...utmData
    });
  };

  useEffect(() => {
    const url = new URL(window.location.href);

    const langParam = url.searchParams.get("lang");
    if (langParam === "ru" || langParam === "ua") {
      setLocale(langParam);
    }

    const requestedHeroVariant = resolveHeroVariant(url.searchParams.get("hero"));
    if (growthFlags.enableHeroABTest && requestedHeroVariant) {
      setHeroVariant(requestedHeroVariant);
    }

    const storageKey = "dfl_utm_v1";
    const collected: Record<string, string> = {};

    for (const key of utmKeys) {
      const value = url.searchParams.get(key);
      if (value) {
        collected[key] = value;
      }
    }

    const persistedRaw = window.localStorage.getItem(storageKey);
    let persisted: Record<string, string> = {};

    if (persistedRaw) {
      try {
        persisted = JSON.parse(persistedRaw) as Record<string, string>;
      } catch {
        persisted = {};
      }
    }

    const merged = { ...persisted, ...collected };
    if (Object.keys(merged).length > 0) {
      setUtmData(merged);
      window.localStorage.setItem(storageKey, JSON.stringify(merged));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "ua" ? "uk" : "ru";

    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);

    if (growthFlags.enableHeroABTest) {
      url.searchParams.set("hero", activeHeroVariant);
    } else {
      url.searchParams.delete("hero");
    }

    window.history.replaceState(null, "", `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
  }, [locale, activeHeroVariant]);

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

  useEffect(() => {
    const onScroll = () => {
      setShowMobileSticky(window.scrollY > 280);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    trackWithContext("view_hero");
  }, [locale, activeHeroVariant, utmData]);

  const handleCtaClick = (ctaId: string, placement: string) => {
    trackWithContext("click_cta", {
      cta_id: ctaId,
      placement
    });
  };

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
    <main className="relative isolate overflow-x-clip pb-36 md:pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      <div className="sticky top-0 z-[80] border-b border-blue-300/30 bg-gradient-to-r from-[#0b2c72] via-[#1346ae] to-[#1f79e0] text-white shadow-lg shadow-blue-500/20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-amber-950">
              <LandingIcon name="alarm" className="h-3.5 w-3.5" />
              {content.announcement.badge}
            </span>
            <p className="font-semibold">{content.announcement.text}</p>
          </div>
          <a
            href="#application"
            onClick={() => handleCtaClick("announcement_apply", "announcement_bar")}
            className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-blue-900 transition hover:bg-blue-50"
          >
            {content.announcement.cta}
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-5 sm:px-8 lg:px-10">
        <header className="fade-up">
          <nav className="rounded-2xl border border-blue-100 bg-white/90 px-4 py-3 shadow-xl shadow-blue-100/70 backdrop-blur sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-content-center rounded-xl bg-gradient-to-br from-blue-700 to-sky-500 text-sm font-extrabold text-white">
                  DfL
                </div>
                <p className="text-sm font-bold text-slate-900">Deutsch fur Leben</p>
              </div>

              <div className="order-3 flex w-full items-center gap-2 overflow-x-auto pb-1 md:order-2 md:w-auto md:justify-center md:pb-0">
                <a href="#format" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  {content.nav.howItWorks}
                </a>
                <a href="#program" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  {content.nav.program}
                </a>
                <a href="#groups" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  {content.nav.groups}
                </a>
                <a href="#faq" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  {content.nav.faq}
                </a>
                {growthFlags.enableBlogTeaser ? (
                  <a href="#blog" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                    {content.nav.blog}
                  </a>
                ) : (
                  <a href="/blog" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                    {content.nav.blog}
                  </a>
                )}
                <a href="#contacts" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  {content.nav.contacts}
                </a>
              </div>

              <div className="order-2 flex items-center gap-2 md:order-3">
                <div className="relative flex w-[96px] rounded-full border border-slate-200 bg-slate-50 p-1">
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute left-1 top-1 h-6 w-[42px] rounded-full bg-blue-700 shadow-sm transition-transform duration-300 ease-out ${
                      locale === "ru" ? "translate-x-[46px]" : "translate-x-0"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setLocale("ua")}
                    className={`relative z-10 h-6 w-[42px] rounded-full text-xs font-semibold ${
                      locale === "ua" ? "text-white" : "text-slate-600"
                    }`}
                  >
                    UA
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocale("ru")}
                    className={`relative z-10 h-6 w-[42px] rounded-full text-xs font-semibold ${
                      locale === "ru" ? "text-white" : "text-slate-600"
                    }`}
                  >
                    RU
                  </button>
                </div>
                <a
                  href="#application"
                  onClick={() => handleCtaClick("nav_apply", "navigation")}
                  className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {content.nav.apply}
                </a>
              </div>
            </div>
          </nav>

          <Hero hero={content.hero} pass={content.pass} activeVariant={activeHeroVariant} onCtaClick={handleCtaClick} />
        </header>

        <Problems content={content.problems} />
        <HowItWorks content={content.howItWorks} />
        <Scenarios content={content.scenarios} />
        <Program content={content.program} />
        <Groups content={content.groups} pass={content.pass} />
        <Founder content={content.founder} />
        {showTestimonials ? (
          <section className="section-shell fade-up" style={{ animationDelay: "0.245s" }}>
            <SectionHeader
              label={locale === "ua" ? "Відгуки" : "Отзывы"}
              title={locale === "ua" ? "Що кажуть студенти" : "Что говорят студенты"}
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {realTestimonials.map((item) => (
                <article key={item.id} className="card-neutral">
                  <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{item.tag[locale]}</p>
                  <p className="mt-2 text-sm text-slate-700">{item.quote[locale]}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
        <FAQ content={content.faq} />

        {growthFlags.enableBlogTeaser ? (
          <section id="blog" className="section-shell fade-up" style={{ animationDelay: "0.29s" }}>
            <SectionHeader label={content.blogTeaser.label} title={content.blogTeaser.title} subtitle={content.blogTeaser.text} />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {blogTeasers.map((post) => (
                <article key={post.slug} className="card-primary">
                  <h3 className="text-base font-semibold text-slate-900">{post.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-600">{post.excerpt}</p>
                  <a href={`/blog/${post.slug}`} className="mt-3 inline-flex text-sm font-semibold text-blue-800 underline underline-offset-2">
                    {content.blogTeaser.cta}
                  </a>
                </article>
              ))}
            </div>
            <a href="/blog" className="mt-5 inline-flex rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white">
              {content.blogTeaser.cta}
            </a>
          </section>
        ) : (
          <div id="blog" className="scroll-mt-32" aria-hidden />
        )}

        <section
          id="application"
          className="fade-up mt-16 rounded-[2rem] border border-blue-800/30 bg-gradient-to-br from-[#0d2d75] via-[#1242a7] to-[#2184f0] px-6 py-9 shadow-xl shadow-blue-400/25 md:px-10 md:py-12 md:shadow-2xl md:shadow-blue-400/30"
          style={{ animationDelay: "0.32s" }}
        >
          <SectionHeader label={content.finalCta.label} title={content.finalCta.title} subtitle={content.finalCta.subtitle} light />
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber-200/70 bg-amber-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-amber-950">
            <LandingIcon name="alarm" className="h-4 w-4" />
            {content.finalCta.scarcityLine}
          </p>

          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <LeadMagnet content={content.leadMagnet} utmData={utmData} onTrackEvent={trackWithContext} onCtaClick={handleCtaClick} />
            <Application
              locale={locale}
              content={content.form}
              contacts={content.contacts}
              utmData={utmData}
              heroVariant={activeHeroVariant}
              onTrackEvent={trackWithContext}
            />
          </div>

          <div id="contacts" className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4 scroll-mt-32">
            <article className="rounded-2xl border border-white/30 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-100">E-Mail</p>
              <a href={`mailto:${content.contacts.email}`} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-100">
                <LandingIcon name="mail" className="h-4 w-4" />
                {content.contacts.email}
              </a>
            </article>
            <article className="rounded-2xl border border-white/30 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-100">Telegram</p>
              <a href="https://t.me/deutschfuerleben" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-100">
                <LandingIcon name="message" className="h-4 w-4" />
                {content.contacts.telegram}
              </a>
            </article>
            <article className="rounded-2xl border border-white/30 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-100">Leipzig / Online</p>
              <p className="mt-2 inline-flex items-start gap-2 text-sm font-semibold text-white">
                <LandingIcon name="mapPin" className="mt-0.5 h-4 w-4" />
                {content.contacts.address}
              </p>
            </article>
            <article className="rounded-2xl border border-amber-200/80 bg-amber-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-amber-900">24h</p>
              <p className="mt-2 text-sm font-semibold text-amber-950">{content.contacts.response}</p>
            </article>
          </div>
        </section>

        <footer className="fade-up mt-10 pb-4" style={{ animationDelay: "0.38s" }}>
          <p className="text-center text-sm text-slate-600">{content.footer.disclaimer}</p>
          <p className="mt-2 text-center text-sm text-slate-600">{content.footer.contactLine}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-700">
            <a href="/impressum" className="rounded-full border border-blue-100 bg-white px-4 py-1.5 hover:bg-blue-50">
              {content.footer.links.impressum}
            </a>
            <a href="/datenschutz" className="rounded-full border border-blue-100 bg-white px-4 py-1.5 hover:bg-blue-50">
              {content.footer.links.privacy}
            </a>
            <a href="/kontakt" className="rounded-full border border-blue-100 bg-white px-4 py-1.5 hover:bg-blue-50">
              {content.footer.links.contact}
            </a>
          </div>
        </footer>
      </div>

      <div
        className={`mobile-sticky-cta md:hidden ${
          showMobileSticky ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-2">
          <a
            href="#application"
            onClick={() => handleCtaClick("mobile_apply", "mobile_sticky")}
            className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-400/30"
          >
            {content.nav.apply}
          </a>
          <a
            href="#checklist"
            onClick={() => handleCtaClick("mobile_checklist", "mobile_sticky")}
            className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-4 py-3 text-center text-sm font-semibold text-blue-900"
          >
            {content.hero.variants[activeHeroVariant].secondaryCta}
          </a>
        </div>
      </div>
    </main>
  );
}
