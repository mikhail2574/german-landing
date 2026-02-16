import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deutschfuerleben.de"),
  title: "Deutsch fur Leben | German for integration in Germany",
  description:
    "Practical German groups A1-B1 for migrants in Germany: Jobcenter, Behorde, Arzt, work communication, and mini-courses.",
  alternates: {
    languages: {
      uk: "/?lang=ua",
      ru: "/?lang=ru"
    }
  },
  openGraph: {
    title: "Deutsch fur Leben | German for integration in Germany",
    description:
      "Practical German groups A1-B1 for migrants in Germany: Jobcenter, Behorde, Arzt, work communication, and mini-courses.",
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
    title: "Deutsch fur Leben | German for integration in Germany",
    description:
      "Practical German groups A1-B1 for migrants in Germany: Jobcenter, Behorde, Arzt, work communication, and mini-courses.",
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
