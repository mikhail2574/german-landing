import { NextResponse } from "next/server";
import { sendTelegramMessage } from "../../lib/telegram";

type ChecklistPayload = {
  email?: string;
  telegram?: string;
  locale?: string;
  sourceUrl?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ChecklistPayload;
    const email = (payload.email ?? "").trim();
    const telegram = (payload.telegram ?? "").trim();
    const locale = payload.locale ?? "uk";
    const sourceUrl = payload.sourceUrl ?? "";

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email is invalid" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const message = [
      "🧲 Lead Magnet: нова заявка",
      `Час: ${now}`,
      `Email: ${email}`,
      `Telegram: ${telegram || "—"}`,
      `Мова: ${locale}`,
      `Сторінка: ${sourceUrl || "—"}`,
    ].join("\n");

    await sendTelegramMessage(message);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("submit-checklist error:", error);
    return NextResponse.json({ error: "Failed to submit checklist" }, { status: 500 });
  }
}
