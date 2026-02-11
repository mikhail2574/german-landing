"use client";

import Image from "next/image";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

type Locale = "ua" | "ru";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

type IconName =
  | "stress"
  | "letter"
  | "speak"
  | "goal"
  | "structure"
  | "voice"
  | "feedback"
  | "exam"
  | "users"
  | "clock"
  | "online"
  | "pin"
  | "doctor"
  | "office"
  | "job"
  | "daily"
  | "lid"
  | "pdf"
  | "phone"
  | "work"
  | "calendar"
  | "alarm";

const SEATS_LEFT = "4";
const START_DATE = "21.02";
const CONTACT_EMAIL = "info@deutschfuerleben.de";
const CONTACT_TELEGRAM = "@deutschfuerleben";

const localeMeta = {
  ua: {
    title: "Німецька для інтеграції в Німеччині | A1-B1, DTZ",
    description:
      "Онлайн-курс німецької для дорослих мігрантів у Німеччині: Arzt, Jobcenter, робота, листи, телефон. Старт A1 21.02, залишилось 4 місця.",
    ogLocale: "uk_UA"
  },
  ru: {
    title: "Немецкий для интеграции в Германии | A1-B1, DTZ",
    description:
      "Практический курс немецкого для взрослых мигрантов в Германии: Arzt, Jobcenter, работа, письма, телефон. Старт A1 21.02, осталось 4 места.",
    ogLocale: "ru_RU"
  }
} as const;

