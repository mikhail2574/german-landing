export type HeroVariant = "a" | "b";

export const growthFlags = {
  enableHeroABTest: process.env.NEXT_PUBLIC_ENABLE_HERO_AB_TEST === "1",
  defaultHeroVariant: (process.env.NEXT_PUBLIC_DEFAULT_HERO_VARIANT === "b" ? "b" : "a") as HeroVariant,
  enableBlogTeaser: process.env.NEXT_PUBLIC_ENABLE_BLOG_TEASER === "1",
  enableWaitlist: process.env.NEXT_PUBLIC_ENABLE_WAITLIST !== "0",
  enableReviewIntake: process.env.NEXT_PUBLIC_ENABLE_REVIEW_INTAKE !== "0",
  enableTestimonials: process.env.NEXT_PUBLIC_ENABLE_TESTIMONIALS === "1"
} as const;

export function resolveHeroVariant(value: string | null | undefined): HeroVariant | null {
  if (value === "a" || value === "b") {
    return value;
  }
  return null;
}

export const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "ttclid"] as const;

export type UtmKey = (typeof utmKeys)[number];
