type TelegramUpdatesResponse = {
  ok: boolean;
  result?: Array<{
    message?: { chat?: { id?: number | string } };
    channel_post?: { chat?: { id?: number | string } };
    edited_message?: { chat?: { id?: number | string } };
  }>;
  description?: string;
};

type TelegramSendResponse = {
  ok: boolean;
  description?: string;
};

let cachedChatId: string | null = null;

function getEnvOrThrow(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

async function resolveChatId(token: string): Promise<string> {
  if (cachedChatId) {
    return cachedChatId;
  }

  const fromEnv = process.env.TELEGRAM_CHAT_ID;
  if (fromEnv) {
    cachedChatId = fromEnv;
    return cachedChatId;
  }

  const updatesResponse = await fetch(`https://api.telegram.org/bot${token}/getUpdates`, {
    method: "GET",
    cache: "no-store",
  });

  if (!updatesResponse.ok) {
    throw new Error("Failed to get updates from Telegram API");
  }

  const updatesData = (await updatesResponse.json()) as TelegramUpdatesResponse;
  if (!updatesData.ok || !updatesData.result || updatesData.result.length === 0) {
    throw new Error("TELEGRAM_CHAT_ID is missing and no bot updates were found");
  }

  const updates = [...updatesData.result].reverse();
  for (const update of updates) {
    const chatId =
      update.message?.chat?.id ??
      update.channel_post?.chat?.id ??
      update.edited_message?.chat?.id;
    if (chatId !== undefined && chatId !== null) {
      cachedChatId = String(chatId);
      return cachedChatId;
    }
  }

  throw new Error("TELEGRAM_CHAT_ID is missing and chat id could not be resolved");
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = getEnvOrThrow("TELEGRAM_BOT_TOKEN");
  const chatId = await resolveChatId(token);
  const threadId = process.env.TELEGRAM_THREAD_ID;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      ...(threadId ? { message_thread_id: Number(threadId) } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send Telegram message");
  }

  const data = (await response.json()) as TelegramSendResponse;
  if (!data.ok) {
    throw new Error(data.description ?? "Telegram API returned not ok");
  }
}
