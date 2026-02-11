import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deutsch für Leben | Немецкий с нуля до B1 в Германии",
  description:
    "Практический курс немецкого языка для жизни, работы и интеграции в Германии с подготовкой к Deutsch-Test für Zuwanderer (B1)."
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