const copy = {
  ua: {
    announcement: {
      open: "Набір A1 відкрито",
      startLabel: "Старт:",
      seatsLabel: "Залишилось",
      seatsSuffix: "місць",
      alarmBadge: "Терміново",
      cta: "Записатися"
    },
    nav: {
      program: "Програма",
      mini: "Міні-курси",
      format: "Формат",
      faq: "FAQ",
      contacts: "Контакти",
      apply: "Залишити заявку"
    },
    hero: {
      badge: "Приватна школа німецької в Німеччині",
      title: "Важко з інтеграцією без мови? Виведіть німецьку з нуля до B1 для життя, роботи та DTZ",
      subtitle:
        "Відпрацьовуємо реальні ситуації: Arzt, Jobcenter, Arbeit, Briefe, Telefon, щоб ви впевнено діяли щодня в Німеччині.",
      primaryCta: "Записатися на найближчу групу",
      secondaryCta: "Отримати безкоштовний чекліст",
      scarcityBadge: "Залишилось 4 місця",
      supportPills: ["Онлайн по Німеччині", "Офлайн Leipzig"],
      enrollCard: {
        title: "Найближчий набір",
        start: "Дата старту",
        seats: "Місця в групі",
        alert: "A1 · Старт 21.02 · Залишилось 4 місця",
        schedule: "Графік",
        scheduleValue: "3 рази на тиждень · 1,5 години",
        notes: ["Спокійний темп", "Невеликі групи", "Підготовка до DTZ"]
      }
    },
    lead: {
      label: "Безкоштовний матеріал",
      title: "Безкоштовно: чекліст для життя в Німеччині",
      subtitle: "50 фраз для Jobcenter + шаблон листа + типові відповіді",
      pdfName: "checklist-jobcenter-dfl.pdf",
      email: "E-Mail",
      telegram: "Telegram",
      button: "Отримати чекліст",
      privacy: "Без спаму. Лише відправка чекліста та одне уточнення.",
      success: "Чекліст майже у вас. Надішлемо посилання протягом 24 годин.",
      successCta: "Хочете в групу? Залишилось 4 місця -> Записатися",
      error: "Вкажіть E-Mail.",
      invalidEmail: "Вкажіть коректний E-Mail."
    },
    problem: {
      label: "Реальні труднощі",
      title: "Що заважає говорити впевнено після курсів",
      subtitle: "Ми працюємо з конкретними ситуаціями, а не лише з теорією.",
      cards: [
        {
          icon: "stress" as IconName,
          title: "Стрес у повсякденних розмовах",
          text: "Слова знаєте, але в реальному діалозі важко швидко зреагувати."
        },
        {
          icon: "letter" as IconName,
          title: "Листи та форми лякають",
          text: "Повідомлення від Jobcenter або Behörden часто незрозумілі без підтримки."
        },
        {
          icon: "speak" as IconName,
          title: "Складно говорити телефоном",
          text: "Запис на Termin чи дзвінок в установу викликає напругу."
        },
        {
          icon: "goal" as IconName,
          title: "B1 і DTZ здаються далекими",
          text: "Без маршруту до екзамену легко втратити темп і мотивацію."
        }
      ]
    },
    solution: {
      label: "Що змінюється",
      title: "Курс допомагає говорити в Alltag, Arbeit і при інтеграції",
      cards: [
        {
          icon: "structure" as IconName,
          title: "Чіткий шлях A1 → A2 → B1",
          text: "Ви бачите наступний крок і не втрачаєте орієнтир."
        },
        {
          icon: "voice" as IconName,
          title: "Багато мовної практики",
          text: "Діалоги й сценарії, які потрібні саме в Німеччині."
        },
        {
          icon: "feedback" as IconName,
          title: "Зворотний зв’язок у малій групі",
          text: "Помилки розбираються одразу, без накопичення прогалин."
        },
        {
          icon: "exam" as IconName,
          title: "Підготовка до DTZ і LiD",
          text: "Системний формат, структура завдань і спокій перед тестом."
        }
      ]
    },
    examples: {
      label: "Реальні сценарії",
      title: "Що саме ви тренуєте на заняттях",
      items: [
        {
          icon: "phone" as IconName,
          title: "Дзвінок у Jobcenter",
          text: "«Добрий день, хочу перенести Termin. Які Unterlagen потрібно взяти?»"
        },
        {
          icon: "doctor" as IconName,
          title: "Запис до лікаря",
          text: "«Біль триває три дні, болить горло та температура. Є вільний термін?»"
        },
        {
          icon: "work" as IconName,
          title: "Розмова на роботі",
          text: "«Підтвердіть, будь ласка, задачу і дедлайн. Чи можна уточнити деталі?»"
        }
      ]
    },
    program: {
      label: "Основна програма",
      title: "Покроковий шлях до DTZ (B1)",
      subtitle: "Три етапи, які дають конкретний результат у щоденному житті.",
      total: "~6–7 місяців",
      cards: [
        {
          step: "Крок 1",
          level: "A1",
          duration: "7 тижнів",
          ribbon: "Йде набір · Старт 21.02 · Залишилось 4 місця",
          outcomes: [
            "представитися та пояснити прості потреби",
            "записатися на Termin телефоном за простим сценарієм",
            "вести короткі діалоги в магазині, аптеці, транспорті",
            "заповнювати прості форми та анкети"
          ]
        },
        {
          step: "Крок 2",
          level: "A2",
          duration: "2 рівні по 7 тижнів",
          ribbon: "",
          outcomes: [
            "уточнювати інформацію в Jobcenter і Behörden",
            "читати листи та відповідати за простим шаблоном",
            "обговорювати задачі на роботі і ставити уточнювальні питання",
            "переносити Termin і домовлятися про новий час"
          ]
        },
        {
          step: "Крок 3",
          level: "B1 (DTZ)",
          duration: "7 тижнів",
          ribbon: "",
          outcomes: [
            "виконувати типові завдання DTZ зі стратегією часу",
            "писати структурований текст для екзамену",
            "проходити усну частину без паніки за шаблонами відповідей",
            "уникати типових помилок завдяки тренувальним розборам"
          ]
        }
      ]
    },
    mini: {
      label: "Практичні міні-курси",
      title: "Короткі модулі 3–3,5 тижні під конкретну задачу",
      prev: "Назад",
      next: "Вперед",
      courses: [
        {
          icon: "doctor" as IconName,
          title: "Німецька у лікаря / в лікарні",
          purpose: "Для запису, опису симптомів і питань до лікаря.",
          result: "Спокійна комунікація в медичних ситуаціях.",
          format: "Рольові діалоги та типові сценарії прийому.",
          duration: "3–3,5 тижні"
        },
        {
          icon: "office" as IconName,
          title: "Німецька для Jobcenter і Behörden",
          purpose: "Для листів, термінів і пояснення своєї ситуації.",
          result: "Впевненість у спілкуванні з установами.",
          format: "Розбір документів і готові мовні шаблони.",
          duration: "3–3,5 тижні"
        },
        {
          icon: "job" as IconName,
          title: "Німецька для роботи та співбесід",
          purpose: "Для самопрезентації та уточнення робочих задач.",
          result: "Чіткі відповіді на співбесіді та в команді.",
          format: "Сценарії співбесіди та робочі діалоги.",
          duration: "3–3,5 тижні"
        },
        {
          icon: "daily" as IconName,
          title: "Німецька для повсякденного спілкування",
          purpose: "Для щоденних ситуацій у місті, школі та сервісах.",
          result: "Більш природна мова в Alltag.",
          format: "Короткі діалоги і тренування швидкої реакції.",
          duration: "3–3,5 тижні"
        },
        {
          icon: "lid" as IconName,
          title: "Leben in Deutschland (LiD) — підготовка",
          purpose: "Для орієнтаційного та інтеграційного тесту LiD.",
          result: "Розуміння структури тем і впевненість перед тестом.",
          format: "Тренувальні питання, логіка відповідей, розбір тем.",
          duration: "3–3,5 тижні"
        }
      ]
    },
    visuals: {
      label: "Атмосфера навчання",
      title: "Спокійний, структурний формат без зайвого тиску",
      cards: [
        {
          title: "Leipzig: міський ритм",
          text: "Навчальні сценарії базуються на реальних ситуаціях міського життя."
        },
        {
          title: "Практика в малих групах",
          text: "Більше часу на мовлення, запитання та персональний зворотний зв’язок."
        }
      ]
    },
    format: {
      label: "Формат",
      title: "Як проходять заняття",
      items: [
        { icon: "users" as IconName, title: "Невеликі групи", text: "Більше практики для кожного учасника." },
        { icon: "clock" as IconName, title: "3 заняття на тиждень", text: "Стабільний темп без перевантаження." },
        { icon: "clock" as IconName, title: "1,5 години", text: "Оптимальна тривалість одного уроку." },
        { icon: "online" as IconName, title: "Онлайн по Німеччині", text: "Можна навчатися з будь-якого міста." },
        { icon: "pin" as IconName, title: "Офлайн Leipzig", text: "Очні групи для локальних учасників." }
      ]
    },
    founder: {
      label: "Хто веде курс",
      title: "Практичний підхід на основі особистого досвіду",
      text:
        "Курс створено іммігрантом, який сам пройшов шлях від нуля до офіційних іспитів у Німеччині. Без завищених обіцянок: тільки послідовна практика для Alltag, Arbeit і Integration.",
      signals: [
        "Фокус на підготовці до DTZ (B1)",
        "Окремий модуль для LiD",
        "Відповідаємо протягом 24 годин"
      ]
    },
    faq: {
      label: "FAQ",
      title: "Часті запитання перед стартом",
      items: [
        {
          q: "Яка вартість і як проходить оплата?",
          a: "Після заявки надсилаємо актуальну вартість за рівнем і форматом, без зобов’язань."
        },
        {
          q: "Є онлайн та офлайн формати?",
          a: "Так, онлайн — по всій Німеччині, офлайн — у Leipzig."
        },
        {
          q: "Що робити, якщо пропустив(ла) заняття?",
          a: "Надаємо матеріали та короткий план, щоб повернутися в темп."
        },
        {
          q: "Чи підходить курс, якщо я з нуля?",
          a: "Так, рівень A1 повністю розрахований на старт без бази."
        },
        {
          q: "Чим відрізняється від VHS?",
          a: "Малі групи, більше мовної практики та фокус на реальних сценаріях."
        },
        {
          q: "Є домашні завдання й матеріали?",
          a: "Так, даємо регулярні завдання, шаблони та робочі матеріали."
        },
        {
          q: "Скільки часу потрібно поза заняттями?",
          a: "Орієнтовно 20–40 хвилин у дні без уроку."
        },
        {
          q: "Коли найближчий старт?",
          a: "Найближчі дати старту повідомляємо після заявки."
        }
      ]
    },
    contacts: {
      label: "Контакти",
      title: "Швидкий зв’язок із командою",
      text: "Пишіть у зручний канал, відповідаємо без затримок.",
      email: "E-Mail",
      telegram: "Telegram",
      city: "Місто",
      response: "Час відповіді",
      cityValue: "Leipzig",
      responseValue: "Відповімо протягом 24 годин"
    },
    form: {
      quickLabel: "Швидкий вибір перед заявкою",
      quickTitle: "Оберіть рівень, формат і зручний час",
      level: "Рівень",
      format: "Формат",
      time: "Зручний час",
      city: "Місто (необов'язково)",
      cityPlaceholder: "Наприклад, Leipzig",
      levelOptions: [
        { id: "a1", label: "A1" },
        { id: "a2", label: "A2" },
        { id: "b1", label: "B1 (DTZ)" },
        { id: "mini", label: "Міні-курс" }
      ],
      formatOptions: [
        { id: "online", label: "Онлайн" },
        { id: "offline", label: "Офлайн (Leipzig)" }
      ],
      timeOptions: [
        { id: "morning", label: "Ранок" },
        { id: "evening", label: "Вечір" }
      ],
      title: "Залиште заявку — без зобов’язань",
      subtitle: "Ми зв’яжемося і підберемо групу під ваш рівень та графік.",
      microcopy: "Без зобов'язань • Відповімо протягом 24 годин",
      nextStep: "Після заявки ви отримаєте програму, дату старту і рекомендацію за рівнем.",
      fields: {
        telegram: "Telegram",
        email: "E-Mail"
      },
      placeholders: {
        telegram: "@username",
        email: "name@example.com"
      },
      privacy: "Ми використовуємо дані лише для відповіді на заявку та підбору групи.",
      consentPrefix: "Я погоджуюся з",
      consentLink: "Datenschutzerklärung",
      consentLinkImpressum: "Impressum",
      contactHint: "Вкажіть Telegram або E-Mail, щоб ми могли зв'язатися з вами.",
      contactError: "Вкажіть Telegram або E-Mail.",
      invalidEmail: "Вкажіть коректний E-Mail.",
      consentError: "Потрібна згода з Datenschutzerklärung та Impressum.",
      successTitle: "Заявку прийнято",
      successText: "Протягом 24 годин надішлемо варіанти груп і підтвердимо найближчий старт.",
      successCta: "Написати одразу в Telegram",
      submit: "Залишити заявку"
    },
    footer: {
      disclaimer:
        "Незалежний приватний курс. Не пов'язаний з Jobcenter, BAMF або державними інтеграційними програмами.",
      links: {
        impressum: "Impressum",
        privacy: "Datenschutzerklärung",
        contact: "Kontakt"
      },
      contactLine:
        "E-Mail: info@deutschfuerleben.de · Telegram: @deutschfuerleben · Leipzig · Відповімо протягом 24 годин"
    }
  },
  ru: {
    announcement: {
      open: "Набор A1 открыт",
      startLabel: "Старт:",
      seatsLabel: "Осталось",
      seatsSuffix: "мест",
      alarmBadge: "Срочно",
      cta: "Записаться"
    },
    nav: {
      program: "Программа",
      mini: "Мини-курсы",
      format: "Формат",
      faq: "FAQ",
      contacts: "Контакты",
      apply: "Оставить заявку"
    },
    hero: {
      badge: "Частная школа немецкого в Германии",
      title: "Тяжело с интеграцией без языка? Доведите немецкий с нуля до B1 для жизни, работы и DTZ",
      subtitle:
        "Тренируем конкретные ситуации: Arzt, Jobcenter, Arbeit, Briefe, Telefon, чтобы вы уверенно действовали в Германии каждый день.",
      primaryCta: "Записаться на ближайшую группу",
      secondaryCta: "Получить бесплатный чеклист",
      scarcityBadge: "Осталось 4 места",
      supportPills: ["Онлайн по Германии", "Офлайн Leipzig"],
      enrollCard: {
        title: "Ближайший набор",
        start: "Дата старта",
        seats: "Места в группе",
        alert: "A1 · Старт 21.02 · Осталось 4 места",
        schedule: "Расписание",
        scheduleValue: "3 раза в неделю · 1,5 часа",
        notes: ["Спокойный темп", "Небольшие группы", "Подготовка к DTZ"]
      }
    },
    lead: {
      label: "Бесплатный материал",
      title: "Бесплатно: чеклист для жизни в Германии",
      subtitle: "50 фраз для Jobcenter + шаблон письма + типовые ответы",
      pdfName: "checklist-jobcenter-dfl.pdf",
      email: "E-Mail",
      telegram: "Telegram",
      button: "Получить чеклист",
      privacy: "Без спама. Только для отправки чеклиста и одного уточнения.",
      success: "Чеклист почти у вас. Отправим ссылку в течение 24 часов.",
      successCta: "Хотите в группу? Осталось 4 места -> Записаться",
      error: "Укажите E-Mail.",
      invalidEmail: "Укажите корректный E-Mail."
    },
    problem: {
      label: "Реальные сложности",
      title: "Что мешает говорить уверенно после курсов",
      subtitle: "Мы работаем с конкретными ситуациями, а не только с теорией.",
      cards: [
        {
          icon: "stress" as IconName,
          title: "Стресс в ежедневных диалогах",
          text: "Слова есть, но в реальном разговоре сложно быстро реагировать."
        },
        {
          icon: "letter" as IconName,
          title: "Письма и формы пугают",
          text: "Сообщения от Jobcenter и Behörden часто непонятны без поддержки."
        },
        {
          icon: "speak" as IconName,
          title: "Трудно говорить по телефону",
          text: "Запись на Termin или звонок в ведомство вызывает напряжение."
        },
        {
          icon: "goal" as IconName,
          title: "B1 и DTZ кажутся далекими",
          text: "Без маршрута до экзамена легко потерять темп и мотивацию."
        }
      ]
    },
    solution: {
      label: "Что меняется",
      title: "Курс помогает говорить в Alltag, Arbeit и при интеграции",
      cards: [
        {
          icon: "structure" as IconName,
          title: "Четкий путь A1 → A2 → B1",
          text: "Вы видите следующий шаг и не теряете ориентир."
        },
        {
          icon: "voice" as IconName,
          title: "Много языковой практики",
          text: "Диалоги и сценарии, которые действительно нужны в Германии."
        },
        {
          icon: "feedback" as IconName,
          title: "Обратная связь в малой группе",
          text: "Ошибки разбираем сразу, без накопления пробелов."
        },
        {
          icon: "exam" as IconName,
          title: "Подготовка к DTZ и LiD",
          text: "Системный формат, структура заданий и спокойствие перед тестом."
        }
      ]
    },
    examples: {
      label: "Реальные сценарии",
      title: "Что именно вы тренируете на занятиях",
      items: [
        {
          icon: "phone" as IconName,
          title: "Звонок в Jobcenter",
          text: "«Здравствуйте, хочу перенести Termin. Какие Unterlagen нужно принести?»"
        },
        {
          icon: "doctor" as IconName,
          title: "Запись к врачу",
          text: "«Боль длится три дня, болит горло и температура. Есть свободный термин?»"
        },
        {
          icon: "work" as IconName,
          title: "Разговор на работе",
          text: "«Подтвердите, пожалуйста, задачу и дедлайн. Можно уточнить детали?»"
        }
      ]
    },
    program: {
      label: "Основная программа",
      title: "Пошаговый путь к DTZ (B1)",
      subtitle: "Три этапа, которые дают конкретный результат в реальной жизни.",
      total: "~6–7 месяцев",
      cards: [
        {
          step: "Шаг 1",
          level: "A1",
          duration: "7 недель",
          ribbon: "Идет набор · Старт 21.02 · Осталось 4 места",
          outcomes: [
            "представиться и объяснить простые потребности",
            "записаться на Termin по телефону по простому сценарию",
            "вести короткие диалоги в магазине, аптеке, транспорте",
            "заполнять простые формы и анкеты"
          ]
        },
        {
          step: "Шаг 2",
          level: "A2",
          duration: "2 уровня по 7 недель",
          ribbon: "",
          outcomes: [
            "уточнять информацию в Jobcenter и Behörden",
            "читать письма и отвечать по простому шаблону",
            "обсуждать задачи на работе и задавать уточняющие вопросы",
            "переносить Termin и согласовывать новое время"
          ]
        },
        {
          step: "Шаг 3",
          level: "B1 (DTZ)",
          duration: "7 недель",
          ribbon: "",
          outcomes: [
            "выполнять типовые задания DTZ со стратегией времени",
            "писать структурированный текст для экзамена",
            "проходить устную часть без паники по шаблонам ответов",
            "избегать типовых ошибок благодаря тренировочным разборам"
          ]
        }
      ]
    },
    mini: {
      label: "Практические мини-курсы",
      title: "Короткие модули 3–3,5 недели под конкретную задачу",
      prev: "Назад",
      next: "Вперёд",
      courses: [
        {
          icon: "doctor" as IconName,
          title: "Немецкий у врача / в больнице",
          purpose: "Для записи, описания симптомов и вопросов к врачу.",
          result: "Спокойная коммуникация в медицинских ситуациях.",
          format: "Ролевые диалоги и типовые сценарии приема.",
          duration: "3–3,5 недели"
        },
        {
          icon: "office" as IconName,
          title: "Немецкий для Jobcenter и Behörden",
          purpose: "Для писем, терминов и объяснения своей ситуации.",
          result: "Уверенность в общении с ведомствами.",
          format: "Разбор документов и готовые речевые шаблоны.",
          duration: "3–3,5 недели"
        },
        {
          icon: "job" as IconName,
          title: "Немецкий для работы и собеседований",
          purpose: "Для самопрезентации и уточнения рабочих задач.",
          result: "Четкие ответы на интервью и в команде.",
          format: "Сценарии собеседований и рабочие диалоги.",
          duration: "3–3,5 недели"
        },
        {
          icon: "daily" as IconName,
          title: "Немецкий для повседневного общения",
          purpose: "Для ежедневных ситуаций в городе, школе и сервисах.",
          result: "Более естественная речь в Alltag.",
          format: "Короткие диалоги и тренировка быстрой реакции.",
          duration: "3–3,5 недели"
        },
        {
          icon: "lid" as IconName,
          title: "Leben in Deutschland (LiD) — подготовка",
          purpose: "Для ориентационного и интеграционного теста LiD.",
          result: "Понимание структуры тем и уверенность перед тестом.",
          format: "Тренировочные вопросы, логика ответов, разбор тем.",
          duration: "3–3,5 недели"
        }
      ]
    },
    visuals: {
      label: "Атмосфера обучения",
      title: "Спокойный и структурный формат без лишнего давления",
      cards: [
        {
          title: "Leipzig: ритм города",
          text: "Учебные сценарии основаны на реальных ситуациях городской жизни."
        },
        {
          title: "Практика в малых группах",
          text: "Больше времени на речь, вопросы и персональную обратную связь."
        }
      ]
    },
    format: {
      label: "Формат",
      title: "Как проходят занятия",
      items: [
        { icon: "users" as IconName, title: "Небольшие группы", text: "Больше практики для каждого участника." },
        { icon: "clock" as IconName, title: "3 занятия в неделю", text: "Стабильный ритм без перегруза." },
        { icon: "clock" as IconName, title: "1,5 часа", text: "Оптимальная длительность одного урока." },
        { icon: "online" as IconName, title: "Онлайн по Германии", text: "Можно учиться из любого города." },
        { icon: "pin" as IconName, title: "Офлайн Leipzig", text: "Очные группы для локальных участников." }
      ]
    },
    founder: {
      label: "Кто ведет курс",
      title: "Практический подход на основе личного опыта",
      text:
        "Курс создан иммигрантом, который сам прошел путь от нуля до официальных экзаменов в Германии. Без завышенных обещаний: только последовательная практика для Alltag, Arbeit и Integration.",
      signals: ["Фокус на подготовке к DTZ (B1)", "Отдельный модуль LiD", "Ответим в течение 24 часов"]
    },
    faq: {
      label: "FAQ",
      title: "Частые вопросы перед стартом",
      items: [
        {
          q: "Какая стоимость и как проходит оплата?",
          a: "После заявки отправляем актуальную стоимость по уровню и формату, без обязательств."
        },
        {
          q: "Есть онлайн и офлайн форматы?",
          a: "Да, онлайн — по всей Германии, офлайн — в Leipzig."
        },
        {
          q: "Что делать, если пропустил(а) занятие?",
          a: "Даем материалы и короткий план, чтобы вернуться в темп."
        },
        {
          q: "Подходит ли курс, если я с нуля?",
          a: "Да, уровень A1 полностью рассчитан на старт без базы."
        },
        {
          q: "Чем отличается от VHS?",
          a: "Малые группы, больше языковой практики и фокус на реальных сценариях."
        },
        {
          q: "Есть домашние задания и материалы?",
          a: "Да, даем регулярные задания, шаблоны и рабочие материалы."
        },
        {
          q: "Сколько времени нужно вне занятий?",
          a: "Ориентировочно 20–40 минут в дни без урока."
        },
        {
          q: "Когда ближайший старт?",
          a: "Ближайшие даты старта сообщаем после заявки."
        }
      ]
    },
    contacts: {
      label: "Контакты",
      title: "Быстрая связь с командой",
      text: "Пишите в удобный канал, отвечаем без задержек.",
      email: "E-Mail",
      telegram: "Telegram",
      city: "Город",
      response: "Время ответа",
      cityValue: "Leipzig",
      responseValue: "Ответим в течение 24 часов"
    },
    form: {
      quickLabel: "Быстрый выбор перед заявкой",
      quickTitle: "Выберите уровень, формат и удобное время",
      level: "Уровень",
      format: "Формат",
      time: "Удобное время",
      city: "Город (необязательно)",
      cityPlaceholder: "Например, Leipzig",
      levelOptions: [
        { id: "a1", label: "A1" },
        { id: "a2", label: "A2" },
        { id: "b1", label: "B1 (DTZ)" },
        { id: "mini", label: "Мини-курс" }
      ],
      formatOptions: [
        { id: "online", label: "Онлайн" },
        { id: "offline", label: "Офлайн (Leipzig)" }
      ],
      timeOptions: [
        { id: "morning", label: "Утро" },
        { id: "evening", label: "Вечер" }
      ],
      title: "Оставьте заявку — без обязательств",
      subtitle: "Мы свяжемся и подберем группу под ваш уровень и график.",
      microcopy: "Без обязательств • Ответим в течение 24 часов",
      nextStep: "После заявки вы получите программу, дату старта и рекомендацию по уровню.",
      fields: {
        telegram: "Telegram",
        email: "E-Mail"
      },
      placeholders: {
        telegram: "@username",
        email: "name@example.com"
      },
      privacy: "Мы используем данные только для обратной связи и подбора группы.",
      consentPrefix: "Я соглашаюсь с",
      consentLink: "Datenschutzerklärung",
      consentLinkImpressum: "Impressum",
      contactHint: "Укажите Telegram или E-Mail, чтобы мы могли связаться с вами.",
      contactError: "Укажите Telegram или E-Mail.",
      invalidEmail: "Укажите корректный E-Mail.",
      consentError: "Нужно согласие с Datenschutzerklärung и Impressum.",
      successTitle: "Заявка отправлена",
      successText: "В течение 24 часов отправим варианты групп и подтвердим ближайший старт.",
      successCta: "Написать сразу в Telegram",
      submit: "Оставить заявку"
    },
    footer: {
      disclaimer:
        "Независимый частный курс. Не связан с Jobcenter, BAMF или государственными интеграционными программами.",
      links: {
        impressum: "Impressum",
        privacy: "Datenschutzerklärung",
        contact: "Kontakt"
      },
      contactLine: "E-Mail: info@deutschfuerleben.de · Telegram: @deutschfuerleben · Leipzig · Ответим в течение 24 часов"
    }
  }
} as const;

