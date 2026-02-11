"use client";

import Image from "next/image";
import type { FormEvent, ReactNode, TouchEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { growthFlags, heroOfferConfig, resolveHeroVariant, utmKeys, type HeroVariant } from "./config/growth";
import { blogCategories, blogPosts } from "./data/blog-posts";
import { followUpTemplates } from "./data/follow-up-templates";
import socialProofData from "./data/social-proof.json";
import TestimonialsSection from "./components/TestimonialsSection";

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
      seatsSuffix: "місця",
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
      subtitle: "Конкретні теми для Alltag, Jobcenter, Arzt, Telefon, Briefe, Arbeit і Wohnung.",
      total: "~6–7 місяців",
      lessonFlowTitle: "Як проходить урок (90 хв)",
      lessonFlow: [
        { time: "0–15 хв", text: "Розігрів і повторення фраз із минулого заняття." },
        { time: "15–45 хв", text: "Нова тема на живих сценаріях: Arzt, Jobcenter, Arbeit, Telefon." },
        { time: "45–70 хв", text: "Рольові діалоги в парах і міні-групах з викладачем." },
        { time: "70–90 хв", text: "Розбір помилок, шаблони фраз і план до наступного уроку." }
      ],
      milestoneTitle: "Який результат ви бачите",
      milestones: [
        { period: "Після 4 тижнів", result: "Спокійно проходите базові ситуації Alltag і Telefon без пауз." },
        { period: "Після 8 тижнів", result: "Розумієте листи від Jobcenter/Behörden і можете відповідати за шаблоном." },
        { period: "До DTZ/B1", result: "Говорите структуровано, пишете текст і контролюєте час на екзамені." }
      ],
      topicsTitle: "Теми модуля",
      outcomesTitle: "Що в результаті",
      cards: [
        {
          step: "Крок 1",
          level: "A1",
          duration: "7 тижнів",
          ribbon: "Йде набір · Старт 21.02 · Залишилось 4 місця",
          topics: [
            "Alltag: магазин, транспорт, аптека",
            "Arzt: запис на Termin і опис симптомів",
            "Telefon: короткі дзвінки за скриптом",
            "Briefe: прості форми й анкети",
            "Wohnung: оренда, побутові запити"
          ],
          outcomes: [
            "представляєтесь і пояснюєте базові потреби",
            "бронюєте Termin телефоном за зрозумілим шаблоном",
            "ведете прості діалоги в щоденних ситуаціях"
          ]
        },
        {
          step: "Крок 2",
          level: "A2",
          duration: "2 рівні по 7 тижнів",
          ribbon: "",
          topics: [
            "Jobcenter і Behörden: уточнення, довідки, терміни",
            "Arbeit: задачі, зміни, розмова з колегами",
            "Briefe: відповіді на офіційні листи",
            "Telefon: перенесення/підтвердження Termin",
            "Wohnung: Hausverwaltung, Nebenkosten, ремонт"
          ],
          outcomes: [
            "уточнюєте питання в Jobcenter без стресу",
            "читаєте й пишете робочі та офіційні повідомлення",
            "обговорюєте задачі на роботі і погоджуєте деталі"
          ]
        },
        {
          step: "Крок 3",
          level: "B1 (DTZ)",
          duration: "7 тижнів",
          ribbon: "",
          topics: [
            "DTZ: структура, критерії, таймінг",
            "Усна частина: аргументація й реакція на питання",
            "Письмова частина: лист і структурований текст",
            "Leben in Deutschland: типові теми й логіка відповідей",
            "Arbeit/Wohnung/Behörden: складні кейси B1-рівня"
          ],
          outcomes: [
            "проходите типові завдання DTZ зі стратегією часу",
            "пишете екзаменаційний текст за чітким каркасом",
            "впевнено тримаєтесь в усній частині B1"
          ]
        }
      ]
    },
    mini: {
      label: "Практичні міні-курси",
      title: "Короткі модулі 3–3,5 тижні під конкретну задачу",
      prev: "Назад",
      next: "Вперед",
      forWho: "Кому підходить",
      resultLabel: "Результат",
      formatLabel: "Формат",
      durationLabel: "Тривалість",
      swipeHint: "Свайпніть вліво/вправо на мобільному",
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
      title: "Своя людина, яка сама пройшла шлях інтеграції в Німеччині",
      text:
        "Я переїхав(ла) до Німеччини без впевненої мови, проходив(ла) бюрократію, пошук роботи й підготовку до офіційних тестів. Цей курс створено, щоб ви не губилися в реальних ситуаціях і бачили прогнозований прогрес щотижня.",
      profileName: "Deutsch für Leben",
      profileRole: "Founder & Method Lead",
      trustLine: "Office in Leipzig · Online по всій Німеччині",
      bullets: [
        {
          title: "Що ви отримаєте",
          text: "Робочі мовні шаблони для Arzt, Jobcenter, Arbeit, Telefon і листів."
        },
        {
          title: "Як ми працюємо",
          text: "Малі групи до 6 людей, чіткий план уроку, фідбек без перевантаження."
        },
        {
          title: "Чим відрізняємось від безкоштовних курсів",
          text: "Більше speaking-практики, персональні корекції і фокус на ваших сценаріях."
        }
      ]
    },
    groups: {
      label: "Ближчі групи",
      title: "Потоки з фіксованим стартом і прозорою кількістю місць",
      subtitle: "Набір іде регулярно. Малі групи до 6 учасників, щоб кожен встиг говорити.",
      proof: ["Малі групи: до 6 людей", "Новий набір зазвичай кожні 3–4 тижні"],
      cards: [
        {
          status: "Йде набір",
          level: "A1 Start",
          start: "21.02",
          schedule: "Вт / Чт / Сб · 18:30",
          format: "Онлайн",
          seats: "Залишилось 4 місця",
          almostFull: true
        },
        {
          status: "Йде набір",
          level: "A2 Progress",
          start: "03.03",
          schedule: "Пн / Ср · 19:00",
          format: "Онлайн",
          seats: "Залишилось 6 місць",
          almostFull: false
        },
        {
          status: "Майже заповнено",
          level: "B1 DTZ Focus",
          start: "10.03",
          schedule: "Вт / Чт · 18:45",
          format: "Офлайн Leipzig + online backup",
          seats: "Залишилось 2 місця",
          almostFull: true
        }
      ]
    },
    testimonials: {
      label: "Відгуки / Beta feedback",
      title: "Блок під реальні відгуки перших учасників",
      subtitle: "Ми не публікуємо вигадані історії. Нижче структура, яку легко оновити після потоку.",
      cards: [
        {
          tag: "Перші учасники A1",
          quote: "Тут буде короткий реальний відгук після завершення найближчого потоку.",
          meta: "Статус: збираємо зворотний зв’язок"
        },
        {
          tag: "Перші учасники A2",
          quote: "Тут буде приклад про прогрес у Jobcenter / Briefe / Telefon.",
          meta: "Статус: beta feedback в обробці"
        },
        {
          tag: "Перші учасники B1",
          quote: "Тут буде кейс підготовки до DTZ і усної частини B1.",
          meta: "Статус: додаємо після екзамену"
        }
      ]
    },
    faq: {
      label: "FAQ",
      title: "Часті запитання перед стартом",
      items: [
        {
          q: "Яка вартість і як проходить оплата?",
          a: "Надсилаємо актуальну вартість після заявки. Оплата помісячна або за модуль, без прихованих платежів."
        },
        {
          q: "Де проходять заняття офлайн?",
          a: "Основний формат — online по всій Німеччині. Офлайн-групи проходять у Leipzig (центр), адресу надсилаємо після підтвердження місця."
        },
        {
          q: "Що робити, якщо пропустив(ла) заняття?",
          a: "Надаємо конспект, ключові фрази і домашній план, щоб ви швидко повернулися в темп."
        },
        {
          q: "Чи є повернення коштів?",
          a: "Так, повернення можливе до початку модуля. Після старту повернення рахується пропорційно невикористаним заняттям."
        },
        {
          q: "Чи підходить курс, якщо я з нуля?",
          a: "Так, рівень A1 повністю розрахований на старт без бази."
        },
        {
          q: "Скільки триває шлях до B1?",
          a: "У середньому 6–7 місяців за стабільної участі і виконання практики між уроками."
        },
        {
          q: "Скільки часу потрібно поза заняттями?",
          a: "Чесний діапазон: 20–40 хв у звичайні дні і 60–90 хв перед тестовими модулями."
        },
        {
          q: "Допомагаєте з підготовкою до DTZ?",
          a: "Так. Є окремий B1-блок з таймінгом, усною практикою і письмовими шаблонами під формат екзамену."
        },
        {
          q: "Чим курс відрізняється від VHS або безкоштовних курсів?",
          a: "Малі групи до 6 людей, більше speaking-практики, персональний фідбек і фокус на ваших реальних сценаріях."
        },
        {
          q: "Коли найближчий старт і як забронювати місце?",
          a: "Найближчий старт A1 — 21.02. Надішліть заявку і ми підтвердимо місце протягом 24 годин."
        }
      ]
    },
    contacts: {
      label: "Контакти",
      title: "Швидкий зв’язок із командою школи",
      text: "Office in Leipzig · online по всій Німеччині. Відповідаємо щодня.",
      email: "E-Mail",
      telegram: "Telegram",
      city: "Офіс / формат",
      response: "Час відповіді",
      cityValue: "Leipzig (центр) · online по Німеччині",
      responseValue: "Відповімо протягом 24 годин, зазвичай швидше"
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
      subtitle: "Конкретные темы для Alltag, Jobcenter, Arzt, Telefon, Briefe, Arbeit и Wohnung.",
      total: "~6–7 месяцев",
      lessonFlowTitle: "Как проходит урок (90 мин)",
      lessonFlow: [
        { time: "0–15 мин", text: "Разогрев и повтор ключевых фраз прошлого урока." },
        { time: "15–45 мин", text: "Новая тема на живых сценариях: Arzt, Jobcenter, Arbeit, Telefon." },
        { time: "45–70 мин", text: "Ролевые диалоги в парах и мини-группах с преподавателем." },
        { time: "70–90 мин", text: "Разбор ошибок, рабочие шаблоны и план до следующего урока." }
      ],
      milestoneTitle: "Какой результат вы видите",
      milestones: [
        { period: "После 4 недель", result: "Спокойно проходите базовые ситуации Alltag и Telefon без долгих пауз." },
        { period: "После 8 недель", result: "Понимаете письма от Jobcenter/Behörden и отвечаете по рабочему шаблону." },
        { period: "К экзамену DTZ/B1", result: "Говорите структурно, пишете текст и контролируете время на тесте." }
      ],
      topicsTitle: "Темы модуля",
      outcomesTitle: "Что в результате",
      cards: [
        {
          step: "Шаг 1",
          level: "A1",
          duration: "7 недель",
          ribbon: "Идет набор · Старт 21.02 · Осталось 4 места",
          topics: [
            "Alltag: магазин, транспорт, аптека",
            "Arzt: запись на Termin и описание симптомов",
            "Telefon: короткие звонки по скрипту",
            "Briefe: простые формы и анкеты",
            "Wohnung: аренда и бытовые запросы"
          ],
          outcomes: [
            "представляетесь и объясняете базовые потребности",
            "бронируете Termin по телефону по понятному шаблону",
            "ведете простые диалоги в ежедневных ситуациях"
          ]
        },
        {
          step: "Шаг 2",
          level: "A2",
          duration: "2 уровня по 7 недель",
          ribbon: "",
          topics: [
            "Jobcenter и Behörden: уточнения, справки, термины",
            "Arbeit: задачи, изменения, диалог с коллегами",
            "Briefe: ответы на официальные письма",
            "Telefon: перенос и подтверждение Termin",
            "Wohnung: Hausverwaltung, Nebenkosten, ремонт"
          ],
          outcomes: [
            "уточняете вопросы в Jobcenter без стресса",
            "читаете и пишете рабочие и официальные сообщения",
            "обсуждаете задачи на работе и согласовываете детали"
          ]
        },
        {
          step: "Шаг 3",
          level: "B1 (DTZ)",
          duration: "7 недель",
          ribbon: "",
          topics: [
            "DTZ: структура, критерии и тайминг",
            "Устная часть: аргументация и реакция на вопросы",
            "Письменная часть: письмо и структурированный текст",
            "Leben in Deutschland: типовые темы и логика ответов",
            "Arbeit/Wohnung/Behörden: сложные кейсы уровня B1"
          ],
          outcomes: [
            "проходите типовые задания DTZ со стратегией времени",
            "пишете экзаменационный текст по понятной структуре",
            "уверенно держитесь в устной части B1"
          ]
        }
      ]
    },
    mini: {
      label: "Практические мини-курсы",
      title: "Короткие модули 3–3,5 недели под конкретную задачу",
      prev: "Назад",
      next: "Вперёд",
      forWho: "Кому подходит",
      resultLabel: "Результат",
      formatLabel: "Формат",
      durationLabel: "Длительность",
      swipeHint: "Свайп влево/вправо на мобильном",
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
      title: "Свой человек, который сам прошел путь интеграции в Германии",
      text:
        "Я переехал(а) в Германию без уверенного немецкого, проходил(а) бюрократию, поиск работы и подготовку к официальным тестам. Курс сделан так, чтобы вы не терялись в реальных ситуациях и видели понятный прогресс каждую неделю.",
      profileName: "Deutsch für Leben",
      profileRole: "Founder & Method Lead",
      trustLine: "Office in Leipzig · Online по всей Германии",
      bullets: [
        {
          title: "Что вы получите",
          text: "Рабочие речевые шаблоны для Arzt, Jobcenter, Arbeit, Telefon и писем."
        },
        {
          title: "Как мы работаем",
          text: "Малые группы до 6 человек, четкая структура урока и обратная связь без перегруза."
        },
        {
          title: "Чем отличаемся от бесплатных курсов",
          text: "Больше speaking-практики, персональные корректировки и фокус на ваших кейсах."
        }
      ]
    },
    groups: {
      label: "Ближайшие группы",
      title: "Потоки с фиксированным стартом и прозрачным количеством мест",
      subtitle: "Набор идет регулярно. Малые группы до 6 участников, чтобы каждый говорил на уроке.",
      proof: ["Малые группы: до 6 человек", "Новый набор обычно каждые 3–4 недели"],
      cards: [
        {
          status: "Идет набор",
          level: "A1 Start",
          start: "21.02",
          schedule: "Вт / Чт / Сб · 18:30",
          format: "Онлайн",
          seats: "Осталось 4 места",
          almostFull: true
        },
        {
          status: "Идет набор",
          level: "A2 Progress",
          start: "03.03",
          schedule: "Пн / Ср · 19:00",
          format: "Онлайн",
          seats: "Осталось 6 мест",
          almostFull: false
        },
        {
          status: "Почти заполнено",
          level: "B1 DTZ Focus",
          start: "10.03",
          schedule: "Вт / Чт · 18:45",
          format: "Офлайн Leipzig + online backup",
          seats: "Осталось 2 места",
          almostFull: true
        }
      ]
    },
    testimonials: {
      label: "Отзывы / Beta feedback",
      title: "Блок под реальные отзывы первых участников",
      subtitle: "Мы не публикуем выдуманные истории. Ниже структура, которую легко обновить после потока.",
      cards: [
        {
          tag: "Первые участники A1",
          quote: "Здесь будет короткий реальный отзыв после завершения ближайшего потока.",
          meta: "Статус: собираем обратную связь"
        },
        {
          tag: "Первые участники A2",
          quote: "Здесь будет пример про прогресс в Jobcenter / Briefe / Telefon.",
          meta: "Статус: beta feedback в обработке"
        },
        {
          tag: "Первые участники B1",
          quote: "Здесь будет кейс подготовки к DTZ и устной части B1.",
          meta: "Статус: добавим после экзамена"
        }
      ]
    },
    faq: {
      label: "FAQ",
      title: "Частые вопросы перед стартом",
      items: [
        {
          q: "Какая стоимость и как проходит оплата?",
          a: "Актуальную стоимость отправляем после заявки. Оплата помесячно или за модуль, без скрытых платежей."
        },
        {
          q: "Где проходят офлайн-занятия?",
          a: "Базовый формат — online по всей Германии. Офлайн-группы проходят в Leipzig (центр), адрес отправляем после подтверждения места."
        },
        {
          q: "Что делать, если пропустил(а) занятие?",
          a: "Даем конспект, ключевые фразы и домашний план, чтобы быстро вернуться в ритм."
        },
        {
          q: "Есть ли возвраты?",
          a: "Да. Возврат возможен до старта модуля, после начала — пропорционально неиспользованным занятиям."
        },
        {
          q: "Подходит ли курс, если я с нуля?",
          a: "Да, уровень A1 полностью рассчитан на старт без базы."
        },
        {
          q: "Сколько длится путь до B1?",
          a: "В среднем 6–7 месяцев при регулярном посещении и выполнении практики между уроками."
        },
        {
          q: "Сколько времени нужно вне занятий?",
          a: "Честный диапазон: 20–40 минут в обычные дни и 60–90 минут перед тестовыми модулями."
        },
        {
          q: "Помогаете с подготовкой к DTZ?",
          a: "Да. Есть отдельный B1-блок с таймингом, устной практикой и письменными шаблонами под формат экзамена."
        },
        {
          q: "Чем курс отличается от VHS или бесплатных программ?",
          a: "Малые группы до 6 человек, больше speaking-практики, персональная обратная связь и фокус на ваших сценариях."
        },
        {
          q: "Когда ближайший старт и как забронировать место?",
          a: "Ближайший старт A1 — 21.02. Отправьте заявку, и мы подтвердим место в течение 24 часов."
        }
      ]
    },
    contacts: {
      label: "Контакты",
      title: "Быстрая связь с командой школы",
      text: "Office in Leipzig · online по всей Германии. Отвечаем ежедневно.",
      email: "E-Mail",
      telegram: "Telegram",
      city: "Офис / формат",
      response: "Время ответа",
      cityValue: "Leipzig (центр) · online по Германии",
      responseValue: "Ответим в течение 24 часов, обычно быстрее"
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
  const [heroVariant, setHeroVariant] = useState<HeroVariant>(growthFlags.defaultHeroVariant);
  const [level, setLevel] = useState("a1");
  const [format, setFormat] = useState("online");
  const [time, setTime] = useState("morning");
  const [city, setCity] = useState("");
  const [utmData, setUtmData] = useState<Record<string, string>>({});

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
  const [showMobileSticky, setShowMobileSticky] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const [waitlistTrack, setWaitlistTrack] = useState("kids");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistTelegram, setWaitlistTelegram] = useState("");
  const [waitlistError, setWaitlistError] = useState("");
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const t = copy[locale];
  const activeHeroVariant = growthFlags.enableHeroABTest ? heroVariant : "a";
  const heroOffer = heroOfferConfig[locale][activeHeroVariant];
  const maxCarouselIndex = Math.max(0, t.mini.courses.length - cardsPerView);
  const dots = useMemo(() => Array.from({ length: maxCarouselIndex + 1 }, (_, idx) => idx), [maxCarouselIndex]);
  const blogTeasers = blogPosts.slice(0, 4);
  const testimonialCards = socialProofData.testimonials;
  const followUpSequence = followUpTemplates[locale];

  const i18n = locale === "ua"
    ? {
        blog: {
          label: "Блог / корисне",
          title: "Почали SEO-рух: 10 шаблонних статей під пошук у Німеччині",
          subtitle: "Категорії: Jobcenter, Arzt, DTZ, Alltag, Arbeit, Briefe.",
          readMore: "Читати статтю",
          all: "Перейти до блогу"
        },
        testimonials: {
          sourceHint: "Дані секції підтягуються з JSON і готові до заміни на CMS.",
          reviewTitle: "Залишити відгук (не публікується автоматично)",
          reviewName: "Ім'я",
          reviewContact: "Контакт (E-Mail або Telegram)",
          reviewText: "Ваш feedback",
          reviewConsent: "Даю згоду на ручну обробку відгуку командою школи.",
          reviewSubmit: "Відправити відгук",
          reviewSuccess: "Дякуємо. Відгук збережено для ручної модерації.",
          reviewError: "Заповніть текст відгуку і підтвердьте згоду.",
          cohortTitle: "Результати потоку",
          cohortPending: "Опублікуємо цифри тільки після перевірки фактичних даних."
        },
        leadFlow: {
          title: "Що далі після чекліста",
          text: "Надішлемо чекліст, а потім короткий маршрут до групи. Зараз у найближчому потоці залишилось 4 місця.",
          followUpTitle: "Шаблони follow-up повідомлень (email/telegram)"
        },
        waitlist: {
          label: "Лист очікування",
          title: "Дитячий курс і B2 — тільки в waitlist, щоб не розмивати фокус A1/B1",
          subtitle: "Збираємо інтерес, не продаємо те, що ще не запущено.",
          track: "Напрям",
          email: "E-Mail",
          telegram: "Telegram (опціонально)",
          submit: "Приєднатися до waitlist",
          success: "Готово. Ми повідомимо першими, коли відкриємо набір.",
          error: "Вкажіть коректний E-Mail для листа очікування.",
          options: [
            { id: "kids", label: "Дитячий курс" },
            { id: "b2", label: "B2" }
          ]
        }
      }
    : {
        blog: {
          label: "Блог / полезное",
          title: "Запущен SEO-движок: 10 шаблонных статей под поисковый спрос",
          subtitle: "Категории: Jobcenter, Arzt, DTZ, Alltag, Arbeit, Briefe.",
          readMore: "Читать статью",
          all: "Перейти в блог"
        },
        testimonials: {
          sourceHint: "Данные секции подтягиваются из JSON и готовы к замене на CMS.",
          reviewTitle: "Оставить отзыв (без автопубликации)",
          reviewName: "Имя",
          reviewContact: "Контакт (E-Mail или Telegram)",
          reviewText: "Ваш feedback",
          reviewConsent: "Даю согласие на ручную обработку отзыва командой школы.",
          reviewSubmit: "Отправить отзыв",
          reviewSuccess: "Спасибо. Отзыв сохранен для ручной модерации.",
          reviewError: "Заполните текст отзыва и подтвердите согласие.",
          cohortTitle: "Результаты потока",
          cohortPending: "Покажем цифры только после верификации фактических данных."
        },
        leadFlow: {
          title: "Что дальше после чеклиста",
          text: "Отправим чеклист, затем короткий маршрут к группе. В ближайшем потоке сейчас осталось 4 места.",
          followUpTitle: "Шаблоны follow-up сообщений (email/telegram)"
        },
        waitlist: {
          label: "Лист ожидания",
          title: "Детский курс и B2 — только в waitlist, без отвлечения от A1/B1",
          subtitle: "Собираем интерес и честно сообщим о запуске, когда будем готовы.",
          track: "Направление",
          email: "E-Mail",
          telegram: "Telegram (опционально)",
          submit: "Встать в waitlist",
          success: "Готово. Сообщим первыми, когда откроем набор.",
          error: "Укажите корректный E-Mail для листа ожидания.",
          options: [
            { id: "kids", label: "Детский курс" },
            { id: "b2", label: "B2" }
          ]
        }
      };

  useEffect(() => {
    const url = new URL(window.location.href);
    const langParam = url.searchParams.get("lang");
    if (langParam === "ru" || langParam === "ua") {
      setLocale(langParam);
    }

    const requestedHeroVariant = resolveHeroVariant(url.searchParams.get("hero"));
    if (growthFlags.enableHeroABTest && requestedHeroVariant) {
      setHeroVariant(requestedHeroVariant);
    }

    const storageKey = "dfl_utm_v1";
    const collected: Record<string, string> = {};

    for (const key of utmKeys) {
      const value = url.searchParams.get(key);
      if (value) {
        collected[key] = value;
      }
    }

    const persistedRaw = window.localStorage.getItem(storageKey);
    let persisted: Record<string, string> = {};
    if (persistedRaw) {
      try {
        persisted = JSON.parse(persistedRaw) as Record<string, string>;
      } catch {
        persisted = {};
      }
    }

    const merged = { ...persisted, ...collected };
    if (Object.keys(merged).length > 0) {
      setUtmData(merged);
      window.localStorage.setItem(storageKey, JSON.stringify(merged));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "ua" ? "uk" : "ru";
    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    if (growthFlags.enableHeroABTest) {
      url.searchParams.set("hero", activeHeroVariant);
    } else {
      url.searchParams.delete("hero");
    }
    window.history.replaceState(null, "", `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
    setCarouselIndex(0);
  }, [locale, activeHeroVariant]);

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
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Deutsch für Leben");
    upsertMeta("property", "og:image", "/images/leipzig-illustration.svg");
    upsertMeta("property", "og:url", window.location.href);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "twitter:image", "/images/leipzig-illustration.svg");
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

  useEffect(() => {
    const onScroll = () => {
      setShowMobileSticky(window.scrollY > 280);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    trackEvent("view_hero", {
      locale,
      hero_variant: activeHeroVariant,
      ...utmData
    });
  }, [locale, activeHeroVariant, utmData]);

  const goToSlide = (index: number) => {
    setCarouselIndex(Math.max(0, Math.min(index, maxCarouselIndex)));
  };

  const handleMiniTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchDeltaX.current = 0;
  };

  const handleMiniTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }
    touchDeltaX.current = (event.touches[0]?.clientX ?? 0) - touchStartX.current;
  };

  const handleMiniTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 45) {
      if (touchDeltaX.current < 0) {
        goToSlide(carouselIndex + 1);
      } else {
        goToSlide(carouselIndex - 1);
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const handleCtaClick = (ctaId: string, placement: string) => {
    trackEvent("click_cta", {
      locale,
      hero_variant: activeHeroVariant,
      cta_id: ctaId,
      placement,
      ...utmData
    });
  };

  const renderUtmHiddenFields = () =>
    Object.entries(utmData).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />);

  const faqJsonLd = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: locale === "ua" ? "uk" : "ru",
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a
          }
        }))
      }),
    [locale, t.faq.items]
  );

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
    trackEvent("submit_checklist", {
      locale,
      hero_variant: activeHeroVariant,
      hasTelegram: Boolean(leadTelegram.trim()),
      source: "checklist",
      ...utmData
    });
    trackEvent("lead_checklist_submit", {
      locale,
      hasTelegram: Boolean(leadTelegram.trim()),
      source: "checklist",
      ...utmData
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
    trackEvent("submit_lead", {
      locale,
      hero_variant: activeHeroVariant,
      level: levelLabel,
      format: formatLabel,
      time: timeLabel,
      city,
      hasEmail: Boolean(email),
      hasTelegram: Boolean(telegram),
      source: "application",
      ...utmData
    });

    trackEvent("lead_application_submit", {
      locale,
      level: levelLabel,
      format: formatLabel,
      time: timeLabel,
      city,
      hasEmail: Boolean(email),
      hasTelegram: Boolean(telegram),
      source: "application",
      ...utmData
    });
  };

  const handleWaitlistSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = waitlistEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setWaitlistError(i18n.waitlist.error);
      setWaitlistSuccess(false);
      return;
    }

    setWaitlistError("");
    setWaitlistSuccess(true);
    setWaitlistEmail("");
    setWaitlistTelegram("");

    trackEvent("submit_waitlist", {
      locale,
      track: waitlistTrack,
      hasTelegram: Boolean(waitlistTelegram.trim()),
      ...utmData
    });
  };

  const levelLabel = t.form.levelOptions.find((item) => item.id === level)?.label ?? "";
  const formatLabel = t.form.formatOptions.find((item) => item.id === format)?.label ?? "";
  const timeLabel = t.form.timeOptions.find((item) => item.id === time)?.label ?? "";
  const seatsText = `${t.announcement.seatsLabel} ${SEATS_LEFT} ${t.announcement.seatsSuffix}`;
  const consentAndWord = locale === "ua" ? "та" : "и";

  return (
    <main className="relative isolate overflow-x-clip pb-36 md:pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <div className="pointer-events-none absolute -top-32 right-[-200px] hidden h-[520px] w-[520px] rounded-full bg-blue-300/40 blur-3xl md:block" />
      <div className="pointer-events-none absolute left-[-220px] top-[260px] hidden h-[460px] w-[460px] rounded-full bg-sky-200/40 blur-3xl md:block" />

      <div className="sticky top-0 z-[80] border-b border-blue-300/30 bg-gradient-to-r from-[#0b2c72] via-[#1346ae] to-[#1f79e0] text-white shadow-lg shadow-blue-500/20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-amber-950">
              {renderIcon("alarm", "h-3.5 w-3.5")}
              {t.announcement.alarmBadge}
            </span>
            <p className="font-semibold">
              {t.announcement.open} • {t.announcement.startLabel} {START_DATE} • {seatsText}
            </p>
          </div>
          <a
            href="#application"
            onClick={() => handleCtaClick("announcement_apply", "announcement_bar")}
            className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-blue-900 transition hover:bg-blue-50"
          >
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
                {growthFlags.enableBlogTeaser ? (
                  <a href="#blog" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                    {i18n.blog.label}
                  </a>
                ) : (
                  <a href="/blog" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                    {i18n.blog.label}
                  </a>
                )}
                <a href="#contacts" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  {t.nav.contacts}
                </a>
                <a href="/a1" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  A1
                </a>
                <a href="/b1-dtz" className="rounded-full px-3 py-1 text-sm text-slate-600 transition hover:bg-blue-50">
                  B1-DTZ
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
                <a
                  href="#application"
                  onClick={() => handleCtaClick("nav_apply", "navigation")}
                  className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {t.nav.apply}
                </a>
              </div>
            </div>
          </nav>

          <section className="mt-6 grid gap-6 rounded-[2rem] border border-blue-100 bg-white/[0.88] p-6 shadow-lg shadow-blue-200/40 backdrop-blur md:grid-cols-[1.15fr_0.85fr] md:p-10 md:shadow-2xl md:shadow-blue-200/[0.42]">
            <div>
              <p className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-blue-700 ring-1 ring-blue-100">
                {t.hero.badge}
              </p>
              {growthFlags.enableHeroABTest ? (
                <p className="mt-3 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
                  A/B: variant {activeHeroVariant.toUpperCase()}
                </p>
              ) : null}
              <h1 className="mt-6 max-w-[22ch] text-4xl leading-tight text-slate-950 md:text-5xl md:leading-[1.08]">{heroOffer.title}</h1>
              <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-slate-600 md:text-xl">{heroOffer.subtitle}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#application"
                  onClick={() => handleCtaClick("hero_primary", "hero")}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 px-7 py-3 text-sm font-semibold text-white transition hover:from-blue-800 hover:to-sky-600"
                >
                  {heroOffer.primaryCta}
                </a>
                <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-rose-700">
                  {renderIcon("alarm", "h-4 w-4")}
                  {t.hero.scarcityBadge}
                </span>
                <a
                  href="#checklist"
                  onClick={() => handleCtaClick("hero_secondary", "hero")}
                  className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50"
                >
                  {heroOffer.secondaryCta}
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

            <aside className="rounded-3xl bg-gradient-to-br from-[#0b2970] via-[#1347b5] to-[#2f90ff] p-6 text-white shadow-lg shadow-blue-400/30 md:shadow-xl md:shadow-blue-400/35">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-100">{t.hero.enrollCard.title}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-200/70 bg-amber-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-amber-950">
                {renderIcon("alarm", "h-4 w-4")}
                {t.hero.enrollCard.alert}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/30 bg-white/10 p-3">
                  <p className="text-xs text-blue-100">{t.hero.enrollCard.start}</p>
                  <p className="mt-1 text-2xl font-bold leading-tight">{START_DATE}</p>
                </div>
                <div className="rounded-xl border border-white/30 bg-white/10 p-3">
                  <p className="text-xs text-blue-100">{t.hero.enrollCard.seats}</p>
                  <p className="mt-1 text-2xl font-bold leading-tight text-amber-100">{SEATS_LEFT}</p>
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

        <section
          id="checklist"
          className="fade-up mt-16 rounded-[2rem] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-blue-50 p-6 shadow-lg shadow-amber-100/65 md:p-8 md:shadow-xl"
          style={{ animationDelay: "0.06s" }}
        >
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeader label={t.lead.label} title={t.lead.title} subtitle={t.lead.subtitle} />
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2 text-amber-700 shadow-sm">{renderIcon("pdf", "h-6 w-6")}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.lead.pdfName}</p>
                    <p className="text-xs text-slate-500">PDF · Deutsch für Leben</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleLeadSubmit} noValidate className="rounded-2xl border border-amber-200 bg-white p-5">
              {renderUtmHiddenFields()}
              <label className="text-sm font-semibold text-slate-700">
                {t.lead.email}
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(event) => {
                    setLeadEmail(event.target.value);
                    if (leadError) {
                      setLeadError("");
                    }
                  }}
                  placeholder="name@example.com"
                  required
                  aria-invalid={Boolean(leadError)}
                  aria-describedby="lead-error"
                  className="mt-2 w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400"
                />
              </label>
              <label className="mt-3 block text-sm font-semibold text-slate-700">
                {t.lead.telegram}
                <input
                  type="text"
                  value={leadTelegram}
                  onChange={(event) => setLeadTelegram(event.target.value)}
                  placeholder="@username"
                  className="mt-2 w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-400"
                />
              </label>
              <button type="submit" className="mt-4 w-full rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-amber-950 transition hover:bg-amber-400">
                {t.lead.button}
              </button>
              <p className="mt-3 text-xs text-slate-500">{t.lead.privacy}</p>
              {leadError ? (
                <p id="lead-error" role="alert" className="mt-2 text-sm text-red-600">
                  {leadError}
                </p>
              ) : null}
              {leadSuccess ? (
                <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <p className="text-sm font-semibold text-emerald-900">{i18n.leadFlow.title}</p>
                  <p className="mt-1 text-sm text-emerald-800">{i18n.leadFlow.text}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-emerald-700">{i18n.leadFlow.followUpTitle}</p>
                  <ul className="mt-2 space-y-1 text-sm text-emerald-900">
                    {followUpSequence.map((item) => (
                      <li key={item.id} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                        <span>
                          {item.day} ({item.channel}): {item.subject}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#application"
                    onClick={() => handleCtaClick("checklist_to_application", "checklist_success")}
                    className="mt-3 inline-flex text-sm font-semibold text-emerald-900 underline underline-offset-2"
                  >
                    {t.lead.successCta}
                  </a>
                </div>
              ) : null}
            </form>
          </div>
        </section>

        <section className="fade-up mt-20" style={{ animationDelay: "0.1s" }}>
          <SectionHeader label={t.problem.label} title={t.problem.title} subtitle={t.problem.subtitle} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {t.problem.cards.map((card) => (
              <article key={card.title} className="h-full rounded-2xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/60 transition hover:-translate-y-1 hover:shadow-xl">
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

        <section className="fade-up mt-20 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/55 md:p-10" style={{ animationDelay: "0.115s" }}>
          <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="overflow-hidden rounded-3xl border border-blue-100 bg-blue-50/35">
              <Image
                src="/images/founder-portrait.svg"
                alt={t.founder.title}
                width={640}
                height={720}
                className="w-full"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </article>
            <div>
              <SectionHeader label={t.founder.label} title={t.founder.title} />
              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                <p className="font-semibold text-slate-900">{t.founder.profileName}</p>
                <p className="text-sm text-slate-600">{t.founder.profileRole}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-800">
                  {renderIcon("pin", "h-3.5 w-3.5")}
                  {t.founder.trustLine}
                </p>
              </div>
              <p className="mt-5 text-slate-700">{t.founder.text}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {t.founder.bullets.map((bullet) => (
                  <article key={bullet.title} className="h-full rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">{bullet.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{bullet.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="fade-up mt-20 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-blue-50/40 to-white p-7 shadow-xl shadow-blue-100/60 md:p-10" style={{ animationDelay: "0.13s" }}>
          <SectionHeader label={t.solution.label} title={t.solution.title} />
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {t.solution.cards.map((card) => (
              <article key={card.title} className="h-full rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
              <article key={item.title} className="h-full rounded-2xl border border-blue-100 bg-white p-5 shadow-md">
                <div className="flex items-center gap-2 text-blue-700">
                  {renderIcon(item.icon)}
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
                <p className="mt-3 rounded-xl bg-blue-50/70 px-3 py-3 text-sm text-slate-700">“{item.text}”</p>
              </article>
            ))}
          </div>
        </section>

        {growthFlags.enableBlogTeaser ? (
          <section id="blog" className="fade-up mt-20 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/55 md:p-8" style={{ animationDelay: "0.175s" }}>
            <SectionHeader label={i18n.blog.label} title={i18n.blog.title} subtitle={i18n.blog.subtitle} />
            <div className="mt-5 flex flex-wrap gap-2">
              {Object.entries(blogCategories).map(([key, category]) => (
                <a key={key} href={`/blog/category/${key}`} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 transition hover:bg-blue-100">
                  {category.label}
                </a>
              ))}
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {blogTeasers.map((post) => (
                <article key={post.slug} className="h-full rounded-2xl border border-blue-100 bg-blue-50/35 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{blogCategories[post.category].label}</p>
                  <h3 className="mt-2 text-lg text-slate-900">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                  <a href={`/blog/${post.slug}`} className="mt-3 inline-flex text-sm font-semibold text-blue-800 underline underline-offset-2">
                    {i18n.blog.readMore}
                  </a>
                </article>
              ))}
            </div>
            <a href="/blog" className="mt-5 inline-flex rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white">
              {i18n.blog.all}
            </a>
          </section>
        ) : null}

        <section id="program" className="fade-up mt-20" style={{ animationDelay: "0.19s" }}>
          <SectionHeader label={t.program.label} title={t.program.title} subtitle={t.program.subtitle} />
          <p className="mt-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900">
            {t.program.total}
          </p>

          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">{t.program.lessonFlowTitle}</p>
              <ul className="mt-4 space-y-3">
                {t.program.lessonFlow.map((item) => (
                  <li key={item.time} className="flex gap-3">
                    <span className="mt-1 inline-flex h-6 min-w-[70px] items-center justify-center rounded-md bg-blue-50 px-2 text-xs font-bold text-blue-800">
                      {item.time}
                    </span>
                    <span className="text-sm text-slate-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">{t.program.milestoneTitle}</p>
              <div className="mt-4 space-y-3">
                {t.program.milestones.map((item) => (
                  <div key={item.period} className="rounded-xl border border-blue-100 bg-blue-50/60 p-3">
                    <p className="text-sm font-semibold text-slate-900">{item.period}</p>
                    <p className="mt-1 text-sm text-slate-700">{item.result}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {t.program.cards.map((card) => (
              <article key={card.level} className="relative h-full overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/55">
                <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[1.7rem] bg-gradient-to-br from-blue-600/15 to-sky-400/20" />
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">{card.step}</p>
                <div className="mt-2 flex items-center justify-between">
                  <h3 className="text-2xl text-slate-900">{card.level}</h3>
                  <p className="text-sm font-medium text-slate-500">{card.duration}</p>
                </div>
                {card.ribbon ? (
                  <p className="mt-3 rounded-lg bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-900">{card.ribbon}</p>
                ) : null}
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{t.program.topicsTitle}</p>
                <ul className="mt-2 space-y-2">
                  {card.topics.map((topic) => (
                    <li key={topic} className="flex gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{t.program.outcomesTitle}</p>
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

        <section className="fade-up mt-20 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/55 md:p-8" style={{ animationDelay: "0.205s" }}>
          <SectionHeader label={t.groups.label} title={t.groups.title} subtitle={t.groups.subtitle} />
          <div className="mt-6 flex flex-wrap gap-2">
            {t.groups.proof.map((line) => (
              <span key={line} className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
                {renderIcon("users", "h-3.5 w-3.5")}
                {line}
              </span>
            ))}
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {t.groups.cards.map((group) => (
              <article key={`${group.level}-${group.start}`} className="h-full rounded-2xl border border-blue-100 bg-gradient-to-b from-white to-blue-50/40 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] ${
                      group.almostFull ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"
                    }`}
                  >
                    {group.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{group.level}</span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-700">
                  <p className="flex items-center gap-2">
                    {renderIcon("calendar", "h-4 w-4 text-blue-700")}
                    {group.start}
                  </p>
                  <p className="flex items-center gap-2">
                    {renderIcon("clock", "h-4 w-4 text-blue-700")}
                    {group.schedule}
                  </p>
                  <p className="flex items-center gap-2">
                    {renderIcon("online", "h-4 w-4 text-blue-700")}
                    {group.format}
                  </p>
                </div>
                <p
                  className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${
                    group.almostFull ? "bg-rose-100 text-rose-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {group.seats}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="mini-courses" className="fade-up mt-20" style={{ animationDelay: "0.22s" }}>
          <SectionHeader label={t.mini.label} title={t.mini.title} />

          <div className="mt-8 rounded-3xl border border-blue-100 bg-white p-4 shadow-xl shadow-blue-100/55 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">{t.mini.swipeHint}</p>
              <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToSlide(carouselIndex - 1)}
                disabled={carouselIndex === 0}
                className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={t.mini.prev}
              >
                <span aria-hidden>←</span> {t.mini.prev}
              </button>
              <button
                type="button"
                onClick={() => goToSlide(carouselIndex + 1)}
                disabled={carouselIndex >= maxCarouselIndex}
                className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={t.mini.next}
              >
                {t.mini.next} <span aria-hidden>→</span>
              </button>
            </div>
            </div>

            <div
              className="mt-4 select-none overflow-hidden touch-pan-y"
              tabIndex={0}
              role="region"
              aria-label="mini-courses-carousel"
              onTouchStart={handleMiniTouchStart}
              onTouchMove={handleMiniTouchMove}
              onTouchEnd={handleMiniTouchEnd}
              onTouchCancel={handleMiniTouchEnd}
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
                className="flex will-change-transform transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${(carouselIndex * 100) / cardsPerView}%)` }}
              >
                {t.mini.courses.map((course) => (
                  <div key={course.title} className="shrink-0 p-2" style={{ flex: `0 0 ${100 / cardsPerView}%` }}>
                    <article className="h-full rounded-3xl bg-gradient-to-br from-[#0b327f] via-[#1a57c4] to-[#2f90ff] p-6 text-white shadow-lg shadow-blue-300/35">
                      <div className="flex items-start justify-between gap-3">
                        <div className="rounded-lg border border-white/30 bg-white/10 p-2 text-white">
                          {renderIcon(course.icon)}
                        </div>
                        <p className="text-xs text-blue-100">{course.duration}</p>
                      </div>
                      <h3 className="mt-4 text-xl leading-snug">{course.title}</h3>
                      <div className="mt-4 space-y-2 text-sm text-blue-100">
                        <p>
                          <span className="font-semibold text-white">{t.mini.forWho}:</span> {course.purpose}
                        </p>
                        <p>
                          <span className="font-semibold text-white">{t.mini.resultLabel}:</span> {course.result}
                        </p>
                        <p>
                          <span className="font-semibold text-white">{t.mini.formatLabel}:</span> {course.format}
                        </p>
                        <p>
                          <span className="font-semibold text-white">{t.mini.durationLabel}:</span> {course.duration}
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

        <TestimonialsSection
          locale={locale}
          label={t.testimonials.label}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
          sourceHint={i18n.testimonials.sourceHint}
          testimonials={testimonialCards}
          cohortResults={socialProofData.cohortResults}
          cohortTitle={i18n.testimonials.cohortTitle}
          cohortPending={i18n.testimonials.cohortPending}
          review={{
            enabled: growthFlags.enableReviewIntake,
            title: i18n.testimonials.reviewTitle,
            nameLabel: i18n.testimonials.reviewName,
            contactLabel: i18n.testimonials.reviewContact,
            textLabel: i18n.testimonials.reviewText,
            consentLabel: i18n.testimonials.reviewConsent,
            submitLabel: i18n.testimonials.reviewSubmit,
            successLabel: i18n.testimonials.reviewSuccess,
            defaultError: i18n.testimonials.reviewError
          }}
          utmData={utmData}
          onSubmitReview={(payload) => {
            if (!payload.text.trim() || !payload.consent) {
              return { ok: false, error: i18n.testimonials.reviewError };
            }
            trackEvent("submit_review_intake", {
              locale,
              hasContact: Boolean(payload.contact.trim()),
              source: "social_proof_section",
              ...utmData
            });
            return { ok: true };
          }}
        />

        <section className="fade-up mt-20 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/60 md:p-8" style={{ animationDelay: "0.25s" }}>
          <SectionHeader label={t.visuals.label} title={t.visuals.title} />
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <article className="overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/40">
              <Image
                src="/images/leipzig-illustration.svg"
                alt="Leipzig illustration"
                width={896}
                height={352}
                className="h-44 w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{t.visuals.cards[0].title}</h3>
                <p className="mt-1 text-sm text-slate-600">{t.visuals.cards[0].text}</p>
              </div>
            </article>
            <article className="overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/40">
              <Image
                src="/images/classroom-illustration.svg"
                alt="Classroom illustration"
                width={896}
                height={352}
                className="h-44 w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{t.visuals.cards[1].title}</h3>
                <p className="mt-1 text-sm text-slate-600">{t.visuals.cards[1].text}</p>
              </div>
            </article>
          </div>
        </section>

        <section id="format" className="fade-up mt-20" style={{ animationDelay: "0.28s" }}>
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
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 block font-medium text-slate-900 hover:text-blue-700">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{t.contacts.telegram}</p>
              <a href="https://t.me/deutschfuerleben" className="mt-2 block font-medium text-slate-900 hover:text-blue-700">
                {CONTACT_TELEGRAM}
              </a>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-blue-700">{t.contacts.city}</p>
              <p className="mt-2 font-medium text-slate-900">{t.contacts.cityValue}</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-amber-800">{t.contacts.response}</p>
              <p className="mt-2 font-semibold text-amber-950">{t.contacts.responseValue}</p>
            </div>
          </div>
        </section>

        <section
          id="application"
          className="fade-up mt-20 rounded-[2rem] border border-blue-800/30 bg-gradient-to-br from-[#0d2d75] via-[#1242a7] to-[#2184f0] px-6 py-9 shadow-xl shadow-blue-400/25 md:px-10 md:py-12 md:shadow-2xl md:shadow-blue-400/30"
          style={{ animationDelay: "0.37s" }}
        >
          <SectionHeader label={t.form.quickLabel} title={t.form.quickTitle} light />
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber-200/70 bg-amber-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-amber-950">
            {renderIcon("alarm", "h-4 w-4")}
            {t.announcement.startLabel} {START_DATE} • {seatsText}
          </p>

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
            <p className="mt-2 text-sm font-semibold text-blue-50">{t.form.microcopy}</p>
            <p className="mt-1 text-sm text-blue-100">{t.form.nextStep}</p>
          </div>

          {appSuccess ? (
            <div className="mt-7 rounded-2xl border border-emerald-200/70 bg-emerald-100/95 p-5 text-emerald-950" role="status" aria-live="polite">
              <p className="text-lg font-bold">{t.form.successTitle}</p>
              <p className="mt-2 text-sm">{t.form.successText}</p>
              <p className="mt-2 text-sm">{t.form.privacy}</p>
              <a
                href="https://t.me/deutschfuerleben"
                className="mt-4 inline-flex rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900"
              >
                {t.form.successCta}
              </a>
            </div>
          ) : (
            <form onSubmit={handleApplicationSubmit} noValidate className="mt-7 grid gap-4 md:grid-cols-2">
              {renderUtmHiddenFields()}
              <input type="hidden" name="selected_level" value={levelLabel} />
              <input type="hidden" name="selected_format" value={formatLabel} />
              <input type="hidden" name="selected_time" value={timeLabel} />
              <input type="hidden" name="selected_city" value={city} />
              <input type="hidden" name="hero_variant" value={activeHeroVariant} />

              <label className="text-sm text-blue-100">
                {t.form.fields.telegram}
                <input
                  type="text"
                  name="telegram"
                  value={appTelegram}
                  onChange={(event) => {
                    setAppTelegram(event.target.value);
                    if (appError) {
                      setAppError("");
                    }
                  }}
                  placeholder={t.form.placeholders.telegram}
                  aria-invalid={Boolean(appError)}
                  aria-describedby="application-contact-hint application-error"
                  className="mt-2 w-full rounded-xl border border-white/35 bg-white/12 px-4 py-3 text-white outline-none transition placeholder:text-blue-100/80 focus:border-white focus:bg-white/18"
                />
              </label>

              <label className="text-sm text-blue-100">
                {t.form.fields.email}
                <input
                  type="email"
                  name="email"
                  value={appEmail}
                  onChange={(event) => {
                    setAppEmail(event.target.value);
                    if (appError) {
                      setAppError("");
                    }
                  }}
                  placeholder={t.form.placeholders.email}
                  aria-invalid={Boolean(appError)}
                  aria-describedby="application-contact-hint application-error"
                  className="mt-2 w-full rounded-xl border border-white/35 bg-white/12 px-4 py-3 text-white outline-none transition placeholder:text-blue-100/80 focus:border-white focus:bg-white/18"
                />
              </label>

              <p id="application-contact-hint" className="text-sm text-blue-100 md:col-span-2">
                {t.form.contactHint}
              </p>
              <p className="text-sm text-blue-100 md:col-span-2">{t.form.privacy}</p>
              <p className="text-sm text-blue-100 md:col-span-2">
                E-Mail:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-white underline underline-offset-2">
                  {CONTACT_EMAIL}
                </a>{" "}
                • Telegram:{" "}
                <a href="https://t.me/deutschfuerleben" className="font-semibold text-white underline underline-offset-2">
                  {CONTACT_TELEGRAM}
                </a>
              </p>

              <label className="flex items-start gap-3 text-sm text-blue-100 md:col-span-2">
                <input
                  type="checkbox"
                  checked={appConsent}
                  onChange={(event) => {
                    setAppConsent(event.target.checked);
                    if (appError) {
                      setAppError("");
                    }
                  }}
                  className="mt-1 h-4 w-4 rounded border-white/40 bg-white/15"
                />
                <span>
                  {t.form.consentPrefix}{" "}
                  <a href="/datenschutz" className="font-semibold text-white underline underline-offset-2">
                    {t.form.consentLink}
                  </a>{" "}
                  {consentAndWord}{" "}
                  <a href="/impressum" className="font-semibold text-white underline underline-offset-2">
                    {t.form.consentLinkImpressum}
                  </a>
                  .
                </span>
              </label>

              {appError ? (
                <p id="application-error" role="alert" className="text-sm text-rose-100 md:col-span-2">
                  {appError}
                </p>
              ) : null}

              <button type="submit" className="md:col-span-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-50">
                {t.form.submit}
              </button>
            </form>
          )}
        </section>

        {growthFlags.enableWaitlist ? (
          <section className="fade-up mt-20 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/55 md:p-8" style={{ animationDelay: "0.39s" }}>
            <SectionHeader label={i18n.waitlist.label} title={i18n.waitlist.title} subtitle={i18n.waitlist.subtitle} />
            {waitlistSuccess ? (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900" role="status">
                {i18n.waitlist.success}
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
                {renderUtmHiddenFields()}
                <label className="text-sm text-slate-700">
                  {i18n.waitlist.track}
                  <select
                    value={waitlistTrack}
                    onChange={(event) => setWaitlistTrack(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-400"
                  >
                    {i18n.waitlist.options.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm text-slate-700">
                  {i18n.waitlist.email}
                  <input
                    type="email"
                    value={waitlistEmail}
                    onChange={(event) => {
                      setWaitlistEmail(event.target.value);
                      if (waitlistError) {
                        setWaitlistError("");
                      }
                    }}
                    className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-400"
                  />
                </label>
                <label className="text-sm text-slate-700 md:col-span-2">
                  {i18n.waitlist.telegram}
                  <input
                    type="text"
                    value={waitlistTelegram}
                    onChange={(event) => setWaitlistTelegram(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-400"
                  />
                </label>
                {waitlistError ? <p className="text-sm text-red-600 md:col-span-2">{waitlistError}</p> : null}
                <button type="submit" className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white md:col-span-2">
                  {i18n.waitlist.submit}
                </button>
              </form>
            )}
          </section>
        ) : null}

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

      <div
        className={`mobile-sticky-cta md:hidden ${
          showMobileSticky ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-2">
          <a
            href="#application"
            onClick={() => handleCtaClick("mobile_apply", "mobile_sticky")}
            className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-400/30"
          >
            {t.nav.apply}
          </a>
          <a
            href="#checklist"
            onClick={() => handleCtaClick("mobile_checklist", "mobile_sticky")}
            className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-4 py-3 text-center text-sm font-semibold text-blue-900"
          >
            {heroOffer.secondaryCta}
          </a>
        </div>
      </div>
    </main>
  );
}
