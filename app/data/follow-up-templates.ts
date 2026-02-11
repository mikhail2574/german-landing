import type { Locale } from "../types";

export type FollowUpTemplate = {
  id: string;
  day: string;
  channel: "email" | "telegram";
  subject: string;
  body: string;
};

export const followUpTemplates: Record<Locale, FollowUpTemplate[]> = {
  ua: [
    {
      id: "d0-checklist",
      day: "D0",
      channel: "email",
      subject: "Ваш чекліст + перший крок",
      body: "Надсилаємо чекліст і 3 фрази для першого дзвінка в Jobcenter."
    },
    {
      id: "d1-arzt",
      day: "D1",
      channel: "telegram",
      subject: "Міні-гайд для Arzt",
      body: "Короткий сценарій для запису до лікаря + CTA на групу."
    },
    {
      id: "d3-case",
      day: "D3",
      channel: "email",
      subject: "Кейс прогресу у Briefe/Telefon",
      body: "Описуємо шлях студента і пропонуємо підібрати ваш рівень."
    },
    {
      id: "d5-spots",
      day: "D5",
      channel: "telegram",
      subject: "Нагадування про старт потоку",
      body: "Нагадуємо дату старту і кількість місць, що залишилися."
    },
    {
      id: "d7-last-call",
      day: "D7",
      channel: "email",
      subject: "Фінальний follow-up",
      body: "Запитуємо готовність до групи A1/B1 і пропонуємо швидкий дзвінок."
    }
  ],
  ru: [
    {
      id: "d0-checklist",
      day: "D0",
      channel: "email",
      subject: "Ваш чеклист + первый шаг",
      body: "Отправляем чеклист и 3 фразы для первого звонка в Jobcenter."
    },
    {
      id: "d1-arzt",
      day: "D1",
      channel: "telegram",
      subject: "Мини-гайд для Arzt",
      body: "Короткий сценарий записи к врачу + CTA на группу."
    },
    {
      id: "d3-case",
      day: "D3",
      channel: "email",
      subject: "Кейс прогресса в Briefe/Telefon",
      body: "Показываем пример прогресса и предлагаем подобрать вашу группу."
    },
    {
      id: "d5-spots",
      day: "D5",
      channel: "telegram",
      subject: "Напоминание о старте потока",
      body: "Напоминаем дату старта и сколько мест еще доступно."
    },
    {
      id: "d7-last-call",
      day: "D7",
      channel: "email",
      subject: "Финальный follow-up",
      body: "Уточняем готовность к A1/B1 и предлагаем быстрый созвон."
    }
  ]
};