function LineIcon({
  children,
  className = "h-5 w-5"
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function renderIcon(name: IconName, className = "h-5 w-5") {
  switch (name) {
    case "stress":
      return (
        <LineIcon className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 10h.01M15 10h.01M8 15c1.1-1 2.2-1.5 4-1.5S14.9 14 16 15" />
        </LineIcon>
      );
    case "letter":
      return (
        <LineIcon className={className}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </LineIcon>
      );
    case "speak":
      return (
        <LineIcon className={className}>
          <path d="M4 14a6 6 0 0 1 6-6h1" />
          <path d="M14 4v16l4-3h2V7h-2z" />
        </LineIcon>
      );
    case "goal":
      return (
        <LineIcon className={className}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="m16 8 5-5" />
        </LineIcon>
      );
    case "structure":
      return (
        <LineIcon className={className}>
          <rect x="3" y="4" width="7" height="7" rx="1.5" />
          <rect x="14" y="4" width="7" height="7" rx="1.5" />
          <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
          <path d="M10 8h4M12 11v3" />
        </LineIcon>
      );
    case "voice":
      return (
        <LineIcon className={className}>
          <path d="M12 3v12" />
          <rect x="9" y="3" width="6" height="10" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" />
        </LineIcon>
      );
    case "feedback":
      return (
        <LineIcon className={className}>
          <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 8h8M8 12h5" />
        </LineIcon>
      );
    case "exam":
      return (
        <LineIcon className={className}>
          <path d="M6 3h9l3 3v15H6z" />
          <path d="M15 3v4h4M9 12h6M9 16h4" />
        </LineIcon>
      );
    case "users":
      return (
        <LineIcon className={className}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </LineIcon>
      );
    case "clock":
      return (
        <LineIcon className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </LineIcon>
      );
    case "online":
      return (
        <LineIcon className={className}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M7 9h10" />
        </LineIcon>
      );
    case "pin":
      return (
        <LineIcon className={className}>
          <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </LineIcon>
      );
    case "doctor":
      return (
        <LineIcon className={className}>
          <path d="M8 3v5a4 4 0 0 0 8 0V3" />
          <path d="M12 12v9M8 16h8" />
        </LineIcon>
      );
    case "office":
      return (
        <LineIcon className={className}>
          <rect x="3" y="8" width="18" height="12" rx="2" />
          <path d="M7 8V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3M3 13h18" />
        </LineIcon>
      );
    case "job":
      return (
        <LineIcon className={className}>
          <path d="M4 7h16v13H4z" />
          <path d="M9 7V5a3 3 0 0 1 6 0v2M4 13h16" />
        </LineIcon>
      );
    case "daily":
      return (
        <LineIcon className={className}>
          <path d="M4 5h16v10H8l-4 4z" />
          <path d="M8 9h8M8 12h6" />
        </LineIcon>
      );
    case "lid":
      return (
        <LineIcon className={className}>
          <path d="M4 5h16v14H4z" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </LineIcon>
      );
    case "pdf":
      return (
        <LineIcon className={className}>
          <path d="M6 2h9l5 5v15H6z" />
          <path d="M15 2v5h5M8 14h8M8 18h5" />
        </LineIcon>
      );
    case "phone":
      return (
        <LineIcon className={className}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.9 19.9 0 0 1-8.7-3.1 19.5 19.5 0 0 1-6-6A19.9 19.9 0 0 1 2 4.1 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7 12.9 12.9 0 0 0 .7 2.8 2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.39-1.25a2 2 0 0 1 2.11-.45 12.9 12.9 0 0 0 2.8.7A2 2 0 0 1 22 16.9z" />
        </LineIcon>
      );
    case "work":
      return (
        <LineIcon className={className}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M8 21h8M12 18v3M8 10h8M8 14h5" />
        </LineIcon>
      );
    case "calendar":
      return (
        <LineIcon className={className}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M8 2v4M16 2v4M3 10h18M8 14h4" />
        </LineIcon>
      );
    case "alarm":
      return (
        <LineIcon className={className}>
          <path d="M18.5 7.5 21 5M3 5l2.5 2.5M12 21a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
          <path d="M12 10v4M12 17h.01" />
        </LineIcon>
      );
  }
}

function SectionHeader({
  label,
  title,
  subtitle,
  light = false
}: {
  label: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-[70ch]">
      <p className={`text-xs font-bold uppercase tracking-[0.16em] ${light ? "text-blue-200" : "text-blue-700"}`}>
        {label}
      </p>
      <h2 className={`mt-3 text-3xl leading-tight md:text-4xl ${light ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {subtitle ? <p className={`mt-4 text-lg ${light ? "text-blue-100" : "text-slate-600"}`}>{subtitle}</p> : null}
    </div>
  );
}

function OptionGroup({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: ReadonlyArray<{ id: string; label: string }>;
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-white/95">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                isActive
                  ? "border-white bg-white text-blue-900"
                  : "border-white/40 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
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
  const [level, setLevel] = useState("a1");
  const [format, setFormat] = useState("online");
  const [time, setTime] = useState("morning");
  const [city, setCity] = useState("");

  const [leadEmail, setLeadEmail] = useState("");
  const [leadTelegram, setLeadTelegram] = useState("");
  const [leadError, setLeadError] = useState("");
  const [leadSuccess, setLeadSuccess] = useState(false);

  const [appEmail, setAppEmail] = useState("");
  const [appTelegram, setAppTelegram] = useState("");
  const [appConsent, setAppConsent] = useState(false);
  const [appError, setAppError] = useState("");
  const [appSuccess, setAppSuccess] = useState(false);

  const [cardsPerView, setCardsPerView] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const t = copy[locale];
  const maxCarouselIndex = Math.max(0, t.mini.courses.length - cardsPerView);
  const dots = useMemo(() => Array.from({ length: maxCarouselIndex + 1 }, (_, idx) => idx), [maxCarouselIndex]);

  useEffect(() => {
    document.documentElement.lang = locale === "ua" ? "uk" : "ru";
    setCarouselIndex(0);
  }, [locale]);

  useEffect(() => {
    const meta = localeMeta[locale];
    document.title = meta.title;

    const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
      const selector = `meta[${attr}="${key}"]`;
      const existing = document.head.querySelector(selector);
      if (existing) {
        existing.setAttribute("content", content);
        return;
      }

      const tag = document.createElement("meta");
      tag.setAttribute(attr, key);
      tag.setAttribute("content", content);
      document.head.append(tag);
    };

    upsertMeta("name", "description", meta.description);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:locale", meta.ogLocale);
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
  }, [locale]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setCarouselIndex((prev) => Math.min(prev, maxCarouselIndex));
  }, [maxCarouselIndex]);

  const goToSlide = (index: number) => {
    setCarouselIndex(Math.max(0, Math.min(index, maxCarouselIndex)));
  };

  const handleLeadSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = leadEmail.trim();

    if (!email) {
      setLeadError(t.lead.error);
      setLeadSuccess(false);
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      setLeadError(t.lead.invalidEmail);
      setLeadSuccess(false);
      return;
    }

    setLeadError("");
    setLeadSuccess(true);
    setLeadEmail("");
    setLeadTelegram("");
    trackEvent("lead_checklist_submit", {
      locale,
      hasTelegram: Boolean(leadTelegram.trim()),
      source: "checklist"
    });
  };

  const handleApplicationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = appEmail.trim();
    const telegram = appTelegram.trim();

    if (!email && !telegram) {
      setAppError(t.form.contactError);
      setAppSuccess(false);
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAppError(t.form.invalidEmail);
      setAppSuccess(false);
      return;
    }

    if (!appConsent) {
      setAppError(t.form.consentError);
      setAppSuccess(false);
      return;
    }

    setAppError("");
    setAppSuccess(true);
    setAppEmail("");
    setAppTelegram("");
    setAppConsent(false);

    trackEvent("lead_application_submit", {
      locale,
      level: levelLabel,
      format: formatLabel,
      time: timeLabel,
      city,
      hasEmail: Boolean(email),
      hasTelegram: Boolean(telegram),
      source: "application"
    });
  };

  const levelLabel = t.form.levelOptions.find((item) => item.id === level)?.label ?? "";
  const formatLabel = t.form.formatOptions.find((item) => item.id === format)?.label ?? "";
  const timeLabel = t.form.timeOptions.find((item) => item.id === time)?.label ?? "";
  const seatsText = SEATS_LEFT ? `${t.announcement.seatsLabel} ${SEATS_LEFT} ${t.announcement.seatsSuffix}` : null;

  return (
    <main className="relative isolate overflow-x-clip pb-24 md:pb-16">
      <div className="pointer-events-none absolute -top-32 right-[-200px] h-[520px] w-[520px] rounded-full bg-blue-300/40 blur-3xl" />
      <div className="pointer-events-none absolute left-[-220px] top-[260px] h-[460px] w-[460px] rounded-full bg-sky-200/40 blur-3xl" />

      <div className="sticky top-0 z-[80] border-b border-blue-300/30 bg-gradient-to-r from-[#0b2c72] via-[#1346ae] to-[#1f79e0] text-white shadow-lg shadow-blue-500/20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm sm:px-8 lg:px-10">
          <p className="font-semibold">
            {t.announcement.open} · {t.announcement.startLabel} {START_DATE}
            {seatsText ? ` · ${seatsText}` : ""}
          </p>
          <a href="#application" className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-blue-900 transition hover:bg-blue-50">
            {t.announcement.cta}
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
                <p className="text-sm font-bold text-slate-900">Deutsch für Leben</p>
              </div>

              <div className="order-3 flex w-full items-center gap-2 overflow-x-auto pb-1 md:order-2 md:w-auto md:justify-center md:pb-0">
                <a href="#program" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  {t.nav.program}
                </a>
                <a href="#mini-courses" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  {t.nav.mini}
                </a>
                <a href="#format" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  {t.nav.format}
                </a>
                <a href="#faq" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  {t.nav.faq}
                </a>
                <a href="#contacts" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  {t.nav.contacts}
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
                <a href="#application" className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                  {t.nav.apply}
                </a>
              </div>
            </div>
          </nav>

          <section className="mt-6 grid gap-6 rounded-[2rem] border border-blue-100 bg-white/[0.88] p-6 shadow-2xl shadow-blue-200/[0.42] backdrop-blur md:grid-cols-[1.15fr_0.85fr] md:p-10">
            <div>
              <p className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-blue-700 ring-1 ring-blue-100">
                {t.hero.badge}
              </p>
              <h1 className="mt-6 max-w-[22ch] text-4xl leading-tight text-slate-950 md:text-5xl md:leading-[1.08]">{t.hero.title}</h1>
              <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-slate-600 md:text-xl">{t.hero.subtitle}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a href="#application" className="rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 px-7 py-3 text-sm font-semibold text-white transition hover:from-blue-800 hover:to-sky-600">
                  {t.hero.primaryCta}
                </a>
                <a href="#checklist" className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50">
                  {t.hero.secondaryCta}
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {t.hero.supportPills.map((pill) => (
                  <span key={pill} className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs text-slate-600">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-3xl bg-gradient-to-br from-[#0b2970] via-[#1347b5] to-[#2f90ff] p-6 text-white shadow-xl shadow-blue-400/35">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-100">{t.hero.enrollCard.title}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/30 bg-white/10 p-3">
                  <p className="text-xs text-blue-100">{t.hero.enrollCard.start}</p>
                  <p className="mt-1 text-2xl font-bold leading-tight">{START_DATE}</p>
                </div>
                <div className="rounded-xl border border-white/30 bg-white/10 p-3">
                  <p className="text-xs text-blue-100">{t.hero.enrollCard.seats}</p>
                  <p className="mt-1 text-2xl font-bold leading-tight">{SEATS_LEFT ?? "—"}</p>
                </div>
              </div>
              <div className="mt-3 rounded-xl border border-white/30 bg-white/10 p-3">
                <p className="text-xs text-blue-100">{t.hero.enrollCard.schedule}</p>
                <p className="mt-1 text-sm font-semibold">{t.hero.enrollCard.scheduleValue}</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-blue-100">
                {t.hero.enrollCard.notes.map((note) => (
                  <li key={note} className="flex items-center gap-2">
                    {renderIcon("calendar", "h-4 w-4")}
                    {note}
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </header>

        <section id="checklist" className="fade-up mt-16 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/55 md:p-8" style={{ animationDelay: "0.06s" }}>
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeader label={t.lead.label} title={t.lead.title} subtitle={t.lead.subtitle} />
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 text-blue-700 shadow-sm">{renderIcon("pdf", "h-6 w-6")}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.lead.pdfName}</p>
                    <p className="text-xs text-slate-500">PDF · Deutsch für Leben</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleLeadSubmit} className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-white p-5">
              <label className="text-sm font-semibold text-slate-700">
                {t.lead.email}
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(event) => setLeadEmail(event.target.value)}
                  placeholder="name@example.com"
                  className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400"
                />
              </label>
              <label className="mt-3 block text-sm font-semibold text-slate-700">
                {t.lead.telegram}
                <input
                  type="text"
                  value={leadTelegram}
                  onChange={(event) => setLeadTelegram(event.target.value)}
                  placeholder="@username"
                  className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400"
                />
              </label>
              <button type="submit" className="mt-4 w-full rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
                {t.lead.button}
              </button>
              <p className="mt-3 text-xs text-slate-500">{t.lead.privacy}</p>
              {leadError ? <p className="mt-2 text-sm text-red-600">{leadError}</p> : null}
              {leadSuccess ? <p className="mt-2 text-sm text-emerald-700">{t.lead.success}</p> : null}
            </form>
          </div>
        </section>

        <section className="fade-up mt-20" style={{ animationDelay: "0.1s" }}>
          <SectionHeader label={t.problem.label} title={t.problem.title} subtitle={t.problem.subtitle} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {t.problem.cards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/60 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-xl bg-blue-50 p-2 text-blue-700">{renderIcon(card.icon)}</div>
                  <div>
                    <h3 className="text-xl text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-slate-600">{card.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="fade-up mt-20 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-blue-50/40 to-white p-7 shadow-xl shadow-blue-100/60 md:p-10" style={{ animationDelay: "0.13s" }}>
          <SectionHeader label={t.solution.label} title={t.solution.title} />
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {t.solution.cards.map((card) => (
              <article key={card.title} className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-700">{renderIcon(card.icon)}</div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{card.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="fade-up mt-20" style={{ animationDelay: "0.16s" }}>
          <SectionHeader label={t.examples.label} title={t.examples.title} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {t.examples.items.map((item) => (
              <article key={item.title} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-md">
                <div className="flex items-center gap-2 text-blue-700">
                  {renderIcon(item.icon)}
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
                <p className="mt-3 rounded-xl bg-blue-50/70 px-3 py-3 text-sm text-slate-700">“{item.text}”</p>
              </article>
            ))}
          </div>
        </section>

        <section id="program" className="fade-up mt-20" style={{ animationDelay: "0.19s" }}>
          <SectionHeader label={t.program.label} title={t.program.title} subtitle={t.program.subtitle} />
          <p className="mt-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900">
            {t.program.total}
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {t.program.cards.map((card) => (
              <article key={card.level} className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/55">
                <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[1.7rem] bg-gradient-to-br from-blue-600/15 to-sky-400/20" />
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">{card.step}</p>
                <div className="mt-2 flex items-center justify-between">
                  <h3 className="text-2xl text-slate-900">{card.level}</h3>
                  <p className="text-sm font-medium text-slate-500">{card.duration}</p>
                </div>
                {card.ribbon ? (
                  <p className="mt-3 rounded-lg bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-900">{card.ribbon}</p>
                ) : null}
                <ul className="mt-4 space-y-2.5">
                  {card.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="mini-courses" className="fade-up mt-20" style={{ animationDelay: "0.22s" }}>
          <SectionHeader label={t.mini.label} title={t.mini.title} />

          <div className="mt-8 rounded-3xl border border-blue-100 bg-white p-4 shadow-xl shadow-blue-100/55 md:p-6">
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => goToSlide(carouselIndex - 1)}
                disabled={carouselIndex === 0}
                className="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={t.mini.prev}
              >
                {t.mini.prev}
              </button>
              <button
                type="button"
                onClick={() => goToSlide(carouselIndex + 1)}
                disabled={carouselIndex >= maxCarouselIndex}
                className="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={t.mini.next}
              >
                {t.mini.next}
              </button>
            </div>

            <div
              className="mt-4 overflow-hidden"
              tabIndex={0}
              role="region"
              aria-label="mini-courses-carousel"
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  goToSlide(carouselIndex + 1);
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  goToSlide(carouselIndex - 1);
                }
              }}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${(carouselIndex * 100) / cardsPerView}%)` }}
              >
                {t.mini.courses.map((course) => (
                  <div key={course.title} className="shrink-0 p-2" style={{ flex: `0 0 ${100 / cardsPerView}%` }}>
                    <article className="h-full rounded-3xl bg-gradient-to-br from-[#0b327f] via-[#1a57c4] to-[#2f90ff] p-6 text-white shadow-xl shadow-blue-300/35">
                      <div className="flex items-start justify-between gap-3">
                        <div className="rounded-lg border border-white/30 bg-white/10 p-2 text-white">
                          {renderIcon(course.icon)}
                        </div>
                        <p className="text-xs text-blue-100">{course.duration}</p>
                      </div>
                      <h3 className="mt-4 text-xl leading-snug">{course.title}</h3>
                      <div className="mt-4 space-y-2 text-sm text-blue-100">
                        <p>
                          <span className="font-semibold text-white">Для чого:</span> {course.purpose}
                        </p>
                        <p>
                          <span className="font-semibold text-white">Результат:</span> {course.result}
                        </p>
                        <p>
                          <span className="font-semibold text-white">Формат:</span> {course.format}
                        </p>
                        <p>
                          <span className="font-semibold text-white">Тривалість:</span> {course.duration}
                        </p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-center gap-2">
              {dots.map((dot) => (
                <button
                  key={dot}
                  type="button"
                  onClick={() => goToSlide(dot)}
                  className={`h-2.5 rounded-full transition ${
                    carouselIndex === dot ? "w-8 bg-blue-700" : "w-2.5 bg-blue-200 hover:bg-blue-300"
                  }`}
                  aria-label={`slide-${dot + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="fade-up mt-20 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/60 md:p-8" style={{ animationDelay: "0.25s" }}>
          <SectionHeader label={t.visuals.label} title={t.visuals.title} />
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <article className="overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/40">
              <img src="/images/leipzig-illustration.svg" alt="Leipzig illustration" className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{t.visuals.cards[0].title}</h3>
                <p className="mt-1 text-sm text-slate-600">{t.visuals.cards[0].text}</p>
              </div>
            </article>
            <article className="overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/40">
              <img src="/images/classroom-illustration.svg" alt="Classroom illustration" className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{t.visuals.cards[1].title}</h3>
                <p className="mt-1 text-sm text-slate-600">{t.visuals.cards[1].text}</p>
              </div>
            </article>
          </div>
        </section>

        <section id="format" className="fade-up mt-20 grid gap-6 lg:grid-cols-2" style={{ animationDelay: "0.28s" }}>
          <article className="rounded-3xl border border-blue-100 bg-white p-7 shadow-xl shadow-blue-100/60 md:p-9">
            <SectionHeader label={t.format.label} title={t.format.title} />
            <div className="mt-6 space-y-3">
              {t.format.items.map((item) => (
                <div key={item.title} className="rounded-xl border border-blue-100 bg-blue-50/65 p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-white p-2 text-blue-700">{renderIcon(item.icon)}</div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-blue-100 bg-white p-7 shadow-xl shadow-blue-100/60 md:p-9">
            <SectionHeader label={t.founder.label} title={t.founder.title} />
            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="grid h-14 w-14 place-content-center rounded-full bg-gradient-to-br from-blue-700 to-sky-500 text-lg font-bold text-white">
                DfL
              </div>
              <div>
                <p className="font-semibold text-slate-900">Deutsch für Leben</p>
                <p className="text-sm text-slate-600">Leipzig</p>
              </div>
            </div>
            <p className="mt-4 text-slate-700">{t.founder.text}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {t.founder.signals.map((signal) => (
                <li key={signal} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-700" />
                  {signal}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section id="faq" className="fade-up mt-20" style={{ animationDelay: "0.31s" }}>
          <SectionHeader label={t.faq.label} title={t.faq.title} />
          <div className="mt-8 space-y-3">
            {t.faq.items.map((item) => (
              <details key={item.q} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center gap-2 pr-4 text-base font-semibold text-slate-900">
                  <span className="rounded-md bg-blue-50 p-1 text-blue-700">{renderIcon("exam", "h-4 w-4")}</span>
                  {item.q}
                </summary>
                <p className="mt-3 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contacts" className="fade-up mt-20 rounded-[2rem] border border-blue-100 bg-white p-7 shadow-xl shadow-blue-100/60 md:p-10" style={{ animationDelay: "0.34s" }}>
          <SectionHeader label={t.contacts.label} title={t.contacts.title} subtitle={t.contacts.text} />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{t.contacts.email}</p>
              <a href="mailto:info@deutschfuerleben.de" className="mt-2 block font-medium text-slate-900 hover:text-blue-700">
                info@deutschfuerleben.de
              </a>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{t.contacts.telegram}</p>
              <a href="https://t.me/deutschfuerleben" className="mt-2 block font-medium text-slate-900 hover:text-blue-700">
                @deutschfuerleben
              </a>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{t.contacts.city}</p>
              <p className="mt-2 font-medium text-slate-900">{t.contacts.cityValue}</p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{t.contacts.response}</p>
              <p className="mt-2 font-medium text-slate-900">{t.contacts.responseValue}</p>
            </div>
          </div>
        </section>

        <section id="application" className="fade-up mt-20 rounded-[2rem] border border-blue-800/30 bg-gradient-to-br from-[#0d2d75] via-[#1242a7] to-[#2184f0] px-6 py-9 shadow-2xl shadow-blue-400/30 md:px-10 md:py-12" style={{ animationDelay: "0.37s" }}>
          <SectionHeader label={t.form.quickLabel} title={t.form.quickTitle} light />

          <div className="mt-7 rounded-2xl border border-white/20 bg-white/10 p-4 md:p-5">
            <div className="grid gap-4 md:grid-cols-3">
              <OptionGroup label={t.form.level} options={t.form.levelOptions} value={level} onChange={setLevel} />
              <OptionGroup label={t.form.format} options={t.form.formatOptions} value={format} onChange={setFormat} />
              <OptionGroup label={t.form.time} options={t.form.timeOptions} value={time} onChange={setTime} />
            </div>
            <label className="mt-4 block text-sm font-semibold text-white/95">
              {t.form.city}
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder={t.form.cityPlaceholder}
                className="mt-2 w-full rounded-xl border border-white/35 bg-white/12 px-4 py-3 text-white outline-none transition placeholder:text-blue-100/85 focus:border-white focus:bg-white/20"
              />
            </label>
          </div>

          <div className="mt-8">
            <SectionHeader label="" title={t.form.title} subtitle={t.form.subtitle} light />
            <p className="mt-2 text-sm text-blue-100">{t.form.nextStep}</p>
          </div>

          <form className="mt-7 grid gap-4 md:grid-cols-2">
            <input type="hidden" name="selected_level" value={levelLabel} />
            <input type="hidden" name="selected_format" value={formatLabel} />
            <input type="hidden" name="selected_time" value={timeLabel} />
            <input type="hidden" name="selected_city" value={city} />

            <label className="text-sm text-blue-100">
              {t.form.fields.name}
              <input
                type="text"
                name="name"
                required
                placeholder={t.form.placeholders.name}
                className="mt-2 w-full rounded-xl border border-white/35 bg-white/12 px-4 py-3 text-white outline-none transition placeholder:text-blue-100/80 focus:border-white focus:bg-white/18"
              />
            </label>

            <label className="text-sm text-blue-100">
              {t.form.fields.telegram}
              <input
                type="text"
                name="telegram"
                required
                placeholder={t.form.placeholders.telegram}
                className="mt-2 w-full rounded-xl border border-white/35 bg-white/12 px-4 py-3 text-white outline-none transition placeholder:text-blue-100/80 focus:border-white focus:bg-white/18"
              />
            </label>

            <label className="text-sm text-blue-100 md:col-span-2">
              {t.form.fields.email}
              <input
                type="email"
                name="email"
                required
                placeholder={t.form.placeholders.email}
                className="mt-2 w-full rounded-xl border border-white/35 bg-white/12 px-4 py-3 text-white outline-none transition placeholder:text-blue-100/80 focus:border-white focus:bg-white/18"
              />
            </label>

            <p className="text-sm text-blue-100 md:col-span-2">{t.form.privacy}</p>

            <label className="flex items-start gap-3 text-sm text-blue-100 md:col-span-2">
              <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-white/40 bg-white/15" />
              <span>
                {t.form.consentPrefix}{" "}
                <a href="/datenschutz" className="font-semibold text-white underline underline-offset-2">
                  {t.form.consentLink}
                </a>
              </span>
            </label>

            <button type="submit" className="md:col-span-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-50">
              {t.form.submit}
            </button>
          </form>
        </section>

        <footer className="fade-up mt-10 pb-4" style={{ animationDelay: "0.4s" }}>
          <p className="text-center text-sm text-slate-600">{t.footer.disclaimer}</p>
          <p className="mt-2 text-center text-sm text-slate-600">{t.footer.contactLine}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-700">
            <a href="/impressum" className="rounded-full border border-blue-100 bg-white px-4 py-1.5 hover:bg-blue-50">
              {t.footer.links.impressum}
            </a>
            <a href="/datenschutz" className="rounded-full border border-blue-100 bg-white px-4 py-1.5 hover:bg-blue-50">
              {t.footer.links.privacy}
            </a>
            <a href="/kontakt" className="rounded-full border border-blue-100 bg-white px-4 py-1.5 hover:bg-blue-50">
              {t.footer.links.contact}
            </a>
          </div>
        </footer>
      </div>

      <div className="mobile-sticky-cta md:hidden">
        <a href="#application" className="block w-full rounded-xl bg-blue-700 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-400/30">
          {t.nav.apply}
        </a>
      </div>
    </main>
  );
}
