export type HeroVariant = "a" | "b";
export type LandingLocale = "ua" | "ru";

export const growthFlags = {
  enableHeroABTest: process.env.NEXT_PUBLIC_ENABLE_HERO_AB_TEST === "1",
  defaultHeroVariant: (process.env.NEXT_PUBLIC_DEFAULT_HERO_VARIANT === "b" ? "b" : "a") as HeroVariant,
  enableBlogTeaser: process.env.NEXT_PUBLIC_ENABLE_BLOG_TEASER !== "0",
  enableWaitlist: process.env.NEXT_PUBLIC_ENABLE_WAITLIST !== "0",
  enableReviewIntake: process.env.NEXT_PUBLIC_ENABLE_REVIEW_INTAKE !== "0"
} as const;

export const heroOfferConfig: Record<LandingLocale, Record<HeroVariant, {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}>> = {
  ua: {
    a: {
      title: "Важко з інтеграцією без мови? Виведіть німецьку з нуля до B1 для життя, роботи та DTZ",
      subtitle:
        "Відпрацьовуємо реальні ситуації: Arzt, Jobcenter, Arbeit, Briefe, Telefon, щоб ви впевнено діяли щодня в Німеччині.",
      primaryCta: "Записатися на найближчу групу",
      secondaryCta: "Отримати безкоштовний чекліст"
    },
    b: {
      title: "Переїхали до Німеччини і не вистачає мови для роботи та документів? Підготуємо до B1 і DTZ",
      subtitle:
        "Фокус на Alltag, Jobcenter, Arzt, Telefon і листах: чіткий маршрут A1 -> A2 -> B1 без хаосу та перевантаження.",
      primaryCta: "Забронювати місце в потоці A1/B1",
      secondaryCta: "Взяти чекліст для старту"
    }
  },
  ru: {
    a: {
      title: "Тяжело с интеграцией без языка? Доведите немецкий с нуля до B1 для жизни, работы и DTZ",
      subtitle:
        "Тренируем конкретные ситуации: Arzt, Jobcenter, Arbeit, Briefe, Telefon, чтобы вы уверенно действовали в Германии каждый день.",
      primaryCta: "Записаться на ближайшую группу",
      secondaryCta: "Получить бесплатный чеклист"
    },
    b: {
      title: "Переехали в Германию и не хватает языка для работы и документов? Подготовим до B1 и DTZ",
      subtitle:
        "Фокус на Alltag, Jobcenter, Arzt, Telefon и письмах: четкий маршрут A1 -> A2 -> B1 без хаоса и перегруза.",
      primaryCta: "Забронировать место в потоке A1/B1",
      secondaryCta: "Взять чеклист для старта"
    }
  }
};

export function resolveHeroVariant(value: string | null | undefined): HeroVariant | null {
  if (value === "a" || value === "b") {
    return value;
  }
  return null;
}

export const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "ttclid"] as const;

export type UtmKey = (typeof utmKeys)[number];
