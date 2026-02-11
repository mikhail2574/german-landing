import type { HeroVariant } from "../config/growth";
import type { IconName } from "../components/landing/icons";

export type Locale = "ua" | "ru";

export type IntegrationPassCopy = {
  label: string;
  stamp: string;
  startLabel: string;
  seatsLabel: string;
  scheduleLabel: string;
  formatLabel: string;
  startDate: string;
  seatsLeft: number;
  totalSeats: number;
  schedule: string;
  format: string;
  meterLabel: string;
};

type HeroVariantCopy = {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
};

type IconCard = {
  icon: IconName;
  title: string;
  text: string;
};

type ProgramLevel = {
  level: string;
  duration: string;
  ribbon?: string;
  topics: string[];
  outcomes: string[];
};

type GroupCard = {
  level: string;
  status: string;
  urgent: boolean;
  start: string;
  schedule: string;
  format: string;
  seats: string;
};

export type LandingContent = {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  announcement: {
    badge: string;
    text: string;
    cta: string;
  };
  nav: {
    howItWorks: string;
    program: string;
    groups: string;
    faq: string;
    blog: string;
    contacts: string;
    apply: string;
  };
  hero: {
    badge: string;
    variants: Record<HeroVariant, HeroVariantCopy>;
    trustPills: string[];
  };
  pass: IntegrationPassCopy;
  problems: {
    label: string;
    title: string;
    subtitle: string;
    cards: IconCard[];
  };
  howItWorks: {
    label: string;
    title: string;
    subtitle: string;
    cards: IconCard[];
  };
  scenarios: {
    label: string;
    title: string;
    cards: IconCard[];
  };
  program: {
    label: string;
    title: string;
    subtitle: string;
    lessonFlowTitle: string;
    topicsLabel: string;
    outcomesLabel: string;
    lessonFlow: Array<{ time: string; text: string }>;
    levelsTitle: string;
    levels: ProgramLevel[];
  };
  groups: {
    label: string;
    title: string;
    subtitle: string;
    proofs: string[];
    cards: GroupCard[];
  };
  founder: {
    label: string;
    title: string;
    profileName: string;
    profileRole: string;
    trustLine: string;
    text: string;
    bullets: Array<{ title: string; text: string }>;
  };
  faq: {
    label: string;
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  blogTeaser: {
    label: string;
    title: string;
    text: string;
    cta: string;
  };
  finalCta: {
    label: string;
    title: string;
    subtitle: string;
    scarcityLine: string;
  };
  leadMagnet: {
    label: string;
    title: string;
    subtitle: string;
    email: string;
    telegram: string;
    submit: string;
    privacy: string;
    pdfName: string;
    success: string;
    successCta: string;
    missingEmail: string;
    invalidEmail: string;
  };
  form: {
    level: string;
    format: string;
    time: string;
    city: string;
    cityPlaceholder: string;
    levelOptions: Array<{ id: string; label: string }>;
    formatOptions: Array<{ id: string; label: string }>;
    timeOptions: Array<{ id: string; label: string }>;
    title: string;
    subtitle: string;
    microcopy: string;
    fields: {
      telegram: string;
      email: string;
    };
    placeholders: {
      telegram: string;
      email: string;
    };
    contactHint: string;
    privacy: string;
    consentPrefix: string;
    consentPrivacy: string;
    consentImpressum: string;
    submit: string;
    contactError: string;
    invalidEmail: string;
    consentError: string;
    successTitle: string;
    successText: string;
    successCta: string;
  };
  contacts: {
    label: string;
    title: string;
    email: string;
    telegram: string;
    address: string;
    response: string;
  };
  footer: {
    disclaimer: string;
    contactLine: string;
    links: {
      impressum: string;
      privacy: string;
      contact: string;
    };
  };
};

export const landingContent: Record<Locale, LandingContent> = {
  ua: {
    meta: {
      title: "Німецька для інтеграції в Німеччині | A1-B1, DTZ",
      description:
        "Практичний курс німецької для дорослих мігрантів: Jobcenter, Arzt, робота, листи, телефон. Старт A1 21.02, залишилось 4 місця.",
      ogLocale: "uk_UA"
    },
    announcement: {
      badge: "Терміново",
      text: "Набір A1 відкрито • Старт: 21.02 • Залишилось 4 місця",
      cta: "Записатися"
    },
    nav: {
      howItWorks: "Як працюємо",
      program: "Програма",
      groups: "Групи",
      faq: "FAQ",
      blog: "Блог",
      contacts: "Контакти",
      apply: "Залишити заявку"
    },
    hero: {
      badge: "Школа німецької для життя в Німеччині",
      variants: {
        a: {
          title: "Важко інтегруватися без мови? Доведемо з нуля до B1 для життя, роботи і DTZ",
          subtitle:
            "Працюємо з реальними ситуаціями: Jobcenter (центр зайнятості), Termin (запис/зустріч), Behörde (державна установа), Arzt (лікар), дзвінки та листи.",
          primaryCta: "Записатися на найближчу групу",
          secondaryCta: "Отримати безкоштовний чекліст"
        },
        b: {
          title: "Переїхали в Німеччину і мова гальмує документи та роботу? Підготуємо до B1 і DTZ",
          subtitle:
            "Без хаосу: чіткий маршрут A1 -> A2 -> B1, сценарії для Jobcenter, Arzt, дзвінків, листів і співбесід.",
          primaryCta: "Забронювати місце в потоці",
          secondaryCta: "Взяти чекліст для старту"
        }
      },
      trustPills: ["Online по Німеччині", "Office in Leipzig", "Малі групи до 6 людей"]
    },
    pass: {
      label: "Integration Pass / A1",
      stamp: "Місць мало",
      startLabel: "Старт",
      seatsLabel: "Вільні місця",
      scheduleLabel: "Розклад",
      formatLabel: "Формат",
      startDate: "21.02",
      seatsLeft: 4,
      totalSeats: 6,
      schedule: "Пн / Ср / Пт, 18:30",
      format: "Online + підтримка в Telegram",
      meterLabel: "Залишилось 4 з 6 місць"
    },
    problems: {
      label: "Чому складно",
      title: "4 причини, через які німецька гальмує інтеграцію",
      subtitle: "Ми будуємо курс саме під ці бар'єри.",
      cards: [
        {
          icon: "phone",
          title: "Стрес перед дзвінками",
          text: "Складно подзвонити в Jobcenter або Praxis і пояснити, що вам потрібно."
        },
        {
          icon: "fileText",
          title: "Незрозумілі листи",
          text: "Листи від Behörde виглядають страшно, бо неясно, що саме від вас хочуть."
        },
        {
          icon: "landmark",
          title: "Плутанина з термінами",
          text: "Терміни, анкети, формулювання в установах забирають занадто багато сил."
        },
        {
          icon: "target",
          title: "Немає маршруту до B1/DTZ",
          text: "Без системи важко дійти до іспиту і зберегти стабільний темп."
        }
      ]
    },
    howItWorks: {
      label: "Як працюємо",
      title: "Простий, керований формат без перевантаження",
      subtitle: "Один процес, який веде від першого уроку до впевненого спілкування.",
      cards: [
        {
          icon: "route",
          title: "Стартова діагностика",
          text: "Визначаємо рівень і даємо персональний план на 4 тижні."
        },
        {
          icon: "users",
          title: "Малі групи до 6 людей",
          text: "Кожен говорить на уроці, викладач встигає дати зворотний зв'язок."
        },
        {
          icon: "message",
          title: "Сценарії з Німеччини",
          text: "Тренуємо типові діалоги: Arzt, Jobcenter, Arbeit, Telefon, Briefe."
        },
        {
          icon: "badgeCheck",
          title: "Контроль прогресу щотижня",
          text: "Щотижня фіксуємо результат, щоб ви бачили реальний рух вперед."
        }
      ]
    },
    scenarios: {
      label: "Реальні сценарії",
      title: "Що ви зможете сказати і зробити вже під час курсу",
      cards: [
        {
          icon: "phone",
          title: "Дзвінок у Jobcenter",
          text: "Попросити новий Termin, уточнити документи і підтвердити дату."
        },
        {
          icon: "stethoscope",
          title: "Запис до Arzt",
          text: "Описати симптоми, поставити питання і зрозуміти рекомендації."
        },
        {
          icon: "briefcase",
          title: "Комунікація на роботі",
          text: "Погодити задачу, дедлайн і дати короткий статус без стресу."
        }
      ]
    },
    program: {
      label: "Шлях навчання",
      title: "Програма A1 -> A2 -> B1 (DTZ)",
      subtitle: "Конкретні теми для Alltag, документів і роботи.",
      lessonFlowTitle: "Як проходить урок (90 хв)",
      topicsLabel: "Теми",
      outcomesLabel: "Результат",
      lessonFlow: [
        { time: "0-15 хв", text: "Розігрів і повтор активних фраз минулого уроку." },
        { time: "15-45 хв", text: "Нова тема на реальному сценарії з Німеччини." },
        { time: "45-70 хв", text: "Рольові діалоги в парах і малій групі." },
        { time: "70-90 хв", text: "Розбір помилок, фрази-шаблони та домашній план." }
      ],
      levelsTitle: "Етапи і результати",
      levels: [
        {
          level: "A1",
          duration: "7 тижнів",
          ribbon: "Старт 21.02 • Залишилось 4 місця",
          topics: [
            "Alltag: магазин, транспорт, аптека",
            "Telefon: короткі службові дзвінки",
            "Arzt: запис і базовий опис стану",
            "Briefe: прості анкети та відповіді"
          ],
          outcomes: [
            "Впевнено проходите базові побутові ситуації",
            "Можете самостійно записатися на Termin",
            "Зрозуміло пояснюєте базові потреби"
          ]
        },
        {
          level: "A2",
          duration: "14 тижнів",
          topics: [
            "Jobcenter і Behörde: уточнення по документах",
            "Arbeit: задачі, зміни, робочі повідомлення",
            "Briefe: офіційні листи і відповіді",
            "Wohnung: питання до Hausverwaltung"
          ],
          outcomes: [
            "Читаєте і пишете робочі та офіційні повідомлення",
            "Розумієте вимоги з листів і дієте без паніки",
            "Комунікуєте на роботі на практичному рівні"
          ]
        },
        {
          level: "B1 / DTZ",
          duration: "7 тижнів",
          topics: [
            "DTZ: структура усної і письмової частини",
            "Аргументація, логіка, таймінг",
            "Leben in Deutschland: типові теми",
            "Складні кейси Arbeit / Behörde"
          ],
          outcomes: [
            "Тримаєте структуру відповіді під критерії DTZ",
            "Пишете текст B1 рівня без хаосу",
            "Стабільно говорите на іспитові теми"
          ]
        }
      ]
    },
    groups: {
      label: "Поточний набір",
      title: "Найближчі групи",
      subtitle: "Обирайте потік під свій рівень і графік.",
      proofs: ["Малі групи до 6 людей", "Новий набір кожні 3 тижні", "Підтримка між уроками"],
      cards: [
        {
          level: "A1",
          status: "Йде набір",
          urgent: true,
          start: "21.02",
          schedule: "Пн / Ср / Пт, 18:30",
          format: "Online",
          seats: "Залишилось 4 місця"
        },
        {
          level: "A2",
          status: "Йде набір",
          urgent: false,
          start: "04.03",
          schedule: "Вт / Чт, 19:00",
          format: "Online",
          seats: "Є 6 місць"
        },
        {
          level: "B1 / DTZ",
          status: "Майже заповнено",
          urgent: true,
          start: "11.03",
          schedule: "Пн / Ср, 20:00",
          format: "Online + Leipzig meetups",
          seats: "Залишилось 2 місця"
        }
      ]
    },
    founder: {
      label: "Хто веде курс",
      title: "Свой человек у Німеччині: практично, без академічної води",
      profileName: "Олена, засновниця Deutsch fur Leben",
      profileRole: "Викладачка німецької та кураторка інтеграційних груп",
      trustLine: "Office in Leipzig • Online по всій Німеччині",
      text:
        "Я пройшла шлях інтеграції в Німеччині разом зі студентами: від першого Termin до впевнених розмов на роботі. Курс створений так, щоб мова одразу працювала в реальному житті.",
      bullets: [
        {
          title: "Що ви отримаєте",
          text: "Робочі фрази, сценарії і чіткий план росту до B1/DTZ."
        },
        {
          title: "Як ми працюємо",
          text: "Малі групи, щотижневий контроль прогресу, підтримка між уроками."
        },
        {
          title: "Чим відрізняємось",
          text: "Не просто граматика, а дії для Jobcenter, Arzt, Arbeit і листів."
        }
      ]
    },
    faq: {
      label: "FAQ",
      title: "Відповіді на важливі питання перед стартом",
      items: [
        {
          q: "Скільки коштує навчання?",
          a: "Вартість залежить від рівня і графіка. Надсилаємо точну пропозицію після короткої діагностики рівня."
        },
        {
          q: "Чи можна платити частинами?",
          a: "Так, доступна поетапна оплата. Формат оплати узгоджуємо перед стартом групи."
        },
        {
          q: "Що, якщо пропустив урок?",
          a: "Ви отримуєте конспект, домашні матеріали і короткий план для самостійного наздоганяння."
        },
        {
          q: "Чи є повернення оплати?",
          a: "Умови повернення прописані в оферті. Ми пояснюємо їх до оплати без дрібного шрифту."
        },
        {
          q: "Як визначається мій рівень?",
          a: "Перед стартом проводимо короткий онлайн-скринінг і радимо оптимальну групу."
        },
        {
          q: "Скільки триває шлях до B1/DTZ?",
          a: "У середньому 6-7 місяців від нуля при стабільному темпі занять і домашньої практики."
        },
        {
          q: "Скільки часу поза заняттями?",
          a: "Чесно: 20-40 хвилин на день. Перед іспитом DTZ інколи 45-60 хв у дні практики."
        },
        {
          q: "Чи є офлайн-адреса в Leipzig?",
          a: "База — online по всій Німеччині. Додаткові офлайн-зустрічі проводимо в Leipzig за попереднім записом."
        }
      ]
    },
    blogTeaser: {
      label: "Блог / корисне",
      title: "Шпаргалки для життя в Німеччині",
      text: "Короткі статті про Jobcenter, Arzt, DTZ, роботу і листи.",
      cta: "Перейти в блог"
    },
    finalCta: {
      label: "Фінальний крок",
      title: "Залиште заявку і отримайте підбір групи під ваш рівень",
      subtitle: "Без зобов'язань. Відповідаємо протягом 24 годин.",
      scarcityLine: "Старт A1: 21.02 • Залишилось 4 місця"
    },
    leadMagnet: {
      label: "Безкоштовний чекліст",
      title: "Чекліст “50 фраз для Jobcenter та Telefon”",
      subtitle: "Отримайте PDF на e-mail і використовуйте вже цього тижня.",
      email: "E-Mail",
      telegram: "Telegram (опціонально)",
      submit: "Отримати чекліст",
      privacy: "Без спаму. Лише чекліст і 1 сервісне повідомлення.",
      pdfName: "checklist-jobcenter-dfl.pdf",
      success: "Готово. Ми надішлемо чеклист на e-mail. Якщо хочете — залиште заявку на групу.",
      successCta: "Перейти до заявки",
      missingEmail: "Вкажіть e-mail.",
      invalidEmail: "Вкажіть коректний e-mail."
    },
    form: {
      level: "Рівень",
      format: "Формат",
      time: "Час",
      city: "Місто (опціонально)",
      cityPlaceholder: "Наприклад, Leipzig",
      levelOptions: [
        { id: "a1", label: "A1 (з нуля)" },
        { id: "a2", label: "A2" },
        { id: "b1", label: "B1 / DTZ" }
      ],
      formatOptions: [
        { id: "online", label: "Online" },
        { id: "mixed", label: "Online + Leipzig" }
      ],
      timeOptions: [
        { id: "morning", label: "Ранок" },
        { id: "evening", label: "Вечір" },
        { id: "weekend", label: "Вихідні" }
      ],
      title: "Заявка на групу",
      subtitle: "Залиште контакт, і ми підберемо найкращий потік під ваш графік.",
      microcopy: "Без зобов'язань • Відповідаємо протягом 24 годин",
      fields: {
        telegram: "Telegram",
        email: "E-Mail"
      },
      placeholders: {
        telegram: "@username",
        email: "name@example.com"
      },
      contactHint: "Залиште e-mail або Telegram (можна обидва).",
      privacy: "Використовуємо дані лише для відповіді на заявку і підбору групи.",
      consentPrefix: "Погоджуюсь з",
      consentPrivacy: "Datenschutzerklarung",
      consentImpressum: "Impressum",
      submit: "Надіслати заявку",
      contactError: "Вкажіть e-mail або Telegram.",
      invalidEmail: "Вкажіть коректний e-mail.",
      consentError: "Підтвердіть згоду перед відправкою.",
      successTitle: "Заявку отримано",
      successText: "Напишемо вам протягом 24 годин з рекомендованою групою та наступним кроком.",
      successCta: "Написати в Telegram"
    },
    contacts: {
      label: "Контакти",
      title: "Швидкий зв'язок",
      email: "info@deutschfuerleben.de",
      telegram: "@deutschfuerleben",
      address: "Leipzig, Sachsen • online по всій Німеччині",
      response: "Відповідаємо до 24 годин"
    },
    footer: {
      disclaimer: "Deutsch fur Leben — практичні курси німецької для дорослих у Німеччині.",
      contactLine: "Питання: info@deutschfuerleben.de • @deutschfuerleben",
      links: {
        impressum: "Impressum",
        privacy: "Datenschutzerklarung",
        contact: "Kontakt"
      }
    }
  },
  ru: {
    meta: {
      title: "Немецкий для интеграции в Германии | A1-B1, DTZ",
      description:
        "Практический курс немецкого для взрослых мигрантов: Jobcenter, Arzt, работа, письма, телефон. Старт A1 21.02, осталось 4 места.",
      ogLocale: "ru_RU"
    },
    announcement: {
      badge: "Срочно",
      text: "Набор A1 открыт • Старт: 21.02 • Осталось 4 места",
      cta: "Записаться"
    },
    nav: {
      howItWorks: "Как работаем",
      program: "Программа",
      groups: "Группы",
      faq: "FAQ",
      blog: "Блог",
      contacts: "Контакты",
      apply: "Оставить заявку"
    },
    hero: {
      badge: "Школа немецкого для жизни в Германии",
      variants: {
        a: {
          title: "Трудно интегрироваться без языка? Доведем с нуля до B1 для жизни, работы и DTZ",
          subtitle:
            "Тренируем реальные ситуации: Jobcenter (центр занятости), Termin (запись/встреча), Behörde (госучреждение), Arzt (врач), звонки и письма.",
          primaryCta: "Записаться в ближайшую группу",
          secondaryCta: "Получить бесплатный чеклист"
        },
        b: {
          title: "Переехали в Германию и язык тормозит документы и работу? Подготовим до B1 и DTZ",
          subtitle:
            "Без хаоса: понятный маршрут A1 -> A2 -> B1, сценарии для Jobcenter, Arzt, звонков, писем и собеседований.",
          primaryCta: "Забронировать место в потоке",
          secondaryCta: "Взять чеклист для старта"
        }
      },
      trustPills: ["Online по Германии", "Office in Leipzig", "Малые группы до 6 человек"]
    },
    pass: {
      label: "Integration Pass / A1",
      stamp: "Мест мало",
      startLabel: "Старт",
      seatsLabel: "Свободные места",
      scheduleLabel: "Расписание",
      formatLabel: "Формат",
      startDate: "21.02",
      seatsLeft: 4,
      totalSeats: 6,
      schedule: "Пн / Ср / Пт, 18:30",
      format: "Online + поддержка в Telegram",
      meterLabel: "Осталось 4 из 6 мест"
    },
    problems: {
      label: "Почему сложно",
      title: "4 причины, из-за которых немецкий тормозит интеграцию",
      subtitle: "Курс собран вокруг реальных бытовых барьеров.",
      cards: [
        {
          icon: "phone",
          title: "Страх звонков",
          text: "Сложно позвонить в Jobcenter или Praxis и быстро объяснить свой запрос."
        },
        {
          icon: "fileText",
          title: "Непонятные письма",
          text: "Письма от Behörde пугают, потому что неясно, какие шаги нужны прямо сейчас."
        },
        {
          icon: "landmark",
          title: "Путаница с терминами",
          text: "Анкеты, записи и формулировки в ведомствах отнимают много времени и сил."
        },
        {
          icon: "target",
          title: "Нет маршрута к B1/DTZ",
          text: "Без структуры сложно дойти до экзамена и держать стабильный прогресс."
        }
      ]
    },
    howItWorks: {
      label: "Как работаем",
      title: "Прозрачный процесс, в котором видно прогресс",
      subtitle: "Минимум шума, максимум практики под Германию.",
      cards: [
        {
          icon: "route",
          title: "Стартовая диагностика",
          text: "Определяем ваш уровень и даем персональный план на 4 недели."
        },
        {
          icon: "users",
          title: "Малые группы до 6 человек",
          text: "Каждый регулярно говорит, преподаватель дает точечный фидбек."
        },
        {
          icon: "message",
          title: "Сценарии для жизни",
          text: "Отрабатываем Jobcenter, Arzt, Arbeit, Telefon и Briefe."
        },
        {
          icon: "badgeCheck",
          title: "Еженедельный контроль",
          text: "Каждую неделю фиксируем результат и корректируем фокус обучения."
        }
      ]
    },
    scenarios: {
      label: "Реальные сценарии",
      title: "Что вы начнете делать увереннее уже во время курса",
      cards: [
        {
          icon: "phone",
          title: "Звонок в Jobcenter",
          text: "Перенести Termin, уточнить документы и подтвердить следующий шаг."
        },
        {
          icon: "stethoscope",
          title: "Запись к Arzt",
          text: "Описать симптомы, уточнить назначения и не потеряться на приеме."
        },
        {
          icon: "briefcase",
          title: "Диалог на работе",
          text: "Согласовать задачу и дедлайн, задать уточняющие вопросы по делу."
        }
      ]
    },
    program: {
      label: "Путь обучения",
      title: "Программа A1 -> A2 -> B1 (DTZ)",
      subtitle: "Конкретные темы для Alltag, документов и работы.",
      lessonFlowTitle: "Как проходит урок (90 минут)",
      topicsLabel: "Темы",
      outcomesLabel: "Результат",
      lessonFlow: [
        { time: "0-15 мин", text: "Разогрев и повтор активных фраз прошлого урока." },
        { time: "15-45 мин", text: "Новая тема на живом сценарии из немецкой реальности." },
        { time: "45-70 мин", text: "Ролевые диалоги в парах и мини-группах." },
        { time: "70-90 мин", text: "Разбор ошибок, шаблоны фраз и домашний план." }
      ],
      levelsTitle: "Этапы и результаты",
      levels: [
        {
          level: "A1",
          duration: "7 недель",
          ribbon: "Старт 21.02 • Осталось 4 места",
          topics: [
            "Alltag: магазин, транспорт, аптека",
            "Telefon: короткие служебные звонки",
            "Arzt: запись и базовое описание симптомов",
            "Briefe: простые формы и ответы"
          ],
          outcomes: [
            "Уверенно проходите базовые бытовые ситуации",
            "Можете сами записаться на Termin",
            "Понятно формулируете базовые запросы"
          ]
        },
        {
          level: "A2",
          duration: "14 недель",
          topics: [
            "Jobcenter и Behörde: уточнения по документам",
            "Arbeit: задачи, изменения, рабочие сообщения",
            "Briefe: официальные письма и ответы",
            "Wohnung: вопросы к Hausverwaltung"
          ],
          outcomes: [
            "Читаете и пишете рабочие и официальные сообщения",
            "Понимаете требования из писем и действуете без паники",
            "Коммуницируете на работе на практическом уровне"
          ]
        },
        {
          level: "B1 / DTZ",
          duration: "7 недель",
          topics: [
            "DTZ: структура устной и письменной части",
            "Аргументация, логика, тайминг",
            "Leben in Deutschland: типовые темы",
            "Сложные кейсы Arbeit / Behörde"
          ],
          outcomes: [
            "Держите структуру ответа под критерии DTZ",
            "Пишете текст уровня B1 без хаоса",
            "Стабильно говорите на экзаменационные темы"
          ]
        }
      ]
    },
    groups: {
      label: "Текущий набор",
      title: "Ближайшие группы",
      subtitle: "Выберите поток под ваш уровень и расписание.",
      proofs: ["Малые группы до 6 человек", "Набор каждые 3 недели", "Поддержка между уроками"],
      cards: [
        {
          level: "A1",
          status: "Идет набор",
          urgent: true,
          start: "21.02",
          schedule: "Пн / Ср / Пт, 18:30",
          format: "Online",
          seats: "Осталось 4 места"
        },
        {
          level: "A2",
          status: "Идет набор",
          urgent: false,
          start: "04.03",
          schedule: "Вт / Чт, 19:00",
          format: "Online",
          seats: "Есть 6 мест"
        },
        {
          level: "B1 / DTZ",
          status: "Почти заполнено",
          urgent: true,
          start: "11.03",
          schedule: "Пн / Ср, 20:00",
          format: "Online + Leipzig meetups",
          seats: "Осталось 2 места"
        }
      ]
    },
    founder: {
      label: "Кто ведет курс",
      title: "Свой человек в Германии: практично и по делу",
      profileName: "Елена, основательница Deutsch fur Leben",
      profileRole: "Преподаватель немецкого и куратор интеграционных групп",
      trustLine: "Office in Leipzig • Online по всей Германии",
      text:
        "Я веду студентов через реальные этапы интеграции: от первых звонков и писем до уверенной коммуникации на работе. Курс создан так, чтобы язык сразу применялся в жизни.",
      bullets: [
        {
          title: "Что вы получите",
          text: "Рабочие фразы, сценарии и понятный маршрут до B1/DTZ."
        },
        {
          title: "Как мы работаем",
          text: "Малые группы, еженедельный контроль прогресса, поддержка между уроками."
        },
        {
          title: "Чем отличаемся",
          text: "Не теория ради теории, а действия для Jobcenter, Arzt, Arbeit и писем."
        }
      ]
    },
    faq: {
      label: "FAQ",
      title: "Ответы на вопросы перед стартом",
      items: [
        {
          q: "Сколько стоит обучение?",
          a: "Цена зависит от уровня и расписания. Точную стоимость отправляем после короткой диагностики уровня."
        },
        {
          q: "Можно ли платить частями?",
          a: "Да, доступна поэтапная оплата. Формат согласуем до старта группы."
        },
        {
          q: "Что если пропущу урок?",
          a: "Вы получаете конспект, материалы и короткий план, чтобы догнать группу без стресса."
        },
        {
          q: "Есть ли возврат оплаты?",
          a: "Условия возврата прописаны в оферте и объясняются заранее, до оплаты."
        },
        {
          q: "Как определить мой уровень?",
          a: "Перед стартом проводим короткий онлайн-скрининг и рекомендуем подходящую группу."
        },
        {
          q: "Сколько длится путь до B1/DTZ?",
          a: "В среднем 6-7 месяцев от нуля при стабильном графике уроков и домашней практике."
        },
        {
          q: "Сколько времени нужно вне занятий?",
          a: "Честно: 20-40 минут в день. Перед экзаменом DTZ иногда 45-60 минут в дни практики."
        },
        {
          q: "Есть ли офлайн-адрес в Leipzig?",
          a: "Основной формат — online по всей Германии. Дополнительные встречи проводим в Leipzig по записи."
        }
      ]
    },
    blogTeaser: {
      label: "Блог / полезное",
      title: "Шпаргалки для жизни в Германии",
      text: "Короткие статьи про Jobcenter, Arzt, DTZ, работу и письма.",
      cta: "Перейти в блог"
    },
    finalCta: {
      label: "Финальный шаг",
      title: "Оставьте заявку и получите подбор группы под ваш уровень",
      subtitle: "Без обязательств. Отвечаем в течение 24 часов.",
      scarcityLine: "Старт A1: 21.02 • Осталось 4 места"
    },
    leadMagnet: {
      label: "Бесплатный чеклист",
      title: "Чеклист “50 фраз для Jobcenter и Telefon”",
      subtitle: "Получите PDF на e-mail и используйте уже на этой неделе.",
      email: "E-Mail",
      telegram: "Telegram (опционально)",
      submit: "Получить чеклист",
      privacy: "Без спама. Только чеклист и 1 сервисное сообщение.",
      pdfName: "checklist-jobcenter-dfl.pdf",
      success: "Готово. Мы отправим чеклист на e-mail. Если хотите — оставьте заявку на группу.",
      successCta: "Перейти к заявке",
      missingEmail: "Укажите e-mail.",
      invalidEmail: "Укажите корректный e-mail."
    },
    form: {
      level: "Уровень",
      format: "Формат",
      time: "Время",
      city: "Город (опционально)",
      cityPlaceholder: "Например, Leipzig",
      levelOptions: [
        { id: "a1", label: "A1 (с нуля)" },
        { id: "a2", label: "A2" },
        { id: "b1", label: "B1 / DTZ" }
      ],
      formatOptions: [
        { id: "online", label: "Online" },
        { id: "mixed", label: "Online + Leipzig" }
      ],
      timeOptions: [
        { id: "morning", label: "Утро" },
        { id: "evening", label: "Вечер" },
        { id: "weekend", label: "Выходные" }
      ],
      title: "Заявка на группу",
      subtitle: "Оставьте контакт, и мы подберем поток под ваш график.",
      microcopy: "Без обязательств • Ответим в течение 24 часов",
      fields: {
        telegram: "Telegram",
        email: "E-Mail"
      },
      placeholders: {
        telegram: "@username",
        email: "name@example.com"
      },
      contactHint: "Оставьте e-mail или Telegram (можно оба).",
      privacy: "Используем данные только для ответа на заявку и подбора группы.",
      consentPrefix: "Соглашаюсь с",
      consentPrivacy: "Datenschutzerklarung",
      consentImpressum: "Impressum",
      submit: "Отправить заявку",
      contactError: "Укажите e-mail или Telegram.",
      invalidEmail: "Укажите корректный e-mail.",
      consentError: "Подтвердите согласие перед отправкой.",
      successTitle: "Заявка принята",
      successText: "Напишем вам в течение 24 часов с рекомендованной группой и следующим шагом.",
      successCta: "Написать в Telegram"
    },
    contacts: {
      label: "Контакты",
      title: "Быстрая связь",
      email: "info@deutschfuerleben.de",
      telegram: "@deutschfuerleben",
      address: "Leipzig, Sachsen • online по всей Германии",
      response: "Отвечаем до 24 часов"
    },
    footer: {
      disclaimer: "Deutsch fur Leben — практические курсы немецкого для взрослых в Германии.",
      contactLine: "Вопросы: info@deutschfuerleben.de • @deutschfuerleben",
      links: {
        impressum: "Impressum",
        privacy: "Datenschutzerklarung",
        contact: "Kontakt"
      }
    }
  }
};
