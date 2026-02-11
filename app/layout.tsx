import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deutschfuerleben.de"),
  title: "Немецкий для интеграции в Германии | A1-B1, DTZ",
  description:
    "Практический курс немецкого для взрослых мигрантов в Германии: Arzt, Jobcenter, работа, письма, телефон. Старт A1 21.02, осталось 4 места.",
  alternates: {
    languages: {
      uk: "/?lang=ua",
      ru: "/?lang=ru"
    }
  },
  openGraph: {
    title: "Немецкий для интеграции в Германии | A1-B1, DTZ",
    description:
      "Практический курс немецкого для взрослых мигрантов в Германии: Arzt, Jobcenter, работа, письма, телефон. Старт A1 21.02, осталось 4 места.",
    url: "/",
    siteName: "Deutsch für Leben",
    locale: "ru_RU",
    alternateLocale: ["uk_UA"],
    type: "website",
    images: [
      {
        url: "/images/leipzig-illustration.svg",
        width: 1200,
        height: 630,
        alt: "Deutsch für Leben"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Немецкий для интеграции в Германии | A1-B1, DTZ",
    description:
      "Практический курс немецкого для взрослых мигрантов в Германии: Arzt, Jobcenter, работа, письма, телефон. Старт A1 21.02, осталось 4 места.",
    images: ["/images/leipzig-illustration.svg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
