import { NextResponse } from "next/server";
import { sendTelegramMessage } from "../../lib/telegram";

type ApplicationPayload = {
  name?: string;
  city?: string;
  email?: string;
  telegram?: string;
  level?: string;
  format?: string;
  time?: string;
  consent?: boolean;
  selectedAddonIds?: string[];
  selectedAddonLabels?: string[];
  locale?: string;
  sourceUrl?: string;
  utmData?: Record<string, string>;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatUtmData(utmData: Record<string, string> | undefined): string {
  if (!utmData || Object.keys(utmData).length === 0) {
    return "—";
  }

  return Object.entries(utmData)
    .map(([key, value]) => `${key}=${value}`)
    .join(", ");
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ApplicationPayload;
    const email = (payload.email ?? "").trim();
    const telegram = (payload.telegram ?? "").trim();

    if (!email && !telegram) {
      return NextResponse.json({ error: "Email or Telegram is required" }, { status: 400 });
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json({ error: "Email is invalid" }, { status: 400 });
    }

    if (!payload.consent) {
      return NextResponse.json({ error: "Consent is required" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const message = [
      "📝 Фінальна заявка: нова відправка",
      `Час: ${now}`,
      `Ім'я: ${(payload.name ?? "").trim() || "—"}`,
      `Місто: ${(payload.city ?? "").trim() || "—"}`,
      `Рівень: ${(payload.level ?? "").trim() || "—"}`,
      `Формат: ${(payload.format ?? "").trim() || "—"}`,
      `Час занять: ${(payload.time ?? "").trim() || "—"}`,
      `Email: ${email || "—"}`,
      `Telegram: ${telegram || "—"}`,
      `Add-ons IDs: ${(payload.selectedAddonIds ?? []).join(", ") || "—"}`,
      `Add-ons: ${(payload.selectedAddonLabels ?? []).join(" • ") || "—"}`,
      `UTM: ${formatUtmData(payload.utmData)}`,
      `Мова: ${payload.locale ?? "uk"}`,
      `Сторінка: ${payload.sourceUrl ?? "—"}`,
    ].join("\n");

    await sendTelegramMessage(message);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("submit-application error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
